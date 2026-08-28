"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./motion";
import {
  IconSearch,
  IconWallet,
  IconKey,
  IconCheck,
  IconArrowRight,
} from "./icons";

const STEPS = [
  {
    icon: IconSearch,
    title: "Find it",
    body: "Use the search to sort by year, make, model, and budget. Every car shows its price and its inspection report right up front.",
  },
  {
    icon: IconWallet,
    title: "Know your budget",
    body: "Get pre-qualified in a couple of minutes with a soft credit check. You'll see what your payment looks like before you decide anything.",
  },
  {
    icon: IconKey,
    title: "Come take a look",
    body: "Stop by for a test drive whenever it's convenient. Bring your current car and we'll look at it while you're here.",
  },
  {
    icon: IconCheck,
    title: "Done in one visit",
    body: "We have the paperwork ready before you arrive. Most folks are done and driving home the same afternoon.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-mist py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-red">How it works</p>
          <h2 className="display-2 mt-2 text-ink">Buying a car here is simple</h2>
          <p className="mt-4 text-lg leading-8 text-navy-600">
            No games and no pressure. Here&apos;s how it usually goes.
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* connecting rail (desktop) */}
          <div
            aria-hidden
            className="absolute inset-x-7 top-7 hidden h-0.5 bg-line lg:block"
          />
          <motion.div
            aria-hidden
            className="absolute inset-x-7 top-7 hidden h-0.5 origin-left rounded-full bg-gradient-to-r from-red to-gold lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <Stagger
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.14}
          >
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <StaggerItem key={title} className="relative flex flex-col">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-navy font-heading text-lg font-bold text-gold ring-4 ring-mist">
                  {i + 1}
                </div>
                <div className="mt-5 flex-1 rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                  <Icon className="h-6 w-6 text-red" />
                  <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-navy-600">
                    {body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal
          delay={0.1}
          className="mt-12 flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:px-7"
        >
          <p className="text-[15px] font-medium text-navy-700">
            Every step here can start from your phone.
          </p>
          <a
            href="#inventory"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98] sm:ml-auto"
          >
            Browse the inventory
            <IconArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
