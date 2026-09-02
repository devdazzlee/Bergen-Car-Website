"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./motion";
import ReadMoreContent from "./read-more-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export type Faq = { q: string; a: string };

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Plain text with the [label](href) markup flattened to just the label. */
function stripLinks(text: string): string {
  return text.replace(LINK_RE, "$1");
}

/** Render text with inline [label](/href) links as real anchors. */
function renderRich(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const href = m[2];
    const external = /^(https?:|mailto:|tel:)/.test(href);
    const className =
      "font-medium text-navy underline decoration-line-strong underline-offset-2 transition-colors hover:text-red hover:decoration-red";
    out.push(
      external ? (
        <a key={key++} href={href} className={className}>
          {m[1]}
        </a>
      ) : (
        <Link key={key++} href={href} className={className}>
          {m[1]}
        </Link>
      ),
    );
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** FAQPage structured data only — for pages that already render their own FAQ UI. */
export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: stripLinks(f.q),
      acceptedAnswer: { "@type": "Answer", text: stripLinks(f.a) },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Bottom-of-page SEO block: a short body of indexable, internally-linked prose
 * plus an FAQ accordion, with FAQPage structured data. Drop it in a server page
 * between the page client and <SiteFooter>.
 */
export default function SeoFaq({
  kicker = "Good to know",
  heading,
  intro,
  faqs,
  background = "bg-white",
}: {
  kicker?: string;
  heading: string;
  intro: string[];
  faqs: Faq[];
  background?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: stripLinks(f.q),
      acceptedAnswer: { "@type": "Answer", text: stripLinks(f.a) },
    })),
  };

  return (
    <section className={`border-t border-line py-16 sm:py-20 ${background}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow flex items-center gap-2.5 text-red">
            <span aria-hidden className="h-px w-7 bg-red/60" />
            {kicker}
          </p>
          <h2 className="display-3 mt-3 text-ink">{heading}</h2>
          <div className="mt-4">
            <ReadMoreContent
              paragraphs={intro.map((p) => (
                <p key={p.slice(0, 32)}>{renderRich(p)}</p>
              ))}
            />
          </div>
        </Reveal>

        <Reveal
          delay={0.05}
          className="h-max overflow-hidden rounded-3xl bg-white ring-1 ring-line shadow-[var(--shadow-card)]"
        >
          <Accordion type="single" collapsible defaultValue="seo-faq-0">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`seo-faq-${i}`}>
                <AccordionTrigger>{stripLinks(f.q)}</AccordionTrigger>
                <AccordionContent>{renderRich(f.a)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
