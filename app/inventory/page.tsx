import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import { VEHICLES } from "../lib/inventory";
import InventoryClient from "./inventory-client";
import SeoFaq from "../components/seo-faq";
import { INVENTORY_SEO } from "../lib/seo-faq-content";

export const metadata: Metadata = {
  title: "Used Car Inventory in Lodi, NJ",
  description:
    "Browse every inspected, ready-to-drive used car at Bergen Car Company in Lodi, New Jersey. Filter by price, mileage, year, make, model, and body style.",
  alternates: { canonical: "/inventory" },
  openGraph: {
    title: "Used Car Inventory | Bergen Car Company",
    description:
      "Inspected, ready-to-drive used cars in Lodi, NJ. Filter by price, mileage, make, and body style.",
    url: "https://bergencarcompany.com/inventory",
  },
};

export default function InventoryPage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <InventoryClient vehicles={VEHICLES} />
        <SeoFaq {...INVENTORY_SEO} />
      </main>
      <SiteFooter />
    </>
  );
}
