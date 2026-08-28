"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  BODY_STYLES,
  MAKES,
  PRICE_RANGES,
  SORTS,
  VEHICLES,
  YEARS,
  modelsForMake,
  type SortValue,
  type Vehicle,
} from "../lib/inventory";
import { IconArrowRight, IconChevronDown, IconSearch } from "./icons";
import { Reveal } from "./motion";
import QuickViewModal from "./quick-view-modal";
import VehicleCard from "./vehicle-card";

const TAG_RANK = ["New Arrival", "Price Drop", "Certified", "Low Miles"];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] font-semibold uppercase tracking-wide text-navy-500">
        {label}
      </span>
      <div className="relative">
        {children}
        <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-500" />
      </div>
    </label>
  );
}

const selectClass =
  "w-full appearance-none rounded-xl border border-line bg-white py-3 pl-3.5 pr-9 text-[15px] font-medium text-ink outline-none transition-colors focus:border-navy focus:ring-2 focus:ring-navy/15";

export default function InventoryExplorer() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [priceIdx, setPriceIdx] = useState(0);
  const [body, setBody] = useState("");
  const [sort, setSort] = useState<SortValue>("featured");
  const [quickView, setQuickView] = useState<Vehicle | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const models = useMemo(() => modelsForMake(make), [make]);

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceIdx];
    const list = VEHICLES.filter((v) => {
      if (year && v.year !== Number(year)) return false;
      if (make && v.make !== make) return false;
      if (model && v.model !== model) return false;
      if (body && v.bodyStyle !== body) return false;
      if (v.price < range.min || v.price >= range.max) return false;
      return true;
    });

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        sorted.sort((a, b) => b.year - a.year);
        break;
      case "mileage-asc":
        sorted.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        sorted.sort((a, b) => {
          const ra = a.tag ? TAG_RANK.indexOf(a.tag) : 99;
          const rb = b.tag ? TAG_RANK.indexOf(b.tag) : 99;
          return ra - rb;
        });
    }
    return sorted;
  }, [year, make, model, body, priceIdx, sort]);

  const activeFilters = [
    year && `Year: ${year}`,
    make && `Make: ${make}`,
    model && `Model: ${model}`,
    priceIdx > 0 && PRICE_RANGES[priceIdx].label,
    body && body,
  ].filter(Boolean) as string[];

  function resetAll() {
    setYear("");
    setMake("");
    setModel("");
    setPriceIdx(0);
    setBody("");
  }

  function scrollToResults() {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* ---- Search widget: the primary element, overlapping the hero ---- */}
      <section
        aria-label="Search inventory"
        className="relative z-20 -mt-28 sm:-mt-32"
      >
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-white/60 bg-white/95 p-5 shadow-[var(--shadow-widget)] backdrop-blur-xl sm:p-7"
          >
            <div className="mb-4 flex items-center gap-2">
              <IconSearch className="h-5 w-5 text-red" />
              <h2 className="font-heading text-lg font-bold text-ink">
                Search our inventory
              </h2>
              <span className="ml-auto hidden text-sm text-navy-500 sm:block">
                {VEHICLES.length} vehicles in stock
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-[repeat(4,1fr)_auto]">
              <Field label="Year">
                <select
                  className={selectClass}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Any year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Make">
                <select
                  className={selectClass}
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                    setModel("");
                  }}
                >
                  <option value="">Any make</option>
                  {MAKES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Model">
                <select
                  className={selectClass}
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="">{make ? "Any model" : "All models"}</option>
                  {models.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Price range">
                <select
                  className={selectClass}
                  value={priceIdx}
                  onChange={(e) => setPriceIdx(Number(e.target.value))}
                >
                  {PRICE_RANGES.map((r, i) => (
                    <option key={r.label} value={i}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </Field>

              <button
                type="button"
                onClick={scrollToResults}
                className="col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_30px_-12px_rgba(225,29,46,0.8)] transition-transform duration-150 hover:bg-red-600 active:scale-[0.98] lg:col-span-1 lg:mt-0 lg:self-end lg:px-7"
              >
                Search
                <IconArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 text-[13px] text-navy-500">
              <span className="font-semibold text-ink">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "match" : "matches"} · updates as you
              choose
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---- Results grid ---- */}
      <section id="inventory" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-page" ref={resultsRef}>
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-red">Featured inventory</p>
              <h2 className="display-2 mt-2 text-ink">
                {filtered.length} {filtered.length === 1 ? "vehicle" : "vehicles"}{" "}
                ready to drive
              </h2>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <span className="font-medium text-navy-600">Sort</span>
              <div className="relative">
                <select
                  className="appearance-none rounded-lg border border-line bg-white py-2 pl-3 pr-8 text-sm font-medium text-ink outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortValue)}
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <IconChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-500" />
              </div>
            </label>
          </Reveal>

          {/* Body-style quick filters */}
          <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
            {["", ...BODY_STYLES].map((b) => (
              <button
                key={b || "all"}
                type="button"
                onClick={() => setBody(b)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  body === b
                    ? "bg-navy text-white"
                    : "bg-mist text-navy-600 hover:bg-cloud"
                }`}
              >
                {b || "All body styles"}
              </button>
            ))}
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {activeFilters.map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-navy/5 px-3 py-1 text-[13px] font-medium text-navy-700"
                >
                  {f}
                </span>
              ))}
              <button
                type="button"
                onClick={resetAll}
                className="text-[13px] font-semibold text-red hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {filtered.length > 0 ? (
            <motion.div
              layout
              className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((v, i) => (
                  <motion.div
                    key={v.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(i * 0.04, 0.3),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <VehicleCard vehicle={v} onQuickView={setQuickView} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-line bg-mist/60 p-12 text-center">
              <p className="font-heading text-lg font-semibold text-ink">
                No vehicles match those filters
              </p>
              <p className="mt-1 text-sm text-navy-600">
                Try widening your price range or clearing a filter.
              </p>
              <button
                type="button"
                onClick={resetAll}
                className="mt-4 inline-flex items-center rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-700"
              >
                Reset filters
              </button>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              Don&apos;t see it? Tell us what you want
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <QuickViewModal vehicle={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}
