import type { Metadata } from "next";
import Quiz from "@/components/Quiz";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Fit Score: are you ready to launch a digital business?",
  description:
    "Eleven questions, three minutes. A score out of 14 across ONE PERSON, ONE PROBLEM, ONE PRODUCT, ONE PROMISE, proof, capacity and commitment. Your lane, your gaps, and the one thing to do this week.",
};

export default function FitPage() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <div className="grid gap-12 py-14 lg:grid-cols-[1fr_1.5fr] lg:py-20">
        <aside className="flex flex-col gap-5">
          <p className="eyebrow">The Fit Score · 7 stages · scored out of 14</p>
          <h1 className="text-[34px] font-extrabold leading-tight sm:text-[40px]">
            Are you ready to launch a digital business?
          </h1>
          <p className="text-[17px] text-ink-soft">
            Eleven questions, three minutes. The framework is ONE PERSON → ONE PROBLEM → ONE
            PRODUCT → ONE PROMISE, then proof, capacity and commitment. Each stage is scored. You get
            your total, your lane, the stage that is weakest, and the one thing to do this week. No
            pitch at the end. You get your score, the Blueprint, and a short note from Swapnil.
          </p>
          <ol className="flex flex-col gap-1 border-t border-line pt-4 font-mono text-[12.5px] text-ink-soft">
            {["ONE PERSON", "ONE PROBLEM", "ONE PRODUCT", "ONE PROMISE", "PROOF", "CAPACITY", "COMMITMENT"].map((s, i) => (
              <li key={s}>{i + 1}. {s}</li>
            ))}
          </ol>
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
