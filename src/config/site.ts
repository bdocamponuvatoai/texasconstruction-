// Business details and navigation. Safe to import from client components:
// nothing here depends on the environment. Every fact below is published on the
// company's own website (see docs/content-provenance.md); do not add new ones
// without a source.

export const site = {
  name: "Texas Construction Company",
  title: "Texas Construction Company | Architect-led Homes in Austin",
  description:
    "Explore architect-led new homes, major residential renovations, and additions by Texas Construction Company in Austin, Texas.",
  /** Matches the `--paper` token. */
  themeColor: "#f6f4ee",
  currentWebsite: "https://txconstruct.com/",
  pressArchive: "https://txconstruct.com/press/",
  careersPage: "https://txconstruct.com/careers/",
} as const;

const address = {
  street: "5609 S. Congress Ave. #210",
  locality: "Austin",
  region: "TX",
  postalCode: "78745",
} as const;

export const contact = {
  phone: "512.451.8050",
  tel: "+15124518050",
  email: "info@txconstruct.com",
  address,
  /** Display form of the second address line. */
  city: `${address.locality}, ${address.region} ${address.postalCode}`,
  hours: "Monday–Friday, 8am–5pm",
  /** Structured form of `hours`, for JSON-LD. */
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=5609+S+Congress+Ave+210+Austin+TX+78745",
} as const;

export const social = [
  { label: "Instagram", href: "https://www.instagram.com/txconstruct/" },
  { label: "Facebook", href: "https://www.facebook.com/txconstruct/" },
] as const;

type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/work/", label: "Our work" },
  { href: "/approach/", label: "Our approach" },
  { href: "/about/", label: "About us" },
  { href: "/recognition/", label: "Recognition" },
];

export const contactNav: NavItem = {
  href: "/contact/",
  label: "Start a conversation",
};

export const footerNav: NavItem[] = [
  { href: "/work/", label: "Our work" },
  { href: "/about/", label: "Our company" },
  { href: "/careers/", label: "Careers" },
];

/** Every static (non-project) page, for the sitemap. */
export const staticPaths = [
  "/",
  "/work/",
  "/approach/",
  "/about/",
  "/recognition/",
  "/contact/",
  "/careers/",
  "/privacy/",
] as const;
