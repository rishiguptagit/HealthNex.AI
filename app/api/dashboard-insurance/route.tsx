import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const insurance = await db.insurance.findUnique({
      where: { patientEmail: email },
    });

    if (!insurance) {
      return NextResponse.json(
        { message: "No insurance information on file", insurance: null },
        { status: 200 }
      );
    }

    return NextResponse.json(insurance, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const insurance = await db.insurance.create({
      data: data,
    });

    return NextResponse.json(insurance, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
