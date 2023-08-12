import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import { getDetails } from "@utils/getDetails";
import Admin from "@models/admin";
export async function GET(req) {
  try {
    await connectToDatabase();
    // console.log(req);
    const admin = await getDetails(req);
    if (!admin) {
      return NextResponse.json({ error: "Not valid user", success: false });
    }
    const details = await Admin.findById(admin?.id);
    return NextResponse.json({
      message: "User details fetched",
      success: true,
      admin: admin,
      adminDetails: details?.isSuperAdmin,
    });
  } catch (error) {
    console.error("Error fetching team names:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
