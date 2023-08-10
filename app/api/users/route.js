import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import User from "@models/user";
import { getDetails } from "@controllers/getDetails";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
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
  console.log({ queries });
  console.log({ sort });
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
