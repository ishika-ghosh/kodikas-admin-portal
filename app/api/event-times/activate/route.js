import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import EventTimings from "@models/eventTimings";
import Admin from "@models/admin";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  await connectToDatabase();
  try {
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
    const { eventId } = await req.json();
    const newEvent = await EventTimings.findByIdAndUpdate(
      eventId,
      {
        startTime: new Date(),
        endTime: new Date().setHours(new Date().getHours() + 3),
      },
      { new: true }
    );
    return NextResponse.json({
      success: true,
      newEvent,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
