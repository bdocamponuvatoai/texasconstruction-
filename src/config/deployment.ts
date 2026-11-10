import "server-only";

// Environment-driven deployment settings, read at build time.
//
// SITE_URL        Canonical origin, e.g. https://www.example.com (no path).
//                 Falls back to the Vercel production domain, then localhost.
// SITE_INDEXABLE  "true" lets search engines index the site. Anything else
//                 (including unset) keeps robots noindex + Disallow: /.

function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url =
    explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");
  return url.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();
export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (isIndexable && new URL(siteUrl).hostname === "localhost") {
  throw new Error(
    "SITE_INDEXABLE=true but SITE_URL is not set: canonical URLs and the sitemap would point at localhost.",
  );
}

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path: string) => `${siteUrl}${path}`;
