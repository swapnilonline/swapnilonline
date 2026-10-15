import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const PRIVATE = ["/api/", "/fit/result", "/program", "/call", "/offer.pdf", "/foundation-7-day-plan.pdf"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      // AI crawlers are welcome on the public pages; the private ones stay private for them too.
      ...["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Bingbot", "Applebot-Extended"].map(
        (userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE }),
      ),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
