"use client";

import { useLayoutEffect } from "react";

export function PageMotion() {
  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("main [data-reveal]"));
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches || !("IntersectionObserver" in window)) return;

    function finish(element: HTMLElement) {
      element.dataset.revealState = "done";
    }

    function reveal(element: HTMLElement) {
      if (element.dataset.revealState === "done" || element.dataset.revealState === "visible") return;
      element.dataset.revealState = "visible";
      observer.unobserve(element);
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      }
    }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });

    for (const element of elements) {
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom <= 0) finish(element);
      else if (bounds.top < window.innerHeight) reveal(element);
      else {
        element.dataset.revealState = "pending";
        observer.observe(element);
      }
    }

    function onAnimationEnd(event: AnimationEvent) {
      if (event.animationName === "panel-reveal" && event.target instanceof HTMLElement) finish(event.target);
    }

    function showTarget(event: Event) {
      if (!(event.target instanceof HTMLElement)) return;
      const panel = event.target.closest<HTMLElement>("[data-reveal]");
      if (!panel) return;
      observer.unobserve(panel);
      finish(panel);
    }

    function showHashTarget() {
      let target: HTMLElement | null = null;
      try { target = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); } catch { return; }
      const panel = target?.closest<HTMLElement>("[data-reveal]");
      if (panel) { observer.unobserve(panel); finish(panel); }
    }

    function onMotionPreferenceChange() {
      if (!motionPreference.matches) return;
      observer.disconnect();
      elements.forEach(finish);
    }

    document.addEventListener("animationend", onAnimationEnd);
    document.addEventListener("focusin", showTarget);
    window.addEventListener("hashchange", showHashTarget);
    motionPreference.addEventListener("change", onMotionPreferenceChange);
    showHashTarget();

    return () => {
      observer.disconnect();
      elements.forEach((element) => delete element.dataset.revealState);
      document.removeEventListener("animationend", onAnimationEnd);
      document.removeEventListener("focusin", showTarget);
      window.removeEventListener("hashchange", showHashTarget);
      motionPreference.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return null;
}
