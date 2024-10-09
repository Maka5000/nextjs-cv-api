import { fetchEducations } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const educations = await fetchEducations();
    return NextResponse.json({ educations: educations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
