import Link from "next/link";
import { IconArrowRight, IconTag } from "./icons";
import { Reveal } from "./motion";

/**
 * Prominent, low-friction entry point for price-conscious shoppers, right
 * below the search widget. Deliberately separate from the specialty-vehicle
 * focus (work vans / police cars / handicap-accessible) — this is a budget
 * price cut, not a body-style or use-case cut.
 *
 * Contained rather than full-bleed: it sits directly under the floating
 * search card, so it needs its own rounded surface and clearance from that
 * card's shadow instead of running edge to edge against it.
 */
export default function BudgetEntryBanner() {
  return (
    <section aria-labelledby="budget-entry-heading" className="pt-8 sm:pt-10">
      <div className="container-page">
        <Reveal className="flex flex-col gap-4 rounded-2xl bg-gold px-5 py-5 ring-1 ring-ink/5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink">
                <IconTag className="h-5 w-5" />
              </span>
              <p
                id="budget-entry-heading"
                className="font-heading text-[15px] font-bold leading-tight text-ink sm:text-base"
              >
                Shop used cars under $15,000
              </p>
            </div>
            {/* Full width on mobile, aligned under the heading on desktop. */}
            <p className="mt-1.5 text-[13px] leading-snug text-ink/70 sm:mt-1 sm:pl-[3.25rem]">
              Budget-friendly picks, priced on the window.
            </p>
          </div>

          <Link
            href="/inventory?price=under-15000"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98] sm:w-auto sm:py-2.5"
          >
            Browse under $15,000
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
