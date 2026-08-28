import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Bergen Car Company — Lodi, NJ",
  description:
    "Call, text, or email Bergen Car Company in Lodi, NJ, or stop by 412 Route 46 — no appointment needed. Direct lines for sales, financing, and service. A real person replies, usually within minutes.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Get in Touch | Bergen Car Company",
    description:
      "A real person at our Lodi showroom, usually within about 15 minutes. Call, text, email, or visit.",
    url: "https://bergencarcompany.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <ContactClient />
      </main>
      <SiteFooter />
    </>
  );
}
