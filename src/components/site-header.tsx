"use client";

import { useEffect, useRef } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SiteMenu } from "@/components/site-menu";
import { SiteSearch } from "@/components/site-search";
import { ContactDialog } from "@/components/contact-dialog";

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let previousY = window.scrollY;
    let direction = 0;
    let distance = 0;
    let frame = 0;

    function updateHeader() {
      frame = 0;
      const header = headerRef.current;
      if (!header) return;
      // Clamp elastic overscroll so bouncing at either edge does not flip direction.
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const currentY = Math.min(maxY, Math.max(0, window.scrollY));
      const delta = currentY - previousY;
      previousY = currentY;

      if (currentY <= 0) {
        header.dataset.scrollHidden = "false";
        distance = 0;
        direction = 0;
        return;
      }

      // Keep open dialogs and keyboard navigation in view.
      if (header.querySelector("dialog[open], :focus-visible")) {
        header.dataset.scrollHidden = "false";
        distance = 0;
        return;
      }

      if (!delta) return;
      const nextDirection = Math.sign(delta);
      distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta);
      direction = nextDirection;
      // Ignore tiny scroll movements to prevent flicker on trackpads and touch screens.
      if (distance < 8) return;
      header.dataset.scrollHidden = direction < 0 ? "true" : "false";
      distance = 0;
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div id="top" className="site-top" aria-hidden="true" />
      <header ref={headerRef} className="site-header" onFocusCapture={() => {
        if (headerRef.current) headerRef.current.dataset.scrollHidden = "false";
      }}>
        <div className="site-header-identity">
          <SiteMenu />
          <span className="site-wordmark">{"<JustDev/>"}</span>
        </div>

        <div className="site-header-actions">
          <SiteSearch />
          <ContactDialog />
          <ThemeSwitcher />
        </div>
      </header>
    </>
  );
}
