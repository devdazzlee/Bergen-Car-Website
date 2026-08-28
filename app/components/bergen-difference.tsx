import { Reveal, Stagger, StaggerItem } from "./motion";
import { IconCheck, IconClose } from "./icons";

const ROWS = [
  "The price online is the price you pay",
  "Inspection report with every car",
  "One application sent to a dozen lenders",
  "Written trade-in offer in about 20 minutes",
  "No surprise add-ons or reconditioning fees",
  "3-month / 3,000-mile warranty included",
  "On-site service shop for any make",
  "Soft credit check to get pre-qualified",
];

const COLS = "grid-cols-[1fr_4.25rem_4.25rem] sm:grid-cols-[1fr_9rem_9rem]";

export default function BergenDifference() {
  return (
    <section className="bg-mist py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-red">What&apos;s included</p>
          <h2 className="display-2 mt-2 text-ink">
            What you get when you buy from us
          </h2>
          <p className="mt-4 text-lg leading-8 text-navy-600">
            The things below come standard here. At a lot of places they cost
            extra, or aren&apos;t offered at all.
          </p>
        </Reveal>

        <Reveal
          delay={0.05}
          className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-card)]"
        >
          {/* header */}
          <div className={`grid ${COLS} bg-navy text-white`}>
            <div className="px-5 py-4 text-sm font-semibold sm:px-7">
              What you get
            </div>
            <div className="flex flex-col items-center justify-center border-x border-white/10 bg-white/[0.05] px-2 py-3">
              <span className="font-heading text-sm font-bold text-gold">
                Bergen
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-wide text-white/45">
                Standard
              </span>
            </div>
            <div className="flex items-center justify-center px-2 py-3 text-center text-sm font-medium text-white/45">
              Most lots
            </div>
          </div>

          {/* rows */}
          <Stagger stagger={0.055}>
            {ROWS.map((row) => (
              <StaggerItem
                key={row}
                className={`grid ${COLS} items-stretch border-t border-line transition-colors hover:bg-mist/50`}
              >
                <div className="px-5 py-4 text-[14px] leading-snug text-ink sm:px-7 sm:text-[15px]">
                  {row}
                </div>
                <div className="flex items-center justify-center border-x border-line bg-gold/[0.07] px-2 py-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-ink shadow-sm">
                    <IconCheck className="h-4 w-4" />
                  </span>
                </div>
                <div className="flex items-center justify-center px-2 py-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/[0.06] text-navy-400">
                    <IconClose className="h-4 w-4" />
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* footer */}
          <div className="border-t border-line bg-navy px-5 py-4 text-center text-[13px] font-medium text-white/80 sm:px-7">
            Every one of these is standard here — none of it is an upsell.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
