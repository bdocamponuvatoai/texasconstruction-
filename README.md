# Texas Construction Company: website redesign

A redesigned website for Texas Construction Company (Austin, Texas), built with
Next.js 16 (App Router) and React 19 and exported as a fully static site.

> **Status: private preview.** The site is a redesign concept prepared by Nuvato
> and has not been approved by the company. Search indexing is off, and the
> on-page "concept/preview" notes stay until the owner signs off (see
> [Before launch](#before-launch)).

## Getting started

Requires Node.js 20.9 or later (`.nvmrc` pins the current LTS, 26).

```sh
npm ci
npm run dev        # http://localhost:3000
```

To check a production build locally:

```sh
npm run build      # writes the static site to out/
npm run preview    # serves out/ at http://localhost:3000
```

## Scripts

| Script                 | What it does                                                                     |
| ---------------------- | -------------------------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload                                               |
| `npm run build`        | Static export to `out/`, then `postbuild` runs `scripts/fix-export-segments.mjs` |
| `npm run preview`      | Serves `out/` with `serve@14` (fetched on demand, not a dependency)              |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript rules)                              |
| `npm run typecheck`    | `next typegen` (route types such as `PageProps`) then `tsc --noEmit`             |
| `npm run format`       | Prettier, write                                                                  |
| `npm run format:check` | Prettier, check only                                                             |
| `npm run check`        | typecheck + lint + format:check (what CI runs before building)                   |

`scripts/fix-export-segments.mjs` works around a Next.js bug on Windows, where
the export writes link-prefetch files into nested folders instead of dotted file
names, so prefetches 404. Where the export is already correct it finds nothing
to move.

## Project structure

```
src/
  app/                    Routes (one folder each), root layout, not-found,
                          icon.png, robots.ts, sitemap.ts
    work/[slug]/          Project pages (generateStaticParams, dynamicParams = false)
  components/
    layout/               SiteHeader (client: mobile menu), SiteFooter
    sections/             Shared sections: ContactCallout, PageHeading, SectionHeading,
                          ServicesSection, ServiceRows, RecognitionList
    home/                 HeroGallery (client: featured-project slider)
    work/                 ProjectCard, Portfolio (client: filters)
    project/              ProjectGallery (client: lightbox dialog)
    contact/              ProjectBrief (client: two-step brief), ProjectBriefFromUrl
    ui/                   Arrow/Cross icons, SmartLink, TextLink, ButtonLink, Eyebrow, Logo
    seo/                  BusinessJsonLd
  config/
    site.ts               Business details and navigation (safe for client code)
    deployment.ts         SITE_URL / SITE_INDEXABLE (server only)
  content/                Typed copy and data: projects, recognition, services,
                          process steps, hero slides, brief options, image registry
  lib/                    Framework-free helpers: metadata builder, brief text/mailto, format
  styles/                 globals.css importing ordered partials (base, components, sections, pages)
  assets/images/          Photographs and logo (static imports)
scripts/                  fix-export-segments.mjs
docs/                     content-provenance.md, assets.json, verification.md
```

## Conventions

- **Server Components by default.** Only the header menu, hero slider, portfolio
  filters, lightbox and project brief are client components.
- **Facts need a source.** Every business fact (contact details, hours, projects,
  recognition) comes from the company's own website; see
  `docs/content-provenance.md`. Don't add claims that aren't sourced.
- **Links:** use `SmartLink`. Site-relative hrefs (`/…`) become `next/link`;
  `tel:`, `mailto:`, `#hash` and external links stay plain `<a>` with their
  `target`/`rel` unchanged. Internal hrefs keep the trailing slash (`/work/`).
- **Text nodes are part of the design.** Literal text next to an icon is one string
  with its trailing space (`{`${label} `}<Arrow />`), so Chrome shapes it exactly
  as before. Check for stray `{" "}` after formatting.
- **CSS import order matters.** `src/styles/globals.css` imports the partials in the
  order their rules appeared in the original stylesheet; each partial holds base
  rules followed by its media queries. The reset (Tailwind v4 preflight) is layered
  in `@layer base`, so it never beats a site rule.
- **Images** are statically imported through `src/content/images.ts`, so width and
  height come from the file. The page's largest image uses
  `loading="eager" fetchPriority="high"` (`priority` is deprecated).
- **Metadata:** call `pageMetadata({ title, path, description?, image? })` from each
  page. It sets the absolute title, canonical URL and Open Graph.

## Routes

| Path            | Page                                             |
| --------------- | ------------------------------------------------ |
| `/`             | Home                                             |
| `/work/`        | Portfolio with filters                           |
| `/work/<slug>/` | Six project pages, each with a lightbox gallery  |
| `/approach/`    | Process and services                             |
| `/about/`       | Company and president                            |
| `/recognition/` | Press and awards                                 |
| `/contact/`     | Project brief (`?type=` and `?project=` presets) |
| `/careers/`     | Links to the company's current careers page      |
| `/privacy/`     | Privacy, credits and preview details             |
| `/robots.txt`   | Disallows everything until indexing is enabled   |
| `/sitemap.xml`  | Every page above                                 |
| anything else   | Styled 404 (`404.html`)                          |

The project brief sends nothing: it builds an email draft (`mailto:`) to the
company's published address and offers a text download. There is no database,
form backend or booking system.

## Configuration

Environment variables are read at build time (`src/config/deployment.ts`). See
`.env.example`.

| Variable                        | Default                                                                | Purpose                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `SITE_URL`                      | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Canonical origin for canonical URLs, Open Graph, JSON-LD and the sitemap. No trailing slash. |
| `SITE_INDEXABLE`                | unset (off)                                                            | `true` switches robots meta and `robots.txt` to allow indexing                               |
| `VERCEL_PROJECT_PRODUCTION_URL` | set by Vercel                                                          | Fallback for `SITE_URL`                                                                      |

The build fails if `SITE_INDEXABLE=true` while the URL still resolves to localhost.

## Before launch

- [ ] Written approval from the business owner to publish.
- [ ] Photography rights and exact photographer credits confirmed (`docs/assets.json`
      lists every source image).
- [ ] Facts re-checked against the company: phone, email, address, hours, project
      details, recognition, careers listing.
- [ ] Privacy page reviewed and approved by the company.
- [ ] Decide which "concept/preview" notes to remove (footer note, contact-page line,
      privacy-page preview wording), and re-run the parity checks afterwards.
- [ ] Decide how enquiries should be handled (currently an email draft only).
- [ ] Production domain connected; `SITE_URL` set to it; `SITE_INDEXABLE=true` set
      for Production only.
- [ ] `robots.txt`, `sitemap.xml` and canonical URLs checked on the live domain.
- [ ] Tested on real iOS and Android phones (so far: Chrome emulation only).
- [ ] Lighthouse run on the live site; sitemap submitted in Google Search Console.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests:
`npm ci` → `npm run check` → `npm run build`, then uploads `out/` as an artifact.
Dependabot (`.github/dependabot.yml`) opens weekly npm updates (Next/React and
`@types/*` grouped) and monthly GitHub Actions updates.

## Hosting

The site is plain static files in `out/`, so any static host works. Directories
contain `index.html`, and unknown paths should serve `404.html`.

### Vercel

1. Import the GitHub repository in the Vercel dashboard. The framework preset is
   **Next.js**; the static export (`out/`) is detected automatically, so leave the
   build and output settings at their defaults.
2. Environment variables:
   - **Preview:** `SITE_INDEXABLE=false` (or leave it unset).
   - **Production:** `SITE_URL=https://<real domain>`. Add `SITE_INDEXABLE=true`
     only after the owner approves the launch.
3. Deploy. `vercel.json` adds security headers: `X-Content-Type-Options`,
   `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` and
   `Strict-Transport-Security` (without `includeSubDomains`/`preload`, which
   should be the domain owner's decision). There's no Content-Security-Policy:
   Next.js uses inline scripts, and a CSP must be tested against them before
   it's added.

### Deployment

- Preview URL: _not deployed yet_.

## Verification

Parity with the original site (pixels, behaviour, DOM, navigation, metadata) is
recorded in [`docs/verification.md`](docs/verification.md).

`npm audit --omit=dev` reports 0 vulnerabilities. The full audit lists 7 moderate
findings, all one advisory (minimatch denial of service via crafted glob
patterns, GHSA-g3hv-75wg-m249) reached through
`eslint-config-next` → `typescript-eslint`. They affect lint tooling only, run on
this repository's own glob patterns, and are not shipped to the site. No
non-breaking fix exists yet; Dependabot will pick one up when it lands.
