import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import InventoryClient from "../inventory/inventory-client";
import { VEHICLES } from "../lib/inventory";
import {
  VEHICLE_CATEGORIES,
  getCategory,
  type VehicleCategory,
} from "../lib/vehicle-categories";

const SITE = "https://bergencarcompany.com";
const BANNER_IMG =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=70";

type Params = { params: Promise<{ category: string }> };

// Only the 15 documented category slugs are valid; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return VEHICLE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    // absolute bypasses the "%s | Bergen Car Company" template, since the
    // brief's SEO title already includes the brand suffix.
    title: { absolute: c.seoTitle },
    description: c.metaDescription,
    alternates: { canonical: c.permalink },
    openGraph: {
      title: c.seoTitle,
      description: c.metaDescription,
      url: `${SITE}${c.permalink}`,
      type: "website",
    },
  };
}

function jsonLd(c: VehicleCategory) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE}${c.permalink}#webpage`,
        url: `${SITE}${c.permalink}`,
        name: c.seoTitle,
        description: c.metaDescription,
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#dealer` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          {
            "@type": "ListItem",
            position: 2,
            name: "Inventory",
            item: `${SITE}/inventory`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: c.h1,
            item: `${SITE}${c.permalink}`,
          },
        ],
      },
    ],
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const lockBody =
    c.filter.kind === "bodyStyle" ? c.filter.value : undefined;
  const lockFuel = c.filter.kind === "fuel" ? c.filter.value : undefined;
  const lockFlag = c.filter.kind === "flag" ? c.filter.value : undefined;
  const forceEmpty = c.filter.kind === "none";

  const shortName = c.name.replace(/^Used /, "").toLowerCase();

  // Brief layout: paragraph 1 in the banner, paragraph 2 above the inventory,
  // paragraph 3 (the closing call to action) below the inventory.
  const intro = c.body[1] ? (
    <div className="mx-auto max-w-3xl text-[15px] leading-7 text-navy-600">
      <p>{c.body[1]}</p>
    </div>
  ) : undefined;

  const outro = c.body[2] ? (
    <div className="mx-auto max-w-3xl text-[15px] leading-7 text-navy-600">
      <p>{c.body[2]}</p>
    </div>
  ) : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(c)) }}
      />
      <SiteHeader solid />
      <main className="flex-1">
        <InventoryClient
          vehicles={VEHICLES}
          banner={{
            eyebrow: "Inventory",
            title: c.h1,
            description: <p>{c.body[0]}</p>,
            image: BANNER_IMG,
            imageAlt: `${c.name} for sale at Bergen Car Company in Lodi, New Jersey`,
          }}
          intro={intro}
          outro={outro}
          lockBody={lockBody}
          lockFuel={lockFuel}
          lockFlag={lockFlag}
          forceEmpty={forceEmpty}
          altNoun={c.altNoun}
          emptyTitle="No vehicles currently available in this category"
          emptyBody={
            forceEmpty
              ? `We don't have any ${shortName} listed on the site right now. New inventory arrives every week, so check back soon or contact us and we'll keep an eye out for you.`
              : `We don't have any ${shortName} in stock at the moment. New inventory arrives every week, so check back soon or browse the full lot.`
          }
        />
      </main>
      <SiteFooter />
    </>
  );
}
