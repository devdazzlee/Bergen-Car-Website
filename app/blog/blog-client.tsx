"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { Reveal, Stagger, StaggerItem, EASE } from "../components/motion";
import { SectionHeading } from "../components/section-heading";
import PageBanner, { BannerPills } from "../components/page-banner";
import BlogPostCard from "../components/blog-post-card";
import BlogNewsletter from "../components/blog-newsletter";
import {
  BLOG_CATEGORIES,
  featuredPost,
  sortedPosts,
  type BlogCategory,
} from "../lib/blog";
import { IconArrowRight } from "../components/icons";

type Filter = "All" | BlogCategory;

const FEATURED = featuredPost();
const ALL = sortedPosts();

export default function BlogClient() {
  const [filter, setFilter] = useState<Filter>("All");

  const posts = useMemo(
    () =>
      ALL.filter((p) => p.slug !== FEATURED.slug).filter(
        (p) => filter === "All" || p.category === filter,
      ),
    [filter],
  );

  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="The blog"
        title="Car buying tips and news"
        description={
          <p>
            Straight, specific advice on buying, financing, and keeping a used
            car — written by the people who do it every day on Route 46, not by
            a content farm.
          </p>
        }
        image="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2400&q=70"
        imageAlt="A technician looking over a used car at Bergen Car Company in Lodi, New Jersey"
      >
        <BannerPills
          items={[`${ALL.length} guides`, "No filler", "Written in Lodi"]}
        />
      </PageBanner>

      {/* featured post */}
      <section className="py-14 sm:py-16">
        <div className="container-page">
          <Reveal>
            <Link
              href={`/blog/${FEATURED.slug}`}
              className="group grid overflow-hidden rounded-3xl bg-white ring-1 ring-line-strong shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] lg:grid-cols-[1.15fr_1fr]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-cloud lg:aspect-auto">
                <Image
                  src={FEATURED.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  preload
                />
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-red">
                  {FEATURED.category}
                </p>
                <h2 className="display-3 mt-3 text-ink">{FEATURED.title}</h2>
                <p className="mt-4 text-[15px] leading-7 text-navy-600">
                  {FEATURED.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-3 text-[12px] text-navy-500">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                    {FEATURED.author.initials}
                  </span>
                  <span>
                    {FEATURED.author.name} ·{" "}
                    {format(parseISO(FEATURED.date), "MMM d, yyyy")} ·{" "}
                    {FEATURED.readMinutes} min read
                  </span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red transition-transform duration-200 group-hover:translate-x-0.5">
                  Read the guide
                  <IconArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* filter + grid */}
      <section className="pb-6">
        <div className="container-page">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading kicker="More from the shop" title="Every guide" />
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {(["All", ...BLOG_CATEGORIES] as Filter[]).map((c) => {
                const active = filter === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFilter(c)}
                    aria-pressed={active}
                    className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                      active
                        ? "bg-navy text-white"
                        : "border border-line-strong bg-white text-navy-700 hover:border-navy"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 min-h-[24rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {posts.length > 0 ? (
                  <Stagger
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    stagger={0.06}
                  >
                    {posts.map((p) => (
                      <StaggerItem key={p.slug}>
                        <BlogPostCard post={p} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                ) : (
                  <p className="rounded-2xl border border-dashed border-line-strong bg-white p-12 text-center text-sm text-navy-600">
                    Nothing in this category yet — more on the way.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* newsletter */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <BlogNewsletter />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
