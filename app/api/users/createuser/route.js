import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import Admin from "@models/admin";
import bcryptjs from "bcryptjs";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    await connectToDatabase();
    const reqBody = await req.json();
    const { username, password, isSuperAdmin } = reqBody;
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
    // console.log(reqBody);
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
      isSuperAdmin,
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
