"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

const themes = [
  { value: "light", label: "Light default" },
  { value: "dark", label: "Dark default" },
  { value: "system", label: "System" },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  // Storage is available after hydration; keep the server and initial client UI equal.
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

  return (
    <div className="theme-switcher" role="group" aria-label="Color theme">
      {themes.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={mounted && theme === value}
          disabled={!mounted}
          onClick={() => setTheme(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
