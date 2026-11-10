import logo from "@/assets/images/texas-construction-logo.png";
import { absoluteUrl } from "@/config/deployment";
import { contact, site, social } from "@/config/site";
import { images } from "@/content/images";

function JsonLd({ data }: { data: object }) {
  // Escape "<" so content can never close the script element.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

/** Business details, restricted to facts already shown on the site. */
export function BusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "GeneralContractor",
        name: site.name,
        url: absoluteUrl("/"),
        logo: absoluteUrl(logo.src),
        image: absoluteUrl(images["bouldin-hero"].src),
        description: site.description,
        telephone: contact.tel,
        email: contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address.street,
          addressLocality: contact.address.locality,
          addressRegion: contact.address.region,
          postalCode: contact.address.postalCode,
          addressCountry: "US",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: contact.openingHours.days,
          opens: contact.openingHours.opens,
          closes: contact.openingHours.closes,
        },
        sameAs: social.map((s) => s.href),
      }}
    />
  );
}
