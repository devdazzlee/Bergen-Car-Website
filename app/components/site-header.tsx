"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  IconArrowRight,
  IconChevronDown,
  IconClock,
  IconClose,
  IconMenu,
  IconPhone,
  IconPin,
} from "./icons";
import { areasByRegion } from "../lib/service-areas";
import { CATEGORY_GROUPS } from "../lib/vehicle-categories";

type NavLink = { label: string; href: string; desc?: string };
type MegaGroup = { heading: string; links: { label: string; href: string }[] };
type Mega = {
  title: string;
  allHref: string;
  allLabel: string;
  groups: MegaGroup[];
};
type NavItem = {
  label: string;
  href?: string;
  children?: NavLink[];
  /** Renders a wide, grouped mega panel (Shop categories, Service Areas). */
  mega?: Mega;
};

const AREA_GROUPS = areasByRegion();
const AREA_COUNT = AREA_GROUPS.reduce((n, g) => n + g.areas.length, 0);

const AREAS_MEGA: Mega = {
  title: "Towns we serve",
  allHref: "/service-areas",
  allLabel: `All ${AREA_COUNT} towns`,
  groups: AREA_GROUPS.map((g) => ({
    heading: g.region,
    links: g.areas.map((a) => ({
      label: a.state === "NY" ? `${a.city}, NY` : a.city,
      href: `/service-areas/${a.slug}`,
    })),
  })),
};

const SHOP_MEGA: Mega = {
  title: "Shop by category",
  allHref: "/inventory",
  allLabel: "All inventory",
  groups: [
    {
      heading: "Browse",
      links: [
        { label: "All inventory", href: "/inventory" },
        { label: "This month's specials", href: "/specials" },
        { label: "Schedule a test drive", href: "/test-drive" },
      ],
    },
    ...CATEGORY_GROUPS.map((g) => ({
      heading: g.group,
      links: g.items.map((c) => ({ label: c.navLabel, href: c.permalink })),
    })),
  ],
};

const NAV: NavItem[] = [
  { label: "Shop", mega: SHOP_MEGA },
  {
    label: "Financing",
    children: [
      {
        label: "Get pre-qualified",
        href: "/financing",
        desc: "Soft check, no SSN to start",
      },
      {
        label: "Value your trade",
        href: "/trade",
        desc: "A real number, same day",
      },
      {
        label: "Sell your car",
        href: "/sell",
        desc: "We'll buy it outright — no purchase needed",
      },
      {
        label: "Warranty coverage",
        href: "/warranty",
        desc: "What's covered, in plain terms",
      },
    ],
  },
  { label: "Service", href: "/service" },
  { label: "Service Areas", mega: AREAS_MEGA },
  {
    label: "Resources",
    children: [
      {
        label: "Blog",
        href: "/blog",
        desc: "Buying, financing & maintenance guides",
      },
      { label: "Reviews", href: "/reviews", desc: "612 reviews, unedited" },
      {
        label: "FAQ",
        href: "/faq",
        desc: "The questions people really ask",
      },
    ],
  },
  {
    label: "About",
    children: [
      {
        label: "About us",
        href: "/about",
        desc: "The family on Route 46 since 2008",
      },
      {
        label: "Contact",
        href: "/contact",
        desc: "Call, text, email, or stop by",
      },
    ],
  },
];

const PHONE_DISPLAY = "(973) 555-0142";
const PHONE_HREF = "tel:+19735550142";
const EASE = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, item: NavItem): boolean {
  if (item.mega) {
    return item.mega.groups.some((g) =>
      g.links.some(
        (l) => pathname === l.href || pathname.startsWith(`${l.href}/`),
      ),
    );
  }
  if (item.href) return pathname === item.href;
  return (
    item.children?.some(
      (c) => pathname === c.href || pathname.startsWith(`${c.href}/`),
    ) ?? false
  );
}

export default function SiteHeader({
  solid: forceSolid = false,
}: {
  solid?: boolean;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Close every menu on navigation.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setOpen(false);
      setMenu(null);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 120);
  };

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
            <Link href="/test-drive" className="transition-colors hover:text-white">
              Book a test drive
            </Link>
            <span className="h-3 w-px bg-white/15" />
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

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item);

            if (item.mega) {
              const isOpen = menu === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hoverOpen(item.label)}
                  onMouseLeave={hoverClose}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setMenu(isOpen ? null : item.label)}
                    className={`group relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                      active || isOpen
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <IconChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-gold transition-transform duration-200 ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16, ease: EASE }}
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                      >
                        <div className="max-h-[72vh] w-[min(46rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-lift)]">
                          <div className="mb-3 flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy-400">
                              {item.mega.title}
                            </p>
                            <Link
                              href={item.mega.allHref}
                              className="text-[12px] font-semibold text-red hover:underline"
                            >
                              {item.mega.allLabel} &rarr;
                            </Link>
                          </div>
                          <div className="gap-x-6 [column-gap:1.5rem] sm:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
                            {item.mega.groups.map((g) => (
                              <div key={g.heading}>
                                <p className="mb-1.5 font-heading text-[12px] font-semibold text-ink">
                                  {g.heading}
                                </p>
                                <ul className="space-y-0.5">
                                  {g.links.map((l) => {
                                    const childActive = pathname === l.href;
                                    return (
                                      <li key={l.href}>
                                        <Link
                                          href={l.href}
                                          className={`block rounded-md px-1.5 py-1 text-[12.5px] transition-colors ${
                                            childActive
                                              ? "bg-mist font-semibold text-ink"
                                              : "text-navy-600 hover:bg-mist hover:text-ink"
                                          }`}
                                        >
                                          {l.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`group relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                    active ? "text-white" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-gold transition-transform duration-200 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            }

            const isOpen = menu === item.label;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hoverOpen(item.label)}
                onMouseLeave={hoverClose}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() =>
                    setMenu(isOpen ? null : item.label)
                  }
                  className={`group relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                    active || isOpen
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  <IconChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-gold transition-transform duration-200 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16, ease: EASE }}
                      className="absolute left-0 top-full pt-3"
                    >
                      <div className="w-[19rem] overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-[var(--shadow-lift)]">
                        {item.children.map((c) => {
                          const childActive =
                            pathname === c.href ||
                            pathname.startsWith(`${c.href}/`);
                          return (
                            <Link
                              key={c.href}
                              href={c.href}
                              className={`block rounded-xl px-3 py-2.5 transition-colors ${
                                childActive ? "bg-mist" : "hover:bg-mist"
                              }`}
                            >
                              <span className="flex items-center justify-between gap-2">
                                <span className="font-heading text-[13.5px] font-semibold text-ink">
                                  {c.label}
                                </span>
                                {childActive && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-red" />
                                )}
                              </span>
                              {c.desc && (
                                <span className="mt-0.5 block text-[12px] leading-5 text-navy-500">
                                  {c.desc}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white/90 transition-colors hover:text-white xl:inline-flex"
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
            className="inline-flex items-center justify-center rounded-full p-2 text-white hover:bg-white/10 lg:hidden"
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
            className="overflow-hidden border-t border-white/10 bg-navy/98 backdrop-blur-md lg:hidden"
          >
            <nav className="container-page max-h-[calc(100dvh-8rem)] overflow-y-auto py-4">
              {NAV.map((item) =>
                item.mega ? (
                  <details
                    key={item.label}
                    className="group border-b border-white/5 py-1"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3.5 text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <IconChevronDown className="h-4 w-4 text-white/60 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="pb-2 pl-3">
                      <Link
                        href={item.mega.allHref}
                        onClick={() => setOpen(false)}
                        className="mb-1 block rounded-xl px-3 py-2 text-[13px] font-semibold text-gold"
                      >
                        {item.mega.allLabel} &rarr;
                      </Link>
                      {item.mega.groups.map((g) => (
                        <div key={g.heading} className="mt-2">
                          <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white/40">
                            {g.heading}
                          </p>
                          <div className="flex flex-wrap gap-x-1 gap-y-0.5">
                            {g.links.map((l) => (
                              <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-1.5 text-[13px] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                              >
                                {l.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : item.children ? (
                  <details
                    key={item.label}
                    className="group border-b border-white/5 py-1"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3.5 text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <IconChevronDown className="h-4 w-4 text-white/60 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="pb-2 pl-3">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-xl px-3 py-3 text-[15px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {c.label}
                          {c.desc && (
                            <span className="mt-0.5 block text-[12px] text-white/45">
                              {c.desc}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/5 px-3 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ),
              )}

              <div className="mt-4 flex flex-col gap-3">
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
