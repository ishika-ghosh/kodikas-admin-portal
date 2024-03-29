import EventTimings from "@models/eventTimings";
import Team from "@models/team";
import User from "@models/user";
import Admin from "@models/admin";
import Payment from "@models/payment";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import { getToken } from "next-auth/jwt";
import EventDay from "@models/eventDay";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const teamId = searchParams.get("teamid");
  // console.log(teamId);
  try {
    await connectToDatabase();
    let events = await EventDay.findOne({
      team: teamId,
    }).populate({ path: "team", populate: ["leader", "teamMember"] });
    return NextResponse.json(events);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
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
    const body = await req.json();
    const event = new EventDay(body);
    const newEvent = await event.save();
    return NextResponse.json(newEvent);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
