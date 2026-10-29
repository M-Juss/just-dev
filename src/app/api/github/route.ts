import { connection } from "next/server";
import { getGitHubActivity } from "@/lib/dashboard-data";
import { getManilaTime } from "@/lib/manila-time";

export async function GET() {
  await connection();
  try {
    const { isoDate } = getManilaTime(Date.now());
    return Response.json(await getGitHubActivity(isoDate), {
      headers: { "Cache-Control": "public, max-age=300, s-maxage=1800" },
    });
  } catch {
    return Response.json({ error: "GitHub activity is unavailable. Please try again." }, { status: 503 });
  }
}
