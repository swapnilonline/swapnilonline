import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog: building a business from home, stage by stage",
  description:
    "Practical guides for freelancers, consultants and solopreneurs in India: picking a model, packaging an offer, pricing, getting the first client, and the one-page website that books you.",
  alternates: { canonical: `${site.url}/blog` },
};

export default function BlogIndex() {
  const posts = allPosts();
  return (
    <div className="mx-auto max-w-5xl px-5">
      <section className="flex flex-col gap-5 py-16 sm:py-20">
        <p className="eyebrow">Blog</p>
        <h1 className="max-w-[18ch] text-[40px] font-extrabold sm:text-[52px]">
          From skill to paying clients, one stage at a time.
        </h1>
        <p className="measure text-[19px] text-ink-soft">
          Written from twenty years of running a business from home and 2,500+ websites built for
          people at the exact moment they were starting. Each guide covers one stage of the
          journey, with the thing to do this week.
        </p>
      </section>

      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
        {posts.map((p) => (
          <li key={p.slug} className="bg-surface">
            <Link href={`/blog/${p.slug}`} className="flex h-full flex-col gap-3 p-7 no-underline hover:bg-surface-2">
              <p className="eyebrow">{p.cluster} · {p.readingMinutes} min read</p>
              <h2 className="text-[24px] font-bold leading-tight text-ink">{p.title}</h2>
              <p className="text-[16.5px] text-ink-soft">{p.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 font-display text-[15px] font-bold text-accent">
                Read <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="py-16">
        <div className="flex flex-col gap-6 bg-panel px-7 py-10 text-panel-ink sm:px-10 sm:py-14">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-mark">Not sure where you&rsquo;re stuck?</p>
          <h2 className="max-w-[22ch] text-[32px] font-extrabold text-panel-ink sm:text-[40px]">
            Are you ready? Find out in 3 minutes.
          </h2>
          <div>
            <Link href="/fit" className="btn bg-mark text-accent-ink hover:bg-accent-strong">
              Check if you&rsquo;re ready <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
