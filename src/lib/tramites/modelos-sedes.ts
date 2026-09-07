import {
  AEAT_030_URL,
  BOE_LPAC_URL,
  DISCLAIMER_MODELOS,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

export const MODELOS_SEDES: Guide[] = [
  {
    id: "autorizacion-representacion-tramite",
    pack: "modelos",
    path: "/autorizacion-representacion-tramite",
    h1: "Autorización para que otra persona haga un trámite por ti",
    title: "Escrito de representación: otra persona va a la sede por ti",
    description:
      "Ley 39/2015 art. 5: representación voluntaria. Modelo para padrón, extranjería o registro. DNI de ambos. No es un poder notarial salvo que el trámite lo exija.",
    lead:
      "El artículo 5 de la Ley 39/2015 permite que alguien te represente ante la Administración con un escrito y los documentos de identidad de los dos. Muchos ayuntamientos y extranjería lo aceptan para presentar un registro. Un poder notarial solo hace falta si esa sede lo exige. No envíes originales de más. No somos la oficina.",
    cta: { href: BOE_LPAC_URL, label: "Ley 39/2015 (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: [
      { href: "/acuse-de-recibo-modelo", label: "Acuse de recibo" },
      { href: "/modelo-subsanacion", label: "Subsanación / alegaciones" },
      { href: "/empadronarse", label: "Padrón" },
    ],
    sections: [
      {
        id: "modelo",
        title: "Modelo de representación",
        paragraphs: [
          "Indica el trámite (alta padronal, subsanación, copia sellada…). Ambos firman. El representante lleva originales o copias compulsadas según la sede.",
        ],
        models: [
          {
            id: "representacion",
            title: "Autorización de representación (art. 5 LPAC)",
            body: `[Lugar], [fecha]

Yo, [nombre del interesado], DNI/NIE [ ], autorizo a [nombre del representante], DNI/NIE [ ], a presentarme y a recibir notificaciones en el trámite de [descripción] ante [ayuntamiento / oficina de extranjería / otro].

Esta representación se otorga al amparo del artículo 5 de la Ley 39/2015.

Firma del interesado: ________________
Firma del representante: ________________`,
          },
        ],
      },
    ],
  },
  {
    id: "acuse-de-recibo-modelo",
    pack: "modelos",
    path: "/acuse-de-recibo-modelo",
    h1: "Solicitud de copia sellada o acuse de recibo",
    title: "Copia sellada y acuse de recibo: modelo para cualquier registro",
    description:
      "Pide copia sellada de lo que entregas: padrón, baja, extranjería, alegaciones. El registro no es un favor. Modelo de carátula.",
    lead:
      "Si no te quedan evidencias, el trámite «no existió». La Ley 39/2015 te da derecho a recoger el justificante de presentación. Lleva dos copias y pide el sello o el CSV del registro electrónico. Vale para una baja laboral entregada en mano, un escrito de padrón o una subsanación de extranjería.",
    cta: { href: BOE_LPAC_URL, label: "Ley 39/2015 (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: [
      { href: "/modelo-subsanacion", label: "Modelo de subsanación" },
      { href: "/autorizacion-representacion-tramite", label: "Representación" },
    ],
    sections: [
      {
        id: "modelo",
        title: "Carátula",
        paragraphs: ["Pega esta hoja al escrito. Quédate la copia sellada."],
        models: [
          {
            id: "acuse",
            title: "Petición de copia sellada",
            body: `[Lugar], [fecha]

A [registro / OAC / oficina]

Presento el escrito de [asunto] en [n] copias. Ruego sello o justificante de presentación (Ley 39/2015) en la copia que me quedo.

Interesado: [nombre, DNI]
Teléfono / email (solo si la sede lo pide): [ ]

Firma: ________________
(Espacio de sello / CSV)`,
          },
        ],
      },
    ],
  },
  {
    id: "modelo-subsanacion",
    pack: "modelos",
    path: "/modelo-subsanacion",
    h1: "Escrito de alegaciones o subsanación genérico",
    title: "Modelo de subsanación y alegaciones (requerimiento, regularización)",
    description:
      "Te han requerido un documento o quieres alegar. Modelo genérico para extranjería, padrón o cualquier sede. Plazo del requerimiento: cúmplelo.",
    lead:
      "Un requerimiento de subsanación te da un plazo (a menudo 10 días). Si no contestas, el trámite puede caducar. Identifica el expediente, adjunta lo que piden y lista lo que ya consta. En la regularización extraordinaria el cauce puede ser Correos: usa la guía específica. Este modelo es el genérico.",
    cta: { href: BOE_LPAC_URL, label: "Ley 39/2015 (BOE)" },
    secondaryCta: {
      href: "/extranjeria/subsanar-regularizacion-correos",
      label: "Subsanar regularización en Correos",
    },
    disclaimer: DISCLAIMER_MODELOS,
    related: [
      { href: "/extranjeria/subsanar-regularizacion-correos", label: "Regularización Correos" },
      { href: "/acuse-de-recibo-modelo", label: "Acuse de recibo" },
    ],
    sections: [
      {
        id: "modelo",
        title: "Modelo de subsanación / alegaciones",
        paragraphs: [
          "Cita número de expediente y fecha del requerimiento. No reescribas la ley. Adjunta copias, no inventes documentos que «suelen pedir».",
        ],
        models: [
          {
            id: "subsanacion",
            title: "Escrito de subsanación",
            body: `[Lugar], [fecha]

A [órgano que requirió]
Expediente: [número]
Asunto: Subsanación / alegaciones al requerimiento de [fecha]

Dentro de plazo, presento:
1. [documento]
2. [documento]

Alegaciones: [texto breve]. Ruego se tenga por subsanado y se continúe el procedimiento. Solicito copia sellada.

[Nombre]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "modelo-030-cambio-domicilio",
    pack: "modelos",
    path: "/modelo-030-cambio-domicilio",
    h1: "Cambio de domicilio ante Hacienda (modelo 030): no es el padrón",
    title: "Modelo 030: el domicilio fiscal no es el padrón",
    description:
      "El modelo 030 de la AEAT cambia el domicilio fiscal. El padrón municipal no avisa a Hacienda. Guía y enlace a la sede. Hay ficha larga en /hacienda/modelo-030.",
    lead:
      "El padrón no es Hacienda. Empadronarte no mueve el domicilio fiscal. El modelo 030 (declaración censal de cambio de domicilio) se presenta en la sede de la Agencia Tributaria, con Cl@ve o certificado. Esta página insiste en lo que no es: no es el alta padronal, no es el DNI, no es la DGT. La guía larga del pack mudanza está en /hacienda/modelo-030.",
    cta: { href: AEAT_030_URL, label: "Sede de la Agencia Tributaria" },
    secondaryCta: { href: "/hacienda/modelo-030", label: "Guía larga del modelo 030" },
    disclaimer: DISCLAIMER_MODELOS,
    related: [
      { href: "/hacienda/modelo-030", label: "Modelo 030 (guía larga)" },
      { href: "/mudanza", label: "Orden de la mudanza" },
      { href: "/empadronarse/cambio-de-domicilio", label: "Cambio de domicilio en el padrón" },
      { href: "/dni/cambio-domicilio", label: "Domicilio en el DNI" },
    ],
    sections: [
      {
        id: "no-es-padron",
        title: "El 030 no es el padrón",
        paragraphs: [
          "Tres padrones distintos que la gente mezcla: (1) padrón municipal, ayuntamiento, alta gratuita; (2) domicilio del DNI, Policía, gratis si solo cambias domicilio; (3) domicilio fiscal, modelo 030, AEAT. Hacer uno no dispara los otros. Si te mudas, el orden habitual es padrón → DNI si toca → 030.",
          "El 030 también sirve para otros datos censales, pero el uso de esta página es el cambio de domicilio. Preséntalo en sede.agenciatributaria.gob.es. No hay un «modelo 030 de padrón».",
        ],
        lists: [
          [
            "Padrón = ayuntamiento. No es el 030.",
            "030 = Agencia Tributaria. Domicilio fiscal.",
            "DNI = Policía. Cambio de domicilio gratis si el documento sigue en vigor.",
            "DGT = permiso y vehículo, sede DGT.",
          ],
        ],
      },
      {
        id: "como",
        title: "Cómo se presenta (sin vender gestoría)",
        paragraphs: [
          "Identifícate con Cl@ve, certificado o DNIe en la sede AEAT. Elige el cambio de domicilio. Conserva el justificante. Si no puedes online, pregunta en la delegación: no inventamos el teléfono de tu administración.",
        ],
        models: [
          {
            id: "recordatorio-030",
            title: "Recordatorio (no es el formulario AEAT)",
            body: `El formulario oficial es el de la sede AEAT. Antes de presentarlo, ten a mano:
- DNI/NIE
- Dirección completa nueva (la misma que el padrón si ya te empadronaste)
- Justificante de presentación del 030 (CSV)

No uses este recuadro como padrón.`,
          },
        ],
      },
    ],
  },
];
