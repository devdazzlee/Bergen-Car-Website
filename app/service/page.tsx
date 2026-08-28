import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import ServiceClient from "./service-client";

export const metadata: Metadata = {
  title: "Service & Parts in Lodi, NJ",
  description:
    "Schedule car service at Bergen Car Company in Lodi, NJ. Oil changes, brakes, tires, diagnostics, maintenance, and repairs for any make — with a written estimate first and no work done without your approval.",
  alternates: { canonical: "/service" },
  openGraph: {
    title: "Service & Parts | Bergen Car Company",
    description:
      "Honest service for any make in Lodi, NJ. Written estimate first, only the work you actually need.",
    url: "https://bergencarcompany.com/service",
  },
};

export default function ServicePage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <ServiceClient />
      </main>
      <SiteFooter />
    </>
  );
}
