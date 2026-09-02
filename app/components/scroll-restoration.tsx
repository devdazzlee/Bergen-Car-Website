"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/** Scroll window to top on every client-side route change. */
function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * Prevents mobile browsers from restoring the previous page's scroll position
 * when navigating (e.g. opening a category page at the bottom after scrolling
 * the homepage). Runs before paint so the new page does not flash mid-scroll.
 */
export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}
