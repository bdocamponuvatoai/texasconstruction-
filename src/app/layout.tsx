import type { Metadata, Viewport } from "next";
import { isIndexable, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BusinessJsonLd } from "@/components/seo/json-ld";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Pages set absolute titles via pageMetadata(); this covers the 404 page.
  title: site.title,
  description: site.description,
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The stylesheet uses `scroll-behavior: smooth`; this lets Next.js turn it
    // off during route changes so new pages start at the top instantly.
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">
        <SiteHeader />
        {children}
        <SiteFooter />
        <BusinessJsonLd />
      </body>
    </html>
  );
}
