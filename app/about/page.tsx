import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import AboutClient from "./about-client";
import SeoFaq from "../components/seo-faq";
import { ABOUT_SEO } from "../lib/seo-faq-content";

export const metadata: Metadata = {
  title: "About Bergen Car Company — Lodi, NJ",
  description:
    "Bergen Car Company is a family-run used car lot on Route 46 in Lodi, NJ, started in 2008 by Sal Ferrante. Meet the team, read how the dealership got here, and see what it stands for.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "The People Behind Bergen Car Company",
    description:
      "A small, family-run used car lot in Lodi, NJ since 2008. Here's who we are and why we do a few things differently.",
    url: "https://bergencarcompany.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <AboutClient />
        <SeoFaq {...ABOUT_SEO} background="bg-mist" />
      </main>
      <SiteFooter />
    </>
  );
}
