"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { SectionHeading } from "../components/section-heading";
import { Marquee } from "../components/marquee";
import PageBanner from "../components/page-banner";
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

const MILESTONES = [
  {
    year: "2008",
    text: "Sal opens the lot in a rented two-bay garage on Route 46. Eleven cars sell that first year.",
  },
  {
    year: "2009",
    text: "The credit markets freeze and nobody can get a loan. A handful of repeat families and their referrals keep the lights on.",
  },
  {
    year: "2012",
    text: "The shop out back doubles in size. State inspections and any-make repair become a steady part of the business.",
  },
  {
    year: "2013",
    text: "Gina Ferrante joins full-time and takes over the sales floor and the day-to-day.",
  },
  {
    year: "2019",
    text: "The 7,000th car goes home — bought, like most of them, by someone who lives within ten miles of the lot.",
  },
  {
    year: "Today",
    text: "612 reviews at a 4.9 average, the same corner, and Sal still doing most of the appraisals himself.",
  },
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

const AVATAR = ["bg-navy", "bg-red", "bg-gold-600", "bg-navy-600", "bg-navy"];

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
  "Rutherford",
  "Fair Lawn",
];

export default function AboutClient() {
  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="About us"
        title="The people behind Bergen Car Company"
        description="A small, family-run used car lot on Route 46 in Lodi. Here's who we are, how we got here, and why we do a few things differently."
        image="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=2400&q=70"
        imageAlt="Used cars parked on the lot at Bergen Car Company in Lodi, New Jersey"
      />

      {/* our story */}
      <section className="py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <Reveal as="article">
            <p className="eyebrow flex items-center gap-2.5 text-red">
              <span className="h-px w-7 bg-red/60" aria-hidden />
              Our story
            </p>
            <h2 className="display-2 mt-3 text-ink">
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

      {/* timeline */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="How we got here"
            title="From a two-bay garage to the same corner, 18 years on"
          >
            The short version of a longer story. Same idea the whole way through.
          </SectionHeading>

          <div className="relative mt-14 max-w-3xl pl-8">
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute left-0 top-1.5 h-[calc(100%-0.75rem)] w-0.5 origin-top bg-gradient-to-b from-navy via-navy to-line-strong"
            />
            <ol className="space-y-9">
              {MILESTONES.map((m, i) => (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="relative"
                >
                  <span className="absolute -left-[2.35rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy ring-4 ring-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  <p className="font-heading text-sm font-bold tracking-wide text-red">
                    {m.year}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-7 text-navy-700">
                    {m.text}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="What we operate by"
            title="Four rules we don&apos;t bend"
          >
            Not a mission statement. Just the things we decided early on and have
            stuck to since.
          </SectionHeading>

          <Stagger
            className="mt-12 grid gap-6 sm:grid-cols-2"
            stagger={0.09}
          >
            {VALUES.map(({ icon: Icon, title, body }, i) => (
              <StaggerItem
                key={title}
                className="group relative flex gap-4 overflow-hidden rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
              >
                <span
                  aria-hidden
                  className="absolute right-5 top-3 font-heading text-4xl font-bold text-cloud transition-colors group-hover:text-gold/25"
                >
                  0{i + 1}
                </span>
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

      {/* manifesto */}
      <section className="bg-navy py-20 sm:py-28">
        <div className="container-page">
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mx-auto max-w-4xl text-center"
          >
            <span
              aria-hidden
              className="font-heading text-6xl leading-none text-gold/40"
            >
              &ldquo;
            </span>
            <p className="mt-2 font-heading text-2xl font-bold leading-snug tracking-tight text-white sm:text-4xl">
              We&apos;d rather lose a sale than earn a bad review.
            </p>
            <footer className="mt-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Sal Ferrante, 2008 — and still the rule
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* team */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="Meet the team"
            title="The whole company fits in one photo"
          >
            There are eleven of us. These are the people you&apos;ll actually deal
            with.
          </SectionHeading>

          <Stagger
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {TEAM.map((m, i) => (
              <StaggerItem
                key={m.name}
                className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-heading text-lg font-bold text-white ${
                      AVATAR[i % AVATAR.length]
                    }`}
                  >
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
            <p className="eyebrow flex items-center gap-2.5 text-gold">
              <span className="h-px w-7 bg-gold/60" aria-hidden />
              In the neighborhood
            </p>
            <h2 className="display-2 mt-3 text-white">
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

        <div className="mt-14">
          <Marquee slow>
            {TOWNS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[13px] font-medium text-white/75"
              >
                {t}
              </span>
            ))}
          </Marquee>
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
