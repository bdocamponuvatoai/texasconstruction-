import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/texas-construction-logo.png";
import { site } from "@/config/site";

/** The company's original logo, linking home. */
export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`logo${footer ? " logo-footer" : ""}`}
      aria-label={`${site.name} home`}
    >
      <Image src={logo} alt={site.name} loading="eager" />
    </Link>
  );
}
