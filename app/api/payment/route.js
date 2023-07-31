import Payment from "@models/payment";
import Team from "@models/team";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get("teamid");
    console.log(teamId);
    let team = await Team.findOne({
      _id: searchParams.get("teamid"),
    }).populate("leader");
    team = {
      teamName: team.teamName,
      leaderName: team.leader.name,
      leaderImage: team.leader.image,
      leaderYear: team.leader.year,
      leaderDept: team.leader.department,
      payment: team.payment,
    };
    return NextResponse.json({
      success: true,
      message: `${team.teamName} Details`,
      team,
    });
  } catch (error) {
    console.error("Error fetching team names:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const { teamId, paymentStatus, adminId } = await req.json();
    console.log(teamId, paymentStatus);
    const teamDetails = await Team.findOne({ _id: teamId });
    if (!teamDetails.teamMemberConfirmation) {
      return NextResponse.json({
        success: false,
        message: `Team not Full`,
        teamDetails,
      });
    }
    const updatedData = await Team.findByIdAndUpdate(teamId, {
      payment: paymentStatus,
    });
    const addInPayment = await Payment.create({
      team: teamId,
      admin: adminId,
    });
    return NextResponse.json({
      success: true,
      message: `Payment Details of ${updatedData.teamName} was updated`,
      updatedData,
      transactionData: addInPayment,
    });
  } catch (error) {
    console.error("Error updating payment details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
