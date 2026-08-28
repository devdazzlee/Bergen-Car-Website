"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  IconArrowRight,
  IconClock,
  IconClose,
  IconMenu,
  IconPhone,
  IconPin,
} from "./icons";

const NAV = [
  { label: "Inventory", href: "/inventory" },
  { label: "Specials", href: "/specials" },
  { label: "Financing", href: "/financing" },
  { label: "Trade-in", href: "/trade" },
  { label: "Service", href: "/service" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const PHONE_DISPLAY = "(973) 555-0142";
const PHONE_HREF = "tel:+19735550142";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function SiteHeader({ solid: forceSolid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = forceSolid || scrolled || open;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-navy/95 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md"
          : "bg-gradient-to-b from-ink/75 to-transparent"
      }`}
    >
      {/* utility strip */}
      <motion.div
        animate={{ height: scrolled ? 0 : "auto", opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="hidden overflow-hidden border-b border-white/10 sm:block"
      >
        <div className="container-page flex h-9 items-center justify-between text-[12px] text-white/60">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <IconClock className="h-3.5 w-3.5 text-gold" />
              Mon–Fri 9–8 · Sat 9–6
            </span>
            <span className="hidden items-center gap-1.5 md:inline-flex">
              <IconPin className="h-3.5 w-3.5 text-gold" />
              412 Route 46, Lodi, NJ
            </span>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            <Link href="/trade" className="transition-colors hover:text-white">
              Value your trade
            </Link>
            <span className="h-3 w-px bg-white/15" />
            <Link href="/financing" className="transition-colors hover:text-white">
              Get pre-qualified
            </Link>
          </div>
        </div>
      </motion.div>

      {/* main bar */}
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="Bergen Car Company — home"
        >
          <Image
            src="/bergen-logo.png"
            alt="Bergen Car Company"
            width={514}
            height={133}
            loading="eager"
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-3.5 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.label}
              <span
                aria-hidden
                className="absolute inset-x-3.5 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-gold transition-transform duration-200 group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white/90 transition-colors hover:text-white md:inline-flex"
          >
            <IconPhone className="h-4 w-4 text-gold" />
            {PHONE_DISPLAY}
          </a>
          <Link
            href="/inventory"
            className="hidden items-center gap-1.5 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(225,29,46,0.9)] transition-all duration-150 hover:bg-red-600 hover:shadow-[0_14px_30px_-10px_rgba(225,29,46,1)] active:scale-[0.97] sm:inline-flex"
          >
            Browse Inventory
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-full p-2 text-white hover:bg-white/10 xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <IconClose className="h-6 w-6" />
            ) : (
              <IconMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-white/10 bg-navy/98 backdrop-blur-md xl:hidden"
          >
            <nav className="container-page flex flex-col py-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3.5 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-3">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white"
                >
                  <IconPhone className="h-4 w-4 text-gold" />
                  {PHONE_DISPLAY}
                </a>
                <Link
                  href="/inventory"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-red px-5 py-3.5 text-sm font-semibold text-white active:scale-[0.98]"
                >
                  Browse Inventory
                </Link>
              </div>
              <p className="mt-4 flex items-center gap-2 px-3 text-[12px] text-white/45">
                <IconClock className="h-3.5 w-3.5 text-gold" />
                Mon–Fri 9–8 · Sat 9–6 · Sun 11–4
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
