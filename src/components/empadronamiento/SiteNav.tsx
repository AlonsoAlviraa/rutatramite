"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { href: "/#tramites", label: "Explorar trámites" },
  { href: "/empadronarse", label: "Padrón" },
  { href: "/dni", label: "DNI y pasaporte" },
  { href: "/modelos", label: "Modelos" },
  { href: "/metodologia", label: "Cómo verificamos" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
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
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="nav-principal"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={closeOnEscape}
      >
        {open ? "Cerrar" : "Menú"}
      </button>
      <nav id="nav-principal" className={`site-nav ${open ? "is-open" : ""}`} aria-label="Secciones" onKeyDown={closeOnEscape}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a className="nav-cta" href="/#asistente" onClick={() => setOpen(false)}>
          Mi guía de padrón
        </a>
      </nav>
    </>
  );
}
