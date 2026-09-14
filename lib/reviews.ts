/**
 * Reviews from https://www.trustpilot.com/review/swapnilonline.com
 * Quotes are verbatim excerpts. Trim with an ellipsis, never reword.
 * Update `trustpilot` whenever the score or count changes.
 */

export const trustpilot = {
  url: "https://www.trustpilot.com/review/swapnilonline.com",
  score: 4.3,
  label: "Excellent", // Trustpilot's own label for this score
  count: 9,
  fiveStarShare: 100,
  claimedSince: "December 2020",
} as const;

export type Review = {
  name: string;
  country: string; // ISO code as shown on Trustpilot
  where?: string; // more specific place when the reviewer gave one
  date: string; // as shown on Trustpilot
  title: string;
  quote: string; // verbatim excerpt used on the site
  full?: string; // verbatim full review, when available
  relationship?: string; // context in our words, not theirs
  featured?: boolean;
  /**
   * Optional photo, e.g. "/reviewers/kumar.jpg" in /public.
   * Only add a photo the person has agreed to have on this site.
   * Without one, the site shows their initials.
   */
  avatar?: string;
};

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const countryNames: Record<string, string> = {
  IN: "India",
  AU: "Australia",
  CA: "Canada",
  US: "United States",
  GB: "United Kingdom",
};

export function placeOf(r: Review): string {
  return r.where ?? countryNames[r.country] ?? r.country;
}

export const reviews: Review[] = [
  {
    name: "Kumar Bahirwani",
    country: "IN",
    date: "Jul 26, 2022",
    title: "AN EXCELLENT GUIDE",
    quote:
      "Swapnil helped me begin on my journey in the digital space. He's always been there since offering expert advice and doing a little bit of hand holding too.",
    full: "Swapnil helped me begin on my journey in the digital space. He's always been there since offering expert advice and doing a little bit of hand holding too. Overall His experience and expertise has been of immense help to me I have enjoyed every step of my journey associated with him",
    relationship: "Started his digital business with Swapnil",
    featured: true,
  },
  {
    name: "Sanjeev Makkar",
    country: "AU",
    where: "ASHNLP, Australia",
    date: "Jul 7, 2021",
    title: "Very Professional & Easy to Understand step by Step Process",
    quote:
      "I was just a beginner / novice in this industry, after couple of days of sessions with Swapnil, I felt confident and started building my own project with his help which I have never thought of doing it before.",
    full: "When I came across through Swapnil and his Company, I was surprised to see his Structured way of delivery the things. His way of delivery is so simple that even you can understand and clicked in a single go. His experience and knowledge is the main strength behind his professionalism. I found him very creative and unique then other competitors in the market just because of his simplicity and letting people understand the Concept and Digital Tools. I was just a beginner / novice in this industry, after couple of days of sessions with Swapnil, I felt confident and started building my own project with his help which I have never thought of doing it before. I wish him good luck and best wishes for his future endeavours. Regards Sanjeev Makkar - ASHNLP Australia",
    relationship: "Beginner who built his own project after 1:1 sessions",
    featured: true,
  },
  {
    name: "Shaurin Shah",
    country: "AU",
    where: "Gold Coast, Australia",
    date: "Jul 5, 2021",
    title: "swapnilonline.com for trustworthy digital services",
    quote:
      "I know him for the past 16 years and have used his professional services for several web initiatives in Australia. He has been my sounding board and digital advisor for a number of innovative ideas.",
    full: "Swapnil is a very trustworthy and knowledgeable individual. He knows his subject matter very well. But more than anything else, his 'always ready to help' attitude stands him apart from the rest. I know him for the past 16 years and have used his professional services for several web initiatives in Australia. He has been my sounding board and digital advisor for a number of innovative ideas. Swapnil delivers continuous value and I highly recommend him as your next digital services partner. Thanks Shaurin Shah, Gold Coast, Australia",
    relationship: "Client for 16 years",
    featured: true,
  },
  {
    name: "Kanika Diges",
    country: "IN",
    date: "Nov 12, 2021",
    title: "A mentor with knowledge and a big heart.",
    quote:
      "Swapnil you are a rare human being who is generous with his knowledge, a professional and a mentor who is deeply invested in his students interest.",
    full: "Swapnil you are a rare human being who is generous with his knowledge, a professional and a mentor who is deeply invested in his students interest. Great to be connected.",
    relationship: "Mentored by Swapnil",
    featured: true,
  },
  {
    name: "Tarun Pandviya",
    country: "CA",
    date: "Sep 4, 2025",
    title: "I reached out to Swapnil for my lead generation business",
    quote:
      "His consultation was very professional but still very personal touch to the process. He did a good research, got a prefect frame work for what I was looking for this platform.",
    full: "I reached out to Swapnil for my lead generation business, he provided me with in-depth knowledge and solutions for setting up a highly efficient lead generation platform which will full fill all my business needs and help grow my business to next level. His consultation was very professional but still very personal touch to the process. He did a good research, got a prefect frame work for what I was looking for this platform. In short he understood my needs 100%, or as he say 93%.",
    relationship: "Consulting client, lead generation business",
  },
  {
    name: "Maitri Bheda",
    country: "IN",
    date: "Aug 3, 2024",
    title: "Highly skilled & knowledgable",
    quote:
      "I have been working with Swapnil for more than 15 years now, and it's clear that he knows his work inside and out.",
    full: "I have been working with Swapnil for more than 15 years now, and it's clear that he knows his work inside and out. I collaborated with him for my website designing as well as other digital requirements. His commitment to delivering quality work makes him a standout choice for all our digital needs.",
    relationship: "Website client for 15 years",
  },
  {
    name: "Prakash Yede",
    country: "IN",
    date: "Apr 14, 2021",
    title: "Trusted For Digital transformation",
    quote:
      "A thorough Professional with deep domain knowledge in digital space. Trusted resource for business digital transformation.",
    full: "Great Experience Working with Swapnil, A thorough Professional with deep domain knowledge in digital space. Trusted resource for business digital transformation.",
  },
  {
    name: "imvcs",
    country: "IN",
    date: "Apr 14, 2021",
    title: "Digital future and businesses",
    quote:
      "Becoming an entrepreneur, many many things and businesses emerging out of digital platforms all I have been able to know and understand because of Swapnil.",
    full: "Digital world and its relevance today. Becoming an entrepreneur, many many things and businesses emerging out of digital platforms all I have been able to know and understand because of Swapnil. Great going and helpful and insightful.....",
  },
  {
    name: "Uttam Singh Gautam",
    country: "IN",
    date: "Oct 16, 2024",
    title: "Great work with innovative ideas..",
    quote: "Great work with innovative ideas..",
  },
];

export const featuredReviews = reviews.filter((r) => r.featured);
