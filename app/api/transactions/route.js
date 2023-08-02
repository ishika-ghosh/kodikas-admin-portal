import Payment from "@models/payment";
import Team from "@models/team";
import User from "@models/user";
import Admin from "@models/admin";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    await connectToDatabase();
    let transactions = await Payment.find({}).populate(["team", "admin"]);
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
