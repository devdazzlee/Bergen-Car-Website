"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `value` once, the first time it scrolls into view.
 * `prefix`/`suffix` wrap the formatted integer.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  const shouldAnimate = inView && !reduced;

  useEffect(() => {
    if (!shouldAnimate) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [shouldAnimate, value, duration]);

  const shown = reduced ? value : inView ? display : 0;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(shown).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
