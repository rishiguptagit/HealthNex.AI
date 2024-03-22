import { NextRequest, NextResponse } from "next/server";
import { db } from "../db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const doctorEmail = searchParams.get("email");
  const minTime = searchParams.get("minTime");
  const maxTime = searchParams.get("maxTime");

  if (!doctorEmail || !minTime || !maxTime) {
    return NextResponse.error();
  }

  const appointments = await db.appointment.findMany({
    where: {
      doctorEmail: doctorEmail,
      time: {
        gte: new Date(minTime),
        lte: new Date(maxTime),
      },
    },
    select: {
      time: true,
      patient: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  const appointmentDetails = appointments.map((appointment) => ({
    time: appointment.time,
    patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
  }));

  return NextResponse.json(appointmentDetails);
}
