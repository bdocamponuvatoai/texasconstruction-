import { Arrow } from "./icon";
import { SmartLink, type SmartLinkProps } from "./smart-link";

type Props = Omit<SmartLinkProps, "children" | "className"> & { label: string };

/** Underlined link with a diagonal arrow: "Explore our work ↗". */
export function TextLink({ label, ...props }: Props) {
  return (
    <SmartLink className="text-link" {...props}>
      {/* One text node, trailing space included, exactly like the original markup. */}
      {`${label} `}
      <Arrow diagonal />
    </SmartLink>
  );
}
