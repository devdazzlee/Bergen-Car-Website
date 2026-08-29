"use client";

import type { ReactNode } from "react";

/**
 * Edge-faded infinite marquee. Renders the children twice so the CSS
 * translateX(-50%) loop is seamless. Pauses on hover; freezes entirely under
 * prefers-reduced-motion (handled in globals.css).
 */
export function Marquee({
  children,
  slow = false,
  className = "",
}: {
  children: ReactNode;
  slow?: boolean;
  className?: string;
}) {
  return (
    <div className={`mask-fade-x group overflow-hidden ${className}`}>
      <div
        className={`flex w-max gap-3 ${
          slow ? "animate-marquee-slow" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        <div className="flex shrink-0 gap-3" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 gap-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
