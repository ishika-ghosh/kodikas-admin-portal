import Team from "@models/team";
import User from "@models/user";
import Admin from "@models/admin";
import Payment from "@models/payment";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import { getDetails } from "@utils/getDetails";
import EventDay from "@models/eventDay";
import sendConfirmationEmail from "@utils/sendEmail";

export async function PUT(req) {
  try {
    await connectToDatabase();
    const { teamId, lunchStatus } = await req.json();
    const admin = getDetails(req);
    if (!admin) {
      return NextResponse.json({ error: "Not valid user", success: false });
    }
    const team = await EventDay.findOne({ team: teamId });
    if (!team) {
      return NextResponse.json(
        { message: "Team not found", success: false },
        { status: 400 }
      );
    }
    const updatedData = await EventDay.findByIdAndUpdate(
      team?._id,
      {
        lunch: lunchStatus,
      },
      { new: true }
    ).populate({
      path: "team",
      populate: [{ path: "teamMember" }, { path: "leader" }],
    });
    // console.log("updatedData: " + updatedData);
    sendConfirmationEmail(
      updatedData?.team?.leader,
      updatedData?.team,
      updatedData?.team?.leader?.email,
      { event: 2 }
    );
    return NextResponse.json({
      success: true,
      updatedData,
    });
  } catch (error) {
    console.error("Error updating payment details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    await connectToDatabase();
    const { teamId, entryStatus } = await req.json();
    const admin = getDetails(req);
    if (!admin) {
      return NextResponse.json({ error: "Not valid user", success: false });
    }
    const team = await Team.findById(teamId)
      .populate("leader")
      .populate("teamMember");
    if (team?.payment) {
      const eventStarted = await EventDay.create({
        team: teamId,
        attendance: entryStatus,
      });
      // console.log("Start: " + eventStarted);
      sendConfirmationEmail(team?.leader, team, team?.leader?.email, {
        event: 1,
      });
      return NextResponse.json({
        success: true,
        eventStarted,
      });
    }
    return NextResponse.json(
      { message: "Team's Payment is due!" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
