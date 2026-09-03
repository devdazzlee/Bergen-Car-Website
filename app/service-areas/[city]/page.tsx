import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import CityClient from "./city-client";
import {
  SERVICE_AREAS,
  getArea,
  vehiclesForCity,
} from "../../lib/service-areas";
import { getInventory } from "../../lib/inventory";

type Params = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return SERVICE_AREAS.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city } = await params;
  const area = getArea(city);
  if (!area) return { title: "Service area not found" };
  const title = `Used Cars Near ${area.city}, ${area.state}`;
  return {
    title,
    description: `${area.city} is about ${area.miles} miles from Bergen Car Company on Route 46 in Lodi — a ${area.drive} drive. Inspected used cars, up-front pricing, financing help, and a warranty on every vehicle.`,
    alternates: { canonical: `/service-areas/${area.slug}` },
    openGraph: {
      title: `${title} | Bergen Car Company`,
      description: `Inspected used cars a ${area.drive} drive from ${area.city}. Up-front prices, financing, and a warranty on every car.`,
      url: `https://bergencarcompany.com/service-areas/${area.slug}`,
    },
  };
}

export default async function CityPage({ params }: Params) {
  const { city } = await params;
  const area = getArea(city);
  if (!area) notFound();

  const inventory = await getInventory();
  const vehicles = vehiclesForCity(area.slug, inventory, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "Bergen Car Company",
    address: {
      "@type": "PostalAddress",
      streetAddress: "412 Route 46",
      addressLocality: "Lodi",
      addressRegion: "NJ",
      postalCode: "07644",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: `${area.city}, ${area.state}`,
    },
    url: `https://bergencarcompany.com/service-areas/${area.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader solid />
      <main className="flex-1">
        <CityClient area={area} vehicles={vehicles} />
      </main>
      <SiteFooter />
    </>
  );
}
