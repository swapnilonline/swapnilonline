import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Journey from "@/components/Journey";
import { site } from "@/lib/site";
import { ReviewsSection } from "@/components/Reviews";

export const metadata: Metadata = {
  title: "HOME → BUSINESS, the 1:1 Digital Business Launch Program",
  description:
    "90 days of 1:1 work that ends with your first paying client. Your offer written, your website live by week 4, and a guarantee that we keep going until the client is real.",
};

const tiers = [
  {
    name: "Offer Design Intensive",
    price: "₹7,500",
    per: "one session",
    who: "One session. You leave with an offer you could sell tomorrow.",
    items: [
      "90 minutes 1:1, on your skill and your last three paid jobs",
      "A written one-page offer: result, customer, price, timeline",
      "Fee credited in full toward the program within 60 days",
    ],
    core: false,
  },
  {
    name: "LAUNCH",
    price: "₹75,000",
    per: "90 days · or 3 × ₹27,500 · $950",
    who: "Stages 1 to 5. Ends with your first paying client.",
    items: [
      "Week 1: a customer you can name",
      "Week 3: an offer with a price you've said out loud",
      "Week 4: your website live, built by me",
      "Week 8: five real conversations started",
      "Day 90: a paying client, or we keep going at no cost",
      "12 weekly 1:1 sessions plus WhatsApp on working days",
    ],
    core: true,
  },
  {
    name: "LAUNCH + SCALE",
    price: "₹1,40,000",
    per: "6 months · or 6 × ₹25,000 · $1,750",
    who: "Stages 1 to 7. Ends with a business that runs without you in every seat.",
    items: [
      "Everything in Launch",
      "Month 4: sales, delivery and operations on templates, not memory",
      "Month 5: prices raised and a second offer sold to existing clients",
      "Month 6: your first helper hired into a system, not into chaos",
      "24 weekly 1:1 sessions",
    ],
    core: false,
  },
];

const faqs = [
  [
    "Is this a course?",
    "No. There are no videos to watch. Every week we sit down 1:1 and work on your business: your offer, your page, your outreach. You leave each session with something finished.",
  ],
  [
    "I have a full-time job. Can I do this?",
    "Yes, if you have 5 to 10 hours a week. The program needs 45 minutes with me and about four hours of doing. Many people launch while employed and leave when the business can carry them.",
  ],
  [
    "What if I don't know what my business would be?",
    "That is stage 1, and it is where most people start. Take the Fit Score first. If your result says Discover, the Launch Call will focus on finding the one customer who already needs what you do.",
  ],
  [
    "How does the guarantee work?",
    "Attend your sessions and ship what we agree each week. If you don't have a paying client by day 90, I keep working with you at no cost until you do. It is written into the agreement you sign.",
  ],
  [
    "Can I pay in instalments?",
    "Yes. Launch is three payments of ₹27,500. Launch + Scale is six payments of ₹25,000. Overseas clients pay in USD.",
  ],
  [
    "Why is there an application?",
    `I take ${site.callsPerWeek} Launch Calls a week and work with around ten clients at a time. The application makes sure the call is useful for both of us.`,
  ],
];

export default function ProgramPage() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <section className="flex flex-col gap-6 py-16 sm:py-20">
        <p className="eyebrow">
          {site.program} · {site.programSub}
        </p>
        <h1 className="max-w-[18ch] text-[40px] font-extrabold sm:text-[56px]">
          Leave with a business, not a to-do list.
        </h1>
        <p className="measure text-[21px] leading-[1.45]">
          Ninety days of 1:1 work that ends with a paying client. Consulting, coaching or
          services. You bring the skill. We build the offer, the page and the first sale
          together, and I don&rsquo;t stop at day 90 until the client is real.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/call" className="btn btn-primary">
            Apply for a Launch Call <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/fit" className="btn btn-ghost">
            Not sure yet? Take the Fit Score
          </Link>
        </div>
      </section>

      <section className="grid gap-10 border-t border-line py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-4">
          <p className="eyebrow">What we build, in order</p>
          <h2 className="text-[30px] font-bold sm:text-[36px]">Seven stages. Seven things you&rsquo;ll have.</h2>
          <p className="text-[17px] text-ink-soft">
            Each stage ends with something real, not a lesson learned. Launch covers stages 1 to 5.
            Launch + Scale covers all seven. We start wherever you actually are, not at the
            beginning.
          </p>
        </div>
        <Journey />
      </section>

      <section className="border-t border-line py-16">
        <p className="eyebrow">Ways to work together</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">Pick the outcome you want. The price follows.</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col gap-4 border bg-surface p-7 ${
                t.core ? "border-accent shadow-[inset_0_0_0_1px_var(--accent)]" : "border-line"
              }`}
            >
              {t.core && (
                <span className="self-start rounded-sm bg-mark px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-accent-ink">
                  Most people start here
                </span>
              )}
              <h3 className="font-display text-[22px] font-extrabold">{t.name}</h3>
              <p className="font-mono text-[15px] text-money">
                <span className="text-[19px] font-medium">{t.price}</span>
                <br />
                {t.per}
              </p>
              <p className="text-[16px] text-ink-soft">{t.who}</p>
              <ul className="flex flex-col gap-2 border-t border-line pt-4 text-[16px]">
                {t.items.map((i) => (
                  <li key={i} className="grid grid-cols-[14px_1fr] gap-2">
                    <span aria-hidden="true" className="mt-[11px] h-[2px] w-[10px] bg-accent" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-4 border-l-[3px] border-mark bg-mark-soft/60 px-6 py-5">
          <p className="font-display text-[19px] font-bold">You end with a paying client. That&rsquo;s the deal.</p>
          <p className="measure text-[17px]">
            Attend your sessions, ship what we agree each week, and if you don&rsquo;t have a paying
            client by day 90, I keep working with you at no cost until you do. Not a refund. A
            result.
          </p>
        </div>
      </section>

      <ReviewsSection heading="People who started with a little hand-holding" />

      <section className="border-t border-line py-16">
        <p className="eyebrow">Questions people ask on the call</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">Straight answers</h2>
        <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {faqs.map(([q, a]) => (
            <div key={q} className="flex flex-col gap-2">
              <dt className="font-display text-[19px] font-bold">{q}</dt>
              <dd className="text-[17px] text-ink-soft">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-line py-16">
        <div className="flex flex-col gap-6 bg-panel px-7 py-10 text-panel-ink sm:px-10 sm:py-14">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-mark">
            Free · 30 minutes · 1:1
          </p>
          <h2 className="max-w-[22ch] text-[32px] font-extrabold text-panel-ink sm:text-[40px]">
            In 30 minutes, know your next three moves.
          </h2>
          <p className="max-w-[52ch] text-[18px] text-panel-ink/85">
            We map your skill to a model, an offer and the first three steps. You leave with a
            one-page Launch Map whether or not we work together. {site.callsPerWeek} calls a week.
          </p>
          <div>
            <Link href="/call" className="btn bg-mark text-accent-ink hover:bg-accent-strong">
              Apply for a Launch Call <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
