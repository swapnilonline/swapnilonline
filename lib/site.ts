export const site = {
  name: "Swapnil Shiwalay",
  domain: "swapnilonline.com",
  url: "https://swapnilonline.com",
  title: "Your Home Can Be Your Business",
  description:
    "Launch a digital business with 1:1 guidance from someone who has worked from home for 20 years. For solopreneurs, freelancers and consultants.",
  role: "Digital Business Strategist",
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
    line: "Find your expertise, opportunity and ideal customer.",
  },
  {
    key: "design",
    n: 2,
    name: "Design",
    line: "Choose your business model: Consulting, Coaching or Services.",
  },
  {
    key: "package",
    n: 3,
    name: "Package",
    line: "Turn your knowledge or skill into a clear, sellable offer.",
  },
  {
    key: "build",
    n: 4,
    name: "Build",
    line: "Create your brand, website, portfolio, pricing and essential digital presence.",
  },
  {
    key: "launch",
    n: 5,
    name: "Launch",
    line: "Get your first prospects, conversations and clients.",
  },
  {
    key: "systemize",
    n: 6,
    name: "Systemize",
    line: "Build repeatable processes for sales, delivery, communication and operations.",
  },
  {
    key: "scale",
    n: 7,
    name: "Scale",
    line: "Increase revenue, improve margins, automate and build a team when needed.",
  },
] as const;

export type StageKey = (typeof stages)[number]["key"];
