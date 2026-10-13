import {
  DISCLAIMER_MODELOS,
  EDUCACION_URL,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

export const MODELOS_FAMILIA: Guide[] = [
  {
    "id": "autorizacion-empadronar-menor",
    "pack": "modelos",
    "path": "/autorizacion-empadronar-menor",
    "h1": "Empadronar a un menor: consentimiento, custodia y modelos aplicables",
    "title": "Empadronar a un menor: consentimiento, custodia y modelos aplicables",
    "description": "Consentimiento para el padrón de menores: ambos progenitores, resolución judicial y supuestos excepcionales de los anexos I y II. Custodia compartida.",
    "lead": "Para un menor no emancipado, comprueba quién ejerce la patria potestad, con quién se inscribe y qué dispone una resolución judicial, si existe. El consentimiento sobre su domicilio no se reduce a autorizar a alguien para llevar los papeles. Las instrucciones del padrón distinguen varios supuestos; una plantilla única no sustituye todos ellos.",
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
        "label": "BOE: apartado 2.2.1 y anexos I y II, redacción actualizada"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763#art154",
        "label": "BOE: decisión sobre residencia habitual del menor"
      },
      {
        "href": "https://idapadron.ine.es/repositorio/legislacion/A290426.HTML",
        "label": "Consejo de Empadronamiento, abril de 2026: custodia compartida"
      }
    ],
    "related": [
      {
        "href": "/empadronarse/menores",
        "label": "Guía de empadronamiento de menores"
      },
      {
        "href": "/autorizacion-empadronamiento",
        "label": "Autorización relativa a la vivienda"
      },
      {
        "href": "/autorizacion-representacion-tramite",
        "label": "Acreditar representación para presentar"
      }
    ],
    "sections": [
      {
        "id": "consentimiento",
        "title": "Cuando existe consentimiento de ambos",
        "paragraphs": [
          "Si el menor se inscribe con ambos progenitores, la hoja o formulario se firma por los dos. Si se inscribe con uno, debe acreditarse el consentimiento de ambos o la autorización judicial, salvo privación de patria potestad acreditada por resolución.",
          "La identidad y filiación se documentan conforme al caso. Las instrucciones contemplan libro de familia o certificado de nacimiento para identificar a menores de 14 años que no dispongan de los documentos previstos. Un identificador escolar no sustituye esa documentación.",
          "Si se inscribe en un domicilio distinto del de quienes tienen su guarda y custodia, consulta los supuestos del apartado 2.2.2. En tutela o acogimiento, la representación se acredita mediante la resolución judicial o administrativa correspondiente. La firma de un progenitor no sustituye esas reglas."
        ]
      },
      {
        "id": "excepciones",
        "title": "Si falta consentimiento o autorización judicial",
        "paragraphs": [
          "Sin resolución de guarda y custodia, el anexo I prevé supuestos excepcionales: procedimiento judicial iniciado con posible afección a derechos del menor, o imposibilidad manifiesta de obtener consentimiento y posible perjuicio para el menor. Deben acreditarse las circunstancias exigidas.",
          "Con guarda y custodia exclusiva, el anexo II exige resolución y encajar en los supuestos previstos, incluidos los de procedimiento judicial iniciado, determinados casos de rebeldía o paradero desconocido sin visitas, o imposibilidad manifiesta y perjuicio. La custodia exclusiva no equivale por sí sola a privación de patria potestad.",
          "Con custodia compartida y resolución que no fija empadronamiento, las instrucciones exigen acuerdo documentado; si falta, una nueva resolución judicial que se pronuncie sobre el padrón. No utilices las excepciones anteriores como una autorización general para modificarlo unilateralmente."
        ]
      },
      {
        "id": "modelo",
        "title": "Consentimiento sobre una dirección concreta",
        "paragraphs": [
          "Esta plantilla solo corresponde al caso en que el consentimiento puede prestarse válidamente. Adjunta la documentación requerida y usa el anexo municipal o estatal específico cuando proceda."
        ],
        "models": [
          {
            "id": "ambos",
            "title": "Consentimiento del progenitor para la inscripción indicada",
            "body": "[Lugar], [fecha]\n\nA [ayuntamiento]\n\nYo, [nombre e identificación], progenitor/a de [nombre, fecha de nacimiento y documento identificativo del menor cuando corresponda], presto mi consentimiento para su [alta/cambio de domicilio] en [dirección completa], donde reside habitualmente con [persona o personas].\n\nSituación de patria potestad y resoluciones relevantes: [datos que procedan].\nDocumentación de filiación, identidad y resoluciones aportada: [relación].\n\nEste consentimiento se refiere al domicilio indicado. La representación para presentar la solicitud se acreditará separadamente si es necesaria.\nFirma de quien presta el consentimiento: [firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "autorizacion-recogida-colegio",
    "path": "/autorizacion-recogida-colegio",
    "pack": "modelos",
    "h1": "Autorización para recoger a un menor en el colegio: modelo adaptable",
    "title": "Autorización para recoger a un menor en el colegio: modelo adaptable",
    "description": "Plantilla de recogida con persona autorizada, fechas y servicio. Confirma el formulario del centro, las firmas necesarias y cómo se comprueba la identidad.",
    "lead": "Pide al colegio su formulario y el canal para comunicar la autorización. Este modelo ayuda a identificar al menor, a quien autoriza y a quien recoge, con fechas y ámbito concretos. No garantiza que cualquier centro acepte el escrito ni que una llamada sustituya su procedimiento.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://ceipelperal.centros.educa.jcyl.es/sitio/index.cgi?wid_seccion=20",
      "label": "Ejemplo de centro público: formularios de recogida"
    },
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763#art156",
        "label": "Código Civil: ejercicio de la patria potestad"
      },
      {
        "href": "https://ceipelperal.centros.educa.jcyl.es/sitio/index.cgi?wid_seccion=20",
        "label": "CEIP El Peral: recogida escolar y comedor diferenciados"
      },
      {
        "href": "https://www.aepd.es/preguntas-frecuentes/1-tus-derechos/3-identificacion-con-dni",
        "label": "AEPD: identificación y copias del DNI"
      }
    ],
    "sections": [
      {
        "id": "firmas",
        "title": "Quién autoriza y para qué servicio",
        "paragraphs": [
          "Comprueba quién puede autorizar según la patria potestad, tutela y resoluciones vigentes. El artículo 156 contempla ejercicio conjunto y actuaciones de uno con consentimiento expreso o tácito del otro, además de otros supuestos. No conviertas esa regla en una exigencia universal de dos firmas ni en permiso para ignorar un desacuerdo conocido.",
          "Pregunta si la autorización alcanza salida de clase, comedor, transporte o actividades. El CEIP El Peral publica apartados distintos para estas situaciones: es un ejemplo de organización de ese centro, no el formulario de todos los colegios."
        ]
      },
      {
        "id": "identidad",
        "title": "Identidad y vigencia",
        "paragraphs": [
          "La persona autorizada debe seguir las instrucciones de identificación del centro. Identificarse no equivale automáticamente a entregar una fotografía íntegra del DNI. Si se pide copia, consulta qué datos son necesarios y el canal seguro; la AEPD recomienda proteger los datos que no sean necesarios cuando no haga falta una copia íntegra.",
          "Indica si sirve para una fecha o un periodo, comunica cambios o revocaciones y confirma su recepción antes de confiar la recogida a otra persona. La autorización de recogida no sustituye permisos de excursión o salida sin acompañante."
        ]
      },
      {
        "id": "modelo",
        "title": "Modelo para adaptar al centro",
        "paragraphs": [
          "Sustituye los campos por datos reales y añade las firmas o documentación que correspondan."
        ],
        "models": [
          {
            "id": "recogida",
            "title": "Autorización de recogida",
            "body": "[Lugar], [fecha]\nA [centro y servicio: salida de clase / comedor / otro]\n\nQuien/es suscribe/n, [nombre/s e identificación requerida], en calidad de [progenitor/es que ejercen la patria potestad / tutor/es] de [menor, curso y aula], autoriza/n a [nombre de la persona e identificación requerida por el centro] a recogerle en [servicio y lugar].\nVigencia: [fecha puntual o periodo]. Horario: [detalle]. Contacto para comprobaciones: [teléfono].\nResoluciones o condiciones relevantes comunicadas al centro: [si procede].\nSolicito confirmación de recepción y de cualquier requisito pendiente.\n\n[Firma/s que correspondan]"
          }
        ]
      }
    ],
    "related": [
      {
        "href": "/colegio/autorizacion-recogida-menores",
        "label": "Pasos para organizar la recogida"
      },
      {
        "href": "/justificante-ausencia-escolar",
        "label": "Comunicar una ausencia"
      }
    ],
    "disclaimer": "No somos Administración. Adapta la orientación a las normas del centro o autoridad competente y a las resoluciones aplicables. Una plantilla privada no sustituye la comprobación ni los formularios oficiales exigibles."
  },
  {
    "id": "justificante-ausencia-escolar",
    "path": "/justificante-ausencia-escolar",
    "pack": "modelos",
    "h1": "Comunicar y justificar una ausencia escolar: modelo familiar",
    "title": "Comunicar y justificar una ausencia escolar: modelo familiar",
    "description": "Modelo familiar de ausencia con fechas y motivo. Diferencia justificación de la familia y constancia de asistencia sanitaria; sigue el procedimiento del centro.",
    "lead": "La familia comunica el motivo de la ausencia por el canal del centro y aporta la documentación que corresponda conforme a sus normas y a las de la Administración educativa. La declaración familiar y un justificante de haber acudido a consulta son documentos diferentes. Presentar esta carta no determina por sí solo cómo se registrará la falta.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.comunidad.madrid/hospital/atencionprimaria/ciudadanos/atencion-primaria-documentos-sanitarios",
      "label": "Madrid: documentos sanitarios y ausencia escolar"
    },
    "sources": [
      {
        "href": "https://www.comunidad.madrid/hospital/atencionprimaria/ciudadanos/atencion-primaria-documentos-sanitarios",
        "label": "Atención Primaria de Madrid: quién justifica la ausencia"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a124",
        "label": "LOE: normas de convivencia del centro"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#davigesimotercera",
        "label": "LOE: datos del alumnado necesarios para la función educativa"
      }
    ],
    "sections": [
      {
        "id": "documentos",
        "title": "Qué documento estás aportando",
        "paragraphs": [
          "Atención Primaria de la Comunidad de Madrid indica que la ausencia escolar la justifican padres o tutores y que no corresponde al personal sanitario emitir ese justificante escolar. Esta referencia describe ese servicio sanitario: no se presenta como un protocolo idéntico de todas las comunidades.",
          "Una constancia de asistencia a consulta acredita esa atención; no decide por sí sola la justificación de todos los días de ausencia. Si el centro solicita documentación adicional, pide que concrete qué necesita, para qué y conforme a qué procedimiento."
        ]
      },
      {
        "id": "comunicar",
        "title": "Comunicar con datos suficientes",
        "paragraphs": [
          "Indica alumno, curso, fechas u horas y motivo de forma proporcionada. Evita incluir una historia clínica completa o diagnósticos innecesarios para esta comunicación. La LOE permite recabar datos necesarios para la función educativa y exige seguridad y confidencialidad.",
          "Conserva el envío y comprueba cómo quedó registrada la falta. Si existe un problema continuado de salud o asistencia, habla con tutoría o dirección para seguir el cauce correspondiente. Esta plantilla no sustituye seguimiento educativo ni cierra por sí sola un procedimiento de absentismo."
        ]
      },
      {
        "id": "modelo",
        "title": "Comunicación de la familia",
        "paragraphs": [
          "Usa la aplicación, formulario o canal indicado por el centro; no hay una vía única para todos."
        ],
        "models": [
          {
            "id": "ausencia",
            "title": "Comunicación y justificación familiar de ausencia",
            "body": "[Lugar], [fecha]\nA [tutoría / centro]\n\nYo, [nombre y relación con el alumno], comunico que [alumno, curso y grupo] no asistió / no podrá asistir el [fechas], entre [horas, si procede], por [motivo suficiente para esta comunicación].\nDocumento aportado, si corresponde: [tipo y fecha; no afirmar que se adjunta si no existe].\nSolicito que se valore esta comunicación conforme al procedimiento del centro y se me indique cualquier aclaración necesaria.\nContacto: [canal].\n\n[Firma e identificación requerida por el centro]"
          }
        ]
      }
    ],
    "related": [
      {
        "href": "/autorizacion-recogida-colegio",
        "label": "Autorizar recogida"
      },
      {
        "href": "/colegio/no-he-matriculado-a-mi-hijo",
        "label": "Gestionar la escolarización pendiente"
      }
    ],
    "disclaimer": "No somos Administración. Adapta la orientación a las normas del centro o autoridad competente y a las resoluciones aplicables. Una plantilla privada no sustituye la comprobación ni los formularios oficiales exigibles."
  },
  {
    "id": "solicitud-comedor-escolar",
    "pack": "modelos",
    "path": "/solicitud-comedor-escolar",
    "h1": "Solicitud de alta o baja de comedor escolar",
    "title": "Alta o baja de comedor escolar: modelo y trámite",
    "description": "Modelo orientativo de alta o baja de comedor. Comprueba formulario, canal y fecha de efectos; una beca, una ausencia diaria y una baja no son lo mismo.",
    "lead": "Antes de escribir, confirma con el centro quién gestiona el comedor, qué formulario exige y cómo comunica la aceptación y la fecha de efectos. Pedir plaza, pedir ayuda económica, cancelar un día y darse de baja son operaciones distintas, aunque un procedimiento pueda relacionarlas. No hay un plazo ni una causa de admisión tardía únicos para toda España.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://ceipsangil.centros.educa.jcyl.es/sitio/index.cgi?wid_item=67&wid_seccion=7",
      "label": "Ejemplo oficial: altas, bajas y cancelaciones en CEIP San Gil"
    },
    "sources": [
      {
        "href": "https://ceipsangil.centros.educa.jcyl.es/sitio/index.cgi?wid_item=67&wid_seccion=7",
        "label": "CEIP San Gil, Castilla y León: procedimientos y formularios"
      },
      {
        "href": "https://ceocaminodesantiago.centros.educa.jcyl.es/sitio/index.cgi?wid_item=119&wid_seccion=7",
        "label": "CEO Camino de Santiago: relación entre solicitud de ayuda y activación del servicio"
      }
    ],
    "disclaimer": "No somos Administración. Este escrito privado es orientativo y no sustituye los formularios obligatorios ni acredita plaza, baja o ayuda concedida.",
    "related": [
      {
        "href": "/comedor",
        "label": "Comedor escolar"
      },
      {
        "href": "/comedor/beca-comedor-fuera-de-plazo",
        "label": "Ayuda de comedor fuera de plazo"
      },
      {
        "href": "/comedor/impago-comedor-escolar",
        "label": "Impago de comedor"
      }
    ],
    "sections": [
      {
        "id": "operacion",
        "title": "Elige la operación que necesitas",
        "paragraphs": [
          "Para un alta, consulta disponibilidad, modalidad de uso, fecha posible de incorporación y documentación. Si pasó el plazo ordinario, pregunta por la vía que permita el procedimiento y acredita el motivo solo cuando corresponda. Presentar un escrito no garantiza admisión.",
          "Para una baja, comprueba canal, preaviso y fecha efectiva. No presupongas que dejar de asistir o devolver un recibo cancela el servicio. Pide confirmación de las cuotas que quedan pendientes; la fecha que propones en el escrito no produce por sí sola efectos retroactivos.",
          "Una cancelación puntual puede tener un canal y una hora límite diferentes de la baja definitiva. La ayuda económica también necesita su comprobación: no confundas solicitarla con tenerla concedida."
        ]
      },
      {
        "id": "ejemplos",
        "title": "Dos ejemplos de Castilla y León, no reglas nacionales",
        "paragraphs": [
          "El CEIP San Gil publica un Anexo I para el alta habitual y un Anexo II para la baja, entregados en secretaría. La cancelación de un día puede comunicarse por los canales habilitados hasta las 9:30 de ese día. Consulta su información vigente y no traslades esos anexos u horarios a otro centro.",
          "El CEO Camino de Santiago advierte para 2026/27 que solicitar la ayuda activa el comedor desde el primer día lectivo del curso siguiente. Si no se va a usar, indica cancelar días o formalizar la baja. Este ejemplo muestra por qué hay que revisar la relación entre ambos trámites y evitar suponer que nunca están vinculados."
        ]
      },
      {
        "id": "modelo",
        "title": "Modelo orientativo de solicitud",
        "paragraphs": [
          "Utiliza primero el formulario obligatorio, si existe. Este escrito puede servir como explicación complementaria o cuando el gestor admita un escrito libre. Elige alta o baja, elimina campos que no procedan y conserva el justificante por el canal aceptado.",
          "No adjuntes por defecto nóminas, padrón, libro de familia o documentación clínica. Aporta únicamente la documentación necesaria que exija el procedimiento concreto, por el canal indicado."
        ],
        "models": [
          {
            "id": "comedor",
            "title": "Solicitud de alta o baja de comedor",
            "body": "[Lugar], [fecha]\n\nA [centro o entidad competente para gestionar el comedor]\n\nAsunto: solicitud de [alta / baja] del servicio de comedor\n\n[Nombre de quien solicita], como [progenitor/a / tutor/a / representante que corresponda] de [alumno/a], del curso [ ] en el centro [ ], solicita [alta / baja] del servicio.\n\nFecha solicitada: [ ]. Modalidad o días de uso, si procede: [ ].\n\n[Motivo o circunstancias que proceda explicar, especialmente si el trámite exige justificar una petición fuera del plazo ordinario].\n\nSolicito confirmación de la tramitación, de la fecha efectiva y de las condiciones económicas aplicables.\n\nDocumentos aportados conforme al procedimiento, si corresponde: [ ].\n\n[Contacto por el canal requerido]\n[Identificación adicional solo cuando proceda]\n[Firma]"
          }
        ]
      }
    ]
  },
  {
    "id": "autorizacion-viaje-menor",
    "path": "/autorizacion-viaje-menor",
    "pack": "modelos",
    "h1": "Permiso de viaje de menores: cuándo se tramita y qué preparar",
    "title": "Permiso de viaje de menores: cuándo se tramita y qué preparar",
    "description": "Permiso español para menores españoles residentes en España que salen sin progenitor o tutor. Distingue comparecencia, consentimiento y exigencias del destino.",
    "lead": "El permiso policial de salida se dirige a menores españoles residentes en España que viajan al extranjero sin ninguno de sus progenitores o tutores. Según Policía, no se exige ese permiso si viajan con cualquiera de sus representantes legales. Esto no elimina las condiciones del país de destino o tránsito, las de la compañía ni las restricciones judiciales aplicables.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_ciudadania_documentacionviajar.php",
      "label": "Policía: trámite y formulario oficial del permiso"
    },
    "sources": [
      {
        "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_ciudadania_documentacionviajar.php",
        "label": "Policía: alcance, excepciones y documentación"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/autorizacion-para-viaje-de-menores-al-extranjero/",
        "label": "Interior: comparecencia y consentimiento"
      },
      {
        "href": "https://europa.eu/youreurope/citizens/travel/entry-exit/travel-documents-minors/index_es.htm",
        "label": "Tu Europa: requisitos de países y compañías"
      }
    ],
    "sections": [
      {
        "id": "supuestos",
        "title": "Nacionalidad, residencia y acompañante",
        "paragraphs": [
          "No apliques automáticamente este trámite a todo menor que sale de España. Policía excluye a menores españoles que residen habitualmente en el extranjero y a entradas en España; los extranjeros residentes se rigen por su legislación nacional. Consulta a la representación consular cuando corresponda.",
          "Tu Europa advierte que no hay una regla única de autorización para todos los países de la UE. Comprueba origen, tránsito y destino, y el formulario que pueda pedir la compañía. Que esta pida un documento no convierte un supuesto excluido en trámite policial español."
        ]
      },
      {
        "id": "tramitar",
        "title": "Comparecer y acreditar el consentimiento",
        "paragraphs": [
          "Para el trámite policial basta la comparecencia de uno de los progenitores o representantes legales, pero debe contar con la potestad y el consentimiento necesario del otro. No confundas una sola comparecencia con la inexistencia de consentimiento. Si hay representación exclusiva o resoluciones relevantes, acredita la situación; no presupongas que la custodia exclusiva resuelve por sí sola la patria potestad.",
          "La sede de Policía pide documento de identidad en vigor de quien comparece y del menor, además de la documentación que acredite filiación o representación y datos del viaje. Utiliza el formulario oficial y consulta la dependencia antes de acudir. Interior también informa de la tramitación en Guardia Civil; no se asignan pueblos o ciudades a un cuerpo de forma general.",
          "El permiso no sustituye DNI o pasaporte, visado ni consentimiento para expedir pasaporte. La ficha siguiente solo organiza datos; no debe presentarse como un permiso oficial ya expedido."
        ]
      },
      {
        "id": "modelo",
        "title": "Ficha de preparación, sin validez de permiso",
        "paragraphs": [
          "Comprueba los campos con el formulario vigente de la autoridad que vaya a tramitarlo."
        ],
        "models": [
          {
            "id": "viaje",
            "title": "Datos para preparar el permiso oficial",
            "body": "FICHA DE PREPARACIÓN — NO ES UN PERMISO DE VIAJE\n\nMenor: [nombre, fecha de nacimiento, nacionalidad, residencia habitual y documento en vigor].\nRepresentación legal: [personas que la ejercen y documentación acreditativa].\nPersona que comparecerá: [nombre e identificación].\nConsentimientos necesarios y forma de acreditarlos: [comprobar con la dependencia].\nViaje: [fechas, países de destino y tránsito].\nAcompañante, si procede: [nombre e identificación].\nRequisitos adicionales de destino o compañía: [comprobaciones].\nResoluciones relevantes: [si procede].\n\nEstos datos sirven para cumplimentar el formulario oficial; esta ficha no acredita su expedición."
          }
        ]
      }
    ],
    "related": [
      {
        "href": "/pasaporte/bebe",
        "label": "Pasaporte de menores"
      },
      {
        "href": "/pasaporte",
        "label": "Documentos y trámites de pasaporte"
      }
    ],
    "disclaimer": "No somos Administración. Adapta la orientación a las normas del centro o autoridad competente y a las resoluciones aplicables. Una plantilla privada no sustituye la comprobación ni los formularios oficiales exigibles."
  },

];
