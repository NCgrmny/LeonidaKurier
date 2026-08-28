import type { MetadataRoute } from "next";
import { COLLECTIONS } from "@/lib/content/collections";
import { entriesForCollection } from "@/lib/content/queries";
import { content } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/** Jede Entität bekommt eine eigene, indexierbare Seite. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    { path: "/", priority: 1 },
    { path: "/kurier", priority: 0.9 },
    { path: "/kompass", priority: 0.9 },
    { path: "/radar", priority: 0.8 },
    { path: "/datenbank", priority: 0.8 },
    { path: "/archiv", priority: 0.7 },
    { path: "/redaktion", priority: 0.3 },
    { path: "/rechtliches", priority: 0.2 },
  ];

  const articles = await content.listArticles();
  const collectionEntries = await Promise.all(
    COLLECTIONS.map(async (collection) => {
      const entries = await entriesForCollection(collection.slug);
      return { collection, entries };
    }),
  );

  const now = new Date();

  return [
    ...staticPaths.map((entry) => ({
      url: `${SITE_URL}${entry.path}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: entry.priority,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/kurier/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...collectionEntries.flatMap(({ collection, entries }) => [
      {
        url: `${SITE_URL}/datenbank/${collection.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
      ...entries.map((entry) => ({
        url: `${SITE_URL}/datenbank/${collection.slug}/${entry.slug}`,
        lastModified: new Date(entry.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.5,
      })),
    ]),
  ];
}
