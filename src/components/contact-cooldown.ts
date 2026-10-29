"use client";

import { useSyncExternalStore } from "react";
import { contactCooldownSeconds } from "@/lib/contact-form";

const key = "just-dev:contact-cooldown-until";
const changeEvent = "just-dev:contact-cooldown-change";
let memoryDeadline = 0;

function getRemaining() {
  let deadline = memoryDeadline;
  try {
    const stored = Number(window.localStorage.getItem(key));
    if (Number.isFinite(stored)) deadline = Math.max(deadline, stored);
  } catch { /* Use memory if storage is unavailable. */ }
  return Math.min(contactCooldownSeconds * 3, Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
}

export function startContactCooldown(seconds = contactCooldownSeconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return;
  memoryDeadline = Date.now() + Math.min(seconds, contactCooldownSeconds * 3) * 1000;
  try { window.localStorage.setItem(key, String(memoryDeadline)); } catch { /* The current visit still observes the cooldown. */ }
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 1000);
  const onStorage = (event: StorageEvent) => { if (event.key === key || event.key === null) onChange(); };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("focus", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("focus", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

export function useContactCooldown() {
  return useSyncExternalStore(subscribe, getRemaining, () => 0);
}
