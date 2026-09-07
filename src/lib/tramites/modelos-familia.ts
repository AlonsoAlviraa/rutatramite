import {
  DISCLAIMER_MODELOS,
  EDUCACION_URL,
  INE_PADRON_MODELOS_URL,
  INTERIOR_URL,
  POLICIA_URL,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

export const MODELOS_FAMILIA: Guide[] = [
  {
    id: "autorizacion-empadronar-menor",
    pack: "modelos",
    path: "/autorizacion-empadronar-menor",
    h1: "Autorización de los dos progenitores para empadronar al menor",
    title: "Empadronar a un menor: autorización de ambos progenitores",
    description:
      "Si no acuden los dos, el padrón del menor suele pedir autorización del progenitor que no se presenta. Modelo INE / ayuntamiento. El alta es gratuita.",
    lead:
      "El padrón de un menor no es un papel de «quien se lo lleve». Con patria potestad compartida, las instrucciones INE piden la firma de ambos o la autorización del que no acude, salvo excepciones (resolución judicial, imposibilidad). El ayuntamiento tiene modelo: úsalo si existe. El alta sigue siendo gratuita. Guía larga: /empadronarse/menores.",
    cta: { href: INE_PADRON_MODELOS_URL, label: "Modelos INE de padrón" },
    secondaryCta: { href: "/empadronarse/menores", label: "Alta con menores" },
    disclaimer: DISCLAIMER_MODELOS,
    related: [
      { href: "/empadronarse/menores", label: "Empadronar con menores" },
      { href: "/autorizacion-empadronamiento", label: "Autorización de vivienda" },
      { href: "/autorizacion-recogida-colegio", label: "Recogida en el cole" },
    ],
    sections: [
      {
        id: "reglas",
        title: "Los dos, no uno «porque convive conmigo»",
        paragraphs: [
          "Una pelea de pareja no se gana empadronando al niño a escondidas. El otro progenitor puede impugnar. Si hay orden judicial de guarda, llévala. Si el otro está ilocalizable, pregunta al ayuntamiento el cauce (declaración, diligencia): no lo inventamos aquí.",
        ],
        models: [
          {
            id: "ambos",
            title: "Autorización del progenitor que no acude",
            body: `[Lugar], [fecha]

Yo, [nombre], con DNI/NIE [ ], progenitor/a de [nombre del menor], con DNI/NIE o NIA [ ], autorizo a [otro progenitor / representante] a solicitar el alta o cambio de domicilio en el padrón del menor en [dirección].

Declaro que ejerzo la patria potestad y que no hay resolución que lo impida.

Firma: ________________
(Adjuntar DNI y, si existe, libro de familia o certificado de nacimiento.)`,
          },
        ],
      },
    ],
  },
  {
    id: "autorizacion-recogida-colegio",
    pack: "modelos",
    path: "/autorizacion-recogida-colegio",
    h1: "Autorización de recogida del menor en el colegio",
    title: "Autorización para recoger al niño en el cole: modelo",
    description:
      "El centro pide un escrito de quien ejerce la patria potestad para que un abuelo, vecino o canguro recoja al menor. No es un modelo ministerial. Hay guía larga en /colegio/autorizacion-recogida-menores.",
    lead:
      "No hay un formulario del Estado. El colegio (y a veces el comedor) exige un papel con DNI de quien recoge y de quien autoriza. Si hay dos progenitores con patria potestad, lo sano es que consten los dos o que el centro acepte el de uno según su reglamento. Esta página es el modelo corto; la guía larga está en el pack de colegio.",
    cta: { href: EDUCACION_URL, label: "Ministerio de Educación" },
    secondaryCta: { href: "/colegio/autorizacion-recogida-menores", label: "Guía larga de recogida" },
    disclaimer: DISCLAIMER_MODELOS,
    related: [
      { href: "/colegio/autorizacion-recogida-menores", label: "Guía de recogida en el cole" },
      { href: "/autorizacion-viaje-menor", label: "Viaje de menor al extranjero" },
      { href: "/justificante-ausencia-escolar", label: "Justificante de ausencia" },
    ],
    sections: [
      {
        id: "modelo",
        title: "Modelo para secretaría",
        paragraphs: [
          "Indica curso, días (todos o puntuales) y DNI de quien recoge. Revócalo por escrito si deja de valer. El centro puede pedir foto del DNI.",
        ],
        models: [
          {
            id: "recogida",
            title: "Autorización de recogida",
            body: `[Lugar], [fecha]

Al director/a de [colegio]

Yo, [nombre], DNI [ ], progenitor/a o tutor/a de [menor], curso [ ], autorizo a [nombre de quien recoge], DNI [ ], a recogerlo a la salida [todos los días / los días …] durante el curso [año].

Teléfono de contacto: [ ]

Firma: ________________`,
          },
        ],
      },
    ],
  },
  {
    id: "justificante-ausencia-escolar",
    pack: "modelos",
    path: "/justificante-ausencia-escolar",
    h1: "Justificante de ausencia escolar",
    title: "Justificante de falta al colegio: modelo de los progenitores",
    description:
      "Modelo breve para justificar una falta. El centro y la consejería marcan cuándo hace falta informe médico. No es consejo clínico.",
    lead:
      "Una falta se justifica por escrito. El colegio decide si acepta la declaración de la familia o pide parte médico. Esta página no dice qué enfermedad es «válida». Sirve para dejar fecha, horas y motivo administrativo. El absentismo es otro procedimiento: no lo maquilles con este papel.",
    cta: { href: EDUCACION_URL, label: "Ministerio de Educación" },
    disclaimer: DISCLAIMER_MODELOS,
    related: [
      { href: "/colegio/no-he-matriculado-a-mi-hijo", label: "No he matriculado a mi hijo" },
      { href: "/solicitud-comedor-escolar", label: "Comedor escolar" },
    ],
    sections: [
      {
        id: "modelo",
        title: "Modelo",
        paragraphs: ["Entrégalo en secretaría o por la app del centro si existe."],
        models: [
          {
            id: "ausencia",
            title: "Justificante de ausencia",
            body: `[Lugar], [fecha]

Al tutor/a de [curso] — [colegio]

Justifico la ausencia de [menor] el/los día(s) [fechas] de [hora] a [hora] por [motivo: cita médica / trámite / familiar]. Adjunto [volante / nada].

Firma del progenitor/a: ________________
DNI: [ ]`,
          },
        ],
      },
    ],
  },
  {
    id: "solicitud-comedor-escolar",
    pack: "modelos",
    path: "/solicitud-comedor-escolar",
    h1: "Solicitud de comedor o baja de comedor fuera de plazo",
    title: "Solicitud y baja de comedor escolar fuera de plazo",
    description:
      "El comedor y la beca son de cada comunidad o ayuntamiento. Modelo genérico de alta o baja fuera de plazo, para adaptar a la sede educativa.",
    lead:
      "No hay un impreso único de España. La plaza de comedor y la beca salen de la consejería, el ayuntamiento o el AMPA. Fuera de plazo suele haber causa sobrevenida (mudanza, cambio de jornada). Usa la sede de tu comunidad. Aquí hay un escrito genérico y enlaces a las guías de beca e impago.",
    cta: { href: EDUCACION_URL, label: "Portales educativos de las CCAA" },
    secondaryCta: { href: "/comedor/beca-comedor-fuera-de-plazo", label: "Beca comedor fuera de plazo" },
    disclaimer: DISCLAIMER_MODELOS,
    related: [
      { href: "/comedor", label: "Pack comedor" },
      { href: "/comedor/beca-comedor-fuera-de-plazo", label: "Beca fuera de plazo" },
      { href: "/comedor/impago-comedor-escolar", label: "Impago de comedor" },
    ],
    sections: [
      {
        id: "modelo",
        title: "Modelo genérico (alta o baja)",
        paragraphs: [
          "Sustituye el destinatario por el que publique tu convocatoria. Adjunta empadronamiento si lo piden. No prometemos plaza.",
        ],
        models: [
          {
            id: "comedor",
            title: "Alta o baja de comedor",
            body: `[Lugar], [fecha]

A [consejería / ayuntamiento / consejo escolar de …]

Asunto: [Alta / baja] de comedor escolar fuera de plazo

Solicito [alta / baja] de comedor de [menor], curso [ ], centro [ ], con efectos de [fecha], por [mudanza / cambio de jornada / otra causa]. Adjunto empadronamiento y [nómina / libro de familia] si la convocatoria lo pide.

[Nombre del progenitor]
[DNI]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "autorizacion-viaje-menor",
    pack: "modelos",
    path: "/autorizacion-viaje-menor",
    h1: "Autorización de viaje de menor al extranjero (Policía / Guardia Civil)",
    title: "Viaje de menor al extranjero: autorización Policía o Guardia Civil",
    description:
      "Si el menor sale de España sin ambos progenitores, Policía Nacional o Guardia Civil pueden exigir una autorización. Pico de Navidad y verano. No sustituye el pasaporte.",
    lead:
      "Un menor que viaja solo, con uno solo de los progenitores o con un tercero puede necesitar autorización expresa del que no viaja. Se tramita en comisaría de Policía Nacional o puesto de Guardia Civil, con DNI y, a menudo, el impreso oficial. No es el pasaporte. No es una visa. En Navidad las colas suben: no lo dejes para el aeropuerto.",
    cta: { href: POLICIA_URL, label: "Policía Nacional" },
    secondaryCta: { href: INTERIOR_URL, label: "Ministerio del Interior" },
    disclaimer: DISCLAIMER_MODELOS,
    related: [
      { href: "/pasaporte/bebe", label: "Pasaporte de bebé" },
      { href: "/autorizacion-recogida-colegio", label: "Recogida en el cole" },
    ],
    sections: [
      {
        id: "donde",
        title: "Dónde se firma de verdad",
        paragraphs: [
          "El escrito de esta página no sustituye el impreso que te den en comisaría o en el puesto. Lleva DNI de quien autoriza, DNI o pasaporte del menor, y datos del viaje (fechas, destino, con quién). Si hay patria potestad exclusiva, lleva la sentencia. La Guardia Civil atiende muchos pueblos; en capital, Policía Nacional.",
        ],
        models: [
          {
            id: "viaje",
            title: "Borrador (lleva también el impreso oficial)",
            body: `[Lugar], [fecha]

Yo, [nombre], DNI [ ], progenitor/a de [menor], autorizo su viaje a [país] del [fecha] al [fecha] en compañía de [nombre, DNI], para [motivo].

Conozco que el documento válido es el que expide Policía Nacional o Guardia Civil.

Firma: ________________`,
          },
        ],
      },
    ],
  },
];
