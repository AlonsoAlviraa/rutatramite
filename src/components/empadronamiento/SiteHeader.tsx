import { SiteNav } from "@/components/empadronamiento/SiteNav";
import { PRODUCT_NAME } from "@/lib/types";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-sand bg-white">
      <div className="header-inner mx-auto flex min-h-[74px] max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 min-[1000px]:min-h-20">
        <div className="min-w-0">
          <a href="/" aria-label={PRODUCT_NAME} className="brand-lockup font-display text-xl font-bold leading-tight tracking-tight no-underline">
            <span className="flex items-center gap-2">
              <span className="brand-mark inline-flex shrink-0 items-center justify-center" style={{ width: 28, height: 28, backgroundColor: "#1B4332", color: "#FAF7F2" }} aria-hidden="true">R</span>
              <span className="brand-wordmark">
                <span className="brand-ruta" style={{ color: "#252B26" }}>Ruta</span>
                <span className="brand-tramite" style={{ color: "#1B4332" }}>Trámite</span>
              </span>
            </span>
            <span className="brand-kicker mt-1 block text-[0.7rem] font-normal tracking-normal text-ink">Guía ciudadana independiente</span>
          </a>
          <p className="mt-1 text-xs leading-snug text-ink/70" data-header-disclaimer="">No somos la Administración.</p>
        </div>
        <SiteNav />
      </div>
    </header>
  );
}
