import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnApi = req.nextUrl.pathname.startsWith("/api");

  if (isOnDashboard) {
    if (isAuthenticated) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", req.nextUrl));
  } else if (isOnApi) {
    if (isAuthenticated) {
      return NextResponse.next({ headers: { "x-authenticated": "true" } });
    }

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key, userid",
    };

    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    return NextResponse.next({ headers: corsHeaders });
  } else if (isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/dashboard(.*)", "/api/((?!auth))(.*)"],
};
