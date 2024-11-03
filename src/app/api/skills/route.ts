import { fetchSkills } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const useridQuery = req.nextUrl.searchParams.get("userid");
    const nameQuery = req.nextUrl.searchParams.get("name");
    const levelQuery = req.nextUrl.searchParams.get("level");

    const skills = await fetchSkills({
      userid: useridQuery!,
      skillname: nameQuery!,
      skillLevel: levelQuery!,
    });

    return NextResponse.json({ skills: skills }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
