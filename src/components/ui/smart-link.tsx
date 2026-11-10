import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type SmartLinkProps = ComponentPropsWithoutRef<"a"> & { href: string };

/**
 * Site-relative hrefs ("/…") use next/link for client-side navigation.
 * Everything else (tel:, mailto:, #hash, external) is a plain <a>, with any
 * target/rel passed through unchanged.
 */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
