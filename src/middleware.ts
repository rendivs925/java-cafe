import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "./constanst";
import { verifyAuth } from "./lib/auth";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));

  if (req.nextUrl.pathname.startsWith("/auth") && !verifiedToken) {
    return;
  }

  if (req.url.includes("/auth") && verifiedToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|about|_next/static|_next/image|favicon.ico|$).*)"],
};
