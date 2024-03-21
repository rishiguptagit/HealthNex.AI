import { NextRequest, NextResponse } from "next/server";
import { db } from "../db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const bills = await db.bill.findMany({
      where: { patientEmail: email },
    });

    if (!bills || bills.length === 0) {
      return NextResponse.json(
        { message: "No appointments found for this patient", appointments: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(bills, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { patientEmail, bill } = await req.json();

  if (!patientEmail || !bill) {
    return NextResponse.json(
      { message: "Patient Email and bill details are required" },
      { status: 400 }
    );
  }

  try {
    const newBill = await db.bill.create({
      data: {
        patientEmail: patientEmail,
        amount: bill,
      },
    });

    return NextResponse.json(newBill, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
