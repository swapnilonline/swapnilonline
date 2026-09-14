"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type Source =
  | { kind: "youtube"; id: string }
  | { kind: "file"; src: string; poster: string };

/**
 * Click-to-play video. Shows a poster until the visitor presses play, so
 * nothing heavy loads with the page. Supports a self-hosted MP4 or YouTube.
 */
export default function VideoSection({
  source,
  title,
  eyebrow = "Watch",
  heading,
  body,
  minutes,
}: {
  source: Source;
  title: string;
  eyebrow?: string;
  heading: string;
  body: string;
  minutes?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const poster = source.kind === "youtube" ? `https://i.ytimg.com/vi/${source.id}/hqdefault.jpg` : source.poster;

  function play() {
    // Call play() synchronously inside the click so the browser treats it as user-initiated.
    const v = videoRef.current;
    if (v) {
      v.classList.remove("hidden");
      v.play().catch(() => {});
    }
    setPlaying(true);
  }

  return (
    <section className="grid gap-10 border-t border-line py-16 lg:grid-cols-[1fr_1.4fr] lg:items-center">
      <div className="flex flex-col gap-4">
        <p className="eyebrow">{eyebrow}{minutes ? ` · ${minutes}` : ""}</p>
        <h2 className="text-[30px] font-bold sm:text-[36px]">{heading}</h2>
        <p className="text-[17px] text-ink-soft">{body}</p>
      </div>

      <div className="relative aspect-video w-full overflow-hidden border border-line bg-ink">
        {source.kind === "file" && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full ${playing ? "" : "hidden"}`}
            src={source.src}
            poster={source.poster}
            controls
            playsInline
            preload="none"
            aria-label={title}
          />
        )}
        {playing && source.kind === "youtube" && (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {!playing && (
          <button
            type="button"
            onClick={play}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center"
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
              unoptimized={source.kind === "youtube"}
            />
            <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-mark text-ink shadow-lg transition-transform group-hover:scale-105 motion-reduce:transition-none">
              <Play size={30} className="ml-1 fill-ink" aria-hidden="true" />
            </span>
            <span className="absolute bottom-4 left-4 rounded-sm bg-ink/85 px-3 py-1.5 font-mono text-[12px] text-ground">
              {title}
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
