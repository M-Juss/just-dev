import Image from "next/image";
import {
  ArrowUpRightIcon,
  BookIcon,
  BriefcaseIcon,
  CheckIcon,
  ChevronDownIcon,
  GlobeIcon,
  PlayIcon,
  RepoIcon,
} from "@primer/octicons-react";
import { freelanceProjects } from "@/data/freelance-projects";

export function FreelanceProjects() {
  return (
    <section className="freelance-section" aria-labelledby="freelance-heading">
      <div className="freelance-section-heading" data-reveal>
        <h2 id="freelance-heading"><BriefcaseIcon size={18} aria-hidden="true" />Freelance projects <span className="project-count">{freelanceProjects.length}</span></h2>
        <span className="freelance-section-note">Client work</span>
      </div>

      <div className="freelance-project-list">
        {freelanceProjects.map((project) => (
          <article className="freelance-project" data-reveal key={project.id} aria-labelledby={`${project.id}-heading`}>
            <header className="project-heading">
              <h3 id={`${project.id}-heading`}><RepoIcon size={18} aria-hidden="true" /><a href={project.website} target="_blank" rel="noopener noreferrer">{project.name}</a></h3>
              <span className="project-live"><span aria-hidden="true" />Live</span>
            </header>

            <div className="project-overview">
              <div className="project-preview">
                <a href={project.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit the ${project.name} website`}>
                  <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1094px) 55vw, 400px" />
                </a>
              </div>

              <div className="project-summary">
                <h4>{project.tagline}</h4>
                <p>{project.summary}</p>
                <dl className="project-role">
                  <div><dt>Role</dt><dd>{project.role}</dd></div>
                  {project.ownership && <div><dt>Ownership</dt><dd>{project.ownership}</dd></div>}
                </dl>
              </div>

              <div className="project-links">
                <a href={project.website} target="_blank" rel="noopener noreferrer"><GlobeIcon size={14} aria-hidden="true" />Visit website<ArrowUpRightIcon size={12} aria-hidden="true" /></a>
                {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"><PlayIcon size={14} aria-hidden="true" />Watch demo<ArrowUpRightIcon size={12} aria-hidden="true" /></a>}
              </div>
              {project.lifecycle.length > 0 && <dl className="project-lifecycle">
                {project.lifecycle.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>}
            </div>

            <details className="project-details">
              <summary><BookIcon size={16} aria-hidden="true" /><span>Project details</span><ChevronDownIcon className="project-details-chevron" size={16} aria-hidden="true" /></summary>
              <div className="project-readme">
                <div className="project-context">
                  <section><h4>The problem</h4><p>{project.problem}</p></section>
                  <section><h4>The solution</h4><p>{project.solution}</p></section>
                </div>
                <section className="project-deliverables">
                  <h4>What I delivered</h4>
                  <ul>{project.contributions.map(({ title, description }) => <li key={title}><strong>{title}</strong><p>{description}</p></li>)}</ul>
                </section>
                {project.outcomes.length > 0 && <section className="project-outcomes">
                  <h4>Client feedback</h4>
                  <ul>{project.outcomes.map((outcome) => <li key={outcome}><CheckIcon size={14} aria-hidden="true" /><span>{outcome}</span></li>)}</ul>
                </section>}
                <dl className="project-tools"><div><dt>Technologies &amp; Tools</dt><dd>{[...project.stack, ...project.tools].join(" · ")}</dd></div></dl>
              </div>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
