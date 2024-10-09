import { fetchSkills } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const skills = await fetchSkills();
    return NextResponse.json({ skills: skills }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
