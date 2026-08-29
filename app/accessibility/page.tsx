import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import LegalPage from "../components/legal-page";
import { LEGAL_DOCS } from "../lib/legal";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Bergen Car Company's commitment to digital accessibility: a WCAG 2.1 Level AA conformance target, the measures we take, known limitations, and how to report an accessibility problem and reach our accessibility contact.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <LegalPage doc={LEGAL_DOCS.accessibility} />
      </main>
      <SiteFooter />
    </>
  );
}
