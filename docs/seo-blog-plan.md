# SEO blog plan for swapnilonline.com

Goal: rank for the questions people search in the weeks before they would take the Fit Score, and route every article into it. India-first, English. Every post ends at `/fit`.

## What the search results look like today (September 2026)

| Cluster | What ranks now | The gap we fill |
|---|---|---|
| Start a consulting business from home, India | Registration and legal guides (Vyapar, RegisterKaro, Bajaj Finserv, IncorpX). Steps like "get a PAN, pick a structure". | Nobody answers the real first question: what do I sell, to whom, at what price. We lead with the offer and treat registration as a footnote. |
| Freelancer to business, consistent clients | Channel lists (15 channels, 9 techniques). Job platforms and portfolio advice. | The missing step is packaging. Chasing projects is a symptom of selling a skill instead of an offer. We say that plainly. |
| Pricing consulting or freelance work in India | Hourly-rate tables and per-hour ranges (₹5,000 to ₹25,000 per hour) that nobody at the start can charge. | A method: price the result, not the hour, with worked Indian examples and a script for saying the number. |
| Consulting vs coaching vs services | US-centric comparisons with dollar incomes. No India angle, no decision rule. | One question that decides it: done, decided, or taught. Plus the trap in each model. |
| First client without ads | Generic: network, cold outreach, communities, portfolio. | A specific message, a specific number of people, a specific week. |
| Do I need a website to start | Web-design agencies selling packages. | 2,500 websites of evidence that one page beats a brand. |

## Second batch: digital marketing questions (traffic, leads, funnels, digital products)

| Cluster | What ranks now | The gap we fill |
|---|---|---|
| Increase website traffic without paid ads | Agency listicles: SEO, content, social, local SEO, forums. Written for shops and media sites. | A service business needs thirty right visitors, not ten thousand. Direct sends first, search second, one platform third. |
| Get clients from LinkedIn as a consultant | "Post every day, be authentic" plus automation tools. | A three-hour-a-week method: profile as a page, two proof posts, ten messages, comments where buyers are. |
| Generate leads for a service business in India | Lead-list sellers and pay-per-lead platforms. | Five free sources ranked by quality, with a cost and yield table, and why lists fail. |
| What is a lead magnet | Format lists: ebook, checklist, webinar. | The one rule: it must be the first ten percent of the paid work. The follow-up is the product. |
| What is a sales funnel, how to build one | Seven-stage diagrams and software pitches. | A three-step funnel with real numbers, using this site's own funnel as the worked example. |
| Create and sell digital products in India | Product-idea lists and platform comparisons. | A product comes from a service you already deliver. Rupee price points, UPI, and where it slots into the funnel. |

## Keyword map

Primary keyword first, then the long-tail variants each article is written to catch.

1. **how to start a consulting business from home in india** · start consultancy from home, consulting business ideas india, home based consulting business
2. **how to get consistent clients as a freelancer** · freelancer to business owner, stop chasing projects, predictable freelance income india
3. **how to price consulting services in india** · freelance pricing india, per project vs hourly, how much to charge as a consultant india, value based pricing
4. **consulting vs coaching vs services** · which business model is right for me, coaching or consulting, done for you vs done with you
5. **how to get your first client** · first consulting client, first freelance client without ads, referral message template
6. **do i need a website to start a business** · one page website for consultants, freelancer website india, simple website for coaching business

7. **how to increase website traffic without paid ads** · organic traffic india, free ways to get website traffic, traffic for consultants
8. **how to get clients from linkedin** · linkedin for consultants india, linkedin posting strategy, linkedin lead generation freelancers
9. **how to generate leads for a service business** · lead generation small business india, leads without buying lists
10. **what is a lead magnet** · lead magnet examples for consultants, lead magnet ideas for coaches
11. **what is a sales funnel** · how to build a sales funnel, sales funnel for coaches, funnel for consultants
12. **how to create and sell digital products in india** · digital products to sell online india, sell templates online india

## Publishing calendar

| Week | Post | Promotion |
|---|---|---|
| 1 | Consulting vs coaching vs services | LinkedIn post with the one deciding question; link in comments |
| 2 | How to get your first client | Share the 3-line message as a text post; article link in comments |
| 3 | Start a consulting business from home, India | Reply on the Quora thread with a short answer and the link |
| 4 | Pricing in India | LinkedIn carousel: hourly vs offer, with the ₹45,000 clinic example |
| 5 | Freelancer to business | Instagram reel: "you don't have a client problem, you have an offer problem" |
| 6 | The one-page website | Post the four-section layout as an image |

| 7 | What is a sales funnel | LinkedIn: the three-step table as an image |
| 8 | Generate leads without buying lists | LinkedIn: the cost-and-yield table |
| 9 | LinkedIn for consultants | LinkedIn, naturally: the weekly schedule |
| 10 | What is a lead magnet | Instagram carousel: the one rule |
| 11 | Traffic without paid ads | Quora answer + link |
| 12 | Digital products from a service | LinkedIn: the three worked examples |

Then one post every two weeks. Next six topics, in order: "How to write an offer in one sentence", "Launch Call vs discovery call: what to say in the first 30 minutes", "Retainers for freelancers in India", "Proposal template for consultants", "How much time does a side business need", "LinkedIn for consultants in India who hate posting".

## On-page rules used in every post

- One H1, the target keyword in it, under 65 characters.
- Description under 160 characters, with the keyword and a result.
- H2s are questions or outcomes people actually search.
- First paragraph answers the question. No throat-clearing.
- A "Frequently asked questions" section with three to five real questions, which the site marks up as FAQ structured data.
- Internal links: at least two other posts, plus `/fit`, and one of `/program` or `/call`.
- Article, Breadcrumb and FAQ JSON-LD are generated automatically by the article page.
- 1,000 to 1,800 words. Long enough to be complete, short enough to finish. The first six run 980 to 1,260.

## Measuring

Google Search Console, free. Check monthly: which queries each post shows for, click-through rate on the title, and which posts send people to `/fit`. Rewrite the title of any post with impressions but under 2% clicks.

## Adding a post

Create `content/blog/<slug>.md` with this front matter and the body in Markdown:

```
---
title: ...
description: ...
date: 2026-09-15
keywords: a, b, c
cluster: Package
related: slug-one, slug-two
---
```

The blog index, sitemap, structured data and "read next" links update on the next build.
