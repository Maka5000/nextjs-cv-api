import { fetchEducations } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const useridQuery = req.nextUrl.searchParams.get("userid");
    const establishmentQuery = req.nextUrl.searchParams.get("establishment");
    const programQuery = req.nextUrl.searchParams.get("program");
    const degreeQuery = req.nextUrl.searchParams.get("degree");

    const educations = await fetchEducations({
      userid: useridQuery!,
      establishment: establishmentQuery!,
      program: programQuery!,
      degree: degreeQuery!,
    });

    return NextResponse.json({ educations: educations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
