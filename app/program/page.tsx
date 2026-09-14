import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Journey from "@/components/Journey";
import { site } from "@/lib/site";
import { ReviewsSection } from "@/components/Reviews";

export const metadata: Metadata = {
  title: "The 7-Day Foundation and the 90-Day Setup Challenge",
  description:
    "Two ways to build an online business from home, 1:1: a 7-day foundation for ₹7,500, or the 90-day setup challenge for ₹75,000, built toward ₹3,00,000 a month. Both start with a free call.",
};

const tiers = [
  {
    id: "foundation",
    name: "The 7-Day Digital Business Foundation",
    price: "₹7,500",
    per: "7 days · 1:1 hand-holding · before you launch",
    who: "Seven days of hand-holding before launch. You finish with 100% clarity on your digital business.",
    items: [
      "Daily 1:1 with Swapnil for seven days, on WhatsApp and calls",
      "Day 1: your customer, named. Your model chosen: services, consulting or products",
      "Day 3: your offer in one sentence, with a price you have said out loud",
      "Day 5: the one-page plan and the first five outreach messages",
      "Day 7: a written recurring-income plan: price × clients × hours, toward ₹3,00,000 a month",
      "Fee credited in full toward the Challenge within 60 days",
    ],
    core: false,
  },
  {
    id: "challenge",
    name: "The 90-Day Digital Business Setup Challenge",
    price: "₹75,000",
    per: "90 days · or 3 × ₹27,500 · weekly 1:1",
    who: "The whole build, 1:1, for people who qualify on the free call. Ends with paying clients and the system that brings the next one.",
    items: [
      "Everything in the Foundation, in week 1",
      "Week 4: your website live, built by me, not assigned as homework",
      "Week 8: five real conversations and the first yes",
      "Week 12: proposal, calendar and invoice flow set up from your first sale",
      "Day 90: paying clients, retainers and repeat work that recur, and the plan to the number, or we keep going at no cost",
      "12 weekly 1:1 sessions plus WhatsApp on working days",
    ],
    core: true,
  },
];

const faqs = [
  [
    "Is ₹3,00,000 a month of recurring income guaranteed?",
    "No income is guaranteed, and anyone who promises one is lying to you. ₹3 lakh a month, recurring, without an employer, is the number the Challenge is designed around: retainers, repeat clients and products that sell again, not one-off projects. On the free call we do the arithmetic for your case: your price, times the clients you can serve, times the hours you have. Some people get there in months, some take longer, and the plan shows you which. What is guaranteed is the first paying client, or we keep working.",
  ],
  [
    "Is this a course?",
    "No. There are no videos to watch. In both programs we work 1:1 on your business: your offer, your page, your outreach, your pipeline. You leave every session with something finished, not notes.",
  ],
  [
    "I have a full-time job. Can I do this?",
    "Yes, if you have 5 to 10 hours a week. The Challenge needs 45 minutes with me and about four hours of doing. Many people build while employed and leave when the business can carry them. The earning plan on the free call is worked out for the hours you actually have.",
  ],
  [
    "What if I don't know what my business would be?",
    "That is what the free call is for. In 30 minutes we identify the potential in your skills and expertise, who would pay for it, how to position it, what the offer is, and what it can earn. Most people arrive with a skill and leave with a business they can describe in one sentence.",
  ],
  [
    "How does the guarantee work?",
    "Attend your sessions and ship what we agree each week. If you don't have a paying client by day 90, I keep working with you at no cost until you do. It is written into the agreement you sign.",
  ],
  [
    "Can I pay in instalments?",
    "Yes. The Challenge is three payments of ₹27,500. The Foundation is a single payment of ₹7,500, credited in full if you join the Challenge within 60 days. Overseas clients pay in USD.",
  ],
  [
    "What if I'm afraid nobody will buy?",
    "Almost everyone is, and it is the most fixable part. You say your price out loud to me in a rehearsal before you say it to a client, we fix the sentence until it sits right, and the first five messages go to people who already know you. If nobody has bought by day 90, we keep going. The fear does not survive the first yes.",
  ],
  [
    "What does 'if you qualify' mean?",
    `I take ${site.callsPerWeek} free calls a week and work with around ten Challenge clients at a time. You qualify when you have a real skill people already ask you for, five to ten hours a week, and are ready to build in the next 90 days. If not yet, the Foundation is the right first step, and I will say so.`,
  ],
];

export default function ProgramPage() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <section className="flex flex-col gap-6 py-16 sm:py-20">
        <p className="eyebrow">Two programs · both 1:1 · both start with a free call</p>
        <h1 className="max-w-[18ch] text-[40px] font-extrabold sm:text-[56px]">
          From your skill to {site.target}. From home, without a job.
        </h1>
        <p className="measure text-[21px] leading-[1.45]">
          Digital services, digital consulting or digital products. The free call maps your
          potential, positioning, market, offer and earning. If you qualify, you choose: seven days
          of hand-holding before launch for 100% clarity, or ninety days to build the whole thing
          with me, ending with paying clients or we keep going.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/call" className="btn btn-primary">
            Book your free call <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="#foundation" className="btn btn-ghost">
            Compare the two programs
          </Link>
        </div>
      </section>

      <section className="grid gap-10 border-t border-line py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-4">
          <p className="eyebrow">What we build, in order</p>
          <h2 className="text-[30px] font-bold sm:text-[36px]">Seven stages. Seven things you&rsquo;ll have.</h2>
          <p className="text-[17px] text-ink-soft">
            Each stage ends with something real, not a lesson learned. The Foundation covers stages
            1 to 3 in a week. The Challenge covers all seven in ninety days. We start wherever you
            actually are, not at the beginning.
          </p>
        </div>
        <Journey />
      </section>

      <section id="foundation" className="scroll-mt-6 border-t border-line py-16">
        <p className="eyebrow">Two ways in</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">Seven days to lay the foundation. Ninety to build the business.</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              id={t.id}
              className={`flex scroll-mt-6 flex-col gap-4 border bg-surface p-7 ${
                t.core ? "border-accent shadow-[inset_0_0_0_1px_var(--accent)]" : "border-line"
              }`}
            >
              {t.core && (
                <span className="self-start rounded-sm bg-mark px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-accent-ink">
                  If you qualify on the call
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
            In the 90-Day Challenge: attend your sessions, ship what we agree each week, and if you
            don&rsquo;t have a paying client by day 90, I keep working with you at no cost until you
            do. Not a refund. A result. {site.target} is the number we build toward; the guarantee
            is the first client, because recurring income is that client, repeated.
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
            Start with the free call.
          </h2>
          <p className="max-w-[52ch] text-[18px] text-panel-ink/85">
            Thirty minutes, 1:1. Your skill&rsquo;s potential, your positioning, your target market,
            your offer, and what it can earn, on one page you keep either way. {site.callsPerWeek}{" "}
            calls a week.
          </p>
          <div>
            <Link href="/call" className="btn bg-mark text-accent-ink hover:bg-accent-strong">
              Book your free call <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
