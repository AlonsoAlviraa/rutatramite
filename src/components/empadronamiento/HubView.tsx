import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { GeoLead } from "@/components/ui/GeoLead";
import { PageShell } from "@/components/ui/PageShell";
import { DirectorySearch } from "@/components/ui/DirectorySearch";
import { HUB_REVIEWED_AT, type HubModel } from "@/lib/hub/buildHub";
import { ccaaPath, provinciaPath } from "@/lib/geo/paths";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { ccaaBySlug, loadTerritories } from "@/lib/geo/territories";

const RELATED_ESCENARIOS = [
  { href: "/empadronarse/sin-contrato", label: "Sin contrato" },
  { href: "/empadronarse/con-contrato", label: "Con contrato" },
  { href: "/empadronarse/volante-vs-certificado", label: "Volante y certificado" },
  { href: "/empadronarse/extranjeros-no-ue", label: "Extranjeros no comunitarios" },
] as const;

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
  const region = ccaaBySlug(ccaaSlug);
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Empadronarse", path: "/empadronarse" },
    { name: provinceSlug ? loadTerritories().provinces[region?.province_codes.find(code => loadTerritories().provinces[code]?.slug === provinceSlug) ?? ""]?.name ?? model.h1 : region?.name ?? model.h1, path },
  ];
  if (provinceSlug) {
    crumbs.splice(2, 0, { name: region?.name ?? "Territorio", path: ccaaPath(ccaaSlug) });
  }
  const top = model.municipios.slice(0, 10);
  const rest = model.municipios.slice(10);
  const dateModified = HUB_REVIEWED_AT;
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
        Revisión del directorio: <time dateTime={dateModified}>{dateModified}</time>.
        Esta fecha no actualiza la revisión de los trámites de cada ficha.
      </p>
      <GeoLead>{model.lead}</GeoLead>
      {provinces.length > 0 ? <nav aria-label="Directorios territoriales" className="mt-6">
        <h2 className="font-display text-2xl text-mossDark">Explorar por territorio</h2>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">{provinces.map(province => <li key={province.code}><a className="inline-flex min-h-11 items-center underline underline-offset-4" href={provinciaPath(ccaaSlug, province.slug)}>{province.name}</a></li>)}</ul>
      </nav> : null}
      {model.municipios.length > 0 ? <DirectorySearch label="Buscar municipio" placeholder="Escribe el nombre del municipio" hint="Busca entre los municipios de este listado." entries={model.municipios.map((m) => ({title: m.name, href: m.path, aliases: m.search_alias, category: "Ficha de empadronamiento"}))} /> : null}
      {model.paragraphs.map((p, i) => (
        <p key={i} className="mt-4 leading-relaxed">
          {p}
        </p>
      ))}
      {top.length > 0 ? (
        <>
          <h2 className="mt-10 font-display text-2xl text-mossDark">Localidades por población de referencia</h2>
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
          <p>Aún no hemos incorporado fichas de este territorio a nuestro catálogo.</p>
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
      <h2 className="mt-10 font-display text-2xl text-mossDark">Situaciones frecuentes</h2>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {RELATED_ESCENARIOS.map((item) => (
          <li key={item.href}>
            <a className="underline underline-offset-4" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm">
        Selección parcial de municipios. El orden utiliza las cifras oficiales del INE a
        1 de enero de 2025; no representa población en tiempo real. Consulta las
        <a className="underline" href="/fuentes"> fuentes</a> y la
        <a className="underline" href="/metodologia"> metodología del catálogo</a>.
      </p>
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
