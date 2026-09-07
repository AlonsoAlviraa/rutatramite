import {
  BOE_ET_URL,
  DISCLAIMER_MODELOS,
  MITES_URL,
  SEPE_URL,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedTrabajo = [
  { href: "/modelo-baja-voluntaria", label: "Carta de baja voluntaria (15 días)" },
  { href: "/baja-voluntaria-sin-preaviso", label: "Baja sin preaviso y finiquito" },
  { href: "/baja-periodo-de-prueba", label: "Baja en periodo de prueba" },
  { href: "/modelo-finiquito", label: "Solicitud de finiquito" },
  { href: "/he-firmado-finiquito-puedo-reclamar", label: "He firmado el finiquito" },
  { href: "/certificado-empresa-sepe", label: "Certificado de empresa (SEPE)" },
];

export const MODELOS_TRABAJO: Guide[] = [
  {
    id: "modelo-baja-voluntaria",
    pack: "modelos",
    path: "/modelo-baja-voluntaria",
    h1: "Carta de baja voluntaria con preaviso de 15 días",
    title: "Carta de baja voluntaria 15 días: modelo seco, cordial y por email",
    description:
      "Modelo de baja voluntaria con preaviso de 15 días en tres tonos (seco, cordial y por email). El plazo lo marca el convenio o el pacto, no un número único del Estatuto.",
    lead:
      "La baja voluntaria es una decisión tuya: no hace falta que la empresa la «acepte». El preaviso no es un número único del Estatuto de los Trabajadores: mira el convenio y tu contrato. 15 días naturales es el plazo más habitual cuando no hay otro, y es el que usa esta carta. Tres tonos para copiar: seco, cordial y por email. No somos Administración ni despacho.",
    cta: { href: BOE_ET_URL, label: "Estatuto de los Trabajadores (BOE)" },
    secondaryCta: { href: MITES_URL, label: "Ministerio de Trabajo" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedTrabajo,
    sections: [
      {
        id: "plazo",
        title: "El preaviso no es un dogma de 15 días en el ET",
        paragraphs: [
          "El artículo 49.1.d del Estatuto de los Trabajadores permite al trabajador dimitir. El preaviso concreto lo fija el convenio colectivo, el contrato o la costumbre del sector. El Estatuto no impone un único plazo nacional de 15 días. Si tu convenio dice 30, usa 30. Si no dice nada y el contrato tampoco, 15 días naturales es la práctica más extendida y el producto de esta página.",
          "Cuenta el preaviso desde que la empresa recibe el escrito, no desde que lo redactas. Entrégalo con acuse (registro, burofax, email con confirmación de lectura más copia en mano). El último día de trabajo es el que pongas; no dejes que te «acepten» la baja para otro día sin tu consentimiento.",
        ],
        lists: [
          [
            "Mira el convenio y la cláusula de preaviso del contrato antes de copiar.",
            "15 días naturales es lo habitual a falta de otro plazo: no lo presentes como mandato único del ET.",
            "Pide por escrito la liquidación. El certificado de empresa para el SEPE no abre paro tras una baja voluntaria ordinaria.",
            "Si estás en periodo de prueba, usa la guía específica: allí no hay preaviso legal (art. 14 ET).",
          ],
        ],
      },
      {
        id: "tres-tonos",
        title: "Tres tonos: seco, cordial y por email",
        paragraphs: [
          "El tono no cambia el efecto jurídico. Cambia la relación que dejas. Copia uno, sustituye los corchetes y firma. Conserva una copia con fecha.",
        ],
        models: [
          {
            id: "seco",
            title: "Tono seco",
            body: `[Lugar], [fecha]

A la atención de Dirección / Departamento de Personal
[Razón social]
[Dirección]

Asunto: Baja voluntaria con preaviso de 15 días

Por la presente comunico mi decisión de causar baja voluntaria en la empresa, al amparo del artículo 49.1.d del Estatuto de los Trabajadores, con efectos de [fecha del último día de trabajo], dando así un preaviso de 15 días naturales.

Ruego se proceda a la liquidación de haberes, vacaciones no disfrutadas y resto de conceptos, y se me entregue la documentación de fin de contrato.

Atentamente,
[Nombre y apellidos]
[DNI/NIE]
[Firma]`,
          },
          {
            id: "cordial",
            title: "Tono cordial",
            body: `[Lugar], [fecha]

Estimados/as [nombre del responsable / equipo de personal]:

Os escribo para comunicaros mi baja voluntaria. El último día de trabajo será el [fecha], con un preaviso de 15 días naturales.

Agradezco el tiempo en [empresa]. Quedo a vuestra disposición estas dos semanas para el traspaso. Os ruego la liquidación y la documentación de cese en el plazo habitual.

Un saludo,
[Nombre y apellidos]
[DNI/NIE]
[Firma]`,
          },
          {
            id: "por-email",
            title: "Tono por email",
            body: `Para: [email de personal / dirección]
Asunto: Baja voluntaria — preaviso 15 días — [Nombre y apellidos]

Hola:

Comunico mi baja voluntaria. Último día de trabajo: [fecha], con 15 días de preaviso.

Quedo para el traspaso. Por favor, enviadme la liquidación y la documentación de fin de contrato.

Gracias,
[Nombre y apellidos]
[DNI/NIE]
[Puesto]`,
          },
        ],
      },
      {
        id: "despues",
        title: "Qué pedir el último día (y qué no esperar)",
        paragraphs: [
          "Pide el desglose del finiquito antes de firmar. Firma «recibí» no es lo mismo que firmar «saldo y finiquito» como renuncia. Si no estás de acuerdo, firma solo la recepción o añade «no conforme». La baja voluntaria ordinaria no da derecho a prestación por desempleo: el certificado de empresa para el SEPE es otro trámite, pensado sobre todo tras un despido o un fin de contrato.",
        ],
      },
    ],
  },
  {
    id: "baja-voluntaria-sin-preaviso",
    pack: "modelos",
    path: "/baja-voluntaria-sin-preaviso",
    h1: "Baja voluntaria sin preaviso: «me descuentan del finiquito»",
    title: "Baja voluntaria sin preaviso: descuento del finiquito",
    description:
      "Si te vas sin preaviso, la empresa puede descontar del finiquito los días no preavisados. Qué es legal, qué no, y un modelo de escrito.",
    lead:
      "Te vas ya. La empresa dice que te descuenta del finiquito los días de preaviso que no diste. Eso no es una «multa» inventada: puede ser compensación por el incumplimiento del preaviso del convenio o del contrato. No es automático ni ilimitado. Esta guía explica el descuento y deja un modelo. No somos despacho.",
    cta: { href: BOE_ET_URL, label: "Estatuto de los Trabajadores (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedTrabajo,
    sections: [
      {
        id: "descuento",
        title: "El descuento del finiquito, con nombre",
        paragraphs: [
          "Si el convenio o el contrato te obligaban a preavisar y no lo hiciste, la empresa puede reclamar los daños de esa falta de preaviso. En la práctica suele traducirse en un descuento en la liquidación equivalente a los días no preavisados (salario de esos días). No es un cajón libre: tiene que estar anclado en el preaviso que te correspondía, no en un número que se saquen de la manga.",
          "El Estatuto no fija un descuento automático nacional. Lo que sí existe es la dimisión (art. 49.1.d) y la obligación de preavisar cuando convenio, contrato o costumbre lo imponen. Si estás en periodo de prueba, no hay preaviso legal (art. 14): no te pueden aplicar esta lógica. Si dimites por un incumplimiento grave de la empresa, puede ser extinción causal (art. 50), no una baja voluntaria: otro escrito y otro efecto sobre el paro.",
        ],
        lists: [
          [
            "Pide el desglose por escrito: qué días descuentan y con qué precepto de convenio o contrato.",
            "No firmes «saldo y finiquito» si el descuento no te cuadra: «recibí, no conforme».",
            "El descuento no borra vacaciones no disfrutadas ni pagas extra ya devengadas.",
            "Baja voluntaria ordinaria: no hay prestación SEPE. El certificado de empresa no abre el paro en este caso.",
          ],
        ],
      },
      {
        id: "modelo",
        title: "Modelo: me voy sin preaviso y pido el desglose",
        paragraphs: [
          "Úsalo si ya no vas a completar los 15 días (o el plazo de tu convenio) y quieres dejar constancia y pedir la liquidación desglosada.",
        ],
        models: [
          {
            id: "sin-preaviso",
            title: "Escrito de baja inmediata y petición de liquidación",
            body: `[Lugar], [fecha]

A la atención de Dirección / Personal
[Empresa]

Asunto: Baja voluntaria con efectos inmediatos

Comunico mi baja voluntaria con efectos de [fecha de hoy / último día efectivo], al no poder completar el preaviso.

Ruego liquidación desglosada (salario, pagas, vacaciones y, si aplican, descuentos). Si descuentan días de preaviso, indiquen el precepto del convenio o del contrato en el que se apoyan.

No firmaré un saldo y finiquito de renuncia sin ese desglose. Firmaré, en su caso, la recepción de cantidades.

[Nombre y apellidos]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "baja-periodo-de-prueba",
    pack: "modelos",
    path: "/baja-periodo-de-prueba",
    h1: "Baja en periodo de prueba: sin preaviso (art. 14 ET)",
    title: "Baja en periodo de prueba sin preaviso: artículo 14 ET",
    description:
      "En periodo de prueba cualquiera de las dos partes puede extinguir el contrato sin preaviso y sin alegar causa, salvo pacto. Modelo de escrito.",
    lead:
      "El periodo de prueba tiene una regla propia: en el periodo de prueba el artículo 14 del Estatuto de los Trabajadores permite a cualquiera de las dos partes resolver el contrato sin alegar causa y sin preaviso, salvo que hayáis pactado otra cosa. No es una baja voluntaria de 15 días. Es otra figura. Copia el modelo y mira si tu contrato sí exigía aviso.",
    cta: { href: BOE_ET_URL, label: "Artículo 14 ET (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedTrabajo,
    sections: [
      {
        id: "art14",
        title: "Lo que dice el artículo 14 (y lo que no)",
        paragraphs: [
          "Durante el periodo de prueba, la empresa o tú podéis extinguir la relación laboral sin necesidad de preaviso y sin motivar la decisión, a no ser que el convenio o el contrato hayan pactado un aviso. El periodo tiene un tope legal (según tipo de contrato y cualificación); si ya se agotó, no estás en prueba: entonces sí aplica el preaviso de una baja ordinaria.",
          "La empresa tampoco tiene que preavisarte si te «no supera» la prueba, salvo pacto. Si te echan pasado el periodo o el periodo es nulo (no consta por escrito cuando es preceptivo, o se encadena de forma abusiva), ya no es art. 14: puede ser un despido. Esta página no califica tu caso.",
        ],
        lists: [
          [
            "Sin preaviso legal en periodo de prueba, salvo pacto en contrario (art. 14 ET).",
            "No uses la carta de 15 días si aún estás en prueba: mezclar figuras lía la liquidación.",
            "Pide por escrito que te confirmen que el cese se tramita como no superación / desistimiento en prueba.",
            "Prestación SEPE: el desistimiento en prueba por el trabajador suele tratarse como baja voluntaria a efectos de paro. El despido o la no superación por la empresa es otro supuesto.",
          ],
        ],
      },
      {
        id: "modelo",
        title: "Modelo de escrito (periodo de prueba)",
        paragraphs: ["Corto a propósito. No prometas 15 días que el art. 14 no te exige."],
        models: [
          {
            id: "prueba",
            title: "Desistimiento en periodo de prueba",
            body: `[Lugar], [fecha]

A la atención de Personal
[Empresa]

Asunto: Extinción del contrato en periodo de prueba (art. 14 ET)

Comunico que desisto del contrato en periodo de prueba, con efectos de [fecha], al amparo del artículo 14 del Estatuto de los Trabajadores. Salvo pacto escrito de preaviso, esta comunicación produce efectos sin plazo de aviso.

Ruego liquidación de los días trabajados y conceptos devengados.

[Nombre y apellidos]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "modelo-finiquito",
    pack: "modelos",
    path: "/modelo-finiquito",
    h1: "Solicitud de finiquito: qué pedir y qué no firmar a ciegas",
    title: "Solicitud de finiquito y saldo y finiquito: modelo",
    description:
      "Modelo para pedir el desglose del finiquito. Firmar «saldo y finiquito» no es un trámite cosmética: puede usarse como renuncia. Cómo pedir el papel sin tragar el miedo.",
    lead:
      "El miedo de verdad no es la carta de baja: es el papel del último día. «Saldo y finiquito» puede interpretarse como que no vas a reclamar. Puedes pedir el desglose, firmar solo que has recibido el dinero, o anotar «no conforme». Este modelo pide la liquidación. No somos despacho.",
    cta: { href: BOE_ET_URL, label: "Estatuto de los Trabajadores (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedTrabajo,
    sections: [
      {
        id: "que-es",
        title: "Finiquito no es un hechizo",
        paragraphs: [
          "La liquidación debe incluir salario del mes, pagas extra al prorrateo o pagadas, vacaciones no disfrutadas y otros conceptos devengados. Un descuento de preaviso, si lo hay, tiene que ir desglosado. Firmar que has cobrado no equivale automáticamente a renunciar a horas extra, diferencias salariales o un despido mal etiquetado.",
          "La doctrina de los tribunales no trata todo «saldo y finiquito» como una transacción cerrada. Aun así, no firmes a ciegas. Si te presionan en la puerta, escribe «recibí cantidades, no conforme» o no firmes el documento de renuncia. Conserva copia.",
        ],
      },
      {
        id: "modelo",
        title: "Modelo de solicitud de liquidación",
        paragraphs: ["Entrégalo con la baja o en los días siguientes. Pide desglose, no un total opaco."],
        models: [
          {
            id: "solicitud-finiquito",
            title: "Petición de finiquito desglosado",
            body: `[Lugar], [fecha]

A la atención de Personal
[Empresa]

Asunto: Solicitud de liquidación / finiquito desglosado

Tras el cese con efectos de [fecha], ruego me entreguen la liquidación desglosada: salario, pagas, vacaciones no disfrutadas, horas extra si constan, y cualquier descuento (con precepto de convenio o contrato).

Firmaré la recepción de cantidades. No firmaré un saldo y finiquito de renuncia genérica sin ese desglose y sin tiempo para revisarlo.

[Nombre y apellidos]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "he-firmado-finiquito-puedo-reclamar",
    pack: "modelos",
    path: "/he-firmado-finiquito-puedo-reclamar",
    h1: "He firmado el finiquito: ¿puedo reclamar?",
    title: "He firmado el saldo y finiquito: cuándo se puede reclamar",
    description:
      "Firmar el finiquito no cierra siempre todas las reclamaciones. Plazos, «no conforme» y el escrito previo al SMAC. No es asesoramiento de tu caso.",
    lead:
      "Sí se puede reclamar en muchos supuestos, pero no es un botón mágico. Un saldo y finiquito firmado bajo presión, sin desglose o dejando fuera conceptos (horas extra, diferencias, un despido disfrazado de baja) no es el final de la película. El plazo de caducidad de una acción de despido es corto. Esta página no sustituye a un profesional. Deja un modelo de reclamación previa.",
    cta: { href: BOE_ET_URL, label: "Estatuto de los Trabajadores (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedTrabajo,
    sections: [
      {
        id: "cuando",
        title: "Qué suele importar (sin calificar tu caso)",
        paragraphs: [
          "Los tribunales miran si había transacción real, si conocías lo que firmabas, si el documento lista conceptos o es una fórmula vacía, y si hay vicio de consentimiento. Un «no conforme» manuscrito ayuda. Un finiquito que no menciona las horas extra no las borra por arte de magia.",
          "El despido tiene plazo de caducidad de 20 días hábiles desde la extinción (art. 59.3 ET), con papeleta de conciliación (SMAC u órgano autonómico equivalente) que interrumpe. Las cantidades (salarios) tienen plazo de prescripción más largo (un año, art. 59.1). No dejes pasar el corto si lo que discutes es que te echaron.",
        ],
      },
      {
        id: "modelo",
        title: "Modelo: he firmado y reclamo",
        paragraphs: ["Es un escrito a la empresa, previo a la papeleta. No es la demanda."],
        models: [
          {
            id: "reclamo-finiquito",
            title: "Reclamación tras firmar finiquito",
            body: `[Lugar], [fecha]

A [empresa]
Asunto: Reclamación de cantidades / impugnación de efectos del finiquito

El [fecha] firmé un documento de liquidación. Reclamo [conceptos: diferencias salariales / horas extra / vacaciones / indemnización] por importe de [cantidad] €, que no quedaron saldados de forma consciente y desglosada.

El finiquito no implica renuncia a estos conceptos. Ruego abono o respuesta escrita en 7 días. En caso contrario, formularé papeleta de conciliación.

[Nombre]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "certificado-empresa-sepe",
    pack: "modelos",
    path: "/certificado-empresa-sepe",
    h1: "Certificado de empresa para el SEPE (tras despido, no tras baja voluntaria)",
    title: "Certificado de empresa SEPE: despido, no baja voluntaria",
    description:
      "El certificado de empresa se pide para la prestación por desempleo tras un despido o fin de contrato. La baja voluntaria ordinaria no abre el paro. Modelo de solicitud a la empresa.",
    lead:
      "Este papel no es el hermano de la carta de dimisión. El certificado de empresa lo usa el SEPE para la prestación por desempleo cuando el cese es un despido, un fin de contrato, un ERE u otro supuesto legal de paro. Tras una baja voluntaria ordinaria no hay prestación: pedir el certificado «por si acaso» no cambia esa regla. La empresa debe transmitirlo por certific@2. Tú puedes reclamarle copia.",
    cta: { href: SEPE_URL, label: "Sede SEPE" },
    secondaryCta: { href: BOE_ET_URL, label: "Estatuto de los Trabajadores (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedTrabajo,
    sections: [
      {
        id: "cuando",
        title: "Cuándo sí y cuándo no",
        paragraphs: [
          "Sí: te han despedido (objetivo, disciplinario, improcedente reconocido), se te acaba el temporal, hay un ERE, o un supuesto específico que la ley trata como situación legal de desempleo. Entonces la empresa envía el certificado al SEPE y tú pides la prestación en la sede electrónica con Cl@ve, en el plazo de 15 días hábiles desde el cese.",
          "No: te has ido tú con una baja voluntaria ordinaria. El SEPE no te va a reconocer el paro por ese cese. Hay excepciones muy tasadas (traslado que obliga a irse, impago grave que se articula como art. 50, etc.): no las improvises en esta carta. Si tu caso es dimisión, usa las guías de baja; no este certificado como talismán.",
        ],
        lists: [
          [
            "Tras despido o fin de contrato: sí, certificado de empresa + solicitud de prestación en sede.sepe.gob.es.",
            "Tras baja voluntaria ordinaria: no hay prestación; este certificado no la abre.",
            "La empresa lo tramita por certific@2. Si no lo hace, reclama por escrito y al SEPE.",
            "Plazo típico de solicitud de paro: 15 días hábiles desde el cese.",
          ],
        ],
      },
      {
        id: "modelo",
        title: "Modelo de solicitud a la empresa (solo si el cese da paro)",
        paragraphs: ["No lo uses para maquillar una dimisión."],
        models: [
          {
            id: "cert-empresa",
            title: "Petición de certificado de empresa",
            body: `[Lugar], [fecha]

A Personal / [empresa]

Asunto: Certificado de empresa para el SEPE

Tras el cese de [fecha] por [despido / fin de contrato / otro supuesto de desempleo], ruego transmitan el certificado de empresa al SEPE por certific@2 y me entreguen copia.

Este escrito no corresponde a una baja voluntaria.

[Nombre]
[DNI/NIE]
[Nº SS si lo tienes]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "modelo-excedencia-voluntaria",
    pack: "modelos",
    path: "/modelo-excedencia-voluntaria",
    h1: "Carta de excedencia voluntaria",
    title: "Modelo de excedencia voluntaria (art. 46 ET)",
    description:
      "Excedencia voluntaria: un año de antigüedad, entre 4 meses y 5 años, reingreso preferente no reserva del mismo puesto. Carta para copiar.",
    lead:
      "La excedencia voluntaria (art. 46.2 ET) exige al menos un año de antigüedad. Dura entre cuatro meses y cinco años. No reserva el mismo puesto: hay un derecho preferente de reingreso cuando hay vacante. El convenio puede mejorar esto. Preavisa con el plazo del convenio; 15-30 días es lo habitual.",
    cta: { href: BOE_ET_URL, label: "Artículo 46 ET (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedTrabajo,
    sections: [
      {
        id: "reglas",
        title: "Reglas que la carta no puede saltarse",
        paragraphs: [
          "No es un permiso. No cotizas (salvo convenios especiales). No hay paro por el mero hecho de pedirla. Para volver, solicita el reingreso por escrito antes de que acabe. Si no hay vacante, el derecho preferente sigue; no es un despido automático.",
        ],
        models: [
          {
            id: "excedencia",
            title: "Solicitud de excedencia voluntaria",
            body: `[Lugar], [fecha]

A Personal / [empresa]

Asunto: Excedencia voluntaria (art. 46.2 ET)

Solicito excedencia voluntaria de [duración, entre 4 meses y 5 años], con inicio el [fecha], al cumplir el requisito de un año de antigüedad.

Ruego acuse de recibo. Solicitaré el reingreso por escrito antes del fin del periodo.

[Nombre]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "modelo-reduccion-jornada",
    pack: "modelos",
    path: "/modelo-reduccion-jornada",
    h1: "Reducción de jornada por guarda legal",
    title: "Modelo de reducción de jornada por guarda legal (art. 37.6 ET)",
    description:
      "Guarda legal de menor de 12 años o persona con discapacidad: reducción de jornada con disminución proporcional del salario. Preaviso y concreción horaria.",
    lead:
      "El artículo 37.6 del Estatuto reconoce la reducción de jornada por guarda legal de un menor de 12 años (o persona con discapacidad que no trabaje). El salario baja en la misma proporción. Tú propones el horario; la empresa no puede negarlo a capricho, aunque puede haber negociación y, si hay conflicto, el cauce es el del art. 139 LRJS. Preavisa 15 días o el plazo del convenio.",
    cta: { href: BOE_ET_URL, label: "Artículo 37 ET (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedTrabajo,
    sections: [
      {
        id: "como",
        title: "Qué tiene que decir el escrito",
        paragraphs: [
          "Identifica al menor o la persona a cargo, el porcentaje de reducción y el horario concreto. Adjunta libro de familia o certificado. No es un favor: es un derecho. El convenio puede concretar el preaviso.",
        ],
        models: [
          {
            id: "guarda",
            title: "Solicitud de reducción por guarda legal",
            body: `[Lugar], [fecha]

A Personal / [empresa]

Asunto: Reducción de jornada por guarda legal (art. 37.6 ET)

Solicito reducción de jornada del [porcentaje] % por guarda legal de [nombre del menor / persona], nacido/a el [fecha], con concreción horaria de [días y horas].

Fecha de efectos: [fecha, respetando el preaviso del convenio o 15 días].
Adjunto [libro de familia / certificado].

[Nombre]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "solicitud-vacaciones",
    pack: "modelos",
    path: "/solicitud-vacaciones",
    h1: "Solicitud de vacaciones por escrito",
    title: "Modelo de solicitud de vacaciones (art. 38 ET)",
    description:
      "Las vacaciones se conocen con dos meses de antelación. Un escrito evita el «ya te diré». Modelo corto para convenio y calendario.",
    lead:
      "El artículo 38 ET dice que el periodo se fija de común acuerdo y que el calendario de vacaciones se conoce al menos con dos meses de antelación. Un email no es burocracia inútil: deja fecha, días y acuse. El convenio manda sobre turnos y puentes. No hay un modelo ministerial.",
    cta: { href: BOE_ET_URL, label: "Artículo 38 ET (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedTrabajo,
    sections: [
      {
        id: "modelo",
        title: "Modelo",
        paragraphs: [
          "Si te las niegan, pide la razón por escrito. No «compensarlas» en dinero salvo fin de contrato. El año natural y el convenio marcan cuándo caducan.",
        ],
        models: [
          {
            id: "vacaciones",
            title: "Solicitud de vacaciones",
            body: `[Lugar], [fecha]

A [responsable / Personal]

Asunto: Solicitud de vacaciones

Solicito vacaciones del [fecha inicio] al [fecha fin], ambos inclusive ([n] días laborables / naturales según convenio).

Ruego confirmación escrita.

[Nombre]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "reclamacion-salarios-modelo",
    pack: "modelos",
    path: "/reclamacion-salarios-modelo",
    h1: "Reclamación de salarios atrasados (previa al SMAC)",
    title: "Modelo de reclamación de salarios antes del SMAC",
    description:
      "Escrito a la empresa reclamando salarios. Es el paso previo razonable a la papeleta de conciliación (SMAC u órgano autonómico). No es la demanda.",
    lead:
      "Antes de la papeleta de conciliación, deja rastro: un escrito con cantidades, meses y plazo de pago. El SMAC (o el órgano de tu comunidad) es el paso previo a demanda, no un producto que vendamos. Prescripción típica: un año (art. 59.1 ET). No somos el servicio de conciliación.",
    cta: { href: MITES_URL, label: "Ministerio de Trabajo" },
    secondaryCta: { href: BOE_ET_URL, label: "Artículo 59 ET (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedTrabajo,
    sections: [
      {
        id: "previo",
        title: "Para qué sirve este papel",
        paragraphs: [
          "Sirve para que no digan que no reclamaste. Detalla mes a mes. Si hay pluses o horas extra, sepáralos. Da un plazo corto (7-10 días). Si no pagan, la papeleta de conciliación se presenta en el organismo de tu comunidad (SMAC, CMAC, UMAC…): busca la sede autonómica, no un gestor.",
        ],
        models: [
          {
            id: "salarios",
            title: "Reclamación previa de salarios",
            body: `[Lugar], [fecha]

A [empresa]

Asunto: Reclamación de salarios atrasados

Reclamo [importe] € en concepto de salarios de [meses], según el siguiente desglose:
- [mes]: [importe] €
- [mes]: [importe] €

Ruego ingreso en [IBAN] en 10 días. En caso contrario, presentaré papeleta de conciliación.

[Nombre]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
  {
    id: "solicitud-permiso-retribuido",
    pack: "modelos",
    path: "/solicitud-permiso-retribuido",
    h1: "Solicitud de permiso retribuido o días de asuntos propios",
    title: "Modelo de permiso retribuido y asuntos propios según convenio",
    description:
      "Permisos del artículo 37 ET (matrimonio, fallecimiento, mudanza…) y asuntos propios si el convenio los crea. El Estatuto no inventa «asuntos propios» universales.",
    lead:
      "El artículo 37 ET lista permisos retribuidos tasados (matrimonio, accidente de familiar, mudanza, deber inexcusable…). Los «días de asuntos propios» no son un derecho estatal genérico: salen del convenio. Lee el tuyo antes de copiar. Adjunta el justificante que pida el convenio.",
    cta: { href: BOE_ET_URL, label: "Artículo 37 ET (BOE)" },
    disclaimer: DISCLAIMER_MODELOS,
    related: relatedTrabajo,
    sections: [
      {
        id: "modelo",
        title: "Modelo",
        paragraphs: [
          "Indica el precepto (art. 37.3 ET o artículo del convenio). Si son asuntos propios, cita el convenio. Un permiso no es vacaciones.",
        ],
        models: [
          {
            id: "permiso",
            title: "Solicitud de permiso",
            body: `[Lugar], [fecha]

A Personal / [empresa]

Asunto: Permiso retribuido / asuntos propios

Solicito permiso el/los día(s) [fechas] por [causa: matrimonio / fallecimiento / mudanza / deber público / asuntos propios del convenio art. X], al amparo de [art. 37 ET / convenio].

Adjunto [justificante].

[Nombre]
[DNI/NIE]
[Firma]`,
          },
        ],
      },
    ],
  },
];
