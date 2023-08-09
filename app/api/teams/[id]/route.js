//for a particuler team
// 64cfe6f1ac47c73d244f2197
import EventDay from "@models/eventDay";
import { getDetails } from "@controllers/getDetails";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
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
export async function PUT() {}
