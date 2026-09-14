import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Journey from "@/components/Journey";
import { site } from "@/lib/site";
import { segmentCopy } from "@/lib/quiz";
import { ReviewsSection, TrustLine } from "@/components/Reviews";
import { portrait } from "@/lib/assets";
import Stalls from "@/components/Stalls";
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  const photo = portrait();
  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="flex flex-col gap-7">
          <p className="eyebrow">Digital services · digital consulting · digital products</p>
          <h1 className="text-[44px] font-extrabold leading-[1.02] sm:text-[64px]">
            Build <span className="hl">₹3 lakh a month</span> of recurring income. From home, without a job.
          </h1>
          <p className="measure text-[21px] leading-[1.45] text-ink sm:text-[23px]">
            For anyone who wants to start an online business: selling digital services, digital
            consulting or digital products. You bring what you already know. On a free call we map
            your skill, your positioning, your market, your offer and what it can earn. Then we
            build it, 1:1, toward one number: {site.target}. No employer, no salary, no office.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/call" className="btn btn-primary">
              Book your free call <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/program" className="btn btn-ghost">
              See the two programs
            </Link>
          </div>
          <p className="font-mono text-[12.5px] text-ink-soft">
            30 minutes · 1:1 · you leave with your positioning, offer and earning potential
          </p>
          <TrustLine />
        </div>

        <div className="flex flex-col gap-4">
          <VideoPlayer
            source={
              site.homeVideoId
                ? { kind: "youtube", id: site.homeVideoId }
                : { kind: "file", src: "/home-video-v2.mp4", poster: "/home-video-poster-v2.jpg" }
            }
            title="90 seconds with Swapnil"
          />
          {/* The video ends with "the link is right below this video". This is that link. */}
          <Link href="/call" className="btn btn-primary w-full">
            Book your free call <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <div className="flex items-center gap-4 border-t-2 border-ink pt-4">
            <Image
              src={photo.src}
              alt="Swapnil Shiwalay"
              width={photo.width}
              height={photo.height}
              priority
              sizes="72px"
              className={`h-[64px] w-[64px] shrink-0 object-cover ${photo.studio ? "rounded-full" : ""}`}
            />
            <div className="flex flex-col gap-0.5">
              <p className="font-display text-[19px] font-extrabold leading-tight">
                20 Years. Work From Home. 2,500+ Websites.
              </p>
              <p className="text-[15px] text-ink-soft">
                {site.name}, {site.role}. Teaches social media advertising at Mithibai College, Mumbai.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Stalls />

      {/* Promise */}
      <section className="grid gap-8 border-t border-line py-16 lg:grid-cols-[1fr_1.4fr]">
        <h2 className="text-[30px] font-bold sm:text-[36px]">
          The road to {site.target}, in order.
        </h2>
        <div className="flex flex-col gap-5 text-[19px]">
          <ul className="flex flex-col gap-3 pl-0">
            {[
              ["Free call", "Your skill, positioning, target market, offer and earning potential, mapped in 30 minutes."],
              ["Day 7", "The Foundation: seven days of hand-holding before launch. A named customer, a chosen model, an offer with a price, the page plan. 100% clarity on your digital business."],
              ["Week 4", "Your page is live and books you. Built for you inside the Challenge, not assigned as homework."],
              ["Week 8", "Five real conversations. The price said out loud, and the first yes."],
              ["Day 90", "Paying clients, retainers and repeat work that recur without a fresh sale, and the plan to the number. Or we keep going."],
            ].map(([when, what]) => (
              <li key={when} className="grid grid-cols-[72px_1fr] gap-3 border-t border-line pt-3">
                <span className="font-mono text-[12.5px] text-money pt-1">{when}</span>
                <span>{what}</span>
              </li>
            ))}
          </ul>
          <p className="measure text-ink-soft">
            Recurring means retainers, repeat clients and products that sell again, not one-off
            projects you chase every month. {site.target} is not a promise. It is arithmetic we do
            together on the first call: your price, times the clients you can serve, times the hours
            you actually have. Then the Challenge builds the offer, the page, the pipeline and the
            systems that make it recur. No employer, no office, no team, no big investment. Five to
            ten hours a week, and a skill people already ask you for.
          </p>
          <p className="font-display text-[22px] font-bold text-accent">
            Skill → Offer → Client → Business → Scale
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-line py-16">
        <p className="eyebrow">Who it&rsquo;s for</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">Three ways to sell what you know. One place you end up.</h2>
        <p className="measure mt-4 text-[17px] text-ink-soft">{site.audience} Whether you are employed, freelancing, or between things.</p>
        <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {(Object.keys(segmentCopy) as (keyof typeof segmentCopy)[]).map((k) => (
            <div key={k} className="flex flex-col gap-3 bg-surface p-7">
              <h3 className="font-display text-[22px] font-extrabold uppercase tracking-wide">
                {segmentCopy[k].title}
              </h3>
              <p className="text-[17px] text-ink-soft">{segmentCopy[k].line}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[17px] text-ink-soft">
          Not sure which one you are? The Fit Score tells you in two minutes.{" "}
          <Link href="/fit" className="font-display font-bold text-accent no-underline hover:underline">
            Take it here.
          </Link>
        </p>
      </section>

      {/* Journey */}
      <section className="grid gap-10 border-t border-line py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-4">
          <p className="eyebrow">The 1:1 journey</p>
          <h2 className="text-[30px] font-bold sm:text-[36px]">
            From &ldquo;I have a skill&rdquo; to a business that runs from home.
          </h2>
          <p className="text-[17px] text-ink-soft">
            Seven stages. Each one ends with something you have, not something you learned.
            Most people are stuck at stage 3 or stage 5 without knowing it. The Fit Score tells
            you which.
          </p>
        </div>
        <Journey />
      </section>

      {/* What makes it different */}
      <section className="border-t border-line py-16">
        <p className="eyebrow">Why this and not a course</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">
          You don&rsquo;t finish with notes. You finish with a business.
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {[
            ["Every week ends with something shipped", "45 minutes 1:1 on your actual business, not a cohort call with 40 people. You leave each session with a finished piece, never a to-do list."],
            ["Your website is live by week 4", "After 2,500 of them, I build it inside the program. You never lose a month to \u201cworking on the site\u201d."],
            ["You say your price out loud by week 3", "Offer, pricing and outreach scripts are written together, then tested on real people before you send them."],
            ["You end with paying clients, or we keep going", "Attend, ship what we agree, and if there is no paying client by day 90 of the Challenge, I keep working with you at no cost until there is."],
          ].map(([t, d]) => (
            <li key={t} className="grid grid-cols-[28px_1fr] gap-3">
              <Check size={22} className="mt-1 text-accent" aria-hidden="true" />
              <div>
                <p className="font-display text-[19px] font-bold">{t}</p>
                <p className="mt-1 text-[17px] text-ink-soft">{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ReviewsSection />

      {/* CTA */}
      <section className="border-t border-line py-16">
        <div className="flex flex-col gap-6 bg-panel px-7 py-10 text-panel-ink sm:px-10 sm:py-14">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-mark">
            Free · 30 minutes · 1:1
          </p>
          <h2 className="max-w-[22ch] text-[32px] font-extrabold text-panel-ink sm:text-[40px]">
            Find out what your skill can earn from home.
          </h2>
          <p className="max-w-[52ch] text-[18px] text-panel-ink/85">
            One free call. We identify the potential in your skills and expertise, your positioning,
            your target market, the offer you take to it, and what it can realistically earn. You
            leave with a one-page map either way. If you qualify, you choose the 7-Day Foundation or
            the 90-Day Challenge.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/call" className="btn bg-mark text-accent-ink hover:bg-accent-strong">
              Book your free call <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/fit" className="btn border-panel-ink/60 text-panel-ink hover:bg-panel-ink/10">
              Not ready to talk? Take the 2-minute Fit Score
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
