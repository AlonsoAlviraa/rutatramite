import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { PageShell } from "@/components/ui/PageShell";
import { DirectorySearch } from "@/components/ui/DirectorySearch";
import type { HubModel } from "@/lib/hub/buildHub";
import { ccaaPath, provinciaPath } from "@/lib/geo/paths";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { ccaaBySlug, loadTerritories } from "@/lib/geo/territories";

export function HubView({
  model,
  ccaaSlug,
  provinceSlug,
}: {
  model: HubModel;
  ccaaSlug: string;
  provinceSlug?: string;
}) {
  const path = provinceSlug ? provinciaPath(ccaaSlug, provinceSlug) : ccaaPath(ccaaSlug);
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Empadronarse", path: "/empadronarse" },
    { name: model.h1.replace(/^Empadronarse en (la provincia de )?/, ""), path },
  ];
  if (provinceSlug) {
    crumbs.splice(2, 0, { name: "Comunidad", path: ccaaPath(ccaaSlug) });
  }
  const top = model.municipios.slice(0, 10);
  const rest = model.municipios.slice(10);
  const dateModified = "2026-09-07";
  const provinces = provinceSlug ? [] : (ccaaBySlug(ccaaSlug)?.province_codes ?? []).map(code => loadTerritories().provinces[code]).filter(Boolean);
  return (
    <PageShell as="article" data-hub={model.kind}>
      <JsonLd
        data={articleJsonLd({
          headline: model.title,
          description: model.description,
          path,
          dateModified,
        })}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-2 font-display text-4xl text-mossDark">{model.h1}</h1>
      <p className="mt-2 text-sm text-ink/70">
        Actualizado <time dateTime={dateModified}>{dateModified}</time>
      </p>
      <p className="mt-4 text-lg leading-relaxed">{model.lead}</p>
      {provinces.length > 0 ? <nav aria-label="Directorios territoriales" className="mt-6">
        <h2 className="font-display text-2xl text-mossDark">Explorar por territorio</h2>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">{provinces.map(province => <li key={province.code}><a className="inline-flex min-h-11 items-center underline underline-offset-4" href={provinciaPath(ccaaSlug, province.slug)}>{province.name}</a></li>)}</ul>
      </nav> : null}
      <DirectorySearch label="Buscar municipio" placeholder="Escribe el nombre del municipio" hint="Busca entre los municipios de este listado." entries={model.municipios.map((m) => ({title: m.name, href: m.path, category: "Ficha de empadronamiento"}))} />
      {model.paragraphs.map((p, i) => (
        <p key={i} className="mt-4 leading-relaxed">
          {p}
        </p>
      ))}
      {top.length > 0 ? (
        <>
          <h2 className="mt-10 font-display text-2xl text-mossDark">Localidades más pobladas del directorio</h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {top.map((m) => (
              <li key={m.ine_code}>
                <a className="inline-flex min-h-11 items-center underline underline-offset-4 px-3 py-1.5" href={m.path}>
                  {m.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className="mt-10 font-display text-2xl text-mossDark">Municipios de este territorio</h2>
          <p>No hay municipios del catálogo INE en este territorio.</p>
        </>
      )}
      {rest.length > 0 ? (
        <>
          <h2 className="mt-8 font-display text-2xl text-mossDark">Otras localidades disponibles</h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {rest.map((m) => (
              <li key={m.ine_code}>
                <a className="inline-flex min-h-11 items-center underline underline-offset-4 px-3 py-1.5" href={m.path}>
                  {m.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <p className="mt-6 text-sm">
        <a className="font-semibold underline decoration-sand underline-offset-2" href="/empadronarse">
          Guía nacional de empadronarse
        </a>
      </p>
      <footer className="mt-12 border-t border-sand pt-6">
        <Disclaimer />
      </footer>
    </PageShell>
  );
}
