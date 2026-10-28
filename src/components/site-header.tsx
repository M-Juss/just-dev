import { MailIcon, SearchIcon, ThreeBarsIcon } from "@primer/octicons-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-identity">
        <button
          className="header-icon-button"
          type="button"
          aria-label="Open menu"
          disabled
        >
          <ThreeBarsIcon size={16} aria-hidden="true" />
        </button>
        <span className="site-wordmark">{"<JustDev/>"}</span>
      </div>

      <div className="site-header-actions">
        <button
          className="header-search"
          type="button"
          aria-label="Search portfolio"
          disabled
        >
          <SearchIcon size={16} aria-hidden="true" />
          <span className="header-search-label">
            Type <kbd>/</kbd> to search
          </span>
        </button>
        <button
          className="header-icon-button"
          type="button"
          aria-label="Contact"
          disabled
        >
          <MailIcon size={16} aria-hidden="true" />
        </button>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
