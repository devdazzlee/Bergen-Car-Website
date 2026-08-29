"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type ReactNode, type SVGProps } from "react";
import { Reveal, Stagger, StaggerItem, EASE } from "../components/motion";
import PageBanner from "../components/page-banner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  BLUNT,
  FAQS,
  FAQ_CATEGORIES,
  type FaqCategory,
} from "../lib/faq-page";
import {
  IconArrowRight,
  IconChat,
  IconClose,
  IconKey,
  IconPhone,
  IconSearch,
  IconShield,
  IconSwap,
  IconWallet,
  IconWrench,
} from "../components/icons";

type Tab = "All" | FaqCategory;

const TAB_ICON: Record<Tab, (p: SVGProps<SVGSVGElement>) => ReactNode> = {
  All: IconChat,
  Buying: IconKey,
  Financing: IconWallet,
  "Trade-in": IconSwap,
  Service: IconWrench,
  Warranty: IconShield,
};

const BLURB: Record<Tab, string> = {
  All: "Everything buyers ask us, in one place.",
  Buying: "Test drives, holds, inspections, and how a sale actually goes.",
  Financing: "Credit checks, approvals, rates, and what to bring.",
  "Trade-in": "How we value your car and what happens if you're upside down.",
  Service: "Using our shop, estimates, and the no-upsell promise.",
  Warranty: "What the included coverage does, and where it stops.",
};

function highlight(text: string, q: string): ReactNode {
  const query = q.trim();
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-gold/30 px-0.5 text-ink">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function FaqClient() {
  const [tab, setTab] = useState<Tab>("All");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const counts = useMemo(() => {
    const map: Record<Tab, number> = {
      All: FAQS.length,
      Buying: 0,
      Financing: 0,
      "Trade-in": 0,
      Service: 0,
      Warranty: 0,
    };
    for (const f of FAQS) map[f.category] += 1;
    return map;
  }, []);

  const results = useMemo(
    () =>
      FAQS.filter((f) => {
        if (tab !== "All" && f.category !== tab) return false;
        if (!q) return true;
        return (
          f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
        );
      }),
    [tab, q],
  );

  const totalMatches = useMemo(() => {
    if (!q) return FAQS.length;
    return FAQS.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
    ).length;
  }, [q]);

  const listKey = `${tab}-${q}`;

  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="FAQ"
        title="Common questions"
        description={
          <p>
            The honest answers to what people ask before they drive to Lodi —
            about price, credit, trade values, our shop, and the warranty. If
            yours isn&apos;t here, call the showroom and ask a person.
          </p>
        }
        image="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=2400"
        imageAlt="A technician inspecting a car engine with a work light at Bergen Car Company"
      >
        <div className="flex flex-wrap gap-2 text-[12px] font-semibold text-white/80">
          {(["All", ...FAQ_CATEGORIES] as Tab[]).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5"
            >
              {t === "All" ? "All topics" : t}
            </span>
          ))}
        </div>
      </PageBanner>

      {/* The blunt questions */}
      <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:radial-gradient(circle,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div className="container-page relative">
          <Reveal className="max-w-2xl">
            <p className="eyebrow flex items-center gap-2 text-gold">
              <span className="h-px w-8 bg-gold/70" />
              No dancing around it
            </p>
            <h2 className="display-3 mt-4 text-white">
              The questions people are really asking
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-white/70">
              Every car lot gets asked these four. Here&apos;s where we stand —
              plainly, before you ask.
            </p>
          </Reveal>

          <Stagger
            className="mt-10 grid gap-4 sm:grid-cols-2"
            stagger={0.08}
          >
            {BLUNT.map((b, i) => (
              <StaggerItem
                key={b.q}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                <span
                  aria-hidden
                  className="font-heading text-[13px] font-bold tabular-nums text-gold"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold text-white">
                  {b.q}
                </h3>
                <p className="mt-2.5 text-[14px] leading-7 text-white/70">
                  {b.a}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Search + tabs + accordion */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-red">Browse by topic</p>
            <h2 className="display-2 mt-2 text-ink">Find your question</h2>
            <p className="mt-3 text-[15px] leading-7 text-navy-600">
              Search a keyword, or pick a topic. One answer opens at a time.
            </p>
          </Reveal>

          {/* search */}
          <Reveal delay={0.05} className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “negotiate”, “credit”, “return”, “inspection”…"
                aria-label="Search frequently asked questions"
                className="h-12 rounded-full pl-11 pr-11"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-mist text-navy-600 transition-colors hover:bg-line-strong"
                >
                  <IconClose className="h-4 w-4" />
                </button>
              )}
            </div>
            <AnimatePresence>
              {query && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-3 text-center text-[13px] text-navy-500"
                >
                  {totalMatches === 0
                    ? "No questions match that wording."
                    : `${totalMatches} question${totalMatches === 1 ? "" : "s"} across all topics${
                        tab !== "All" ? ` · ${results.length} in ${tab}` : ""
                      }`}
                </motion.p>
              )}
            </AnimatePresence>
          </Reveal>

          {/* tabs */}
          <Reveal delay={0.1} className="mt-8">
            <Tabs
              value={tab}
              onValueChange={(v) => setTab(v as Tab)}
              className="mx-auto w-fit max-w-full"
            >
              <TabsList className="justify-start p-1.5 sm:justify-center">
                {(["All", ...FAQ_CATEGORIES] as Tab[]).map((t) => {
                  const Icon = TAB_ICON[t];
                  return (
                    <TabsTrigger key={t} value={t} className="px-3.5 py-2">
                      <Icon className="h-3.5 w-3.5" />
                      {t === "All" ? "All" : t}
                      <span className="ml-0.5 rounded-full bg-mist px-1.5 text-[11px] tabular-nums text-navy-500 transition-colors group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white">
                        {counts[t]}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </Reveal>

          {/* list */}
          <div className="mx-auto mt-8 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={listKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {results.length > 0 ? (
                  <div className="flex items-center justify-between gap-4 px-1 pb-3">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-navy-400">
                      {tab === "All" ? "All topics" : tab}
                    </p>
                    <p className="text-[13px] text-navy-500">
                      {results.length}{" "}
                      {results.length === 1 ? "question" : "questions"}
                    </p>
                  </div>
                ) : null}

                {results.length > 0 ? (
                  <Accordion
                    type="single"
                    collapsible
                    className="overflow-hidden rounded-3xl border border-line-strong bg-white shadow-[var(--shadow-card)]"
                  >
                    {results.map((f) => (
                      <AccordionItem key={f.id} value={f.id}>
                        <AccordionTrigger>
                          <span className="flex items-start gap-3">
                            <span className="mt-0.5 rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-500">
                              {f.category}
                            </span>
                            <span className="flex-1">
                              {highlight(f.q, query)}
                            </span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pl-5 sm:pl-6">
                          <p className="max-w-2xl text-[15px] leading-7 text-navy-600">
                            {highlight(f.a, query)}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="rounded-3xl border border-dashed border-line-strong bg-white p-12 text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-navy-500">
                      <IconSearch className="h-5 w-5" />
                    </span>
                    <p className="mt-4 font-heading text-lg font-semibold text-ink">
                      Nothing here matches
                    </p>
                    <p className="mx-auto mt-1 max-w-sm text-sm text-navy-600">
                      {tab !== "All" && totalMatches > 0
                        ? `There are matches in other topics — try “All”.`
                        : "Reword it, or just call us and ask directly."}
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                      {tab !== "All" && (
                        <button
                          type="button"
                          onClick={() => setTab("All")}
                          className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-700"
                        >
                          Search all topics
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          setTab("All");
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-5 py-2.5 text-sm font-semibold text-navy-700 hover:border-navy"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* topic blurb */}
            {results.length > 0 && !query && (
              <p className="mt-4 px-1 text-[13px] leading-6 text-navy-500">
                {BLURB[tab]}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-mist pb-16 sm:pb-20">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-3xl bg-navy p-8 sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-14 select-none font-heading text-[11rem] leading-none text-white/[0.05] sm:text-[15rem]"
            >
              ?
            </div>
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-gold">Didn&apos;t find it</p>
                <h2 className="display-3 mt-3 text-white">
                  Ask us the question directly
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  No phone tree, no form robot. Call the showroom during business
                  hours and you&apos;ll get a straight answer from someone who
                  works here.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
                <Button asChild variant="gold" size="lg">
                  <a href="tel:+19735550142">
                    <IconPhone className="h-4 w-4" />
                    (973) 555-0142
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy"
                >
                  <Link href="/contact">
                    Contact us
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
