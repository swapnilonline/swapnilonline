import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book your free call: your skill, positioning, market, offer and earning potential",
  description:
    "A free 30-minute 1:1 call. We identify the potential in your skills and expertise, your positioning, your target market, your offer, and what it can earn from home. You keep the map either way.",
};

export default async function CallPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const p = await searchParams;
  const one = (k: string) => (Array.isArray(p[k]) ? p[k]?.[0] : p[k]);

  return (
    <div className="mx-auto max-w-5xl px-5">
      <div className="grid gap-12 py-14 lg:grid-cols-[1fr_1.5fr] lg:py-20">
        <aside className="flex flex-col gap-5">
          <p className="eyebrow">Free · 30 minutes · 1:1</p>
          <h1 className="text-[34px] font-extrabold leading-tight sm:text-[40px]">
            Let&rsquo;s find out what your skill can earn.
          </h1>
          <p className="text-[17px] text-ink-soft">
            Thirty minutes. Just you and me. Free. You leave with a one-page plan whether we work
            together or not. If I can&rsquo;t help you, I&rsquo;ll say so and tell you what to do
            instead.
          </p>
          <ul className="flex flex-col gap-3 border-t border-line pt-5 text-[16px]">
            {[
              ["Potential", "What your skill can be sold as: a service, advice, or a product"],
              ["Positioning", "The one line that makes the right people notice you"],
              ["Market", "Who pays for this, and who pays best"],
              ["Offer", "What you sell, to whom, at what price, by when"],
              ["Earning", "Your price × your clients × your hours. What this can really make, and the road to a 6-figure month"],
            ].map(([t, d]) => (
              <li key={t} className="grid grid-cols-[96px_1fr] gap-3">
                <span className="font-mono text-[12.5px] text-ink-soft pt-1">{t}</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[12.5px] text-ink-soft">
            {site.callsPerWeek} calls a week · {site.years}
          </p>
        </aside>
        <div className="border border-line bg-surface p-6 sm:p-9">
          <ApplyForm segment={one("seg")} stage={one("stage")} skill={one("skill")} />
        </div>
      </div>
    </div>
  );
}
