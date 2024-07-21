import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
import { COOKIE_NAME } from "./constanst";
import { serialize } from "cookie";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  console.log("Token:", token);

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log("Verification error:", err);
      return null; // Explicitly return null in case of error
    }));

  console.log("Verified Token:", verifiedToken);

  const { pathname, origin } = req.nextUrl;

  if (pathname === "/auth/logout") {
    const cookie = serialize(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return NextResponse.redirect(new URL("/", origin), {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  }

  // Allow unauthenticated access to /auth routes if not verified
  if (pathname.startsWith("/auth") && !verifiedToken) {
    return NextResponse.next(); // Allow the request to continue
  }

  // Redirect authenticated users from /auth to /
  if (pathname.startsWith("/auth") && verifiedToken) {
    return NextResponse.redirect(new URL("/", origin));
  }

  // Redirect unauthenticated users to /auth/login
  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  return NextResponse.next(); // Allow the request to continue
}

export const config = {
  matcher: [
    "/admin/:path*", // Protect all /admin routes
    "/auth/:path*", // Protect all /auth routes
  ],
};
