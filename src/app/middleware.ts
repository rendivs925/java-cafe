import { NextRequest, NextResponse } from "next/server";
import { UserJwtPayload, verifyAuth } from "./lib/auth";
import { COOKIE_NAME } from "./constanst";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log("Verification error:", err);
      return null;
    }));

  const { pathname, origin } = req.nextUrl;
  const userRole = (verifiedToken as UserJwtPayload)?.role || "user";

  if (!verifiedToken) {
    if (pathname.startsWith("/auth")) return NextResponse.next();
    if (
      pathname.startsWith("/shipping") ||
      pathname.startsWith("/cart") ||
      pathname.startsWith("/account/orders")
    )
      return NextResponse.redirect(new URL("/", origin));
  }

  if (pathname.startsWith("/account/orders") && userRole === "admin")
    return NextResponse.redirect(new URL("/", origin));

  if (pathname.startsWith("/auth"))
    return NextResponse.redirect(new URL("/", origin));

  if (pathname.startsWith("/admin")) {
    if (userRole !== "admin")
      return NextResponse.redirect(new URL("/auth/login", origin));
  }

  if (pathname.startsWith("/shipping")) {
    if (userRole !== "user") return NextResponse.redirect(new URL("/", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    "/shipping/:path*",
    "/cart/:path*",
    "/account/:path*",
  ],
};
