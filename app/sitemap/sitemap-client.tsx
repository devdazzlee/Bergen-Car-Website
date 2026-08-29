"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { areasByRegion } from "../lib/service-areas";
import { LEGAL_NAV } from "../lib/legal";
import { IconArrowRight } from "../components/icons";

type L = { label: string; href: string };

const MAIN: L[] = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "This month's specials", href: "/specials" },
  { label: "Financing", href: "/financing" },
  { label: "Trade-in", href: "/trade" },
  { label: "Sell your car", href: "/sell" },
  { label: "Service & Parts", href: "/service" },
  { label: "Warranty coverage", href: "/warranty" },
  { label: "Schedule a test drive", href: "/test-drive" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
  { label: "Service areas", href: "/service-areas" },
];

const CATEGORIES: L[] = [
  { label: "SUVs", href: "/inventory" },
  { label: "Sedans", href: "/inventory" },
  { label: "Trucks", href: "/inventory" },
  { label: "Hatchbacks", href: "/inventory" },
  { label: "Under $15,000", href: "/inventory" },
  { label: "Hybrid & Electric", href: "/inventory" },
];

const REGION_GROUPS = areasByRegion();

function linkClass() {
  return "inline-flex items-center gap-1.5 text-[14px] leading-7 text-navy-600 transition-colors hover:text-red";
}

function Group({ title, links }: { title: string; links: L[] }) {
  return (
    <div>
      <h2 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-navy-400">
        {title}
      </h2>
      <span aria-hidden className="mt-2 block h-0.5 w-7 rounded-full bg-red/70" />
      <Stagger as="ul" className="mt-4 space-y-1.5" stagger={0.025}>
        {links.map((l) => (
          <StaggerItem as="li" key={l.label}>
            <Link href={l.href} className={linkClass()}>
              {l.label}
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export default function SitemapClient() {
  return (
    <div className="bg-white">
      <header className="border-b border-line bg-mist">
        <div className="container-page animate-fade-up pb-10 pt-32 sm:pt-36">
          <p className="eyebrow text-navy-400">Navigation</p>
          <h1 className="display-2 mt-3 text-ink">Sitemap</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-navy-600">
            Every page on the site in one place — use it to jump straight to
            whatever you&apos;re looking for.
          </p>
        </div>
      </header>

      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <Group title="Main pages" links={MAIN} />
          <Group title="Browse by type" links={CATEGORIES} />
          <Group title="Legal" links={LEGAL_NAV} />
        </div>

        <div className="mt-16 border-t border-line pt-12">
          <Reveal>
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-navy-400">
              Service areas
            </h2>
            <span
              aria-hidden
              className="mt-2 block h-0.5 w-7 rounded-full bg-red/70"
            />
            <p className="mt-4 max-w-xl text-[14px] leading-7 text-navy-600">
              Local pages for the 54 towns we regularly sell to. Start at the{" "}
              <Link
                href="/service-areas"
                className="font-semibold text-navy underline decoration-line-strong underline-offset-2 hover:text-red hover:decoration-red"
              >
                service areas hub
              </Link>
              , or jump straight to a town below.
            </p>
          </Reveal>

          <div className="mt-8 space-y-8">
            {REGION_GROUPS.map((region) => (
              <div key={region.region}>
                <h3 className="font-heading text-[13px] font-semibold text-ink">
                  {region.region}
                  <span className="ml-2 text-navy-400">
                    ({region.areas.length})
                  </span>
                </h3>
                <Stagger
                  as="ul"
                  className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-4"
                  stagger={0.015}
                >
                  {region.areas.map((a) => (
                    <StaggerItem as="li" key={a.slug}>
                      <Link
                        href={`/service-areas/${a.slug}`}
                        className={linkClass()}
                      >
                        {a.city}
                        {a.state === "NY" ? ", NY" : ""}
                      </Link>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            Back to the homepage
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
