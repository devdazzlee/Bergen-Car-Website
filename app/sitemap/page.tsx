import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import SitemapClient from "./sitemap-client";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Every page on the Bergen Car Company site in one place — main pages, vehicle categories, all 54 service-area towns, and legal policies.",
  alternates: { canonical: "/sitemap" },
};

export default function SitemapPage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <SitemapClient />
      </main>
      <SiteFooter />
    </>
  );
}
