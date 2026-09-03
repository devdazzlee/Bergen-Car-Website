"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { SectionHeading } from "../components/section-heading";
import PageBanner from "../components/page-banner";
import CountUp from "../components/count-up";
import { Button } from "../components/ui/button";
import { type Vehicle } from "../lib/inventory";
import { VEHICLE_SPECIALS } from "../lib/specials";
import SpecialCard from "./special-card";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconGauge,
  IconShield,
  IconSpark,
  IconWallet,
} from "../components/icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const RATE_SPECIALS = [
  {
    icon: IconSpark,
    headline: "3.9% APR on select 2020-and-newer models",
    body: "For well-qualified buyers, up to 60 months, through our credit-union partners. Ask which cars on the lot currently qualify — it changes as inventory moves.",
    note: "On approved credit. Not all buyers will qualify. Your actual rate depends on credit, term, down payment, and the lender.",
  },
  {
    icon: IconWallet,
    headline: "$0 down for first-time buyers",
    body: "A program built for buyers with little or no credit history and steady income. Bring proof of income and proof of residence.",
    note: "On approved credit through participating lenders. A down payment may still improve your rate and monthly payment.",
  },
  {
    icon: IconShield,
    headline: "Bring us a better offer",
    body: "Already have a written pre-approval from your own bank or credit union? Bring it in — we'll try to beat the rate, and we'll tell you straight if we can't.",
    note: "Must be a current, written approval for a comparable term. No obligation either way, and it won't cost you the deal if we can't match it.",
  },
];

const HOW = [
  {
    icon: IconWallet,
    title: "The “was” price is ours",
    body: "That crossed-out number is the price we had on this exact car earlier — never a manufacturer MSRP, never a made-up figure to make the discount look bigger.",
  },
  {
    icon: IconGauge,
    title: "Why a car gets marked down",
    body: "Usually one of three reasons: it's been on the lot longer than we'd like, we bought it under market and are passing that on, or a newer arrival made it redundant. Not because something's wrong — the inspection report is on every listing.",
  },
  {
    icon: IconClock,
    title: "No fake urgency",
    body: "No countdown clocks, no “only one left” banners. A marked-down car keeps its price until it sells, and the next round of markdowns posts at the start of the month.",
  },
];

const FINE_PRINT = [
  "All prices exclude New Jersey sales tax, title, registration, and a $499 documentary fee. No add-ons are required to get the advertised price — one car, one price.",
  "A \"was\" price shown on a vehicle is our own earlier advertised price for that specific car, not a manufacturer MSRP or a competitor's price. Markdowns are current as of the date shown at the top of this page.",
  "Advertised APRs and down-payment offers require credit approval and are not available to every buyer. Rate, term, and payment depend on your credit, the lender, and the vehicle. We'll show you the real numbers before you sign anything.",
  "A financing special and a vehicle markdown can't always be combined. When they can't, we'll calculate both and give you whichever comes out better for you.",
  "Every vehicle is subject to prior sale. If a car listed here has already sold, tell us what you were after and we'll watch for the next one.",
  "Specials are refreshed at the start of each month. There are no countdown timers on this page and no \"only one left\" claims — if a car is here, it's here until it sells.",
];

function useAsOf() {
  const [asOf, setAsOf] = useState("");
  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      setAsOf(
        new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      ),
    );
    return () => cancelAnimationFrame(raf);
  }, []);
  return asOf;
}

export default function SpecialsClient({ vehicles }: { vehicles: Vehicle[] }) {
  const asOf = useAsOf();

  const totalSaved = VEHICLE_SPECIALS.reduce((sum, s) => {
    const v = vehicles.find((x) => x.id === s.vehicleId);
    if (!v || !s.wasPrice) return sum;
    return sum + Math.max(0, s.wasPrice - v.price);
  }, 0);
  const markedDown = VEHICLE_SPECIALS.filter((s) => {
    const v = vehicles.find((x) => x.id === s.vehicleId);
    return v && s.wasPrice && s.wasPrice > v.price;
  }).length;

  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="Specials"
        title="This month's specials"
        description={
          <p>
            Real markdowns on cars actually sitting on our lot, plus the
            financing offers we can currently get. We refresh this page at the
            start of each month — no countdown timers, no &ldquo;only one
            left.&rdquo;
          </p>
        }
        image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=70"
        imageAlt="A marked-down used sports sedan on the lot at Bergen Car Company in Lodi, New Jersey"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white/80">
          <span className="h-2 w-2 rounded-full bg-gold" />
          {asOf ? `Current as of ${asOf}` : "Refreshed monthly"}
        </p>
      </PageBanner>

      {/* savings ticker */}
      <section className="relative -mt-px border-y border-navy-700 bg-navy py-8">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="font-heading text-4xl font-bold tracking-tight text-gold sm:text-5xl">
                <CountUp value={totalSaved} prefix="$" />
              </p>
              <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.14em] text-white/50">
                in price cuts on the lot right now
              </p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[15px] leading-7 text-white/70 sm:border-l sm:border-white/10 sm:pl-10"
            >
              Across{" "}
              <span className="font-semibold text-white">
                {markedDown} vehicles
              </span>{" "}
              currently marked down from our own earlier price. Every figure
              below is a real change on a real car — tap one to see the listing,
              the inspection notes, and the history.
            </motion.p>
          </div>
        </div>
      </section>

      {/* vehicle specials */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading kicker="On the lot now" title="Marked-down vehicles">
            Each of these is a real price change on a real car. Tap any one to
            see the full listing, the inspection notes, and the history.
          </SectionHeading>

          <Stagger
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.09}
          >
            {VEHICLE_SPECIALS.map((s) => (
              <StaggerItem key={s.vehicleId}>
                <SpecialCard special={s} vehicles={vehicles} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-10">
            <Link
              href="/inventory"
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              Not seeing your car? Browse the full inventory
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* how markdowns work */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="How this page works"
            title="A markdown here means one thing"
          >
            No manufactured discounts, no games with the reference price. Here&apos;s
            exactly what a lower number on this page does and doesn&apos;t mean.
          </SectionHeading>

          <Stagger
            className="mt-12 grid gap-6 lg:grid-cols-3"
            stagger={0.1}
          >
            {HOW.map(({ icon: Icon, title, body }, i) => (
              <StaggerItem
                key={title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
              >
                <span
                  aria-hidden
                  className="absolute right-5 top-4 font-heading text-4xl font-bold text-cloud transition-colors group-hover:text-gold/25"
                >
                  {i + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-7 text-navy-600">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* financing specials */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="Financing offers"
            title="Rate and down-payment specials"
          >
            Separate from the vehicle markdowns above, so nothing gets confused.
            These are about the loan, not the sticker.
          </SectionHeading>

          <Stagger className="mt-12 grid gap-6 lg:grid-cols-3" stagger={0.1}>
            {RATE_SPECIALS.map(({ icon: Icon, headline, body, note }) => (
              <StaggerItem
                key={headline}
                className="group flex flex-col rounded-2xl border border-line-strong bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-colors duration-300 group-hover:bg-red group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-[17px] font-bold leading-snug text-ink">
                  {headline}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-7 text-navy-600">
                  {body}
                </p>
                <p className="mt-4 border-t border-line pt-4 text-[12px] leading-5 text-navy-500">
                  {note}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-10">
            <Button asChild variant="navy">
              <Link href="/financing">
                Get pre-qualified — see your real rate
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* fine print */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl rounded-3xl border border-line-strong bg-mist/50 p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="flex items-center gap-2">
              <IconCheck className="h-5 w-5 text-red" />
              <h2 className="font-heading text-lg font-bold text-ink">
                The terms, in plain sight
              </h2>
            </div>
            <p className="mt-2 text-[14px] leading-6 text-navy-600">
              Everything that applies to the offers on this page is right here,
              at a size you can actually read. If something below isn&apos;t
              clear, ask us and we&apos;ll explain it before you commit to
              anything.
            </p>
            <ul className="mt-5 space-y-3">
              {FINE_PRINT.map((t) => (
                <li key={t.slice(0, 24)} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-400" />
                  <p className="text-[13.5px] leading-6 text-navy-600">{t}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* bottom CTA */}
      <section className="bg-mist pb-16 sm:pb-20">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl bg-navy p-8 sm:p-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-gold">Worth a look first</p>
                <h2 className="display-3 mt-3 text-white">
                  New markdowns go up at the start of every month
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  And the full inventory is always priced up front, special or
                  not.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
                <Button asChild variant="gold" size="lg">
                  <Link href="/inventory">
                    Browse full inventory
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy"
                >
                  <Link href="/contact">Ask about a car</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
