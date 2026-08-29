"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { format, parseISO } from "date-fns";
import { cn } from "../../lib/utils";
import { Reveal, Stagger, StaggerItem } from "../../components/motion";
import { SectionHeading } from "../../components/section-heading";
import BlogPostCard from "../../components/blog-post-card";
import BlogNewsletter from "../../components/blog-newsletter";
import {
  headingId,
  relatedPosts,
  type BlogPost,
  type BlogBlock,
} from "../../lib/blog";
import { IconArrowRight, IconClock } from "../../components/icons";

function renderRich(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
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

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={headingId(block.text)}
          className="scroll-mt-28 pt-4 font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl"
        >
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="text-[16px] leading-8 text-navy-700">
          {renderRich(block.text)}
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-2.5">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="flex gap-3 text-[15px] leading-7 text-navy-700"
            >
              <span
                aria-hidden
                className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-navy-400"
              />
              <span>{renderRich(it)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2.5">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="flex gap-3 text-[15px] leading-7 text-navy-700"
            >
              <span className="font-heading text-[13px] font-bold text-red">
                {i + 1}.
              </span>
              <span>{renderRich(it)}</span>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="rounded-2xl border border-gold/40 bg-gold/[0.07] p-5">
          <p className="font-heading text-sm font-semibold text-ink">
            {block.title}
          </p>
          <p className="mt-2 text-[14px] leading-7 text-navy-600">
            {renderRich(block.text)}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function PostClient({ post }: { post: BlogPost }) {
  const headings = post.body
    .filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: headingId(b.text), text: b.text }));
  const showToc = headings.length >= 3;

  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (!showToc) return;
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -66% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [post, showToc, headings]);

  const related = relatedPosts(post, 3);

  return (
    <div className="bg-white">
      {/* header */}
      <header className="border-b border-line bg-mist">
        <div className="container-page animate-fade-up pb-10 pt-32 sm:pt-36">
          <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-navy-500">
            <Link href="/blog" className="hover:text-red">
              Blog
            </Link>
            <span aria-hidden>/</span>
            <span className="text-navy-700">{post.category}</span>
          </nav>
          <h1 className="display-2 mt-4 max-w-3xl text-ink">{post.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-navy-600">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[13px] text-navy-500">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-[12px] font-bold text-white">
              {post.author.initials}
            </span>
            <span className="font-semibold text-navy-700">
              {post.author.name}
            </span>
            <span className="text-navy-400">·</span>
            <span>{post.author.role}</span>
            <span className="text-navy-400">·</span>
            <span>{format(parseISO(post.date), "MMMM d, yyyy")}</span>
            <span className="text-navy-400">·</span>
            <span className="inline-flex items-center gap-1">
              <IconClock className="h-3.5 w-3.5" />
              {post.readMinutes} min read
            </span>
          </div>
        </div>
      </header>

      {/* hero image */}
      <div className="container-page -mt-px pt-10">
        <Reveal className="overflow-hidden rounded-3xl ring-1 ring-line shadow-[var(--shadow-card)]">
          <div className="relative aspect-[16/9] bg-cloud">
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(max-width: 1240px) 100vw, 1200px"
              className="object-cover"
              preload
            />
          </div>
        </Reveal>
      </div>

      {/* body */}
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[15rem_1fr] lg:gap-14 lg:py-16">
        {showToc ? (
          <aside className="lg:sticky lg:top-24 lg:h-max lg:self-start">
            <nav aria-label="On this page" className="hidden lg:block">
              <p className="px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-400">
                In this article
              </p>
              <ol className="mt-2 space-y-0.5">
                {headings.map((h) => {
                  const active = h.id === activeId;
                  return (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
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
                          className={cn(
                            "transition-colors duration-300",
                            active
                              ? "font-semibold text-ink"
                              : "text-navy-500 group-hover:text-navy-700",
                          )}
                        >
                          {h.text}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>
        ) : (
          <div className="hidden lg:block" />
        )}

        <article className="min-w-0 max-w-2xl">
          <div className="space-y-5">
            {post.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>

          <div className="mt-12">
            <BlogNewsletter />
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-600 transition-colors hover:text-red"
            >
              <IconArrowRight className="h-4 w-4 rotate-180" />
              All guides
            </Link>
          </div>
        </article>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-mist py-16 sm:py-20">
          <div className="container-page">
            <SectionHeading kicker="Keep reading" title="Related guides" />
            <Stagger
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.07}
            >
              {related.map((p) => (
                <StaggerItem key={p.slug}>
                  <BlogPostCard post={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </div>
  );
}
