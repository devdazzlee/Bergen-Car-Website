"use client";

import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  IconChat,
  IconDownload,
  IconEye,
  IconEyeOff,
  IconFile,
  IconKey,
  IconMail,
  IconPhone,
  IconSearch,
  IconSpinner,
} from "../components/icons";
import { Button } from "../components/ui/button";
import { DatePicker } from "../components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  ApiError,
  dashboardLogin,
  downloadDashboardExport,
  fetchDashboardInquiries,
  fetchDashboardSession,
  isApiError,
  type DashboardForm,
  type DashboardFormFilter,
  type DashboardInquiry,
  type DashboardStats,
} from "../lib/api";

const TOKEN_KEY = "bergen-dashboard-token";
const CACHE_KEY = "bergen-dashboard-cache-v1";
const PAGE_SIZES = [10, 25, 50] as const;

const FORMS: Array<{ id: DashboardFormFilter; label: string }> = [
  { id: "all", label: "All inquiries" },
  { id: "contact", label: "Contact" },
  { id: "location-contact", label: "Homepage contact" },
  { id: "sell", label: "Sell your car" },
  { id: "trade", label: "Trade-in" },
  { id: "financing", label: "Financing" },
  { id: "service", label: "Service" },
  { id: "test-drive", label: "Test drive" },
  { id: "newsletter", label: "Newsletter" },
];

const BADGE: Record<DashboardForm, string> = {
  contact: "bg-navy/10 text-navy",
  "location-contact": "bg-navy-500/10 text-navy-600",
  sell: "bg-gold/20 text-gold-600",
  trade: "bg-gold/15 text-navy-700",
  financing: "bg-red/10 text-red",
  service: "bg-mist text-navy-700",
  "test-drive": "bg-navy text-white",
  newsletter: "bg-cloud text-navy-600",
};

type CacheSnapshot = {
  email: string;
  type: DashboardFormFilter;
  search: string;
  from: string;
  to: string;
  page: number;
  limit: (typeof PAGE_SIZES)[number];
  items: DashboardInquiry[];
  total: number;
  stats: DashboardStats;
};

function readToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function readCache(): CacheSnapshot | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CacheSnapshot;
  } catch {
    return null;
  }
}

function writeCache(snapshot: CacheSnapshot) {
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(snapshot));
}

function parseDay(value: string): Date | undefined {
  if (!value) return undefined;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return undefined;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function pageWindow(current: number, totalPages: number) {
  const start = Math.max(1, current - 1);
  const end = Math.min(totalPages, current + 1);
  const pages: number[] = [];
  for (let page = start; page <= end; page += 1) pages.push(page);
  return pages;
}

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-cloud ${className}`} />;
}

function InquirySkeletons() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-3xl bg-white p-4 shadow-card sm:p-5">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="mt-3 h-6 w-48 max-w-full" />
          <Skeleton className="mt-2 h-4 w-36 max-w-full" />
          <Skeleton className="mt-4 h-4 w-64 max-w-full" />
        </div>
      ))}
    </>
  );
}

function DashboardBoot() {
  return (
    <div className="min-h-dvh bg-mist">
      <header className="border-b border-white/10 bg-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/bergen-logo.png"
              alt="Bergen Car Company"
              width={140}
              height={40}
              className="h-8 w-auto brightness-0 invert sm:h-9"
            />
            <span className="hidden rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold tracking-wide text-gold sm:inline">
              Inquiries
            </span>
          </div>
          <span className="inline-flex items-center gap-2 text-[13px] font-medium text-white/80">
            <IconSpinner className="h-4 w-4" />
            Loading
          </span>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[240px_1fr] sm:px-6 sm:py-6">
        <aside className="hidden lg:block">
          <Skeleton className="mb-3 h-3 w-16" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-11 w-full rounded-2xl" />
            ))}
          </div>
        </aside>
        <section className="min-w-0">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-32" />
          <div className="mt-4 rounded-3xl bg-white p-4 shadow-card">
            <Skeleton className="h-11 w-full rounded-2xl" />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Skeleton className="h-11 rounded-2xl" />
              <Skeleton className="h-11 rounded-2xl" />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <InquirySkeletons />
          </div>
        </section>
      </div>
    </div>
  );
}

export default function DashboardClient() {
  const [hydrated, setHydrated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [type, setType] = useState<DashboardFormFilter>("all");
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<(typeof PAGE_SIZES)[number]>(10);
  const [items, setItems] = useState<DashboardInquiry[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState<"csv" | "pdf" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const skipPageReset = useRef(true);

  const filtersActive = Boolean(debounced || from || to);
  const showSkeleton = loading && items == null;
  const fromDate = parseDay(from);
  const toDate = parseDay(to);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(CACHE_KEY);
    setToken(null);
    setEmail(null);
    setItems(null);
    setStats(null);
    setTotal(null);
  }, []);

  useLayoutEffect(() => {
    const stored = readToken();
    const cache = readCache();
    if (stored) {
      setToken(stored);
      if (cache) {
        skipPageReset.current = true;
        setEmail(cache.email);
        setType(cache.type);
        setSearch(cache.search);
        setDebounced(cache.search);
        setFrom(cache.from);
        setTo(cache.to);
        setPage(cache.page);
        setLimit(cache.limit);
        setItems(cache.items);
        setTotal(cache.total);
        setStats(cache.stats);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !token) return;
    fetchDashboardSession(token)
      .then((session) => setEmail(session.email))
      .catch(() => signOut());
  }, [hydrated, token, signOut]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (skipPageReset.current) {
      skipPageReset.current = false;
      return;
    }
    setPage(1);
  }, [type, debounced, from, to, limit]);

  useEffect(() => {
    if (!hydrated || !token) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchDashboardInquiries(token, {
      type,
      q: debounced || undefined,
      from: from || undefined,
      to: to || undefined,
      page,
      limit,
    })
      .then((result) => {
        if (cancelled) return;
        setItems(result.items);
        setTotal(result.total);
        setStats(result.stats);
        writeCache({
          email: email ?? "",
          type,
          search: debounced,
          from,
          to,
          page,
          limit,
          items: result.items,
          total: result.total,
          stats: result.stats,
        });
      })
      .catch((err) => {
        if (cancelled) return;
        if (isApiError(err) && err.status === 401) {
          signOut();
          return;
        }
        setError(
          err instanceof Error ? err.message : "Could not load inquiries.",
        );
        if (items == null) {
          setItems([]);
          setTotal(0);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // items is intentionally omitted so a refresh keeps the current list on screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, token, type, debounced, from, to, page, limit, signOut, email]);

  const totalPages = useMemo(() => {
    if (total == null) return 1;
    return Math.max(1, Math.ceil(total / limit));
  }, [total, limit]);

  const rangeLabel = useMemo(() => {
    if (total == null || items == null) return null;
    if (total === 0) return "0 results";
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);
    return `Showing ${start}–${end} of ${total}`;
  }, [total, items, page, limit]);

  async function onExport(format: "csv" | "pdf") {
    if (!token || exporting) return;
    setExporting(format);
    setError(null);
    try {
      await downloadDashboardExport(
        token,
        {
          type,
          q: debounced || undefined,
          from: from || undefined,
          to: to || undefined,
        },
        format,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not export inquiries.");
    } finally {
      setExporting(null);
    }
  }

  function clearFilters() {
    setSearch("");
    setDebounced("");
    setFrom("");
    setTo("");
  }

  if (!hydrated) {
    return <DashboardBoot />;
  }

  if (!token) {
    return (
      <LoginScreen
        onSignedIn={(nextToken, nextEmail) => {
          window.localStorage.setItem(TOKEN_KEY, nextToken);
          setToken(nextToken);
          setEmail(nextEmail);
        }}
      />
    );
  }

  return (
    <div className="min-h-dvh bg-mist">
      <header className="border-b border-white/10 bg-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Image
              src="/bergen-logo.png"
              alt="Bergen Car Company"
              width={140}
              height={40}
              className="h-8 w-auto shrink-0 brightness-0 invert sm:h-9"
            />
            <span className="hidden rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold tracking-wide text-gold sm:inline">
              Inquiries
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <p className="max-w-[42vw] truncate text-[12px] text-white/70 sm:max-w-none sm:text-[13px]">
              {email}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 border-white/20 bg-transparent px-3 text-white hover:border-white hover:bg-white hover:text-navy"
              onClick={signOut}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[240px_1fr] sm:px-6 sm:py-6">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-400 sm:px-2">
            Forms
          </p>
          <div className="lg:hidden">
            <Select
              value={type}
              onValueChange={(value) => {
                const next = value as DashboardFormFilter;
                if (next === type) return;
                setType(next);
                setItems(null);
                setLoading(true);
              }}
            >
              <SelectTrigger aria-label="Filter by form" className="rounded-2xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMS.map((form) => (
                  <SelectItem key={form.id} value={form.id}>
                    {form.label}
                    {stats
                      ? ` (${form.id === "all" ? stats.total : stats.byForm[form.id]})`
                      : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <nav className="hidden lg:flex lg:flex-col lg:gap-2">
            {FORMS.map((form) => {
              const active = type === form.id;
              return (
                <button
                  key={form.id}
                  type="button"
                  onClick={() => {
                    if (form.id === type) return;
                    setType(form.id);
                    setItems(null);
                    setLoading(true);
                  }}
                  className={`flex min-w-0 items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                    active
                      ? "bg-navy text-white shadow-card"
                      : "bg-white text-navy-700 hover:bg-cloud"
                  }`}
                >
                  <span className="truncate">{form.label}</span>
                  {stats ? (
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] tabular-nums ${
                        active ? "bg-white/15 text-white" : "bg-mist text-navy-500"
                      }`}
                    >
                      {form.id === "all" ? stats.total : stats.byForm[form.id]}
                    </span>
                  ) : (
                    <Skeleton
                      className={`h-5 w-7 shrink-0 rounded-full ${active ? "bg-white/20" : ""}`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <h1 className="font-heading text-xl font-bold text-ink sm:text-2xl">
                  {FORMS.find((form) => form.id === type)?.label}
                </h1>
                <p className="mt-1 min-h-5 text-sm text-navy-400">
                  {rangeLabel ?? (showSkeleton ? <Skeleton className="mt-1 h-4 w-40" /> : null)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:flex">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => onExport("csv")}
                  disabled={Boolean(exporting) || showSkeleton}
                >
                  {exporting === "csv" ? (
                    <IconSpinner className="h-4 w-4" />
                  ) : (
                    <IconDownload className="h-4 w-4" />
                  )}
                  {exporting === "csv" ? "Exporting…" : "CSV"}
                </Button>
                <Button
                  type="button"
                  variant="navy"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => onExport("pdf")}
                  disabled={Boolean(exporting) || showSkeleton}
                >
                  {exporting === "pdf" ? (
                    <IconSpinner className="h-4 w-4" />
                  ) : (
                    <IconFile className="h-4 w-4" />
                  )}
                  {exporting === "pdf" ? "Exporting…" : "PDF"}
                </Button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-card">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_minmax(0,200px)_minmax(0,200px)]">
                <label className="relative block sm:col-span-2 lg:col-span-1">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-400">
                    Search
                  </span>
                  <IconSearch className="pointer-events-none absolute bottom-3.5 left-3.5 h-4 w-4 text-navy-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Name, email, or phone"
                    className="h-11 w-full rounded-2xl border border-line bg-white pl-10 pr-4 text-sm text-ink outline-none placeholder:text-navy-400 focus:border-navy focus:ring-2 focus:ring-navy/20"
                  />
                </label>
                <label className="block min-w-0">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-400">
                    From
                  </span>
                  <DatePicker
                    id="dash-from"
                    disablePast={false}
                    value={fromDate}
                    disabled={toDate ? { after: toDate } : undefined}
                    placeholder="Start date"
                    onChange={(date) =>
                      setFrom(date ? format(date, "yyyy-MM-dd") : "")
                    }
                    className="rounded-2xl"
                  />
                </label>
                <label className="block min-w-0">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-400">
                    To
                  </span>
                  <DatePicker
                    id="dash-to"
                    disablePast={false}
                    value={toDate}
                    disabled={fromDate ? { before: fromDate } : undefined}
                    placeholder="End date"
                    onChange={(date) =>
                      setTo(date ? format(date, "yyyy-MM-dd") : "")
                    }
                    className="rounded-2xl"
                  />
                </label>
              </div>
              {filtersActive ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-3 text-[13px] font-semibold text-red hover:underline"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>

          {error ? (
            <p
              role="alert"
              className="mt-4 rounded-2xl bg-red/10 px-4 py-3 text-sm font-medium text-red"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-4 flex flex-col gap-3">
            {showSkeleton ? <InquirySkeletons /> : null}

            {!showSkeleton && items && items.length === 0 ? (
              <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-card">
                <p className="font-heading text-lg font-bold text-ink">
                  {filtersActive ? "No matching inquiries" : "No inquiries yet"}
                </p>
                <p className="mt-2 text-sm text-navy-400">
                  {filtersActive
                    ? "Try a different search or date range."
                    : "Submissions from the website forms will show up here, separated by form."}
                </p>
              </div>
            ) : null}

            {!showSkeleton &&
              items?.map((item) => {
                const itemKey = `${item.form}-${item.id}`;
                const open = openId === itemKey;
                return (
                  <article
                    key={itemKey}
                    className="min-w-0 rounded-3xl bg-white p-4 shadow-card sm:p-5"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : itemKey)}
                      className="flex w-full items-start justify-between gap-3 text-left"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${BADGE[item.form]}`}
                          >
                            {item.formLabel}
                          </span>
                          <span className="text-[12px] text-navy-400">
                            {formatDistanceToNow(new Date(item.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <h2 className="mt-2 break-words font-heading text-base font-bold text-ink sm:text-lg">
                          {item.name || item.email || "Subscriber"}
                        </h2>
                        <p className="mt-1 text-sm text-navy-500">
                          {format(
                            new Date(item.createdAt),
                            "MMM d, yyyy · h:mm a",
                          )}
                        </p>
                      </div>
                      <span className="mt-1 shrink-0 text-xs font-semibold text-navy-400">
                        {open ? "Hide" : "Details"}
                      </span>
                    </button>

                    <div className="mt-3 flex flex-col gap-1.5 text-sm sm:flex-row sm:flex-wrap sm:gap-x-4">
                      {item.email ? (
                        <a
                          href={`mailto:${item.email}`}
                          className="inline-flex min-w-0 items-center gap-1.5 font-medium break-all text-navy hover:text-red"
                        >
                          <IconMail className="h-4 w-4 shrink-0" />
                          {item.email}
                        </a>
                      ) : null}
                      {item.phone ? (
                        <a
                          href={`tel:${item.phone}`}
                          className="inline-flex items-center gap-1.5 font-medium text-navy hover:text-red"
                        >
                          <IconPhone className="h-4 w-4 shrink-0" />
                          {item.phone}
                        </a>
                      ) : null}
                    </div>

                    {open && item.details.length > 0 ? (
                      <dl className="mt-4 grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
                        {item.details.map((detail) => (
                          <div key={`${item.id}-${detail.label}`} className="min-w-0">
                            <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-400">
                              {detail.label}
                            </dt>
                            <dd className="mt-1 whitespace-pre-wrap break-words text-sm text-ink">
                              {detail.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </article>
                );
              })}
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-3xl bg-white px-3 py-3 shadow-card sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <div className="flex min-w-[8.5rem] items-center gap-2 text-sm text-navy-500">
              <span className="shrink-0">Rows</span>
              <Select
                value={String(limit)}
                onValueChange={(value) =>
                  setLimit(Number(value) as (typeof PAGE_SIZES)[number])
                }
                disabled={showSkeleton}
              >
                <SelectTrigger
                  aria-label="Rows per page"
                  className="h-9 w-[4.75rem] rounded-xl px-2.5 text-sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZES.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="px-3"
                disabled={showSkeleton || page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Prev
              </Button>
              {pageWindow(page, totalPages).map((number) => (
                <button
                  key={number}
                  type="button"
                  disabled={showSkeleton}
                  onClick={() => setPage(number)}
                  className={`h-9 min-w-9 rounded-full px-2 text-sm font-semibold ${
                    number === page
                      ? "bg-navy text-white"
                      : "text-navy-700 hover:bg-mist"
                  }`}
                >
                  {number}
                </button>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="px-3"
                disabled={showSkeleton || page >= totalPages}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function waitAtLeast(startedAt: number, minimumMs: number) {
  const remaining = minimumMs - (Date.now() - startedAt);
  if (remaining <= 0) return Promise.resolve();
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, remaining);
  });
}

function LoginScreen({
  onSignedIn,
}: {
  onSignedIn: (token: string, email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const startedAt = Date.now();
    try {
      const result = await dashboardLogin(email, password);
      await waitAtLeast(startedAt, 700);
      onSignedIn(result.token, result.email);
    } catch (err) {
      await waitAtLeast(startedAt, 450);
      setError(
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Could not sign in.",
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-navy px-4 py-8">
      <form
        onSubmit={onSubmit}
        aria-busy={submitting}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lift sm:p-8"
      >
        <Image
          src="/bergen-logo.png"
          alt="Bergen Car Company"
          width={160}
          height={46}
          className="h-10 w-auto"
        />
        <h1 className="mt-6 font-heading text-2xl font-bold text-ink">
          Inquiries dashboard
        </h1>
        <p className="mt-2 text-sm leading-6 text-navy-500">
          Sign in to see every website form submission, grouped by form.
        </p>

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red/10 px-3.5 py-2.5 text-[13.5px] font-medium text-red"
          >
            {error}
          </p>
        ) : null}

        <fieldset disabled={submitting} className="mt-6 border-0 p-0">
          <label className="block text-[13px] font-semibold text-navy-700">
            Email
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 h-12 w-full rounded-2xl border border-line px-4 text-sm text-ink outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 disabled:cursor-wait disabled:bg-mist"
            />
          </label>
          <label className="mt-4 block text-[13px] font-semibold text-navy-700">
            Password
            <span className="relative mt-1.5 block">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-2xl border border-line px-4 pr-12 text-sm text-ink outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 disabled:cursor-wait disabled:bg-mist"
              />
              <button
                type="button"
                onClick={() => setShowPassword((open) => !open)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-navy-400 hover:text-navy"
              >
                {showPassword ? (
                  <IconEyeOff className="h-5 w-5" />
                ) : (
                  <IconEye className="h-5 w-5" />
                )}
              </button>
            </span>
          </label>
        </fieldset>

        <Button
          type="submit"
          variant="navy"
          className="mt-6 w-full cursor-pointer disabled:cursor-wait disabled:opacity-100"
          disabled={submitting}
        >
          {submitting ? (
            <IconSpinner className="h-4 w-4" />
          ) : (
            <IconKey className="h-4 w-4" />
          )}
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
        <p className="mt-4 flex items-center gap-2 text-[12px] text-navy-400">
          <IconChat className="h-4 w-4 shrink-0" />
          Not linked from the public site. Bookmark this page.
        </p>
      </form>
    </div>
  );
}
