import { cacheLife } from "next/cache";
import { parseGitHubCalendar } from "@/lib/github-calendar";
import type { GitHubActivity, TodayWeather } from "@/lib/dashboard-types";

export async function getGitHubActivity(day: string): Promise<GitHubActivity> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 86400 });
  const username = "M-Juss";
  const url = new URL(`https://github.com/users/${username}/contributions`);
  // GitHub's default endpoint is the rolling year. Supplying `to` alone selects
  // a calendar year instead. `day` remains part of this function's cache key.
  const response = await fetch(url, {
    headers: { Accept: "text/html", "Accept-Language": "en-US", "User-Agent": "JustDev-Portfolio" },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error("GitHub is temporarily unavailable.");
  const calendar = parseGitHubCalendar(await response.text());
  if (calendar.days.length < 300) throw new Error("GitHub returned an incomplete calendar.");
  return {
    username, ...calendar,
    days: calendar.days.filter((entry) => entry.date <= day),
    fetchedAt: new Date().toISOString(),
  };
}

type WeatherResponse = {
  current?: { temperature_2m: number; weather_code: number; is_day: number; time: string };
  daily?: { time: string[]; temperature_2m_max: number[]; temperature_2m_min: number[] };
};

export async function getTodayWeather(day: string): Promise<TodayWeather> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 600, expire: 1800 });
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.search = new URLSearchParams({
    latitude: "14.5995", longitude: "120.9842",
    current: "temperature_2m,weather_code,is_day",
    daily: "temperature_2m_max,temperature_2m_min",
    start_date: day, end_date: day, timezone: "Asia/Manila",
  }).toString();
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error("Weather is temporarily unavailable.");
  const data: WeatherResponse = await response.json();
  const current = data.current;
  const daily = data.daily;
  if (!current || !daily || daily.time[0] !== day ||
    ![current.temperature_2m, current.weather_code, daily.temperature_2m_max[0], daily.temperature_2m_min[0]].every(Number.isFinite)) {
    throw new Error("Weather data is incomplete.");
  }
  return {
    date: day, temperature: current.temperature_2m, high: daily.temperature_2m_max[0],
    low: daily.temperature_2m_min[0], code: current.weather_code, isDay: current.is_day === 1,
    observedAt: current.time, fetchedAt: new Date().toISOString(),
  };
}
