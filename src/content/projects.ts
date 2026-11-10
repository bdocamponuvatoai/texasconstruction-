import type { ImageKey } from "./images";

export const projectTypes = ["New builds", "Renovations", "Additions"] as const;
export type ProjectType = (typeof projectTypes)[number];

export type Project = {
  slug: string;
  name: string;
  type: ProjectType;
  place: string;
  architect: string;
  subtitle: string;
  description: string;
  detail: string;
  /** Four gallery photographs; the first is the lead/card image. */
  images: ImageKey[];
  /** The company's original project page (provenance + credit link). */
  source: string;
  material: string;
};

export const projects: Project[] = [
  {
    slug: "turner-ranch",
    name: "Turner Ranch Residence",
    type: "New builds",
    place: "Muleshoe Bend, Texas",
    architect: "Young Architecture and Design · Ted Young",
    subtitle: "A place for art, music, and the landscape.",
    description:
      "A new leisure studio sits among the existing buildings of a Hill Country property. Exposed timber, generous glass, and a raised concrete platform connect the interior to the meadow beyond.",
    detail:
      "Built for piano performances, quilting, and quiet time, the studio pairs handcrafted millwork with durable materials. The architecture frames the land while creating space for the owners’ creative life.",
    images: [
      "turner-ranch-1",
      "turner-ranch-2",
      "turner-ranch-3",
      "turner-ranch-4",
    ],
    source:
      "https://txconstruct.com/portfolio_page/turner-ranch-custom-home-austin-tx/",
    material: "Timber / concrete / galvalume",
  },
  {
    slug: "bouldin",
    name: "Bouldin Residence",
    type: "New builds",
    place: "Austin, Texas",
    architect: "FAB Architecture · Patrick Ousey & Pam Chandler",
    subtitle: "City living. A different perspective.",
    description:
      "A three-level home makes the most of a compact urban site. White plaster, expansive glazing, and terraces open the living spaces to the tree canopy and the Austin skyline.",
    detail:
      "Designed for owners dividing their time between Austin and elsewhere, the house brings together generous views and an easy connection to the neighborhood. A steel and white oak staircase connects its distinct levels.",
    images: ["bouldin-1", "bouldin-2", "bouldin-3", "bouldin-4"],
    source: "https://txconstruct.com/portfolio_page/bouldin-residence/",
    material: "White plaster / steel / oak",
  },
  {
    slug: "south-5th",
    name: "South 5th Residence",
    type: "Additions",
    place: "Bouldin Creek, Austin",
    architect: "FAB Architecture · Patrick Ousey & Michael Norris",
    subtitle: "More room for the things that matter.",
    description:
      "A complementary addition brings together a garage, lounge, wet bar, and golf simulator. Outdoor living spaces step down toward a poolside dining and grilling area.",
    detail:
      "Accoya siding, custom steel windows, and board-formed concrete tie the new structure to the existing home. Interiors by Cami Wright introduce deep blue tones and brass details for a distinctive retreat.",
    images: ["south-5th-1", "south-5th-2", "south-5th-3", "south-5th-4"],
    source:
      "https://txconstruct.com/portfolio_page/5th-street-house-addition-austin-tx/",
    material: "Accoya / steel / board-formed concrete",
  },
  {
    slug: "meriden",
    name: "Meriden Residence",
    type: "Renovations",
    place: "Austin, Texas",
    architect: "Dick Clark Architecture",
    subtitle: "A familiar home, completely reimagined.",
    description:
      "A whole-home renovation transforms an industrial interior into a welcoming family residence. Limestone, sapele wood, and broad expanses of glass bring warmth and openness to the home.",
    detail:
      "As the scope evolved, close coordination with the design team kept the client informed about budget and timing. Custom sliding doors connect generous living spaces, while carefully integrated private areas give the family room to retreat.",
    images: ["meriden-1", "meriden-2", "meriden-3", "meriden-4"],
    source: "https://txconstruct.com/portfolio_page/meriden-residence/",
    material: "Lueders limestone / sapele / glass",
  },
  {
    slug: "spicewood",
    name: "Spicewood Retreat",
    type: "Additions",
    place: "Spicewood, Texas",
    architect: "FAB Architecture · Patrick Ousey & Pam Chandler",
    subtitle: "A retreat that grows with its owners.",
    description:
      "A dogtrot home opens to Hill Country views and natural breezes. Later additions introduce a pool, covered outdoor living, a carport, and spaces for cooking and gathering.",
    detail:
      "The original home was built in 2017, with the property expanded in 2024. Limestone, metal, and board-and-batten siding establish a consistent language across old and new, keeping the land at the center of the experience.",
    images: ["spicewood-1", "spicewood-2", "spicewood-3", "spicewood-4"],
    source: "https://txconstruct.com/portfolio_page/custom-home-spicewood-tx/",
    material: "Limestone / metal / concrete",
  },
  {
    slug: "river-hills-ii",
    name: "River Hills II Residence",
    type: "New builds",
    place: "Austin, Texas",
    architect: "Alterstudio",
    subtitle: "An open home in a canopy of trees.",
    description:
      "A modern family home follows a dramatic wooded site. Cantilevered forms, tall windows, and open living areas create connections to the landscape at every turn.",
    detail:
      "Texas Construction Company took over an unfinished project and worked with the owners and architect to bring it to completion. Steel, concrete, and white oak meet in a carefully detailed interior shaped by light and views.",
    images: [
      "river-hills-ii-1",
      "river-hills-ii-2",
      "river-hills-ii-3",
      "river-hills-ii-4",
    ],
    source: "https://txconstruct.com/portfolio_page/river-hills-2-residence/",
    material: "Steel / concrete / white oak",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The project shown after this one ("Next residence"), wrapping around. */
export function nextProject(project: Project): Project {
  return projects[(projects.indexOf(project) + 1) % projects.length];
}

export const projectPath = (project: Pick<Project, "slug">) =>
  `/work/${project.slug}/`;
