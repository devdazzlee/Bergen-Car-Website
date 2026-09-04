"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { SectionHeading } from "../components/section-heading";
import PageBanner, { BannerPills } from "../components/page-banner";
import { Button } from "../components/ui/button";
import { areasByRegion, SERVICE_AREAS } from "../lib/service-areas";
import { IconArrowRight, IconPin } from "../components/icons";

const GROUPS = areasByRegion();

export default function AreasClient() {
  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="Service areas"
        title="Serving Bergen County and beyond"
        description={
          <p>
            We&apos;re a single lot on Route 46 in Lodi, but our customers come
            from all over the northern New Jersey and New York metro — 54 towns
            across five counties and into Rockland. Find yours below for local
            directions and what&apos;s in stock right now.
          </p>
        }
        image="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=2400&q=70"
        imageAlt="The Bergen Car Company lot on Route 46 in Lodi, New Jersey"
      >
        <BannerPills
          items={[
            `${SERVICE_AREAS.length} towns`,
            "Bergen · Passaic · Hudson · Essex",
            "Same corner since 2008",
          ]}
        />
      </PageBanner>

      {/* service radius map */}
      <section className="py-14 sm:py-16">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl bg-white ring-1 ring-line shadow-[var(--shadow-card)]">
            <div className="relative">
              <iframe
                title="Bergen Car Company service area around Lodi, New Jersey"
                src="https://www.google.com/maps?q=Lodi,+New+Jersey&z=10&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full border-0 sm:h-[380px]"
              />
              <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-semibold text-ink shadow-md backdrop-blur">
                <IconPin className="h-3.5 w-3.5 text-red" />
                22 US 46 East, Lodi — roughly a 20-mile radius
              </span>
            </div>
            <p className="px-5 py-4 text-[13px] leading-6 text-navy-600 sm:px-7">
              Most of our customers are within about 20 minutes of the lot, but
              plenty drive in from farther — Wayne, Parsippany, the Hudson
              waterfront, and across the state line from Rockland County. If your
              town isn&apos;t listed, you&apos;re still welcome; it just
              means we haven&apos;t built a page for it yet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* grouped city grid */}
      <section className="pb-8">
        <div className="container-page space-y-16">
          {GROUPS.map((group) => (
            <div key={group.region}>
              <SectionHeading
                kicker={`${group.areas.length} ${
                  group.areas.length === 1 ? "town" : "towns"
                }`}
                title={group.region}
              />
              <Stagger
                className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                stagger={0.04}
              >
                {group.areas.map((a) => (
                  <StaggerItem key={a.slug}>
                    <Link
                      href={`/service-areas/${a.slug}`}
                      className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line-strong bg-white px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy hover:shadow-[var(--shadow-card)]"
                    >
                      <span className="min-w-0">
                        <span className="block font-heading text-[15px] font-semibold text-ink">
                          {a.city}
                          {a.state === "NY" ? ", NY" : ""}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] text-navy-500">
                          {a.miles} mi · {a.drive} drive
                        </span>
                      </span>
                      <IconArrowRight className="h-4 w-4 shrink-0 text-navy-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-red" />
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </section>

      {/* bottom CTA */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl bg-navy p-8 sm:p-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-gold">Wherever you&apos;re driving from</p>
                <h2 className="display-3 mt-3 text-white">
                  The inventory and the prices are the same for everyone
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  One lot, one price on the window, no out-of-town markup. Come
                  see what&apos;s here or book a test drive first.
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
                  <Link href="/test-drive">Schedule a test drive</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
