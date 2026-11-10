import { contact, footerNav, site, social } from "@/config/site";
import { Logo } from "@/components/ui/brand";
import { Arrow } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";

// Rendered at build time (static export): rebuild to roll the year over.
const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap footer-top">
        <Logo footer />
        <div className="footer-message">
          Extraordinary homes.
          <br />
          Built together.
        </div>
      </div>
      <div className="wrap footer-grid">
        <div>
          <p className="label">FIND US</p>
          <address>
            {contact.address.street}
            <br />
            {contact.city}
          </address>
          <span className="footer-hours">{contact.hours}</span>
        </div>
        <div>
          <p className="label">LET’S CONNECT</p>
          <a href={`tel:${contact.tel}`}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
        <div>
          <p className="label">EXPLORE</p>
          {footerNav.map(({ href, label }) => (
            <SmartLink key={href} href={href}>
              {label}
            </SmartLink>
          ))}
        </div>
        <div>
          <p className="label">FOLLOW ALONG</p>
          {[
            ...social,
            { label: "Current website", href: site.currentWebsite },
          ].map(({ label, href }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer">
              {`${label} `}
              <Arrow diagonal />
            </a>
          ))}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {year}
          {` ${site.name}`}
        </span>
        <SmartLink href="/privacy/">Privacy & credits</SmartLink>
        <a href="#top">
          {"Back to top "}
          <span className="arrow-up">
            <Arrow />
          </span>
        </a>
      </div>
      <p className="wrap preview-note">
        Private redesign concept by Nuvato. Original logo, project photography,
        and company information sourced from txconstruct.com. Project briefs
        open your email app; this preview does not send enquiries automatically.
      </p>
    </footer>
  );
}
