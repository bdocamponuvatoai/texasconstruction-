import { Cross } from "@/components/ui/icon";

type Props = {
  label: string;
  /** Two lines; the second is set in the accent style. */
  title: [string, string];
  /** Two lines of intro copy. */
  intro: [string, string];
};

/** Inner-page heading: label, two-line title, two-line intro and a cross mark. */
export function PageHeading({ label, title, intro }: Props) {
  return (
    <section className="page-heading wrap">
      <p className="label">{label}</p>
      <h1>
        {title[0]}
        <br />
        <span>{title[1]}</span>
      </h1>
      <div className="page-intro">
        <p>
          {intro[0]}
          <br />
          {intro[1]}
        </p>
        <Cross />
      </div>
    </section>
  );
}
