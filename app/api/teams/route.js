import EventTimings from "@models/eventTimings";
import Team from "@models/team";
import User from "@models/user";
import Admin from "@models/admin";
import Payment from "@models/payment";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import EventDay from "@models/eventDay";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || null;
  const page = searchParams.get("page") || 1;
  const queries = search
    ? {
        $or: [{ teamName: { $regex: search, $options: "i" } }],
      }
    : {};
  const limit = 2;
  const skip = (page - 1) * limit;
  try {
    await connectToDatabase();
    const teams = await Team.find(queries);
    const teamIds = teams.map((team) => team._id);
    const filters = new Object();
    if (filter) filters[filter] = true;
    console.log(filters);
    const newQueries = {
      $and: [{ team: { $in: teamIds } }, filters],
    };
    const count = await EventDay.find(newQueries).count();
    const eventsOfAllTeams = await EventDay.find(newQueries)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "team",
        populate: [{ path: "teamMember" }, { path: "leader" }],
      });
    console.log(eventsOfAllTeams);
    return NextResponse.json({
      success: true,
      message: "All Present teams",
      count: Number(count),
      limit: Number(limit),
      teams: eventsOfAllTeams,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
