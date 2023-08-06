import Team from "@models/team";
import User from "@models/user";
import Admin from "@models/admin";
import Payment from "@models/payment";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import { getDetails } from "@controllers/getDetails";
import Event from "@models/events";

export async function PUT(req) {
  try {
    await connectToDatabase();
    const { teamId, paymentStatus, entryStatus, lunchStatus } =
      await req.json();
    const teamDetails = await Team.findOne({ _id: teamId });
    if (!teamDetails.teamMemberConfirmation) {
      return NextResponse.json({
        success: false,
        message: `Team not Full`,
      });
    }
    const admin = getDetails(req);
    if (!admin) {
      return NextResponse.json({ error: "Not valid user", success: false });
    }
    if (!teamDetails.payment) {
      const updatedData = await Team.findByIdAndUpdate(teamId, {
        payment: paymentStatus,
      });

      const addInEvent = await Event.create({
        team: teamId,
        payment: paymentStatus,
        attendance: entryStatus,
        lunch: lunchStatus,
      });

      const addInPayment = await Payment.create({
        team: teamId,
        admin: admin?.id,
      });
      return NextResponse.json({
        success: true,
        message: `Payment Details of ${updatedData.teamName} was updated`,
        updatedData,
        eventData: addInEvent,
        transactionData: addInPayment,
      });
    } else {
      const updatedData = await Event.updateOne(
        { team: teamId },
        {
          attendance: entryStatus,
          lunch: lunchStatus,
        }
      ).populate("team");
      console.log("updatedData: " + updatedData);
      return NextResponse.json({
        success: true,
        // message: `Event Details of ${updatedData.team.teamName} was updated`,
        updatedData,
      });
    }
  } catch (error) {
    console.error("Error updating payment details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
