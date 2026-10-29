import {
  ArrowUpRightIcon,
  BookIcon,
  CheckIcon,
  ChevronDownIcon,
  CodeSquareIcon,
  PlayIcon,
  RepoIcon,
} from "@primer/octicons-react";
import { hackathons } from "@/data/hackathons";
import { ProjectGallery } from "@/components/project-gallery";

export function Hackathons() {
  return (
    <section className="hackathons-section" aria-labelledby="hackathons-heading">
      <div className="freelance-section-heading" data-reveal>
        <h2 id="hackathons-heading"><CodeSquareIcon size={18} aria-hidden="true" />Hackathons <span className="project-count">{hackathons.length}</span></h2>
        <span className="freelance-section-note">Built with a team</span>
      </div>

      <div className="freelance-project-list">
        {hackathons.map((project) => (
          <article className="freelance-project hackathon-card" data-reveal key={project.id} aria-labelledby={`${project.id}-heading`}>
            <header className="project-heading">
              <h3 id={`${project.id}-heading`}><RepoIcon size={18} aria-hidden="true" />{project.name}</h3>
              <span className="hackathon-badge">{project.participation}</span>
            </header>

            <div className="project-overview">
              <div className="project-preview">
                <ProjectGallery projectName={project.name} images={[{ ...project.logo, caption: project.name }, ...project.screenshots]} />
              </div>
              <div className="project-summary">
                <h4>{project.tagline}</h4>
                <p>{project.summary}</p>
                <a className="hackathon-event-link" href={project.eventUrl} target="_blank" rel="noopener noreferrer">{project.eventName}<ArrowUpRightIcon size={12} aria-hidden="true" /></a>
                <dl className="project-role"><div><dt>My role</dt><dd>{project.role}</dd></div></dl>
              </div>
              <dl className="project-lifecycle"><div><dt>Participated</dt><dd>{project.date}</dd></div><div><dt>Team</dt><dd>{project.teamSize} people</dd></div></dl>
              <div className="project-links"><a href={project.demoUrl} target="_blank" rel="noopener noreferrer"><PlayIcon size={14} aria-hidden="true" />Watch presentation<ArrowUpRightIcon size={12} aria-hidden="true" /></a></div>
            </div>

            <details className="project-details">
              <summary><BookIcon size={16} aria-hidden="true" /><span>Project details</span><ChevronDownIcon className="project-details-chevron" size={16} aria-hidden="true" /></summary>
              <div className="project-readme">
                <section><h4>Product concept</h4><p>{project.concept}</p></section>
                <section className="project-deliverables"><h4>My contribution</h4><ul>{project.contributions.map(({ title, description }) => <li key={title}><strong>{title}</strong><p>{description}</p></li>)}</ul></section>
                <section className="project-outcomes"><h4>What I practiced</h4><ul>{project.learnings.map((learning) => <li key={learning}><CheckIcon size={14} aria-hidden="true" /><span>{learning}</span></li>)}</ul></section>
                <dl className="project-tools"><div><dt>Technologies &amp; Tools</dt><dd>{[...project.technologies, ...project.tools].join(" · ")}</dd></div></dl>
              </div>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
