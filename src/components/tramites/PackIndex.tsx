import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { PackCard } from "@/components/ui/PackCard";
import { PageShell } from "@/components/ui/PageShell";
import { DirectorySearch } from "@/components/ui/DirectorySearch";
import { GeoLead } from "@/components/ui/GeoLead";
import { guidesByPack } from "@/lib/tramites/catalog";
import { DISCLAIMER_GENERICO } from "@/lib/tramites/facts";
import { PACK_INDEX_PATH, type GuidePack } from "@/lib/tramites/types";

const titles: Record<GuidePack, { h1: string; lead: string }> = {
  viaje: {
    h1: "DNI y pasaporte",
    lead: "Cita oficial en citapreviadnie.es. La cita es gratuita. Tasas 2026: DNI 12 €, pasaporte 30 €. No somos Policía.",
  },
  mudanza: {
    h1: "Me he mudado",
    lead: "Qué documentos actualizar tras una mudanza: padrón, domicilio del DNI y modelo 030.",
  },
  extranjeria: {
    h1: "Extranjería",
    lead: "Correos, Mercurio, TIE, NIE, arraigo RD 1155/2024 y autorización de regreso. Solo sedes oficiales.",
  },
  colegio: {
    h1: "Colegio: matrícula y cambios de centro",
    lead: "Consulta cómo solicitar un cambio de colegio, preparar documentos de secretaría y presentar autorizaciones. La admisión y la asignación de centro se tramitan ante la administración educativa correspondiente.",
  },
  comedor: {
    h1: "Comedor escolar y beca comedor",
    lead: "Beca fuera de plazo, impago, alergias (qué papel pide el centro) e IES sin comedor. Cada comunidad manda: contrasta su sede educativa.",
  },
  fp: {
    h1: "Formación Profesional: matrícula y papeles",
    lead: "Admisión en FP, consulta de vacantes, convalidaciones y becas. Comprueba el calendario y las plazas disponibles en la sede educativa de tu comunidad.",
  },
  bebe: {
    h1: "Bebé: registro civil, tarjeta sanitaria y cartilla",
    lead: "Documentación del recién nacido: Registro Civil, Seguridad Social, tarjeta sanitaria, padrón y cartilla de vacunación.",
  },
  becas: {
    h1: "Becas: MEC, autonómicas y municipales",
    lead: "Guías sobre la beca MEC y ayudas autonómicas: solicitud, estado, cobro y devolución. Comprueba el curso y el plazo de cada convocatoria en su sede oficial.",
  },
  modelos: {
    h1: "Modelos y cartas para copiar",
    lead: "Baja voluntaria, finiquito, padrón, alquiler y colegio: textos para entregar hoy. No somos Administración ni despacho. Adapta el modelo a tu convenio y a la sede oficial.",
  },
};

export function PackIndex({ pack, focus }: { pack: GuidePack; focus?: "pasaporte" }) {
  const passport = pack === "viaje" && focus === "pasaporte";
  const t = passport ? {
    h1: "Pasaporte: cita, documentos y renovación",
    lead: "Encuentra cómo pedir cita, preparar los documentos y renovar el pasaporte. Consulta también los requisitos para menores y qué hacer ante un viaje próximo o una pérdida en el extranjero.",
  } : titles[pack];
  const guides = guidesByPack(pack).filter((guide) => !passport ||
    guide.path.startsWith("/pasaporte/") ||
    ["/dni/primera-expedicion-menor", "/dni/misma-cita-pasaporte", "/dni/checklist"].includes(guide.path));
  return (
    <PageShell as="article" wide data-pack-index={pack}>
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: t.h1, path: passport ? "/pasaporte" : PACK_INDEX_PATH[pack] },
        ]}
      />
      <h1 className="mt-2 font-display text-4xl text-mossDark">{t.h1}</h1>
      <GeoLead>{t.lead}</GeoLead>
      <DirectorySearch label="Buscar en esta categoría" placeholder="Escribe el trámite o documento" hint={`Busca entre las ${guides.length} guías de esta categoría.`} entries={guides.map((g) => ({ title: g.h1, href: g.path, category: t.h1 }))} />
      <div className="topic-directory" data-pack-grid="">
        {guides.map((g) => (
          <PackCard key={g.path} href={g.path} title={g.h1} blurb={g.lead} headingLevel="h2" />
        ))}
      </div>
      {pack === "viaje" ? (
        <p className="mt-8 text-sm">
          También:{" "}
          <a className="underline decoration-sand underline-offset-2" href="/dni/cambio-domicilio">
            cambio de domicilio en el DNI
          </a>
          {" · "}
          <a className="underline decoration-sand underline-offset-2" href={passport ? "/dni" : "/pasaporte"}>
            {passport ? "DNI y pasaporte" : "pasaporte"}
          </a>
          .
        </p>
      ) : null}
      {pack === "becas" ? (
        <p className="mt-8 text-sm">
          Las guías pueden describir convocatorias cerradas. Revisa el año académico y los avisos del organismo antes de presentar una solicitud.
        </p>
      ) : null}
      <p className="mt-8 text-sm">
        Otras categorías:{" "}
        <a className="underline decoration-sand underline-offset-2" href="/empadronarse">
          padrón
        </a>
        {" · "}
        <a className="underline decoration-sand underline-offset-2" href="/dni">
          DNI
        </a>
        {" · "}
        <a className="underline decoration-sand underline-offset-2" href="/extranjeria">
          extranjería
        </a>
        {" · "}
        <a className="underline decoration-sand underline-offset-2" href="/modelos">
          modelos
        </a>
        .
      </p>
      <footer className="mt-12 border-t border-sand pt-6">
        <Disclaimer text={DISCLAIMER_GENERICO} />
      </footer>
    </PageShell>
  );
}
