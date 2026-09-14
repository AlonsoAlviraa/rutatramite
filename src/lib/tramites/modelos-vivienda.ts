import { BOE_LAU_URL, DISCLAIMER_MODELOS } from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedVivienda = [
  { href: "/preaviso-fin-alquiler", label: "Preaviso de fin de alquiler (inquilino)" },
  { href: "/no-renovacion-alquiler", label: "No renovación al inquilino" },
  { href: "/requerimiento-impago-alquiler", label: "Requerimiento de impago" },
  { href: "/inventario-fianza-alquiler", label: "Inventario y fianza" },
  { href: "/autorizacion-empadronamiento", label: "Autorización para empadronar" },
];

export const MODELOS_VIVIENDA: Guide[] = [
  {
    id: "preaviso-fin-alquiler",
    pack: "modelos",
    path: "/preaviso-fin-alquiler",
    h1: "Preaviso de fin de alquiler del inquilino (30 días, LAU)",
    title: "Preaviso de fin de alquiler: inquilino, 30 días (LAU art. 11)",
    description:
      "Carta del inquilino para desistir del alquiler con 30 días de preaviso. Artículo 11 LAU (después de 6 meses). No confundir con el preaviso de 2 meses del art. 10.",
    lead:
      "Prima hermana de la carta de baja: un papel para irte del piso. El artículo 11 de la LAU permite al inquilino desistir después de seis meses de contrato, avisando con 30 días de antelación por escrito. Puede haber indemnización si el contrato lo pactó (una mensualidad por cada año que reste, prorrateada). Si lo que quieres es no prorrogar al vencimiento, el art. 10 pide 2 meses al arrendatario, no 30 días. Esta carta es la de 30 días del inquilino.",
    cta: { href: BOE_LAU_URL, label: "Ley de Arrendamientos Urbanos (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedVivienda,
    sections: [
      {
        id: "lau",
        title: "30 días del art. 11, no un número mágico para todo",
        paragraphs: [
          "Art. 11 LAU: una vez transcurridos al menos seis meses, el arrendatario puede desistir si lo comunica con un mínimo de 30 días. Si hay pacto de indemnización, se calcula según el tiempo que reste de la anualidad en curso. Art. 10: para no renovar al final de la prórroga, el inquilino avisa con 2 meses y el casero con 4. No mezcles las dos cartas.",
          "Entrégala de forma que quede fecha: burofax, email más acuse, o mano con «recibí». La fianza se liquida al final con inventario; no la des por perdida en este escrito.",
        ],
        lists: [
          [
            "Inquilino, 30 días, art. 11 LAU (desistimiento tras 6 meses).",
            "No renovar al vencimiento: art. 10, 2 meses (inquilino) / 4 meses (casero).",
            "Revisa si el contrato pactó indemnización por desistimiento.",
            "Pide día y hora de entrega de llaves e inventario de salida.",
          ],
        ],
      },
      {
        id: "modelo",
        title: "Modelo de preaviso (inquilino, 30 días)",
        paragraphs: ["Sustituye corchetes. Conserva el acuse."],
        models: [
          {
            id: "preaviso-inquilino",
            title: "Preaviso de desistimiento (art. 11 LAU)",
            body: `[Lugar], [fecha]

A [nombre del arrendador]
[Dirección]

Asunto: Preaviso de desistimiento del arrendamiento — 30 días (art. 11 LAU)

Comunico que desisto del contrato de arrendamiento de la vivienda sita en [dirección], con efectos de [fecha de entrega de llaves], dando un preaviso de 30 días al amparo del artículo 11 de la LAU.

Ruego confirmar día y hora para inventario de salida, lectura de suministros y devolución de fianza según el artículo 36 LAU.

[Nombre]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "no-renovacion-alquiler",
    pack: "modelos",
    path: "/no-renovacion-alquiler",
    h1: "Carta de no renovación al inquilino",
    title: "No renovación del alquiler: carta del casero (art. 10 LAU)",
    description:
      "El arrendador que no quiere prorrogar avisa con 4 meses (art. 10 LAU). No es un desahucio. Modelo de carta.",
    lead:
      "Si eres el casero y no quieres que el contrato se prorrogue, el artículo 10 de la LAU exige comunicarlo al inquilino con al menos cuatro meses de antelación al vencimiento de la prórroga. No es un desahucio ni un desistimiento del art. 11. Las prórrogas extraordinarias y los topes de renta de la ley de vivienda, si aplican, pueden limitar esto: contrasta la norma vigente y tu contrato.",
    cta: { href: BOE_LAU_URL, label: "LAU art. 10 (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedVivienda,
    sections: [
      {
        id: "modelo",
        title: "Modelo (arrendador)",
        paragraphs: [
          "Cuatro meses, por escrito, al domicilio del inquilino. No uses esta carta para un impago (eso es requerimiento) ni para un desistimiento del inquilino.",
        ],
        models: [
          {
            id: "no-renovacion",
            title: "Comunicación de no renovación",
            body: `[Lugar], [fecha]

A [inquilino]
Vivienda: [dirección]

Asunto: No renovación del arrendamiento (art. 10 LAU)

Les comunico que no procederé a la renovación / prórroga del contrato, que quedará extinguido el [fecha de vencimiento], con un preaviso superior a cuatro meses.

Ruego contactar para inventario de salida y liquidación de fianza.

[Arrendador]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "requerimiento-impago-alquiler",
    pack: "modelos",
    path: "/requerimiento-impago-alquiler",
    h1: "Requerimiento de impago de renta",
    title: "Requerimiento de impago de alquiler: modelo",
    description:
      "Burofax o escrito fehaciente reclamando rentas. Es el paso previo habitual al desahucio por falta de pago (art. 27 LAU). No es la demanda.",
    lead:
      "Un requerimiento fehaciente (burofax) deja fecha y cantidad. El artículo 27 de la LAU permite resolver por falta de pago. Enjuiciamiento civil y enervación tienen reglas propias: esta página no presenta demandas. Sirve para reclamar la renta y, si aplica, abrir la vía posterior con un profesional.",
    cta: { href: BOE_LAU_URL, label: "LAU art. 27 (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedVivienda,
    sections: [
      {
        id: "modelo",
        title: "Modelo de requerimiento",
        paragraphs: [
          "Identifica meses, importe y plazo de pago (10-15 días es habitual). Envíalo de forma que quede constancia. No amenaces con delitos que no existen.",
        ],
        models: [
          {
            id: "impago",
            title: "Requerimiento de rentas",
            body: `[Lugar], [fecha]

A [inquilino]
Vivienda: [dirección]

Asunto: Requerimiento de pago de rentas

Les requiero el pago de [importe] € correspondientes a las mensualidades de [meses], más [suministros si el contrato lo dice], en el plazo de 15 días en [IBAN].

El impago es causa de resolución (art. 27 LAU). Este escrito es un requerimiento, no una demanda.

[Arrendador]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "inventario-fianza-alquiler",
    pack: "modelos",
    path: "/inventario-fianza-alquiler",
    h1: "Inventario de entrada y salida y estado de la fianza",
    title: "Inventario de fianza de alquiler: entrada, salida y art. 36 LAU",
    description:
      "Modelos de inventario y reclamación de fianza: fotos, entrega de llaves, saldo pendiente y el interés legal del artículo 36 de la LAU.",
    lead:
      "Prepara un inventario al entrar y otro al salir, deja constancia de la entrega de llaves y pide una liquidación detallada. El artículo 36.4 de la LAU establece interés legal sobre el saldo que deba devolverse si pasa un mes desde la entrega de llaves sin restituirlo.",
    reviewedAt: "2026-09-14",
    sources: [
      { href: BOE_LAU_URL + "#a36", label: "BOE: LAU, fianza y saldo pendiente (art. 36)" },
      { href: BOE_LAU_URL + "#datercera", label: "BOE: depósito autonómico de fianzas" },
    ],
    cta: { href: BOE_LAU_URL, label: "LAU art. 36 (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedVivienda,
    sections: [
      {
        id: "saldo-fianza",
        title: "Qué significa el mes desde la entrega de llaves",
        paragraphs: [
          "Para vivienda, la fianza legal prevista en el artículo 36.1 equivale a una mensualidad. Diferencia esa cantidad de cualquier garantía adicional. El depósito ante un organismo autonómico depende de la normativa de la comunidad: no es la misma gestión que la liquidación entre arrendador e inquilino.",
          "El artículo 36.4 se refiere al interés legal del saldo que deba restituirse. No permite concluir que siempre corresponda recuperar íntegramente todo lo entregado. Pide un desglose de las deducciones alegadas y su documentación: rentas, suministros o daños son conceptos que conviene identificar y revisar por separado.",
          "Reúne contrato, justificante de la fianza, inventarios y entrega de llaves. Separa cantidades aceptadas y discutidas. No firmes como «saldo y finiquito» una liquidación que todavía no has revisado.",
        ],
      },
      {
        id: "usar-modelos",
        title: "Antes de enviar una reclamación",
        paragraphs: [
          "Adapta las fechas y elimina lo que no proceda. El párrafo de intereses solo corresponde si ya ha transcurrido un mes desde la entrega de llaves y queda saldo que deba restituirse. Conserva prueba del contenido enviado y de su recepción. Este escrito no es una demanda judicial; si hay una disputa, consulta asesoramiento antes de acordar cantidades o reclamar judicialmente.",
        ],
      },
      {
        id: "inventario",
        title: "Qué fotografiar y qué anotar",
        paragraphs: [
          "Utiliza las mismas estancias y numeración de fotos en la entrada y la salida. Describe lo que observas: «marca de 8 cm junto a la puerta» resulta más comprobable que «pared mal». Reserva una línea para lo que cada parte discute; no presentes una discrepancia como un hecho acordado.",
        ],
        lists: [
          [
            "Fecha, dirección, lecturas de luz/agua/gas.",
            "Estado de cada estancia (una línea y foto).",
            "Lista de mobiliario si el contrato es amueblado.",
            "Firmas de las partes, copia del acta y lista de anexos para cada una.",
            "Conserva las fotos originales y el envío del inventario a la otra parte.",
          ],
        ],
        models: [
          {
            id: "inventario",
            title: "Acta de inventario (entrada o salida)",
            body: `Inventario de [entrada / salida]
Vivienda: [dirección]
Inspección: [fecha y hora]
Contrato de fecha: [fecha]
Lecturas: luz [ ]  agua [ ]  gas [ ]

Estancia / elemento / estado observado / número de foto
- Salón:
- Cocina:
- Dormitorio 1:
- Baño:
- Otros:

Fianza entregada al inicio: [importe] €
Garantía adicional, si existe: [importe y concepto]
Importe devuelto en este acto: [importe y medio de pago]
Saldo pendiente: [importe o pendiente de determinar]
Llaves y mandos: [tipo y cantidad]
Entrega de llaves: [fecha y hora]
Anexos: [lista de fotos y documentos]
Observaciones acordadas: [ ]
Cuestiones sobre las que no existe acuerdo: [ ]

Este acta recoge el estado observado y la entrega de llaves indicada. La firma no implica aceptar descuentos no detallados ni renunciar a reclamarlos. Cada parte recibe copia del acta y los anexos.

Arrendador: [nombre, DNI, firma]
Arrendatario: [nombre, DNI, firma]`,
          },
          {
            id: "fianza",
            title: "Reclamación de fianza",
            body: `[Lugar], [fecha]

A [arrendador]

Asunto: Devolución de fianza (art. 36 LAU)

El [fecha] entregué las llaves de [dirección], según [acta u otro justificante].

Fianza abonada: [importe].
Cantidad ya devuelta: [importe].
Saldo cuya devolución solicito: [importe y cálculo].

Solicito la devolución del saldo que corresponda y una liquidación detallada. Si se alegan deducciones, ruego identificar cada concepto, importe y documentación justificativa.

[Incluir solo si procede: Ha transcurrido un mes desde la entrega de llaves sin restituirse el saldo debido. Solicito también el interés legal que corresponda conforme al artículo 36.4 de la LAU.]

Esta solicitud no supone conformidad con descuentos no aceptados ni renuncia a las cantidades discutidas.
Documentos adjuntos: [ ].
Contacto para la respuesta: [ ].

IBAN: [ ]

[Nombre]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "autorizacion-empadronamiento",
    pack: "modelos",
    path: "/autorizacion-empadronamiento",
    h1: "Autorización para empadronar a un tercero",
    title: "Autorización de empadronamiento: modelo del titular de la vivienda",
    description:
      "El titular o el empadronado autoriza a otra persona a empadronarse en su domicilio. El alta sigue siendo gratuita y del ayuntamiento. Modelo para copiar.",
    lead:
      "Si el contrato o la escritura no está a tu nombre, el ayuntamiento suele pedir autorización de quien sí consta (propietario, inquilino titular, familiar empadronado). Mentir aquí es delito. El alta en el padrón es gratuita. Cada municipio puede tener modelo propio: usa el suyo si lo publica; si no, este texto cubre los datos INE. No inventamos el teléfono de la OAC.",
    cta: { href: "https://idapadron.ine.es/", label: "Modelos INE de padrón" },
    secondaryCta: { href: "/empadronarse/sin-contrato", label: "Empadronarse sin contrato" },
    disclaimer: DISCLAIMER_MODELOS,
    related: [
      { href: "/empadronarse/sin-contrato", label: "Sin contrato de alquiler" },
      { href: "/empadronarse/casa-de-familiar", label: "Casa de un familiar" },
      { href: "/declaracion-responsable-padron", label: "Declaración responsable" },
      { href: "/autorizacion-empadronar-menor", label: "Autorización para menor" },
    ],
    sections: [
      {
        id: "cuando",
        title: "Cuándo hace falta",
        paragraphs: [
          "Habitación, pareja no titular, amigo, familiar que no es propietario. El titular declara que convives o que te cede el uso. El ayuntamiento puede comprobar el hecho. El casero no puede «prohibir» el padrón si resides; otra cosa es que el ayuntamiento exija esta autorización o una comprobación de oficio.",
        ],
        models: [
          {
            id: "autorizacion-tercero",
            title: "Autorización del titular / empadronado",
            body: `[Lugar], [fecha]

Yo, [nombre del titular], con DNI/NIE [ ], titular / empadronado en [dirección completa], autorizo a [nombre de quien se empadrona], con DNI/NIE/pasaporte [ ], a empadronarse en ese domicilio.

Declaro que [convive / va a residir] de forma habitual. Conozco que una autorización falsa es delito.

Adjunto copia de mi DNI y [contrato / escritura / volante].

Firma del titular: ________________
Firma de quien se empadrona: ________________`,
          },
        ],
      },
    ],
  },
  {
    id: "declaracion-responsable-padron",
    pack: "modelos",
    path: "/declaracion-responsable-padron",
    h1: "Declaración responsable de residencia (sin contrato)",
    title: "Declaración responsable para el padrón sin contrato",
    description:
      "Cuando no hay contrato a tu nombre, algunos ayuntamientos aceptan declaración responsable más comprobación. No sustituye un modelo municipal si existe. El alta es gratuita.",
    lead:
      "Sin contrato no improvises un recibo de tres líneas. Las instrucciones INE contemplan autorización del titular y, en su defecto, comprobación de oficio o vía de servicios sociales. Una declaración responsable dice que resides ahí y asumes las consecuencias de mentir. Si tu ayuntamiento tiene modelo, usa el suyo. El artículo 15 de la Ley 7/1985 no exige un alquiler visado.",
    cta: { href: "https://idapadron.ine.es/", label: "Modelos INE de padrón" },
    secondaryCta: { href: "/empadronarse/sin-contrato", label: "Guía sin contrato" },
    disclaimer: DISCLAIMER_MODELOS,
    related: [
      { href: "/autorizacion-empadronamiento", label: "Autorización de un tercero" },
      { href: "/empadronarse/sin-contrato", label: "Sin contrato" },
      { href: "/empadronarse/sin-hogar", label: "Sin hogar" },
    ],
    sections: [
      {
        id: "modelo",
        title: "Modelo de declaración responsable",
        paragraphs: [
          "No sustituye la autorización del titular si el ayuntamiento la pide. No inventes un contrato. Si no hay techo, la vía es servicios sociales, no esta hoja.",
        ],
        models: [
          {
            id: "declaracion",
            title: "Declaración responsable de residencia",
            body: `[Lugar], [fecha]

Yo, [nombre], con [DNI/NIE/pasaporte], declaro bajo mi responsabilidad que resido de forma habitual en [dirección], municipio de [nombre], y solicito el alta en el padrón.

No dispongo de contrato a mi nombre. [El titular es … / no hay titular disponible]. Conozco que una declaración falsa puede ser delito y causa de baja.

Firma: ________________`,
          },
        ],
      },
    ],
  },
];
