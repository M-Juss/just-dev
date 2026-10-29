import type { ContributionDay } from "./dashboard-types";

export function contributionWeeks(days: ContributionDay[]) {
  if (!days.length) return [];
  const lookup = new Map(days.map((day) => [day.date, day]));
  const start = new Date(`${days[0].date}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());
  const end = new Date(`${days.at(-1)!.date}T00:00:00Z`);
  const weeks: (ContributionDay | null)[][] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    const week: (ContributionDay | null)[] = [];
    for (let day = 0; day < 7; day++) {
      week.push(lookup.get(cursor.toISOString().slice(0, 10)) ?? null);
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}
