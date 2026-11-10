// Every photograph is statically imported so Next.js emits hashed, immutable
// files and reads width/height from the file itself.
import type { StaticImageData } from "next/image";

import about1 from "@/assets/images/about-1.webp";
import about2 from "@/assets/images/about-2.webp";
import about3 from "@/assets/images/about-3.webp";
import bouldin1 from "@/assets/images/bouldin-1.webp";
import bouldin2 from "@/assets/images/bouldin-2.webp";
import bouldin3 from "@/assets/images/bouldin-3.webp";
import bouldin4 from "@/assets/images/bouldin-4.webp";
import bouldinHero from "@/assets/images/bouldin-hero.webp";
import meriden1 from "@/assets/images/meriden-1.webp";
import meriden2 from "@/assets/images/meriden-2.webp";
import meriden3 from "@/assets/images/meriden-3.webp";
import meriden4 from "@/assets/images/meriden-4.webp";
import meridenHero from "@/assets/images/meriden-hero.webp";
import riverHillsIi1 from "@/assets/images/river-hills-ii-1.webp";
import riverHillsIi2 from "@/assets/images/river-hills-ii-2.webp";
import riverHillsIi3 from "@/assets/images/river-hills-ii-3.webp";
import riverHillsIi4 from "@/assets/images/river-hills-ii-4.webp";
import south5th1 from "@/assets/images/south-5th-1.webp";
import south5th2 from "@/assets/images/south-5th-2.webp";
import south5th3 from "@/assets/images/south-5th-3.webp";
import south5th4 from "@/assets/images/south-5th-4.webp";
import spicewood1 from "@/assets/images/spicewood-1.webp";
import spicewood2 from "@/assets/images/spicewood-2.webp";
import spicewood3 from "@/assets/images/spicewood-3.webp";
import spicewood4 from "@/assets/images/spicewood-4.webp";
import turnerRanch1 from "@/assets/images/turner-ranch-1.webp";
import turnerRanch2 from "@/assets/images/turner-ranch-2.webp";
import turnerRanch3 from "@/assets/images/turner-ranch-3.webp";
import turnerRanch4 from "@/assets/images/turner-ranch-4.webp";

export const images = {
  "about-1": about1,
  "about-2": about2,
  "about-3": about3,
  "bouldin-1": bouldin1,
  "bouldin-2": bouldin2,
  "bouldin-3": bouldin3,
  "bouldin-4": bouldin4,
  "bouldin-hero": bouldinHero,
  "meriden-1": meriden1,
  "meriden-2": meriden2,
  "meriden-3": meriden3,
  "meriden-4": meriden4,
  "meriden-hero": meridenHero,
  "river-hills-ii-1": riverHillsIi1,
  "river-hills-ii-2": riverHillsIi2,
  "river-hills-ii-3": riverHillsIi3,
  "river-hills-ii-4": riverHillsIi4,
  "south-5th-1": south5th1,
  "south-5th-2": south5th2,
  "south-5th-3": south5th3,
  "south-5th-4": south5th4,
  "spicewood-1": spicewood1,
  "spicewood-2": spicewood2,
  "spicewood-3": spicewood3,
  "spicewood-4": spicewood4,
  "turner-ranch-1": turnerRanch1,
  "turner-ranch-2": turnerRanch2,
  "turner-ranch-3": turnerRanch3,
  "turner-ranch-4": turnerRanch4,
} satisfies Record<string, StaticImageData>;

export type ImageKey = keyof typeof images;
