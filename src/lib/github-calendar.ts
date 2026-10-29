import { load } from "cheerio";
import type { ContributionDay } from "./dashboard-types";

// Only parse data. Upstream HTML is never rendered in the portfolio.
export function parseGitHubCalendar(html: string) {
  const $ = load(html);
  const tooltips = new Map<string, string>();
  $("tool-tip[for]").each((_, element) => {
    tooltips.set($(element).attr("for")!, $(element).text().trim());
  });

  const days = new Map<string, ContributionDay>();
  $(".ContributionCalendar-day[data-date][data-level]").each((_, element) => {
    const cell = $(element);
    const date = cell.attr("data-date")!;
    const level = Number(cell.attr("data-level"));
    const tooltip = tooltips.get(cell.attr("id") ?? "") ?? "";
    const countMatch = tooltip.match(/^(No|[\d,]+)\s+contributions?\b/i);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isInteger(level) || level < 0 || level > 4 || !countMatch) {
      throw new Error("GitHub calendar markup could not be read.");
    }
    const count = /^no$/i.test(countMatch[1]) ? 0 : Number(countMatch[1].replaceAll(",", ""));
    days.set(date, { date, count, level });
  });
  if (days.size === 0) throw new Error("GitHub calendar is unavailable.");

  const sorted = [...days.values()].sort((a, b) => a.date.localeCompare(b.date));
  const heading = $("#js-contribution-activity-description").text().trim();
  const totalMatch = heading.match(/^([\d,]+)\s+contributions?\b/i);
  const total = totalMatch
    ? Number(totalMatch[1].replaceAll(",", ""))
    : sorted.reduce((sum, day) => sum + day.count, 0);
  return { total, days: sorted };
}

