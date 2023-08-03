import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import EventTimings from "@models/times";
import { getDetails } from "@controllers/getDetails";
