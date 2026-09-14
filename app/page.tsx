import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Journey from "@/components/Journey";
import { site } from "@/lib/site";
import { segmentCopy } from "@/lib/quiz";
import { ReviewsSection, TrustLine } from "@/components/Reviews";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.25fr_1fr] lg:items-end">
        <div className="flex flex-col gap-7">
          <p className="eyebrow">For solopreneurs · freelancers · consultants</p>
          <h1 className="text-[44px] font-extrabold leading-[1.02] sm:text-[64px]">
            Your <span className="hl">home</span> can be your business.
          </h1>
          <p className="measure text-[21px] leading-[1.45] text-ink sm:text-[23px]">
            Launch a digital business with 1:1 guidance from someone who has worked from home for
            20 years. Turn your skill, knowledge or experience into a profitable business, from
            where you are.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/fit" className="btn btn-primary">
              Get your Fit Score <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/program" className="btn btn-ghost">
              See the program
            </Link>
          </div>
          <p className="font-mono text-[12.5px] text-ink-soft">
            2 minutes · 8 questions · no course pitch at the end
          </p>
          <TrustLine />
        </div>

        <div className="flex flex-col gap-4 border-t-2 border-ink pt-5">
          <div className="flex items-end gap-5">
            <Image
              src="/swapnil.png"
              alt="Swapnil Shiwalay"
              width={610}
              height={564}
              priority
              sizes="120px"
              className="h-auto w-[96px] shrink-0 sm:w-[120px]"
            />
            <p className="font-display text-[26px] font-extrabold leading-tight sm:text-[30px]">
              20 Years. Work From Home.
              <br />
              2,500+ Websites.
            </p>
          </div>
          <p className="text-[17px] text-ink-soft">
            {site.name}, {site.role}. For two decades, Swapnil has built and operated digital
            businesses from home, developing 2,500+ websites and helping people turn ideas,
            expertise and services into digital opportunities. He also teaches social media
            advertising at Mithibai College, Mumbai.
          </p>
        </div>
      </section>

      {/* Promise */}
      <section className="grid gap-8 border-t border-line py-16 lg:grid-cols-[1fr_1.4fr]">
        <h2 className="text-[30px] font-bold sm:text-[36px]">
          You don&rsquo;t need to quit your life to start a business.
        </h2>
        <div className="flex flex-col gap-5 text-[19px]">
          <p className="measure">
            You don&rsquo;t need an office, a big team, or a huge investment. You need the right
            digital business model, a clear offer, and someone who has done it before.
          </p>
          <p className="measure">
            Start with what you already know. Build it from where you are. Not another course
            where you watch videos and figure it out yourself. You build it. I guide you 1:1.
          </p>
          <p className="font-display text-[22px] font-bold text-accent">
            Skill → Offer → Client → Business → Scale
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-line py-16">
        <p className="eyebrow">Who it&rsquo;s for</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">Three people, one road.</h2>
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
            From &ldquo;I have an idea&rdquo; to &ldquo;I have a business.&rdquo;
          </h2>
          <p className="text-[17px] text-ink-soft">
            Seven stages, in order, with 1:1 guidance at every step. Most people are stuck at
            stage 3 or stage 5. The Fit Score tells you which.
          </p>
        </div>
        <Journey />
      </section>

      {/* What makes it different */}
      <section className="border-t border-line py-16">
        <p className="eyebrow">Why this and not a course</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">
          Your website gets built. Your offer gets written. With you, not for you to figure out.
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {[
            ["Weekly 1:1 sessions", "45 minutes, every week, on your actual business. Not a cohort call with 40 people."],
            ["Website built inside the program", "After 2,500 websites, I don't assign it as homework. Your page is live by week 4."],
            ["Offer, pricing and scripts written together", "You leave every session with something finished, not a to-do list."],
            ["First-client guarantee", "Attend, ship what we agree, and if you don't have a paying client by day 90, I keep working with you until you do."],
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
            {site.program} · {site.programSub}
          </p>
          <h2 className="max-w-[22ch] text-[32px] font-extrabold text-panel-ink sm:text-[40px]">
            Find out which digital business fits you.
          </h2>
          <p className="max-w-[52ch] text-[18px] text-panel-ink/85">
            Answer 8 questions. You&rsquo;ll get your model, your stage, and the one thing to do this
            week. Then, if you want, a free 30-minute Launch Call.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/fit" className="btn bg-mark text-ink hover:bg-mark-soft">
              Get your Fit Score <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/call" className="btn border-panel-ink/60 text-panel-ink hover:bg-panel-ink/10">
              Apply for a Launch Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
