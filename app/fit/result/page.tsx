import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, FileDown, MessageCircle } from "lucide-react";
import Journey from "@/components/Journey";
import {
  parseResult,
  segmentCopy,
  modelCopy,
  stageCopy,
  blockerCopy,
} from "@/lib/quiz";
import { site } from "@/lib/site";
import { OneReview } from "@/components/Reviews";

export const metadata: Metadata = {
  title: "Your Fit Score",
  robots: { index: false },
};

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const r = parseResult(await searchParams);
  if (!r) redirect("/fit");

  const seg = segmentCopy[r.segment];
  const model = modelCopy[r.model];
  const stage = stageCopy[r.stage];
  const callQuery = new URLSearchParams({ seg: r.segment, stage: r.stage }).toString();
  const waText = encodeURIComponent(
    `Hi Swapnil, I just took the Fit Score. My result: ${model.title} business, ${stage.title} stage. Please send me the 7-Day Launch Map.`,
  );
  const waHref = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${waText}` : null;

  return (
    <div className="mx-auto max-w-5xl px-5">
      <section className="flex flex-col gap-6 py-14 sm:py-20">
        <p className="eyebrow">Your Fit Score · {seg.title}</p>
        <h1 className="max-w-[20ch] text-[38px] font-extrabold sm:text-[54px]">
          You&rsquo;re a {model.title} business. You&rsquo;re at the {stage.title} stage.
        </h1>
        <p className="measure text-[20px] leading-[1.45]">{stage.meaning}</p>
      </section>

      <section className="grid gap-8 border-t border-line py-14 lg:grid-cols-3">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">Your model</p>
          <h2 className="font-display text-[24px] font-extrabold">{model.title}</h2>
          <p className="text-[17px]">{model.why}</p>
          <p className="text-[17px] text-ink-soft">{model.trap}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="eyebrow">Your stage</p>
          <h2 className="font-display text-[24px] font-extrabold">
            Stage {stage.n}: {stage.title}
          </h2>
          <p className="text-[17px]">
            As a {seg.title.toLowerCase()}, the move is: {seg.line.charAt(0).toLowerCase() + seg.line.slice(1)}
          </p>
          <p className="text-[17px] text-ink-soft">{blockerCopy[r.blocker]}</p>
        </div>
        <div className="flex flex-col gap-3 border-l-[3px] border-mark bg-mark-soft/60 px-6 py-5">
          <p className="eyebrow">Do this this week</p>
          <p className="text-[18px]">{stage.thisWeek}</p>
        </div>
      </section>

      <section className="grid gap-4 border-t border-line py-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4 border-l-[3px] border-mark bg-mark-soft/60 px-6 py-6">
          <div className="flex flex-col gap-1">
            <p className="eyebrow">Your free copy</p>
            <p className="font-display text-[20px] font-bold">The Digital Business Blueprint</p>
            <p className="text-[16.5px] text-ink-soft">
              The seven stages, one page each, with a worksheet and a done-when test. Plus the three
              models and the 90-day plan. 12 pages, PDF.
            </p>
          </div>
          <a href="/digital-business-blueprint.pdf" download className="btn btn-primary self-start">
            <FileDown size={18} aria-hidden="true" /> Download the Blueprint
          </a>
        </div>
        {waHref && (
          <div className="flex flex-col gap-4 border-l-[3px] border-mark bg-mark-soft/60 px-6 py-6">
            <div className="flex flex-col gap-1">
              <p className="eyebrow">Day by day</p>
              <p className="font-display text-[20px] font-bold">Start your 7-Day Launch Map</p>
              <p className="text-[16.5px] text-ink-soft">
                One short lesson a day on WhatsApp, one per stage. Send the first message and it starts tomorrow morning.
              </p>
            </div>
            <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-ghost self-start">
              <MessageCircle size={18} aria-hidden="true" /> Message Swapnil on WhatsApp
            </a>
          </div>
        )}
      </section>

      <section className="grid gap-10 border-t border-line py-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-4">
          <p className="eyebrow">The whole road</p>
          <h2 className="text-[30px] font-bold sm:text-[34px]">Seven stages. You&rsquo;re at {stage.n}.</h2>
          <p className="text-[17px] text-ink-soft">
            Most people take two to three years to walk this alone and stall at stage 3 or 5. In{" "}
            {site.program}, we do stages 1 to 5 together in 90 days, and I build your website.
          </p>
        </div>
        <Journey current={r.stage} compact />
      </section>

      <section className="border-t border-line py-14">
        <div className="mx-auto max-w-[640px]">
          <OneReview />
        </div>
      </section>

      <section className="border-t border-line py-14">
        <div className="flex flex-col gap-6 bg-panel px-7 py-10 text-panel-ink sm:px-10 sm:py-14">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-mark">
            A note from Swapnil
          </p>
          <p className="max-w-[60ch] text-[19px] text-panel-ink/90">
            I&rsquo;ve looked at the {seg.title.toLowerCase()} path more times than I can count. The
            {" "}{stage.title.toLowerCase()} stage is where I can save you the most time, because it is
            mostly a matter of someone looking at your skill from the outside. If you&rsquo;d like to
            talk it through, I do {site.callsPerWeek} free 30-minute Launch Calls a week. You leave
            with a one-page Launch Map whether or not we work together.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={`/call?${callQuery}`} className="btn bg-mark text-accent-ink hover:bg-accent-strong">
              Book your free call <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/program" className="btn border-panel-ink/60 text-panel-ink hover:bg-panel-ink/10">
              See how the program works
            </Link>
          </div>
          <p className="font-mono text-[12.5px] text-panel-ink/60">
            Your 7-Day Launch Map starts tomorrow morning on WhatsApp.
          </p>
        </div>
      </section>
    </div>
  );
}
