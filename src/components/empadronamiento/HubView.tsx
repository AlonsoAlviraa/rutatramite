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
import { CIUDADES_AUTONOMAS_PADRON } from "@/lib/hub/ciudadesAutonomas";

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
  const ciudad = !provinceSlug ? CIUDADES_AUTONOMAS_PADRON[ccaaSlug] : undefined;
  const dateModified = ciudad?.reviewedOn ?? model.reviewedAt ?? HUB_REVIEWED_AT;
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
          {ciudad ? (
            <section aria-labelledby="hub-ciudad" className="mt-8" data-hub-ciudad={ccaaSlug}>
              <h2 id="hub-ciudad" className="font-display text-2xl text-mossDark">Cómo empadronarse en {region?.name ?? model.h1}, según su sede oficial</h2>
              <p className="mt-3 leading-relaxed"><strong>Quién lo tramita:</strong> {ciudad.organo}</p>
              <h3 className="mt-4 font-display text-xl text-mossDark">Dónde se pide</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">{ciudad.canales.map((c, i) => <li key={i}>{c}</li>)}</ul>
              <h3 className="mt-4 font-display text-xl text-mossDark">Documentos que pide la sede</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">{ciudad.documentos.map((c, i) => <li key={i}>{c}</li>)}</ul>
              {ciudad.notas.map((n, i) => <p key={i} className="mt-3 leading-relaxed">{n}</p>)}
              <p className="mt-3 text-sm">
                {ciudad.links.map((l, i) => <span key={l.href}>{i ? " · " : ""}<a className="inline-flex min-h-11 items-center underline underline-offset-4" href={l.href} rel="noopener">{l.label}</a></span>)}
                {" "}<span className="text-ink/70">Revisado: <time dateTime={ciudad.reviewedOn}>{ciudad.reviewedOn}</time>. Por Equipo RutaTrámite.</span>
              </p>
            </section>
          ) : null}
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
      {model.verificadas?.length ? (
        <section aria-labelledby="hub-verificadas" className="mt-10">
          <h2 id="hub-verificadas" className="font-display text-2xl text-mossDark">Cómo se empadrona en cada ayuntamiento revisado</h2>
          {model.resumen.map((p, i) => <p key={i} className="mt-3 leading-relaxed">{p}</p>)}
          {model.verificadas.map((c) => (
            <div key={c.path} className="mt-6 break-words">
              <h3 className="font-display text-xl text-mossDark"><a className="underline underline-offset-4" href={c.path}>{c.name}</a></h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li><strong>Canal:</strong> {c.canal}.</li>
                <li><strong>Cita:</strong> {c.cita}.</li>
                <li><strong>Tasa:</strong> {c.tasa}</li>
                {c.oficina ? <li><strong>Oficina:</strong> {c.oficina}</li> : null}
                {c.docs.length ? <li><strong>Documentos:</strong> {c.docs.join(" ")}</li> : null}
                {c.detalle.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
              <p className="mt-2 text-sm">
                {c.links.map((l, i) => <span key={l.href}>{i ? " · " : ""}<a className="inline-flex min-h-11 items-center underline underline-offset-4" href={l.href} rel="noopener">{l.label}</a></span>)}
                {" "}<span className="text-ink/70">Revisado: <time dateTime={c.reviewedOn}>{c.reviewedOn}</time>.</span>
              </p>
            </div>
          ))}
        </section>
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
        <a className="inline-flex min-h-11 items-center font-semibold underline decoration-sand underline-offset-2" href="/empadronarse">
          Guía nacional de empadronarse
        </a>
      </p>
      <footer className="mt-12 border-t border-sand pt-6">
        <Disclaimer />
      </footer>
    </PageShell>
  );
}
