import Image from "next/image";
import { notFound } from "next/navigation";
import { images } from "@/content/images";
import {
  getProject,
  nextProject,
  projectPath,
  projects,
} from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { ProjectGallery } from "@/components/project/project-gallery";
import { ContactCallout } from "@/components/sections/contact-callout";
import { Arrow } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";
import { TextLink } from "@/components/ui/text-link";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return pageMetadata({
    title: project.name,
    path: projectPath(project),
    description: project.description,
    image: images[project.images[0]],
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = nextProject(project);
  return (
    <main id="main">
      <section className="project-heading wrap">
        <SmartLink href="/work/" className="back-link">
          <Arrow left /> All projects
        </SmartLink>
        <div>
          <p className="label">
            {project.type} / {project.place}
          </p>
          <h1>{project.name}</h1>
          <p className="project-subtitle">{project.subtitle}</p>
        </div>
        <div className="project-facts">
          <div>
            <span className="label">ARCHITECT</span>
            <p>{project.architect}</p>
          </div>
          <div>
            <span className="label">MATERIAL NOTES</span>
            <p>{project.material}</p>
          </div>
          <div>
            <span className="label">CONSTRUCTION</span>
            <p>Texas Construction Company</p>
          </div>
        </div>
      </section>
      <div className="wrap project-lead-image">
        <Image
          src={images[project.images[0]]}
          alt={project.name}
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <section className="wrap project-story">
        <p className="label">THE IDEA, REALIZED</p>
        <div>
          <h2>{project.subtitle}</h2>
          <div className="story-columns">
            <p>{project.description}</p>
            <p>{project.detail}</p>
          </div>
        </div>
      </section>
      <section className="wrap project-gallery-section">
        <div className="gallery-heading">
          <p className="label">A CLOSER LOOK</p>
          <span>SELECT A PHOTOGRAPH TO EXPLORE</span>
        </div>
        <ProjectGallery project={project} />
        <p className="photo-credit">
          {"Project information and photography via "}
          <a href={project.source} target="_blank" rel="noreferrer">
            Texas Construction Company’s original project page
          </a>
          . Architectural credits retained.
        </p>
      </section>
      <section className="wrap project-next">
        <div>
          <span className="label">THINKING ABOUT YOUR OWN PROJECT?</span>
          <TextLink
            href={`/contact/?project=${project.slug}`}
            label="Start a conversation"
          />
        </div>
        <SmartLink className="next-project-link" href={projectPath(next)}>
          <span className="label">NEXT RESIDENCE</span>
          <h2>
            {next.name} <Arrow />
          </h2>
        </SmartLink>
      </section>
      <ContactCallout />
    </main>
  );
}
