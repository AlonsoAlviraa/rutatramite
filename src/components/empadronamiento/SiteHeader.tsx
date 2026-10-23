import { SiteNav } from "@/components/empadronamiento/SiteNav";
import { PRODUCT_NAME } from "@/lib/types";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-sand bg-white">
      <div className="header-inner mx-auto flex min-h-[74px] max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 min-[1280px]:min-h-20">
        <div className="min-w-0">
          <a href="/" aria-label={PRODUCT_NAME} title="Ir a la portada de RutaTrámite" className="brand-lockup font-display text-xl font-bold leading-tight tracking-tight no-underline" data-brand-home="">
            <span className="flex items-center gap-[10px]">
              <svg className="brand-mark" width="40" height="40" viewBox="0 0 40 40" style={{ width: 40, height: 40 }} aria-hidden="true" focusable="false">
                <rect width="40" height="40" rx="9" fill="#1B4332" />
                <path d="M9 31 C15 25 20 27 24 21 S30 12 33 9" fill="none" stroke="#95D5B2" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.1 4.2" />
                <text x="20" y="28.5" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="25" fontWeight="700" fill="#FAF7F2">R</text>
              </svg>
              <span className="brand-wordmark">
                <span className="brand-ruta" style={{ color: "#252B26" }}>Ruta</span>
                <span className="brand-tramite" style={{ color: "#1B4332" }}>Trámite</span>
                <span className="brand-kicker block text-[0.7rem] font-normal tracking-normal text-ink">Guía ciudadana independiente</span>
              </span>
            </span>
          </a>
          <p className="mt-1 text-xs leading-snug text-ink/70" data-header-disclaimer="">No somos la Administración.</p>
        </div>
        <SiteNav />
      </div>
    </header>
  );
}
