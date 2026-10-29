"use client";

import { ArrowUpRightIcon, MarkGithubIcon } from "@primer/octicons-react";
import type { GitHubActivity as Activity } from "@/lib/dashboard-types";
import { useDashboardData } from "@/lib/use-dashboard-data";
import { contributionWeeks } from "@/lib/github-calendar-view";

export function GitHubActivity() {
  const { data, error, retry } = useDashboardData<Activity>("/api/github?range=last-year", 3600000);
  const weeks = data ? contributionWeeks(data.days) : [];
  const monthLabels: { label: string; week: number }[] = [];
  let lastMonth = "";
  weeks.forEach((week, index) => {
    const first = week.find((day) => day !== null);
    if (!first) return;
    const month = first.date.slice(0, 7);
    if (month !== lastMonth && (index > 0 || Number(first.date.slice(-2)) <= 7)) {
      monthLabels.push({ label: new Date(`${first.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }), week: index });
    }
    lastMonth = month;
  });

  return (
    <section className="dashboard-panel activity-panel" aria-labelledby="activity-heading">
      <div className="dashboard-panel-heading"><h3 id="activity-heading"><MarkGithubIcon size={16} aria-hidden="true" /> GitHub activity</h3><a href="https://github.com/M-Juss" target="_blank" rel="noopener noreferrer" aria-label="View M-Juss on GitHub"><ArrowUpRightIcon size={16} /></a></div>
      {data ? (
        <div className="activity-body">
          <p className="activity-total"><strong>{data.total.toLocaleString()}</strong> contributions in the last year</p>
          <div className="activity-scroll" role="region" aria-label="Contribution calendar, scroll horizontally to explore" tabIndex={0}>
            <svg className="contribution-chart" viewBox={`0 0 ${weeks.length * 12 + 28} 116`} role="img" aria-label={`${data.total} GitHub contributions over the past year. Each square represents one day.`}>
              {monthLabels.map(({ label, week }) => <text className="chart-label" key={`${label}-${week}`} x={28 + week * 12} y={11}>{label}</text>)}
              {[{ label: "Mon", row: 1 }, { label: "Wed", row: 3 }, { label: "Fri", row: 5 }].map(({ label, row }) => <text className="chart-label" key={label} x={0} y={31 + row * 12}>{label}</text>)}
              {weeks.flatMap((week, column) => week.map((day, row) => day && (
                <rect key={day.date} x={28 + column * 12} y={22 + row * 12} width={9} height={9} rx={2} className={`contribution-cell level-${day.level}`}>
                  <title>{day.count} {day.count === 1 ? "contribution" : "contributions"} on {day.date}</title>
                </rect>
              )))}
            </svg>
          </div>
          <div className="activity-footer"><a href="https://github.com/M-Juss?tab=overview" target="_blank" rel="noopener noreferrer">View full activity ↗</a><div className="activity-legend" aria-label="Contribution intensity, from less to more"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} className={`legend-cell level-${level}`} />)}<span>More</span></div></div>
          {error && <p className="dashboard-note" role="status">Showing the last available activity. <button type="button" onClick={retry}>Retry</button></p>}
        </div>
      ) : error ? (
        <div className="dashboard-empty" role="status"><p>Activity unavailable</p><span>We couldn’t reach GitHub right now.</span><button type="button" onClick={retry}>Try again</button></div>
      ) : <div className="activity-loading" role="status"><span>Loading public contributions…</span><div className="calendar-placeholder" aria-hidden="true" /></div>}
    </section>
  );
}
