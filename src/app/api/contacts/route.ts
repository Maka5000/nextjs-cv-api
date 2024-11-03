import { fetchContacts } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const useridQuery = req.nextUrl.searchParams.get("userid");
    const typeQuery = req.nextUrl.searchParams.get("type");
    const contactQuery = req.nextUrl.searchParams.get("contact");

    const contacts = await fetchContacts({
      userid: useridQuery!,
      contactType: typeQuery!,
      contact: contactQuery!,
    });

    return NextResponse.json({ contacts: contacts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
