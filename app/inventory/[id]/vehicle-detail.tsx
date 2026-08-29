"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { currency, estMonthly, miles, type Vehicle } from "../../lib/inventory";
import {
  WARRANTY,
  conditionParagraphs,
  engine,
  gallery,
  historyRows,
  interiorColor,
  vin,
} from "../../lib/vehicle-details";
import { Reveal } from "../../components/motion";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconClose,
  IconCog,
  IconFuel,
  IconGauge,
  IconKey,
  IconPhone,
  IconPin,
  IconRoad,
  IconShield,
  IconSpark,
  IconSwap,
} from "../../components/icons";
import InventoryCard from "../inventory-card";

const EASE = [0.22, 1, 0.36, 1] as const;
const PHONE = "(973) 555-0142";
const TEL = "tel:+19735550142";

/* ------------------------------ Gallery ------------------------------ */

function Gallery({ vehicle }: { vehicle: Vehicle }) {
  const imgs = gallery(vehicle);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const touchX = useRef(0);

  const go = useCallback(
    (next: number) => setActive((next + imgs.length) % imgs.length),
    [imgs.length],
  );

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(active + 1);
      if (e.key === "ArrowLeft") go(active - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom, active, go]);

  const alt = (label: string) =>
    `${vehicle.year} ${vehicle.make} ${vehicle.model} — ${label.toLowerCase()}`;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="group relative aspect-[16/11] overflow-hidden rounded-3xl bg-cloud ring-1 ring-line shadow-[var(--shadow-lift)]"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (dx < -40) go(active + 1);
          if (dx > 40) go(active - 1);
        }}
      >
        <AnimatePresence initial={false}>
          <motion.button
            key={active}
            type="button"
            onClick={() => setZoom(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-0 cursor-zoom-in"
            aria-label="View full size"
          >
            <Image
              src={imgs[active].src}
              alt={alt(imgs[active].label)}
              fill
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </motion.button>
        </AnimatePresence>

        {vehicle.tag && (
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-[12px] font-semibold text-white">
            {vehicle.tag}
          </span>
        )}
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink/55 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur">
          {active + 1} / {imgs.length}
        </span>

        <button
          type="button"
          onClick={() => go(active - 1)}
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 text-ink shadow-md transition hover:bg-white group-hover:flex"
          aria-label="Previous photo"
        >
          <IconArrowRight className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 text-ink shadow-md transition hover:bg-white group-hover:flex"
          aria-label="Next photo"
        >
          <IconArrowRight className="h-5 w-5" />
        </button>
      </motion.div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {imgs.map((im, i) => (
          <button
            key={im.label}
            type="button"
            onClick={() => go(i)}
            className={`relative aspect-[16/11] overflow-hidden rounded-xl transition ${
              i === active
                ? "ring-2 ring-navy"
                : "opacity-70 ring-1 ring-line hover:opacity-100"
            }`}
            aria-label={`Show ${im.label}`}
          >
            <Image src={im.src} alt="" fill sizes="20vw" className="object-cover" />
          </button>
        ))}
      </div>
      <p className="mt-2 text-[12px] text-navy-500">
        Interior and detail photos are representative. Ask us for the full set of
        photos on this exact car.
      </p>

      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            onClick={() => setZoom(false)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Close full-size photo"
            >
              <IconClose className="h-6 w-6" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative aspect-[16/11] w-full max-w-5xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imgs[active].src}
                alt={alt(imgs[active].label)}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* --------------------------- Detail page --------------------------- */

export default function VehicleDetail({
  vehicle: v,
  similar,
}: {
  vehicle: Vehicle;
  similar: Vehicle[];
}) {
  const title = `${v.year} ${v.make} ${v.model}`;

  const badges = [
    v.tag,
    "Clean title",
    "Inspected",
    v.fuel === "Electric" ? "Electric" : v.drivetrain,
  ].filter(Boolean) as string[];

  const specs = [
    { icon: IconSpark, label: "Engine", value: engine(v) },
    { icon: IconCog, label: "Transmission", value: v.transmission },
    { icon: IconRoad, label: "Drivetrain", value: v.drivetrain },
    { icon: IconGauge, label: "Mileage", value: miles(v.mileage) },
    { icon: IconFuel, label: "Fuel type", value: v.fuel },
    { icon: IconSpark, label: "Efficiency", value: v.mpg },
    { icon: IconKey, label: "Exterior color", value: v.exteriorColor },
    { icon: IconKey, label: "Interior color", value: interiorColor(v) },
    { icon: IconShield, label: "Body style", value: v.bodyStyle },
    { icon: IconClock, label: "Model year", value: String(v.year) },
    { icon: IconShield, label: "VIN", value: vin(v) },
    {
      icon: IconCheck,
      label: "Stock #",
      value: v.id.replace("bcc-", "").toUpperCase(),
    },
  ];

  const condition = conditionParagraphs(v);
  const history = historyRows(v);

  return (
    <div className="bg-mist pb-28 lg:pb-24">
      <div className="container-page pt-36 sm:pt-40">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-[13px] text-navy-500"
        >
          <Link href="/" className="transition-colors hover:text-red">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/inventory" className="transition-colors hover:text-red">
            Inventory
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-ink">
            {title} {v.trim}
          </span>
        </motion.nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          <Gallery vehicle={v} />

          <motion.aside
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-3xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-7">
              <div className="flex flex-wrap gap-1.5">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold text-navy-700"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm font-medium text-navy-600">
                {v.year} · {v.bodyStyle}
              </p>
              <h1 className="display-3 mt-1 text-ink">
                {v.make} {v.model}
              </h1>
              <p className="text-navy-600">{v.trim}</p>

              <div className="mt-5 border-y border-line py-4">
                <div className="flex items-end gap-3">
                  <p className="font-heading text-3xl font-bold tracking-tight text-gold-600">
                    {currency(v.price)}
                  </p>
                  <p className="pb-1 text-sm text-navy-500">
                    est. {currency(estMonthly(v.price))}/mo
                  </p>
                </div>
                <p className="mt-1 text-[12px] text-navy-500">
                  {miles(v.mileage)} · {v.drivetrain} · {v.fuel}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-2.5">
                <Link
                  href={`/test-drive?vehicle=${v.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-600 active:scale-[0.98]"
                >
                  Schedule a test drive
                </Link>
                <Link
                  href="/financing"
                  className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98]"
                >
                  Get pre-qualified
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
                >
                  Contact about this vehicle
                </Link>
                <a
                  href={TEL}
                  className="mt-1 inline-flex items-center justify-center gap-2 text-sm font-semibold text-navy-700 transition-colors hover:text-red"
                >
                  <IconPhone className="h-4 w-4 text-red" />
                  Or call {PHONE}
                </a>
              </div>

              <p className="mt-4 flex items-center gap-1.5 text-[12px] text-navy-500">
                <IconPin className="h-3.5 w-3.5 text-navy-400" />
                On our lot at 412 Route 46, Lodi, NJ
              </p>
            </div>
          </motion.aside>
        </div>

        <Reveal
          delay={0.05}
          className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-8"
        >
          <h2 className="font-heading text-lg font-bold text-ink">
            Vehicle details
          </h2>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2.5">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red" />
                <div className="min-w-0">
                  <dt className="text-[11px] uppercase tracking-wide text-navy-500">
                    {label}
                  </dt>
                  <dd
                    className="truncate text-sm font-medium text-ink"
                    title={value}
                  >
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="rounded-3xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-8">
            <h2 className="font-heading text-lg font-bold text-ink">
              Condition — straight from our shop
            </h2>
            <div className="mt-4 space-y-3.5 text-[15px] leading-7 text-navy-700">
              {condition.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mt-4 border-t border-line pt-4 text-[13px] text-navy-500">
              Want something checked before you drive out? Tell us and we&apos;ll
              take extra photos or a video of it, or set the car aside for your
              own mechanic to look over.
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            className="rounded-3xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-7"
          >
            <h2 className="font-heading text-lg font-bold text-ink">
              History report
            </h2>
            <dl className="mt-4 divide-y divide-line">
              {history.map((r) => (
                <div key={r.label} className="flex items-start gap-3 py-3">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      r.ok
                        ? "bg-gold/20 text-gold-600"
                        : "bg-navy/10 text-navy-600"
                    }`}
                  >
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <dt className="text-[12px] uppercase tracking-wide text-navy-500">
                      {r.label}
                    </dt>
                    <dd className="text-[14px] font-medium text-ink">
                      {r.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[12px] text-navy-500">
              Full Carfax or AutoCheck report is available free — just ask.
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={0.05}
          className="mt-8 overflow-hidden rounded-3xl border-2 border-navy bg-white"
        >
          <div className="bg-navy px-6 py-4 sm:px-8">
            <h2 className="font-heading text-base font-bold uppercase tracking-wide text-white">
              Buyers Guide — FTC required disclosure
            </h2>
          </div>
          <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:p-8">
            <div className="rounded-2xl bg-gold/10 p-5 text-center sm:w-48">
              <p className="font-heading text-lg font-bold text-ink">WARRANTY</p>
              <p className="mt-1 text-[12px] text-navy-600">
                Sold <span className="font-semibold">with a warranty</span> — not
                &ldquo;as is.&rdquo;
              </p>
            </div>
            <div className="text-[14px] leading-7 text-navy-700">
              <p>
                <span className="font-semibold text-ink">
                  {WARRANTY.heading}.
                </span>{" "}
                {WARRANTY.split}
              </p>
              <ul className="mt-3 space-y-1.5">
                <li>
                  <span className="font-medium text-ink">Systems covered:</span>{" "}
                  {WARRANTY.covered}
                </li>
                <li>
                  <span className="font-medium text-ink">Duration:</span>{" "}
                  {WARRANTY.duration}
                </li>
              </ul>
              <p className="mt-3 text-[13px] text-navy-500">
                Ask for a copy of the warranty document for the full list of
                coverage and exclusions. Spoken promises are hard to enforce —
                get any promise in writing. An extended service contract is also
                available; ask us for pricing.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-8">
          <div className="flex flex-col gap-4 rounded-3xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                <IconSwap className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading text-lg font-bold">
                  Have a car to trade?
                </p>
                <p className="mt-1 text-[14px] text-white/65">
                  Put its value straight toward this {v.make} {v.model}. We&apos;ll
                  hand you a written number in about twenty minutes.
                </p>
              </div>
            </div>
            <Link
              href="/trade"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-300 active:scale-[0.98]"
            >
              Value my trade
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        {similar.length > 0 && (
          <div className="mt-14">
            <Reveal>
              <h2 className="display-3 text-ink">Similar cars on the lot</h2>
              <p className="mt-2 text-navy-600">
                Close in price, or the same kind of car.
              </p>
            </Reveal>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-72px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.09 } },
              }}
              className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {similar.map((s) => (
                <motion.div
                  key={s.id}
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: EASE },
                    },
                  }}
                >
                  <InventoryCard vehicle={s} />
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-8">
              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                See all inventory
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* sticky mobile contact bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur [padding-bottom:calc(0.75rem_+_env(safe-area-inset-bottom))] lg:hidden">
        <div className="flex gap-3">
          <a
            href={TEL}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-navy px-4 py-3 text-sm font-semibold text-navy"
          >
            <IconPhone className="h-4 w-4" />
            Call
          </a>
          <Link
            href={`/test-drive?vehicle=${v.id}`}
            className="inline-flex flex-[1.4] items-center justify-center rounded-full bg-red px-4 py-3 text-sm font-semibold text-white active:scale-[0.98]"
          >
            Schedule test drive
          </Link>
        </div>
      </div>
    </div>
  );
}
