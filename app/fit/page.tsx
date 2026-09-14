import type { Metadata } from "next";
import Quiz from "@/components/Quiz";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Home Business Fit Score",
  description:
    "Eight questions, two minutes. Find out which business you're actually building, the stage that's blocking your first client, and the one thing to do this week.",
};

export default function FitPage() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <div className="grid gap-12 py-14 lg:grid-cols-[1fr_1.5fr] lg:py-20">
        <aside className="flex flex-col gap-5">
          <p className="eyebrow">The Home Business Fit Score</p>
          <h1 className="text-[34px] font-extrabold leading-tight sm:text-[40px]">
            Find out what&rsquo;s between you and your first client.
          </h1>
          <p className="text-[17px] text-ink-soft">
            Eight questions, two minutes. You&rsquo;ll know which business you&rsquo;re actually
            building, the stage that&rsquo;s blocking you, and the one thing to do this week. No
            pitch at the end. You get your result, the Blueprint, and a short note from Swapnil.
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
