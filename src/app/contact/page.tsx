import { Suspense } from "react";
import { contact } from "@/config/site";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { ProjectBrief } from "@/components/contact/project-brief";
import { ProjectBriefFromUrl } from "@/components/contact/project-brief-from-url";
import { Arrow } from "@/components/ui/icon";
import { TextLink } from "@/components/ui/text-link";

export const metadata = pageMetadata({
  title: "Start a Conversation",
  path: "/contact/",
});

const projectNames = Object.fromEntries(projects.map((p) => [p.slug, p.name]));

export default function ContactPage() {
  return (
    <main id="main">
      <section className="wrap contact-page">
        <aside>
          <p className="label">START A CONVERSATION</p>
          <h1>
            Every home
            <br />
            begins with
            <br />
            <span>an idea.</span>
          </h1>
          <p>
            We’d like to hear yours. Tell us what you have in mind, or get in
            touch directly.
          </p>
          <div className="contact-direct">
            <a href={`tel:${contact.tel}`}>
              {contact.phone} <Arrow diagonal />
            </a>
            <a href={`mailto:${contact.email}`}>
              {contact.email} <Arrow diagonal />
            </a>
          </div>
          <div className="contact-location">
            <span className="label">OUR OFFICE</span>
            <address>
              {contact.address.street}
              <br />
              {contact.city}
            </address>
            <p>{contact.hours}</p>
            <TextLink
              href={contact.directionsUrl}
              label="Get directions"
              target="_blank"
              rel="noreferrer"
            />
          </div>
          <p className="contact-small">
            This is a design preview. The project brief opens your email app for
            you to review and send; it does not send automatically.
          </p>
        </aside>
        {/* The static HTML carries the plain form; presets apply after hydration. */}
        <Suspense fallback={<ProjectBrief />}>
          <ProjectBriefFromUrl projectNames={projectNames} />
        </Suspense>
      </section>
    </main>
  );
}
