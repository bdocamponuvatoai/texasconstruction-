import type { ReactNode } from "react";
import { ServiceRows } from "./service-rows";

/** Dark band: intro copy on the left, the services accordion on the right. */
export function ServicesSection({ children }: { children: ReactNode }) {
  return (
    <section className="approach-section">
      <div className="wrap approach-grid">
        <div>{children}</div>
        <ServiceRows />
      </div>
    </section>
  );
}
