export type FreelanceProject = {
  id: string;
  name: string;
  website: string;
  demoUrl?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  tagline: string;
  summary: string;
  role: string;
  ownership?: string;
  location?: string;
  lifecycle: readonly { label: string; value: string }[];
  stack: readonly string[];
  tools: readonly string[];
  problem: string;
  solution: string;
  contributions: readonly { title: string; description: string }[];
  outcomes: readonly string[];
};

export const freelanceProjects: readonly FreelanceProject[] = [
  {
    id: "tol-barbershop",
    name: "TOL Barbershop",
    website: "https://tolbarbershop.com",
    demoUrl: "https://www.facebook.com/reel/29499916459597094",
    image: {
      src: "/images/projects/tol-barbershop.webp",
      alt: "Public TOL Barbershop website homepage",
      width: 1600,
      height: 794,
    },
    tagline: "From Facebook messages to online appointments.",
    summary:
      "An online booking platform for a barbershop in General Trias, Cavite. Customers can choose services, check barber availability, and reserve appointments without coordinating every booking through Facebook messages.",
    role: "Full-stack Developer & DevOps",
    ownership: "Solo project",
    location: "General Trias, Cavite",
    lifecycle: [
      { label: "Started", value: "June" },
      { label: "Launched", value: "August" },
      { label: "Status", value: "Actively maintained" },
    ],
    stack: ["Next.js", "Laravel", "MySQL", "shadcn/ui", "Hostinger VPS"],
    tools: ["Visual Studio Code"],
    problem:
      "Staff previously handled booking inquiries one by one through Facebook, manually explaining available slots and barber schedules to each customer.",
    solution:
      "Built a website where customers can browse services, view barber availability, and book ahead, alongside tools that help the business manage appointments and review its performance.",
    contributions: [
      {
        title: "Client collaboration",
        description:
          "Met with the owner, presented the proposed solution, and incorporated feedback to turn business needs into a straightforward customer experience.",
      },
      {
        title: "End-to-end development",
        description:
          "Built the Next.js frontend and Laravel API with MySQL, focusing on clear booking flows for customers with different levels of technical experience.",
      },
      {
        title: "Deployment and safeguards",
        description:
          "Configured the Hostinger VPS, DNS, SSL, and daily database backups. Added request validation, rate limiting, and server access controls.",
      },
      {
        title: "Training and ongoing support",
        description:
          "Created a customer demo video, trained the owner and staff in person, and continue to maintain and improve the website.",
      },
    ],
    outcomes: [
      "Helps staff coordinate customers and appointments in real time.",
      "Gives the owner visibility into customer activity and trends.",
      "Provides useful reports and analytics for reviewing business performance.",
      "Establishes an online presence where customers can discover the business and book.",
    ],
  },
  {
    id: "dinks-on-us",
    name: "Dinks on Us",
    website: "https://dinksonusph.com/",
    image: {
      src: "/images/projects/dinks-on-us.webp",
      alt: "Public Dinks on Us website homepage showing its indoor pickleball courts",
      width: 1600,
      height: 793,
    },
    tagline: "Court reservations, from availability to payment.",
    summary:
      "An online court booking platform for a pickleball sports center in Bulacan. Players can check available slots for a chosen date, review pricing and equipment, and submit payment details to reserve their court time.",
    role: "Full-stack Developer & DevOps",
    ownership: "Solo project",
    location: "Bulacan",
    lifecycle: [
      { label: "Started", value: "August" },
      { label: "Launched", value: "September" },
      { label: "Status", value: "Actively maintained" },
    ],
    stack: ["Next.js", "Laravel", "MySQL", "shadcn/ui", "Hostinger VPS"],
    tools: ["Visual Studio Code"],
    problem:
      "Players need to find available court times for their chosen date, understand the cost, and arrange any equipment before making a reservation.",
    solution:
      "Built a booking flow that brings court availability, pricing, equipment selection, and payment submission together. Selected times are held while staff reviews the payment reference and receipt.",
    contributions: [
      {
        title: "Full-stack development",
        description:
          "Built the Next.js frontend and Laravel API with MySQL to support the court reservation experience.",
      },
      {
        title: "Reservations and payment submission",
        description:
          "Implemented date-based slot selection and a custom payment process using e-wallet or bank references and receipt uploads for staff review.",
      },
      {
        title: "Clear booking interface",
        description:
          "Organized court availability, pricing, and equipment options into a straightforward experience using shadcn/ui.",
      },
      {
        title: "Deployment and ongoing support",
        description:
          "Deployed the Next.js application, Laravel API, and MySQL database on a Hostinger VPS, and continue to monitor, maintain, and upgrade the system.",
      },
    ],
    outcomes: [
      "Provides an easy-to-navigate booking experience with a polished interface.",
      "Gives the business useful, reliable analytics for reviewing performance.",
      "Avoids additional payment-gateway costs through a custom, staff-reviewed payment process.",
      "Builds an online presence to help more customers discover the sports center, explore its offerings, and book a court.",
    ],
  },
];
