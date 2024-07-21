import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constanst";

export async function DELETE(req: NextRequest) {
  const serialized = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  return NextResponse.json(
    {
      message: "Token successfully deleted.",
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": serialized,
      },
    }
  );
}
