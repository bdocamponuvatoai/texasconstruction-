import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/text-link";

type Props = {
  index: string;
  label: string;
  title: [string, string];
  link: { href: string; label: string };
};

/** Home page section header: numbered label, two-line title, link on the right. */
export function SectionHeading({ index, label, title, link }: Props) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow index={index} text={label} />
        <h2>
          {title[0]}
          <br />
          {title[1]}
        </h2>
      </div>
      <TextLink href={link.href} label={link.label} />
    </div>
  );
}
