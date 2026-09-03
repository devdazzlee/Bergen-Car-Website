import type { MetadataRoute } from "next";

const SITE = "https://bergencarcompany.com";

export const dynamic = "force-static";

/** Serves /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/dashboard/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
