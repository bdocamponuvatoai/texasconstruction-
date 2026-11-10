import Image from "next/image";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/metadata";
import { ContactCallout } from "@/components/sections/contact-callout";
import { PageHeading } from "@/components/sections/page-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { TextLink } from "@/components/ui/text-link";

const heroImage = images["about-1"];

export const metadata = pageMetadata({
  title: "Our Company",
  path: "/about/",
  image: heroImage,
});

export default function AboutPage() {
  return (
    <main id="main">
      <PageHeading
        label="TEXAS CONSTRUCTION COMPANY / AUSTIN, TEXAS"
        title={["A shared vision.", "A considered craft."]}
        intro={[
          "Residential construction shaped by collaboration.",
          "A company rooted in Austin.",
        ]}
      />
      <div className="about-office">
        <Image
          src={heroImage}
          alt="Texas Construction Company office building"
          loading="eager"
        />
      </div>
      <section className="wrap about-copy">
        <div>
          <p className="label">THE COMPANY</p>
          <h2>
            Design-minded.
            <br />
            Detail-driven.
          </h2>
        </div>
        <div>
          <p>
            Texas Construction Company specializes in new home construction and
            major residential remodeling. The team works closely with architects
            and homeowners, contributing practical insight during design and
            craftsmanship during construction.
          </p>
          <p>
            Projects have appeared in regional and national publications and on
            AIA home tours. At the heart of the work is a commitment to
            understanding the people, place, and purpose behind each home.
          </p>
        </div>
      </section>
      <section className="wrap founder">
        <Image
          src={images["about-3"]}
          alt="Royce Flournoy, president of Texas Construction Company"
        />
        <div>
          <p className="label">MEET THE PRESIDENT</p>
          <h2>Royce Flournoy</h2>
          <p>
            Royce brings a maker’s curiosity to residential construction. His
            approach centers on collaboration, materials, and solving the
            challenges that connect a design idea to a built home.
          </p>
          <TextLink href="/contact/" label="Start a conversation" />
        </div>
      </section>
      <section className="wrap careers-strip">
        <div>
          <p className="label">BUILD WITH US</p>
          <h2>
            Good work starts
            <br />
            with good people.
          </h2>
        </div>
        <ButtonLink href="/careers/" label="Explore careers" diagonal />
      </section>
      <ContactCallout />
    </main>
  );
}
