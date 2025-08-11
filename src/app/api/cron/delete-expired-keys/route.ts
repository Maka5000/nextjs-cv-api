import { sql } from "@vercel/postgres";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    console.log({error : "Unauthorized"});
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const result =
    await sql`DELETE FROM apikeys WHERE lastusedat IS NOT NULL AND lastusedat < ${oneMonthAgo.toISOString()} RETURNING *`;
  revalidateTag("apikey");

  const jsonResponse = {
    result: {
      rows: result.rows,
      rowCount: result.rowCount,
      message: "Expired keys was deleted.",
    },
  };

  console.log(jsonResponse);

  return NextResponse.json(jsonResponse);
}
