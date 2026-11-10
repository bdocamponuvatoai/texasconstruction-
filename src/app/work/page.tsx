import { pageMetadata } from "@/lib/metadata";
import { ContactCallout } from "@/components/sections/contact-callout";
import { PageHeading } from "@/components/sections/page-heading";
import { Portfolio } from "@/components/work/portfolio";

export const metadata = pageMetadata({ title: "Our Work", path: "/work/" });

export default function WorkPage() {
  return (
    <main id="main">
      <PageHeading
        label="OUR WORK / AUSTIN & THE HILL COUNTRY"
        title={["Places with", "a point of view."]}
        intro={[
          "New homes, considered renovations, and additions.",
          "A selection of the spaces we’ve helped bring to life.",
        ]}
      />
      <Portfolio />
      <ContactCallout />
    </main>
  );
}
