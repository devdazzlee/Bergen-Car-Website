"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Label } from "./label";
import { Reveal } from "../motion";
import { IconCheck } from "../icons";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Premium two-panel form card. Navy rail carries the "how it works" steps and a
 * trust line; the form itself lives in a clean white column beside it.
 */
export function FormShell({
  asideTitle,
  steps,
  formTitle,
  formNote,
  footNote,
  children,
}: {
  asideTitle: string;
  steps: { title: string; body: string }[];
  formTitle: string;
  formNote?: ReactNode;
  footNote?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-widget)] ring-1 ring-line-strong">
      <div className="grid lg:grid-cols-[19.5rem_1fr] xl:grid-cols-[21.5rem_1fr]">
        <aside className="relative overflow-hidden bg-navy px-6 py-8 text-white sm:px-8 sm:py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 rounded-full bg-gold/12 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:20px_20px]"
          />
          <p className="relative text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
            {asideTitle}
          </p>
          <ol className="relative mt-7 space-y-7">
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-4">
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[15px] top-9 h-[calc(100%+0.75rem)] w-px bg-white/12"
                  />
                )}
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 font-heading text-[13px] font-bold text-gold ring-1 ring-white/15">
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <p className="text-[14px] font-semibold leading-snug">
                    {s.title}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-6 text-white/55">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {footNote ? (
            <p className="relative mt-8 border-t border-white/10 pt-5 text-[12px] leading-5 text-white/50">
              {footNote}
            </p>
          ) : null}
        </aside>

        <div className="px-6 py-8 sm:px-9 sm:py-10">
          <h2 className="font-heading text-xl font-bold text-ink">{formTitle}</h2>
          {formNote ? (
            <p className="mt-1.5 text-[14px] leading-6 text-navy-600">
              {formNote}
            </p>
          ) : null}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </Reveal>
  );
}

/** Labelled section divider inside a long form. */
export function FieldGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-400">
        {title}
        <span className="h-px flex-1 bg-line-strong" />
      </p>
      {children}
    </div>
  );
}

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
