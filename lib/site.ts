export const site = {
  name: "Swapnil Shiwalay",
  domain: "swapnilonline.com",
  url: "https://swapnilonline.com",
  title: "Turn Your Skill Into Paying Clients",
  description:
    "Your first paying client in 90 days, from home, with 1:1 guidance from someone who has done it for 20 years. For freelancers, consultants and solopreneurs. Ends with a client, or we keep going.",
  role: "Digital Business Consultant",
  years: "20 years working from home",
  websites: "2,500+ websites developed",
  program: "HOME → BUSINESS",
  programSub: "The 1:1 Digital Business Launch Program",
  /** Booking page shown after a qualified application. Set in .env */
  calUrl: process.env.NEXT_PUBLIC_CAL_URL ?? "",
  /** WhatsApp click-to-chat number in international format, digits only. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  callsPerWeek: 6,
  teaches: "Teaches social media advertising at Mithibai College, Mumbai",
  /** Optional YouTube id for the home-page video. Empty means the self-hosted /home-video.mp4 is used. */
  homeVideoId: process.env.NEXT_PUBLIC_HOME_VIDEO_ID ?? "",
  tagline: "Teacher | Entrepreneur",
} as const;

/** Named in the personal-brand deck. Text only; no likeness used. */
export const personalBrands = [
  "Dharmendra",
  "Sunny Deol",
  "Daboo Malik",
  "Arunabh Kumar (TVF)",
  "Sri M",
  "R. H. Soni",
  "Dr. Ravi Singh",
  "Dr. Bhushan Kumar",
] as const;

/** Brands in the logo strip image, plus those the image doesn't include. */
export const corporateBrandsExtra = [
  "Starshine",
  "Stoosa",
  "ILA",
  "PSC",
  "Neminath",
  "Total",
] as const;

export const nav = [
  { href: "/program", label: "Program" },
  { href: "/about", label: "About" },
  { href: "/fit", label: "Fit Score" },
] as const;

export const stages = [
  {
    key: "discover",
    n: 1,
    name: "Discover",
    line: "You can name your first customer and say their problem in their words.",
  },
  {
    key: "design",
    n: 2,
    name: "Design",
    line: "You've chosen Consulting, Coaching or Services, and stopped hedging.",
  },
  {
    key: "package",
    n: 3,
    name: "Package",
    line: "You have an offer you can say in one sentence, with a price in it.",
  },
  {
    key: "build",
    n: 4,
    name: "Build",
    line: "Your page is live and it books you. No more \"I'll send you something\".",
  },
  {
    key: "launch",
    n: 5,
    name: "Launch",
    line: "You have your first paying client. Paid, not promised.",
  },
  {
    key: "systemize",
    n: 6,
    name: "Systemize",
    line: "The second client arrives without you starting from zero.",
  },
  {
    key: "scale",
    n: 7,
    name: "Scale",
    line: "Revenue grows without your hours growing with it.",
  },
] as const;

export type StageKey = (typeof stages)[number]["key"];
