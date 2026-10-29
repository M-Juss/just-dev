"use client";

import { ArrowRightIcon, SearchIcon, XIcon } from "@primer/octicons-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { searchPortfolioLines } from "@/lib/portfolio-search";

type PortfolioLine = {
  text: string;
  section: string;
  element: HTMLElement;
};

function collectPortfolioLines(): PortfolioLine[] {
  const main = document.querySelector("main");
  if (!main) return [];
  const selectors = "h1, h2, h3, h4, p, dl > div, li, summary, .profile-contact a, .profile-socials a, .project-links a, .hackathon-event-link";
  return Array.from(main.querySelectorAll<HTMLElement>(selectors)).flatMap((element) => {
    if (element.closest("dialog, [aria-hidden='true'], .sr-only, .gallery-cover-count")) return [];
    if (element.tagName === "LI" && element.querySelector("h1, h2, h3, h4, p, dl, li")) return [];
    const content = element.matches("dl > div") ? Array.from(element.children).map((child) => child.textContent).join(" — ") : element.textContent;
    const text = content?.replace(/\s+/g, " ").trim();
    if (!text) return [];
    const articleTitle = element.closest("article")?.querySelector("h3")?.textContent;
    const sectionId = element.closest("section[aria-labelledby]")?.getAttribute("aria-labelledby")?.split(" ")[0];
    const sectionTitle = sectionId ? document.getElementById(sectionId)?.textContent : null;
    const section = (articleTitle || sectionTitle || "Profile").replace(/\s+/g, " ").trim();
    return [{ text, section, element }];
  });
}

function MatchedText({ text, query }: { text: string; query: string }) {
  const term = query.trim();
  const normalizedText = text.toLocaleLowerCase();
  const phraseAt = normalizedText.indexOf(term.toLocaleLowerCase());
  const wordAt = normalizedText.indexOf(term.split(/\s+/)[0].toLocaleLowerCase());
  const excerptStart = Math.max(0, (phraseAt >= 0 ? phraseAt : wordAt) - 60);
  const excerptEnd = Math.min(text.length, excerptStart + Math.max(240, term.length + 120));
  const excerpt = `${excerptStart ? "…" : ""}${text.slice(excerptStart, excerptEnd)}${excerptEnd < text.length ? "…" : ""}`;
  const matchAt = excerpt.toLocaleLowerCase().indexOf(term.toLocaleLowerCase());
  if (matchAt < 0 || !term) return <>{excerpt}</>;
  return <>{excerpt.slice(0, matchAt)}<mark>{excerpt.slice(matchAt, matchAt + term.length)}</mark>{excerpt.slice(matchAt + term.length)}</>;
}

export function SiteSearch() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const highlightRef = useRef<{ element: HTMLElement; timer: ReturnType<typeof setTimeout> } | null>(null);
  const dialogId = useId();
  const titleId = useId();
  const resultsId = useId();
  const statusId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [lines, setLines] = useState<PortfolioLine[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const allResults = searchPortfolioLines(lines, query);
  const results = allResults.slice(0, 50);
  const selectedIndex = Math.min(activeIndex, Math.max(0, results.length - 1));

  const openSearch = useCallback(() => {
    if (document.querySelector("dialog[open]")) return;
    setLines(collectPortfolioLines());
    setQuery("");
    setActiveIndex(0);
    dialogRef.current?.showModal();
    setIsOpen(true);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const target = event.target;
      const isTyping = target instanceof HTMLElement && (target.isContentEditable || !!target.closest("input, textarea, select"));
      const commandShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const slashShortcut = event.key === "/" && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey;
      if (event.defaultPrevented || (!commandShortcut && !slashShortcut) || document.querySelector("dialog[open]")) return;
      event.preventDefault();
      openSearch();
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [openSearch]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  useEffect(() => {
    resultRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex, query]);

  useEffect(() => () => {
    if (!highlightRef.current) return;
    clearTimeout(highlightRef.current.timer);
    highlightRef.current.element.classList.remove("search-line-highlight");
  }, []);

  function jumpToLine(result: PortfolioLine) {
    dialogRef.current?.close();
    let details = result.element.closest("details");
    while (details) {
      details.open = true;
      details = details.parentElement?.closest("details") ?? null;
    }
    if (highlightRef.current) {
      clearTimeout(highlightRef.current.timer);
      highlightRef.current.element.classList.remove("search-line-highlight");
    }
    const target = result.element;
    target.classList.add("search-line-highlight");
    highlightRef.current = { element: target, timer: setTimeout(() => target.classList.remove("search-line-highlight"), 3000) };
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    }
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" });
      target.focus({ preventScroll: true });
    });
  }

  return (
    <>
      <button className="header-search" type="button" aria-label="Search portfolio" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={dialogId} onClick={openSearch}>
        <SearchIcon size={16} aria-hidden="true" /><span className="header-search-label">Type <kbd>/</kbd> to search</span>
      </button>
      <dialog ref={dialogRef} id={dialogId} className="site-search" aria-labelledby={titleId} onClose={() => setIsOpen(false)} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
      }}>
        <h2 id={titleId} className="sr-only">Search portfolio</h2>
        <div className="site-search-input-row">
          <SearchIcon size={18} aria-hidden="true" />
          <input ref={inputRef} type="search" role="combobox" aria-label="Search portfolio content" aria-autocomplete="list" aria-expanded={isOpen} aria-controls={resultsId} aria-describedby={statusId} aria-activedescendant={results.length ? `${resultsId}-${selectedIndex}` : undefined} value={query} placeholder="Search projects, skills, education…" onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} onKeyDown={(event) => {
            if ((event.key === "ArrowDown" || event.key === "ArrowUp") && results.length) {
              event.preventDefault();
              setActiveIndex((index) => (index + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length);
            } else if (event.key === "Enter" && results[selectedIndex]) {
              event.preventDefault();
              jumpToLine(results[selectedIndex]);
            }
          }} />
          <button className="site-search-close" type="button" aria-label="Close search" onClick={() => dialogRef.current?.close()}><XIcon size={18} aria-hidden="true" /></button>
        </div>
        <p className="site-search-status" id={statusId} role="status">{!query.trim() ? "Type a letter or word to find matching lines." : allResults.length ? `${allResults.length} matching ${allResults.length === 1 ? "line" : "lines"}${allResults.length > results.length ? ` · Showing the first ${results.length}; keep typing to narrow the results.` : ""}` : `No lines found for “${query}”.`}</p>
        <ul className="site-search-results" id={resultsId} role="listbox" aria-label="Matching lines">
          {results.map((result, index) => <li key={`${result.section}-${index}`} role="presentation"><button ref={(element) => { resultRefs.current[index] = element; }} type="button" role="option" id={`${resultsId}-${index}`} aria-selected={selectedIndex === index} tabIndex={-1} onMouseEnter={() => setActiveIndex(index)} onClick={() => jumpToLine(result)}><span className="site-search-result-content"><span className="site-search-context">{result.section}</span><span className="site-search-line"><MatchedText text={result.text} query={query} /></span></span><ArrowRightIcon size={16} aria-hidden="true" /></button></li>)}
        </ul>
        <div className="site-search-hint"><span>↑ ↓ Navigate</span><span>Enter to jump</span><span>Esc to close</span></div>
      </dialog>
    </>
  );
}
