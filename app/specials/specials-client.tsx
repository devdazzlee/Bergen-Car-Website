"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { Button } from "../components/ui/button";
import { VEHICLE_SPECIALS } from "../lib/specials";
import SpecialCard from "./special-card";
import {
  IconArrowRight,
  IconCheck,
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

const FINE_PRINT = [
  "All prices exclude New Jersey sales tax, title, registration, and a $499 documentary fee. No add-ons are required to get the advertised price — one car, one price.",
  "A \"was\" price shown on a vehicle is our own earlier advertised price for that specific car, not a manufacturer MSRP or a competitor's price. Markdowns are current as of the date shown at the top of this page.",
  "Advertised APRs and down-payment offers require credit approval and are not available to every buyer. Rate, term, and payment depend on your credit, the lender, and the vehicle. We'll show you the real numbers before you sign anything.",
  "A financing special and a vehicle markdown can't always be combined. When they can't, we'll calculate both and give you whichever comes out better for you.",
  "Every vehicle is subject to prior sale. If a car listed here has already sold, tell us what you were after and we'll watch for the next one.",
  "Specials are refreshed at the start of each month. There are no countdown timers on this page and no \"only one left\" claims — if a car is here, it's here until it sells.",
];

export default function SpecialsClient() {
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

  return (
    <div className="bg-mist">
      {/* header */}
      <section className="relative overflow-hidden bg-navy pb-14 pt-32">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div
          aria-hidden
          className="absolute -left-24 top-4 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        />
        <div className="container-page relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="eyebrow text-gold">Specials</p>
            <h1 className="display-2 mt-3 text-white">This month&apos;s specials</h1>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Real markdowns on cars actually sitting on our lot, plus the
              financing offers we can currently get. We refresh this page at the
              start of each month — no countdown timers, no &ldquo;only one
              left.&rdquo;
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-semibold text-white/75">
              <span className="h-2 w-2 rounded-full bg-gold" />
              {asOf ? `Current as of ${asOf}` : "Refreshed monthly"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* vehicle specials */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">On the lot now</p>
            <h2 className="display-2 mt-2 text-ink">Marked-down vehicles</h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              Each of these is a real price change on a real car. Tap any one to
              see the full listing, the inspection notes, and the history.
            </p>
          </Reveal>

          <Stagger
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.09}
          >
            {VEHICLE_SPECIALS.map((s) => (
              <StaggerItem key={s.vehicleId}>
                <SpecialCard special={s} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-10">
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              Not seeing your car? Browse the full inventory
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* financing specials */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">Financing offers</p>
            <h2 className="display-2 mt-2 text-ink">
              Rate and down-payment specials
            </h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              Separate from the vehicle markdowns above, so nothing gets
              confused. These are about the loan, not the sticker.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 lg:grid-cols-3" stagger={0.1}>
            {RATE_SPECIALS.map(({ icon: Icon, headline, body, note }) => (
              <StaggerItem
                key={headline}
                className="flex flex-col rounded-2xl border border-line-strong bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
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
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl rounded-3xl border border-line-strong bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
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
      <section className="bg-navy py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="display-3 text-white">
                New markdowns go up at the start of every month
              </h2>
              <p className="mt-2 text-[15px] leading-7 text-white/70">
                Worth a look before you buy. And the full inventory is always
                priced up front, special or not.
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
          </Reveal>
        </div>
      </section>
    </div>
  );
}
