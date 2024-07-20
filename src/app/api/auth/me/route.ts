import { COOKIE_NAME } from "@/constanst";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { value } = token;
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }

    verify(value, secret);

    const res = {
      user: "Super Top Secret User",
    };

    return NextResponse.json(JSON.stringify(res), {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: e,
      },
      {
        status: 400,
      }
    );
  }
}
