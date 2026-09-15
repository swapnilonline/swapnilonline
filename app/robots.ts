import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/fit/result", "/program", "/call", "/offer.pdf", "/foundation-7-day-plan.pdf"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
