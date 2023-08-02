import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import User from "@models/user";
import { getDetails } from "@controllers/getDetails";
export async function GET(request) {
  try {
    await connectToDatabase();
    const users = await User.find();
    return NextResponse.json({
      success: true,
      message: "All registered teams",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching team names:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
