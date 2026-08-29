import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import LegalPage from "../components/legal-page";
import { LEGAL_DOCS } from "../lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "What cookies and similar technologies the Bergen Car Company website uses — strictly necessary, preference, and analytics — the third-party services involved, and how to manage cookies in your browser.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <LegalPage doc={LEGAL_DOCS.cookies} />
      </main>
      <SiteFooter />
    </>
  );
}
