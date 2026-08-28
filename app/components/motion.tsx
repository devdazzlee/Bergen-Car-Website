"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-72px" } as const;

// Pre-created motion components — never call motion() during render.
const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  figure: motion.figure,
  ul: motion.ul,
  li: motion.li,
  span: motion.span,
} as const;

type Tag = keyof typeof TAGS;

/**
 * Scroll-reveal wrapper. Server-rendered children pass straight through.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
}) {
  const Comp = TAGS[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Staggered container — children should be <StaggerItem>. */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.09,
  delayChildren = 0.05,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
  delayChildren?: number;
}) {
  const Comp = TAGS[as];
  return (
    <Comp
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const Comp = TAGS[as];
  return (
    <Comp className={className} variants={itemVariants}>
      {children}
    </Comp>
  );
}

export { motion, EASE, VIEWPORT };
