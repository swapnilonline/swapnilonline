import Image from "next/image";
import { Star } from "lucide-react";
import { initials, type Review } from "@/lib/reviews";

/* ---------- Trustpilot mark ---------- */

const TP_GREEN = "#00B67A";

function TrustpilotStar({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill={TP_GREEN}
        d="M12 1.5l2.9 7.2 7.6.4-5.9 4.9 1.9 7.5L12 17.4l-6.5 4.1 1.9-7.5L1.5 9.1l7.6-.4z"
      />
      <path fill="#005128" d="M12 17.4l3.1-.8 1.4 5.1z" opacity=".85" />
    </svg>
  );
}

export function TrustpilotMark({ size = 18 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 align-middle">
      <TrustpilotStar size={size} />
      <span
        className="font-display font-extrabold tracking-tight text-ink"
        style={{ fontSize: size * 0.95 }}
      >
        Trustpilot
      </span>
    </span>
  );
}

/* ---------- Stars ---------- */

export function Stars({ n = 5, size = 15 }: { n?: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          aria-hidden="true"
          className={i < n ? "fill-mark text-mark" : "text-line"}
        />
      ))}
    </span>
  );
}

/* ---------- Avatar ---------- */

const avatarTones = ["bg-accent-soft", "bg-mark-soft", "bg-money-soft", "bg-surface-2"];

function tone(name: string) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return avatarTones[h % avatarTones.length];
}

export function Avatar({ r, size = 48 }: { r: Review; size?: number }) {
  const s = { width: size, height: size };
  if (r.avatar) {
    return (
      <Image
        src={r.avatar}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={s}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{ ...s, fontSize: size * 0.36 }}
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-extrabold text-ink ${tone(r.name)}`}
    >
      {initials(r.name)}
    </span>
  );
}
