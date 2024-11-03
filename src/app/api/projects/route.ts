import { fetchProjects } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const useridQuery = req.nextUrl.searchParams.get("userid");
    const projectNameQuery = req.nextUrl.searchParams.get("name");

    const projects = await fetchProjects({
      userid: useridQuery!,
      projectname: projectNameQuery!,
    });

    return NextResponse.json({ projects: projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
