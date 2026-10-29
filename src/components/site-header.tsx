import { ThemeSwitcher } from "@/components/theme-switcher";
import { SiteMenu } from "@/components/site-menu";
import { SiteSearch } from "@/components/site-search";
import { ContactDialog } from "@/components/contact-dialog";

export function SiteHeader() {
  return (
    <header className="site-header" id="top">
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
  );
}
