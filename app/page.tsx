import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Journey from "@/components/Journey";
import { site } from "@/lib/site";
import { segmentCopy } from "@/lib/quiz";
import { ReviewsSection, TrustLine } from "@/components/Reviews";
import { portrait } from "@/lib/assets";
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  const photo = portrait();
  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="flex flex-col gap-7">
          <p className="eyebrow">For freelancers · consultants · solopreneurs</p>
          <h1 className="text-[44px] font-extrabold leading-[1.02] sm:text-[64px]">
            Turn your skill into <span className="hl">paying clients</span> in 90 days.
          </h1>
          <p className="measure text-[21px] leading-[1.45] text-ink sm:text-[23px]">
            From home, without quitting your life. For people who are done trading hours for
            projects. You bring what you already know.
            Together we turn it into an offer people buy, a page that books you, and your first
            client. If there&rsquo;s no paying client by day 90, we keep going until there is.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/fit" className="btn btn-primary">
              See what&rsquo;s in your way <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/program" className="btn btn-ghost">
              See the 90-day program
            </Link>
          </div>
          <p className="font-mono text-[12.5px] text-ink-soft">
            Free Fit Score · 8 questions · 2 minutes · no pitch at the end
          </p>
          <TrustLine />
        </div>

        <div className="flex flex-col gap-4">
          <VideoPlayer
            source={
              site.homeVideoId
                ? { kind: "youtube", id: site.homeVideoId }
                : { kind: "file", src: "/home-video.mp4", poster: "/home-video-poster.jpg" }
            }
            title="90 seconds with Swapnil"
          />
          {/* The video ends with "the link is right below this video". This is that link. */}
          <Link href="/fit" className="btn btn-primary w-full">
            Take the free Fit Score <ArrowRight size={18} aria-hidden="true" />
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

      {/* Promise */}
      <section className="grid gap-8 border-t border-line py-16 lg:grid-cols-[1fr_1.4fr]">
        <h2 className="text-[30px] font-bold sm:text-[36px]">
          In 90 days, this is what changes.
        </h2>
        <div className="flex flex-col gap-5 text-[19px]">
          <ul className="flex flex-col gap-3 pl-0">
            {[
              ["Day 7", "You can name your first customer. A person, not a \u201ctarget audience\u201d."],
              ["Week 3", "You have an offer you can say in one sentence, with a price you\u2019ve said out loud."],
              ["Week 4", "Your page is live and books you. Built for you, not assigned as homework."],
              ["Week 8", "Five conversations started with people who already know you."],
              ["Day 90", "Your first paying client. Or we keep working, free, until you have one."],
            ].map(([when, what]) => (
              <li key={when} className="grid grid-cols-[72px_1fr] gap-3 border-t border-line pt-3">
                <span className="font-mono text-[12.5px] text-money pt-1">{when}</span>
                <span>{what}</span>
              </li>
            ))}
          </ul>
          <p className="measure text-ink-soft">
            No office, no team, no big investment. You don&rsquo;t quit your life to do this. You
            need five to ten hours a week, a skill people already ask you for, and someone who has
            done it before looking at your business every week.
          </p>
          <p className="font-display text-[22px] font-bold text-accent">
            Skill → Offer → Client → Business → Scale
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-line py-16">
        <p className="eyebrow">Who it&rsquo;s for</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">Three starting points. One place you end up.</h2>
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
            From &ldquo;I have a skill&rdquo; to &ldquo;I have clients.&rdquo;
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
            ["You end with a paying client, or we keep going", "Attend, ship what we agree, and if there is no paying client by day 90, I keep working with you at no cost until there is."],
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
            Find out what&rsquo;s between you and your first client.
          </h2>
          <p className="max-w-[52ch] text-[18px] text-panel-ink/85">
            Eight questions, two minutes. You get the business you&rsquo;re actually building, the
            stage that&rsquo;s blocking you, and the one thing to do this week. Then, if you want, a
            free 30-minute Launch Call.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/fit" className="btn bg-mark text-accent-ink hover:bg-accent-strong">
              See what&rsquo;s in your way <ArrowRight size={18} aria-hidden="true" />
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
