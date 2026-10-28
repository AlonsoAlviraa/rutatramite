import { PRODUCT_NAME } from "@/lib/types";

const cols = [
  {
    title: "Trámites",
    links: [
      { href: "/elecciones", label: "Elecciones 29 de noviembre" },
      { href: "/empadronarse", label: "Padrón" },
      { href: "/dni", label: "DNI y pasaporte" },
      { href: "/extranjeria", label: "Extranjería" },
      { href: "/mudanza", label: "Mudanza" },
      { href: "/alquiler", label: "Ayudas al alquiler" },
      { href: "/modelos", label: "Modelos y cartas" },
    ],
  },
  {
    title: "Escuela y familia",
    links: [
      { href: "/colegio", label: "Colegio" },
      { href: "/comedor", label: "Comedor" },
      { href: "/fp", label: "FP" },
      { href: "/bebe", label: "Bebé" },
      { href: "/becas", label: "Becas" },
      { href: "/transporte", label: "Transporte" },
      { href: "/ayudas", label: "Ayudas y plazos" },
    ],
  },
  {
    title: "Sobre RutaTrámite",
    links: [
      { href: "/quienes-somos", label: "Quiénes somos" },
      { href: "/metodologia", label: "Cómo verificamos" },
      { href: "/fuentes", label: "Fuentes" },
      { href: "/recursos", label: "Datos y recursos" },
      { href: "/descargas", label: "Formularios oficiales" },
      { href: "/aviso-legal", label: "Aviso legal" },
      { href: "/privacidad", label: "Privacidad" },
      { href: "/cookies", label: "Política de cookies" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <p className="font-display text-2xl text-mossDark">{PRODUCT_NAME}</p>
        <p className="mt-1 text-sm text-ink/70">Guía independiente. El trámite se hace en la sede oficial.</p>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="rt-kicker">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm leading-relaxed text-ink/70">No somos Administración Pública ni despacho de abogados. No pedimos ni guardamos tu DNI, pasaporte ni documentos.</p>
      </div>
    </footer>
  );
}
