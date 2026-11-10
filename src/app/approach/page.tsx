import Image from "next/image";
import { images } from "@/content/images";
import { processSteps } from "@/content/process";
import { pageMetadata } from "@/lib/metadata";
import { ContactCallout } from "@/components/sections/contact-callout";
import { PageHeading } from "@/components/sections/page-heading";
import { ServicesSection } from "@/components/sections/services-section";

const heroImage = images["turner-ranch-3"];

export const metadata = pageMetadata({
  title: "Our Approach",
  path: "/approach/",
  image: heroImage,
});

export default function ApproachPage() {
  return (
    <main id="main">
      <PageHeading
        label="OUR APPROACH / FROM INTENTION TO EXECUTION"
        title={["Built on", "common ground."]}
        intro={[
          "A shared vision. Clear conversations.",
          "Careful decisions at every scale.",
        ]}
      />
      <div className="wide-photo">
        <Image
          src={heroImage}
          alt="Exposed timber and detailed interiors at Turner Ranch Residence"
          loading="eager"
        />
      </div>
      <section className="wrap approach-page-intro">
        <p className="label">THE WAY WE WORK</p>
        <h2>
          Great homes are
          <br />a collective effort.
        </h2>
        <p>
          Our role is to connect design ambition with the realities of
          construction. We work with homeowners, architects, and the wider
          project team to resolve details and carry the design through to the
          finished space.
        </p>
      </section>
      <section className="wrap process-section">
        {processSteps.map(({ number, title, text }) => (
          <div key={number} className="process-row">
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
        <p className="process-note">
          Every project is different. Scope, schedule, and contractual terms are
          agreed directly with the team.
        </p>
      </section>
      <ServicesSection>
        <p className="label">OUR EXPERTISE</p>
        <h2>
          From a fresh start
          <br />
          to a new chapter.
        </h2>
      </ServicesSection>
      <ContactCallout />
    </main>
  );
}
