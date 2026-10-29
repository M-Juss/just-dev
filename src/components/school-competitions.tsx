import { ArrowUpRightIcon, BookIcon, CheckIcon, ChevronDownIcon, FileBadgeIcon, MortarBoardIcon, TrophyIcon } from "@primer/octicons-react";
import { ProjectGallery } from "@/components/project-gallery";
import { schoolCompetitions, schoolCompetitionExperience as experience } from "@/data/school-competitions";

export function SchoolCompetitions() {
  const images = schoolCompetitions.flatMap((competition) => competition.images.map((image) => ({ ...image, caption: `${competition.name} · ${image.caption}` })));
  return (
    <section className="school-competitions-section" aria-labelledby="school-competitions-heading">
      <div className="freelance-section-heading" data-reveal>
        <h2 id="school-competitions-heading"><MortarBoardIcon size={18} aria-hidden="true" />School competitions <span className="project-count">{schoolCompetitions.length}</span></h2>
        <span className="freelance-section-note">Local level</span>
      </div>
      <div className="freelance-project-list">
        <article className="freelance-project school-competition-card" data-reveal aria-labelledby="codefest-heading">
          <header className="project-heading">
            <h3 id="codefest-heading"><TrophyIcon size={18} aria-hidden="true" />Codefest · 2026 &amp; 2025</h3>
            <span className="competition-result">1st Runner-up × 2</span>
          </header>
          <div className="project-overview">
            <div className="project-preview"><ProjectGallery projectName="Codefest 2026 & 2025" images={images} /></div>
            <div className="project-summary">
              <h4>{experience.tagline}</h4>
              <p>{experience.summary}</p>
              <p className="competition-organizer">{experience.organizer}</p>
              <dl className="project-role"><div><dt>My role</dt><dd>{experience.role}</dd></div></dl>
            </div>
            <dl className="project-lifecycle">{schoolCompetitions.map((competition) => <div key={competition.id}><dt>{competition.name}</dt><dd>{competition.date}</dd></div>)}</dl>
            <div className="project-links">{schoolCompetitions.map((competition) => <a key={competition.id} href={competition.images[1].src} target="_blank" rel="noopener noreferrer"><FileBadgeIcon size={14} aria-hidden="true" />View {competition.name.slice(-4)} certificate<ArrowUpRightIcon size={12} aria-hidden="true" /></a>)}</div>
          </div>
          <details className="project-details">
            <summary><BookIcon size={16} aria-hidden="true" /><span>Competition details</span><ChevronDownIcon className="project-details-chevron" size={16} aria-hidden="true" /></summary>
            <div className="project-readme">
              <section className="project-deliverables"><h4>My contribution</h4><ul>{experience.contributions.map(({ title, description }) => <li key={title}><strong>{title}</strong><p>{description}</p></li>)}</ul></section>
              <section className="project-outcomes"><h4>What I practiced</h4><ul>{experience.learnings.map((learning) => <li key={learning}><CheckIcon size={14} aria-hidden="true" /><span>{learning}</span></li>)}</ul></section>
              <dl className="project-tools"><div><dt>Technologies &amp; Tools</dt><dd>{experience.technologiesAndTools.join(" · ")}</dd></div></dl>
            </div>
          </details>
        </article>
      </div>
    </section>
  );
}
