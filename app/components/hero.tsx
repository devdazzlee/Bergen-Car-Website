"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { IconStar } from "./icons";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
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
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=2400&q=70"
            alt="Detailed used car parked at Bergen Car Company in Lodi, New Jersey"
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-page flex min-h-[86svh] flex-col justify-center pt-32 pb-40 sm:pb-48 lg:min-h-[92svh]"
      >
        <div className="max-w-2xl">
          <motion.p
            variants={item}
            className="eyebrow flex items-center gap-2 text-gold"
          >
            <span className="h-px w-8 bg-gold/70" />
            Lodi, New Jersey
          </motion.p>
          <motion.h1 variants={item} className="display-1 mt-5 text-white">
            The used car search
            <br />
            that respects your time.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-8 text-white/75"
          >
            Every vehicle inspected, priced up front, and ready to drive home.
            Start with the search below.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-4 w-4" />
                ))}
              </span>
              4.9 / 5 · 600+ reviews
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>18 years in Bergen County</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>7,400+ cars delivered</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
