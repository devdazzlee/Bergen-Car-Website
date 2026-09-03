import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import SpecialsClient from "./specials-client";
import SeoFaq from "../components/seo-faq";
import { SPECIALS_SEO } from "../lib/seo-faq-content";
import { getInventory } from "../lib/inventory";

export const metadata: Metadata = {
  title: "This Month's Specials — Lodi, NJ",
  description:
    "Current price drops on used cars at Bergen Car Company in Lodi, NJ, plus the financing rate and down-payment offers we can get right now. Refreshed monthly — no countdown timers, no manufactured scarcity.",
  alternates: { canonical: "/specials" },
  openGraph: {
    title: "This Month's Specials | Bergen Car Company",
    description:
      "Real markdowns on cars on the lot, plus current financing offers. Updated at the start of each month.",
    url: "https://bergencarcompany.com/specials",
  },
};

export default async function SpecialsPage() {
  const vehicles = await getInventory();

  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <SpecialsClient vehicles={vehicles} />
        <SeoFaq {...SPECIALS_SEO} />
      </main>
      <SiteFooter />
    </>
  );
}
