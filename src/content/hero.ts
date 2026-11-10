import type { ImageKey } from "./images";
import { getProject, type Project } from "./projects";

type HeroSlide = { project: Project; image: ImageKey };

function slide(slug: string, image: ImageKey): HeroSlide {
  const project = getProject(slug);
  if (!project) throw new Error(`Unknown hero project: ${slug}`);
  return { project, image };
}

/** Home page featured-project slider, in display order. */
export const heroSlides: HeroSlide[] = [
  slide("bouldin", "bouldin-hero"),
  slide("turner-ranch", "turner-ranch-4"),
  slide("meriden", "meriden-hero"),
];

/** The selected residences on the home page, in display order. */
export const featuredSlugs = [
  "turner-ranch",
  "south-5th",
  "meriden",
  "spicewood",
];
