import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const appointments = await db.appointment.findMany({
      where: { patientEmail: email },
    });

    if (!appointments || appointments.length === 0) {
      return NextResponse.json(
        { message: "No appointments found for this patient" },
        { status: 404 }
      );
    }

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
