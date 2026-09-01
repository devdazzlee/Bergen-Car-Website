"use client";

import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BODY_STYLES,
  FUEL_TYPES,
  INVENTORY_SORTS,
  MAKES,
  MILEAGE_RANGES,
  PRICE_RANGES,
  YEARS,
  modelsForMake,
  type InventorySort,
  type Vehicle,
} from "../lib/inventory";
import { IconChevronDown, IconSearch, IconSliders } from "../components/icons";
import PageBanner from "../components/page-banner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import InventoryCard from "./inventory-card";

const PAGE = 9;
const EASE = [0.22, 1, 0.36, 1] as const;

const DEFAULT_BANNER = {
  eyebrow: "Inventory",
  title: "Browse our inventory",
  description:
    "Every car here has been inspected by our own technicians and is ready to drive. Prices are up front — filter down to what fits, and come take it for a spin.",
  image:
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=70",
  imageAlt:
    "A row of inspected used cars available at Bergen Car Company in Lodi, New Jersey",
};

type BannerProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  image: string;
  imageAlt: string;
};

type FiltersState = {
  year: string;
  make: string;
  model: string;
  priceIdx: number;
  mileageIdx: number;
  body: string;
  fuel: string;
};

const EMPTY: FiltersState = {
  year: "",
  make: "",
  model: "",
  priceIdx: 0,
  mileageIdx: 0,
  body: "",
  fuel: "",
};

const groupV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const fieldV: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

function FilterSelect({
  label,
  value,
  onValue,
  children,
}: {
  label: string;
  value: string;
  onValue: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fieldV} className="flex flex-col gap-1.5">
      <span className="text-[12px] font-semibold uppercase tracking-wide text-navy-500">
        {label}
      </span>
      <Select value={value} onValueChange={onValue}>
        <SelectTrigger className="h-10 text-[14px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </motion.div>
  );
}

function FilterFields({
  f,
  set,
  models,
  sort,
  onSort,
  hideBody = false,
  hideFuel = false,
}: {
  f: FiltersState;
  set: (p: Partial<FiltersState>) => void;
  models: string[];
  sort?: InventorySort;
  onSort?: (s: InventorySort) => void;
  hideBody?: boolean;
  hideFuel?: boolean;
}) {
  return (
    <>
      <FilterSelect
        label="Year"
        value={f.year || "any"}
        onValue={(v) => set({ year: v === "any" ? "" : v })}
      >
        <SelectItem value="any">Any year</SelectItem>
        {YEARS.map((y) => (
          <SelectItem key={y} value={String(y)}>
            {y}
          </SelectItem>
        ))}
      </FilterSelect>

      <FilterSelect
        label="Make"
        value={f.make || "any"}
        onValue={(v) => set({ make: v === "any" ? "" : v, model: "" })}
      >
        <SelectItem value="any">Any make</SelectItem>
        {MAKES.map((m) => (
          <SelectItem key={m} value={m}>
            {m}
          </SelectItem>
        ))}
      </FilterSelect>

      <FilterSelect
        label="Model"
        value={f.model || "any"}
        onValue={(v) => set({ model: v === "any" ? "" : v })}
      >
        <SelectItem value="any">{f.make ? "Any model" : "All models"}</SelectItem>
        {models.map((m) => (
          <SelectItem key={m} value={m}>
            {m}
          </SelectItem>
        ))}
      </FilterSelect>

      <FilterSelect
        label="Price range"
        value={String(f.priceIdx)}
        onValue={(v) => set({ priceIdx: Number(v) })}
      >
        {PRICE_RANGES.map((r, i) => (
          <SelectItem key={r.label} value={String(i)}>
            {r.label}
          </SelectItem>
        ))}
      </FilterSelect>

      <FilterSelect
        label="Mileage"
        value={String(f.mileageIdx)}
        onValue={(v) => set({ mileageIdx: Number(v) })}
      >
        {MILEAGE_RANGES.map((r, i) => (
          <SelectItem key={r.label} value={String(i)}>
            {r.label}
          </SelectItem>
        ))}
      </FilterSelect>

      {!hideBody && (
        <FilterSelect
          label="Body style"
          value={f.body || "any"}
          onValue={(v) => set({ body: v === "any" ? "" : v })}
        >
          <SelectItem value="any">Any body style</SelectItem>
          {BODY_STYLES.map((b) => (
            <SelectItem key={b} value={b}>
              {b}
            </SelectItem>
          ))}
        </FilterSelect>
      )}

      {!hideFuel && (
        <FilterSelect
          label="Fuel type"
          value={f.fuel || "any"}
          onValue={(v) => set({ fuel: v === "any" ? "" : v })}
        >
          <SelectItem value="any">Any fuel type</SelectItem>
          {FUEL_TYPES.map((ft) => (
            <SelectItem key={ft} value={ft}>
              {ft}
            </SelectItem>
          ))}
        </FilterSelect>
      )}

      {onSort && (
        <FilterSelect
          label="Sort"
          value={sort ?? "year-desc"}
          onValue={(v) => onSort(v as InventorySort)}
        >
          {INVENTORY_SORTS.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </FilterSelect>
      )}
    </>
  );
}

const miniTrigger =
  "h-9 w-auto min-w-[7.5rem] shrink-0 rounded-lg px-3 text-[13px] font-medium";

export default function InventoryClient({
  vehicles,
  banner,
  intro,
  outro,
  lockBody,
  lockFuel,
  forceEmpty = false,
  emptyTitle,
  emptyBody,
  altNoun,
}: {
  vehicles: Vehicle[];
  banner?: BannerProps;
  intro?: ReactNode;
  /** Rendered below the vehicle grid / empty state. */
  outro?: ReactNode;
  lockBody?: string;
  lockFuel?: string;
  forceEmpty?: boolean;
  emptyTitle?: string;
  emptyBody?: string;
  altNoun?: string;
}) {
  const [f, setF] = useState<FiltersState>(EMPTY);
  const [sort, setSort] = useState<InventorySort>("year-desc");
  const [visible, setVisible] = useState(PAGE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMini, setShowMini] = useState(false);

  const set = (p: Partial<FiltersState>) => {
    setF((prev) => ({ ...prev, ...p }));
    setVisible(PAGE);
  };
  const applySort = (s: InventorySort) => {
    setSort(s);
    setVisible(PAGE);
  };
  const clearAll = () => {
    setF(EMPTY);
    setVisible(PAGE);
  };

  const models = useMemo(() => modelsForMake(f.make), [f.make]);

  const baseVehicles = useMemo(() => {
    if (forceEmpty) return [];
    return vehicles.filter(
      (v) =>
        (!lockBody || v.bodyStyle === lockBody) &&
        (!lockFuel || v.fuel === lockFuel),
    );
  }, [vehicles, lockBody, lockFuel, forceEmpty]);

  const filtered = useMemo(() => {
    const pr = PRICE_RANGES[f.priceIdx];
    const mr = MILEAGE_RANGES[f.mileageIdx];
    const list = baseVehicles.filter((v) => {
      if (f.year && v.year !== Number(f.year)) return false;
      if (f.make && v.make !== f.make) return false;
      if (f.model && v.model !== f.model) return false;
      if (f.body && v.bodyStyle !== f.body) return false;
      if (f.fuel && v.fuel !== f.fuel) return false;
      if (v.price < pr.min || v.price >= pr.max) return false;
      if (v.mileage < mr.min || v.mileage >= mr.max) return false;
      return true;
    });
    const s = [...list];
    switch (sort) {
      case "price-asc":
        s.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        s.sort((a, b) => b.price - a.price);
        break;
      case "mileage-asc":
        s.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        s.sort((a, b) => b.year - a.year || a.mileage - b.mileage);
    }
    return s;
  }, [baseVehicles, f, sort]);

  useEffect(() => {
    const onScroll = () => setShowMini(window.scrollY > 540);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const activeCount =
    (f.year ? 1 : 0) +
    (f.make ? 1 : 0) +
    (f.model ? 1 : 0) +
    (f.priceIdx ? 1 : 0) +
    (f.mileageIdx ? 1 : 0) +
    (f.body ? 1 : 0) +
    (f.fuel ? 1 : 0);

  function loadMore() {
    setLoadingMore(true);
    window.setTimeout(() => {
      setVisible((v) => v + PAGE);
      setLoadingMore(false);
    }, 650);
  }

  const hideBody = !!lockBody;
  const hideFuel = !!lockFuel;
  const showFilters = !forceEmpty;
  const b = banner ?? DEFAULT_BANNER;

  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow={b.eyebrow}
        title={b.title}
        description={b.description}
        image={b.image}
        imageAlt={b.imageAlt}
      />

      {intro ? (
        <div className="container-page pt-10 lg:pt-12">{intro}</div>
      ) : null}

      {/* sticky condensed bar */}
      {showFilters && (
        <AnimatePresence>
          {showMini && (
            <motion.div
              initial={{ y: -64, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -64, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="fixed inset-x-0 top-[72px] z-40 border-b border-line bg-white/95 shadow-[0_8px_24px_-14px_rgba(9,12,20,0.4)] backdrop-blur"
            >
              <div className="container-page flex items-center gap-3 py-2.5">
                <span className="hidden shrink-0 text-sm font-semibold text-ink sm:block">
                  {filtered.length} {filtered.length === 1 ? "car" : "cars"}
                </span>
                <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
                  <Select
                    value={f.make || "any"}
                    onValueChange={(v) =>
                      set({ make: v === "any" ? "" : v, model: "" })
                    }
                  >
                    <SelectTrigger aria-label="Make" className={miniTrigger}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any make</SelectItem>
                      {MAKES.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={String(f.priceIdx)}
                    onValueChange={(v) => set({ priceIdx: Number(v) })}
                  >
                    <SelectTrigger
                      aria-label="Price range"
                      className={miniTrigger}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRICE_RANGES.map((r, i) => (
                        <SelectItem key={r.label} value={String(i)}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!hideBody && (
                    <Select
                      value={f.body || "any"}
                      onValueChange={(v) => set({ body: v === "any" ? "" : v })}
                    >
                      <SelectTrigger
                        aria-label="Body style"
                        className={miniTrigger}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any body</SelectItem>
                        {BODY_STYLES.map((body) => (
                          <SelectItem key={body} value={body}>
                            {body}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {!hideFuel && (
                    <Select
                      value={f.fuel || "any"}
                      onValueChange={(v) => set({ fuel: v === "any" ? "" : v })}
                    >
                      <SelectTrigger
                        aria-label="Fuel type"
                        className={miniTrigger}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any fuel</SelectItem>
                        {FUEL_TYPES.map((ft) => (
                          <SelectItem key={ft} value={ft}>
                            {ft}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <Select
                    value={sort}
                    onValueChange={(v) => applySort(v as InventorySort)}
                  >
                    <SelectTrigger aria-label="Sort" className={miniTrigger}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {INVENTORY_SORTS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {activeCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="hidden shrink-0 text-[13px] font-semibold text-red hover:underline sm:block"
                  >
                    Clear
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* body */}
      <div
        className={`container-page grid gap-8 py-10 lg:gap-10 lg:py-12 ${
          showFilters ? "lg:grid-cols-[280px_1fr]" : ""
        }`}
      >
        {showFilters && (
          <>
            {/* desktop sidebar */}
            <aside className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="sticky top-28 rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-heading text-sm font-bold text-ink">
                    <IconSliders className="h-4 w-4 text-red" />
                    Filters
                  </h2>
                  {activeCount > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-[13px] font-semibold text-red hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <motion.div
                  variants={groupV}
                  initial="hidden"
                  animate="show"
                  className="mt-4 flex flex-col gap-4"
                >
                  <FilterFields
                    f={f}
                    set={set}
                    models={models}
                    hideBody={hideBody}
                    hideFuel={hideFuel}
                  />
                </motion.div>
              </motion.div>
            </aside>

            {/* mobile filter toggle + panel */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-2xl border border-line bg-white px-4 py-3.5 text-sm font-semibold text-ink shadow-[var(--shadow-card)]"
              >
                <span className="flex items-center gap-2">
                  <IconSliders className="h-4 w-4 text-red" />
                  Filters{activeCount > 0 ? ` · ${activeCount}` : ""}
                </span>
                <IconChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mobileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {mobileOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      variants={groupV}
                      initial="hidden"
                      animate="show"
                      className="mt-3 grid grid-cols-1 gap-4 rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-card)] sm:grid-cols-2"
                    >
                      <FilterFields
                        f={f}
                        set={set}
                        models={models}
                        sort={sort}
                        onSort={applySort}
                        hideBody={hideBody}
                        hideFuel={hideFuel}
                      />
                      {activeCount > 0 && (
                        <button
                          onClick={clearAll}
                          className="rounded-xl bg-mist py-2.5 text-sm font-semibold text-red sm:col-span-2"
                        >
                          Clear all filters
                        </button>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* results */}
        <div>
          {!forceEmpty && (
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm text-navy-600">
                <span className="font-bold text-ink">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "vehicle" : "vehicles"}
                {activeCount > 0 ? " match your filters" : " available"}
              </p>
              <div className="hidden items-center gap-2 text-sm sm:flex">
                <span className="font-medium text-navy-600">Sort</span>
                <Select
                  value={sort}
                  onValueChange={(v) => applySort(v as InventorySort)}
                >
                  <SelectTrigger
                    aria-label="Sort"
                    className="h-9 w-auto min-w-[10rem] rounded-lg text-sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INVENTORY_SORTS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {shown.length > 0 ? (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {shown.map((v, i) => (
                    <motion.div
                      key={v.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min((i % PAGE) * 0.045, 0.32),
                        ease: EASE,
                      }}
                    >
                      <InventoryCard
                        vehicle={v}
                        altText={
                          altNoun
                            ? `Used ${v.year} ${v.make} ${v.model} ${altNoun} for sale in Lodi NJ`
                            : undefined
                        }
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2.5 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98] disabled:opacity-70"
                  >
                    {loadingMore ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            ease: "linear",
                          }}
                          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                        />
                        Loading…
                      </>
                    ) : (
                      <>Load more · {filtered.length - visible} to go</>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="rounded-2xl border border-dashed border-line bg-white p-12 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mist text-navy-500">
                <IconSearch className="h-6 w-6" />
              </div>
              <p className="mt-4 font-heading text-lg font-semibold text-ink">
                {emptyTitle ?? "No matches right now"}
              </p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-navy-600">
                {emptyBody ??
                  "Try widening your search — a bigger price range or a couple fewer filters usually does it. New cars come in every week."}
              </p>
              {!forceEmpty ? (
                <button
                  onClick={clearAll}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98]"
                >
                  Clear all filters
                </button>
              ) : (
                <Link
                  href="/inventory"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98]"
                >
                  Browse all inventory
                </Link>
              )}
            </motion.div>
          )}

          {outro ? <div className="mt-10">{outro}</div> : null}
        </div>
      </div>
    </div>
  );
}
