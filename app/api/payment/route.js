import Team from "@models/team";
import User from "@models/user";
import Admin from "@models/admin";
import Payment from "@models/payment";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import { getDetails } from "@controllers/getDetails";
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get("teamid");
    console.log(teamId);
    let team = await Team.findOne({
      _id: searchParams.get("teamid"),
    }).populate(["leader", "teamMember"]);
    team = {
      teamName: team.teamName,
      leaderName: team.leader.name,
      leaderImage: team.leader.image,
      leaderYear: team.leader.year,
      leaderDept: team.leader.department,
      memberName: team.teamMember.name,
      memberImage: team.teamMember.image,
      memberYear: team.teamMember.year,
      memberDept: team.teamMember.department,
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
    const { teamId, paymentStatus } = await req.json();
    const teamDetails = await Team.findOne({ _id: teamId });
    if (!teamDetails.teamMemberConfirmation) {
      return NextResponse.json({
        success: false,
        message: `Team not Full`,
      });
    }
    const updatedData = await Team.findByIdAndUpdate(teamId, {
      payment: paymentStatus,
    });
    const admin = getDetails(req);
    if (!admin) {
      return NextResponse.json({ error: "Not valid user", success: false });
    }

    const addInPayment = await Payment.create({
      team: teamId,
      admin: admin?.id,
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
