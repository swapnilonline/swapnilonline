import { stages, type StageKey } from "@/lib/site";

export default function Journey({
  current,
  compact = false,
}: {
  /** Highlight the stage the reader is at. */
  current?: StageKey;
  compact?: boolean;
}) {
  return (
    <ol className="flex flex-col" aria-label="The 1:1 journey, seven stages">
      {stages.map((s) => {
        const here = s.key === current;
        return (
          <li
            key={s.key}
            className={`grid grid-cols-[52px_1fr] gap-4 border-t border-line ${
              compact ? "py-3" : "py-5"
            } last:border-b ${here ? "bg-accent-soft/60 -mx-3 px-3" : ""}`}
            aria-current={here ? "step" : undefined}
          >
            <span
              className={`font-display text-[30px] font-extrabold leading-none ${
                here ? "text-accent" : "text-ink-soft/70"
              }`}
            >
              {String(s.n).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1">
              <span className="font-display text-[19px] font-bold uppercase tracking-wide">
                {s.name}
                {here && (
                  <span className="ml-3 rounded-sm bg-mark px-2 py-0.5 font-mono text-[11px] font-medium normal-case tracking-wider text-accent-ink">
                    You are here
                  </span>
                )}
              </span>
              {!compact && <span className="text-[17px] text-ink-soft">{s.line}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
