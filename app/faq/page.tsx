import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import FaqClient from "./faq-client";
import { BLUNT, FAQS } from "../lib/faq-page";

const allQnA = [
  ...BLUNT,
  ...FAQS.map((f) => ({ q: f.q, a: f.a })),
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allQnA.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const metadata: Metadata = {
  title: "FAQ — Common Questions",
  description:
    "Straight answers to what buyers ask Bergen Car Company in Lodi, NJ — do you negotiate, will a credit check hurt my score, what if I find a problem after buying, can I return a car, how trade values are set, and what the warranty covers.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Common Questions | Bergen Car Company",
    description:
      "Honest answers on price, financing, trade-ins, service, and warranty — searchable and sorted by topic.",
    url: "https://bergencarcompany.com/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader solid />
      <main className="flex-1">
        <FaqClient />
      </main>
      <SiteFooter />
    </>
  );
}
