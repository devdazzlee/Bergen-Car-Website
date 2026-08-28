"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FAQS } from "../lib/faqs";
import { Reveal } from "./motion";
import { IconChevronDown } from "./icons";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-mist py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow text-red">FAQ</p>
          <h2 className="display-2 mt-2 text-ink">Questions, answered</h2>
          <p className="mt-4 text-lg leading-8 text-navy-600">
            Still not sure about something? Call{" "}
            <a
              href="tel:+19735550142"
              className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-2"
            >
              (973) 555-0142
            </a>{" "}
            or send a note below — a real person in Lodi will get back to you the
            same day.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="font-heading text-[15px] font-semibold text-ink sm:text-base">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        isOpen ? "bg-red text-white" : "bg-mist text-navy-600"
                      }`}
                    >
                      <IconChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[15px] leading-7 text-navy-600 sm:px-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
