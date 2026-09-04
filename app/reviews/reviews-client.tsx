"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import PageBanner from "../components/page-banner";
import AutosalesReviewsBadgeSlot from "../components/autosalesreviews-badge-slot";
import type { DealerRating } from "../lib/dealer-rating";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  FEATURED,
  REVIEWS,
  THEMES,
  type Review,
} from "../lib/reviews";
import { IconArrowRight, IconClose, IconStar } from "../components/icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const PAGE = 9;

const DEPT: Record<
  Review["dept"],
  { pill: string; dot: string; bar: string; avatar: string }
> = {
  Sales: {
    pill: "bg-navy/[0.06] text-navy-700",
    dot: "bg-navy",
    bar: "from-navy to-navy-500",
    avatar: "bg-gradient-to-br from-navy to-navy-600",
  },
  Financing: {
    pill: "bg-gold/15 text-gold-600",
    dot: "bg-gold-600",
    bar: "from-gold-600 to-gold",
    avatar: "bg-gradient-to-br from-gold-600 to-gold",
  },
};

function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span
      className={`inline-flex gap-0.5 ${className}`}
      aria-label={`${n} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar
          key={i}
          className={`h-4 w-4 ${i < n ? "text-gold" : "text-line-strong"}`}
        />
      ))}
    </span>
  );
}

function ReviewCard({ r }: { r: Review }) {
  const d = DEPT[r.dept];
  return (
    <figure className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-line shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-navy/15">
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${d.bar}`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-8 select-none font-heading text-[7rem] leading-none text-cloud/70 transition-colors duration-300 group-hover:text-cloud"
      >
        &rdquo;
      </span>

      <div className="relative p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <Stars n={r.rating} className="[&_svg]:h-[18px] [&_svg]:w-[18px]" />
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${d.pill}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${d.dot}`} />
            {r.dept}
          </span>
        </div>

        <blockquote className="mt-4 text-[15px] font-[450] leading-[1.75] text-navy-700">
          {r.text}
        </blockquote>

        {r.response && (
          <div className="mt-4 rounded-2xl bg-mist/70 p-4 ring-1 ring-line">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-navy-500">
              <span className="h-1 w-1 rounded-full bg-gold-600" />
              Owner reply
            </p>
            <p className="mt-1.5 text-[13px] leading-6 text-navy-600">
              {r.response}
            </p>
          </div>
        )}

        <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white ring-2 ring-white ${d.avatar}`}
          >
            {r.initials}
          </span>
          <span className="min-w-0">
            <span className="block font-heading text-[14px] font-semibold text-ink">
              {r.name}
            </span>
            <span className="block text-[12px] text-navy-400">
              {format(parseISO(r.date), "MMMM d, yyyy")}
              {r.vehicle ? ` · ${r.vehicle}` : ""}
            </span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

export default function ReviewsClient({
  rating = null,
}: {
  rating?: DealerRating | null;
}) {
  const [sort, setSort] = useState<"recent" | "high" | "low">("recent");
  const [dept, setDept] = useState<"all" | Review["dept"]>("all");
  const [keyword, setKeyword] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  const changeSort = (s: typeof sort) => {
    setSort(s);
    setVisible(PAGE);
  };
  const changeDept = (d: typeof dept) => {
    setDept(d);
    setVisible(PAGE);
  };
  const toggleKeyword = (k: string) => {
    setKeyword((cur) => (cur === k ? null : k));
    setVisible(PAGE);
  };

  const filtered = useMemo(() => {
    let list = REVIEWS.filter((r) => {
      if (dept !== "all" && r.dept !== dept) return false;
      if (keyword && !r.text.toLowerCase().includes(keyword)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "high") return b.rating - a.rating || b.date.localeCompare(a.date);
      if (sort === "low") return a.rating - b.rating || b.date.localeCompare(a.date);
      return b.date.localeCompare(a.date);
    });
    return list;
  }, [sort, dept, keyword]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const activeKeyword = THEMES.find((t) => t.keyword === keyword);

  function loadMore() {
    setLoadingMore(true);
    window.setTimeout(() => {
      setVisible((v) => v + PAGE);
      setLoadingMore(false);
    }, 550);
  }

  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="Reviews"
        title="What our customers say"
        description={
          <p>
            Every review below is real, unedited, and left on Google or
            DealerRater. We reply to all of them — the four- and three-star ones
            included.
          </p>
        }
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=70"
        imageAlt="A customer shaking hands with a salesperson after buying a car at Bergen Car Company in Lodi, New Jersey"
      >
        <AutosalesReviewsBadgeSlot variant="dark" rating={rating} />
      </PageBanner>

      {/* trust + live rating slot */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="grid gap-8 rounded-3xl border border-line-strong bg-white p-6 shadow-[var(--shadow-card)] sm:p-8 lg:grid-cols-[16rem_1fr] lg:gap-12">
            <div className="flex flex-col items-center justify-center border-b border-line pb-6 text-center lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <AutosalesReviewsBadgeSlot rating={rating} />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="font-heading text-lg font-bold text-ink">
                  No hidden fees
                </p>
                <p className="mt-1.5 text-[13px] leading-6 text-navy-600">
                  The window price is the price you pay, plus tax, title,
                  registration, and one documentary fee.
                </p>
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-ink">
                  Financing available
                </p>
                <p className="mt-1.5 text-[13px] leading-6 text-navy-600">
                  Pre-qualify with a soft credit check. We shop lenders,
                  including local credit unions.
                </p>
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-ink">
                  Warranty included
                </p>
                <p className="mt-1.5 text-[13px] leading-6 text-navy-600">
                  Every car comes with a 3-month / 3,000-mile limited powertrain
                  warranty.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* what people mention */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">The patterns</p>
            <h2 className="display-3 mt-2 text-ink">
              What people bring up over and over
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-navy-600">
              Pulled from the review text itself. Tap one to read the reviews
              that mention it.
            </p>
          </Reveal>
          <Stagger className="mt-8 flex flex-wrap gap-2.5" stagger={0.04}>
            {THEMES.map((t) => {
              const active = keyword === t.keyword;
              return (
                <StaggerItem key={t.label} as="span">
                  <button
                    type="button"
                    onClick={() => toggleKeyword(t.keyword)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                      active
                        ? "border-navy bg-navy text-white"
                        : "border-line-strong bg-white text-navy-700 hover:border-navy"
                    }`}
                  >
                    {t.label}
                  </button>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* featured review */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-3xl bg-navy p-7 text-white sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-16 select-none font-heading text-[12rem] leading-none text-white/[0.06] sm:text-[16rem]"
            >
              &rdquo;
            </div>
            <div className="relative max-w-3xl">
              <Stars n={FEATURED.rating} className="[&_svg]:h-5 [&_svg]:w-5" />
              <blockquote className="mt-4 text-[17px] leading-8 text-white/90 sm:text-lg">
                {FEATURED.text}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-[13px] font-bold text-white">
                  {FEATURED.initials}
                </span>
                <span className="text-[13px] text-white/60">
                  <span className="font-semibold text-white">{FEATURED.name}</span>
                  {" · "}
                  {FEATURED.vehicle} · {FEATURED.dept}
                </span>
              </figcaption>
            </div>
          </Reveal>
        </div>
      </section>

      {/* filter bar + grid */}
      <section id="all-reviews" className="scroll-mt-24 bg-mist py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="eyebrow text-red">Recent reviews</p>
              <h2 className="display-3 mt-2 text-ink">
                {dept === "all" && !keyword
                  ? `All ${filtered.length} reviews`
                  : `${filtered.length} matching ${
                      filtered.length === 1 ? "review" : "reviews"
                    }`}
              </h2>
            </Reveal>

            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={dept}
                onValueChange={(v) => changeDept(v as typeof dept)}
              >
                <SelectTrigger
                  aria-label="Filter by department"
                  className="h-10 w-auto min-w-[9.5rem] rounded-lg text-sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All departments</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Financing">Financing</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={sort}
                onValueChange={(v) => changeSort(v as typeof sort)}
              >
                <SelectTrigger
                  aria-label="Sort reviews"
                  className="h-10 w-auto min-w-[10rem] rounded-lg text-sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most recent</SelectItem>
                  <SelectItem value="high">Highest rated</SelectItem>
                  <SelectItem value="low">Lowest rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeKeyword && (
            <div className="mt-4 flex items-center gap-2 text-[13px]">
              <span className="text-navy-500">Showing reviews mentioning</span>
              <button
                type="button"
                onClick={() => toggleKeyword(activeKeyword.keyword)}
                className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1 font-semibold text-white"
              >
                {activeKeyword.label}
                <IconClose className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {shown.length > 0 ? (
            <>
              <p className="mt-6 text-[13px] text-navy-500">
                Showing {shown.length} of {filtered.length}
                {dept !== "all" ? ` · ${dept}` : ""}
                {activeKeyword ? ` · mentioning “${activeKeyword.label}”` : ""}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${dept}|${sort}|${keyword ?? ""}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  className="mt-4 gap-6 [column-gap:1.5rem] sm:columns-2 lg:columns-3"
                >
                  {shown.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min((i % PAGE) * 0.05, 0.3),
                        ease: EASE,
                      }}
                      className="mb-6 break-inside-avoid"
                    >
                      <ReviewCard r={r} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-8 rounded-2xl border border-dashed border-line-strong bg-white p-12 text-center"
            >
              <p className="font-heading text-lg font-semibold text-ink">
                No reviews match that combination
              </p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-navy-600">
                Try clearing the department or the keyword.
              </p>
              <button
                onClick={() => {
                  setDept("all");
                  setKeyword(null);
                  setSort("recent");
                  setVisible(PAGE);
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-700"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* leave a review */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold-600">
              <IconStar className="h-6 w-6" />
            </span>
            <h2 className="display-3 mt-4 text-ink">
              Bought or serviced a car here recently?
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-navy-600">
              A few honest sentences genuinely help the next person deciding
              whether to make the drive to Lodi — the same way these reviews
              probably helped you. No incentive, no follow-up nagging. Only if
              you feel like it.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="primary">
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Write a review on Google
                  <IconArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://www.dealerrater.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Review on DealerRater
                </a>
              </Button>
            </div>
            <p className="mt-4 text-[12px] text-navy-500">
              Had a problem instead? Call the showroom at{" "}
              <a
                href="tel:+19739286300"
                className="font-semibold text-navy hover:text-red"
              >
                (973) 928-6300
              </a>{" "}
              — we&apos;d rather fix it than read about it later.
            </p>
          </Reveal>
        </div>
      </section>

      {/* bottom CTA */}
      <section className="bg-mist pb-16 sm:pb-20">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl bg-navy p-8 sm:p-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-gold">See for yourself</p>
                <h2 className="display-3 mt-3 text-white">
                  The reviews describe a certain kind of car lot
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  Come find out if they&apos;re right. Browse what&apos;s in
                  stock, or just call and talk to a person.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
                <Button asChild variant="gold" size="lg">
                  <Link href="/inventory">
                    Browse inventory
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy"
                >
                  <Link href="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
