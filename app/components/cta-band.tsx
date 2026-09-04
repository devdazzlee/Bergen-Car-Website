"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "./motion";
import {
  IconArrowRight,
  IconPhone,
  IconSearch,
  IconKey,
  IconSwap,
  IconWallet,
} from "./icons";

const ACTIONS = [
  { icon: IconSearch, label: "Browse inventory", href: "/inventory" },
  { icon: IconWallet, label: "Get pre-qualified", href: "/financing" },
  { icon: IconSwap, label: "Value your trade", href: "/trade" },
  { icon: IconKey, label: "Schedule a test drive", href: "/test-drive" },
];

export default function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=2000&q=65"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45" />
      </div>
      <div
        aria-hidden
        className="absolute -right-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-red/20 blur-3xl"
      />

      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-72px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow text-gold">Ready when you are</p>
          <h2 className="display-2 mt-4 text-balance text-white">
            Come find a car that works for your life
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
            Take a look at what&apos;s on the lot, get your financing sorted, or
            just stop by Route 46 for a test drive. No pressure — we mean that.
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
              href="tel:+19739286300"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <IconPhone className="h-4 w-4 text-gold" />
              (973) 928-6300
            </a>
          </div>
        </motion.div>

        <Stagger className="grid grid-cols-2 gap-3 sm:gap-4" stagger={0.08}>
          {ACTIONS.map(({ icon: Icon, label, href }) => (
            <StaggerItem key={label}>
              <a
                href={href}
                className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition-colors hover:bg-white/[0.12]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex items-center justify-between text-sm font-semibold text-white">
                  {label}
                  <IconArrowRight className="h-4 w-4 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-gold" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
