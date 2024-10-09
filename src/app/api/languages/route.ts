import { fetchLanguages } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const languages = await fetchLanguages();

    return NextResponse.json({ languages: languages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
