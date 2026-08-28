import { Reveal, Stagger, StaggerItem } from "./motion";
import { IconCheck, IconClose } from "./icons";

const ROWS = [
  "The online price is the price you pay",
  "150-point inspection report with every car",
  "One application, up to 12 lenders",
  "Firm written trade-in offer in ~20 minutes",
  "No mandatory add-ons or reconditioning fees",
  "3-month / 3,000-mile warranty included",
  "On-site service center for any make",
  "Soft credit check to pre-qualify",
];

export default function BergenDifference() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-red">The Bergen difference</p>
          <h2 className="display-2 mt-2 text-ink">
            The same car, a very different afternoon
          </h2>
          <p className="mt-4 text-lg leading-8 text-navy-600">
            Here&apos;s what&apos;s standard with us versus what you&apos;ll
            typically find at a walk-in used lot.
          </p>
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-3xl border border-line">
          <div className="grid grid-cols-[1fr_auto_auto] bg-navy text-white">
            <div className="px-5 py-4 text-sm font-semibold sm:px-8">
              What you get
            </div>
            <div className="w-24 px-3 py-4 text-center text-sm font-semibold sm:w-40">
              Bergen
            </div>
            <div className="w-24 px-3 py-4 text-center text-sm font-medium text-white/60 sm:w-40">
              Typical lot
            </div>
          </div>

          <Stagger>
            {ROWS.map((row, i) => (
              <StaggerItem
                key={row}
                className={`grid grid-cols-[1fr_auto_auto] items-center ${
                  i % 2 ? "bg-mist/60" : "bg-white"
                }`}
              >
                <div className="px-5 py-4 text-[15px] text-ink sm:px-8">
                  {row}
                </div>
                <div className="flex w-24 justify-center px-3 py-4 sm:w-40">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-gold-600">
                    <IconCheck className="h-4 w-4" />
                  </span>
                </div>
                <div className="flex w-24 justify-center px-3 py-4 sm:w-40">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/5 text-navy-400">
                    <IconClose className="h-4 w-4" />
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
