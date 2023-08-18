import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import Team from "@models/team";
import User from "@models/user";
import Payment from "@models/payment";
import EventDay from "@models/eventDay";
import Admin from "@models/admin";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  try {
    await connectToDatabase();
    const token = await getToken({ req });
    // console.log(token.username);
    const admin = await Admin.findOne({ username: token?.username }).select(
      "-password"
    );
    if (!admin) {
      return NextResponse.json({ error: "Not valid user", success: false });
    }
    const today = new Date().toDateString();
    const tomorrow = new Date().setDate(new Date().getDate() + 1);
    const teams = await Team.count({});
    const teamsWithPayment = await Team.count({ payment: true });
    const users = await User.count({});
    const transactions = await Payment.count({});
    const todaysTransactions = await Payment.count({
      createdAt: {
        $gte: new Date(today),
        $lte: new Date(tomorrow),
      },
    });
    const teamsAttended = await EventDay.count({});
    return NextResponse.json({
      teams: teams,
      users: users,
      transactions: transactions,
      todaysTransactions: todaysTransactions,
      teamsAttended: teamsAttended,
      teamsWithPayment: teamsWithPayment,
      user: admin,
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
