import Image from "next/image";
import { CodeIcon, DatabaseIcon } from "@primer/octicons-react";
import { techStack } from "@/data/tech-stack";

export function TechStack() {
  return (
    <section className="dashboard-panel stack-panel" data-reveal aria-labelledby="stack-heading">
      <div className="dashboard-panel-heading"><h3 id="stack-heading"><CodeIcon size={16} aria-hidden="true" />Tech stack</h3><span className="dashboard-note">My toolkit</span></div>
      <ul className="tech-grid">
        {techStack.map(({ name, icon, monochrome }) => (
          <li key={name}>
            <div className="tech-tile" role="img" aria-label={name} tabIndex={0}>
              {icon ? <Image className={monochrome ? "tech-logo tech-logo-mono" : "tech-logo"} src={`/icons/${icon}.svg`} alt="" width={34} height={34} /> : <DatabaseIcon size={30} aria-hidden="true" />}
            </div>
            <span className="tech-tooltip" aria-hidden="true">{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
