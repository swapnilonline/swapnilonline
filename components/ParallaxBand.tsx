"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Full-bleed photo band with a gentle parallax. The image is taller than the
 * band and slides a little as the band crosses the viewport. Runs only while
 * visible, on the compositor (transform only), and not at all for people who
 * prefer reduced motion.
 */
export default function ParallaxBand({
  src,
  alt,
  width,
  height,
  caption,
  strength = 0.18,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Fraction of the band height the image travels across the scroll. */
  strength?: number;
}) {
  const bandRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const img = imgRef.current;
    if (!band || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = band.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the band's top is at the bottom of the viewport, +1 when its bottom is at the top.
      const progress = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
      img.style.transform = `translate3d(0, ${(-progress * strength * r.height).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(band);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <figure className="relative left-1/2 m-0 w-screen -translate-x-1/2">
      <div ref={bandRef} className="relative h-[62vh] min-h-[340px] max-h-[720px] overflow-hidden bg-surface">
        {/* Taller than the band so there is room to slide. */}
        <div
          ref={imgRef}
          className="absolute inset-x-0 will-change-transform"
          style={{ top: `${-strength * 100}%`, height: `${100 + strength * 200}%` }}
        >
          <Image src={src} alt={alt} width={width} height={height} sizes="100vw" className="h-full w-full object-cover" />
        </div>
      </div>
      {caption && (
        <figcaption className="mx-auto mt-3 max-w-5xl px-5 font-mono text-[12.5px] text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
