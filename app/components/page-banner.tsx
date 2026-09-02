"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useId, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/** Collapsed to 2 lines on mobile; full text on md+ or after Read more. */
function CategoryBannerDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const regionId = useId();
  const longEnough = text.length > 72;

  return (
    <>
      <div className="md:hidden">
        <p
          id={regionId}
          className={
            expanded
              ? "mt-1.5 text-[13px] leading-5 text-white/75"
              : "mt-1.5 line-clamp-2 text-[13px] leading-5 text-white/75"
          }
        >
          {text}
        </p>
        {longEnough ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={regionId}
            className="mt-1 text-[12px] font-semibold text-gold underline decoration-gold/40 underline-offset-2"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        ) : null}
      </div>
      <p className="mt-5 hidden max-w-xl text-lg leading-8 text-white/75 md:block">
        {text}
      </p>
    </>
  );
}

export default function PageBanner({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  image: string;
  imageAlt: string;
  children?: ReactNode;
  /** Category pages: tighter hero below md; desktop matches the standard banner. */
  compact?: boolean;
}) {
  const descriptionText =
    compact && typeof description === "string" ? description : null;

  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover object-[center_38%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/72 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={
          compact
            ? "container-page relative max-md:pb-6 max-md:pt-24 md:pb-20 md:pt-44 lg:pb-24 lg:pt-[11.5rem]"
            : "container-page relative pb-16 pt-36 sm:pb-20 sm:pt-44 lg:pb-24 lg:pt-[11.5rem]"
        }
      >
        <div className="max-w-2xl">
          <motion.p
            variants={item}
            className={
              compact
                ? "eyebrow flex items-center gap-2 text-gold max-md:text-[10px] max-md:tracking-[0.14em]"
                : "eyebrow flex items-center gap-2 text-gold"
            }
          >
            <span
              className={
                compact
                  ? "h-px bg-gold/70 max-md:w-5 md:w-8"
                  : "h-px w-8 bg-gold/70"
              }
            />
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            className={
              compact
                ? "display-2 mt-5 text-white max-md:!mt-2.5 max-md:!text-[1.125rem] max-md:!leading-[1.3] max-md:!tracking-normal"
                : "display-2 mt-5 text-white"
            }
          >
            {title}
          </motion.h1>
          <motion.div variants={item}>
            {descriptionText ? (
              <CategoryBannerDescription text={descriptionText} />
            ) : (
              <div
                className={
                  compact
                    ? "mt-5 max-w-xl text-lg leading-8 text-white/75"
                    : "mt-5 max-w-xl text-lg leading-8 text-white/75"
                }
              >
                {typeof description === "string" ? (
                  <p>{description}</p>
                ) : (
                  description
                )}
              </div>
            )}
          </motion.div>
          {children ? (
            <motion.div variants={item} className="mt-7">
              {children}
            </motion.div>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}

export function BannerPills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 text-[12px] font-semibold text-white/80">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
