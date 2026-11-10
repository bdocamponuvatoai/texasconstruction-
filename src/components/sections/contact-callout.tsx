import { contact, contactNav } from "@/config/site";
import { Arrow, Cross } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";

/** Large "What do you have in mind?" call to action closing most pages. */
export function ContactCallout() {
  return (
    <section className="contact-callout">
      <div className="wrap callout-inner">
        <p className="label">
          <Cross /> A NEW CHAPTER STARTS HERE
        </p>
        <SmartLink href={contactNav.href}>
          <h2>
            What do you
            <br />
            have in mind?
          </h2>
          <span className="callout-arrow">
            <Arrow diagonal />
          </span>
        </SmartLink>
        <div className="callout-bottom">
          <p>
            A new home. A thoughtful transformation.
            <br />
            Let’s explore what’s possible.
          </p>
          <span>
            AUSTIN, TEXAS
            <br />
            {contact.phone}
          </span>
        </div>
      </div>
    </section>
  );
}
