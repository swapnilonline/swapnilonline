import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Journey from "@/components/Journey";
import { site } from "@/lib/site";
import { ReviewsSection, TrustLine } from "@/components/Reviews";
import { portrait } from "@/lib/assets";
import Stalls from "@/components/Stalls";

export default function Home() {
  const photo = portrait();
  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="flex flex-col gap-7">
          <p className="eyebrow">Digital services · digital consulting · digital products</p>
          <h1 className="text-[44px] font-extrabold leading-[1.02] sm:text-[64px]">
            Get paid every month. <span className="hl">From home. Without a job.</span>
          </h1>
          <p className="measure text-[21px] leading-[1.45] text-ink sm:text-[23px]">
            You already have a skill. People already ask you for help with it. I show you how to
            turn that into a business that pays you every month, from home. Digital services,
            consulting or products. First, a 3-minute check to see if you are ready. If you are,
            you get the full plan and a free call with me.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/fit" className="btn btn-primary">
              Check if you&rsquo;re ready <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <p className="font-mono text-[12.5px] text-ink-soft">
            11 questions · 3 minutes · free · no pitch
          </p>
          <TrustLine />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-5 border border-line bg-surface p-7 sm:p-8">
            <p className="eyebrow">Digital Solopreneur</p>
            <p className="font-display text-[26px] font-extrabold leading-[1.15] sm:text-[30px]">
              One person. One problem. One product. One promise. Paid every month, from home.
              That is a Digital Solopreneur. No boss, no office, no commute. I have lived this way
              for twenty years. I will show you how, step by step.
            </p>
            <blockquote className="border-l-[3px] border-mark pl-4">
              <p className="font-body text-[19px] italic leading-[1.4]">
                &ldquo;Freedom is not the absence of work. It is choosing the work, the hours, the
                people, and the place. Everything else is a job with a longer leash.&rdquo;
              </p>
              <footer className="mt-2 font-mono text-[12px] text-ink-soft">{site.name}</footer>
            </blockquote>
          </div>
          <Link href="/fit" className="btn btn-primary w-full">
            Check if you&rsquo;re ready <ArrowRight size={18} aria-hidden="true" />
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
                {site.name}, {site.role}. I also teach social media advertising at Mithibai College, Mumbai.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Stalls />

      {/* Promise */}
      <section className="grid gap-8 border-t border-line py-16 lg:grid-cols-[1fr_1.4fr]">
        <h2 className="text-[30px] font-bold sm:text-[36px]">
          Here is the road. Step by step.
        </h2>
        <div className="flex flex-col gap-5 text-[19px]">
          <ul className="flex flex-col gap-3 pl-0">
            {[
              ["Today", "Take the 3-minute check. You get a score out of 14 and the one stage to fix first."],
              ["Day 7", "You know exactly who you help, what you sell, and what it costs. 100% clear, before you launch."],
              ["Week 4", "Your page is live. People can book you from it. I build it with you."],
              ["Week 8", "You have talked to five real people. You have said your price out loud. You have your first yes."],
              ["Day 90", "You have paying clients who come back every month. Or we keep going, at no cost, until you do."],
            ].map(([when, what]) => (
              <li key={when} className="grid grid-cols-[72px_1fr] gap-3 border-t border-line pt-3">
                <span className="font-mono text-[12.5px] text-money pt-1">{when}</span>
                <span>{what}</span>
              </li>
            ))}
          </ul>
          <p className="measure text-ink-soft">
Recurring means clients who pay you every month, not projects you chase. A 6-figure
            month is not a promise. It is simple maths we do together: your price, times your
            clients, times your hours. Then we build the offer, the page and the system that makes
            it repeat. No office. No team. No big investment. Five to ten hours a week, and a skill
            people already ask you for.
          </p>
          <p className="font-display text-[22px] font-bold text-accent">
            Skill → Offer → Client → Business → Scale
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-line py-16">
        <p className="eyebrow">Who it&rsquo;s for</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">Three ways to sell what you know.</h2>
        <p className="measure mt-4 text-[17px] text-ink-soft">{site.audience} It does not matter if you have a job, freelance, or are between things right now.</p>
        <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {[
            ["Digital services", "You do the work for them.", "Stop chasing projects by the hour. Sell one packaged service that clients come back for, at a price you set. The fastest way to your first rupee."],
            ["Digital consulting", "You tell them what to do.", "Turn what you know into advice people pay for, month after month. The highest fee per client."],
            ["Digital products", "You package it. They do it themselves.", "Turn the idea you keep talking about into a course, a kit or a program that sells while you sleep. Grows the furthest."],
          ].map(([t, how, line]) => (
            <div key={t} className="flex flex-col gap-3 bg-surface p-7">
              <h3 className="font-display text-[22px] font-extrabold uppercase tracking-wide">{t}</h3>
              <p className="font-mono text-[12.5px] text-ink-soft">{how}</p>
              <p className="text-[17px] text-ink-soft">{line}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[17px] text-ink-soft">
          Not sure which one you are? The Fit Score tells you in three minutes, with a score out of 14.{" "}
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
            From &ldquo;I have a skill&rdquo; to &ldquo;I have a business.&rdquo;
          </h2>
          <p className="text-[17px] text-ink-soft">
            Seven stages. Each one ends with something you can hold, not something you learned.
            Most people are stuck at stage 3 or 5 and do not know it. The 3-minute check tells you
            which.
          </p>
        </div>
        <Journey />
      </section>

      {/* What makes it different */}
      <section className="border-t border-line py-16">
        <p className="eyebrow">Why this and not a course</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">
          This is not a course. You don&rsquo;t finish with notes. You finish with a business.
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {[
            ["Every week, something gets done", "45 minutes with me, 1:1, on your business. Not a group call with 40 people. You leave each week with a finished piece, not a to-do list."],
            ["Your website is live by week 4", "I have built 2,500 of them. I build yours with you. You never lose a month to \u201cworking on the site\u201d."],
            ["You say your price out loud by week 3", "We write your offer, your price and your messages together. Then we test them on real people before you send them."],
            ["You end with paying clients, or we keep going", "Show up, do the work we agree on, and if you have no paying client by day 90, I keep working with you for free until you do."],
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
            Free · 3 minutes · scored out of 14
          </p>
          <h2 className="max-w-[22ch] text-[32px] font-extrabold text-panel-ink sm:text-[40px]">
            Are you ready? Find out in 3 minutes.
          </h2>
          <p className="max-w-[52ch] text-[18px] text-panel-ink/85">
            Eleven simple questions. You get a score out of 14 and the one thing to fix first. If
            you are ready, you get the full plan and a free call with me. If not, you get a clear
            next step and a date to come back. Nothing to lose.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/fit" className="btn bg-mark text-accent-ink hover:bg-accent-strong">
              Check if you&rsquo;re ready <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
