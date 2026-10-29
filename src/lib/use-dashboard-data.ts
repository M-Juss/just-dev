"use client";

import { useEffect, useState } from "react";

export function useDashboardData<T>(url: string | null, interval: number) {
  const [state, setState] = useState<{ data: T | null; error: string | null }>({ data: null, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!url) return;
    const requestUrl = url;
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(requestUrl, { signal: controller.signal });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Unable to load data.");
        if (!controller.signal.aborted) setState({ data: result, error: null });
      } catch (error) {
        if (!controller.signal.aborted) setState((previous) => ({
          ...previous, error: error instanceof Error ? error.message : "Unable to load data.",
        }));
      }
    }
    void load();
    const timer = setInterval(load, interval);
    return () => { controller.abort(); clearInterval(timer); };
  }, [url, interval, attempt]);

  function retry() {
    setState((previous) => ({ ...previous, error: null }));
    setAttempt((value) => value + 1);
  }
  return { ...state, retry };
}
