"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconClose, IconMenu, IconPhone } from "./icons";

const NAV = [
  { label: "Inventory", href: "#inventory" },
  { label: "Financing", href: "#financing" },
  { label: "Trade-in", href: "#trade" },
  { label: "Service", href: "#service" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const PHONE_DISPLAY = "(973) 555-0142";
const PHONE_HREF = "tel:+19735550142";

export default function SiteHeader() {
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-navy/95 backdrop-blur-md border-b border-white/10"
          : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Link
          href="#top"
          className="flex items-center gap-3 shrink-0"
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

        <nav className="hidden xl:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PHONE_HREF}
            className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white/90 transition-colors hover:text-white"
          >
            <IconPhone className="h-4 w-4 text-gold" />
            {PHONE_DISPLAY}
          </a>
          <a
            href="#inventory"
            className="hidden sm:inline-flex items-center rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(225,29,46,0.9)] transition-transform duration-150 hover:bg-red-600 active:scale-[0.97]"
          >
            Browse Inventory
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex xl:hidden items-center justify-center rounded-full p-2 text-white hover:bg-white/10"
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

      {/* Mobile panel */}
      {open && (
        <div className="xl:hidden animate-fade border-t border-white/10 bg-navy/98 backdrop-blur-md">
          <nav className="container-page flex flex-col py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3.5 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white"
              >
                <IconPhone className="h-4 w-4 text-gold" />
                {PHONE_DISPLAY}
              </a>
              <a
                href="#inventory"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-red px-5 py-3.5 text-sm font-semibold text-white active:scale-[0.98]"
              >
                Browse Inventory
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
