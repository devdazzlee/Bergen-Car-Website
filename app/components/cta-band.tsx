"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IconArrowRight, IconPhone } from "./icons";

export default function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=2000&q=65"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-72px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="container-page max-w-3xl"
      >
        <p className="eyebrow text-gold">Ready when you are</p>
        <h2 className="display-1 mt-4 text-white">
          Let&apos;s get you into the right car
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
          Browse the inventory, lock in your rate, or just come by the Lodi
          showroom for a test drive. No pressure — that&apos;s the whole point.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#inventory"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_38px_-14px_rgba(225,29,46,0.9)] transition-transform duration-150 hover:bg-red-600 active:scale-[0.98]"
          >
            Browse inventory
            <IconArrowRight className="h-4 w-4" />
          </a>
          <a
            href="tel:+19735550142"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            <IconPhone className="h-4 w-4 text-gold" />
            (973) 555-0142
          </a>
        </div>
      </motion.div>
    </section>
  );
}
