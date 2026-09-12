import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/seo/meta";
import { searchSite } from "@/lib/seo/siteSearch";

export const metadata: Metadata = pageMetadata({
  title: "Buscar trámites y municipios",
  description:
    "Busca guías de trámites y fichas de empadronamiento en RutaTrámite. El trámite se hace en la sede oficial.",
  path: "/buscar",
  index: false,
});

export function BuscarView({ query }: { query: string }) {
  const results = query ? searchSite(query, 25) : [];
  return (
    <PageShell>
      <h1 className="font-display text-4xl text-mossDark">Buscar en RutaTrámite</h1>
      <p className="mt-4 text-lg leading-relaxed" data-geo-lead="">
        Escribe el trámite o el municipio. Los resultados son páginas de esta guía. El expediente se presenta en
        la sede oficial, no aquí.
      </p>
      <form className="directory-search" action="/buscar" method="get" role="search">
        <label htmlFor="buscar-q">¿Qué necesitas resolver?</label>
        <div className="search-field">
          <input id="buscar-q" type="search" name="q" defaultValue={query} placeholder="Prueba «DNI», «becas» o tu municipio" />
        </div>
        <p className="search-hint">
          {query
            ? results.length
              ? `${results.length} ${results.length === 1 ? "resultado" : "resultados"}.`
              : "No hay coincidencias. Prueba con menos palabras o abre una categoría."
            : "Sin JavaScript también funciona: envía el formulario."}
        </p>
      </form>
      {results.length > 0 ? (
        <ul className="directory-results mt-6">
          {results.map((hit) => (
            <li key={hit.href}>
              <a href={hit.href}>
                <span>
                  {hit.title}
                  {hit.category ? <small>{hit.category}</small> : null}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-8 text-sm">
        También: <a className="underline" href="/empadronarse">padrón</a>
        {" · "}
        <a className="underline" href="/dni">DNI</a>
        {" · "}
        <a className="underline" href="/extranjeria">extranjería</a>
        {" · "}
        <a className="underline" href="/becas">becas</a>
      </p>
    </PageShell>
  );
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return <BuscarView query={q.trim()} />;
}
