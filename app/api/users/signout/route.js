import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";

export async function GET(){
    try {
        await connectToDatabase()
        const response=NextResponse.json({
            message:"log out successfully",
            success:true
        })
        response.cookies.delete('token');
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}