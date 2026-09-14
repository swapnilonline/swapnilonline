"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export type VideoSource =
  | { kind: "youtube"; id: string }
  | { kind: "file"; src: string; poster: string };

/**
 * Minimal click-to-play video. No browser controls: click to play, click again
 * to pause, and the poster returns when it ends. Nothing loads until pressed.
 */
export default function VideoPlayer({ source, title }: { source: VideoSource; title: string }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const poster = source.kind === "youtube" ? `https://i.ytimg.com/vi/${source.id}/hqdefault.jpg` : source.poster;

  function play() {
    const v = videoRef.current;
    if (v) {
      v.classList.remove("hidden");
      v.play().catch(() => {});
    }
    setPlaying(true);
  }

  function pause() {
    videoRef.current?.pause();
    setPlaying(false);
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-line bg-ink">
      {source.kind === "file" && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full ${playing ? "" : "hidden"}`}
          src={source.src}
          poster={source.poster}
          playsInline
          preload="none"
          aria-label={title}
          onEnded={() => setPlaying(false)}
        />
      )}
      {playing && source.kind === "youtube" && (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0&modestbranding=1&controls=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      {playing && source.kind === "file" && (
        <button
          type="button"
          onClick={pause}
          aria-label="Pause video"
          className="absolute inset-0 h-full w-full cursor-pointer bg-transparent"
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
            priority
            sizes="(min-width: 1024px) 520px, 100vw"
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
  );
}
