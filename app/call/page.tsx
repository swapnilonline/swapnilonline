import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply for a free 30-minute Launch Call",
  description:
    "We'll map your skill to a model, an offer, and the first 3 steps. You'll leave with a one-page Launch Map whether or not we work together.",
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
            Apply for a Launch Call.
          </h1>
          <p className="text-[17px] text-ink-soft">
            We&rsquo;ll map your skill to a model, an offer, and the first three steps. You&rsquo;ll
            leave with a one-page Launch Map whether or not we work together.
          </p>
          <ul className="flex flex-col gap-3 border-t border-line pt-5 text-[16px]">
            {[
              ["0 to 3 min", "What the call is and isn't"],
              ["3 to 12", "Where you are, what you've tried, what a good 90 days looks like"],
              ["12 to 20", "The seven stages against your situation, and your blocking stage"],
              ["20 to 30", "If I think I can help, how. If not, what to do instead"],
            ].map(([t, d]) => (
              <li key={t} className="grid grid-cols-[84px_1fr] gap-3">
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
