import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import FinancingClient from "./financing-client";
import SeoFaq from "../components/seo-faq";
import { FINANCING_SEO } from "../lib/seo-faq-content";

export const metadata: Metadata = {
  title: "Car Financing & Pre-Qualification in Lodi, NJ",
  description:
    "Get pre-qualified for used car financing at Bergen Car Company in Lodi, NJ. Takes two minutes, uses a soft credit check that won't affect your score, and works for every credit situation — good, building, or none.",
  alternates: { canonical: "/financing" },
  openGraph: {
    title: "Financing Made Simple | Bergen Car Company",
    description:
      "Pre-qualify in two minutes with a soft credit check. No score impact, no obligation. We work with a dozen lenders to find your rate.",
    url: "https://bergencarcompany.com/financing",
  },
};

export default function FinancingPage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <FinancingClient />
        <SeoFaq {...FINANCING_SEO} />
      </main>
      <SiteFooter />
    </>
  );
}
