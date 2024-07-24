import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";
import { COOKIE_NAME } from "@/constanst";
import { baseUserSchema } from "@/schemas/UserSchema";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/dbConnect";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate the input data with Zod schema
    const parseResult = baseUserSchema.safeParse(data);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: parseResult.error.errors,
        },
        {
          status: 400,
        }
      );
    }

    const { email, password } = parseResult.data;

    await connectToDatabase();

    const user = await User.findOne({ email }).lean();

    if (!user) {
      return NextResponse.json(
        {
          message: "Akun tidak bisa ditemukan.",
          path: "email",
        },
        {
          status: 401,
        }
      );
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        {
          message: "Password anda salah.",
          path: "password",
        },
        {
          status: 401,
        }
      );
    }

    // Create JWT token
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

    // Set cookie
    const serialized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
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
    // Handle unexpected errors
    console.error("Unexpected error:", err);

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
