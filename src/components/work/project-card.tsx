import Image from "next/image";
import { images } from "@/content/images";
import { projectPath, type Project } from "@/content/projects";
import { pad2 } from "@/lib/format";
import { Arrow } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";

/** Project thumbnail card, used on the home page and in the portfolio. */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <SmartLink className="project-card" href={projectPath(project)}>
      <div className="project-picture">
        <Image
          src={images[project.images[0]]}
          alt={project.name + " — " + project.subtitle}
        />
        <span className="project-view">
          View residence <Arrow diagonal />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <span className="label">
            {project.type} <span>/</span> {project.place}
          </span>
          <h3>{project.name}</h3>
        </div>
        <span className="project-no">{pad2(index + 1)}</span>
      </div>
    </SmartLink>
  );
}
