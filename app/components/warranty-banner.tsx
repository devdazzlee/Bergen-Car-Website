import Link from "next/link";
import { IconArrowRight, IconCheck, IconShield } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";

const POINTS = [
  "3 months / 3,000 miles on every car — included, not an add-on",
  "No deductible on covered powertrain failures",
  "Covered work is done at a licensed repair facility",
];

export default function WarrantyBanner() {
  return (
    <section id="warranty" className="scroll-mt-24 bg-mist py-16 sm:py-20">
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-card)]">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:p-12">
            <Reveal>
              <p className="eyebrow text-red">Warranty</p>
              <h2 className="display-2 mt-3 text-ink">
                Coverage comes with the car
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-8 text-navy-600">
                Every vehicle includes a limited powertrain warranty. Longer
                plans are optional and can roll into your financing if you want
                them.
              </p>
              <Stagger className="mt-6 space-y-2.5" stagger={0.08}>
                {POINTS.map((p) => (
                  <StaggerItem
                    key={p}
                    className="flex items-start gap-3 text-[15px] text-navy-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-600">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>

            <Reveal
              delay={0.08}
              className="rounded-2xl bg-navy p-6 text-white sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-ink">
                <IconShield className="h-6 w-6" />
              </span>
              <p className="mt-5 font-heading text-3xl font-bold tracking-tight">
                3 / 3,000
              </p>
              <p className="mt-1 text-[15px] text-white/70">
                Months and miles, whichever comes first. Bergen pays parts and
                labor on a covered failure.
              </p>
              <Link
                href="/warranty"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-gold-300 active:scale-[0.98]"
              >
                See what&apos;s covered
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
