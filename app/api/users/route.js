import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import User from "@models/user";
import { getDetails } from "@utils/getDetails";
import Admin from "@models/admin";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const admin = getDetails(request);
  if (!admin) {
    return NextResponse.json({ error: "Not valid user", success: false });
  }
  const adminId = admin?.id;
  const adminDetails = await Admin.findById(adminId);
  //if not a super admin then can not allow then to change the details
  if (!adminDetails.isSuperAdmin) {
    return NextResponse.json(
      { message: "Only super admin can change this details" },
      { status: 400 }
    );
  }
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const page = searchParams.get("page") || 1;
  const queries = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};
  const limit = 2;
  const skip = (page - 1) * limit;
  // console.log({ queries });
  // console.log({ sort });
  try {
    await connectToDatabase();
    const count = await User.find(queries).count();
    const users = await User.find(queries).sort(sort).skip(skip).limit(limit);
    return NextResponse.json({
      success: true,
      message: "All registered teams",
      count: Number(count),
      limit: Number(limit),
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
