import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import { getInventory } from "../lib/inventory";
import InventoryClient from "./inventory-client";
import SeoFaq from "../components/seo-faq";
import { INVENTORY_SEO } from "../lib/seo-faq-content";

export const metadata: Metadata = {
  title: "Used Car Inventory in Lodi, NJ",
  description:
    "Browse used cars at Bergen Car Company in Lodi, New Jersey. Filter by price, mileage, year, make, model, and body style.",
  alternates: { canonical: "/inventory" },
  openGraph: {
    title: "Used Car Inventory | Bergen Car Company",
    description:
      "Used cars in Lodi, NJ. Filter by price, mileage, make, and body style.",
    url: "https://bergencarcompany.com/inventory",
  },
};

export default async function InventoryPage() {
  const vehicles = await getInventory();

  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <InventoryClient vehicles={vehicles} />
        <SeoFaq {...INVENTORY_SEO} />
      </main>
      <SiteFooter />
    </>
  );
}
