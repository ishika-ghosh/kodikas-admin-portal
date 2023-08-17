import EventDay from "@models/eventDay";
import { getDetails } from "@utils/getDetails";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import EventTimings from "@models/eventTimings";
import Admin from "@models/admin";
import sendConfirmationEmail from "@utils/sendEmail";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const admin = getDetails(req);
    if (!admin) {
      return NextResponse.json({ error: "Not valid user", success: false });
    }
    const adminId = admin?.id;
    const adminDetails = await Admin.findById(adminId);
    //if not a super admin then can not allow then to change the details
    if (!adminDetails.isSuperAdmin) {
      return NextResponse.json(
        { message: "Only super admin can change this details" },
        { status: 400 }
      );
    }
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(null);
    }

    const details = await EventDay.findById(id).populate({
      path: "team",
      populate: [{ path: "teamMember" }, { path: "leader" }],
    });

    return NextResponse.json(details);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    //check weather the current admin is a super admin or not
    const admin = getDetails(req);
    if (!admin) {
      return NextResponse.json({ error: "Not valid user", success: false });
    }
    const adminId = admin?.id;
    const adminDetails = await Admin.findById(adminId);
    //if not a super admin then can not allow then to change the details
    if (!adminDetails.isSuperAdmin) {
      return NextResponse.json(
        { message: "Only super admin can change this details" },
        { status: 400 }
      );
    }
    //if super admin then go ahead and update the record
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(null);
    }
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventid");
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json(null);
    }
    const body = await req.json();
    const event = await EventTimings.findById(eventId);
    const start = new Date(event?.startTime);
    const end = new Date(event?.endTime);
    const today = new Date();
    //if the current time is in between start and deadline of the event
    if (!(today >= start && today <= end)) {
      return NextResponse.json(
        { message: "The deadline for the event already passed" },
        { status: 400 }
      );
    }
    const newEvent = await EventDay.findByIdAndUpdate(id, body, {
      new: true,
    }).populate({
      path: "team",
      populate: [{ path: "teamMember" }, { path: "leader" }],
    });
    sendConfirmationEmail(
      newEvent?.team?.leader,
      newEvent?.team,
      newEvent?.team?.leader?.email,
      { event: 3 }
    );
    return NextResponse.json({ updatedEvent: newEvent, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}
