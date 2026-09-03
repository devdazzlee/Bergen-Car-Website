import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import InventoryClient from "../inventory/inventory-client";
import { currency, getInventory, miles, type Vehicle } from "../lib/inventory";
import { stockFor } from "../lib/model-pages";

const SITE = "https://bergencarcompany.com";
const BANNER_IMG =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=70";

const distinct = <T,>(arr: T[]): T[] => [...new Set(arr)];
const range = (nums: number[], fmt: (n: number) => string) => {
  const lo = Math.min(...nums);
  const hi = Math.max(...nums);
  return lo === hi ? fmt(lo) : `${fmt(lo)} – ${fmt(hi)}`;
};
const shared = (stock: Vehicle[], get: (v: Vehicle) => string) => {
  const set = distinct(stock.map(get)).sort();
  return set.length === 1 ? set[0] : set.join(", ");
};

function SpecSummary({
  make,
  model,
  stock,
}: {
  make: string;
  model: string;
  stock: Vehicle[];
}) {
  if (stock.length === 0) return null;

  const years = distinct(stock.map((v) => v.year)).sort((a, b) => a - b);
  const yearLabel =
    years.length === 1
      ? String(years[0])
      : `${years[0]}–${years[years.length - 1]}`;
  const trims = distinct(stock.map((v) => v.trim)).sort();

  const rows: [string, string][] = [
    ["In stock now", `${stock.length} ${stock.length === 1 ? "unit" : "units"}`],
    ["Model years", yearLabel],
    ["Price range", range(stock.map((v) => v.price), currency)],
    ["Mileage range", range(stock.map((v) => v.mileage), (n) => miles(n))],
    ["Trims available", trims.join(", ")],
    ["Body style", shared(stock, (v) => v.bodyStyle)],
    ["Drivetrain", shared(stock, (v) => v.drivetrain)],
    ["Transmission", shared(stock, (v) => v.transmission)],
    ["Fuel", shared(stock, (v) => v.fuel)],
    ["EPA MPG", shared(stock, (v) => v.mpg)],
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-line-strong bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
        <h2 className="font-heading text-lg font-bold text-ink">
          {make} {model} — current stock at a glance
        </h2>
        <dl className="mt-4 divide-y divide-line">
          {rows.map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-[9rem_1fr] gap-4 py-2.5 text-[14px] sm:grid-cols-[11rem_1fr]"
            >
              <dt className="font-semibold text-navy-500">{k}</dt>
              <dd className="font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 border-t border-line pt-4 text-[12.5px] leading-6 text-navy-500">
          These figures are pulled straight from the {make} {model} units listed
          right now and change as inventory turns over. Nothing here is a
          manufacturer claim — tap any car below for its full details, inspection
          notes, and history.
        </p>
      </div>
    </div>
  );
}

export default async function ModelLanding({
  make,
  model,
  slug,
}: {
  make: string;
  model: string;
  slug: string;
}) {
  const vehicles = await getInventory();
  const stock = stockFor(make, model, vehicles);
  const h1 = `Used ${make} ${model} in Lodi, NJ`;
  const minPrice = stock.length ? Math.min(...stock.map((v) => v.price)) : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE}/${slug}#webpage`,
        url: `${SITE}/${slug}`,
        name: `${h1} | Bergen Car Company`,
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
          { "@type": "ListItem", position: 3, name: h1, item: `${SITE}/${slug}` },
        ],
      },
      {
        "@type": "ItemList",
        name: h1,
        numberOfItems: stock.length,
        itemListElement: stock.map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Car",
            name: `${v.year} ${v.make} ${v.model} ${v.trim}`,
            url: `${SITE}/inventory/${v.id}`,
            vehicleModelDate: String(v.year),
            mileageFromOdometer: {
              "@type": "QuantitativeValue",
              value: v.mileage,
              unitCode: "SMI",
            },
            offers: {
              "@type": "Offer",
              price: v.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@id": `${SITE}/#dealer` },
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader solid />
      <main className="flex-1">
        <InventoryClient
          vehicles={vehicles}
          lockMake={make}
          lockModel={model}
          banner={{
            eyebrow: "Inventory",
            title: h1,
            description: (
              <p>
                {stock.length} {make} {model}{" "}
                {stock.length === 1 ? "is" : "are"} in stock at Bergen Car
                Company in Lodi, New Jersey, priced from {currency(minPrice)}.
              </p>
            ),
            image: BANNER_IMG,
            imageAlt: `Used ${make} ${model} for sale at Bergen Car Company in Lodi, New Jersey`,
          }}
          intro={<SpecSummary make={make} model={model} stock={stock} />}
          emptyTitle={`No ${make} ${model} in stock right now`}
          emptyBody={`We don't have a ${make} ${model} listed at the moment. New inventory arrives every week — check back soon or browse the full lot.`}
        />
      </main>
      <SiteFooter />
    </>
  );
}
