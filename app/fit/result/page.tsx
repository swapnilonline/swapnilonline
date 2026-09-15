import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, FileDown, MessageCircle, RotateCcw } from "lucide-react";
import { parseResult, laneCopy, stageCopy, modelCopy, STAGES, MAX_SCORE } from "@/lib/quiz";
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

  const lane = laneCopy[r.lane];
  const weak = STAGES.find((s) => s.key === r.weakest)!;
  const weakCopy = stageCopy[r.weakest][r.scores[r.weakest] as 0 | 1 | 2];
  const gaps = STAGES.filter((s) => r.scores[s.key] < 2);
  const waText = encodeURIComponent(
    `Hi Swapnil, I just took the Fit Score. I scored ${r.total}/14, lane: ${lane.title}. Weakest stage: ${weak.label}. Please send me the 7-Day Launch Map.`,
  );
  const waHref = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${waText}` : null;
  const callQuery = new URLSearchParams({ lane: r.lane, score: String(r.total), weakest: r.weakest }).toString();

  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Score */}
      <section className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div className="flex flex-col gap-4">
          <p className="eyebrow">Your Fit Score · {lane.title}</p>
          <p className="font-display text-[96px] font-extrabold leading-none tracking-tight sm:text-[120px]">
            {r.total}
            <span className="text-[32px] text-ink-soft sm:text-[40px]">/{MAX_SCORE}</span>
          </p>
          <p className="text-[17px] text-ink-soft">{modelCopy[r.model]}</p>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="max-w-[20ch] text-[34px] font-extrabold sm:text-[44px]">{lane.headline}</h1>
          <p className="measure text-[19px] leading-[1.45] text-ink-soft">{lane.body}</p>
        </div>
      </section>

      {/* The map */}
      <section className="border-t border-line py-14">
        <p className="eyebrow">Your map · ONE PERSON → ONE PROBLEM → ONE PRODUCT → ONE PROMISE</p>
        <h2 className="mt-3 text-[30px] font-bold sm:text-[34px]">Seven stages. {gaps.length === 0 ? "No gaps." : `${gaps.length} to close.`}</h2>
        <ol className="mt-8 flex flex-col">
          {STAGES.map((s, i) => {
            const sc = r.scores[s.key] as 0 | 1 | 2;
            const c = stageCopy[s.key][sc];
            const isWeak = s.key === r.weakest;
            return (
              <li
                key={s.key}
                className={`grid gap-3 border-t border-line py-5 last:border-b sm:grid-cols-[44px_1fr_auto] ${isWeak ? "-mx-3 bg-mark-soft/40 px-3" : ""}`}
              >
                <span className="font-display text-[26px] font-extrabold leading-none text-ink-soft/70">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-display text-[17px] font-bold tracking-wide">{s.label}</span>
                    <span className="font-mono text-[12px] text-ink-soft">{s.short}</span>
                    {isWeak && (
                      <span className="rounded-sm bg-mark px-2 py-0.5 font-mono text-[11px] font-medium tracking-wider text-accent-ink">
                        Start here
                      </span>
                    )}
                  </div>
                  <p className="text-[16.5px]">{c.meaning}</p>
                  <p className="text-[16px] text-ink-soft"><span className="font-display font-bold text-ink">Do this: </span>{c.action}</p>
                </div>
                <div className="flex items-start gap-1 sm:justify-end" role="img" aria-label={`${sc} of 2`}>
                  {[0, 1].map((n) => (
                    <span key={n} className={`h-2.5 w-7 rounded-sm ${n < sc ? "bg-accent" : "bg-line"}`} />
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 font-mono text-[12.5px] text-ink-soft">
          Capacity and commitment are gates. A zero on either puts you in Not yet, whatever the rest of the score.
        </p>
      </section>

      {/* Lane action */}
      {r.lane === "challenge" && (
        <section className="border-t border-line py-14">
          <div className="flex flex-col gap-6 bg-panel px-7 py-10 text-panel-ink sm:px-10 sm:py-12">
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-mark">You qualify · program details and the free call</p>
            <h2 className="max-w-[24ch] text-[30px] font-extrabold text-panel-ink sm:text-[36px]">
              Pick a time. We&rsquo;ll do the earning arithmetic on the call.
            </h2>
            <p className="max-w-[56ch] text-[17px] text-panel-ink/85">
              Thirty minutes: your skill&rsquo;s potential, positioning, market, offer and what it can
              earn, using the map above. The program details are open to you now; read them before
              we speak so the call is about your business, not the brochure.
            </p>
            <div>
              <Link href={`/program?${callQuery}`} className="btn border-panel-ink/60 text-panel-ink hover:bg-panel-ink/10">
                Read the program details <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            {site.calUrl ? (
              <iframe title="Book your free call" src={site.calUrl} className="min-h-[680px] w-full border border-panel-ink/20 bg-surface" loading="lazy" />
            ) : (
              <Link href={`/call?${callQuery}`} className="btn bg-mark text-accent-ink hover:bg-accent-strong self-start">
                Book your free call <ArrowRight size={18} aria-hidden="true" />
              </Link>
            )}
          </div>
        </section>
      )}

      {r.lane === "foundation" && (
        <section className="grid gap-4 border-t border-line py-14 lg:grid-cols-2">
          <div className="flex flex-col gap-4 border-l-[3px] border-mark bg-mark-soft/60 px-6 py-6">
            <p className="eyebrow">This week</p>
            <p className="font-display text-[22px] font-bold">Close {weak.label} first.</p>
            <p className="text-[16.5px]">{weakCopy.action}</p>
            <p className="text-[16px] text-ink-soft">
              You have {gaps.length} gap{gaps.length === 1 ? "" : "s"} across the seven stages. Each one has a worksheet in the Blueprint below,
              and the 7-Day Launch Map on WhatsApp starts with your weakest.
            </p>
          </div>
          <div className="flex flex-col gap-4 border border-line bg-surface px-6 py-6">
            <p className="eyebrow">Or talk it through · free</p>
            <p className="font-display text-[22px] font-bold">Book the free call</p>
            <p className="text-[16.5px] text-ink-soft">
              Thirty minutes on your potential, positioning, market, offer and earning. If the gaps
              are closer than the score suggests, you&rsquo;ll hear the next step on the call.
            </p>
            <Link href={`/call?${callQuery}`} className="btn btn-primary self-start">
              Book your free call <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      {r.lane === "notyet" && (
        <section className="border-t border-line py-14">
          <div className="flex flex-col gap-4 border-l-[3px] border-mark bg-mark-soft/60 px-6 py-6">
            <p className="eyebrow">This month</p>
            <p className="font-display text-[22px] font-bold">Work {weak.label}. Then retake the score in 30 days.</p>
            <p className="text-[16.5px]">{weakCopy.action}</p>
            <p className="text-[16px] text-ink-soft">
              The Blueprint below has a worksheet for every stage. Most people who retake after a
              month move up a lane, and the free call is open the moment they do.
            </p>
            <Link href="/fit" className="btn btn-ghost self-start">
              <RotateCcw size={18} aria-hidden="true" /> Retake in 30 days
            </Link>
          </div>
        </section>
      )}

      {/* Blueprint + WhatsApp */}
      <section className="grid gap-4 border-t border-line py-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4 border border-line bg-surface px-6 py-6">
          <p className="eyebrow">Your free copies</p>
          <p className="font-display text-[20px] font-bold">The Recurring Income Blueprint</p>
          <p className="text-[16.5px] text-ink-soft">
            The formula, price × clients × hours, with a fill-in worksheet, and the road from skill
            to scale as one graph. 2 pages, PDF.
          </p>
          <a href="/recurring-income-blueprint.pdf" download className="btn btn-primary self-start">
            <FileDown size={18} aria-hidden="true" /> Download the formula
          </a>
          <p className="text-[15px] text-ink-soft">
            Want the long version? <a href="/digital-business-blueprint.pdf" download className="font-display font-bold text-accent no-underline hover:underline">The Digital Business Blueprint</a>, 12 pages with a worksheet for every stage.
          </p>
        </div>
        {waHref && (
          <div className="flex flex-col gap-4 border border-line bg-surface px-6 py-6">
            <p className="eyebrow">Day by day</p>
            <p className="font-display text-[20px] font-bold">Start your 7-Day Launch Map</p>
            <p className="text-[16.5px] text-ink-soft">
              One short lesson a day on WhatsApp, starting with {weak.label}. Send the first message and it starts tomorrow morning.
            </p>
            <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-ghost self-start">
              <MessageCircle size={18} aria-hidden="true" /> Message Swapnil on WhatsApp
            </a>
          </div>
        )}
      </section>

      <section className="border-t border-line py-14">
        <div className="mx-auto max-w-[640px]">
          <OneReview />
        </div>
      </section>
    </div>
  );
}
