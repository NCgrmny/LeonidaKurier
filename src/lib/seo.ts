import type { Metadata } from "next";
import { SITE, SITE_URL } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Ergänzende Keywords – bewusst sparsam und nur, wenn inhaltlich gedeckt. */
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  type?: "website" | "article";
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  publishedTime,
  modifiedTime,
  type = "website",
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} – ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} – ${SITE.name}`,
      description,
    },
  };
}

/** JSON-LD der Organisation bzw. Publikation. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE_URL,
    description: SITE.description,
    slogan: SITE.tagline,
    founder: { "@type": "Person", name: SITE.operator },
    disambiguatingDescription: SITE.disclaimerLong,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE_URL,
    inLanguage: "de-DE",
    description: SITE.description,
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: `${SITE_URL}${input.path}`,
    author: { "@type": "Organization", name: input.author },
    publisher: { "@type": "Organization", name: SITE.name },
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    inLanguage: "de-DE",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
