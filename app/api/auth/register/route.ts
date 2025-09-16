import { connectToDatabase } from "@/lib/dt";
import User from "@/modals/User.modals";
import { NextRequest , NextResponse } from "next/server";

export async function post(request : NextRequest) {
    try {
        const {email , password} = await request.json()

        if(!email || !password){
            return NextResponse.json(
                {
                    error: "Email and password are required",
                },
                {   status: 400
                }
            )
        }

        await connectToDatabase()

        const Existing_user = await User.findOne({email})
        if(Existing_user){
            return NextResponse.json(
                {
                    error: "Email is already registered",
                },
                {   status: 401
                }
            )
        }

        await User.create({
            email ,
            password
        })

        return NextResponse.json(
            {
                error: "User registered Sucessfullly",
            },
            {   status: 400
            }
        )
    } catch (error) {
        console.log("Failed to register user " , error)
        return NextResponse.json(
            {
                error: "Failed to register user",
            },
            {   status: 400
            }
        )
    }
}