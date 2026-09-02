"use client";

import { MotionConfig } from "framer-motion";
import ScrollRestoration from "./components/scroll-restoration";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      <ScrollRestoration />
      {children}
    </MotionConfig>
  );
}
