"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { placeOf, type Review } from "@/lib/reviews";
import { Avatar, Stars } from "@/components/ReviewBits";

const INTERVAL = 7000;

export default function ReviewCarousel({ items }: { items: Review[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);
  const n = items.length;

  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reduced.current || n < 2) return;
    const t = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(t);
  }, [paused, go, n]);

  const r = items[i];

  return (
    <section
      className="flex flex-col gap-6"
      aria-roledescription="carousel"
      aria-label="Reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div
        key={r.name}
        className="grid gap-6 border border-line bg-surface p-7 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-10 motion-safe:animate-[fade_300ms_ease]"
        role="group"
        aria-roledescription="slide"
        aria-label={`${i + 1} of ${n}`}
        aria-live="polite"
      >
        <Avatar r={r} size={72} />
        <figure className="flex flex-col gap-4">
          <Stars />
          <blockquote className="font-body text-[21px] italic leading-[1.4] sm:text-[24px]">
            &ldquo;{r.quote}&rdquo;
          </blockquote>
          <figcaption className="flex flex-col gap-0.5">
            <span className="font-display text-[16px] font-bold">{r.name}</span>
            <span className="text-[15px] text-ink-soft">
              {r.relationship ?? r.title} · {placeOf(r)}
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1.5" role="tablist" aria-label="Choose review">
          {items.map((it, k) => (
            <button
              key={it.name}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={`Review ${k + 1}: ${it.name}`}
              onClick={() => setI(k)}
              className="flex h-11 w-5 cursor-pointer items-center justify-center"
            >
              <span
                className={`block h-[3px] transition-[width,background-color] duration-200 ${
                  k === i ? "w-5 bg-ink" : "w-3 bg-line hover:bg-ink-soft"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line bg-surface hover:border-ink-soft"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next review"
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line bg-surface hover:border-ink-soft"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
