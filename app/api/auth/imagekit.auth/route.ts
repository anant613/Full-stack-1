import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
  try {
    const AuthenticationParams = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
    })
  
    return Response.json({
      AuthenticationParams,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY
    })
  } catch (error) {
    return Response.json(
       {
        error : "AUTHENTICATION FOR IMAGE FAILED",
       },
       {
        status : 500
       }
    );
  }
}