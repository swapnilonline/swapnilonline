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
    pain: "You finished the courses. You took the notes. Nothing is live. Nothing earns.",
    fix: "We set dates. Your page is live by week 4. You talk to five real people by week 8. Learning stops being the excuse.",
  },
  {
    key: "niche",
    title: "The niche you can’t decide",
    pain: "You changed it three times. You still don’t know. Thinking harder won’t fix it.",
    fix: "One question fixes it: who asked you for help this year? We answer it with a real name on the first call. Then the niche is not a decision any more.",
  },
  {
    key: "content",
    title: "Content without clients",
    pain: "You post every day. You get likes. You don’t get clients.",
    fix: "Because there is no offer behind the posts. We write one you can say in one sentence, with a price. Then every post has a job to do.",
  },
  {
    key: "tech",
    title: "Tech that feels like a wall",
    pain: "Funnels. Pages. Automations. It feels like a wall you have to climb first.",
    fix: "You don’t need to learn it. I build your page with you. The funnel is three steps you fill in, not software you study.",
  },
  {
    key: "busy",
    title: "Busy but not growing",
    pain: "You are busy. You are paid by the hour. You are not growing.",
    fix: "More hours won’t fix it. We change what you sell, add a second thing to sell, and set up systems so income grows without your hours.",
  },
  {
    key: "fear",
    title: "The fear nobody will buy",
    pain: "The offer is ready. You are scared nobody will buy.",
    fix: "Everyone is. You say your price to me first, in practice. Then to a client. And if nobody buys in 90 days, we keep going.",
  },
] as const;

export default function Stalls() {
  return (
    <section className="border-t border-line py-16">
      <p className="eyebrow">Sound familiar?</p>
      <h2 className="mt-3 max-w-[22ch] text-[30px] font-bold sm:text-[36px]">
        Six ways people get stuck. Not one of them is your fault.
      </h2>
      <p className="measure mt-4 text-[17px] text-ink-soft">
        Twenty years of watching people start from home. It is always one of these six. Find yours.
        Then read the fix.
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
            Every one of these has a fix. First, find out if you&rsquo;re ready.
          </p>
          <p className="text-[17px] text-ink-soft">
            Three minutes. Eleven questions. If you are ready, you get the fixes, the full plan and a
            free call with me. If not, you get the Blueprint and one clear thing to do this week.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link href="/fit" className="btn btn-primary">
            Check if you&rsquo;re ready <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
