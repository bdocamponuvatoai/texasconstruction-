import { services } from "@/content/services";
import { TextLink } from "@/components/ui/text-link";

/** Native <details> accordion of services; each links to a preset project brief. */
export function ServiceRows() {
  return (
    <div className="service-rows">
      {services.map(({ number, title, text }, i) => (
        <details key={number} open={i === 0}>
          <summary>
            <span>{number}</span>
            <h3>{title}</h3>
            <span className="detail-plus" aria-hidden="true" />
          </summary>
          <div>
            <p>{text}</p>
            <TextLink
              href={`/contact/?type=${encodeURIComponent(title)}`}
              label="Tell us about your project"
            />
          </div>
        </details>
      ))}
    </div>
  );
}
