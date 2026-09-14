import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

/**
 * The six ways a home business stalls, each paired with the stage that fixes it.
 * Pain first, then the specific thing that changes. No mystery, no blame.
 */
export const stalls = [
  {
    key: "launch",
    title: "The launch that never happens",
    pain: "Courses finished, notes taken, nothing live, nothing earning.",
    fix: "Stages 4 and 5, done for real. Your page is live by week 4 and you’ve had five real conversations by week 8. Learning stops being the excuse.",
  },
  {
    key: "niche",
    title: "The niche you can’t decide",
    pain: "Changed it three times, still unsure. Clarity isn’t found by thinking harder.",
    fix: "Stage 1 is one question: who asked you for help in the last year? We answer it on the first call, with a name, and the niche stops being a decision.",
  },
  {
    key: "content",
    title: "Content without clients",
    pain: "A thousand posts, zero rupees. Visible but not valuable, because there’s no offer behind it.",
    fix: "Stage 3. An offer you can say in one sentence, with a price, by week 3. Then every post has somewhere to send people.",
  },
  {
    key: "tech",
    title: "Tech that feels like a wall",
    pain: "Funnels, pages, automations. You don’t need to learn them.",
    fix: "I build your page inside the program. The funnel is three steps on templates you fill in, not software you study.",
  },
  {
    key: "busy",
    title: "Busy but not growing",
    pain: "Trading hours for money. More hours won’t fix it.",
    fix: "Stages 6 and 7: a price that isn’t per hour, a second thing to sell to clients you already have, and systems that let revenue grow without your hours.",
  },
  {
    key: "fear",
    title: "The fear nobody will buy",
    pain: "The offer is ready. The confidence isn’t.",
    fix: "Universal, and fixable. You say the price out loud in a rehearsal with me before you ever say it to a client. And if nobody buys by day 90, we keep going.",
  },
] as const;

export default function Stalls() {
  return (
    <section className="border-t border-line py-16">
      <p className="eyebrow">Sound familiar?</p>
      <h2 className="mt-3 max-w-[22ch] text-[30px] font-bold sm:text-[36px]">
        Six ways this stalls. Every one is a stage, not a character flaw.
      </h2>
      <p className="measure mt-4 text-[17px] text-ink-soft">
        Twenty years of watching people start from home, and it is always one of these. Find yours.
        Then read what changes.
      </p>
      <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {stalls.map((s) => (
          <li key={s.key} className="flex flex-col gap-4 bg-surface p-7">
            <div className="flex flex-col gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-ink-soft" aria-hidden="true">
                <X size={16} />
              </span>
              <h3 className="text-[20px] font-bold leading-tight">{s.title}</h3>
              <p className="text-[16.5px] text-ink-soft">{s.pain}</p>
            </div>
            <div className="mt-auto flex gap-3 border-t border-line pt-4">
              <ArrowRight size={18} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-[16px]">{s.fix}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10 grid gap-6 border-t-2 border-mark pt-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div className="flex flex-col gap-3">
          <p className="font-display text-[26px] font-extrabold leading-tight sm:text-[30px]">
            Every barrier above has a system-level fix. The 7-Day Foundation gives you all six.
          </p>
          <p className="text-[17px] text-ink-soft">
            The 7-Day Digital Business Foundation: one 1:1 call with me, then seven days of daily
            tasks on WhatsApp. You finish with a named customer, a chosen model, an offer with a
            price, the page plan, the first five messages, and the price said out loud. ₹7,500,
            credited in full if you join the 90-Day Challenge within 60 days.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link href="/program#foundation" className="btn btn-primary">
            See the 7-Day Foundation <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/fit" className="btn btn-ghost">
            Not sure which is yours? Take the Fit Score
          </Link>
        </div>
      </div>
    </section>
  );
}
