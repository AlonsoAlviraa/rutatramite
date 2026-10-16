import type { ReactNode } from "react";

/** Answer-first block for GEO citability (AutoGEO / hub templates). Visible SSR text. */
export function GeoLead({ children }: { children: ReactNode }) {
  return (
    <p className="geo-lead mt-4 text-lg leading-relaxed" data-geo-lead="">
      {children}
    </p>
  );
}
