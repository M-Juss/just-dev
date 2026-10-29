export const MANILA_TIME_ZONE = "Asia/Manila";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: MANILA_TIME_ZONE,
  year: "numeric",
  month: "short",
  weekday: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export function getManilaTime(timestamp: number) {
  const parts = Object.fromEntries(
    formatter.formatToParts(timestamp).map(({ type, value }) => [type, value]),
  );
  const isoDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: MANILA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(timestamp);

  return {
    month: parts.month.toUpperCase(),
    day: parts.day,
    year: parts.year,
    weekday: parts.weekday,
    time: `${parts.hour}:${parts.minute}`,
    period: parts.dayPeriod,
    isoDate,
  };
}

export function describeWeather(code: number) {
  if (code === 0) return "Clear skies";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "Rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy";
  if ([80, 81, 82].includes(code)) return "Rain showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorms";
  return "Conditions unavailable";
}
