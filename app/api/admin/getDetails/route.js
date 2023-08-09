import Admin from "@models/admin";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import { getDetails } from "@controllers/getDetails";
export async function GET(req) {
  try {
    await connectToDatabase();
    const admin = getDetails(req);
    if (!admin) {
      return NextResponse.json({ error: "Not valid user", success: false });
    }
    return NextResponse.json({
      message: "User details fetched",
      success: true,
      admin: admin,
    });
  } catch (error) {
    console.error("Error fetching team names:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
