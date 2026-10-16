import {
  CITA_DNI_URL,
  DISCLAIMER_CITA,
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
    "id": "cita-dni",
    "pack": "viaje",
    "path": "/dni/cita-previa",
    "h1": "Cita previa DNI en citapreviadnie.es: pedir o consultar",
    "title": "Cita previa DNI en citapreviadnie.es: pedir o consultar",
    "description": "Pide, consulta o anula tu cita del DNI en citapreviadnie.es o el 060. La reserva es gratuita; tasas: 12 € el DNI y 30 € el pasaporte. Revisa oficina y justificante.",
    "lead": "La cita del DNI se solicita en citapreviadnie.es o por el 060, los canales indicados por Interior. La reserva es gratuita y la llamada tiene coste. Antes de confirmar, comprueba si necesitas primera expedición, renovación o duplicado y prepara los datos que solicite el portal oficial.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/cita-previa/",
        "label": "Interior: cita por internet y teléfono"
      },
      {
        "href": "https://www.citapreviadnie.es/citaPreviaDni/Inicio.action",
        "label": "Policía: acceso, consulta y anulación de citas"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: tasa y exenciones del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/",
        "label": "Interior: tasa y exención del pasaporte"
      },
      {
        "href": "https://www.boe.es/buscar/doc.php?id=BOE-A-2023-18093",
        "label": "BOE: coste de las llamadas al 060"
      }
    ],
    "cta": {
      "href": "https://www.citapreviadnie.es/",
      "label": "Consultar cita en citapreviadnie.es"
    },
    "faqs": [
      { "q": "¿Cómo pido cita para el DNI?", "a": "En citapreviadnie.es (con los datos de tu DNI o con DNI electrónico) o llamando al 060. Eliges trámite, oficina, fecha y hora y guardas el justificante. La cita es gratuita." },
      { "q": "¿Cómo consulto o anulo mi cita del DNI?", "a": "Entra en citapreviadnie.es con los mismos datos y elige consultar o anular. Allí verás la oficina, el día y la hora. Si anulas, puedes pedir una cita nueva." },
      { "q": "¿Cuánto cuesta el DNI y cuándo se paga?", "a": "12 € (Ley 84/1978, art. 6). Se paga por internet al pedir la cita o en la oficina, en efectivo o con tarjeta. El pasaporte cuesta 30 €. Las familias numerosas no pagan ninguno de los dos." },
      { "q": "¿Qué llevo a la cita?", "a": "Para renovar, el DNI anterior y una foto reciente de 32 × 26 mm con fondo blanco. Si cambias de domicilio, lleva también el certificado de empadronamiento. La primera vez, además, el certificado literal de nacimiento." },
      { "q": "¿Puedo hacer DNI y pasaporte en la misma cita?", "a": "Sí, si la reserva incluye los dos documentos. En total pagas 42 €." }
    ],
    "related": [
      {
        "href": "/dni",
        "label": "Precio del DNI (12 €), documentos y pasos para renovarlo"
      },
      {
        "href": "/dni/checklist",
        "label": "Documentos para la cita"
      },
      {
        "href": "/dni/consultar-cita",
        "label": "Consultar una reserva existente"
      },
      {
        "href": "/dni/unidades-moviles",
        "label": "Citas de equipos móviles"
      }
    ],
    "sections": [
      {
        "id": "acceso",
        "title": "Entrar en el portal oficial",
        "paragraphs": [
          "Accede desde el enlace de Interior y comprueba que estás en citapreviadnie.es antes de introducir datos. La pantalla de entrada ofrece acceso con datos DNI/NIE o con DNI electrónico. También enlaza una vía para cuando no dispones de los datos por pérdida o sustracción.",
          "Si se trata de una primera expedición o no puedes completar el acceso, consulta las instrucciones del portal o el 060. No inventes datos para superar los campos ni envíes copias de tu documento a RutaTrámite."
        ]
      },
      {
        "id": "reserva",
        "title": "Confirmar y conservar la reserva",
        "paragraphs": [
          "Sigue las opciones de trámite, oficina y fecha que muestre el sistema. Comprueba la identidad de la persona que acudirá, el documento solicitado y la confirmación final. Guarda el localizador o justificante.",
          "Si necesitas DNI y pasaporte, comprueba que la reserva cubra ambos. Para una visita móvil, sigue el canal que publique el ayuntamiento; puede ser distinto del portal general."
        ]
      },
      {
        "id": "disponibilidad",
        "title": "Si no encuentras una fecha adecuada",
        "paragraphs": [
          "Consulta otras oficinas y fechas a las que puedas acudir o utiliza el 060. Una pantalla con error no demuestra que no haya citas. Conserva el mensaje para explicar la incidencia.",
          "Esta web no tiene disponibilidad en directo ni un horario nacional verificado de nuevos huecos. Para revisar o anular una reserva utiliza las opciones oficiales y conserva la confirmación de cualquier cambio."
        ]
      },
      tasasBox
    ],
    "secondaryCta": {
      "href": "/dni/checklist",
      "label": "Qué llevar a la cita"
    }
  },
  {
    "id": "cita-pasaporte",
    "pack": "viaje",
    "path": "/pasaporte/cita-previa",
    "h1": "Cita previa de pasaporte: reserva y documentos",
    "title": "Cita previa de pasaporte: reserva y documentos",
    "description": "Reserva pasaporte en citapreviadnie.es o el 060. Comprueba DNI vigente, fotografía, pasaporte anterior y los documentos y consentimientos de menores.",
    "lead": "Para pedir un pasaporte español en una unidad de documentación en España, consulta cita en citapreviadnie.es o el 060. La persona solicitante debe acudir. Prepara DNI vigente y fotografía, con las excepciones publicadas para menores y para quien obtiene o renueva el DNI el mismo día.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/procedimiento-de-expedicion/",
        "label": "Interior: procedimiento y documentación de pasaporte"
      },
      {
        "href": "https://www.citapreviadnie.es/citaPreviaDni/Inicio.action",
        "label": "Policía: acceso al sistema de citas"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: tasa y exenciones del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/",
        "label": "Interior: tasa y exención del pasaporte"
      },
      {
        "href": "https://www.boe.es/buscar/doc.php?id=BOE-A-2023-18093",
        "label": "BOE: coste de las llamadas al 060"
      }
    ],
    "cta": {
      "href": "https://www.citapreviadnie.es/",
      "label": "Consultar cita en citapreviadnie.es"
    },
    "related": [
      {
        "href": "/dni/checklist",
        "label": "Documentos según el caso"
      },
      {
        "href": "/dni/misma-cita-pasaporte",
        "label": "DNI y pasaporte el mismo día"
      },
      {
        "href": "/pasaporte/bebe",
        "label": "Pasaporte para bebés"
      },
      {
        "href": "/pasaporte/urgente",
        "label": "Viaje inminente y atención excepcional"
      }
    ],
    "sections": [
      {
        "id": "reserva",
        "title": "Comprobar el trámite y la oficina",
        "paragraphs": [
          "Selecciona el trámite de pasaporte y una oficina y fecha disponibles. Si también necesitas DNI, comprueba que la reserva cubra los dos documentos. Para un servicio móvil, sigue el anuncio municipal y las reservas que exija.",
          "Conserva el justificante y revisa los datos del solicitante. Una cita de DNI no garantiza que se añada un pasaporte en ventanilla."
        ]
      },
      {
        "id": "documentos",
        "title": "Documentación de la persona solicitante",
        "paragraphs": [
          "Interior exige DNI en vigor y en estado que no obligue a renovarlo por deterioro, una fotografía reciente de 32 × 26 mm y el pasaporte anterior si todavía está en vigor, para anularlo. No exige otra foto si obtuviste o renovaste el DNI ese mismo día.",
          "La tasa ordinaria es de 30 €, salvo exención por familia numerosa acreditada. Los españoles residentes en el extranjero que lo solicitan en un consulado tienen un procedimiento y alternativas documentales propios; no uses esta reserva como si fuera una cita consular."
        ]
      },
      {
        "id": "menores",
        "title": "Menores sin DNI y consentimiento",
        "paragraphs": [
          "El menor debe acudir. Si no tiene DNI porque aún no está obligado, Interior contempla certificación literal de nacimiento de los últimos seis meses para pasaporte; la mención de finalidad no se exige en certificados electrónicos DICIREG con código personal.",
          "Si renueva un pasaporte expedido por Policía para el que ya se aportó la certificación, puede optar por presentar ese pasaporte anterior. Esa opción no se extiende a los expedidos por consulados.",
          "Deben consentir todas las personas que ejerzan la patria potestad o tutela, no solo quien tenga la custodia. Consulta cómo acreditar consentimiento, identidad y parentesco; la guía de menores desarrolla las vías si no acuden conjuntamente."
        ]
      },
      tasasBox
    ]
  },
  {
    "id": "renovar-dni",
    "pack": "viaje",
    "path": "/dni/renovar-caducado",
    "h1": "Renovar el DNI caducado: plazo, cita y documentos",
    "title": "Renovar el DNI caducado: plazo, cita y documentos",
    "description": "Renueva el DNI en los últimos 180 días de vigencia o, si ya caducó, solicita su renovación. Distingue caducidad, cambio de datos y duplicado por pérdida.",
    "lead": "El DNI puede renovarse durante sus últimos 180 días de vigencia. Si ya ha caducado, existe obligación de renovarlo: ese periodo no es una prórroga de 180 días después de la caducidad. Consulta cita en citapreviadnie.es o el 060 y prepara los documentos de tu supuesto.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.boe.es/eli/es/rd/2025/04/01/255/con",
        "label": "BOE: artículos 8 y 9, renovación y duplicados"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/documentacion-necesaria-para-su-tramitacion/index.html",
        "label": "Interior: documentos para renovar el DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: tasa y exenciones del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/",
        "label": "Interior: tasa y exención del pasaporte"
      },
      {
        "href": "https://www.boe.es/buscar/doc.php?id=BOE-A-2023-18093",
        "label": "BOE: coste de las llamadas al 060"
      }
    ],
    "cta": {
      "href": "https://www.citapreviadnie.es/",
      "label": "Consultar cita en citapreviadnie.es"
    },
    "related": [
      {
        "href": "/dni/checklist",
        "label": "Documentación para renovar"
      },
      {
        "href": "/dni/cambio-domicilio",
        "label": "Cambio de domicilio y exención"
      },
      {
        "href": "/dni/caducado-viajar-ue",
        "label": "Si tienes un viaje previsto"
      }
    ],
    "sections": [
      {
        "id": "caducidad",
        "title": "Caducidad y cambio de datos",
        "paragraphs": [
          "La regla de 180 días permite adelantar la renovación por caducidad. También debe actualizarse el DNI cuando cambian los datos que contiene, aportando los justificantes correspondientes.",
          "La renovación exige presencia física de la persona titular. Lleva el documento anterior si lo conservas y prepara fotografía reciente de 32 × 26 mm; algunas unidades disponen de captura automatizada. Consulta las excepciones y requisitos de imagen en Interior."
        ]
      },
      {
        "id": "duplicado",
        "title": "Pérdida, robo o deterioro: duplicado",
        "paragraphs": [
          "Estos supuestos se regulan por separado en el artículo 9. En pérdida o sustracción debe presentarse denuncia policial o administrativa. Interior explica cómo comunicar una denuncia ya presentada o realizarla al tramitar el documento.",
          "El duplicado conserva, como regla, la vigencia del documento sustituido. Si quedan 90 días o menos, se expide con la validez de una renovación. No confundas esos 90 días con los 180 de la renovación ordinaria."
        ]
      },
      {
        "id": "tasa",
        "title": "Comprobar el motivo y las exenciones",
        "paragraphs": [
          "La tasa ordinaria del DNI es de 12 €. Renovar un DNI en vigor por cambio de filiación o domicilio está exento; la ventana de los últimos 180 días no elimina por sí sola esa exención. También existen las exenciones que se detallan abajo.",
          "Si la caducidad coincide con un viaje, comprueba el documento válido que exige el destino y cada escala. El resguardo de cita no sustituye al DNI ni al pasaporte."
        ]
      },
      tasasBox
    ]
  },
  {
    "id": "misma-cita",
    "pack": "viaje",
    "path": "/dni/misma-cita-pasaporte",
    "h1": "DNI y pasaporte en la misma cita: requisitos y excepciones",
    "title": "DNI y pasaporte en la misma cita: requisitos y excepciones",
    "description": "Comprueba que la reserva incluya DNI y pasaporte. En equipos móviles pueden pedir dos citas. Documentos, fotografía y tasas de ambos trámites.",
    "lead": "Puedes organizar la expedición de DNI y pasaporte el mismo día, pero la reserva debe cubrir ambos trámites. Si el portal ofrece la opción conjunta, selecciónala y comprueba el justificante. Una cita solo para DNI no garantiza que puedan añadir el pasaporte. En determinados servicios móviles se exigen dos reservas.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/cita-previa/",
        "label": "Interior: canales oficiales de cita"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/procedimiento-de-expedicion/",
        "label": "Interior: pasaporte tras obtener o renovar DNI el mismo día"
      },
      {
        "href": "https://www.pielagos.es/noticias/noticia/abierta-la-solicitud-de-cita-previa-para-la-expedicion-del-dni-y-el-pasaporte-en-renedo-de-pielagos-9018",
        "label": "Piélagos: dos reservas para DNI y pasaporte en VIDOC"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: tasa y exenciones del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/",
        "label": "Interior: tasa y exención del pasaporte"
      }
    ],
    "cta": {
      "href": "https://www.citapreviadnie.es/",
      "label": "Consultar cita para DNI y pasaporte"
    },
    "related": [
      {
        "href": "/dni/checklist",
        "label": "Preparar documentos y tasas"
      },
      {
        "href": "/dni/unidades-moviles",
        "label": "Reservas de equipos móviles"
      },
      {
        "href": "/dni/primera-expedicion-menor",
        "label": "Primera expedición de menores"
      }
    ],
    "sections": [
      {
        "id": "reserva",
        "title": "Confirmar que se tramitan ambos documentos",
        "paragraphs": [
          "Consulta el portal citapreviadnie.es o el 060 y revisa qué documentos constan en la confirmación. Si ya tienes una cita, consulta cómo ampliarla o modificarla antes de organizar otra reserva.",
          "No existe aquí una regla universal de una sola cita: el anuncio de Piélagos del 2 de septiembre de 2026 pide dos para DNI y pasaporte en su VIDOC. Sigue las instrucciones de la oficina o visita concreta. Esta guía no afirma que una segunda cita vaya a ser anulada como sanción."
        ]
      },
      {
        "id": "documentos",
        "title": "Documentación y fotografía",
        "paragraphs": [
          "Prepara los requisitos de cada documento: renovar DNI no elimina por sí solo los del pasaporte. Interior exige para el pasaporte DNI vigente y presentar el pasaporte anterior si todavía está en vigor.",
          "Interior indica que no hace falta aportar otra fotografía para el pasaporte si has obtenido o renovado el DNI ese mismo día. Confirma con la unidad la preparación de la imagen y el orden de los trámites. Para menores, comprueba además presencia, documentos y consentimientos."
        ]
      },
      tasasBox
    ]
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
    "id": "urgente",
    "pack": "viaje",
    "path": "/pasaporte/urgente",
    "h1": "Pasaporte urgente: atención excepcional y Barajas T4",
    "title": "Pasaporte urgente: atención excepcional y Barajas T4",
    "description": "Qué comprobar ante un viaje inminente: cita ordinaria, documentos, supuesto excepcional de urgencia y servicio de pasaportes de emergencia de Barajas T4.",
    "lead": "Si necesitas pasaporte para un viaje inminente, consulta cita y explica tu situación a la unidad de documentación. Llevar un billete no garantiza atención inmediata. La norma contempla un supuesto excepcional cuando, por urgencia acreditada, falta algún documento y pueden acreditarse por otros medios suficientes la identidad y nacionalidad española.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.boe.es/eli/es/rd/2003/07/11/896/con",
        "label": "BOE: artículos 4 y 5.7, expedición y supuesto excepcional"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/procedimiento-de-expedicion/",
        "label": "Interior: documentación ordinaria"
      },
      {
        "href": "https://www.aena.es/es/adolfo-suarez-madrid-barajas/servicios-del-aeropuerto/categorias-y-terminales/seguridad.html",
        "label": "Aena: pasaportes de emergencia en Barajas T4"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: tasa y exenciones del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/",
        "label": "Interior: tasa y exención del pasaporte"
      },
      {
        "href": "https://www.boe.es/buscar/doc.php?id=BOE-A-2023-18093",
        "label": "BOE: coste de las llamadas al 060"
      }
    ],
    "cta": {
      "href": "https://www.citapreviadnie.es/",
      "label": "Consultar cita en citapreviadnie.es"
    },
    "related": [
      {
        "href": "/pasaporte/caducado-sin-cita",
        "label": "Si el calendario no ofrece cita"
      },
      {
        "href": "/dni/checklist",
        "label": "Preparar documentos"
      },
      {
        "href": "/dni/misma-cita-pasaporte",
        "label": "Si también necesitas renovar DNI"
      }
    ],
    "sections": [
      {
        "id": "ordinario",
        "title": "Cita y plazo de expedición son cosas distintas",
        "paragraphs": [
          "El artículo 4.4 del Real Decreto 896/2003 prevé expedición en un máximo de dos días hábiles desde la presentación correcta de los documentos, salvo circunstancias técnicas o excepcionales. No es un plazo para conseguir cita ni una garantía de entrega antes de tu vuelo.",
          "Consulta disponibilidad en citapreviadnie.es o el 060. Si no encuentras una fecha adecuada, pregunta a la unidad cómo acreditar la urgencia y qué documentación necesita antes de desplazarte."
        ]
      },
      {
        "id": "excepcional",
        "title": "Si falta algún documento por urgencia acreditada",
        "paragraphs": [
          "El artículo 5.7 permite, excepcionalmente, expedir un pasaporte con validez temporal de un año cuando no pueda aportarse alguno de los documentos ordinarios por urgencia u otros motivos acreditados. El responsable debe considerar suficientes los medios alternativos para acreditar identidad y nacionalidad española.",
          "No se concede automáticamente por comprar un billete. La norma exige obtener durante ese año el pasaporte ordinario con su validez correspondiente. No confundas este supuesto con una promesa comercial de cita o con cualquier documento consular provisional."
        ]
      },
      {
        "id": "barajas",
        "title": "Servicio documentado: Madrid-Barajas T4",
        "paragraphs": [
          "Aena informa de que los pasaportes de emergencia del aeropuerto se tramitan solo en la oficina policial de la Terminal T4. Pide mostrar el pasaje de avión del solicitante además de la documentación necesaria en cada caso.",
          "Confirma con la oficina el horario y la atención de tu caso antes de desplazarte. Los puntos de actualización del DNIe de T1 y T4 son un servicio distinto: actualizar certificados no equivale a expedir un pasaporte o renovar el DNI físico."
        ]
      },
      tasasBox
    ]
  },
  {
    "id": "checklist",
    "pack": "viaje",
    "path": "/dni/checklist",
    "h1": "Qué llevar a la cita de DNI o pasaporte: lista por trámite",
    "title": "Qué llevar a la cita de DNI o pasaporte: lista por trámite",
    "description": "Documentos para primera expedición, renovación y duplicado de DNI o pasaporte. Fotografía, padrón, menores, consentimientos y tasas según el supuesto.",
    "lead": "Prepara la documentación del trámite y de la persona solicitante: una primera expedición no exige exactamente lo mismo que una renovación o un duplicado. Esta lista se refiere a unidades de documentación en España; los residentes en el extranjero deben comprobar también las reglas consulares o de acreditación de domicilio que correspondan.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/documentacion-necesaria-para-su-tramitacion/index.html",
        "label": "Interior: primera inscripción, renovación y duplicados del DNI"
      },
      {
        "href": "https://www.boe.es/eli/es/rd/2025/04/01/255/con",
        "label": "BOE: consulta de documentos y duplicados del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/procedimiento-de-expedicion/",
        "label": "Interior: pasaporte, menores y consentimientos"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: tasa y exenciones del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/",
        "label": "Interior: tasa y exención del pasaporte"
      },
      {
        "href": "https://www.boe.es/buscar/doc.php?id=BOE-A-2023-18093",
        "label": "BOE: coste de las llamadas al 060"
      }
    ],
    "cta": {
      "href": "https://www.citapreviadnie.es/",
      "label": "Consultar cita en citapreviadnie.es"
    },
    "related": [
      {
        "href": "/dni/primera-expedicion-menor",
        "label": "Primera expedición de un menor"
      },
      {
        "href": "/dni/cambio-domicilio",
        "label": "Acreditar nuevo domicilio"
      },
      {
        "href": "/dni/renovar-caducado",
        "label": "Renovación y duplicado"
      },
      {
        "href": "/pasaporte/cita-previa",
        "label": "Reserva de pasaporte"
      }
    ],
    "sections": [
      {
        "id": "dni",
        "title": "DNI: primera inscripción, renovación o duplicado",
        "paragraphs": [
          "Para una primera inscripción de un español residente en España, Interior detalla certificación literal de nacimiento para DNI de los últimos seis meses y certificado o volante de padrón de los últimos tres. La norma prevé recabar electrónicamente los documentos salvo oposición; si no pueden obtenerse, pueden solicitar su aportación. Confirma con la unidad cómo preparar tu caso.",
          "En una primera inscripción tras adquirir nacionalidad, si posees TIE o certificado de registro UE con NIE, Interior exige aportarlo. Para renovar, lleva el documento anterior; si cambian domicilio o filiación, añade sus justificantes o confirma la consulta admitida.",
          "En pérdida o robo, se exige denuncia. Si ya la presentaste, lleva su justificación; Interior también permite realizarla en la unidad de documentación al expedir el DNI. Consulta los requisitos del duplicado si está deteriorado."
        ]
      },
      {
        "id": "foto",
        "title": "Fotografía y captura en la unidad",
        "paragraphs": [
          "La fotografía es reciente, en color, de 32 × 26 mm, con fondo blanco y rostro reconocible. Para DNI hay excepciones por motivos médicos o religiosos y unidades con captura automatizada; comprueba la ficha oficial antes de hacer una foto que no corresponda.",
          "Para pasaporte, Interior no exige otra fotografía si obtuviste o renovaste el DNI ese mismo día. No deduzcas que cualquier cita conjunta o cualquier unidad elimina la necesidad de preparar la imagen."
        ]
      },
      {
        "id": "pasaporte",
        "title": "Pasaporte y menores",
        "paragraphs": [
          "Para el pasaporte ordinario en España se exige DNI en vigor y el pasaporte anterior si sigue vigente. Para menores sin DNI por no estar obligados se admite la certificación literal prevista por Interior; la guía de menores explica también la alternativa de un pasaporte anterior expedido por Policía.",
          "El menor debe acudir. Para su DNI se requiere acompañamiento por quien ejerce patria potestad, tutela o por persona debidamente apoderada. Para pasaporte, deben consentir todos los titulares de patria potestad o tutela; acredita identidad y parentesco y consulta las vías si no acuden juntos."
        ]
      },
      {
        "id": "confirmacion",
        "title": "Comprobación final",
        "paragraphs": [
          "Conserva la confirmación de cita y revisa que incluya los documentos que necesitas. Prepara la tasa o prueba de exención y, si pagaste anticipadamente, el justificante. Consulta con la unidad cualquier circunstancia que no encaje en la lista general."
        ]
      },
      tasasBox
    ]
  },
  {
    "id": "dni-ue",
    "pack": "viaje",
    "path": "/dni/caducado-viajar-ue",
    "h1": "DNI caducado para viajar por la UE: documentos y controles",
    "title": "DNI caducado para viajar por la UE: documentos y controles",
    "description": "Para viajar por la UE, prepara DNI o pasaporte válido. Distingue vuelos dentro de España, cruce de fronteras y comprobación de la compañía aérea.",
    "lead": "Para un ciudadano español que viaja a otro país de la UE, la regla general es llevar DNI o pasaporte válido. Schengen no elimina la necesidad de disponer de documentación de viaje. Si tu DNI ha caducado, comprueba si tienes pasaporte vigente o solicita la renovación antes de salir.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizen/index_es.htm",
        "label": "Tu Europa: documentos y derechos en el control fronterizo"
      },
      {
        "href": "https://www.aena.es/es/pasajeros/documentacion-visados/documentacion-para-viajar.html",
        "label": "Aena: documentación nacional e internacional"
      },
      {
        "href": "https://www.boe.es/eli/es/rd/2025/04/01/255/con",
        "label": "BOE: renovación del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: tasa y exenciones del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/",
        "label": "Interior: tasa y exención del pasaporte"
      }
    ],
    "cta": {
      "href": "https://www.citapreviadnie.es/",
      "label": "Solicitar la renovación del DNI"
    },
    "related": [
      {
        "href": "/dni/renovar-caducado",
        "label": "Renovar el DNI"
      },
      {
        "href": "/dni/midni",
        "label": "MiDNI y viajes"
      },
      {
        "href": "/pasaporte/cita-previa",
        "label": "Cita de pasaporte"
      }
    ],
    "sections": [
      {
        "id": "fronteras",
        "title": "Schengen y derecho de libre circulación",
        "paragraphs": [
          "Aunque normalmente no haya control en las fronteras interiores de Schengen, puede haber controles temporales o policiales. Tu Europa exige documentación válida y recuerda que el permiso de conducir no es un documento de viaje.",
          "Si un ciudadano de la UE llega al control sin los documentos necesarios, las autoridades deben ofrecer posibilidades razonables de obtenerlos o demostrar por otros medios su ciudadanía antes de denegar la entrada. Es una garantía frente a las autoridades, no una autorización general para embarcar con DNI caducado."
        ]
      },
      {
        "id": "avion",
        "title": "Vuelos desde España",
        "paragraphs": [
          "Aena indica DNI o pasaporte en vigor para un pasajero español que vuela desde España a un país Schengen. Comprueba las condiciones de cada destino y escala con las autoridades correspondientes y la documentación de embarque con la compañía.",
          "Para vuelos con origen y destino en España, Aena incluye DNI o pasaporte no necesariamente en vigor para el pasajero nacional de 14 años o más. Esa regla de vuelo nacional no se traslada a un viaje internacional."
        ]
      },
      {
        "id": "preparar",
        "title": "Si la caducidad coincide con el viaje",
        "paragraphs": [
          "El DNI puede renovarse durante sus últimos 180 días de vigencia. Comprueba la fecha antes de reservar y conserva una alternativa válida cuando proceda. El resguardo de una cita no sustituye un documento de viaje.",
          "MiDNI no es un documento de viaje para cruzar fronteras. Consulta la guía específica si necesitas distinguir identificación presencial y documentación internacional."
        ]
      },
      tasasBox
    ]
  },
  {
    "id": "pasaporte-lleno",
    "pack": "viaje",
    "path": "/pasaporte/caducado-sin-cita",
    "h1": "Pasaporte caducado sin cita: qué comprobar antes de viajar",
    "title": "Pasaporte caducado sin cita: qué comprobar antes de viajar",
    "description": "Si tu pasaporte ha caducado y no encuentras cita, revisa oficinas, DNI vigente, requisitos del destino y atención excepcional sin dar por asegurada la expedición.",
    "lead": "Si tu pasaporte está caducado y no encuentras cita, comprueba primero qué documento necesita tu viaje y si dispones de una alternativa válida. Consulta otras oficinas y fechas en citapreviadnie.es o el 060. La atención excepcional requiere comprobar el caso; no es una reserva garantizada por tener un billete.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/procedimiento-de-expedicion/",
        "label": "Interior: documentos y cita de pasaporte"
      },
      {
        "href": "https://www.boe.es/eli/es/rd/2003/07/11/896/con",
        "label": "BOE: expedición ordinaria y supuestos excepcionales"
      },
      {
        "href": "https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizen/index_es.htm",
        "label": "Tu Europa: documentos para ciudadanos de la UE"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: tasa y exenciones del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/",
        "label": "Interior: tasa y exención del pasaporte"
      },
      {
        "href": "https://www.boe.es/buscar/doc.php?id=BOE-A-2023-18093",
        "label": "BOE: coste de las llamadas al 060"
      }
    ],
    "cta": {
      "href": "https://www.citapreviadnie.es/",
      "label": "Consultar cita en citapreviadnie.es"
    },
    "related": [
      {
        "href": "/pasaporte/urgente",
        "label": "Urgencia acreditada y Barajas T4"
      },
      {
        "href": "/dni/caducado-viajar-ue",
        "label": "DNI y pasaporte para viajar"
      },
      {
        "href": "/dni/misma-cita-pasaporte",
        "label": "Comprobar reserva de ambos documentos"
      },
      {
        "href": "/dni/unidades-moviles",
        "label": "Canal de una visita móvil"
      }
    ],
    "sections": [
      {
        "id": "itinerario",
        "title": "Comprobar el viaje antes de buscar una solución",
        "paragraphs": [
          "Revisa nacionalidad, destino y escalas. Para un español, el DNI vigente puede servir en los destinos que lo admiten; no se debe dar por válido el pasaporte caducado ni aplicar a cualquier país las reglas de la UE. Confirma también vigencia mínima y visado cuando correspondan.",
          "Si necesitas renovar además el DNI, comprueba que puedas tramitar ambos documentos y que la reserva lo cubra. No pidas un trámite adicional como supuesto atajo para acceder a más citas."
        ]
      },
      {
        "id": "calendario",
        "title": "Comprobar disponibilidad y acceso",
        "paragraphs": [
          "Distingue un calendario sin fechas adecuadas de un error de acceso. Comprueba otras oficinas a las que puedas acudir, guarda cualquier mensaje de error y consulta el canal oficial si persiste.",
          "Para visitas móviles, utiliza el anuncio y canal municipal. No hay aquí una hora verificada de liberación de huecos ni datos para afirmar que una oficina concreta abre antes que otra."
        ]
      },
      {
        "id": "urgencia",
        "title": "Si no llegas a tiempo",
        "paragraphs": [
          "Consulta con la unidad cómo acreditar la urgencia y qué servicio puede prestarte. La guía de pasaporte urgente explica el supuesto excepcional del artículo 5.7 y el servicio concreto que publica Aena en Barajas T4.",
          "Pagar una intermediación privada no demuestra que exista una cita ni garantiza la expedición. Comprueba cualquier reserva en el portal oficial. La tasa del documento es distinta de un eventual precio de intermediación."
        ]
      },
      tasasBox
    ]
  },
  {
    "id": "midni",
    "pack": "viaje",
    "path": "/dni/midni",
    "h1": "MiDNI: identificación presencial, registro y límites de viaje",
    "title": "MiDNI: identificación presencial, registro y límites de viaje",
    "description": "MiDNI permite acreditar tu identidad presencialmente con validez jurídica. Necesita DNI vigente y conexión; no es documento de viaje para cruzar fronteras.",
    "lead": "MiDNI es la aplicación oficial de Policía Nacional para acreditar presencialmente la identidad mediante un QR verificable. La versión digital tiene la misma eficacia jurídica de identificación, en los términos del Real Decreto 255/2025. No sustituye al documento físico para cruzar fronteras ni permite acreditar la identidad en otros países.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.boe.es/eli/es/rd/2025/04/01/255/con",
        "label": "BOE: artículos 3 y 13 y adaptación de entidades"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/Version-Digital-del-DNI/",
        "label": "Interior: eficacia del DNI digital"
      },
      {
        "href": "https://play.google.com/store/apps/details?hl=es&id=es.gob.interior.policia.midni",
        "label": "Policía Nacional: descripción oficial de MiDNI en Google Play"
      },
      {
        "href": "https://www.aena.es/es/pasajeros/documentacion-visados/documentacion-para-viajar.html",
        "label": "Aena: documentos según el trayecto"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: tasa y exenciones del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/",
        "label": "Interior: tasa y exención del pasaporte"
      }
    ],
    "cta": {
      "href": "https://www.midni.gob.es/",
      "label": "Acceder a MiDNI y sus instrucciones oficiales"
    },
    "related": [
      {
        "href": "/dni/renovar-caducado",
        "label": "Renovar el DNI físico"
      },
      {
        "href": "/dni/caducado-viajar-ue",
        "label": "Documentación para viajar"
      },
      {
        "href": "/dni/checklist",
        "label": "Documentos y tasas"
      }
    ],
    "sections": [
      {
        "id": "validez",
        "title": "Eficacia de la identificación digital",
        "paragraphs": [
          "El artículo 13 reconoce su uso de identificación ante Administraciones y sector privado. El plazo de doce meses que la norma dio para adaptar las entidades terminó en abril de 2026. Su eficacia no se describe como una simple preferencia del establecimiento.",
          "Comprueba los requisitos propios del trámite que vayas a realizar. La equivalencia para identificarte no convierte la app en cualquier documento exigido por una normativa específica."
        ]
      },
      {
        "id": "registro",
        "title": "Registro, vigencia y verificación",
        "paragraphs": [
          "Debes disponer de DNI físico vigente. El registro vincula tu identidad con una línea de teléfono: la descripción oficial permite hacerlo en midni.gob.es mediante certificados del DNIe, en un punto de actualización de documentación o al renovar el DNI en una unidad de Policía.",
          "La app consulta los datos en el momento y requiere conexión. Utiliza el QR generado para su verificación; una foto del DNI o una captura guardada no sustituyen ese proceso. La app no amplía la fecha de caducidad del documento."
        ]
      },
      {
        "id": "limites",
        "title": "Viajes y trámites por internet",
        "paragraphs": [
          "La descripción oficial de Policía consultada el 16 de septiembre de 2026 excluye el uso como documento de viaje en pasos fronterizos, la identificación en otros países y la autenticación o firma electrónica por internet. Un anuncio de futuras funciones no acredita que estén disponibles.",
          "Para viajar, comprueba origen, destino y escalas y lleva el documento físico exigido. Aena distingue vuelos nacionales e internacionales; consulta también la documentación de embarque con tu compañía."
        ]
      },
      tasasBox
    ],
    "secondaryCta": {
      "href": "https://www.citapreviadnie.es/",
      "label": "Pedir cita para renovar el DNI físico"
    }
  },
  {
    "id": "moviles",
    "pack": "viaje",
    "path": "/dni/unidades-moviles",
    "h1": "Unidades móviles DNI y pasaporte: calendario y cita municipal",
    "title": "Unidades móviles DNI y pasaporte: calendario y cita municipal",
    "description": "Consulta las visitas de la unidad móvil o VIDOC y el canal de cita de tu ayuntamiento. La reserva puede ser municipal, por teléfono o por sede electrónica.",
    "lead": "Para una visita de documentación móvil, consulta el anuncio vigente de tu ayuntamiento: debe indicar fechas, lugar, documentos que expide y cómo reservar. La cita no se gestiona siempre en citapreviadnie.es. Hay servicios con reserva en sede municipal y otros con teléfono del ayuntamiento.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.interior.gob.es/opencms/en/detail-pages/article/La-Policia-Nacional-distribuye-nuevos-vehiculos-VIDOC-para-la-expedicion-de-documentacion/",
        "label": "Interior: servicios de los vehículos VIDOC"
      },
      {
        "href": "https://aytocabanillas.org/eventos/vidoc-en-cabanillas/",
        "label": "Cabanillas del Campo: cita por sede municipal, septiembre de 2026"
      },
      {
        "href": "https://www.pielagos.es/noticias/noticia/abierta-la-solicitud-de-cita-previa-para-la-expedicion-del-dni-y-el-pasaporte-en-renedo-de-pielagos-9018",
        "label": "Piélagos: cita telefónica y reservas por documento, septiembre de 2026"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/",
        "label": "Interior: tasa y exenciones del DNI"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/",
        "label": "Interior: tasa y exención del pasaporte"
      }
    ],
    "cta": {
      "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/cita-previa/",
      "label": "Consultar los canales generales de cita"
    },
    "related": [
      {
        "href": "/dni/checklist",
        "label": "Documentación y tasas"
      },
      {
        "href": "/dni/misma-cita-pasaporte",
        "label": "Reservar los dos documentos"
      },
      {
        "href": "/dni/cita-previa",
        "label": "Cita en una unidad fija"
      }
    ],
    "sections": [
      {
        "id": "municipio",
        "title": "Qué comprobar antes de reservar",
        "paragraphs": [
          "Busca en la web municipal la visita del equipo móvil o VIDOC y comprueba que la fecha corresponda al servicio que necesitas. Si el anuncio está vencido, consulta el ayuntamiento; esta guía no ofrece disponibilidad en directo."
        ],
        "lists": [
          [
            "Día, ubicación y horario de atención.",
            "Canal de cita indicado expresamente en ese anuncio.",
            "Si expide DNI, pasaporte o ambos y cuántas reservas exige.",
            "Documentos, fotografía, tasa y formas de pago para esa visita."
          ]
        ]
      },
      {
        "id": "ejemplos",
        "title": "Dos ejemplos oficiales de canales distintos",
        "paragraphs": [
          "Para sus visitas de septiembre de 2026, Cabanillas del Campo remite a la cita previa de su sede electrónica. Piélagos publica un teléfono municipal para las visitas de Renedo y exige dos citas a quien quiera DNI y pasaporte.",
          "Estos anuncios demuestran que el canal y las reservas varían. No acreditan que queden plazas ni permiten aplicar sus fechas a otro municipio. Entra en el anuncio enlazado para comprobar sus condiciones."
        ]
      },
      {
        "id": "servicio",
        "title": "VIDOC y actualización de certificados",
        "paragraphs": [
          "Interior describe vehículos VIDOC capaces de expedir DNI y pasaporte en un mismo acto. Confirma qué servicio se presta en la visita anunciada: no basta con que el municipio disponga de un punto de actualización del DNIe.",
          "Actualizar certificados o PIN no equivale a renovar la tarjeta física. La reserva general en citapreviadnie.es o el 060 sirve para consultar unidades ordinarias; sigue el canal municipal cuando la visita móvil lo establezca."
        ]
      },
      tasasBox
    ]
  },

] satisfies Guide[]).map((guide: Guide): Guide => ({
  ...guide,
  sources: guide.sources ?? [
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
