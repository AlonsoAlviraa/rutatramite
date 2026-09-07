import { SiteNav } from "@/components/empadronamiento/SiteNav";
import { PRODUCT_NAME } from "@/lib/types";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <a href="/" className="brand-lockup font-display text-xl">
          <span>{PRODUCT_NAME}<span className="brand-kicker">Guía ciudadana independiente</span></span>
        </a>
        <SiteNav />
      </div>
    </header>
  );
}
