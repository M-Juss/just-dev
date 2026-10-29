import { SiteHeader } from "@/components/site-header";
import { ProfileSidebar } from "@/components/profile-sidebar";
import { ProfileEducation } from "@/components/profile-education";
import { ProfileDashboard } from "@/components/profile-dashboard";
import { FreelanceProjects } from "@/components/freelance-projects";
import { Hackathons } from "@/components/hackathons";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="profile-layout">
        <ProfileSidebar />
        <ProfileEducation />
        <ProfileDashboard />
        <div className="freelance-content"><FreelanceProjects /><Hackathons /></div>
      </main>
    </>
  );
}
