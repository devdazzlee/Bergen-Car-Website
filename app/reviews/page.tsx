import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import ReviewsClient from "./reviews-client";
import SeoFaq from "../components/seo-faq";
import { REVIEWS_SEO } from "../lib/seo-faq-content";
import { REVIEWS, REVIEW_AVG, REVIEW_TOTAL } from "../lib/reviews";

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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: REVIEW_AVG,
    reviewCount: REVIEW_TOTAL,
    bestRating: 5,
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
  description: `Read ${REVIEW_TOTAL}+ reviews of Bergen Car Company in Lodi, NJ (${REVIEW_AVG.toFixed(
    1,
  )} average). Real, unedited reviews from Google and DealerRater — sortable by department and rating, with owner responses to every one.`,
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "What Our Customers Say | Bergen Car Company",
    description: `${REVIEW_AVG.toFixed(1)} across ${REVIEW_TOTAL}+ reviews. Sales, service, and financing — the good and the critical.`,
    url: "https://bergencarcompany.com/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader solid />
      <main className="flex-1">
        <ReviewsClient />
        <SeoFaq {...REVIEWS_SEO} />
      </main>
      <SiteFooter />
    </>
  );
}
