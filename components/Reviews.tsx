import ReviewCarousel from "@/components/ReviewCarousel";
import { Avatar, Stars, TrustpilotMark } from "@/components/ReviewBits";
import { featuredReviews, placeOf, reviews, trustpilot, type Review } from "@/lib/reviews";

/* ---------- Rating line ---------- */

export function TrustLine({ className = "" }: { className?: string }) {
  return (
    <a
      href={trustpilot.url}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 whitespace-nowrap no-underline hover:opacity-80 ${className}`}
    >
      <Stars />
      <span className="font-mono text-[12.5px] text-ink-soft">
        {trustpilot.label} · {trustpilot.score} on
      </span>
      <TrustpilotMark size={16} />
    </a>
  );
}

/* ---------- Sections ---------- */

/** Carousel of the reviews that have a usable quote, for the home and program pages. */
export function ReviewsSection({
  heading = "What people say after working with Swapnil",
}: {
  heading?: string;
}) {
  const items = reviews.filter((r) => r.quote.length > 60);
  return (
    <section className="border-t border-line py-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Reviews</p>
          <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">{heading}</h2>
        </div>
        <TrustLine />
      </div>
      <div className="mt-10">
        <ReviewCarousel items={items} />
      </div>
      <p className="mt-6 text-[16px] text-ink-soft">
        Verbatim from public reviews.{" "}
        <a
          href={trustpilot.url}
          target="_blank"
          rel="noreferrer"
          className="font-display font-bold text-accent no-underline hover:underline"
        >
          Read them on Trustpilot.
        </a>
      </p>
    </section>
  );
}

/** Every review, for the About page. */
export function AllReviews() {
  return (
    <section className="border-t border-line py-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Every review, unedited</p>
          <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">
            Rated {trustpilot.label} on Trustpilot. Every review, five stars.
          </h2>
        </div>
        <TrustLine />
      </div>
      <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {reviews.map((r) => (
          <li key={r.name} className="flex flex-col gap-3 border-t border-line pt-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar r={r} size={40} />
                <div className="flex flex-col">
                  <span className="font-display text-[15px] font-bold">{r.name}</span>
                  <span className="text-[14px] text-ink-soft">{placeOf(r)}</span>
                </div>
              </div>
              <span className="font-mono text-[12px] text-ink-soft">{r.date}</span>
            </div>
            <Stars />
            <p className="font-display text-[18px] font-bold">{r.title}</p>
            {r.full && <p className="text-[16.5px] text-ink">{r.full}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** One quote, for the result page. */
export function OneReview({ r = featuredReviews[1] }: { r?: Review }) {
  return (
    <div className="flex flex-col gap-5">
      <figure className="grid gap-5 sm:grid-cols-[auto_1fr]">
        <Avatar r={r} size={56} />
        <div className="flex flex-col gap-3">
          <Stars />
          <blockquote className="font-body text-[22px] italic leading-[1.4]">
            &ldquo;{r.quote}&rdquo;
          </blockquote>
          <figcaption className="flex flex-col gap-0.5">
            <span className="font-display text-[15px] font-bold">{r.name}</span>
            <span className="text-[15px] text-ink-soft">
              {r.relationship ?? r.title} · {placeOf(r)}
            </span>
          </figcaption>
        </div>
      </figure>
      <TrustLine />
    </div>
  );
}
