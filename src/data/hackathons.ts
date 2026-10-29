export type Hackathon = {
  id: string;
  name: string;
  eventName: string;
  eventUrl: string;
  date: string;
  teamSize: number;
  role: string;
  participation: string;
  tagline: string;
  summary: string;
  logo: { src: string; alt: string; width: number; height: number; background?: string };
  demoUrl: string;
  technologies: readonly string[];
  tools: readonly string[];
  concept: string;
  contributions: readonly { title: string; description: string }[];
  learnings: readonly string[];
  screenshots: readonly {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }[];
};

export const hackathons: readonly Hackathon[] = [
  {
    id: "vanora",
    name: "VANORA",
    eventName: "RevenueCat Shipyard: Creator Contest",
    eventUrl: "https://revenuecat-shipyard-2026.devpost.com/",
    date: "February 2026",
    teamSize: 4,
    role: "Frontend Developer",
    participation: "Participant",
    tagline: "Connection and community for life on the road.",
    summary:
      "A mobile dating and community app for nomads and van-lifers. VANORA brings together matching, a community feed, and shared activities to help people connect while traveling.",
    logo: {
      src: "/images/hackathons/vanora/logo.webp",
      alt: "VANORA logo",
      width: 512,
      height: 512,
    },
    demoUrl: "https://www.youtube.com/watch?v=AUoarYOxjNI",
    technologies: ["React Native", "NativeWind", "Expo Go"],
    tools: ["Visual Studio Code", "GitHub", "Mobbin"],
    concept:
      "The team explored how a mobile platform could meet the needs of a nomadic community through dating, friendships, and activities. The concept also considered access to mechanics for van-related assistance and a subscription model to support monetization. VANORA was developed for the hackathon and has not been publicly launched.",
    contributions: [
      {
        title: "Frontend and user experience",
        description:
          "Designed and built mobile interfaces with React Native and NativeWind, considering the nomadic community’s interests, technical familiarity, and ease of navigation.",
      },
      {
        title: "Team collaboration",
        description:
          "Coordinated with the project manager, backend developer, and documentation specialist to keep the interface, implementation, and product story aligned.",
      },
      {
        title: "GitHub workflow",
        description:
          "Worked with branches, commits, pushes, pulls, merges, and code reviews to collaborate on a shared codebase.",
      },
      {
        title: "Product presentation",
        description:
          "Created the video presentation to introduce the concept and showcase the application developed by the team.",
      },
    ],
    learnings: [
      "Translate user needs and problems into clear mobile flows for a specific community.",
      "Communicate across project roles and use shared GitHub workflows to build together.",
      "Consider monetization alongside the product experience and explain the concept through a focused demo.",
    ],
    screenshots: [
      {
        src: "/images/hackathons/vanora/signup.webp",
        alt: "VANORA account creation screen",
        caption: "Create account",
        width: 590,
        height: 1280,
      },
      {
        src: "/images/hackathons/vanora/login.webp",
        alt: "VANORA login screen",
        caption: "Log in",
        width: 590,
        height: 1280,
      },
      {
        src: "/images/hackathons/vanora/feed.webp",
        alt: "VANORA community feed with posts and shared trips",
        caption: "Community feed",
        width: 590,
        height: 1280,
      },
      {
        src: "/images/hackathons/vanora/events.webp",
        alt: "VANORA upcoming community gatherings screen",
        caption: "Events",
        width: 590,
        height: 1280,
      },
      {
        src: "/images/hackathons/vanora/matching.webp",
        alt: "VANORA matching screen with a profile and shared interests",
        caption: "Find a match",
        width: 576,
        height: 1280,
      },
      {
        src: "/images/hackathons/vanora/profile.webp",
        alt: "VANORA profile screen with a photo gallery and nomad preferences",
        caption: "Profile",
        width: 590,
        height: 1280,
      },
      {
        src: "/images/hackathons/vanora/privacy.webp",
        alt: "VANORA privacy and safety screen with location visibility options",
        caption: "Privacy & safety",
        width: 590,
        height: 1280,
      },
      {
        src: "/images/hackathons/vanora/subscription.webp",
        alt: "VANORA subscription concept screen with premium features",
        caption: "Subscription",
        width: 590,
        height: 1280,
      },
    ],
  },
  {
    id: "matyag",
    name: "MATYAG",
    eventName: "CICS Batang Techno 2026 · Batangas State University",
    eventUrl: "https://batangtechno.vercel.app/",
    date: "March 2026",
    teamSize: 4,
    role: "Frontend Developer",
    participation: "Participant",
    tagline: "Civic information, made easier to explore.",
    summary:
      "A civic transparency app designed to help Filipino voters explore national candidates and officials, compare their records, and build a personal ballot in one place.",
    logo: {
      src: "/images/hackathons/matyag/logo.webp",
      alt: "MATYAG logo with a pixel-art owl holding binoculars",
      width: 900,
      height: 600,
      background: "#ffffff",
    },
    demoUrl: "https://www.facebook.com/share/v/18gUzoEQ5K/",
    technologies: ["React Native", "NativeWind", "Expo Go"],
    tools: ["Visual Studio Code", "GitHub"],
    concept:
      "Named after the Filipino word for watching with vigilance, MATYAG was developed for a local hackathon initiated by Batangas State University. The concept brings experience, legislative records, filed cases, and family background into accessible candidate profiles, alongside side-by-side comparisons and personal ballot creation. The team focused on making civic information easier to understand and navigate.",
    contributions: [
      {
        title: "Civic research",
        description:
          "Researched legislative and legal processes to understand how civic information could be organized and presented clearly in the app.",
      },
      {
        title: "Mobile frontend and navigation",
        description:
          "Built mobile interfaces with React Native and NativeWind, focusing on familiar navigation and clear information layouts for Filipino users.",
      },
      {
        title: "Comparison and ballot interfaces",
        description:
          "Designed screens for exploring candidate profiles, comparing records, selecting ballot entries, and reviewing a completed ballot.",
      },
      {
        title: "Application presentation",
        description:
          "Created the video presentation to introduce MATYAG and showcase the application developed by the team.",
      },
    ],
    learnings: [
      "Understand legislative and legal processes before translating civic information into a product experience.",
      "Make detailed information easier to navigate through clear hierarchy and familiar mobile interactions.",
      "Apply mobile development conventions and communicate the product through a focused video demonstration.",
    ],
    screenshots: [
      { src: "/images/hackathons/matyag/ballot-senators.webp", alt: "MATYAG ballot screen showing selected senator entries", caption: "Senator selections", width: 590, height: 1279 },
      { src: "/images/hackathons/matyag/ballot-vice-president.webp", alt: "MATYAG ballot screen showing a vice president selection", caption: "Vice president selection", width: 590, height: 1279 },
      { src: "/images/hackathons/matyag/ballot-president.webp", alt: "MATYAG ballot screen showing a president selection", caption: "President selection", width: 590, height: 1279 },
      { src: "/images/hackathons/matyag/ballot-summary.webp", alt: "MATYAG completed ballot summary and sharing screen", caption: "Ballot summary", width: 590, height: 1279 },
      { src: "/images/hackathons/matyag/compare.webp", alt: "MATYAG side-by-side candidate record comparison screen", caption: "Candidate comparison", width: 590, height: 1279 },
      { src: "/images/hackathons/matyag/home.webp", alt: "MATYAG candidate directory with search and position filters", caption: "Candidate directory", width: 590, height: 1279 },
      { src: "/images/hackathons/matyag/ballot-party-list.webp", alt: "MATYAG ballot screen showing a party-list selection", caption: "Party-list selection", width: 590, height: 1279 },
    ],
  },
];
