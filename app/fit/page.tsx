import type { Metadata } from "next";
import Quiz from "@/components/Quiz";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Home Business Fit Score",
  description:
    "Answer 8 questions. In 2 minutes you'll know whether Consulting, Coaching or Services is your model, what stage you're really at, and the one thing to do next.",
};

export default function FitPage() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <div className="grid gap-12 py-14 lg:grid-cols-[1fr_1.5fr] lg:py-20">
        <aside className="flex flex-col gap-5">
          <p className="eyebrow">The Home Business Fit Score</p>
          <h1 className="text-[34px] font-extrabold leading-tight sm:text-[40px]">
            Find out which digital business fits you.
          </h1>
          <p className="text-[17px] text-ink-soft">
            Eight questions, two minutes. You&rsquo;ll get your model, your stage on the 7-stage
            journey, and the one thing to do this week. No course pitch at the end. You get your
            result and a short note from Swapnil.
          </p>
          <p className="font-mono text-[12.5px] text-ink-soft">
            {site.years} · {site.websites}
          </p>
        </aside>
        <div className="border border-line bg-surface p-6 sm:p-9">
          <Quiz />
        </div>
      </div>
    </div>
  );
}
