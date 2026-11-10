type RecognitionItem = {
  year: string;
  publication: string;
  title: string;
  description: string;
  url: string;
  type: "Recognition" | "In print";
};

export const recognition: RecognitionItem[] = [
  {
    year: "2026",
    publication: "Austin Home",
    title: "Best Builders",
    description:
      "Texas Construction Company is included in Austin Home’s 2026 Best Builders recognition, as reported on the company’s website.",
    url: "https://txconstruct.com/press/",
    type: "Recognition",
  },
  {
    year: "2026",
    publication: "Fine Homebuilding",
    title: "A new view of the bungalow.",
    description:
      "The New York Residence appears in the April–May issue, exploring an East Austin home designed by Elizabeth Baird Architecture & Design.",
    url: "https://www.finehomebuilding.com/digitalissue/561641",
    type: "In print",
  },
  {
    year: "2026",
    publication: "Design Cost Data",
    title: "A creative home in the landscape.",
    description:
      "The March–April issue features Turner Ranch and its spaces for art, music, and connection to the land.",
    url: "https://txconstruct.com/press/",
    type: "In print",
  },
  {
    year: "2025",
    publication: "HBA Greater Austin",
    title: "Whole-home renovation, recognized.",
    description:
      "The company reports a 2025 MAX Award for the Long Champ Residence in the Whole House Renovation category.",
    url: "https://txconstruct.com/press/",
    type: "Recognition",
  },
];
