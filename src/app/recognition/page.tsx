import Image from "next/image";
import { site } from "@/config/site";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/metadata";
import { ContactCallout } from "@/components/sections/contact-callout";
import { PageHeading } from "@/components/sections/page-heading";
import { RecognitionList } from "@/components/sections/recognition-list";
import { TextLink } from "@/components/ui/text-link";

const heroImage = images["turner-ranch-2"];

export const metadata = pageMetadata({
  title: "Press & Recognition",
  path: "/recognition/",
  image: heroImage,
});

export default function RecognitionPage() {
  return (
    <main id="main">
      <PageHeading
        label="PRESS / RECOGNITION / IDEAS"
        title={["The work", "speaks for itself."]}
        intro={[
          "A selection of stories and recognition",
          "from the wider design community.",
        ]}
      />
      <div className="wrap recognition-hero">
        <Image
          src={heroImage}
          alt="Turner Ranch Residence interior with timber framing"
          loading="eager"
        />
        <div>
          <span className="label">FEATURED RESIDENCE</span>
          <h2>
            Room for
            <br />a creative life.
          </h2>
          <p>
            Turner Ranch brings art, music, and the Hill Country landscape into
            one carefully crafted space.
          </p>
          <TextLink href="/work/turner-ranch/" label="Explore the residence" />
        </div>
      </div>
      <section className="wrap recognition-page">
        <RecognitionList full />
        <TextLink
          href={site.pressArchive}
          label="See the complete press archive"
          target="_blank"
          rel="noreferrer"
        />
      </section>
      <ContactCallout />
    </main>
  );
}
