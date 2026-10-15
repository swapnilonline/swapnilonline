import { site } from "@/lib/site";
import { trustpilot } from "@/lib/reviews";

/**
 * Site-wide entity markup, rendered once in the root layout.
 * Person (the author and the business are the same entity), WebSite, and the
 * consulting service, so search and answer engines can resolve who is speaking
 * and what is offered. Pages add their own Article / FAQ / Breadcrumb markup.
 */
export default function SiteJsonLd() {
  const personId = `${site.url}/about#person`;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId,
      name: site.name,
      url: `${site.url}/about`,
      image: `${site.url}/swapnil-portrait.jpg`,
      jobTitle: site.role,
      description: `${site.role}. ${site.years}, ${site.websites}. ${site.teaches}.`,
      knowsAbout: [
        "Work from home business",
        "Online business from home",
        "Digital services business",
        "Digital consulting",
        "Digital products",
        "Recurring income",
        "Sales funnels",
        "Lead generation",
        "Website design",
        "Social media advertising",
      ],
      address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
      sameAs: [trustpilot.url],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.domain,
      description: site.description,
      inLanguage: "en-IN",
      publisher: { "@id": personId },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: `${site.name} · ${site.role}`,
      url: site.url,
      image: `${site.url}/swapnil-portrait.jpg`,
      description: site.description,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
      founder: { "@id": personId },
      address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: trustpilot.score,
        bestRating: 5,
        ratingCount: trustpilot.count,
        url: trustpilot.url,
      },
      makesOffer: {
        "@type": "Offer",
        name: "Free 30-minute Launch Call",
        price: 0,
        priceCurrency: "INR",
        url: `${site.url}/fit`,
        description: "Your skill's potential, positioning, market, offer and earning, mapped in 30 minutes. Take the Fit Score first.",
      },
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
