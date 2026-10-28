"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@primer/octicons-react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  // Keep the initial UI equal on the server and client before reading preferences.
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const label = mounted ? `Switch to ${nextTheme} mode` : "Toggle color theme";

  return (
    <button
      className="header-icon-button theme-toggle"
      type="button"
      aria-label={label}
      title={label}
      disabled={!mounted}
      onClick={() => setTheme(nextTheme)}
    >
      <SunIcon className="theme-icon-sun" size={18} aria-hidden="true" />
      <MoonIcon className="theme-icon-moon" size={18} aria-hidden="true" />
    </button>
  );
}
