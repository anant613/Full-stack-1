import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/dt";
import  Video , { IVideo } from "@/modals/video.modals"
import { request } from "http";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase()
        const videos = await Video.find({}).sort({CreatedAt : -1}).lean()

        if (!videos || videos.length === 0) {
            return NextResponse.json([],{status: 200});
        }
    } catch (error) {
        return NextResponse.json({
            error:"Failed to fetched videos"
        },
        {
            status : 500
        });
    }
}

export async function POST(request : NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({
                error: "Unauthorized"
            },
            {
                status:401
            })
        }

        await connectToDatabase()

        const body : IVideo = await request.json()
        if(!body.title || !body.description || !body.videoURL || !body.thumbnailURL){
            return Response.json(
                {error: "Missing required fields"},
                {status : 400});
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true ,
            transformations: {
                height : 1920,
                width : 1080,
                quality : body.transformations?.quality ?? 100 
            },
        };
        const newVideo = await Video.create (videoData)

        return NextResponse.json(newVideo)

    } catch (error) {
        return NextResponse.json({
            error: "Video cant be Created"
        },{
            status : 201
        })
    }
}