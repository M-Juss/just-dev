"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BookIcon, BriefcaseIcon, CodeIcon, CodeSquareIcon, HomeIcon, MarkGithubIcon, PersonIcon, ThreeBarsIcon, TrophyIcon, XIcon } from "@primer/octicons-react";

const navigationGroups = [
  {
    label: "Profile",
    links: [
      { name: "Overview", href: "#top", Icon: HomeIcon },
      { name: "About", href: "#intro-heading", Icon: PersonIcon },
      { name: "Education", href: "#education-heading", Icon: BookIcon },
    ],
  },
  {
    label: "Work & experience",
    links: [
      { name: "Freelance projects", href: "#freelance-heading", Icon: BriefcaseIcon },
      { name: "Hackathons", href: "#hackathons-heading", Icon: CodeSquareIcon },
      { name: "School competitions", href: "#school-competitions-heading", Icon: TrophyIcon },
    ],
  },
  {
    label: "Activity & skills",
    links: [
      { name: "GitHub activity", href: "#activity-heading", Icon: MarkGithubIcon },
      { name: "Tech stack", href: "#stack-heading", Icon: CodeIcon },
    ],
  },
] as const;

export function SiteMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  function openMenu() {
    if (dialogRef.current?.open) return;
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button className="header-icon-button menu-toggle" type="button" aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={dialogId} onClick={openMenu}>
        <ThreeBarsIcon size={16} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        id={dialogId}
        className="site-menu"
        aria-labelledby={titleId}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeMenu();
        }}
      >
        <div className="site-menu-heading">
          <span className="site-wordmark">{"<JustDev/>"}</span>
          <h2 id={titleId} className="sr-only">Portfolio navigation</h2>
          <button className="site-menu-close" type="button" aria-label="Close navigation menu" onClick={closeMenu}><XIcon size={20} aria-hidden="true" /></button>
        </div>
        <nav aria-label="Portfolio sections">
          {navigationGroups.map((group) => (
            <div className="site-menu-group" key={group.label}>
              <h3>{group.label}</h3>
              <ul>{group.links.map(({ name, href, Icon }) => (
                <li key={href}><a href={href} onClick={closeMenu}><Icon size={20} aria-hidden="true" /><span>{name}</span></a></li>
              ))}</ul>
            </div>
          ))}
        </nav>
      </dialog>
    </>
  );
}
