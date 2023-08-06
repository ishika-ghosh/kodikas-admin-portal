import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import EventTimings from "@models/eventTimings";
import { getDetails } from "@controllers/getDetails";

export async function GET() {
  try {
    console.log("here");
    await connectToDatabase();
    const times = await EventTimings.find();
    return NextResponse.json(times);
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
    const body = await req.json();
    const event = new EventTimings(body);
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
