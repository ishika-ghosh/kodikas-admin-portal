import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import EventTimings from "@models/eventTimings";
import Admin from "@models/admin";
import { getDetails } from "@controllers/getDetails";

export async function POST(req) {
  await connectToDatabase();
  try {
    const admin = getDetails(req);
    if (!admin) {
      return NextResponse.json(
        { message: "Not a valid user" },
        { status: 403 }
      );
    }
    const id = admin?.id;
    const adminData = await Admin.findById(id);
    if (!adminData.isSuperAdmin) {
      return NextResponse.json({
        message: "Only super admins are allowes to activate or disable a link",
      });
    }
    const { eventId } = await req.json();
    const event = await EventTimings.findById(eventId);
    if (new Date() > event.endTime) {
      return NextResponse.json({
        success: false,
        message: "The link is already disabled",
      });
    }
    if (new Date() > event.startTime) {
      const newEvent = await EventTimings.findByIdAndUpdate(eventId, {
        endTime: new Date(),
      });
      return NextResponse.json({
        success: true,
        newEvent,
      });
    }
    return NextResponse.json({
      success: false,
      message: "end time should be greater than start time",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
