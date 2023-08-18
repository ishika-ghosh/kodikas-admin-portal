import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import EventTimings from "@models/eventTimings";
import { getToken } from "next-auth/jwt";
import Admin from "@models/admin";

export async function GET(req) {
  try {
    await connectToDatabase();
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
    const times = await EventTimings.find();
    return NextResponse.json(times);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    await connectToDatabase();
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
    const body = await req.json();
    const event = new EventTimings(body);
    const newEvent = await event.save();
    return NextResponse.json(newEvent);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
