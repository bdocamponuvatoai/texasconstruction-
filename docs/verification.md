# Verification

Parity checks run on 2026-11-11 comparing the original site (the Vinext/Cloudflare
build this project replaced) with the Next.js static export.

## Setup

| Item     | Value                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Baseline | Original production build (`vinext build`), served locally by Wrangler                                                                                             |
| New site | `npm run build` → `out/`, served by a minimal static server (directory index, 308 to trailing slash, `404.html`)                                                   |
| Browser  | Headless Chrome 156.0.8078.80 driven by playwright-core 1.65.0 (system Chrome, no browser download)                                                                |
| Machine  | Windows 11, Node 24.15.0                                                                                                                                           |
| Capture  | Reduced motion, every image forced eager and awaited with `img.decode()`, `document.fonts.ready`, scroll-through for lazy content, screenshot retaken until stable |

The comparison scripts lived in a scratch folder alongside the original build and
are not part of this repository.

## Results

| Check                      | Result                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run build`            | Pass: 19 static outputs; 14 prefetch segment files flattened by `postbuild`                                                                      |
| `npm run check`            | Pass: `next typegen` + `tsc`, ESLint, Prettier                                                                                                   |
| Full-page pixel diff       | **102 / 102 identical** (17 URLs × 1600/1280/1024/768/390/320 px). Strict pixelmatch: threshold 0, anti-aliased pixels counted                   |
| Open-state screenshots     | **3 / 3 identical**: mobile menu (390 px), lightbox (1280 px), brief review (1280 px)                                                            |
| Behaviour parity           | **27 / 30 outcomes identical**; the 3 differences are intentional (below)                                                                        |
| DOM structure              | **16 / 16 routes identical**, 1,082 text nodes compared (content and node boundaries), after normalising the intentional attribute changes below |
| Navigation and console     | **20 / 20 checks pass**; 274 prefetch requests, zero 4xx/5xx, zero console errors or hydration warnings                                          |
| Title, description, robots | **15 / 15 pages identical**                                                                                                                      |
| CSS split                  | 1,578 declarations before and after; 0 cascade-order conflicts on the real DOM                                                                   |

URLs covered: the 14 routes, `/contact?type=Major%20renovations`, `/contact?project=turner-ranch`
and an unknown URL (404 page).

The whole suite was run twice: once after the port, and again after the
production clean-up (legacy files removed, dead exports removed, config files
added). Both runs gave the same results. All "concept/preview" notes were kept
until the business owner approves a launch, so no page content changed during
the clean-up.

### Behaviour scenarios

Run identically on both sites, outcomes compared as JSON:

- Mobile menu: open, link list, Escape (focus returns to the toggle), resize, navigate.
- Hero slider: next ×3 (wraps), previous; index text, caption, link, image, alt.
- Service accordion: open/close sequence; preset links.
- Portfolio filters: every filter; `aria-pressed`, count text, cards and numbers.
- Lightbox: open, ArrowRight/ArrowLeft (wraps), next/previous buttons, Escape,
  backdrop click, Close; index, alt, scroll lock, focus return.
- Project brief: empty submit (first invalid field focused, invalid set), bad email,
  valid submit (review rows, heading focus, exact `mailto:` href), download (file
  name and exact text), Edit (all values kept), resubmit.
- Presets: `?type=` valid and invalid, `?project=` valid and invalid, removing the
  inspiration chip.

### Intentional differences

| Area                     | Original                                    | New                                                      | Why                                                    |
| ------------------------ | ------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------ |
| Menu after resize        | Stays open (hidden by CSS) at desktop width | Closes when the viewport reaches desktop width           | Requested; avoids a stale open menu on resize back     |
| Focus after "Edit brief" | Lost to `<body>`                            | Moves to the form heading                                | Keyboard and screen-reader users keep their place      |
| Navigation               | Full page loads                             | Client-side (next/link), prefetched                      | Faster; header state persists, titles update           |
| URLs                     | `/work`                                     | `/work/` (`/work` redirects)                             | `trailingSlash` so any static host serves `index.html` |
| Attributes               | `id="menu-button"`, controlled `value=""`   | Removed; `type="button"`, `name="stage"`                 | Old-JS-only id; FormData needs names; no visual effect |
| Head                     | Title, description, robots, favicon         | Plus canonical, Open Graph/Twitter, theme-color, JSON-LD | SEO and sharing; nothing visible changes               |
| Footer year              | Computed per request                        | Computed at build time                                   | Static export; rebuild to roll the year over           |

## Lighthouse (local production build)

Measured 2026-11-11 with Lighthouse 13.6.0: default mobile preset (simulated
throttling), headless Chrome 156, 3 runs per page. The export was served from
this machine with Brotli and immutable caching, **not** from the live host, so
re-run against the deployed URL before quoting live numbers.

| Page       | Performance | Accessibility | Best practices | SEO | Largest paint | Total blocking | CLS | Page weight |
| ---------- | ----------- | ------------- | -------------- | --- | ------------- | -------------- | --- | ----------- |
| `/`        | 82–85       | 96            | 100            | 69  | 4.4–4.5 s     | 52–167 ms      | 0   | 2,067 KiB   |
| `/contact` | 100         | 96            | 100            | 69  | 0.8 s         | 48–65 ms       | 0   | 169 KiB     |

What holds the scores back:

- **SEO 69 is intentional.** The preview sends `noindex, nofollow` and
  `robots.txt` disallows everything ("Page is blocked from indexing"). It clears
  when `SITE_INDEXABLE=true` on the production domain.
- **Home page weight and largest paint.** The photographs are served at full size
  (up to 664 KiB each). Lighthouse estimates 1,539 KiB of savings from
  correctly sized images; responsive variants (`srcset`) would address it.
- **Accessibility 96: text contrast.** The muted grey `#72756c` on the paper
  background `#f6f4ee` measures 4.26:1 (and 3.83–4.02:1 on the darker panels),
  below the 4.5:1 WCAG AA level for small text. Fixing it means darkening a design
  colour, so it needs sign-off.
- Minor: about 25 KiB of unused JavaScript and 12 KiB of legacy polyfills in the
  Next.js runtime.

## Capture notes

- With GPU raster, Chrome put scaled photographs in one of two raster states at
  random: the original compared against itself differed by about 147,000 pixels.
  All captures therefore use software raster (`--disable-gpu --force-color-profile=srgb`),
  where self-comparisons are 0. Each worker uses its own browser, and the two sites
  are captured one after the other.
- No sub-pixel anti-aliasing exceptions were needed: every comparison is exactly 0.

## Not covered

- Real phones and tablets. Mobile widths were tested with Chrome device emulation
  only, not on iOS Safari or Android hardware.
- Firefox and Safari rendering.
- Live-deployment checks (headers, live Lighthouse): see the deployment section of the README.
