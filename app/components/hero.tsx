"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { IconArrowRight } from "./icons";
import AutosalesReviewsBadgeSlot from "./autosalesreviews-badge-slot";
import type { DealerRating } from "../lib/dealer-rating";
import { FEATURED_SPECIALTIES } from "../lib/vehicle-categories";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({
  rating = null,
}: {
  rating?: DealerRating | null;
}) {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy">
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=2400&q=70"
            alt="A clean, well-kept used SUV parked outside Bergen Car Company in Lodi, New Jersey"
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-page flex min-h-[68svh] flex-col justify-center pt-28 pb-32 sm:pb-36 lg:min-h-[76svh] lg:pb-40"
      >
        <div className="max-w-2xl">
          <motion.p
            variants={item}
            className="eyebrow flex items-center gap-2 text-gold"
          >
            <span className="h-px w-8 bg-gold/70" />
            Family-owned in Lodi, New Jersey
          </motion.p>
          <motion.h1 variants={item} className="display-1 mt-5 text-white">
            Dependable used cars
            <br />
            from a family you can trust.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-8 text-white/75"
          >
            Fair prices on the window, financing we walk you through, and a
            3-month / 3,000-mile warranty on every car. We specialize in work
            vans, police cars, and handicap-accessible vehicles — and still
            stock the sedans, SUVs, and trucks people drive every day.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <a
              href="#inventory"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_38px_-14px_rgba(225,29,46,0.9)] transition-colors hover:bg-red-600 active:scale-[0.98]"
            >
              Browse inventory
              <IconArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/financing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Get pre-qualified
            </Link>
            <Link
              href="/warranty"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              What&apos;s covered
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap gap-2"
          >
            {FEATURED_SPECIALTIES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                {s.label}
              </Link>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
              <span>No hidden fees</span>
              <span className="hidden h-3.5 w-px bg-white/25 sm:block" />
              <span>Financing available</span>
              <span className="hidden h-3.5 w-px bg-white/25 sm:block" />
              <span>Warranty on every car</span>
            </div>
            <AutosalesReviewsBadgeSlot variant="dark" rating={rating} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
