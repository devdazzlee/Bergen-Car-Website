import { IconStar } from "./icons";
import {
  isLiveDealerRating,
  type DealerRating,
} from "../lib/dealer-rating";

function Stars({ value, dark }: { value: number; dark: boolean }) {
  return (
    <span className="flex" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= value + 0.001;
        const partial = !filled && i < value;
        return (
          <IconStar
            key={i}
            className={`h-4 w-4 ${
              filled
                ? dark
                  ? "text-gold"
                  : "text-red"
                : dark
                  ? "text-white/20"
                  : "text-navy/20"
            }`}
            style={partial ? { opacity: 0.45 } : undefined}
          />
        );
      })}
    </span>
  );
}

export default function AutosalesReviewsBadgeSlot({
  variant = "light",
  rating = null,
}: {
  variant?: "light" | "dark";
  rating?: DealerRating | null;
}) {
  const dark = variant === "dark";
  const live = isLiveDealerRating(rating);

  if (!live) {
    return (
      <div
        data-placeholder="autosalesreviews-rating-badge"
        aria-label="AutoSalesReviews rating badge placeholder. Live score will appear here."
        className={`flex min-h-[4.5rem] min-w-[11rem] flex-col justify-center rounded-2xl border border-dashed px-4 py-3 ${
          dark
            ? "border-white/30 bg-white/5 text-white/80"
            : "border-navy/25 bg-mist text-navy-600"
        }`}
      >
        <p
          className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
            dark ? "text-gold" : "text-red"
          }`}
        >
          Placeholder
        </p>
        <p className="mt-1 text-[13px] font-semibold leading-snug">
          AutoSalesReviews rating badge
        </p>
        <p
          className={`mt-0.5 text-[11px] leading-4 ${dark ? "text-white/45" : "text-navy-400"}`}
        >
          Live score goes here — no hardcoded stars or counts
        </p>
      </div>
    );
  }

  const display = rating.combinedRating.toFixed(1);
  const reviews = rating.totalReviews.toLocaleString("en-US");
  const reviewLabel = rating.totalReviews === 1 ? "review" : "reviews";

  return (
    <div
      aria-label={`Rated ${display} out of 5 from ${reviews} ${reviewLabel} on AutoSalesReviews`}
      className={`flex min-h-[4.5rem] min-w-[11rem] flex-col justify-center rounded-2xl px-4 py-3 ring-1 ${
        dark
          ? "bg-white/10 text-white ring-white/20"
          : "bg-white text-ink ring-line shadow-[var(--shadow-card)]"
      }`}
    >
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
          dark ? "text-gold" : "text-red"
        }`}
      >
        AutoSalesReviews
      </p>
      <div className="mt-1.5 flex items-center gap-2">
        <Stars value={rating.combinedRating} dark={dark} />
        <span className="font-heading text-lg font-bold leading-none">
          {display}
        </span>
      </div>
      <p
        className={`mt-1 text-[12px] leading-4 ${dark ? "text-white/65" : "text-navy-600"}`}
      >
        {reviews} {reviewLabel}
      </p>
    </div>
  );
}
