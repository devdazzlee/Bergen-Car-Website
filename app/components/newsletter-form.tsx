"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconArrowRight, IconCheck } from "./icons";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <div className="rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h3 className="font-heading text-lg font-bold text-white">
            New arrivals, before they hit the lot
          </h3>
          <p className="mt-1 text-[14px] text-white/55">
            A short email when cars matching popular searches come in. No spam,
            unsubscribe anytime.
          </p>
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
              className="flex w-full gap-2 lg:w-[380px]"
            >
              <input
                required
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                aria-label="Email address"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-gold/60"
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
