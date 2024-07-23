import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";
import { COOKIE_NAME } from "@/constanst";
import { baseUserSchema } from "@/schemas/UserSchema";
import { z } from "zod";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/dbConnect";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds
export async function POST(req: NextRequest) {
  try {
    // Parse and validate the input
    const { email, password } = baseUserSchema.parse(await req.json());

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "Akun tidak ditemukan.",
        },
        {
          status: 401,
        }
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        {
          message: "Password anda salah.",
        },
        {
          status: 401,
        }
      );
    }

    const token = await new SignJWT({
      role: user.role,
      email: user.email,
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime(`${MAX_AGE}s`) // Set JWT expiration time to 30 days in seconds
      .sign(new TextEncoder().encode(getJwtSecretKey()));

    const serialized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE, // Set cookie maxAge to 30 days in seconds
      path: "/",
    });

    return NextResponse.json(
      {
        message: "Authenticated!",
        username: user.username,
        role: user.role,
        email: user.email,
      },
      {
        status: 200,
        headers: { "Set-Cookie": serialized },
      }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: err.errors,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
