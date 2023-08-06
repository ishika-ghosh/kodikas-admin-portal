import EventTimings from "@models/eventTimings";
import Team from "@models/team";
import User from "@models/user";
import Admin from "@models/admin";
import Payment from "@models/payment";
import Event from "@models/events";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import { getDetails } from "@controllers/getDetails";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const teamId = searchParams.get("teamid");
  console.log(teamId);
  try {
    await connectToDatabase();
    let events = await Event.findOne({
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
