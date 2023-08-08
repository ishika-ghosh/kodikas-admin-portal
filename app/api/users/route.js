import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import User from "@models/user";
import { getDetails } from "@controllers/getDetails";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "createdAt";
  const queries = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};
  console.log({ queries });
  console.log({ sort });
  try {
    await connectToDatabase();
    const users = await User.find(queries).sort(sort);
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
