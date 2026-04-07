import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const session = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  //note: can add more routes later
  if (!session && pathname.startsWith("/dashboard")) {
    const url = new URL("/login", request.url);
    url.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(url);
  }

  if (session && (pathname === "/login" || pathname === "/")) {
    const url = new URL("/dashboard", request.url);
    url.searchParams.set("toast", "welcome_back");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
