import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { AidCalendar } from "@/components/tramites/AidCalendar";
import { DocumentFees } from "@/components/tramites/DocumentFees";
import { DniQuickAnswers } from "@/components/tramites/DniQuickAnswers";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { PackCard } from "@/components/ui/PackCard";
import { PageShell } from "@/components/ui/PageShell";
import { DirectorySearch } from "@/components/ui/DirectorySearch";
import { guidesByPack } from "@/lib/tramites/catalog";
import { DISCLAIMER_GENERICO } from "@/lib/tramites/facts";
import { OfficialCta } from "@/components/empadronamiento/OfficialCta";
import { CITA_DNI_URL, SEDE_AAPP_URL } from "@/lib/tramites/facts";
import { AID_SOURCES } from "@/lib/ayudas";
import { PACK_INDEX_PATH, type GuidePack } from "@/lib/tramites/types";
import { RELATED_LINKS } from "@/lib/seo/relatedLinks";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { AYUDAS_GOBIERNO_NOTE } from "@/lib/tramites/ayudas-por-gobierno";
import { absoluteUrl } from "@/lib/geo/paths";

/** Shared document heading for the hubs whose title and H1 must match. */
export const PACK_DOCUMENT_HEADINGS = {
  viaje: "Precio DNI y pasaporte en España: 12 € y 30 €, cita previa",
  pasaporte: "Cuánto cuesta el pasaporte en España: 30 €, cita y urgente",
  becas: "Beca MEC 2026-27: consultar estado, plazos, cobro y otras becas",
  extranjeria: "Extranjería: citas, documentos y expedientes",
} as const;

const titles: Record<GuidePack, { h1: string; lead: string }> = {
  viaje: {
    h1: PACK_DOCUMENT_HEADINGS.viaje,
    lead: "Cita oficial en citapreviadnie.es. La cita es gratuita. Tasas 2026: DNI 12 €, pasaporte 30 €. No somos Policía.",
  },
  mudanza: {
    h1: "Me he mudado",
    lead: "Qué documentos actualizar tras una mudanza: padrón, domicilio del DNI y modelo 030.",
  },
  extranjeria: {
    h1: PACK_DOCUMENT_HEADINGS.extranjeria,
    lead: "Guías de citas, TIE, NIE, arraigo, regreso y regularización. Comprueba qué operación necesitas: reservar una cita, presentar documentación o consultar un expediente. Cada guía enlaza las fuentes y el canal oficial correspondiente.",
  },
  colegio: {
    h1: "Colegio: matrícula y cambios de centro",
    lead: "Consulta cómo solicitar un cambio de colegio, preparar documentos de secretaría y presentar autorizaciones. La admisión y la asignación de centro se tramitan ante la administración educativa correspondiente.",
  },
  comedor: {
    h1: "Comedor escolar y beca comedor",
    lead: "Ayudas de comedor, dificultades de pago, menús especiales y acceso al servicio. Comprueba la convocatoria y el procedimiento del centro, junto con las normas estatales y autonómicas aplicables.",
  },
  transporte: {
    h1: "Abonos y tarjetas de transporte",
    lead: "T-16 de Barcelona, Abono Joven de Madrid y títulos equivalentes. El comedor escolar está en su propia categoría.",
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
    h1: PACK_DOCUMENT_HEADINGS.becas,
    lead: "Guías sobre la beca MEC y ayudas autonómicas: solicitud, estado, cobro y devolución. Comprueba el curso y el plazo de cada convocatoria en su sede oficial.",
  },
  alquiler: {
    h1: "Ayudas al alquiler: Bono Joven y nuevas convocatorias",
    lead: "Consulta las ayudas de vivienda según tu comunidad: requisitos, plazos y seguimiento. Diferencia el Bono Alquiler Joven del nuevo Plan Estatal de Vivienda 2026-2030.",
  },
  elecciones: {
    h1: "Elecciones del 29 de noviembre de 2026: voto por correo y plazos",
    lead: "Voto por correo, calendario del Real Decreto 806/2026, coaliciones, la huelga anunciada por los sindicatos y quién figura en el censo. Plazos clave: consulta y reclamaciones del censo del 12 al 19 de octubre; solicitud del voto por correo hasta el 19 de noviembre; envío del voto en Correos hasta el 25 de noviembre. Las fechas salen del BOE, de la Junta Electoral Central, de Interior y de Correos.",
  },
  "ayudas-gobierno": {
    h1: "Ayudas del Estado según cada gobierno desde 1996: estudiantes, familias, jóvenes, jubilados, autónomos, parados y dependencia",
    lead: "Respuesta corta: los cuatro gobiernos desde 1996 (Aznar, Zapatero, Rajoy y Sánchez) crearon ayudas estatales y también recortaron o suprimieron otras. Elige tu perfil para ver, en una tabla cronológica, cada cambio con su año y su norma del BOE.",
  },
  trabajo: {
    h1: "Trabajo, paro y prestaciones",
    lead: "Vida laboral, cita del SEPE para el paro e ingreso mínimo vital: qué hacer, en qué web oficial y gratis.",
  },
  modelos: {
    h1: "Modelos y cartas para copiar",
    lead: "Baja voluntaria, finiquito, padrón, alquiler y colegio: modelos orientativos para preparar tu escrito. Comprueba el destinatario, el plazo y si existe un formulario obligatorio. No somos Administración ni despacho.",
  },
};

function RelatedLinks({ path }: { path: string }) {
  const items = (RELATED_LINKS[path] ?? []).map((p) => ALL_GUIDES.find((g) => g.path === p)).filter((g): g is NonNullable<typeof g> => Boolean(g));
  if (!items.length) return null;
  return (
    <nav aria-labelledby="relacionadas-title" className="mt-8" data-related-links="">
      <h2 id="relacionadas-title" className="font-display text-2xl text-mossDark">También te puede servir</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {items.map((g) => (<li key={g.path}><a className="underline" href={g.path}>{g.h1}</a></li>))}
      </ul>
    </nav>
  );
}

export function PackIndex({ pack, focus }: { pack: GuidePack; focus?: "pasaporte" }) {
  const passport = pack === "viaje" && focus === "pasaporte";
  const t = passport ? {
    h1: PACK_DOCUMENT_HEADINGS.pasaporte,
    lead: "Encuentra cómo pedir cita, preparar los documentos y renovar el pasaporte. Consulta también los requisitos para menores y qué hacer ante un viaje próximo o una pérdida en el extranjero.",
  } : titles[pack];
  const sinCita = passport ? guidesByPack("viaje").find((guide) => guide.path === "/pasaporte/caducado-sin-cita") : undefined;
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
      <p className="mt-4 text-lg leading-relaxed">{t.lead}</p>
      {pack === "viaje" ? (
        <div className="mt-6">
          <OfficialCta
            href={CITA_DNI_URL}
            label={passport ? "Consultar cita de pasaporte en citapreviadnie.es" : "Consultar cita del DNI en citapreviadnie.es"}
          />
          {sinCita ? <p className="mt-4"><a className="underline" href={sinCita.path}>{sinCita.h1}</a></p> : null}
        </div>
      ) : null}
      {pack === "extranjeria" ? (
        <div className="mt-6">
          <OfficialCta href={SEDE_AAPP_URL} label="Sede de extranjería" />
        </div>
      ) : null}
      {pack === "viaje" && !passport && <DniQuickAnswers />}
      {pack === "viaje" && <DocumentFees passport={passport} />}
      {passport ? <p className="mt-4 text-sm" data-dni-crosslink=""><a className="underline" href="/dni">Precio del DNI 2026 (12 €) y cómo renovarlo</a> · <a className="underline" href="/dni/cita-previa">Cita previa del DNI y del pasaporte</a></p> : null}
      <RelatedLinks path={passport ? "/pasaporte" : PACK_INDEX_PATH[pack]} />
      {pack === "bebe" ? (
        <>
          <p className="mt-4 text-sm">
            <a className="underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-2011-12628#a46">Ley del Registro Civil, artículos 46 y 47: comunicación en 72 horas y declaración en diez días</a>
          </p>
          <p className="mt-4 text-sm">
            <a className="underline" href="/bebe/calendario-vacunal-por-comunidad">Calendario vacunal según la comunidad</a>
            {" · "}
            <a className="underline" href="/bebe/apoyo-lactancia">Apoyo a la lactancia</a>
          </p>
        </>
      ) : null}
      {pack === "fp" ? (
        <p className="mt-4 text-sm">
          <a className="underline" href="https://www.todofp.es/comunes/faq.html#cla-0-09">TodoFP: la plaza se pide en las fechas de la convocatoria de cada comunidad</a>
          {" · "}
          <a className="underline" href="https://www.todofp.es/sobre-fp/webs-fp-ccaa.html">Webs de FP de las comunidades autónomas</a>
        </p>
      ) : null}
      {pack === "colegio" ? (
        <>
          <p className="mt-4 text-sm">
            <a className="underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a84">LOE, artículo 84: las Administraciones educativas regulan la admisión</a>
          </p>
          <p className="mt-4 text-sm">
            <a className="underline" href="/colegio/escuela-infantil-publica">Escuela infantil pública 0-3: la plaza y el plazo los publica tu comunidad</a>
          </p>
        </>
      ) : null}
      {pack === "comedor" ? (
        <p className="mt-4 text-sm">
          <a className="underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-2025-7659#a1-2">Real Decreto 315/2025, artículo 10: menús especiales</a>
          {" · "}
          <a className="underline" href="/comedor/beca-comedor-2026-2027">Convocatorias seleccionadas 2026/27, no un plazo nacional</a>
        </p>
      ) : null}
      {pack === "alquiler" ? (
        <p className="mt-4 text-sm">
          <a className="underline" href={AID_SOURCES.bono.href}>{AID_SOURCES.bono.label}</a>
          {" · "}
          <a className="underline" href={AID_SOURCES.plan.href}>{AID_SOURCES.plan.label}</a>
        </p>
      ) : null}
      {pack === "ayudas-gobierno" ? (
        <>
          <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: t.h1, itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.h1, url: absoluteUrl(g.path) })) }} />
          <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: "¿Qué gobierno dio más ayudas?", acceptedAnswer: { "@type": "Answer", text: "No hacemos esa valoración. Cada perfil recoge, con el mismo criterio para los cuatro gobiernos, las medidas estatales creadas, cambiadas o suprimidas, con su norma del BOE." } },
            { "@type": "Question", name: "¿Incluye ayudas autonómicas?", acceptedAnswer: { "@type": "Answer", text: "No. Solo normas estatales publicadas en el BOE." } },
          ] }} />
          <p className="mt-4 text-sm" data-neutrality-note="">{AYUDAS_GOBIERNO_NOTE} Revisión editorial <time dateTime="2026-10-12">2026-10-12</time>.</p>
        </>
      ) : null}
      {pack === "elecciones" ? (
        <p className="mt-4 text-sm"><a className="underline" href="/ayudas-por-gobierno">Ayudas del Estado según cada gobierno desde 1996 (informativo, no partidista)</a></p>
      ) : null}
      {pack === "becas" ? (
        <p className="mt-4 text-sm">
          <a className="underline" href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-9261">BOE: beca general desde el 7 de abril de 2026</a>
          {" · "}
          <a className="underline" href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-16327">BOE: prórroga hasta el 19 de mayo de 2026 a las 15:00</a>
          {" · "}
          <a className="underline" href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-24454">BOE: 2.111 becas de colaboración de 2.000 €</a>
        </p>
      ) : null}
      {(pack === "becas" || pack === "alquiler") && <><p className="mt-4"><a className="underline" href="/ayudas">Ver el calendario conjunto de becas y alquiler</a></p><AidCalendar category={pack} /></>}
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
      <footer className="mt-12 border-t border-sand pt-6">
        <Disclaimer text={DISCLAIMER_GENERICO} />
      </footer>
    </PageShell>
  );
}
