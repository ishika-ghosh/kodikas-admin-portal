import Payment from "@models/payment";
import Team from "@models/team";
import User from "@models/user";
import Admin from "@models/admin";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    await connectToDatabase();
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
