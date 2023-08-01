import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import Admin from "@models/admin";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  try {
    await connectToDatabase();
    const reqBody = await req.json();
    const { username, password } = reqBody;
    console.log(reqBody);
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      isSuperAdmin: true,
    });
    const savedAdmin = await newAdmin.save();
    return NextResponse.json({ status: 200, savedAdmin });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
