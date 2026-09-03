import { FAQS } from "../lib/faqs";
import { currency, type Vehicle } from "../lib/inventory";

const SITE_URL = "https://bergencarcompany.com";
const LOGO = `${SITE_URL}/bergen-logo.png`;

export default function StructuredData({ vehicles }: { vehicles: Vehicle[] }) {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Bergen Car Company",
      legalName: "Bergen Car Company, Inc.",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: LOGO,
        width: 514,
        height: 133,
        caption: "Bergen Car Company",
      },
      image: { "@id": `${SITE_URL}/#logo` },
      foundingDate: "2008",
      telephone: "+1-973-555-0142",
      email: "sales@bergencarcompany.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "412 Route 46",
        addressLocality: "Lodi",
        addressRegion: "NJ",
        postalCode: "07644",
        addressCountry: "US",
      },
      sameAs: [
        "https://www.facebook.com/bergencarcompany",
        "https://www.instagram.com/bergencarcompany",
        "https://www.youtube.com/@bergencarcompany",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Bergen Car Company",
      description:
        "Family-owned used car dealership in Lodi, New Jersey since 2008.",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#org` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/inventory?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
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
      currenciesAccepted: "USD",
      paymentAccepted: "Cash, Check, Credit Card, Financing",
      parentOrganization: { "@id": `${SITE_URL}/#org` },
      publisher: { "@id": `${SITE_URL}/#org` },
      image:
        "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=70",
      logo: { "@id": `${SITE_URL}/#logo` },
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
      hasMap: "https://www.google.com/maps?q=412+Route+46,+Lodi,+NJ+07644",
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
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Bergen Car Company | Family-Owned Used Car Dealer in Lodi, NJ",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#dealer` },
      publisher: { "@id": `${SITE_URL}/#org` },
      inLanguage: "en-US",
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
      numberOfItems: vehicles.length,
      itemListElement: vehicles.slice(0, 12).map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Car",
          name: `${v.year} ${v.make} ${v.model} ${v.trim}`,
          url: `${SITE_URL}/inventory/${v.id}`,
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
            seller: { "@id": `${SITE_URL}/#dealer` },
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
