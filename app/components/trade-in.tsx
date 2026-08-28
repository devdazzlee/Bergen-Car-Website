"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "./motion";
import { IconArrowRight, IconCheck } from "./icons";

const POINTS = [
  "Firm written offer in about 20 minutes",
  "Valid for 7 days — no obligation to buy",
  "We handle the payoff on your existing loan",
  "Applies straight to your next car, or take the check",
];

export default function TradeIn() {
  return (
    <section id="trade" className="scroll-mt-24 bg-navy py-20 text-white sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow text-gold">Trade-ins</p>
          <h2 className="display-2 mt-2 text-white">
            Your trade is worth more than a rushed guess
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-8 text-white/70">
            We appraise on current auction and retail data — not whatever gets
            you off the lot fastest. Bring the car, the keys, and the title if
            you have it.
          </p>

          <ul className="mt-6 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] text-white/85">
                <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:flex-row sm:items-center">
            <input
              aria-label="License plate or VIN"
              placeholder="Plate or VIN"
              className="w-full rounded-xl border border-white/15 bg-navy-700 px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-gold/60"
            />
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-300 active:scale-[0.98]"
            >
              Value my trade
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-72px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-white/10"
        >
          <Image
            src="https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?auto=format&fit=crop&w=1200&q=70"
            alt="A well-kept used car being appraised for trade-in at Bergen Car Company"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
