import EventTimings from "@models/eventTimings";
import Team from "@models/team";
import User from "@models/user";
import Admin from "@models/admin";
import Payment from "@models/payment";
import Event from "@models/events";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";

export async function GET() {
  try {
    await connectToDatabase();
    const eventsOfAllTeams = await Event.find().populate("team");
    return NextResponse.json(eventsOfAllTeams);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
