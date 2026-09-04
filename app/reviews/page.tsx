import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import ReviewsClient from "./reviews-client";
import SeoFaq from "../components/seo-faq";
import { REVIEWS_SEO } from "../lib/seo-faq-content";
import { REVIEWS } from "../lib/reviews";
import { getDealerRating } from "../lib/dealer-rating";

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
  review: REVIEWS.slice(0, 8).map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    datePublished: r.date,
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
    },
    reviewBody: r.text,
  })),
};

export const metadata: Metadata = {
  title: "Customer Reviews — Lodi, NJ",
  description:
    "Read unedited customer reviews of Bergen Car Company in Lodi, NJ. Straight talk on pricing, financing, and buying a used car — sortable by department and rating, with owner responses.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "What Our Customers Say | Bergen Car Company",
    description:
      "Unedited reviews of Bergen Car Company in Lodi, NJ. Sales and financing — the good and the critical.",
    url: "https://bergencarcompany.com/reviews",
  },
};

export default async function ReviewsPage() {
  const rating = await getDealerRating();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader solid />
      <main className="flex-1">
        <ReviewsClient rating={rating} />
        <SeoFaq {...REVIEWS_SEO} />
      </main>
      <SiteFooter />
    </>
  );
}
