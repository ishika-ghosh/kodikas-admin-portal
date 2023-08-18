import Payment from "@models/payment";
import Admin from "@models/admin";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    await connectToDatabase();
    const token = await getToken({ req });
    // console.log(token.username);
    const admin = await Admin.findOne({ username: token?.username });
    if (!admin) {
      return NextResponse.json({ error: "Not valid user", success: false });
    }
    if (!admin.isSuperAdmin) {
      return NextResponse.json(
        { message: "Only super admins are allowed" },
        { status: 400 }
      );
    }
    const { searchParams } = new URL(req.url);
    const startTime = searchParams.get("start-time");
    const endTime = searchParams.get("end-time");
    if (startTime && endTime) {
      const transactions = await Payment.find({
        createdAt: {
          $gte: new Date(startTime),
          $lte: new Date(endTime),
        },
      })
        .populate({ path: "team", populate: ["leader"] })
        .populate("admin");
      return NextResponse.json({
        success: true,
        message: "Transaction Details",
        transactions,
      });
    }
    let transactions = await Payment.find({})
      .populate({ path: "team", populate: ["leader"] })
      .populate("admin");
    return NextResponse.json({
      success: true,
      message: "Transaction Details",
      transactions,
    });
  } catch (error) {
    console.error("Error fetching Transactions:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
