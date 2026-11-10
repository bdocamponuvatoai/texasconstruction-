import Image from "next/image";
import { site } from "@/config/site";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/metadata";
import { ContactCallout } from "@/components/sections/contact-callout";
import { PageHeading } from "@/components/sections/page-heading";
import { ButtonLink } from "@/components/ui/button-link";

const heroImage = images["about-2"];

export const metadata = pageMetadata({
  title: "Careers",
  path: "/careers/",
  image: heroImage,
});

export default function CareersPage() {
  return (
    <main id="main">
      <PageHeading
        label="CAREERS / AUSTIN, TEXAS"
        title={["Care about", "what you build."]}
        intro={[
          "Explore opportunities with a team",
          "focused on thoughtful residential construction.",
        ]}
      />
      <section className="wrap careers-layout">
        <Image
          src={heroImage}
          alt="Royce Flournoy on a residential construction site"
          loading="eager"
        />
        <div>
          <p className="label">CONSTRUCTION MANAGEMENT</p>
          <h2>
            Bring your experience
            <br />
            to the next project.
          </h2>
          <p>
            The company’s careers page lists construction management
            opportunities, including a Construction Project Manager position.
            Check the current listing for responsibilities, requirements, and
            application instructions.
          </p>
          <ButtonLink
            href={site.careersPage}
            label="View current opportunities"
            diagonal
            target="_blank"
            rel="noreferrer"
          />
          <p className="fine-print">
            Availability may change. Applications are handled through the
            company’s current careers page.
          </p>
        </div>
      </section>
      <ContactCallout />
    </main>
  );
}
