export const schoolCompetitionExperience = {
  organizer: "STI College Rosario · Tagisan ng Talino · Local level",
  role: "Backend Developer",
  duration: "6 hours",
  tagline: "From a problem brief to a working Android app.",
  summary:
    "A team programming competition where the school provides a problem and participants build a working mobile application within six hours. I focused on backend logic and local data storage, while also helping create reusable interface elements.",
  technologiesAndTools: ["Java", "SQLite", "Android Studio"],
  contributions: [
    { title: "Problem analysis", description: "Analyzed the problem and requirements with the team to identify the essential features and prioritize a working solution within the time limit." },
    { title: "Backend and database", description: "Prepared SQLite tables and reusable Java functions to support the application’s data and core behavior." },
    { title: "Input handling", description: "Implemented field validation and sanitization to keep the app’s inputs consistent and handle invalid entries." },
    { title: "Reusable interface elements", description: "Worked with the frontend to create reusable designs for repeated fields and keep the interface consistent." },
  ],
  learnings: [
    "Translate a time-limited problem brief into a focused, functional mobile application.",
    "Communicate and collaborate with teammates while balancing backend and frontend work.",
    "Use reusable functions, organized database tables, and input validation to support reliable app behavior.",
  ],
} as const;

export const schoolCompetitions = [
  {
    id: "codefest-2026",
    name: "Codefest 2026",
    result: "1st Runner-up",
    date: "March 11, 2026",
    images: [
      { src: "/images/competitions/codefest/2026-team.webp", alt: "Codefest 2026 team celebrating with medals and first runner-up certificates", caption: "Team recognition", width: 1400, height: 1050 },
      { src: "/images/competitions/codefest/2026-certificate.webp", alt: "Mark Justin M. Sayson’s first runner-up certificate for Codefest, Tagisan ng Talino 2025–2026, local level", caption: "1st Runner-up certificate", width: 1400, height: 977 },
    ],
  },
  {
    id: "codefest-2025",
    name: "Codefest 2025",
    result: "1st Runner-up",
    date: "March 6, 2025",
    images: [
      { src: "/images/competitions/codefest/2025-team.webp", alt: "Codefest 2025 team with medals and first runner-up certificates", caption: "Team recognition", width: 1400, height: 1050 },
      { src: "/images/competitions/codefest/2025-certificate.webp", alt: "Justin Sayson’s first runner-up certificate for Code Fest, Tagisan ng Talino 2024–25, local level", caption: "1st Runner-up certificate", width: 1400, height: 998 },
    ],
  },
] as const;
