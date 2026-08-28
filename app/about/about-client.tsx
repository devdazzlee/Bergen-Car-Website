"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { Button } from "../components/ui/button";
import CountUp from "../components/count-up";
import {
  IconArrowRight,
  IconGauge,
  IconPin,
  IconShield,
  IconStar,
  IconWallet,
  IconWrench,
} from "../components/icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const LOT_IMG =
  "https://images.pexels.com/photos/29566906/pexels-photo-29566906.jpeg?auto=compress&cs=tinysrgb&w=1400";
const MAPS =
  "https://www.google.com/maps/dir/?api=1&destination=Lodi,+New+Jersey";

const STORY = [
  "Bergen Car Company started in 2008, in a two-bay garage off Route 46 that Sal Ferrante had been renting on the side to do brake jobs and state inspections. Sal spent nineteen years as a service manager at a big franchise store down the highway, and he left for one reason: he was tired of watching good customers get talked into work they didn't need, and tired of being the guy who had to sign off on it.",
  "The plan was almost too simple for a car lot. Buy decent used cars. Fix what actually needs fixing. Put a fair price on the window and leave it there. Tell people the truth about what they're looking at, even when the truth costs us the sale.",
  "The first year was rough. We sold eleven cars in 2008 and nearly closed in 2009, when the credit markets froze and nobody could get a loan. What kept the doors open was a handful of families who came back a second and third time and sent their neighbors. That's still how most of our business walks in — someone's cousin, someone's coworker, someone whose dad bought a truck here in 2012.",
  "Sal still comes in most mornings and still does a lot of the appraisals himself. His daughter Gina runs the place day to day now. The shop out back is the same shop from 2008, just bigger, and the same idea still runs it: we'd rather lose a sale than earn a bad review.",
  "We're not the cheapest lot in the county on every car, and we won't pretend to be. What we try to be is the one you don't have to keep your guard up at.",
];

const VALUES = [
  {
    icon: IconShield,
    title: "No pressure, ever",
    body: "Nobody here is on a commission-only plan, so nobody's rent depends on you buying today. Need a week to think it over? Take two.",
  },
  {
    icon: IconWallet,
    title: "The price is the price",
    body: "What's on the window is what you pay. New Jersey tax, title, registration, and one $499 documentary fee — that's the entire list, and we'll show it to you before you sit down.",
  },
  {
    icon: IconGauge,
    title: "A real inspection first",
    body: "Every car goes up on a lift and through a full mechanical and safety check by our own techs before it's ever listed. You get the report and a free history report with the car.",
  },
  {
    icon: IconWrench,
    title: "We're here after the sale",
    body: "The same shop that inspected your car can look after it for as long as you own it — any make, at fair independent-shop rates, not dealer markup.",
  },
];

const TEAM = [
  {
    initials: "SF",
    name: "Sal Ferrante",
    role: "Founder & lead appraiser",
    bio: "Started the company in 2008 after nineteen years as a franchise service manager. Still values most of the trade-ins himself. Ask him about anything with a manual transmission.",
  },
  {
    initials: "GF",
    name: "Gina Ferrante",
    role: "General manager",
    bio: "Sal's daughter, here since 2013. Runs the floor, handles the situations nobody else wants to, and will remember your kids' names the next time you're in.",
  },
  {
    initials: "MB",
    name: "Marcus Bell",
    role: "Sales",
    bio: "Twelve years selling cars, the last six here because he was done chasing quotas. Will happily tell you a car on our own lot isn't the right one for you.",
  },
  {
    initials: "DA",
    name: "Denise Alvarez",
    role: "Financing",
    bio: "Works the phones with our lenders every day. Specializes in first-time buyers and folks rebuilding credit, and will explain every number twice if you want her to.",
  },
  {
    initials: "RO",
    name: "Rich Okafor",
    role: "Shop foreman",
    bio: "ASE master technician who runs the inspection bay. If Rich won't put his name on a car, that car doesn't go on the lot. Simple as that.",
  },
];

const STATS = [
  { value: 18, suffix: "", label: "years on Route 46" },
  { value: 7400, suffix: "+", label: "cars sold to neighbors" },
  { value: 612, suffix: "", label: "reviews, 4.9 average" },
];

const TOWNS = [
  "Lodi",
  "Hackensack",
  "Garfield",
  "Clifton",
  "Saddle Brook",
  "Passaic",
  "Wallington",
  "Elmwood Park",
  "Rochelle Park",
  "Maywood",
];

export default function AboutClient() {
  return (
    <div className="bg-mist">
      {/* header */}
      <section className="relative overflow-hidden bg-navy pb-16 pt-32 sm:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div
          aria-hidden
          className="absolute -left-24 top-6 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        />
        <div className="container-page relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="eyebrow text-gold">About us</p>
            <h1 className="display-1 mt-3 text-white">
              The people behind Bergen Car Company
            </h1>
            <p className="mt-4 text-lg leading-8 text-white/70">
              A small, family-run used car lot on Route 46 in Lodi. Here&apos;s
              who we are, how we got here, and why we do a few things
              differently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* our story */}
      <section className="py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <Reveal as="article">
            <p className="eyebrow text-red">Our story</p>
            <h2 className="display-2 mt-2 text-ink">
              It started with a guy who&apos;d had enough
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-navy-700">
              {STORY.map((p, i) => (
                <p
                  key={p.slice(0, 24)}
                  className={
                    i === 0
                      ? "border-l-2 border-red pl-5 text-lg leading-8 text-ink"
                      : undefined
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-6 border-t border-line pt-5 font-heading text-[15px] font-medium italic text-navy-700">
              — Sal &amp; Gina Ferrante, and the crew on Route 46
            </p>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-72px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-line shadow-[var(--shadow-lift)]">
              <Image
                src={LOT_IMG}
                alt="A row of used cars on the Bergen Car Company lot on Route 46 in Lodi, New Jersey"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 backdrop-blur">
                <p className="font-heading text-sm font-bold text-ink">
                  412 Route 46, Lodi
                </p>
                <p className="mt-0.5 text-[13px] text-navy-600">
                  Same corner since 2008. Come kick the tires.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* values */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">What we operate by</p>
            <h2 className="display-2 mt-2 text-ink">
              Four rules we don&apos;t bend
            </h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              Not a mission statement. Just the things we decided early on and
              have stuck to since.
            </p>
          </Reveal>

          <Stagger
            className="mt-12 grid gap-6 sm:grid-cols-2"
            stagger={0.09}
          >
            {VALUES.map(({ icon: Icon, title, body }) => (
              <StaggerItem
                key={title}
                className="flex gap-4 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-7 text-navy-600">
                    {body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* team */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">Meet the team</p>
            <h2 className="display-2 mt-2 text-ink">
              The whole company fits in one photo
            </h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              There are eleven of us. These are the people you&apos;ll actually
              deal with.
            </p>
          </Reveal>

          <Stagger
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {TEAM.map((m) => (
              <StaggerItem
                key={m.name}
                className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy font-heading text-lg font-bold text-gold">
                    {m.initials}
                  </span>
                  <div>
                    <p className="font-heading text-[17px] font-semibold text-ink">
                      {m.name}
                    </p>
                    <p className="text-[13px] font-semibold uppercase tracking-wide text-red">
                      {m.role}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-[14px] leading-7 text-navy-600">
                  {m.bio}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* community */}
      <section className="bg-navy py-20 text-white sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-gold">In the neighborhood</p>
            <h2 className="display-2 mt-2 text-white">
              A Bergen County business, start to finish
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-white/75">
              <p>
                We&apos;ve been on the same stretch of Route 46 since 2008. Most
                of our customers live within about ten miles of the lot, and a
                good number of the cars we sell were bought back from families we
                sold them to years earlier.
              </p>
              <p>
                We sponsor the Lodi youth baseball league, we&apos;re set up at
                the street fair every September, and if you&apos;ve had a car
                inspected in this town there&apos;s a decent chance it rolled
                through our shop. That local history is the whole reason a
                stranger can walk in and trust us with a big purchase — plenty of
                people in the area already have.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {TOWNS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[13px] font-medium text-white/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Stagger
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1"
            stagger={0.1}
          >
            {STATS.map((s) => (
              <StaggerItem
                key={s.label}
                className="rounded-2xl border-l-2 border-gold/70 bg-white/5 p-5"
              >
                <p className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {s.label.includes("reviews") ? (
                    <span className="inline-flex items-center gap-1">
                      <CountUp value={s.value} />
                      <IconStar className="h-6 w-6 text-gold" />
                    </span>
                  ) : (
                    <CountUp value={s.value} suffix={s.suffix} />
                  )}
                </p>
                <p className="mt-1 text-[13px] text-white/60">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* bottom CTA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl bg-mist p-8 sm:p-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <h2 className="display-3 text-ink">
                  Come see the lot for yourself
                </h2>
                <p className="mt-2 flex items-center gap-1.5 text-[15px] leading-7 text-navy-600">
                  <IconPin className="h-4 w-4 shrink-0 text-red" />
                  412 Route 46, Lodi, NJ — open Monday through Saturday. No
                  appointment needed.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
                <Button asChild variant="outline">
                  <a href={MAPS} target="_blank" rel="noopener noreferrer">
                    Get directions
                  </a>
                </Button>
                <Button asChild variant="primary">
                  <Link href="/inventory">
                    Browse inventory
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
