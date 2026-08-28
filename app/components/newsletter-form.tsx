"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconArrowRight, IconCheck, IconMail } from "./icons";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-700 to-navy p-7 sm:p-9">
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red/15 blur-3xl"
      />

      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold">
            <IconMail className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              Tell us what you&apos;re looking for
            </h3>
            <p className="mt-1 max-w-md text-[14px] leading-6 text-white/55">
              We&apos;ll send a quick note when a car that fits comes in. No
              spam, and you can unsubscribe any time.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.p
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-3 text-sm font-semibold text-gold"
            >
              <IconCheck className="h-4 w-4" />
              You&apos;re on the list.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="flex w-full gap-2 lg:w-[400px]"
            >
              <input
                required
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                aria-label="Email address"
                className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-gold/60"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600 active:scale-[0.98]"
              >
                Notify me
                <IconArrowRight className="h-4 w-4" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
