import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import SellClient, { FAQS } from "./sell-client";
import { FaqJsonLd } from "../components/seo-faq";

export const metadata: Metadata = {
  title: "Sell Us Your Car — No Purchase Required | Lodi, NJ",
  description:
    "Sell your car to Bergen Car Company in Lodi, NJ with no obligation to buy anything. Get a fair same-day offer, a quick inspection, and paid on the spot — whether or not you're shopping for a replacement.",
  alternates: { canonical: "/sell" },
  openGraph: {
    title: "Sell Us Your Car, No Purchase Required | Bergen Car Company",
    description:
      "Private sellers welcome. Fair offers, same-day pay, and zero pressure to buy a car from us.",
    url: "https://bergencarcompany.com/sell",
  },
};

export default function SellPage() {
  return (
    <>
      <FaqJsonLd faqs={FAQS} />
      <SiteHeader solid />
      <main className="flex-1">
        <SellClient />
      </main>
      <SiteFooter />
    </>
  );
}
