import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <>
      <header className="preview-header">
        <div className="preview-header-inner">
          <span className="preview-brand">M-Juss</span>
          <span className="preview-badge">Portfolio in progress</span>
        </div>
      </header>
      <main className="appearance-preview">
        <p className="preview-label">Appearance preview</p>
        <h1>A familiar feel. A personal space.</h1>
        <p className="preview-description">
          A first look at the fonts and colors for my portfolio.
        </p>

        <section className="preview-panel" aria-labelledby="typography-heading">
          <div className="preview-panel-heading">
            <h2 id="typography-heading">Typography</h2>
          </div>
          <div className="preview-panel-content">
            <p className="preview-label">Space Mono / Headings</p>
            <p className="font-sample-heading">Space Mono &amp; Roboto Mono</p>
            <p className="preview-label">Roboto Mono / Body</p>
            <p className="font-sample-body">
              Clean lines, a little character, and room for the work to speak.
              Welcome to my corner of the web.
            </p>
          </div>
        </section>

        <section className="preview-panel" aria-labelledby="theme-heading">
          <div className="preview-panel-heading">
            <h2 id="theme-heading">Color theme</h2>
          </div>
          <div className="preview-panel-content">
            <p>Make yourself at home.</p>
            <p className="preview-note">
              Choose a theme. Your preference is saved for your next visit.
            </p>
            <ThemeSwitcher />
          </div>
        </section>
        <p className="preview-note">Mark Justin Sayson / M-Juss</p>
      </main>
    </>
  );
}
