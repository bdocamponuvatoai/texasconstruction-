import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { TextLink } from "@/components/ui/text-link";

export const metadata = pageMetadata({
  title: "Privacy & Credits",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <main id="main" className="wrap legal">
      <p className="label">PRIVACY / CREDITS / PREVIEW DETAILS</p>
      <h1>
        A little
        <br />
        transparency.
      </h1>
      <h2>About this preview</h2>
      <p>
        This private redesign concept was prepared by Nuvato for Texas
        Construction Company. It is not a replacement for the company’s current
        website at txconstruct.com.
      </p>
      <h2>Your project brief</h2>
      <p>
        Form entries remain in this page’s memory. This preview does not store
        them in an application database or automatically send them to the
        business. Refreshing or leaving the page clears the form. Choosing “Open
        in my email app” passes your brief to your email application; you choose
        whether to send it. Downloading a copy saves a text file on your device.
      </p>
      <h2>Photography and branding</h2>
      <p>
        The existing Texas Construction Company logo and project photographs are
        sourced from txconstruct.com. They depict the company’s published
        projects and personnel; no generated project photography has been
        substituted. Architectural credits are shown on individual project
        pages, which link to the original project source. Photography and
        branding remain the property of their respective owners. Public use
        requires confirmation of the applicable rights and credits.
      </p>
      <h2>Company information</h2>
      <p>
        Business details, project facts, and recognition were checked against
        the company’s website in November 2026. Editorial copy and layouts are
        proposed. Contact the company directly to confirm current availability,
        project scope, employment opportunities, and terms.
      </p>
      <h2>Hosting and external links</h2>
      <p>
        The host may process technical access information to deliver and secure
        this private preview. No additional advertising or analytics scripts
        have been added. External websites, map services, and your email
        application operate under their own privacy practices.
      </p>
      <TextLink
        href={site.currentWebsite}
        label="Visit the current website"
        target="_blank"
        rel="noreferrer"
      />
    </main>
  );
}
