import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import { toast } from "sonner";

export async function proxy(request: NextRequest) {
  const session = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  //note: can add more routes later
  if (!session && pathname.startsWith("/dashboard")) {
    toast("Please login to access dashboard!");
    return NextResponse.redirect("/login");
  }

  if (session && (pathname === "/login" || pathname === "/")) {
    toast("Welcome back!");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
