"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import PageBanner, { BannerPills } from "../components/page-banner";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  IconArrowRight,
  IconCheck,
  IconClose,
  IconShield,
  IconWrench,
} from "../components/icons";

const PLANS = [
  {
    name: "Included coverage",
    tag: "Standard on every car",
    accent: true,
    term: "3 months / 3,000 miles",
    price: "$0",
    priceNote: "Comes with every vehicle we sell — not an add-on.",
    deductible: "$0 deductible",
    covers: [
      "Engine — internally lubricated parts, timing components, oil pump",
      "Transmission — automatic or manual, internal parts",
      "Drive axle — front and rear, transfer case on 4WD/AWD",
      "Seals and gaskets on the covered assemblies",
    ],
    foot: "Bergen pays 100% of parts and 100% of labor on covered failures. Whichever limit — time or miles — comes first.",
  },
  {
    name: "Powertrain Plus",
    tag: "Optional — extend & broaden",
    term: "12 / 24 / 36 months",
    price: "from $895",
    priceNote: "Priced by the vehicle and term. Can roll into your financing.",
    deductible: "$100 per visit",
    covers: [
      "Everything in the included coverage, for longer",
      "Cooling system — water pump, radiator, thermostat",
      "Electrical — alternator, starter, power windows and locks",
      "Air conditioning — compressor, condenser, evaporator",
      "Fuel system — pump, injectors, sending unit",
    ],
    foot: "Nationwide claims. Repairs at any licensed repair facility.",
  },
  {
    name: "Comprehensive",
    tag: "Optional — closest to new-car coverage",
    term: "24 / 36 / 48 months",
    price: "from $1,795",
    priceNote: "Priced by the vehicle and term. Can roll into your financing.",
    deductible: "$100 per visit",
    covers: [
      "Everything in Powertrain Plus",
      "Steering and front/rear suspension components",
      "Brake system — master cylinder, calipers, ABS (not pads or rotors)",
      "High-tech: infotainment, cameras, sensors, control modules",
      "Roadside assistance and rental reimbursement while it's in the shop",
    ],
    foot: "Covers most of what a manufacturer bumper-to-bumper does, minus normal wear items.",
  },
];

const COVERED = [
  "Engine internals, transmission, and drive axle (the powertrain)",
  "Failures from normal use during the coverage period",
  "Parts and labor at any licensed repair facility",
  "Seals and gaskets on covered assemblies",
  "Diagnosis time for a covered failure",
  "Towing to the nearest repair facility (Comprehensive plan)",
];

const NOT_COVERED = [
  "Wear items: brake pads, rotors, tires, wiper blades, bulbs, belts, hoses",
  "Routine maintenance: oil changes, filters, fluids, alignments, tune-ups",
  "Cosmetic: paint, upholstery, trim, glass, scratches and dents",
  "Anything already noted as a known issue at sale",
  "Damage from an accident, misuse, off-roading, racing, or skipped maintenance",
  "Aftermarket parts and any failure they cause",
];

export const FAQS = [
  {
    q: "What happens if something breaks after I buy?",
    a: "If it's a covered failure inside the coverage window, call us and we'll help you get the car into a licensed repair facility. We confirm it's covered and the work is handled there. On the included warranty there's no deductible; on the extended plans it's $100 per visit. You don't front the money and wait for a reimbursement — covered repairs are arranged directly.",
  },
  {
    q: "Can I purchase extended coverage, and when?",
    a: "Yes. The best time is at purchase, because the cost can roll into your financing and the price is lower on a car with fewer miles. You can usually still add a plan within the first 30 days or so afterward — call us and we'll tell you what's available for your specific car.",
  },
  {
    q: "Is there a deductible?",
    a: "The included 3-month / 3,000-mile warranty has no deductible. The extended service contracts (Powertrain Plus and Comprehensive) have a $100 deductible per repair visit, regardless of how many covered parts are fixed on that visit.",
  },
  {
    q: "Where can I get the work done?",
    a: "We don't have an in-house repair shop. Call us and we'll help you get covered work done at a licensed facility. The extended plans are backed by a national administrator and can be used at any licensed repair facility in the U.S. — you're not tied to Lodi if you move or you're traveling.",
  },
  {
    q: "What voids the warranty?",
    a: "Skipping the maintenance in your owner's manual (keep your receipts), modifying the powertrain, using the car for racing or commercial hauling, or a repair done improperly by an unlicensed shop. Normal driving and normal maintenance keep it in force. We'll go over the exact terms with you before you sign.",
  },
  {
    q: "Does the coverage transfer if I sell the car?",
    a: "The included warranty is tied to the original buyer. The extended service contracts are transferable to a private buyer for a small fee, which can make your car easier to sell. The plan documents spell out the process.",
  },
  {
    q: "What about a car marked \"AS IS\"?",
    a: "Almost everything on our lot is sold with the included warranty. If a specific vehicle is ever sold AS IS — sometimes the case on a very low-priced older car — its window Buyers Guide will say so in plain type, and we'll point it out before you buy. AS IS means once you drive off, repairs are on you. You can still add an extended service contract to most AS IS cars.",
  },
];

export default function WarrantyClient() {
  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="Warranty"
        title="What's covered, in plain language"
        description={
          <p>
            Every car we sell comes with a real warranty, and we&apos;ll explain
            the terms in words you can act on — {""}
            <span className="text-white">not buried in fine print</span>. Here&apos;s
            exactly what&apos;s covered, what isn&apos;t, and how a claim works.
          </p>
        }
        image="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=2400&q=70"
        imageAlt="Used cars on the lot at Bergen Car Company in Lodi, New Jersey"
      >
        <BannerPills
          items={["Warranty on every car", "Parts + labor covered", "No hidden exclusions"]}
        />
      </PageBanner>

      {/* plans */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">Coverage levels</p>
            <h2 className="display-2 mt-2 text-ink">
              One is included. Two are optional.
            </h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              Every vehicle leaves with the included warranty at no cost. If you
              want longer or broader protection, you can add one of two extended
              service contracts — priced by the car, and rollable into
              financing.
            </p>
          </Reveal>

          <Stagger
            className="mt-12 grid gap-6 lg:grid-cols-3"
            stagger={0.1}
          >
            {PLANS.map((p) => (
              <StaggerItem
                key={p.name}
                className={`flex flex-col rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] sm:p-7 ${
                  p.accent
                    ? "border-gold ring-1 ring-gold/40 shadow-[var(--shadow-card)]"
                    : "border-line-strong shadow-[var(--shadow-card)]"
                }`}
              >
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    p.accent ? "bg-gold text-ink" : "bg-mist text-navy-600"
                  }`}
                >
                  {p.tag}
                </span>
                <h3 className="mt-3 font-heading text-lg font-bold text-ink">
                  {p.name}
                </h3>
                <p className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink">
                  {p.term}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-heading text-xl font-bold text-gold-600">
                    {p.price}
                  </span>
                  <span className="text-[13px] text-navy-500">
                    {p.deductible}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] leading-5 text-navy-500">
                  {p.priceNote}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
                  {p.covers.map((c) => (
                    <li key={c} className="flex gap-2.5 text-[13.5px] leading-6 text-navy-700">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-line pt-4 text-[12px] leading-5 text-navy-500">
                  {p.foot}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* covered vs not */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">The honest part</p>
            <h2 className="display-2 mt-2 text-ink">
              What&apos;s covered — and what isn&apos;t
            </h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              No warranty covers everything, and any dealer who implies otherwise
              is setting you up for a bad day. Here&apos;s both sides, side by
              side.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-3xl border border-line-strong bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold-600">
                  <IconCheck className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-lg font-bold text-ink">
                  Covered
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {COVERED.map((c) => (
                  <li key={c} className="flex gap-3 text-[14.5px] leading-6 text-navy-700">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={0.08}
              className="rounded-3xl border border-line-strong bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy/[0.06] text-navy-500">
                  <IconClose className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-lg font-bold text-ink">
                  Not covered
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {NOT_COVERED.map((c) => (
                  <li key={c} className="flex gap-3 text-[14.5px] leading-6 text-navy-600">
                    <IconClose className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FTC Buyers Guide */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-navy bg-white shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 bg-navy px-6 py-4 sm:px-8">
              <IconShield className="h-5 w-5 text-gold" />
              <h2 className="font-heading text-base font-bold uppercase tracking-wide text-white">
                Buyers Guide — FTC required disclosure
              </h2>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[14.5px] leading-7 text-navy-700">
                Federal law requires a{" "}
                <span className="font-semibold text-ink">Buyers Guide</span> in
                the window of every used car on the lot. It states — in plain
                type, not fine print — whether that specific vehicle is sold{" "}
                <span className="font-semibold text-ink">&ldquo;AS IS&rdquo;</span>{" "}
                or{" "}
                <span className="font-semibold text-ink">
                  &ldquo;WITH A WARRANTY,&rdquo;
                </span>{" "}
                and it lists what the warranty covers and for how long.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-mist/70 p-5">
                  <p className="font-heading text-sm font-bold text-ink">
                    If the box says &ldquo;AS IS&rdquo;
                  </p>
                  <p className="mt-1.5 text-[13px] leading-6 text-navy-600">
                    The dealer isn&apos;t promising any repairs. Once you drive
                    off, the cost of fixing anything is yours. We rarely sell
                    this way, and when we do we&apos;ll say so out loud.
                  </p>
                </div>
                <div className="rounded-2xl bg-gold/10 p-5">
                  <p className="font-heading text-sm font-bold text-ink">
                    If the box says &ldquo;WARRANTY&rdquo;
                  </p>
                  <p className="mt-1.5 text-[13px] leading-6 text-navy-600">
                    The Guide lists the covered systems, the duration, and the
                    dealer&apos;s share of parts and labor. Ours reads: powertrain,
                    3 months / 3,000 miles, 100% parts and 100% labor.
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-2 border-t border-line pt-5 text-[13px] leading-6 text-navy-600">
                <li className="flex gap-2.5">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  Ask for a copy of the Buyers Guide and the full warranty
                  document — you&apos;re entitled to both, and we hand them over
                  without being asked.
                </li>
                <li className="flex gap-2.5">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  Any promise a salesperson makes about a repair should be
                  written on the Guide or the sales contract. Spoken promises are
                  hard to enforce.
                </li>
                <li className="flex gap-2.5">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  The Buyers Guide becomes part of your sales contract and
                  overrides any conflicting language in it.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-red">FAQ</p>
            <h2 className="display-2 mt-2 text-ink">Warranty questions</h2>
            <p className="mt-4 text-[15px] leading-7 text-navy-600">
              The ones that come up at the desk. If yours isn&apos;t here, ask
              before you sign — we&apos;ll put the answer in writing.
            </p>
            <a
              href="tel:+19739286300"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-mist px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <IconWrench className="h-4 w-4 text-gold" />
              (973) 928-6300
            </a>
          </Reveal>

          <Reveal
            delay={0.05}
            className="overflow-hidden rounded-3xl bg-white ring-1 ring-line shadow-[var(--shadow-card)]"
          >
            <Accordion type="single" collapsible defaultValue="item-0">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* bottom CTA */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl bg-navy p-8 sm:p-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-gold">On every vehicle</p>
                <h2 className="display-3 mt-3 text-white">
                  Ask us what a specific car is covered for
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  Every listing shows its warranty status. Pick one you like and
                  we&apos;ll pull the exact terms and the extended-plan pricing
                  for that car — before you decide anything.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
                <Button asChild variant="gold" size="lg">
                  <Link href="/inventory">
                    Browse inventory
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy"
                >
                  <Link href="/contact">Ask a question</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
