import Link from "next/link";
import { IconArrowRight, IconTag } from "./icons";
import { Reveal } from "./motion";

/**
 * Prominent, low-friction entry point for price-conscious shoppers, right
 * below the hero. Deliberately separate from the specialty-vehicle focus
 * (work vans / police cars / handicap-accessible) — this is a budget price
 * cut, not a body-style or use-case cut.
 */
export default function BudgetEntryBanner() {
  return (
    <section className="bg-gold">
      <Reveal className="container-page flex flex-col items-center gap-3 py-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink">
            <IconTag className="h-5 w-5" />
          </span>
          <div>
            <p className="font-heading text-[15px] font-bold leading-tight text-ink">
              Shop Used Cars Under $15,000
            </p>
            <p className="text-[13px] leading-snug text-ink/70">
              Budget-friendly picks, priced on the window — filtered and
              ready to browse.
            </p>
          </div>
        </div>
        <Link
          href="/inventory?price=under-15000"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98]"
        >
          Browse under $15,000
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}
