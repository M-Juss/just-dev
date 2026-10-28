import { SiteHeader } from "@/components/site-header";
import { ProfileSidebar } from "@/components/profile-sidebar";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="profile-layout">
        <ProfileSidebar />
        {/* Portfolio sections will occupy this column as they are added. */}
        <div className="profile-content" />
      </main>
    </>
  );
}
