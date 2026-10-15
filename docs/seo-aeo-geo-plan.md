# SEO · AEO · GEO plan: Work from Home, Online Business, Freedom Business, Work from Anywhere

Written 15 Oct 2026. Goal: organic leads into the Fit Score (/fit) from Google search, Google AI Overviews / AI Mode, ChatGPT, Perplexity and Claude.

## 1. What the research says (Oct 2026)

**Search intent for the four themes**
- "Work from home" in India is dominated by two intents: people wanting real remote jobs, and people checking whether an offer is a scam. "Work from home business" is a smaller, higher-intent slice. Roundup sites (Bajaj Finserv, Godrej Capital, GoDaddy, Gromo) own the "25 ideas" listicles; nobody owns "work from home business that pays monthly" with a point of view. That is our angle.
- "Online business from home" searches cluster around: no money / without investment, for beginners, for students, which is best, how much it costs, GST and registration. Most results push dropshipping, affiliate and reselling. We position digital services as the no-capital answer and say plainly why the others are not.
- "Freedom business" has no standard definition online; it is informal shorthand for "lifestyle business" with three freedoms (time, location, income). Defining it cleanly is a citation opportunity for answer engines.
- "Work from anywhere" is mostly job content (remote jobs, digital nomad). "Work from anywhere business" is thin. The job-vs-business comparison is the entry.

**What answer and generative engines cite**
- AI Overviews and AI Mode mostly cite pages that already rank; top organic position roughly 40% chance of citation, but about half of citations come from outside the top ten. Classic SEO is still the entry ticket.
- The unit of citation is the passage, not the page: self-contained answers under clear headings, 40-60 words, with the question implied by the heading.
- Comparison content is cited most in multi-engine studies (about a third of citations), how-to guides next. Tables get lifted verbatim.
- Original data and a named, verifiable author (Person schema, sameAs, bio page, consistent profiles) matter more than schema tricks. Web mentions correlate with AI visibility about three times more strongly than backlinks.
- FAQPage rich results are gone from Google Search, but FAQ markup still helps answer engines parse Q&A. Keep it, matching visible content.
- llms.txt: not used by Google, low cost, unproven but harmless. Keep it short and curated.
- Make sure robots.txt does not block GPTBot, ClaudeBot, PerplexityBot, Google-Extended.

## 2. Keyword map

| Theme | Primary query | Supporting queries | Post |
| --- | --- | --- | --- |
| Work from home | work from home business india | work from home business ideas, without investment, for women, ghar baithe business | /blog/work-from-home-business-india |
| Work from home (intent capture) | work from home jobs vs business | genuine work from home jobs india, is work from home a scam, work from home income | /blog/work-from-home-jobs-vs-work-from-home-business |
| Online business | how to start an online business from home | online business without investment, for beginners, for students, best online business 2026 | /blog/how-to-start-an-online-business-from-home |
| Freedom business | what is a freedom business | lifestyle business, freedom business meaning, time freedom business | /blog/what-is-a-freedom-business |
| Work from anywhere | work from anywhere business | location independent business, run a business from anywhere, laptop business india | /blog/work-from-anywhere-business |

Every post: direct answer in the first paragraph, direct answer under every H2, one comparison table, Indian costs and rules (₹20 lakh GST threshold, sole proprietorship), the scam rule, Swapnil's own numbers (20 years, 2,500 sites, Trustpilot 4.4), FAQ section (FAQPage JSON-LD is generated from it), CTA to /fit, links to the Blueprints.

## 3. Implemented in this pass

- Five pillar posts above, cross-linked from six existing posts via `related`.
- Site-wide JSON-LD in `components/SiteJsonLd.tsx`: Person (@id, knowsAbout, sameAs Trustpilot), WebSite, ProfessionalService with AggregateRating and the free-call Offer. Articles already carry Article, BreadcrumbList, FAQPage.
- `public/llms.txt`: curated index with citable facts.
- `app/robots.ts`: explicit allow for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Bingbot, Applebot-Extended; private pages stay disallowed.
- Blog index title and description now carry the themes.

## 4. Off-site actions (Swapnil, 30 minutes each)

1. **Google Search Console**: verify www.swapnilonline.com, submit /sitemap.xml, request indexing for the five new URLs.
2. **Google Business Profile** as "Digital Business Consultant", Mumbai, website www.swapnilonline.com. Adds the entity Google trusts most for Indian local queries.
3. **LinkedIn**: headline "Digital Business Consultant · 20 years from home · 2,500+ websites", website field = www.swapnilonline.com. Then add the LinkedIn URL to `sameAs` in `components/SiteJsonLd.tsx`.
4. **Wikipedia-style corroboration**: Mithibai College faculty mention, Trustpilot profile text, any press. Same name, same title, same site everywhere.
5. **Mentions over backlinks**: answer two questions a week on Reddit (r/IndiaBusiness, r/developersIndia, r/freelanceIndia) and Quora with a genuine answer and, where allowed, the relevant post. Mentions of "Swapnil Shiwalay" + "swapnilonline.com" are what AI engines weigh.
6. **YouTube**: one 5-minute video per pillar post, same title, link in description. YouTube is the most-cited domain in AI Overviews.
7. **Bing Webmaster Tools**: ChatGPT search runs on Bing's index. Submit the sitemap there too.

## 5. Measure

- GA4: create a channel group "AI referrals" for chatgpt.com, perplexity.ai, claude.ai, copilot.microsoft.com, gemini.google.com.
- Monthly: ask ChatGPT, Perplexity and Google AI Mode the five primary queries above, note who is cited, log it in a sheet.
- Search Console: track impressions for the five primary queries; expect first impressions in 2-4 weeks, page-one movement in 2-3 months for the long-tail variants.

## 6. Next content (in order)

1. "Business ideas from home for women in India" (large, underserved with a services angle)
2. "How much does it cost to start an online business in India" (number-led, citable)
3. "Recurring income vs passive income" (definition post, our own term)
4. "Ghar baithe business kaise shuru kare" (Hindi, AI Overviews run in Hindi in India)
5. "Digital solopreneur: meaning and examples" (owns the home-page term)
