import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`.
  output: "export",
  // `/about` is emitted as `about/index.html`, so any static host serves it.
  trailingSlash: true,
  // The default image optimizer needs a server; static imports still provide
  // width/height and hashed, immutable file names.
  images: { unoptimized: true },
};

export default nextConfig;
