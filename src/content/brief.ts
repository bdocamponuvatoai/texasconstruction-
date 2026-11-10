import { services } from "./services";

/** "What are you considering?" options. The first three mirror the services. */
export const briefTypes = [...services.map((s) => s.title), "Still exploring"];
export const defaultBriefType = "Still exploring";

export const briefStages = [
  "Early ideas",
  "Have a property",
  "Working with an architect",
  "Plans ready to discuss",
];

export const briefDownloadName = "texas-construction-project-brief.txt";
