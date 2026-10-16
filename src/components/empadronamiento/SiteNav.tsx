"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { href: "/#tramites", label: "Explorar trámites" },
  { href: "/elecciones", label: "Elecciones" },
  { href: "/empadronarse", label: "Padrón" },
  { href: "/dni", label: "DNI y pasaporte" },
  { href: "/transporte", label: "Transporte" },
  { href: "/modelos", label: "Modelos" },
  { href: "/ayudas", label: "Ayudas y plazos" },
  { href: "/alquiler", label: "Alquiler" },
  { href: "/extranjeria", label: "Extranjería" },
  { href: "/becas", label: "Becas" },
] as const;

export const NAV_MOBILE_LINKS = [
  { href: "/mudanza", label: "Mudanza" },
  { href: "/colegio", label: "Colegio" },
  { href: "/comedor", label: "Comedor" },
  { href: "/fp", label: "FP" },
  { href: "/bebe", label: "Bebé" },
] as const;

const PADRON_CTA = { href: "/#asistente", label: "Asistente de padrón" } as const;
const EXPLORE_CTA = { href: "/#tramites", label: "Explorar trámites" } as const;

export function navCallToAction(pathname: string | null): { href: string; label: string } {
  const onPadron = pathname == null || pathname === "/empadronarse" || pathname.startsWith("/empadronarse/");
  return onPadron ? PADRON_CTA : EXPLORE_CTA;
}

export function SiteNav({ pathname: pathnameOverride }: { pathname?: string | null }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const routedPathname = usePathname();
  const pathname = pathnameOverride !== undefined ? pathnameOverride : routedPathname;
  const cta = navCallToAction(pathname);
  // globals.css sets .site-nav a { display:inline-flex }, so the desktop hide needs !important.
  const closeOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !open) return;
    event.preventDefault();
    setOpen(false);
    toggleRef.current?.focus();
  };
  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="nav-toggle inline-flex min-h-11 items-center rounded border border-sand bg-white px-3 py-2 font-semibold min-[1000px]:hidden"
        aria-expanded={open}
        aria-controls="nav-principal"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={closeOnEscape}
      >
        {open ? "Cerrar" : "Menú"}
      </button>
      <nav
        id="nav-principal"
        className={
          open
            ? "site-nav is-open flex w-full min-w-0 flex-col flex-wrap items-stretch gap-0 border-t border-sand py-3 min-[1000px]:w-auto min-[1000px]:flex-row min-[1000px]:items-center min-[1000px]:justify-end min-[1000px]:!gap-x-3 min-[1000px]:border-0 min-[1000px]:py-0"
            : "site-nav hidden min-w-0 flex-wrap min-[1000px]:flex min-[1000px]:items-center min-[1000px]:justify-end min-[1000px]:!gap-x-3"
        }
        aria-label="Secciones"
        onKeyDown={closeOnEscape}
      >
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        {NAV_MOBILE_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="nav-mobile-only min-[1000px]:!hidden"
            aria-current={pathname === l.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a className="nav-cta" href={cta.href} onClick={() => setOpen(false)}>
          {cta.label}
        </a>
      </nav>
    </>
  );
}
