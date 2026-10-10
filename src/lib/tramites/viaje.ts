import {
  CITA_DNI_URL,
  DISCLAIMER_CITA,
  DNI_RENOVACION_DIAS,
  FOTO_DNI,
  MIDNI_URL,
  SNAPSHOT_ESPERAS,
  TASA_DNI_LABEL,
  TASA_PASAPORTE_LABEL,
  TELEFONO_CITA,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedViaje = [
  { href: "/dni/cita-previa", label: "Cita DNI" },
  { href: "/pasaporte/cita-previa", label: "Cita pasaporte" },
  { href: "/dni/checklist", label: "Checklist y tasas 2026" },
  { href: "/dni/misma-cita-pasaporte", label: "DNI y pasaporte en la misma cita" },
];

const tasasBox: { id: string; title: string; paragraphs: string[]; lists?: string[][] } = {
  id: "tasas",
  title: "Tasas 2026 (documento, no la cita)",
  paragraphs: [
    `Reservar la cita es gratuito. La llamada al ${TELEFONO_CITA} tiene un coste que debes consultar con tu operador. Las tasas vigentes son ${TASA_DNI_LABEL} para el DNI y ${TASA_PASAPORTE_LABEL} para el pasaporte ordinario. Puedes pagarlas en efectivo o con tarjeta en la unidad de documentación, o mediante el pago telemático del portal oficial.`,
    "DNI: están exentos los miembros de familia numerosa que lo acrediten; la renovación de un documento en vigor por cambio de filiación o domicilio; y los menores de 14 años de una unidad de convivencia que solicite el ingreso mínimo vital. Pasaporte: la exención publicada corresponde a miembros de familia numerosa. La pérdida del documento no es por sí sola una exención.",
    "Tasas y exenciones contrastadas con Interior el 7 de septiembre de 2026. Consulta las fuentes al final de esta guía para comprobar cambios posteriores.",
  ],
};

export const VIAJE_GUIDES: Guide[] = ([
  {
    id: "cita-dni",
    pack: "viaje",
    path: "/dni/cita-previa",
    h1: "Cita DNI en citapreviadnie.es: pedir, consultar o anular",
    title: "Cita DNI en citapreviadnie.es: pedir, consultar o anular",
    description: "Pide, consulta o anula tu cita del DNI en citapreviadnie.es o el 060. La reserva es gratuita; tasas: 12 € el DNI y 30 € el pasaporte. Revisa oficina y justificante.",
    lead: `La cita previa de DNI se pide en el portal oficial citapreviadnie.es o llamando al ${TELEFONO_CITA}. No pagues un 807 ni un “hueco mañana”. La cita es gratuita; el DNI cuesta ${TASA_DNI_LABEL} y el pasaporte ${TASA_PASAPORTE_LABEL} (2026). ${SNAPSHOT_ESPERAS}`,
    cta: { href: CITA_DNI_URL, label: "Ir a citapreviadnie.es" },
    secondaryCta: { href: "/dni/checklist", label: "Qué llevar y tasas" },
    related: relatedViaje,
    sections: [
      {
        id: "como",
        title: "Cómo pedir la cita",
        paragraphs: [
          `Entra en citapreviadnie.es, elige provincia y oficina de Policía Nacional, trámite DNI (o DNI y pasaporte) y el hueco. También el ${TELEFONO_CITA}, 24 horas. Guarda el localizador. Si una web te cobra por “gestionar” el mismo formulario, es un clon.`,
          DISCLAIMER_CITA,
        ],
        lists: [
          [
            "Portal: citapreviadnie.es (https://www.citapreviadnie.es/)",
            `Teléfono oficial de cita: ${TELEFONO_CITA}`,
            "No hace falta cuenta de RutaTrámite. No subas el DNI aquí.",
          ],
        ],
      },
      {
        id: "ciudad",
        title: "Cita previa DNI por ciudad",
        paragraphs: [
          "Selecciona la provincia y consulta las oficinas y fechas disponibles en el portal oficial. Puedes comparar otras oficinas si la primera no tiene una fecha adecuada.",
        ],
      },
      tasasBox,
      {
        id: "esperas",
        title: "Disponibilidad de citas",
        paragraphs: [SNAPSHOT_ESPERAS],
      },
    ],
  },
  {
    id: "cita-pasaporte",
    pack: "viaje",
    path: "/pasaporte/cita-previa",
    h1: "Cita previa pasaporte oficial",
    title: "Cita previa pasaporte 2026: citapreviadnie.es",
    description: "Cita de pasaporte en citapreviadnie.es o 060. Cita gratuita. Tasa 2026: pasaporte 30 €, DNI 12 €.",
    lead: `La cita de pasaporte se pide en citapreviadnie.es o en el ${TELEFONO_CITA}, igual que el DNI. Cita gratuita. El pasaporte cuesta ${TASA_PASAPORTE_LABEL} y el DNI ${TASA_DNI_LABEL} (2026). ${SNAPSHOT_ESPERAS}`,
    cta: { href: CITA_DNI_URL, label: "Ir a citapreviadnie.es" },
    related: relatedViaje,
    sections: [
      {
        id: "como",
        title: "Cómo pedir cita de pasaporte",
        paragraphs: [
          "En citapreviadnie.es selecciona Pasaporte, o DNI y pasaporte si necesitas ambos documentos. Elige provincia, oficina y fecha, y conserva la confirmación de la cita.",
          DISCLAIMER_CITA,
        ],
      },
      {
        id: "docs",
        title: "Documentación para la cita",
        paragraphs: [
          `Lleva el DNI en vigor, una fotografía reciente de 32 × 26 mm y el pasaporte anterior si sigue vigente. No necesitas aportar otra foto para el pasaporte si has obtenido o renovado el DNI ese mismo día. La tasa es ${TASA_PASAPORTE_LABEL}, salvo exención.`,
          "Los menores que no tienen DNI porque aún no están obligados pueden solicitar pasaporte con la certificación de nacimiento exigida. Deben acudir personalmente y contar con el consentimiento de todas las personas que ejercen la patria potestad o tutela. Consulta la guía de primera expedición de menores para preparar su documentación.",
        ],
      },
      tasasBox,
    ],
  },
  {
    id: "renovar-dni",
    pack: "viaje",
    path: "/dni/renovar-caducado",
    h1: "Renovar el DNI caducado o a punto de caducar",
    title: "Renovar DNI caducado 2026: 180 días antes, cita y tasa 12 €",
    description: `Puedes renovar el DNI en los últimos ${DNI_RENOVACION_DIAS} días de vigencia. Cita en citapreviadnie.es. Tasa 12 €; pasaporte 30 €.`,
    lead: `Sí se puede renovar el DNI caducado, y también antes de que caduque: en los últimos ${DNI_RENOVACION_DIAS} días de vigencia. No esperes al día 181 después. Cita en citapreviadnie.es. Tasa ${TASA_DNI_LABEL}; si aprovechas para el pasaporte, ${TASA_PASAPORTE_LABEL}.`,
    cta: { href: CITA_DNI_URL, label: "Pedir cita en citapreviadnie.es" },
    related: relatedViaje,
    sections: [
      {
        id: "180",
        title: "La regla de los 180 días",
        paragraphs: [
          `Interior permite solicitar la renovación del DNI dentro de los últimos ${DNI_RENOVACION_DIAS} días de su vigencia. También si está caducado, deteriorado, perdido o robado, o si cambian datos. Caducado no es un limbo: pide cita y lleva el anterior si lo tienes.`,
          "«Renovar dni caducado» y «se puede 180 días antes» son la misma cola. El cuello de botella es la cita, no el derecho a renovar.",
        ],
      },
      {
        id: "viaje",
        title: "Si te caduca con un viaje encima",
        paragraphs: [
          "Dentro de la UE el DNI identifica. Caducado, la compañía o la frontera pueden discutirte el embarque: no lo dejes al azar. Fuera de la UE hace falta pasaporte. Ver DNI caducado para viajar por la UE y pasaporte urgente.",
        ],
      },
      tasasBox,
      {
        id: "cita",
        title: "Dónde se pide",
        paragraphs: [DISCLAIMER_CITA, SNAPSHOT_ESPERAS],
      },
    ],
  },
  {
    id: "misma-cita",
    pack: "viaje",
    path: "/dni/misma-cita-pasaporte",
    h1: "DNI y pasaporte en la misma cita",
    title: "DNI y pasaporte el mismo día: sí se puede, tasas 12 € y 30 €",
    description: "DNI y pasaporte se pueden tramitar en la misma cita en citapreviadnie.es. Cita gratuita. Tasas 12 € y 30 €.",
    lead: `Sí: DNI y pasaporte se pueden hacer en la misma cita si eliges ese trámite en citapreviadnie.es. Mucha gente no lo sabe y quema dos huecos. La cita sigue siendo gratuita; pagas ${TASA_DNI_LABEL} del DNI y ${TASA_PASAPORTE_LABEL} del pasaporte (2026), salvo exención.`,
    cta: { href: CITA_DNI_URL, label: "Pedir cita DNI y pasaporte en citapreviadnie.es" },
    related: relatedViaje,
    sections: [
      {
        id: "como",
        title: "Cómo marcar los dos trámites",
        paragraphs: [
          "En el portal oficial hay un tipo de cita que cubre DNI y pasaporte juntos. No reserves dos citas sueltas “por si acaso”: saturas la cola y te pueden anular. Lleva fotos, tasas de ambos y el DNI anterior.",
          "Si solo hay hueco de DNI, haz el DNI y pregunta en ventanilla si ese día pueden añadir pasaporte. No lo des por hecho. La regla útil es pedir ya la cita conjunta.",
        ],
      },
      tasasBox,
      {
        id: "aviso",
        title: "Qué no es",
        paragraphs: [DISCLAIMER_CITA],
      },
    ],
  },
  {
    id: "menor",
    reviewedAt: "2026-09-07",
    pack: "viaje",
    path: "/dni/primera-expedicion-menor",
    h1: "Primera expedición: DNI o pasaporte de un menor",
    title: "DNI y pasaporte de un niño 2026: primera vez, cita y tasas",
    description: "Primera expedición de DNI o pasaporte de menor. Cita en citapreviadnie.es. Tasas 2026: DNI 12 €, pasaporte 30 €.",
    lead: `El menor debe acudir a la expedición. La documentación y el consentimiento necesarios dependen de si solicitas DNI o pasaporte. Pide cita en citapreviadnie.es. Tasas 2026: DNI ${TASA_DNI_LABEL} y pasaporte ${TASA_PASAPORTE_LABEL}, salvo las exenciones indicadas más abajo.`,
    cta: { href: CITA_DNI_URL, label: "Cita oficial en citapreviadnie.es" },
    related: relatedViaje,
    sections: [
      {
        id: "docs",
        title: "Primera expedición del DNI",
        paragraphs: [
          "Para un menor español residente en España, prepara la certificación literal de nacimiento para DNI, expedida como máximo seis meses antes, y el certificado o volante de padrón de los últimos tres meses. El libro de familia no sustituye estos documentos. Lleva una foto reciente de 32 × 26 mm, de frente y con fondo blanco; algunas unidades pueden tomarla allí.",
          "El Real Decreto 255/2025 prevé recabar electrónicamente los documentos, salvo oposición, y pedirlos si no se pueden obtener. La ficha de Interior sigue detallando qué certificados preparar. Confirma con la unidad qué podrá consultar para tu primera inscripción.",
          "El menor debe acudir con quien ejerza la patria potestad o tutela, o con una persona debidamente apoderada por estas. Consulta el procedimiento oficial de apoderamiento si no puede acompañarlo su representante.",
        ],
      },
      {
        id: "pasaporte",
        title: "Primera expedición del pasaporte",
        paragraphs: [
          "Si el menor tiene DNI, debe estar en vigor. Si no lo tiene porque aún no está obligado, aporta una certificación literal de nacimiento de los últimos seis meses para pasaporte. La mención de finalidad no se exige en certificados electrónicos DICIREG con código personal. Lleva también una foto reciente; no hace falta otra si obtuvo el DNI ese día.",
          "Deben consentir todas las personas que ejercen la patria potestad o tutela. La custodia exclusiva no equivale por sí sola a ejercerla en exclusiva. Identifícate con documentación vigente y acredita parentesco o tutela. El libro de familia puede servir para acreditar el parentesco, no para sustituir cualquier certificado exigido.",
          "El consentimiento puede formalizarse conjuntamente o por separado ante las unidades de documentación; Interior también contempla la vía notarial o consular. Si falta el consentimiento necesario, puede requerirse autorización judicial. Esto es distinto de la autorización para un viaje al extranjero.",
        ],
      },
      tasasBox,
      {
        id: "cita",
        title: "Cita",
        paragraphs: [DISCLAIMER_CITA, SNAPSHOT_ESPERAS],
      },
    ],
  },
  {
    id: "urgente",
    pack: "viaje",
    path: "/pasaporte/urgente",
    h1: "Pasaporte urgente o viaje inminente",
    title: "Pasaporte urgente 2026: casos de urgencia en comisaría",
    description: "Pasaporte urgente: cita en citapreviadnie.es y supuestos de urgencia en comisaría. Tasa 30 €. DNI 12 €.",
    lead: `No existe un botón mágico de “pasaporte en 24 h” en un clon de pago. El cauce es citapreviadnie.es. En supuestos de urgencia (viaje inminente acreditado) algunas unidades de documentación atienden fuera del hueco ordinario: pregúntalo en la comisaría del portal, no en un 807. Tasa del pasaporte ${TASA_PASAPORTE_LABEL}; DNI ${TASA_DNI_LABEL}.`,
    cta: { href: CITA_DNI_URL, label: "Buscar cita en citapreviadnie.es" },
    related: relatedViaje,
    sections: [
      {
        id: "urgencia",
        title: "Qué es un caso de urgencia",
        paragraphs: [
          "Billete, reserva o documentación de un viaje inminente, o una causa grave que Interior acepte. No es “me apetece tenerlo esta semana”. Lleva el justificante. El funcionario decide. Esta guía no finge un derecho a saltarse la cola.",
        ],
      },
      {
        id: "planb",
        title: "Si no hay hueco",
        paragraphs: [
          "Prueba otra oficina de la misma provincia en citapreviadnie.es, el 060, y la pieza de pasaporte caducado + cita llena. No pagues a quien “tiene enchufe”.",
          SNAPSHOT_ESPERAS,
        ],
      },
      tasasBox,
    ],
  },
  {
    id: "checklist",
    pack: "viaje",
    path: "/dni/checklist",
    h1: "Qué llevar a la cita de DNI o pasaporte",
    title: "Qué llevar al DNI o pasaporte 2026: foto 32×26, 12 € y 30 €",
    description: `Foto ${FOTO_DNI}. Tasa DNI 12 €, pasaporte 30 €. Cita en citapreviadnie.es.`,
    lead: `Prepara los documentos según solicites una primera expedición o una renovación. La tasa del DNI es ${TASA_DNI_LABEL} y la del pasaporte ${TASA_PASAPORTE_LABEL}, salvo exención. Puedes reservar cita gratuitamente en citapreviadnie.es.`,
    cta: { href: CITA_DNI_URL, label: "Pedir cita en citapreviadnie.es" },
    related: relatedViaje,
    sections: [
      {
        id: "foto",
        title: "La foto",
        paragraphs: [
          "Prepara una foto reciente de 32 × 26 mm, tomada de frente y con fondo blanco. Para DNI, algunas unidades disponen de captura automatizada; Interior publica las excepciones médicas y religiosas. Para pasaporte, no se exige otra fotografía si has obtenido o renovado el DNI ese mismo día.",
        ],
      },
      {
        id: "llevar",
        title: "Qué llevar",
        lists: [
          [
            "Primera expedición del DNI: certificación de nacimiento para DNI de los últimos seis meses y padrón de los últimos tres meses; confirma la consulta electrónica con la unidad.",
            "Renovación del DNI: lleva el documento anterior. Si cambian domicilio o filiación, consulta los justificantes específicos en Interior.",
            "Pasaporte: DNI vigente y pasaporte anterior si sigue en vigor. Para menores sin DNI por no estar obligados, consulta los requisitos de certificación de nacimiento.",
            `Justificante de tasa o dinero exacto / tarjeta: DNI ${TASA_DNI_LABEL}, pasaporte ${TASA_PASAPORTE_LABEL}`,
            "Localizador de citapreviadnie.es",
            "Menores: presencia del menor. Para pasaporte, consentimiento de todos los titulares de la patria potestad o tutela; revisa la guía de primera expedición.",
          ],
        ],
        paragraphs: [DISCLAIMER_CITA],
      },
      tasasBox,
    ],
  },
  {
    id: "dni-ue",
    pack: "viaje",
    path: "/dni/caducado-viajar-ue",
    h1: "DNI caducado para viajar por la UE: mito y realidad",
    title: "¿Puedo viajar por la UE con el DNI caducado? 2026",
    description: "DNI caducado y viaje Schengen/UE: no lo des por válido. Renueva en citapreviadnie.es. Tasas 12 € / 30 €.",
    lead: `El mito: “en Europa se viaja con el DNI aunque esté caducado”. La realidad: el DNI caducado no es un título fiable de viaje. Compañías y controles pueden rechazarlo. Renueva en citapreviadnie.es (regla de ${DNI_RENOVACION_DIAS} días antes). Tasas 2026: DNI ${TASA_DNI_LABEL}, pasaporte ${TASA_PASAPORTE_LABEL}.`,
    cta: { href: CITA_DNI_URL, label: "Renovar en citapreviadnie.es" },
    related: relatedViaje,
    sections: [
      {
        id: "mito",
        title: "Qué dice la práctica, no el grupo de WhatsApp",
        paragraphs: [
          "Algunos países y algunas compañías han sido flexibles con DNI caducado de nacionales UE en trayectos cortos. Eso no es un derecho que puedas exigir en el mostrador de Barajas. Si el DNI está caducado, el plan A es renovarlo. El plan B es pasaporte en vigor.",
        ],
      },
      tasasBox,
      {
        id: "cita",
        title: "Cita",
        paragraphs: [DISCLAIMER_CITA, SNAPSHOT_ESPERAS],
      },
    ],
  },
  {
    id: "pasaporte-lleno",
    pack: "viaje",
    path: "/pasaporte/caducado-sin-cita",
    h1: "Pasaporte caducado y cita llena: plan B",
    title: "Pasaporte caducado sin cita: qué hacer 2026",
    description: "Plan B si el pasaporte está caducado y citapreviadnie.es no tiene hueco. Tasas 12 € / 30 €. Cita gratuita.",
    lead: `Plan B, en orden: otra oficina en citapreviadnie.es, ${TELEFONO_CITA}, cita conjunta DNI+pasaporte, urgencia acreditada en comisaría. No hay un mercado legal de citas. Tasas: pasaporte ${TASA_PASAPORTE_LABEL}, DNI ${TASA_DNI_LABEL}.`,
    cta: { href: CITA_DNI_URL, label: "Buscar hueco en citapreviadnie.es" },
    related: relatedViaje,
    sections: [
      {
        id: "planb",
        title: "El orden que no te estafa",
        lists: [
          [
            "Cambia de oficina y de día en citapreviadnie.es (la de al lado a veces abre antes)",
            `Llama al ${TELEFONO_CITA}`,
            "Pide DNI y pasaporte en la misma cita si aún no tienes DNI en vigor",
            "Si el viaje es inminente, lleva el billete y pregunta urgencia en la unidad de documentación",
            "No pagues Telegram, 807 ni “gestor de citas”",
          ],
        ],
        paragraphs: [SNAPSHOT_ESPERAS, DISCLAIMER_CITA],
      },
      tasasBox,
    ],
  },
  {
    id: "midni",
    pack: "viaje",
    path: "/dni/midni",
    h1: "MiDNI: la app no sustituye al DNI físico en frontera",
    title: "MiDNI vs DNI físico 2026: midni.gob.es",
    description: "MiDNI (midni.gob.es) exhibe el DNI en el móvil. No sustituye el documento físico en frontera. Cita y tasas: citapreviadnie.es, 12 € / 30 €.",
    lead: `MiDNI es la app oficial para exhibir el DNI en el teléfono (midni.gob.es). No es el pasaporte. No reemplaza el documento físico en un control fronterizo ni en un embarque que pida el plástico o el librito. Si te caduca el DNI, sigue haciendo falta cita en citapreviadnie.es. Tasas 2026: DNI ${TASA_DNI_LABEL}, pasaporte ${TASA_PASAPORTE_LABEL}.`,
    cta: { href: MIDNI_URL, label: "Ir a midni.gob.es" },
    secondaryCta: { href: CITA_DNI_URL, label: "Cita DNI/pasaporte en citapreviadnie.es" },
    related: relatedViaje,
    sections: [
      {
        id: "que-es",
        title: "Qué es y qué no es",
        paragraphs: [
          "MiDNI permite mostrar una representación verificable del DNI en el móvil en los usos que Interior habilite (identificación cotidiana). No es un pasaporte electrónico. No viaja por ti a Estados Unidos ni cruza un control de frontera en lugar del soporte físico.",
          "Si un establecimiento acepta MiDNI, perfecto. Si un aeropuerto pide el DNI o el pasaporte en la mano, la app no discute con el agente.",
        ],
      },
      {
        id: "caducidad",
        title: "Si el DNI físico está caducado",
        paragraphs: [
          `La app no alarga la vigencia. Renueva el DNI (últimos ${DNI_RENOVACION_DIAS} días o ya caducado) en citapreviadnie.es.`,
        ],
      },
      tasasBox,
      {
        id: "aviso",
        title: "Cita y clones",
        paragraphs: [DISCLAIMER_CITA],
      },
    ],
  },
  {
    id: "moviles",
    pack: "viaje",
    path: "/dni/unidades-moviles",
    h1: "Unidades móviles de Policía (pueblos)",
    title: "Unidades móviles DNI y pasaporte 2026: cómo enterarte",
    description: "Equipos móviles de DNI/pasaporte en municipios. La cita sigue siendo citapreviadnie.es. Tasas 12 € / 30 €.",
    lead: `En pueblos sin comisaría, Policía despliega unidades móviles de documentación. El calendario lo publica Interior o el ayuntamiento; esta guía no inventa la fecha de tu municipio. La cita, cuando existe, se gestiona en citapreviadnie.es. Tasas: DNI ${TASA_DNI_LABEL}, pasaporte ${TASA_PASAPORTE_LABEL}.`,
    cta: { href: CITA_DNI_URL, label: "Comprobar citapreviadnie.es" },
    related: relatedViaje,
    sections: [
      {
        id: "como",
        title: "Consultar el calendario municipal",
        paragraphs: [
          "Consulta la web o el tablón del ayuntamiento para conocer las visitas del equipo móvil y cómo solicitar atención. Si no encuentras un anuncio vigente, pregunta al ayuntamiento antes de desplazarte.",
          DISCLAIMER_CITA,
          SNAPSHOT_ESPERAS,
        ],
      },
      tasasBox,
    ],
  },
] satisfies Guide[]).map((guide): Guide => ({
  ...guide,
  sources: [
    { href: guide.cta.href, label: guide.cta.label },
    ...(["menor", "checklist", "cita-pasaporte"].includes(guide.id) ? [
      { href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/documentacion-necesaria-para-su-tramitacion/index.html", label: "Interior: documentación para DNI" },
      { href: "https://www.boe.es/eli/es/rd/2025/04/01/255", label: "BOE: regulación del DNI" },
      { href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/procedimiento-de-expedicion/", label: "Interior: documentos y consentimiento para pasaporte" },
    ] : []),
    { href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/", label: "Interior: tasa y exenciones del DNI" },
    { href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/index.html", label: "Interior: tasa y exención del pasaporte" },
    { href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2023-18093", label: "BOE: precio de las llamadas al 060" },
  ],
}));
