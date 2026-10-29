"use client";

import { useEffect, useState } from "react";
import { CloudIcon, MoonIcon, SunIcon, ZapIcon } from "@primer/octicons-react";
import { describeWeather, getManilaTime } from "@/lib/manila-time";
import { useDashboardData } from "@/lib/use-dashboard-data";
import type { TodayWeather } from "@/lib/dashboard-types";

function FilledCardValue({ text }: { text: string }) {
  return (
    <>
      <svg className="card-value-svg" viewBox="0 8 240 34" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <text x="0" y="40" fontSize="40" letterSpacing="0" textLength="240" lengthAdjust="spacingAndGlyphs" fill="currentColor">{text}</text>
      </svg>
      <span className="sr-only">{text}</span>
    </>
  );
}

export function TodayOverview() {
  const [timestamp, setTimestamp] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setTimestamp(Date.now());
    const first = requestAnimationFrame(tick);
    const timer = setInterval(tick, 1000);
    return () => { cancelAnimationFrame(first); clearInterval(timer); };
  }, []);
  const today = timestamp === null ? null : getManilaTime(timestamp);
  const weather = useDashboardData<TodayWeather>(today ? `/api/weather?date=${today.isoDate}` : null, 600000);
  const data = weather.data?.date === today?.isoDate ? weather.data : null;
  const WeatherIcon = data && data.code >= 95 ? ZapIcon : data && data.code > 1 ? CloudIcon : data?.isDay === false ? MoonIcon : SunIcon;

  return (
    <section className="today-overview" aria-label="Today in Manila">
      <div className="today-card date-card" data-reveal aria-label="Today's date">
        <div className="today-card-top"><p className="today-label">{today?.year ?? "—"}</p></div>
        <time className="today-value date-display" dateTime={today?.isoDate} aria-label={today ? `${today.month} ${today.day}, ${today.year}` : "Loading date"}>
          <FilledCardValue text={today ? `${today.month} ${today.day}` : "— —"} />
        </time>
      </div>
      <div className="today-card clock-card" data-reveal>
        <div className="today-card-top"><p className="today-label">Manila, Philippines</p><span className="clock-period">{today?.period ?? "—"}</span></div>
        <time className="today-value clock-display" aria-label={today ? `${today.time} ${today.period}, Manila time` : "Loading time"}><FilledCardValue text={today?.time ?? "--:--"} /></time>
      </div>
      <div className="today-card weather-card" data-reveal aria-busy={!data && !weather.error}>
        <div className="today-card-top">
          <p className="today-label">{today?.weekday ?? "—"}</p>
          {data && <span className="weather-condition" title={describeWeather(data.code)}>{describeWeather(data.code)}</span>}
        </div>
        {data ? (
          <>
            <div className="weather-current"><span className="today-value"><FilledCardValue text={`${Math.round(data.temperature)}°C`} /></span><WeatherIcon size={32} aria-hidden="true" /></div>
            {weather.error && <span className="sr-only">Showing the last available weather reading.</span>}
          </>
        ) : weather.error ? (
          <div className="weather-error" role="status"><p>Weather unavailable</p><button type="button" onClick={weather.retry}>Try again</button></div>
        ) : <div className="weather-loading" role="status"><span className="today-value"><FilledCardValue text="—°C" /></span><p>Checking today’s skies…</p></div>}
      </div>
    </section>
  );
}
