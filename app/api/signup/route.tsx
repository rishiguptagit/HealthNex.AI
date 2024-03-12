import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "../db";

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, email, password } = body;

  try {
    const existingUser = await db.patient.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return NextResponse.json(
        { user: null, message: "User with this email already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.patient.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });
    const { password: newUserPassword, ...user } = newUser;

    return NextResponse.json(
      { user: newUser, message: "Patient created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
