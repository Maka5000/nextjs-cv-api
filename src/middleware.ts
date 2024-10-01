import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard) {
    if (isAuthenticated) {
      console.log("on dashboard");
      return NextResponse.next();
    }

    console.log("on dashboard, not authed");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  } else if (isAuthenticated) {
    console.log("just authed");
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/dashboard(.*)"],
};
