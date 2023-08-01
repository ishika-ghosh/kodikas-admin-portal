import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import Team from "@models/team";
import { getDetails } from "@controllers/getDetails";
export async function GET(request) {
  try {
    await connectToDatabase();
    const teams = await Team.find();
    return NextResponse.json({
      success: true,
      message: "All registered teams",
      data: teams,
    });
  } catch (error) {
    console.error("Error fetching team names:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
