import Image from "next/image";
import Link from "next/link";
import { IconPhone, IconPin, IconMail } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import NewsletterForm from "./newsletter-form";
import { VEHICLE_CATEGORIES } from "../lib/vehicle-categories";

const COLUMNS = [
  {
    heading: "Shop by category",
    links: VEHICLE_CATEGORIES.map((c) => ({
      label: c.navLabel,
      href: c.permalink,
    })),
  },
  {
    heading: "Company",
    links: [
      { label: "Inventory", href: "/inventory" },
      { label: "This month's specials", href: "/specials" },
      { label: "Financing", href: "/financing" },
      { label: "Reviews", href: "/reviews" },
      { label: "Blog", href: "/blog" },
      { label: "Service areas", href: "/service-areas" },
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Schedule a test drive", href: "/test-drive" },
      { label: "Value my trade", href: "/trade" },
      { label: "Sell your car", href: "/sell" },
      { label: "Pre-qualification", href: "/financing" },
      { label: "Warranty coverage", href: "/warranty" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Cookie policy", href: "/cookies" },
  { label: "Sitemap", href: "/sitemap" },
];

function SocialIcon({ path, label }: { path: string; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red hover:text-white"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d={path} />
      </svg>
    </a>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative bg-ink text-white/70">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red/60 to-transparent"
      />

      <div className="container-page py-14 lg:py-16">
        <Reveal>
          <NewsletterForm />
        </Reveal>

        <Stagger
          className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]"
          stagger={0.08}
        >
          <StaggerItem>
            <Image
              src="/bergen-logo.png"
              alt="Bergen Car Company"
              width={514}
              height={133}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-xs text-[14px] leading-6 text-white/55">
              Family-owned used car dealership serving Lodi and Bergen County
              since 2008. Fair pricing and financing help — all in one place on
              Route 46.
            </p>
            <div className="mt-5 space-y-2.5 text-[14px]">
              <a
                href="https://www.google.com/maps?q=Lodi,+New+Jersey"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <IconPin className="h-4 w-4 text-gold" />
                22 US 46 East, Lodi, NJ 07644
              </a>
              <a
                href="tel:+19739286300"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <IconPhone className="h-4 w-4 text-gold" />
                (973) 928-6300
              </a>
              <a
                href="mailto:sales@bergencarcompany.com"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <IconMail className="h-4 w-4 text-gold" />
                sales@bergencarcompany.com
              </a>
            </div>
            <div className="mt-6 flex gap-2.5">
              <SocialIcon
                label="Facebook"
                path="M13 22v-8h3l.5-4H13V8c0-1.1.3-2 2-2h1.5V2.5C16 2.4 14.7 2 13.3 2 10.3 2 8.5 3.8 8.5 7v3H5v4h3.5v8H13Z"
              />
              <SocialIcon
                label="Instagram"
                path="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Zm5-1.6a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM12 4.2c2.6 0 2.9 0 3.9.06 1 .05 1.5.2 1.9.35.5.18.8.4 1.2.8.4.4.6.7.8 1.2.14.4.3.9.34 1.9.05 1 .06 1.3.06 3.9s0 2.9-.06 3.9c-.05 1-.2 1.5-.35 1.9a3.2 3.2 0 0 1-.8 1.2 3.2 3.2 0 0 1-1.2.8c-.4.14-.9.3-1.9.34-1 .05-1.3.06-3.9.06s-2.9 0-3.9-.06c-1-.05-1.5-.2-1.9-.35a3.2 3.2 0 0 1-1.2-.8 3.2 3.2 0 0 1-.8-1.2c-.14-.4-.3-.9-.34-1.9C4.2 14.9 4.2 14.6 4.2 12s0-2.9.06-3.9c.05-1 .2-1.5.35-1.9.18-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.4-.14.9-.3 1.9-.34 1-.05 1.3-.06 3.9-.06Z"
              />
              <SocialIcon
                label="YouTube"
                path="M21.6 7.2a2.5 2.5 0 0 0-1.7-1.8C18.3 5 12 5 12 5s-6.3 0-7.9.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.7 1.8C5.7 19 12 19 12 19s6.3 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5 3-5 3Z"
              />
            </div>
          </StaggerItem>

          {COLUMNS.map((col) => (
            <StaggerItem key={col.heading}>
              <h3 className="font-heading text-sm font-semibold text-white">
                {col.heading}
              </h3>
              <span
                aria-hidden
                className="mt-2 block h-0.5 w-7 rounded-full bg-red/70"
              />
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-white/60 transition-colors hover:text-white"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-gold transition-all duration-200 group-hover:w-3"
                      />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 border-t border-white/10 pt-6">
          <nav
            aria-label="Legal"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]"
          >
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-white/55 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Bergen Car Company, Inc. · Lodi, New
              Jersey
            </p>
            <p className="max-w-xl sm:text-right">
              Prices exclude tax, title, registration, and a $499 documentary
              fee. Vehicles subject to prior sale.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
