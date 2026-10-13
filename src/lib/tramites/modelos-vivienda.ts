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
    "id": "preaviso-fin-alquiler",
    "pack": "modelos",
    "path": "/preaviso-fin-alquiler",
    "h1": "Preaviso del inquilino: desistimiento y otros plazos de alquiler",
    "title": "Preaviso del inquilino: desistimiento y otros plazos de alquiler",
    "description": "Desistimiento del artículo 11 LAU tras seis meses y con 30 días de preaviso. Indemnización pactada y diferencias con no renovar al vencimiento.",
    "lead": "El artículo 11 de la LAU permite al inquilino desistir una vez transcurridos al menos seis meses, con un mínimo de 30 días de preaviso. Comprueba primero que tu contrato de vivienda está sujeto a ese régimen y si pacta indemnización. La carta de esta página sirve para ese desistimiento; la no renovación al vencimiento tiene reglas distintas.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003",
      "label": "Consultar la LAU en BOE"
    },
    "disclaimer": "No somos Administración ni sustituimos el asesoramiento sobre tu contrato. Comprueba régimen, fechas y cláusulas antes de utilizar el escrito; una carta no garantiza la extinción del contrato ni la admisión de una demanda.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003#a11",
        "label": "BOE: desistimiento e indemnización"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003#a9",
        "label": "BOE: duración mínima y preaviso del inquilino"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003#a10",
        "label": "BOE: prórroga y distintos preavisos"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2019-3108#dt",
        "label": "BOE: régimen de contratos anteriores a marzo de 2019"
      }
    ],
    "related": [
      {
        "href": "/no-renovacion-alquiler",
        "label": "No renovación por el arrendador"
      },
      {
        "href": "/requerimiento-impago-alquiler",
        "label": "Reclamar rentas impagadas"
      },
      {
        "href": "/inventario-fianza-alquiler",
        "label": "Entrega de llaves y fianza"
      }
    ],
    "sections": [
      {
        "id": "supuesto",
        "title": "Comprobar contrato, fecha y motivo de salida",
        "paragraphs": [
          "Estas reglas se refieren al alquiler de vivienda sujeto al régimen indicado de la LAU. No las apliques automáticamente a un alquiler de temporada, un local o un contrato antiguo. Los contratos anteriores pueden conservar otro régimen; la fecha y las adaptaciones acordadas importan.",
          "Si te marchas antes de seis meses, este desistimiento legal no resuelve por sí solo tu situación. Comprueba las cláusulas y la posibilidad de acuerdo. Comunica una fecha concreta de salida y conserva prueba del contenido y recepción del aviso."
        ]
      },
      {
        "id": "indemnizacion",
        "title": "Indemnización solo si está pactada",
        "paragraphs": [
          "El artículo 11 contempla una mensualidad de renta vigente por cada año del contrato que reste por cumplir, con parte proporcional para periodos inferiores. No se limita siempre al resto de la anualidad en curso: identifica el periodo contractual pendiente y la cláusula aplicable.",
          "Ejemplo de la fórmula legal: si el pacto la reproduce, la renta es 800 € y quedan 18 meses de contrato, el cálculo es 800 × 1,5 = 1.200 €. El ejemplo no demuestra que tu contrato deba esa cantidad ni incluye otros conceptos. La fianza debe liquidarse separadamente."
        ]
      },
      {
        "id": "plazos",
        "title": "Si lo que quieres es no renovar al vencimiento",
        "paragraphs": [
          "En el régimen de duración introducido en marzo de 2019, distingue estos supuestos antes de elegir fecha:"
        ],
        "lists": [
          [
            "Artículo 9.1: el inquilino puede impedir la prórroga obligatoria anual avisando con al menos 30 días antes del vencimiento correspondiente.",
            "Artículo 10.1: al llegar al vencimiento una vez alcanzados al menos cinco años, o siete si el arrendador es persona jurídica, los avisos son dos meses para el inquilino y cuatro para el arrendador.",
            "Si se entra en las prórrogas anuales adicionales del artículo 10.1, el inquilino puede evitar la siguiente anualidad avisando con un mes. No confundas un mes con 30 días."
          ]
        ]
      },
      {
        "id": "modelo",
        "title": "Modelo de desistimiento del inquilino",
        "paragraphs": [
          "Completa fechas después de comprobar los seis meses y el preaviso mínimo. No afirmes un plazo que aún no has calculado. Acuerda entrega de llaves, lectura de suministros e inventario."
        ],
        "models": [
          {
            "id": "preaviso-inquilino",
            "title": "Desistimiento del artículo 11 LAU",
            "body": "[Lugar], [fecha]\n\nA [arrendador]\nContrato de fecha: [fecha]\nVivienda: [dirección]\n\nComunico mi voluntad de desistir del arrendamiento al amparo del artículo 11 de la LAU, con efectos de [fecha], una vez comprobados el régimen aplicable, los seis meses transcurridos y la antelación mínima de 30 días.\n\nPropongo entregar las llaves el [fecha y hora] y documentar el estado de la vivienda, suministros y liquidación de fianza. Solicito que cualquier indemnización reclamada se detalle conforme al contrato y a la ley.\n\n[Nombre, identificación y firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "no-renovacion-alquiler",
    "pack": "modelos",
    "path": "/no-renovacion-alquiler",
    "h1": "No renovación del alquiler por el arrendador: cuándo cabe y preaviso",
    "title": "No renovación del alquiler por el arrendador: cuándo cabe y preaviso",
    "description": "Antes de enviar la carta, comprueba duración mínima, régimen del contrato, cuatro meses del artículo 10.1 y posibles prórrogas extraordinarias.",
    "lead": "El arrendador no puede terminar cualquier alquiler de vivienda al cumplirse un año enviando una carta. En el régimen vigente de los artículos 9 y 10 de la LAU, comprueba la duración mínima de cinco años, o siete si el arrendador es persona jurídica, y el vencimiento al que corresponde el aviso de cuatro meses. Revisa también las prórrogas aplicables antes de fijar una fecha de salida.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003",
      "label": "Consultar la LAU en BOE"
    },
    "disclaimer": "No somos Administración ni sustituimos el asesoramiento sobre tu contrato. Comprueba régimen, fechas y cláusulas antes de utilizar el escrito; una carta no garantiza la extinción del contrato ni la admisión de una demanda.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003#a9",
        "label": "BOE: prórroga obligatoria y recuperación por necesidad"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003#a10",
        "label": "BOE: no renovación y prórrogas extraordinarias"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2019-3108#dt",
        "label": "BOE: contratos anteriores y régimen transitorio"
      },
      {
        "href": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-9359",
        "label": "BOE: derogación del Real Decreto-ley 8/2026"
      }
    ],
    "related": [
      {
        "href": "/preaviso-fin-alquiler",
        "label": "Desistimiento del inquilino"
      },
      {
        "href": "/requerimiento-impago-alquiler",
        "label": "Reclamar rentas impagadas"
      },
      {
        "href": "/inventario-fianza-alquiler",
        "label": "Entrega de llaves y fianza"
      }
    ],
    "sections": [
      {
        "id": "vencimiento",
        "title": "Identificar el vencimiento que puede comunicarse",
        "paragraphs": [
          "La regla de cuatro meses del artículo 10.1 se sitúa en el vencimiento tras alcanzar al menos cinco o siete años. Si falta el aviso procedente y se inicia su prórroga, puede haber hasta tres anualidades adicionales obligatorias para el arrendador. No presupongas una facultad del propietario para terminar cada anualidad con otra carta.",
          "La recuperación por necesidad del artículo 9.3 es un supuesto distinto y exige sus propias condiciones. La no renovación tampoco es un requerimiento por impago ni una autorización para recuperar la posesión por cuenta propia. Revisa el régimen transitorio si el contrato es anterior a marzo de 2019."
        ]
      },
      {
        "id": "extraordinarias",
        "title": "Comprobar las prórrogas que puedan afectar",
        "paragraphs": [
          "El artículo 10.2 contempla hasta un año por vulnerabilidad acreditada y obliga al gran tenedor en las condiciones previstas; el 10.3 regula hasta tres años por anualidades en zona tensionada, con solicitud, declaración vigente y excepciones. Su aplicación exige revisar contrato, fechas y régimen transitorio, no solo el municipio.",
          "El Real Decreto-ley 8/2026 de marzo estableció otra prórroga, pero el Congreso lo derogó mediante acuerdo publicado el 30 de abril de 2026. No lo uses como una regla vigente para nuevas solicitudes. Si se solicitó o acordó una prórroga durante su vigencia, revisa sus efectos en ese contrato antes de afirmar que la vivienda debe entregarse."
        ]
      },
      {
        "id": "modelo",
        "title": "Carta tras comprobar que procede la no renovación",
        "paragraphs": [
          "Calcula la antelación hasta la recepción y utiliza un medio que permita acreditar contenido y entrega. La plantilla no acredita por sí sola haber respetado cuatro meses ni elimina una prórroga legal."
        ],
        "models": [
          {
            "id": "no-renovacion",
            "title": "Comunicación del arrendador para un vencimiento comprobado",
            "body": "[Lugar], [fecha]\n\nA [arrendatario]\nVivienda: [dirección]\nContrato de fecha: [fecha]\n\nComunico mi voluntad de no renovar el arrendamiento al vencimiento de [fecha], conforme al régimen aplicable del artículo 10.1 de la LAU.\nLa fecha indicada se basa en [duración contractual, prórrogas y cómputo revisados]. Esta comunicación se formula sin perjuicio de las prórrogas legales que procedan.\n\nSolicito confirmar la recepción y coordinar, cuando corresponda, la entrega de llaves, inventario y liquidación de fianza.\n\n[Arrendador: nombre, identificación y firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "requerimiento-impago-alquiler",
    "pack": "modelos",
    "path": "/requerimiento-impago-alquiler",
    "h1": "Requerimiento de alquiler impagado: deuda, recepción y pasos posteriores",
    "title": "Requerimiento de alquiler impagado: deuda, recepción y pasos posteriores",
    "description": "Modelo para reclamar rentas detalladas. Distingue plazo de pago propuesto, regla de treinta días sobre enervación y negociación previa antes de demandar.",
    "lead": "Identifica la deuda, descuenta los pagos recibidos y comunica la reclamación por un medio que permita probar su contenido y recepción. El artículo 27 de la LAU contempla la resolución por falta de pago, pero esta carta no es una demanda ni garantiza un desahucio. Si prevés acudir al juzgado, revisa antes las reglas de enervación y negociación previa.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003",
      "label": "Consultar la LAU en BOE"
    },
    "disclaimer": "No somos Administración ni sustituimos el asesoramiento sobre tu contrato. Comprueba régimen, fechas y cláusulas antes de utilizar el escrito; una carta no garantiza la extinción del contrato ni la admisión de una demanda.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003#a27",
        "label": "BOE: incumplimiento y falta de pago"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2000-323#a22",
        "label": "BOE: enervación y requerimiento fehaciente previo"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2025-76#a5",
        "label": "BOE: negociación previa como requisito de procedibilidad"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2025-76#a1-2",
        "label": "BOE: acreditación del intento de negociación"
      }
    ],
    "related": [
      {
        "href": "/preaviso-fin-alquiler",
        "label": "Desistimiento del inquilino"
      },
      {
        "href": "/no-renovacion-alquiler",
        "label": "No renovación por el arrendador"
      },
      {
        "href": "/inventario-fianza-alquiler",
        "label": "Entrega de llaves y fianza"
      }
    ],
    "sections": [
      {
        "id": "deuda",
        "title": "Desglosar la cantidad reclamada",
        "paragraphs": [
          "Relaciona cada mensualidad, vencimiento, importe y pago parcial. Separa suministros u otros conceptos y comprueba que sean exigibles. Adjunta la documentación necesaria y corrige cualquier diferencia antes de reclamar una cifra global.",
          "Indica fecha propuesta para el pago y medio de abono. Quince días no es un plazo legal universal de esta carta; no atribuyas al número elegido efectos judiciales que dependen de otras condiciones."
        ]
      },
      {
        "id": "enervacion",
        "title": "Treinta días y enervación son una cuestión distinta",
        "paragraphs": [
          "La enervación permite, cuando procede, evitar el desahucio pagando lo debido en los términos procesales. El artículo 22.4 de la LEC la excluye, entre otros casos, si hubo requerimiento de pago fehaciente con al menos treinta días de antelación a la demanda y no se había pagado al presentarla.",
          "No basta escribir «15 días» o «30 días» en una plantilla: importan el requerimiento, su acreditación, el tiempo transcurrido y la situación de pagos. También hay reglas sobre enervación anterior. Antes de demandar, haz revisar el expediente concreto."
        ]
      },
      {
        "id": "negociacion",
        "title": "Comprobar la negociación previa a la demanda",
        "paragraphs": [
          "La Ley Orgánica 1/2025 establece, con carácter general y con excepciones, un intento de negociación previo para la admisión de demandas civiles. Una reclamación de pago no acredita automáticamente que se haya cumplido ese requisito.",
          "Si vas a iniciar un medio adecuado de solución de controversias (MASC), revisa objeto, forma, acreditación, plazos y confidencialidad. Esta plantilla reclama una deuda; no certifica haber realizado esa negociación ni sirve como oferta vinculante confidencial."
        ]
      },
      {
        "id": "modelo",
        "title": "Modelo de reclamación de cantidades",
        "paragraphs": [
          "Completa únicamente importes comprobados. Conserva copia y evidencia de recepción. Evita presentar esta comunicación como una orden judicial."
        ],
        "models": [
          {
            "id": "impago",
            "title": "Reclamación detallada de rentas",
            "body": "[Lugar], [fecha]\n\nA [arrendatario]\nVivienda y contrato: [datos]\n\nReclamo las siguientes cantidades vencidas a fecha [fecha]:\n- Renta de [periodo], vencimiento [fecha]: [importe].\n- Otros conceptos exigibles: [concepto, fundamento e importe].\n- Pagos recibidos y descontados: [importe].\nTotal pendiente: [importe y cálculo].\n\nSolicito el pago antes de [fecha propuesta] por [medio]. Si ya se ha abonado alguna cantidad o existe discrepancia, ruego comunicarlo con su justificación a [contacto].\nDocumentos que acompañan la reclamación: [lista].\n\nEste escrito reclama las cantidades indicadas; no constituye una demanda ni una resolución judicial.\n\n[Arrendador: nombre, identificación y firma]"
          }
        ]
      }
    ]
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
    "id": "autorizacion-empadronamiento",
    "pack": "modelos",
    "path": "/autorizacion-empadronamiento",
    "h1": "Autorización de empadronamiento: quién firma y cómo acreditar residencia",
    "title": "Autorización de empadronamiento: quién firma y cómo acreditar residencia",
    "description": "Autorización para un domicilio donde ya constan vecinos: persona adulta empadronada con título de posesión efectiva. Alternativas si falta autorización.",
    "lead": "Si solicitas el alta en una vivienda donde ya constan personas empadronadas, las instrucciones estatales prevén autorización escrita de una persona mayor de edad empadronada allí y con un título de posesión efectiva a su nombre, como propiedad o alquiler. No basta cualquier firma de un conviviente. El padrón debe reflejar dónde resides realmente.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2020-4784",
      "label": "Consultar instrucciones y anexos oficiales del padrón"
    },
    "secondaryCta": {
      "href": "/empadronarse",
      "label": "Buscar el trámite de tu ayuntamiento"
    },
    "disclaimer": "No somos Administración. Utiliza la hoja y los anexos que correspondan en tu ayuntamiento. Esta plantilla orientativa no garantiza el alta ni sustituye documentos o consentimientos exigibles.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2020-4784",
        "label": "BOE: apartados 2.3 y 3.1, domicilio y autorización"
      },
      {
        "href": "https://idapadron.ine.es/repositorio/legislacion/A290426.HTML",
        "label": "Consejo de Empadronamiento, abril de 2026: negativa de autorización"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a15",
        "label": "BOE: residencia habitual y padrón"
      }
    ],
    "related": [
      {
        "href": "/empadronarse/sin-contrato",
        "label": "Si no tienes contrato"
      },
      {
        "href": "/declaracion-responsable-padron",
        "label": "Solicitar comprobación de residencia"
      },
      {
        "href": "/autorizacion-empadronar-menor",
        "label": "Consentimiento para un menor"
      }
    ],
    "sections": [
      {
        "id": "firma",
        "title": "Comprobar quién puede autorizar",
        "paragraphs": [
          "Para el supuesto del apartado 3.1, verifica mayoría de edad, inscripción en ese domicilio y título a nombre de quien autoriza. Un volante acredita la inscripción, pero no sustituye por sí solo el título de posesión efectiva.",
          "Si no hay residentes inscritos, o los anteriores han abandonado la vivienda, consulta el procedimiento ordinario de acreditación del domicilio. No adaptes esta autorización como si todos los casos fueran iguales."
        ]
      },
      {
        "id": "sin-autorizacion",
        "title": "Si nadie autoriza pese a que resides allí",
        "paragraphs": [
          "Las instrucciones permiten comprobar la residencia por otros medios, como inspección municipal o informe de Policía Local. El Consejo de Empadronamiento confirma que la negativa de los inscritos no impide el alta cuando el ayuntamiento ha comprobado la residencia efectiva.",
          "El padrón no resuelve disputas de propiedad o arrendamiento ni concede un derecho de ocupación. Explica la situación al ayuntamiento y solicita la comprobación; no inventes una firma o un contrato."
        ]
      },
      {
        "id": "modelo",
        "title": "Modelo para el supuesto de autorización",
        "paragraphs": [
          "Usa primero el formulario municipal y completa solo hechos actuales. No declara residencia efectiva quien únicamente tiene intención de mudarse."
        ],
        "models": [
          {
            "id": "autorizacion-tercero",
            "title": "Autorización de persona adulta inscrita con título",
            "body": "[Lugar], [fecha]\n\nA [ayuntamiento]\n\nYo, [nombre e identificación], mayor de edad y empadronado/a en [dirección], dispongo de [título de posesión efectiva] a mi nombre.\nAutorizo, a efectos de la solicitud padronal, la inscripción de [nombre e identificación], que reside habitualmente en ese domicilio.\n\nDocumentos de identidad, título y otros justificantes aportados según el trámite municipal: [relación].\nFirma de quien autoriza: [firma]\nFirma de la persona solicitante, cuando proceda: [firma]\n\nEsta autorización se refiere a la inscripción padronal; no sustituye un contrato ni modifica derechos sobre la vivienda."
          }
        ]
      }
    ]
  },
  {
    "id": "declaracion-responsable-padron",
    "pack": "modelos",
    "path": "/declaracion-responsable-padron",
    "h1": "Declaración de residencia sin contrato: solicitar comprobación para el padrón",
    "title": "Declaración de residencia sin contrato: solicitar comprobación para el padrón",
    "description": "Escrito de apoyo cuando no puedes acreditar el domicilio con contrato. Comprobación municipal, ausencia de autorización y vía para personas sin domicilio fijo.",
    "lead": "La falta de contrato a tu nombre no elimina la obligación de empadronarte donde resides habitualmente. Puedes explicar los hechos y solicitar que el ayuntamiento compruebe la residencia por los medios admitidos. Una declaración genérica no concede el alta automáticamente ni sustituye por sí sola la documentación de cada caso.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2020-4784",
      "label": "Consultar instrucciones y anexos oficiales del padrón"
    },
    "secondaryCta": {
      "href": "/empadronarse",
      "label": "Buscar el trámite de tu ayuntamiento"
    },
    "disclaimer": "No somos Administración. Utiliza la hoja y los anexos que correspondan en tu ayuntamiento. Esta plantilla orientativa no garantiza el alta ni sustituye documentos o consentimientos exigibles.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2020-4784",
        "label": "BOE: acreditación de residencia y personas sin domicilio"
      },
      {
        "href": "https://idapadron.ine.es/repositorio/legislacion/A290426.HTML",
        "label": "Consejo de Empadronamiento: comprobación ante negativa de autorización"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a17",
        "label": "BOE: gestión municipal y realidad padronal"
      }
    ],
    "related": [
      {
        "href": "/empadronarse/sin-contrato",
        "label": "Empadronamiento sin contrato"
      },
      {
        "href": "/autorizacion-empadronamiento",
        "label": "Quién puede autorizar"
      },
      {
        "href": "/empadronarse/sin-hogar",
        "label": "Sin domicilio fijo"
      }
    ],
    "sections": [
      {
        "id": "comprobar",
        "title": "Explicar qué puedes acreditar",
        "paragraphs": [
          "Identifica dónde vives, desde cuándo y qué documentos reales puedes aportar. El ayuntamiento puede aceptar otras pruebas y realizar comprobaciones. Si utiliza una declaración municipal para tu supuesto, emplea esa; este escrito sirve de apoyo a tu solicitud.",
          "Si falta la autorización de las personas inscritas, solicita expresamente la verificación. Su negativa no es un veto cuando el ayuntamiento ha comprobado que resides allí. No hace falta inventar un contrato ni calificar por anticipado como delito cualquier error en un dato: declara hechos ciertos y corrige los inexactos."
        ]
      },
      {
        "id": "domicilio",
        "title": "Vivienda precaria o ausencia de domicilio fijo",
        "paragraphs": [
          "Las instrucciones admiten como domicilio lugares donde efectivamente se vive, incluidas infraviviendas. No exigen que la vivienda cumpla determinadas condiciones físicas para reflejar la residencia.",
          "Para personas sin techo que residen habitualmente en el municipio y son conocidas por los servicios sociales, existe una vía de domicilio indicado por estos servicios. Requiere informe de residencia y una dirección desde la que puedan intentar hacer llegar notificaciones. No escribas una dirección ficticia elegida por tu cuenta."
        ]
      },
      {
        "id": "modelo",
        "title": "Escrito de apoyo a la solicitud",
        "paragraphs": [
          "Detalla solo tu situación y documentos disponibles. Presenta también la hoja padronal y la identificación exigible por el canal municipal."
        ],
        "models": [
          {
            "id": "declaracion",
            "title": "Declaración de hechos y petición de comprobación",
            "body": "[Lugar], [fecha]\n\nA [ayuntamiento]\nSolicitante: [nombre e identificación]\n\nDeclaro que resido habitualmente en [dirección o descripción precisa del lugar] desde [fecha].\nNo puedo aportar [contrato, autorización u otro documento] por [explicación de hechos].\nAporto como elementos de comprobación: [documentos reales disponibles].\n\nSolicito que se compruebe mi residencia por los medios municipales procedentes y se tramite mi solicitud de inscripción padronal conforme a los hechos acreditados.\nMedio de contacto para la tramitación: [indicar].\nFirma: [firma]\n\nEste escrito no sustituye la hoja padronal ni acredita por sí solo la concesión del alta."
          }
        ]
      }
    ]
  },

];
