import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import BlogClient from "./blog-client";
import SeoFaq from "../components/seo-faq";
import { BLOG_SEO } from "../lib/seo-faq-content";
import { sortedPosts } from "../lib/blog";

export const metadata: Metadata = {
  title: "Blog — Car Buying Tips & News",
  description:
    "Specific, useful advice on buying, financing, and maintaining a used car in North Jersey, from the team at Bergen Car Company in Lodi.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Car Buying Tips and News | Bergen Car Company",
    description:
      "Real guides on used-car buying, financing, and maintenance — written in Lodi, not by a content farm.",
    url: "https://bergencarcompany.com/blog",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Bergen Car Company Blog",
  url: "https://bergencarcompany.com/blog",
  blogPost: sortedPosts().map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    datePublished: p.date,
    author: { "@type": "Person", name: p.author.name },
    url: `https://bergencarcompany.com/blog/${p.slug}`,
  })),
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader solid />
      <main className="flex-1">
        <BlogClient />
        <SeoFaq {...BLOG_SEO} background="bg-mist" />
      </main>
      <SiteFooter />
    </>
  );
}
