import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import LegalPage from "../components/legal-page";
import { LEGAL_DOCS } from "../lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Bergen Car Company in Lodi, NJ collects, uses, protects, and shares your information — including the financial information collected through the Financing page under the Gramm-Leach-Bliley Act.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <LegalPage doc={LEGAL_DOCS.privacy} />
      </main>
      <SiteFooter />
    </>
  );
}
