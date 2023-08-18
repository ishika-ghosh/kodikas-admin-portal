import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import Admin from "@models/admin";
import Team from "@models/team";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
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
    const teams = await Team.find({}).populate("leader").populate("teamMember");
    return NextResponse.json({
      success: true,
      teams: teams,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
