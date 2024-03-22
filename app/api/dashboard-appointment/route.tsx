import { NextRequest, NextResponse } from "next/server";
import { db } from "../db";

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
        { message: "No appointments found for this patient", appointments: [] },
        { status: 200 }
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

export async function POST(req: NextRequest) {
  const { patientEmail, appointmentDetails } = await req.json();

  if (!patientEmail || !appointmentDetails) {
    return NextResponse.json(
      { message: "Patient Email and appointment details are required" },
      { status: 400 }
    );
  }

  try {
    const doctor = JSON.parse(appointmentDetails.doctor);
    const appointment = await db.appointment.create({
      data: {
        patientEmail: patientEmail,
        symptoms: appointmentDetails.symptoms,
        time: appointmentDetails.time,
        doctorEmail: doctor.email,
        description: appointmentDetails.description,
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
