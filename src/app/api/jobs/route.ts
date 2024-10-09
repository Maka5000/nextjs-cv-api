import { fetchJobs } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const jobs = await fetchJobs();

    return NextResponse.json({ jobs: jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
