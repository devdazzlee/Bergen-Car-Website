import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import TradeClient from "./trade-client";

export const metadata: Metadata = {
  title: "Value Your Trade-In in Lodi, NJ",
  description:
    "Get a fair, no-obligation trade-in estimate from Bergen Car Company in Lodi, NJ. Same-day written value based on real auction and local market data — we show our math. Trade toward any car on the lot or take the cash.",
  alternates: { canonical: "/trade" },
  openGraph: {
    title: "Get a Real Value for Your Trade-In | Bergen Car Company",
    description:
      "A fair, no-obligation trade-in estimate the same day, with the numbers we used to get there.",
    url: "https://bergencarcompany.com/trade",
  },
};

export default function TradePage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <TradeClient />
      </main>
      <SiteFooter />
    </>
  );
}
