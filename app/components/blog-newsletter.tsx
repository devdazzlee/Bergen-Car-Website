"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconArrowRight, IconCheck, IconMail } from "./icons";
import { isApiError, subscribeNewsletter } from "../lib/api";

export default function BlogNewsletter({
  className = "",
}: {
  className?: string;
}) {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-navy p-7 text-white sm:p-9 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/12 blur-3xl"
      />
      <div className="relative">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/15 text-gold">
          <IconMail className="h-5 w-5" />
        </span>
        <h3 className="mt-4 font-heading text-xl font-bold">
          The once-a-month email
        </h3>
        <p className="mt-2 max-w-lg text-[14px] leading-7 text-white/65">
          About one email a month, and here&apos;s exactly what&apos;s in it: a
          new guide like this one, a short roundup of the week&apos;s price drops
          on the lot, and a seasonal maintenance reminder when it&apos;s useful.
          No daily blasts, we don&apos;t sell your address, and every email has a
          one-click unsubscribe.
        </p>

        <div className="mt-5">
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-3 text-sm font-semibold text-gold"
              >
                <IconCheck className="h-4 w-4" />
                You&apos;re on the list — first one comes at the start of the
                month.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const email = String(new FormData(form).get("email") ?? "");
                  setFormError(null);
                  setSubmitting(true);
                  try {
                    await subscribeNewsletter(email);
                    setDone(true);
                  } catch (err) {
                    setFormError(
                      isApiError(err)
                        ? err.message
                        : "Something went wrong. Please try again.",
                    );
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="flex w-full max-w-md flex-col gap-2"
              >
                {formError ? (
                  <p role="alert" className="text-[13px] font-medium text-gold">
                    {formError}
                  </p>
                ) : null}
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  aria-label="Email address"
                  className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-gold/60"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gold px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Sign up"}
                  <IconArrowRight className="h-4 w-4" />
                </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
