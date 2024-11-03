import { fetchApiUsers } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const usernameQuery = req.nextUrl.searchParams.get("name");
    const useridQuery = req.nextUrl.searchParams.get("userid");

    const users = await fetchApiUsers({
      userid: useridQuery!,
      username: usernameQuery!,
    });

    return NextResponse.json({ users: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
