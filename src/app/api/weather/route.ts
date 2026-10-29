import { connection } from "next/server";
import { getTodayWeather } from "@/lib/dashboard-data";
import { getManilaTime } from "@/lib/manila-time";

export async function GET() {
  await connection();
  try {
    const { isoDate } = getManilaTime(Date.now());
    return Response.json(await getTodayWeather(isoDate), {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
    });
  } catch {
    return Response.json({ error: "Today's weather is unavailable. Please try again." }, { status: 503 });
  }
}
