"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Polished, reusable section header — animated accent rule + kicker + display
 * title + optional lede. Replaces the repeated eyebrow/h2/p block so every
 * page's section intros look consistent and a bit more considered.
 */
export function SectionHeading({
  kicker,
  title,
  children,
  align = "left",
  tone = "light",
  className = "",
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const kickerColor = tone === "dark" ? "text-gold" : "text-red";
  const ruleColor = tone === "dark" ? "bg-gold/60" : "bg-red/60";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const bodyColor = tone === "dark" ? "text-white/70" : "text-navy-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <p
        className={`eyebrow flex items-center gap-2.5 ${kickerColor} ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className={`h-px w-7 ${ruleColor}`} aria-hidden />
        {kicker}
      </p>
      <h2 className={`display-2 mt-3 ${titleColor}`}>{title}</h2>
      {children ? (
        <p className={`mt-4 text-lg leading-8 ${bodyColor}`}>{children}</p>
      ) : null}
    </motion.div>
  );
}
