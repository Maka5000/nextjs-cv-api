import { withApiKeyCheck } from "@/app/lib/withApiKeyCheck";
import { fetchJobs } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  try {
    const useridQuery = req.nextUrl.searchParams.get("userid");
    const companyQuery = req.nextUrl.searchParams.get("company");
    const positionQuery = req.nextUrl.searchParams.get("position");
    const experienceQuery = req.nextUrl.searchParams.get("experience");

    const jobs = await fetchJobs({
      userid: useridQuery!,
      company: companyQuery!,
      position: positionQuery!,
      experience: experienceQuery!,
    });

    return NextResponse.json({ jobs: jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export const GET = withApiKeyCheck(handler);
