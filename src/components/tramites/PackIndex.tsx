import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { AidCalendar } from "@/components/tramites/AidCalendar";
import { DocumentFees } from "@/components/tramites/DocumentFees";
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

/** Shared document heading for the hubs whose title and H1 must match. */
export const PACK_DOCUMENT_HEADINGS = {
  viaje: "DNI y pasaporte: cita previa, tasas 2026 y documentos",
  pasaporte: "Pasaporte 2026: cita, urgente, tasa 30 €",
  becas: "Becas 2026-27: MEC, autonómicas y municipales",
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
    h1: "Elecciones del 29 de noviembre de 2026",
    lead: "Voto por correo, calendario del Real Decreto 806/2026, coaliciones, la huelga anunciada por los sindicatos y quién figura en el censo. Las fechas salen del BOE, de Interior y de Correos.",
  },
  modelos: {
    h1: "Modelos y cartas para copiar",
    lead: "Baja voluntaria, finiquito, padrón, alquiler y colegio: modelos orientativos para preparar tu escrito. Comprueba el destinatario, el plazo y si existe un formulario obligatorio. No somos Administración ni despacho.",
  },
};

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
      {pack === "viaje" && <DocumentFees passport={passport} />}
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
      {pack === "becas" ? (
        <p className="mt-4 text-sm">
          <a className="underline" href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-9261">BOE: beca general desde el 7 de abril de 2026</a>
          {" · "}
          <a className="underline" href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-16327">BOE: prórroga hasta el 19 de mayo de 2026 a las 15:00</a>
          {" · "}
          <a className="underline" href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-24454">BOE: 2.111 becas de colaboración de 2.000 €</a>
        </p>
      ) : null}
      {pack === "transporte" ? (
        <div className="mt-6 space-y-4 rounded-lg border border-sand bg-warmWhite/60 p-5 text-sm leading-relaxed">
          <h2 className="text-xl font-semibold text-mossDark">
            Guía general sobre títulos bonificados y abonos jóvenes en España
          </h2>
          <p>
            Las comunidades autónomas y los principales consorcios metropolitanos de transporte gestionan títulos
            específicos dirigidos a menores, estudiantes y familias, con bonificaciones que van desde la gratuidad
            total hasta descuentos del 50% al 70% sobre las tarifas ordinarias:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>T-16 (Cataluña / ATM Barcelona):</strong> Tarjeta personalizada que permite a los menores entre
              4 y 16 años viajar de forma completamente gratuita e ilimitada en la red de transporte público integrada
              del área de residencia. Requiere solicitud previa y acreditación mediante DNI/NIE o libro de familia.
            </li>
            <li>
              <strong>Abono Transporte Joven (Comunidad de Madrid / CRTM):</strong> Tarifa plana reducida para jóvenes de
              hasta 26 años con validez para desplazarse por todas las zonas tarifarias (A hasta E2), incluyendo Metro,
              Cercanías Renfe y autobuses urbanos e interurbanos.
            </li>
            <li>
              <strong>Tarjeta Tuin y Gazte (Euskadi):</strong> Títulos personalizados de los consorcios de Bizkaia
              (Barik), Gipuzkoa (Mugi) y Álava (BAT) con descuentos progresivos por uso y tramos especiales para menores y
              jóvenes.
            </li>
            <li>
              <strong>Tarjeta Joven de Transporte (Andalucía):</strong> Descuentos de al menos el 50% sobre el billete
              sencillo para menores de 30 años en las áreas metropolitanas andaluzas.
            </li>
          </ul>
          <p>
            Para tramitar cualquiera de estos títulos es indispensable estar empadronado en el municipio o comunidad
            correspondiente y disponer de un documento de identificación en vigor. Consulta a continuación las guías
            específicas paso a paso:
          </p>
        </div>
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
