"use client";

import { useState } from "react";
import { projects, projectTypes, type ProjectType } from "@/content/projects";
import { pad2 } from "@/lib/format";
import { ProjectCard } from "./project-card";

const ALL = "All projects";
type Filter = typeof ALL | ProjectType;
const filters: Filter[] = [ALL, ...projectTypes];

const matching = (filter: Filter) =>
  filter === ALL ? projects : projects.filter((p) => p.type === filter);

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>(ALL);
  const filtered = matching(filter);
  return (
    <div className="wrap portfolio">
      <div className="portfolio-bar">
        <div className="filter-list" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
            >
              {f}
              <span>{matching(f).length}</span>
            </button>
          ))}
        </div>
        <p className="project-count" role="status">
          {pad2(filtered.length)} residences
        </p>
      </div>
      <div className="portfolio-grid">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
        ))}
      </div>
    </div>
  );
}
