import Link from "next/link";
import { IconArrowRight, IconCheck, IconTruck } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";

const POINTS = [
  "Nationwide auto transport arranged door-to-door, or open-carrier to save on cost",
  "Buy remotely — extra photos, a video walkaround, and a call before you commit",
  "Financing and paperwork handled by phone, email, and e-sign wherever you are",
];

export default function NationwideShipping() {
  return (
    <section
      id="shipping"
      aria-labelledby="shipping-heading"
      className="scroll-mt-24 bg-white py-16 sm:py-20"
    >
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-card)]">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:p-12">
            <Reveal>
              <p className="eyebrow text-red">Nationwide shipping</p>
              <h2 id="shipping-heading" className="display-2 mt-3 text-ink">
                Not just Lodi — we ship nationwide
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-8 text-navy-600">
                Most of our customers are local to Bergen County, but our work
                vans, former police vehicles, and handicap-accessible vans
                regularly leave the lot for buyers well outside New Jersey.
                If the right fleet or mobility vehicle isn&apos;t near you,
                we can usually still get it to you.
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
                <IconTruck className="h-6 w-6" />
              </span>
              <p className="mt-5 font-heading text-3xl font-bold tracking-tight">
                Coast to coast
              </p>
              <p className="mt-1 text-[15px] text-white/70">
                We&apos;ve arranged shipping for buyers well outside New
                Jersey on work vans, ex-police cruisers, and wheelchair vans.
                Ask about delivery to your state when you call.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-gold-300 active:scale-[0.98]"
              >
                Ask about shipping
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
