export const site = {
  name: "Swapnil Shiwalay",
  domain: "swapnilonline.com",
  url: "https://swapnilonline.com",
  title: "A 6-Figure Recurring Income, From Home, Without a Job",
  description:
    "Start an online business selling digital services, consulting or products, and build it toward a 6-figure recurring income, from home, without a job. A free call maps your skill, positioning, market, offer and earning potential. Then 7 days of hand-holding, or the 90-day setup challenge, 1:1.",
  role: "Digital Business Consultant",
  years: "20 years working from home",
  websites: "2,500+ websites developed",
  program: "The 90-Day Digital Business Setup Challenge",
  programShort: "90-Day Setup Challenge",
  programSub: "1:1, from your skill to a 6-figure recurring income, from home, without a job",
  programPrice: "₹75,000",
  programInstalments: "3 × ₹27,500",
  foundation: "The 7-Day Digital Business Foundation",
  foundationShort: "7-Day Foundation",
  foundationPrice: "₹7,500",
  /** The number the whole offer is designed around. Framed as a target, never a promise. */
  target: "a 6-figure monthly recurring income",
  foundationLine: "Seven days of hand-holding before you launch. You finish with 100% clarity on your digital business.",
  audience: "Anyone who wants to start an online business selling digital services, digital consulting or digital products.",
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
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
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
