import { NextRequest, NextResponse } from "next/server";
import { db } from "../db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const doctorEmail = searchParams.get("email");

  if (!doctorEmail) {
    return NextResponse.error();
  }

  const appointments = await db.appointment.findMany({
    where: {
      doctorEmail: doctorEmail
    },
    select: {
      time: true,
      patient: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  });

  const appointmentDetails = appointments.map(appointment => ({
    time: appointment.time,
    patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`
  }));

  return NextResponse.json(appointmentDetails);
}
