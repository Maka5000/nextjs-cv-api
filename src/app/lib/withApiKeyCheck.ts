import { fetchApiKeyByUserId } from "./data";
import { compareApiKey, updateApiKeyLastUsed } from "./actions";
import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";

type Handler = (req: NextRequest) => NextResponse | Promise<NextResponse>;

export function withApiKeyCheck(handler: Handler): Handler {
  return async (req: NextRequest) => {
    try {
      if (req.headers.get("x-authenticated")) {
        return handler(req);
      }

      const apiKeyHeader = req.headers.get("x-api-key");
      const userId = req.headers.get("userid");

      if (!apiKeyHeader || !userId) {
        return NextResponse.json({ message: "Api key or userid is missing" });
      }

      const redis = new Redis(process.env.REDIS_URL!);
      const RATE_LIMIT = 100;
      const WINDOW_SECONDS = 60;

      const fetchedApiKey = await fetchApiKeyByUserId(userId);

      if(!fetchedApiKey) {
        return NextResponse.json({message : "Api key doesn't exist or expired. Please create a new api key."})
      }

      const api_key_hash = fetchedApiKey.api_key_hash;

      const isValid = await compareApiKey(apiKeyHeader, api_key_hash);

      if (!isValid) {
        return NextResponse.json({ message: "Invalid api key." });
      }

      const rateLimitedKey = `rate-limit:${apiKeyHeader}`;
      const count = await redis.incr(rateLimitedKey);

      if (count === 1) {
        await redis.expire(rateLimitedKey, WINDOW_SECONDS);
      }

      if (count > RATE_LIMIT) {
        return NextResponse.json({
          message: `Rate limit exceeded! Wait for ${WINDOW_SECONDS} seconds.`,
        });
      }

      const date_now = new Date();
      await updateApiKeyLastUsed(userId, date_now.toISOString());

      return handler(req);
    } catch (err: any) {
      console.error(err)
      return NextResponse.json({ error: err.message });
    }
  };
}
