"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/**
 * Jump to the top instantly, bypassing the global `scroll-behavior: smooth`.
 * A smooth scroll here would animate while framer-motion reveals and images
 * change the page height, so it could be interrupted and leave the user
 * partway down the page (e.g. on the bottom CTA).
 */
function scrollToTop() {
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = prev;
}

/**
 * Resets scroll to the top on every client-side route change so pages never
 * open partway down (a common mobile SPA issue where the previous scroll
 * position carries over to the next page).
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
    // Second pass after paint in case late layout shifts (image loads,
    // reveal animations) nudged the scroll position.
    const id = requestAnimationFrame(scrollToTop);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
