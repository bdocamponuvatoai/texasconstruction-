import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/deployment";
import { staticPaths } from "@/config/site";
import { projectPath, projects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticPaths, ...projects.map(projectPath)].map((path) => ({
    url: absoluteUrl(path),
  }));
}
