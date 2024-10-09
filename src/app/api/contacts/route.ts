import { fetchContacts } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const contacts = await fetchContacts();

    return NextResponse.json({ contacts: contacts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
