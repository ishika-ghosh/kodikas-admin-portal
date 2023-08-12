import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import Admin from "@models/admin";
import verify from "jsonwebtoken/verify";
export async function GET(request) {
  try {
    await connectToDatabase();
    const token = request.cookies.get("token")?.value || "";
    const admin = verify(token, process.env.MONGO_SECRET, (err, res) => {
      if (err) {
        console.log(err);
        return null;
      }
      return res;
    });

    // console.log(req);
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
