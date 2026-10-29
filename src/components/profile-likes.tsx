"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";

const storageKey = "just-dev:profile-liked";
const changeEvent = "just-dev:profile-like-change";
let savedLiked: boolean | undefined;

function getLikedSnapshot() {
  if (savedLiked === undefined) {
    try { savedLiked = window.localStorage.getItem(storageKey) === "true"; }
    catch { savedLiked = false; }
  }
  return savedLiked;
}

function saveLiked(liked: boolean) {
  savedLiked = liked;
  try { window.localStorage.setItem(storageKey, String(liked)); } catch { /* Keep the toggle usable when storage is blocked. */ }
  window.dispatchEvent(new Event(changeEvent));
}

function subscribeToLike(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === storageKey || event.key === null) {
      savedLiked = event.newValue === "true";
      onChange();
    }
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, onChange);
  };
}

type LikesContext = {
  liked: boolean;
  message: string;
  toggleLike: () => void;
};
const Context = createContext<LikesContext | null>(null);
const getServerSnapshot = () => false;

export function ProfileLikesProvider({ children }: { children: ReactNode }) {
  const liked = useSyncExternalStore(subscribeToLike, getLikedSnapshot, getServerSnapshot);
  const [message, setMessage] = useState("");

  function toggleLike() {
    const nextLiked = !getLikedSnapshot();
    saveLiked(nextLiked);
    setMessage(nextLiked ? "Thank you for the love!" : "Like removed.");
  }

  return <Context.Provider value={{ liked, message, toggleLike }}>{children}</Context.Provider>;
}

export function useProfileLikes() {
  const value = useContext(Context);
  if (!value) throw new Error("Profile likes must be inside ProfileLikesProvider");
  return value;
}

