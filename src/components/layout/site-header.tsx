"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { contact, contactNav, mainNav } from "@/config/site";
import { Logo } from "@/components/ui/brand";
import { Arrow } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";

/** Matches the CSS breakpoint above which the mobile menu is hidden. */
const DESKTOP_QUERY = "(min-width: 901px)";

const withoutTrailingSlash = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

function isCurrent(pathname: string, href: string) {
  const path = withoutTrailingSlash(pathname);
  const section = withoutTrailingSlash(href);
  return path === section || path.startsWith(`${section}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so it is closed again
  // after any navigation without an effect.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOnPath(null);
      toggle.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onResize = () => {
      if (desktop.matches) setOpenOnPath(null);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  // A link to the page you're already on doesn't change the pathname.
  const closeOnLinkClick = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as Element).closest("a")) setOpenOnPath(null);
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {mainNav.map(({ href, label }) => (
              <SmartLink
                key={href}
                href={href}
                aria-current={isCurrent(pathname, href) ? "page" : undefined}
              >
                {label}
              </SmartLink>
            ))}
          </nav>
          <SmartLink className="header-contact" href={contactNav.href}>
            {`${contactNav.label} `}
            <Arrow diagonal />
          </SmartLink>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            onClick={() => setOpenOnPath(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className={open ? "menu-lines active" : "menu-lines"} />
          </button>
        </div>
        {open && (
          <nav
            className="mobile-nav"
            id="mobile-menu"
            aria-label="Mobile navigation"
            onClick={closeOnLinkClick}
          >
            {[...mainNav, contactNav].map(({ href, label }) => (
              <SmartLink key={href} href={href}>
                {`${label} `}
                <Arrow />
              </SmartLink>
            ))}
            <a href={`tel:${contact.tel}`}>{contact.phone}</a>
          </nav>
        )}
      </header>
    </>
  );
}
