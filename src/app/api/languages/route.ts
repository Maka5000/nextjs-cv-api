import { withApiKeyCheck } from "@/app/lib/withApiKeyCheck";
import { fetchLanguages } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  try {
    const userid = req.nextUrl.searchParams.get("userid");
    const languageQuery = req.nextUrl.searchParams.get("language");
    const levelQuery = req.nextUrl.searchParams.get("level");

    const languages = await fetchLanguages({
      userid: userid!,
      language: languageQuery!,
      level: levelQuery!,
    });

    return NextResponse.json({ languages: languages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export const GET = withApiKeyCheck(handler);
