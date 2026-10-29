import Image from "next/image";
import {
  ArrowUpRightIcon,
  DeviceMobileIcon,
  MailIcon,
  MarkGithubIcon,
} from "@primer/octicons-react";
import { ProfileHeart } from "@/components/profile-heart";
import { profile } from "@/data/profile";

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.973h-1.513c-1.49 0-1.956.931-1.956 1.887v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

const socialLinks = [
  { name: "Facebook", href: profile.socials.facebook, Icon: FacebookIcon },
  { name: "GitHub", href: profile.socials.github, Icon: MarkGithubIcon },
  { name: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedInIcon },
];

export function ProfileSidebar() {
  return (
    <aside className="profile-sidebar" aria-labelledby="profile-name">
      <div className="profile-basics">
        <div className="profile-overview">
          <div className="profile-avatar">
            <div className="profile-avatar-frame">
              <Image
                className="profile-photo profile-photo-dark"
                src="/images/profile-dark.webp"
                alt={profile.name}
                width={800}
                height={800}
                sizes="(max-width: 767px) 112px, (max-width: 1094px) 220px, (max-width: 1459px) calc(20.833333vw - 8px), 296px"
                loading="eager"
              />
              <Image
                className="profile-photo profile-photo-light"
                src="/images/profile-light.webp"
                alt={profile.name}
                width={800}
                height={800}
                sizes="(max-width: 767px) 112px, (max-width: 1094px) 220px, (max-width: 1459px) calc(20.833333vw - 8px), 296px"
                loading="eager"
              />
            </div>
            <ProfileHeart />
          </div>
          <div className="profile-identity">
            <h1 id="profile-name">{profile.name}</h1>
          </div>
        </div>

        <div className="profile-contact">
          <a href={`mailto:${profile.email}`}>
            <MailIcon size={16} aria-hidden="true" />
            <span>{profile.email}</span>
          </a>
          <a href={profile.phoneHref}>
            <DeviceMobileIcon size={16} aria-hidden="true" />
            <span>{profile.phone}</span>
          </a>
        </div>
        <nav className="profile-socials" aria-label="Social profiles">
          {socialLinks.map(({ name, href, Icon }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer">
              <Icon size={16} aria-hidden="true" />
              <span>{name}</span>
              <ArrowUpRightIcon size={16} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
