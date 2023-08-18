import EventTimings from "@models/eventTimings";
import Team from "@models/team";
import User from "@models/user";
import Admin from "@models/admin";
import Payment from "@models/payment";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import EventDay from "@models/eventDay";
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
    const eventsOfAllTeams = await EventDay.find().populate({
      path: "team",
      populate: [{ path: "teamMember" }, { path: "leader" }],
    });
    return NextResponse.json({ teams: eventsOfAllTeams });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
