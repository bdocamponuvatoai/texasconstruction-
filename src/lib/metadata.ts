import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { site } from "@/config/site";
import { images } from "@/content/images";

type PageMetadataInput = {
  /** Page name, rendered as "<title> | Texas Construction Company". Omit for the home page. */
  title?: string;
  /** Site-relative path with trailing slash, e.g. "/work/". */
  path: string;
  description?: string;
  /** Share image; defaults to the home hero. */
  image?: StaticImageData;
};

/**
 * Per-page metadata: absolute title, description, canonical URL and Open Graph.
 * Relative URLs are resolved against `metadataBase` (set in the root layout).
 */
export function pageMetadata({
  title,
  path,
  description = site.description,
  image = images["bouldin-hero"],
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.title;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: image.src, width: image.width, height: image.height }],
    },
  };
}
