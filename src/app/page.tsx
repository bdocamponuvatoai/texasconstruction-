import Image from "next/image";
import { featuredSlugs } from "@/content/hero";
import { images } from "@/content/images";
import { getProject, type Project } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { HeroGallery } from "@/components/home/hero-gallery";
import { ContactCallout } from "@/components/sections/contact-callout";
import { RecognitionList } from "@/components/sections/recognition-list";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServicesSection } from "@/components/sections/services-section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Cross } from "@/components/ui/icon";
import { TextLink } from "@/components/ui/text-link";
import { ProjectCard } from "@/components/work/project-card";

export const metadata = pageMetadata({ path: "/" });

const featured = featuredSlugs
  .map((slug) => getProject(slug))
  .filter((p): p is Project => !!p);

export default function Home() {
  return (
    <main id="main">
      <section className="hero-heading wrap">
        <div className="hero-kicker">
          <span className="label">TEXAS CONSTRUCTION COMPANY</span>
          <span className="label">
            AUSTIN, TX <Cross />
          </span>
        </div>
        <div className="hero-title-row">
          <h1>
            Architecture,
            <br />
            <span>brought to life.</span>
          </h1>
          <div>
            <p>
              Exceptional homes begin with a shared vision. We bring the craft,
              care, and collaboration to build it.
            </p>
            <TextLink href="/work/" label="Explore our work" />
          </div>
        </div>
      </section>
      <HeroGallery />
      <section className="intro wrap">
        <Eyebrow index="01" text="THE COMPANY" />
        <div>
          <h2>
            For the way you live.
            <br />
            For the vision you share.
          </h2>
          <div className="intro-columns">
            <p>
              Texas Construction Company partners with homeowners and architects
              on new homes and major residential transformations in Austin.
            </p>
            <div>
              <p>
                Thoughtful problem solving. A respect for materials. Care in the
                details. This is where an architectural idea becomes a place to
                call home.
              </p>
              <TextLink href="/about/" label="Get to know us" />
            </div>
          </div>
        </div>
      </section>
      <section className="selected-work wrap">
        <SectionHeading
          index="02"
          label="SELECTED RESIDENCES"
          title={["Each home,", "its own story."]}
          link={{ href: "/work/", label: "View all projects" }}
        />
        <div className="selected-grid">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <ServicesSection>
        <Eyebrow index="03" text="WHAT WE BUILD" />
        <h2>
          Good ideas deserve
          <br />a good builder.
        </h2>
        <p className="approach-intro">
          Every project has its own questions. We work alongside your design
          team to find the right way forward.
        </p>
        <TextLink href="/approach/" label="Our approach" />
      </ServicesSection>
      <section className="maker wrap">
        <div className="maker-image">
          <Image
            src={images["about-2"]}
            alt="Royce Flournoy, president of Texas Construction Company, on a construction site"
          />
          <span className="image-note">ROYCE FLOURNOY / PRESIDENT</span>
        </div>
        <div className="maker-copy">
          <Eyebrow index="04" text="THE PEOPLE BEHIND THE WORK" />
          <h2>
            A builder’s mind.
            <br />A maker’s instinct.
          </h2>
          <p>
            Royce Flournoy leads Texas Construction Company with a collaborative
            approach to complex residential projects. His work brings together
            design intent, material knowledge, and the discipline of building.
          </p>
          <p>For us, the relationship is part of the work.</p>
          <TextLink href="/about/" label="Meet Texas Construction" />
        </div>
      </section>
      <section className="recognition-section wrap">
        <SectionHeading
          index="05"
          label="IN GOOD COMPANY"
          title={["Work worth", "a closer look."]}
          link={{ href: "/recognition/", label: "Press & recognition" }}
        />
        <RecognitionList />
      </section>
      <ContactCallout />
    </main>
  );
}
