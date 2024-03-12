import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "../db";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  try {
    const existingUser = await db.patient.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const { password: existingUserPassword, ...user } = existingUser;

    return NextResponse.json(
      { user: user, message: "Sign in successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
