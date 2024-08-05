import { NextRequest, NextResponse } from "next/server";
import { UserJwtPayload, verifyAuth } from "./lib/auth";
import { COOKIE_NAME } from "./constanst";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log("Verification error:", err);
      return null; // Explicitly return null in case of error
    }));

  const { pathname, origin } = req.nextUrl;

  if (!verifiedToken) {
    // Allow unauthenticated access to /auth routes
    if (pathname.startsWith("/auth")) return NextResponse.next(); // Allow the request to continue
    if (pathname.startsWith("/shipping"))
      return NextResponse.redirect(new URL("/", origin));
  }

  const userRole = (verifiedToken as UserJwtPayload)?.role || "user";

  // Redirect authenticated users from /auth to /
  if (pathname.startsWith("/auth"))
    return NextResponse.redirect(new URL("/", origin));

  // Check for admin access
  if (pathname.startsWith("/admin")) {
    if (userRole !== "admin")
      return NextResponse.redirect(new URL("/auth/login", origin));
  }

  // Check for shipping access
  if (pathname.startsWith("/shipping")) {
    if (userRole !== "user") return NextResponse.redirect(new URL("/", origin));
  }

  return NextResponse.next(); // Allow the request to continue
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*", "/shipping/:path*"],
};
