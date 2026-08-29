import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import WarrantyClient, { FAQS } from "./warranty-client";
import { FaqJsonLd } from "../components/seo-faq";

export const metadata: Metadata = {
  title: "Used Car Warranty Coverage — Lodi, NJ",
  description:
    "Every used car at Bergen Car Company in Lodi, NJ includes a 3-month / 3,000-mile limited powertrain warranty, with optional extended service contracts. See exactly what's covered, what isn't, and how a claim works — plus the FTC Buyers Guide disclosure explained.",
  alternates: { canonical: "/warranty" },
  openGraph: {
    title: "What's Covered, In Plain Language | Bergen Car Company",
    description:
      "A real warranty on every car. Covered vs. not covered, spelled out — no fine print games.",
    url: "https://bergencarcompany.com/warranty",
  },
};

export default function WarrantyPage() {
  return (
    <>
      <FaqJsonLd faqs={FAQS} />
      <SiteHeader solid />
      <main className="flex-1">
        <WarrantyClient />
      </main>
      <SiteFooter />
    </>
  );
}
