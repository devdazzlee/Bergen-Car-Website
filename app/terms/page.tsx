import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import LegalPage from "../components/legal-page";
import { LEGAL_DOCS } from "../lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using the Bergen Car Company website — vehicle listing and pricing accuracy, that listings are not a binding offer, intellectual property, disclaimers, limitation of liability, and New Jersey governing law.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <LegalPage doc={LEGAL_DOCS.terms} />
      </main>
      <SiteFooter />
    </>
  );
}
