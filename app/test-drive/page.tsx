import type { Metadata } from "next";
import { Suspense } from "react";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import TestDriveClient from "./test-drive-client";
import SeoFaq from "../components/seo-faq";
import { TESTDRIVE_SEO } from "../lib/seo-faq-content";

export const metadata: Metadata = {
  title: "Schedule a Test Drive — Lodi, NJ",
  description:
    "Book a test drive at Bergen Car Company in Lodi, NJ in about a minute. Pick the car, pick a time, and the keys will be waiting. Booking a test drive is not a commitment to buy.",
  alternates: { canonical: "/test-drive" },
  openGraph: {
    title: "Come Take It for a Spin | Bergen Car Company",
    description:
      "Choose a car, choose a time, and we'll have it up front with plates on. No obligation, no pressure.",
    url: "https://bergencarcompany.com/test-drive",
  },
};

export default function TestDrivePage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen bg-mist" />}>
          <TestDriveClient />
        </Suspense>
        <SeoFaq {...TESTDRIVE_SEO} />
      </main>
      <SiteFooter />
    </>
  );
}
