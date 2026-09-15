import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site, personalBrands, corporateBrandsExtra } from "@/lib/site";
import ParallaxBand from "@/components/ParallaxBand";
import { AllReviews } from "@/components/Reviews";

export const metadata: Metadata = {
  title: "About Swapnil Shiwalay",
  description:
    "Digital Business Consultant. 20 years working from home, 2,500+ websites developed, now helping solopreneurs, freelancers and consultants launch 1:1.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Full-bleed hero: the wide studio portrait is the backdrop; the page ground is sampled from it, so the edges dissolve. */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        {/* Portrait pinned to the viewport's left edge on large screens; stacked above the text on small ones. */}
        <div className="relative aspect-[16/9] lg:absolute lg:inset-y-0 lg:left-0 lg:aspect-auto lg:w-[56%]">
          <Image
            src="/swapnil-wide.jpg"
            alt="Swapnil Shiwalay, arms folded, studio portrait"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover object-left"
          />
          <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-gradient-to-r from-transparent to-ground lg:block" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-ground lg:hidden" aria-hidden="true" />
        </div>
        <div className="relative mx-auto grid max-w-5xl px-5 lg:min-h-[680px] lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="relative flex flex-col gap-6 py-8 lg:py-20 lg:pl-8">
            <p className="eyebrow">About</p>
            <h1 className="max-w-[16ch] text-[40px] font-extrabold sm:text-[52px]">
              I&rsquo;ve worked from home for twenty years. Here&rsquo;s what that taught me.
            </h1>
            <div className="flex flex-col gap-1">
              <p className="font-display text-[20px] font-extrabold">{site.name}</p>
              <p className="font-mono text-[12.5px] uppercase tracking-wider text-ink-soft">{site.tagline}</p>
            </div>
            <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-[16px]">
              <dt className="font-mono text-[12.5px] uppercase tracking-wider text-ink-soft">Years</dt>
              <dd>20, all of them from home</dd>
              <dt className="font-mono text-[12.5px] uppercase tracking-wider text-ink-soft">Websites</dt>
              <dd>2,500+ developed and launched</dd>
              <dt className="font-mono text-[12.5px] uppercase tracking-wider text-ink-soft">Teaches</dt>
              <dd>Social media advertising at Mithibai College, Mumbai</dd>
              <dt className="font-mono text-[12.5px] uppercase tracking-wider text-ink-soft">Works with</dt>
              <dd>Solopreneurs, freelancers, consultants</dd>
              <dt className="font-mono text-[12.5px] uppercase tracking-wider text-ink-soft">Format</dt>
              <dd>1:1 only. No cohorts, no courses.</dd>
            </dl>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/fit" className="btn btn-primary">
                Check if you&rsquo;re ready <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="flex max-w-[68ch] flex-col gap-5 text-[19px]">
          <p>
            I&rsquo;m {site.name}, a {site.role.toLowerCase()}. Since the mid-2000s I have built and
            run digital businesses from a desk at home, developing more than 2,500 websites for
            people who had a skill, an idea or a service and needed it to exist online.
          </p>
          <p>
            Two and a half thousand websites is a lot of conversations with people at the very
            start of a business. I have watched what separates the ones who get their first
            client in a month from the ones who are still &ldquo;working on the site&rdquo; a year later.
            It is almost never the skill. It is the offer, the first conversation, and having
            someone to check in with every week.
          </p>
          <p>
            That is what {site.program} is: the part of my work I always did informally, made
            into a proper 1:1 program for solopreneurs, freelancers and consultants who want to
            build something of their own without leaving their life to do it.
          </p>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <p className="eyebrow">What I believe</p>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2">
          {[
            ["Pick a customer, not an idea.", "Ideas are cheap. A person who already asked you for help is the business."],
            ["An offer is a sentence.", "A result, for a person, at a price, in a timeframe. If you can't say it, they can't buy it."],
            ["One page beats a brand.", "Who you help, what you offer, one proof point, one way to book you. Everything else can wait."],
            ["Boring wins.", "A proposal template, a calendar link and an invoice flow keep more businesses alive than any marketing trick."],
          ].map(([t, d]) => (
            <li key={t} className="flex flex-col gap-2 border-t border-line pt-4">
              <p className="font-display text-[21px] font-bold">{t}</p>
              <p className="text-[17px] text-ink-soft">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line py-16">
        <p className="eyebrow">Built for</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">
          Some of the brands behind the 2,500 websites.
        </h2>
        <div className="mt-8 rounded-sm bg-white p-6 sm:p-10">
          <Image
            src="/brands.jpg"
            alt="Logos of HCC, NMIMS, Asian American Heritage Festival, Horizon, Schneider Electric, TVF, Sagar Pictures Entertainment, Pooja Entertainment, Vijayta Films, Classics Films, Hatim Glazing and Cladding, Litmus Marine, Old Harbor, HTOA, ACCI, Yasham, Expo Universe, GRL, Forstar, Premier Logistics and Green Cells"
            width={1600}
            height={619}
            sizes="(min-width: 1024px) 960px, 100vw"
            className="h-auto w-full"
          />
        </div>
        <p className="mt-4 text-[16px] text-ink-soft">
          Also {corporateBrandsExtra.join(", ")}. And personal brands including{" "}
          {personalBrands.join(", ")}.
        </p>
      </section>

      <section className="border-t border-line py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div className="flex flex-col gap-3">
            <p className="eyebrow">Teaching</p>
            <h2 className="text-[30px] font-bold sm:text-[36px]">I also teach. It&rsquo;s the same job.</h2>
          </div>
          <p className="text-[17px] text-ink-soft">
            I teach social media advertising at Mithibai College, Mumbai. Explaining something to
            a room of students every week is the best training there is for explaining it to one
            person building a business. Nothing in {site.program} is jargon you have to decode.
          </p>
        </div>
        <div className="mt-10">
          <ParallaxBand
            src="/mithibai-wide.jpg"
            alt="Swapnil with a group of students in front of the SVKM and Mithibai College sign"
            width={1774}
            height={887}
            caption="With students at SVKM\u2019s Mithibai College, Vile Parle, Mumbai."
          />
        </div>
      </section>

      <AllReviews />
    </div>
  );
}
