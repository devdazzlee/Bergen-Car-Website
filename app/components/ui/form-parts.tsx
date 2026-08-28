"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Label } from "./label";
import { IconCheck } from "../icons";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const ringFor = (touched: boolean, error?: string) =>
  touched && error ? "border-gold/70 ring-2 ring-gold/15" : "";

/** Labelled form row with gentle (never jarring) validation feedback. */
export function Field({
  id,
  label,
  hint,
  error,
  touched,
  filled,
  showCheck = true,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  touched: boolean;
  filled: boolean;
  showCheck?: boolean;
  children: ReactNode;
}) {
  const showError = touched && !!error;
  const showOk = showCheck && touched && !error && filled;
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {children}
        {showOk && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="pointer-events-none absolute right-3 top-3.5 text-gold-600"
          >
            <IconCheck className="h-4 w-4" />
          </motion.span>
        )}
      </div>
      {showError ? (
        <motion.p
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="flex items-center gap-1.5 text-[12px] italic text-navy-500"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
          {error}
        </motion.p>
      ) : hint ? (
        <p className="text-[12px] leading-5 text-navy-500">{hint}</p>
      ) : null}
    </div>
  );
}

/** Compact numbered "how it works" strip used at the top of the form pages. */
export function StepStrip({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className={`absolute left-6 right-6 top-5 hidden h-px bg-line ${
          steps.length === 3 ? "sm:block" : "lg:block"
        }`}
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className={`grid gap-4 ${
          steps.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: EASE },
              },
            }}
            className="relative flex gap-3 rounded-2xl border border-line bg-white p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-sm font-bold text-gold ring-4 ring-mist">
              {i + 1}
            </span>
            <div>
              <p className="font-heading text-[14px] font-semibold text-ink">
                {s.title}
              </p>
              <p className="mt-0.5 text-[12.5px] leading-5 text-navy-600">
                {s.body}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
