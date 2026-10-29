import { TodayOverview } from "@/components/today-overview";
import { GitHubActivity } from "@/components/github-activity";
import { TechStack } from "@/components/tech-stack";
import type { CSSProperties } from "react";

const introduction = "A developer in the making.";

export function ProfileDashboard() {
  return (
    <div className="profile-content">
      <div className="profile-initial">
        <TodayOverview />
        <section className="profile-introduction" aria-labelledby="intro-heading">
          <h2 id="intro-heading"><span className="typing-headline" style={{ "--typing-characters": introduction.length } as CSSProperties}>{introduction}</span></h2>
          <p className="intro-description">I explore new technologies and apply best practices to build web and mobile software that solves real problems. From understanding what people need to refining the details, I focus on practical solutions that are useful, reliable, and easy to use. Every project is a chance to learn, improve, and turn an idea into something that works.</p>
        </section>
        <div className="dashboard-bottom"><GitHubActivity /><TechStack /></div>
      </div>
    </div>
  );
}
