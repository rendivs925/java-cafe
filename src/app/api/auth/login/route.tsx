import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constanst";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";

const MAX_AGE = 60 * 60 * 24 * 30; // days

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = body;

  if (email !== "rendi@gmail.com" || password !== "12345678") {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("1m")
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authenticated!",
  };

  return NextResponse.json(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}
