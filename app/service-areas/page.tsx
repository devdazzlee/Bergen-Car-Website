import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import AreasClient from "./areas-client";
import SeoFaq from "../components/seo-faq";
import { AREAS_SEO } from "../lib/seo-faq-content";
import { SERVICE_AREAS } from "../lib/service-areas";

export const metadata: Metadata = {
  title: "Service Areas — Used Cars Across North Jersey & the Metro",
  description: `Bergen Car Company in Lodi, NJ serves ${SERVICE_AREAS.length} towns across Bergen, Passaic, Hudson, Essex, and Morris counties plus Rockland County, NY. Find your town for directions and current inventory.`,
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "Serving Bergen County and Beyond | Bergen Car Company",
    description:
      "One honest used-car lot on Route 46 in Lodi, serving buyers across the northern NJ and NY metro.",
    url: "https://bergencarcompany.com/service-areas",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Bergen Car Company",
  address: {
    "@type": "PostalAddress",
    streetAddress: "22 US 46 East",
    addressLocality: "Lodi",
    addressRegion: "NJ",
    postalCode: "07644",
    addressCountry: "US",
  },
  areaServed: SERVICE_AREAS.map((a) => ({
    "@type": "City",
    name: `${a.city}, ${a.state}`,
  })),
};

export default function ServiceAreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader solid />
      <main className="flex-1">
        <AreasClient />
        <SeoFaq {...AREAS_SEO} background="bg-mist" />
      </main>
      <SiteFooter />
    </>
  );
}
