import { Arrow } from "./icon";
import { SmartLink, type SmartLinkProps } from "./smart-link";

type Props = Omit<SmartLinkProps, "children" | "className"> & {
  label: string;
  /** Diagonal arrow for links that leave the current flow. */
  diagonal?: boolean;
};

/** Solid dark button-style link. */
export function ButtonLink({ label, diagonal = false, ...props }: Props) {
  return (
    <SmartLink className="button" {...props}>
      {`${label} `}
      <Arrow diagonal={diagonal} />
    </SmartLink>
  );
}
