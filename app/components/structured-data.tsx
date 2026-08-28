import { FAQS } from "../lib/faqs";
import { VEHICLES, currency } from "../lib/inventory";

const SITE_URL = "https://bergencarcompany.com";

export default function StructuredData() {
  const graph = [
    {
      "@type": ["AutoDealer", "LocalBusiness"],
      "@id": `${SITE_URL}/#dealer`,
      name: "Bergen Car Company",
      description:
        "Used car dealership in Lodi, New Jersey offering inspected pre-owned vehicles, financing, and trade-ins.",
      url: SITE_URL,
      telephone: "+1-973-555-0142",
      email: "sales@bergencarcompany.com",
      priceRange: "$$",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=70",
      address: {
        "@type": "PostalAddress",
        streetAddress: "412 Route 46",
        addressLocality: "Lodi",
        addressRegion: "NJ",
        postalCode: "07644",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.8823,
        longitude: -74.0832,
      },
      areaServed: [
        "Lodi NJ",
        "Hackensack NJ",
        "Clifton NJ",
        "Paramus NJ",
        "Passaic NJ",
        "Garfield NJ",
        "Bergen County NJ",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "11:00",
          closes: "16:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "612",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#inventory`,
      name: "Featured used car inventory",
      numberOfItems: VEHICLES.length,
      itemListElement: VEHICLES.slice(0, 12).map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Car",
          name: `${v.year} ${v.make} ${v.model} ${v.trim}`,
          brand: { "@type": "Brand", name: v.make },
          model: v.model,
          vehicleModelDate: String(v.year),
          mileageFromOdometer: {
            "@type": "QuantitativeValue",
            value: v.mileage,
            unitCode: "SMI",
          },
          fuelType: v.fuel,
          bodyType: v.bodyStyle,
          driveWheelConfiguration: v.drivetrain,
          offers: {
            "@type": "Offer",
            price: v.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            description: `${currency(v.price)} — inspected and warrantied`,
          },
        },
      })),
    },
  ];

  const json = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      // Static, trusted content generated at build time.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
