"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FAQS } from "../lib/faqs";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { IconArrowRight, IconChevronDown, IconPhone } from "./icons";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden bg-mist py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-4 top-2 select-none font-heading text-[13rem] font-bold leading-none text-cloud sm:text-[20rem]"
      >
        ?
      </div>

      <div className="container-page relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow text-red">FAQ</p>
            <h2 className="display-2 mt-2 text-ink">Questions, answered</h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              The short version is below. If your question isn&apos;t here, a
              real person in Lodi is happy to talk it through.
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            className="mt-8 rounded-3xl bg-navy p-6 text-white sm:p-7"
          >
            <p className="font-heading text-lg font-bold">
              Still have a question?
            </p>
            <p className="mt-2 text-[14px] leading-6 text-white/65">
              Call the showroom or send a note — we usually get back to you the
              same day during business hours.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="tel:+19735550142"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-300 active:scale-[0.98]"
              >
                <IconPhone className="h-4 w-4" />
                (973) 555-0142
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Send us a message
                <IconArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <Stagger
          className="h-max overflow-hidden rounded-3xl bg-white ring-1 ring-line shadow-[var(--shadow-card)]"
          stagger={0.05}
        >
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <StaggerItem
                key={item.q}
                className={`border-t border-line first:border-t-0 ${
                  isOpen ? "bg-mist/40" : ""
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="relative flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 h-full w-1 origin-top bg-red transition-transform duration-300 ${
                        isOpen ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <span
                      className={`font-heading text-[13px] font-bold tabular-nums ${
                        isOpen ? "text-red" : "text-navy-400"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-heading text-[15px] font-semibold text-ink sm:text-base">
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
                      <p className="pb-5 pl-14 pr-5 text-[15px] leading-7 text-navy-600 sm:pr-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
