"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { format, parseISO } from "date-fns";
import { cn } from "../lib/utils";
import { LEGAL_NAV, type LegalBlock, type LegalDoc } from "../lib/legal";
import {
  IconArrowRight,
  IconChevronDown,
  IconMail,
  IconPhone,
  IconPin,
} from "./icons";

const PHONE_HREF = "tel:+19739286300";
const PHONE_DISPLAY = "(973) 928-6300";

/** Parse inline [label](/href) links out of policy text. */
function renderRich(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const label = m[1];
    const href = m[2];
    const external = /^(https?:|mailto:|tel:)/.test(href);
    const className =
      "font-medium text-navy underline decoration-line-strong underline-offset-2 transition-colors hover:text-red hover:decoration-red";
    out.push(
      external ? (
        <a key={key++} href={href} className={className}>
          {label}
        </a>
      ) : (
        <Link key={key++} href={href} className={className}>
          {label}
        </Link>
      ),
    );
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="text-[15px] leading-8 text-navy-700">
          {renderRich(block.text)}
        </p>
      );
    case "sub":
      return (
        <h3 className="pt-2 font-heading text-[15px] font-semibold text-ink">
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-[15px] leading-7 text-navy-700"
            >
              <span
                aria-hidden
                className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-navy-400"
              />
              <span>{renderRich(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div className="rounded-2xl border border-line-strong bg-mist/60 p-5">
          <p className="font-heading text-sm font-semibold text-ink">
            {block.title}
          </p>
          <p className="mt-2 text-[14px] leading-7 text-navy-600">
            {renderRich(block.text)}
          </p>
        </div>
      );
    case "contact":
      return (
        <div className="rounded-2xl border border-line-strong bg-white p-5 shadow-[var(--shadow-card)]">
          <p className="text-[15px] leading-8 text-navy-700">
            {renderRich(block.text)}
          </p>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-line pt-4 text-[14px]">
            <a
              href={`mailto:${block.email}`}
              className="inline-flex items-center gap-2.5 font-medium text-navy transition-colors hover:text-red"
            >
              <IconMail className="h-4 w-4 shrink-0 text-navy-400" />
              {block.email}
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 font-medium text-navy transition-colors hover:text-red"
            >
              <IconPhone className="h-4 w-4 shrink-0 text-navy-400" />
              {PHONE_DISPLAY}
            </a>
            <p className="inline-flex items-center gap-2.5 text-navy-600">
              <IconPin className="h-4 w-4 shrink-0 text-navy-400" />
              22 US 46 East, Lodi, NJ 07644
            </p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function TocList({
  sections,
  activeId,
  onNavigate,
}: {
  sections: LegalDoc["sections"];
  activeId: string;
  onNavigate?: () => void;
}) {
  return (
    <ol className="mt-2 space-y-0.5">
      {sections.map((s) => {
        const active = s.id === activeId;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={onNavigate}
              aria-current={active ? "location" : undefined}
              className="group relative flex items-start gap-2.5 rounded-md px-3 py-2 text-[13px] leading-5"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-1 left-0 w-0.5 rounded-full bg-red transition-opacity duration-300",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300",
                  active
                    ? "bg-red"
                    : "bg-line-strong group-hover:bg-navy-400",
                )}
              />
              <span
                className={cn(
                  "transition-colors duration-300",
                  active
                    ? "font-semibold text-ink"
                    : "text-navy-500 group-hover:text-navy-700",
                )}
              >
                {s.heading}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const [activeId, setActiveId] = useState(doc.sections[0]?.id ?? "");
  const mobileTocRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const els = doc.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [doc]);

  const updated = format(parseISO(doc.updated), "MMMM d, yyyy");

  return (
    <div id="top" className="bg-white">
      {/* header */}
      <header className="border-b border-line bg-mist">
        <div className="container-page animate-fade-up pb-10 pt-32 sm:pt-36">
          <p className="eyebrow text-navy-400">Legal</p>
          <h1 className="display-2 mt-3 text-ink">{doc.title}</h1>
          <p className="mt-3 text-sm text-navy-500">Last updated {updated}</p>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-navy-600">
            {doc.summary}
          </p>

          <nav
            aria-label="Legal documents"
            className="mt-7 flex flex-wrap gap-2"
          >
            {LEGAL_NAV.map((d) => {
              const current = d.href === `/${doc.slug}`;
              return (
                <Link
                  key={d.href}
                  href={d.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors",
                    current
                      ? "bg-navy text-white"
                      : "border border-line-strong bg-white text-navy-700 hover:border-navy",
                  )}
                >
                  {d.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[15rem_1fr] lg:gap-14 lg:py-16">
        {/* table of contents */}
        <aside className="lg:sticky lg:top-24 lg:h-max lg:self-start">
          <details
            ref={mobileTocRef}
            className="group rounded-xl border border-line-strong bg-white lg:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
              On this page
              <IconChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="border-t border-line px-2 pb-2 pt-1">
              <TocList
                sections={doc.sections}
                activeId={activeId}
                onNavigate={() => mobileTocRef.current?.removeAttribute("open")}
              />
            </div>
          </details>

          <nav aria-label="On this page" className="hidden lg:block">
            <p className="px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-400">
              On this page
            </p>
            <TocList sections={doc.sections} activeId={activeId} />
          </nav>
        </aside>

        {/* content */}
        <div className="min-w-0 max-w-2xl">
          {doc.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 border-t border-line pt-10 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-10"
            >
              <h2 className="font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.blocks.map((b, j) => (
                  <Block key={j} block={b} />
                ))}
              </div>
            </section>
          ))}

          <div className="mt-14 rounded-2xl bg-navy p-6 text-white sm:p-8">
            <h2 className="font-heading text-lg font-bold">Legal questions?</h2>
            <p className="mt-2 max-w-lg text-[14px] leading-7 text-white/70">
              For anything about this page or our policies, the Contact Us page
              sends your message to the right person and we&apos;ll get back to
              you.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gold-300"
            >
              Contact us
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-8 text-[13px] text-navy-400">
            <a
              href="#top"
              className="font-medium text-navy-500 transition-colors hover:text-red"
            >
              Back to top ↑
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
