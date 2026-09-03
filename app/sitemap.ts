import type { MetadataRoute } from "next";
import { getInventory } from "./lib/inventory";
import { SERVICE_AREAS } from "./lib/service-areas";
import { BLOG_POSTS } from "./lib/blog";
import { VEHICLE_CATEGORIES } from "./lib/vehicle-categories";
import { qualifyingModels } from "./lib/model-pages";

const SITE = "https://bergencarcompany.com";

export const dynamic = "force-static";

/** Serves /sitemap.xml */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const vehicles = await getInventory();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/inventory", priority: 0.9, changeFrequency: "daily" },
    { path: "/specials", priority: 0.8, changeFrequency: "weekly" },
    { path: "/financing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/trade", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sell", priority: 0.7, changeFrequency: "monthly" },
    { path: "/test-drive", priority: 0.7, changeFrequency: "monthly" },
    { path: "/service", priority: 0.7, changeFrequency: "monthly" },
    { path: "/warranty", priority: 0.6, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.7, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/service-areas", priority: 0.7, changeFrequency: "monthly" },
    { path: "/sitemap", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/accessibility", priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  for (const v of vehicles) {
    entries.push({
      url: `${SITE}/inventory/${v.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  const modelPages = qualifyingModels(vehicles);

  for (const c of VEHICLE_CATEGORIES) {
    entries.push({
      url: `${SITE}${c.permalink}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  for (const m of modelPages) {
    entries.push({
      url: `${SITE}/${m.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    });
  }

  for (const a of SERVICE_AREAS) {
    entries.push({
      url: `${SITE}/service-areas/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const p of BLOG_POSTS) {
    entries.push({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  return entries;
}
