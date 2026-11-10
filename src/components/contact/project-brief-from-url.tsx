"use client";

import { useSearchParams } from "next/navigation";
import { briefTypes } from "@/content/brief";
import { ProjectBrief } from "./project-brief";

type Props = {
  /** slug → project name, for `?project=` presets. */
  projectNames: Record<string, string>;
};

/**
 * Reads `?type=` and `?project=` presets. Render inside <Suspense> with a plain
 * <ProjectBrief /> fallback so the static HTML still contains the form; the
 * key remounts the form with fresh defaults when the preset changes.
 */
export function ProjectBriefFromUrl({ projectNames }: Props) {
  const params = useSearchParams();
  const type = params.get("type");
  const slug = params.get("project");
  const presetType = type && briefTypes.includes(type) ? type : undefined;
  const presetInspiration = (slug && projectNames[slug]) || "";
  return (
    <ProjectBrief
      key={`${presetType}|${presetInspiration}`}
      presetType={presetType}
      presetInspiration={presetInspiration}
    />
  );
}
