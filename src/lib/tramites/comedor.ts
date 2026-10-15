import { EDUCACION_URL } from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedComedor = [
  { href: "/comedor/beca-comedor-fuera-de-plazo", label: "Beca comedor fuera de plazo" },
  { href: "/comedor/no-puedo-pagar-comedor-escolar", label: "No puedo pagar el comedor" },
  { href: "/comedor/documentos-alergia-comedor-escolar", label: "Alergias: documentos" },
  { href: "/empadronarse", label: "Padrón (baremo de ayudas)" },
];

export const COMEDOR_GUIDES: Guide[] = [
  {
    "id": "beca-fuera-plazo",
    "pack": "comedor",
    "path": "/comedor/beca-comedor-fuera-de-plazo",
    "h1": "Beca de comedor fuera de plazo: comprobar las vías disponibles",
    "title": "Beca de comedor fuera de plazo: comprobar las vías disponibles",
    "description": "Comprueba periodos posteriores, destinatarios y circunstancias admitidas. Una subsanación o un recurso no abre automáticamente solicitudes nuevas de ayuda.",
    "lead": "Que haya cerrado un plazo no permite deducir que exista siempre una vía por desempleo, mudanza o vulnerabilidad. Revisa las bases del curso y distingue periodo posterior, solicitud durante el curso, subsanación y recurso. Si falta dinero para la comida inmediata, comunica también esa necesidad al centro y a servicios sociales.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.tramitacastillayleon.jcyl.es/web/jcyl/AdministracionElectronica/es/Plantilla100Detalle/1251181053840/Ayuda012/1209383392824/Propuesta",
      "label": "Castilla y León: supuestos de solicitud durante el curso"
    },
    "sources": [
      {
        "href": "https://www.tramitacastillayleon.jcyl.es/web/jcyl/AdministracionElectronica/es/Plantilla100Detalle/1251181053840/Ayuda012/1209383392824/Propuesta",
        "label": "Castilla y León: supuestos de solicitud durante el curso"
      },
      {
        "href": "https://www.edubcn.cat/ca/alumnat_i_familia/ajuts_beques_i_subvencions/ajuts_de_menjador_escolar",
        "label": "Barcelona: periodos de presentación 2026/27"
      },
      {
        "href": "https://sede.comunidad.madrid/ayudas-becas-subvenciones/becas-comedor-escolar-2026-2027",
        "label": "Madrid: fases de solicitud y recurso"
      }
    ],
    "sections": [
      {
        "id": "periodos",
        "title": "Buscar otro periodo de la misma convocatoria",
        "paragraphs": [
          "Barcelona ciudad publica varios periodos de presentación en 2026/27, incluidos posteriores a septiembre. Consulta el calendario enlazado y la guía de convocatorias; no presupongas que todos requieren una circunstancia sobrevenida.",
          "En Castilla y León, la sede distingue el periodo de septiembre para nueva matriculación de ciertos supuestos durante el curso: cambio de centro o nueva matrícula, acogimiento, familia numerosa especial, discapacidad de al menos el 33 %, víctimas de violencia de género o terrorismo y situaciones carenciales específicas. Revisa la acreditación de tu supuesto. No equivale a admitir cualquier solicitud tardía."
        ]
      },
      {
        "id": "fase",
        "title": "Si ya presentaste una solicitud",
        "paragraphs": [
          "Consulta el estado y el motivo de exclusión o denegación. Una subsanación corrige carencias de un expediente en los términos del requerimiento; un recurso cuestiona una resolución. Ninguno debe anunciarse como plazo nuevo para todas las familias.",
          "La sede de Madrid ya muestra resolución y fase de recurso en septiembre de 2026. Si ese es tu caso, utiliza el trámite y plazo que correspondan a la resolución, no un escrito genérico de solicitud de beca. Conserva la notificación y el justificante."
        ]
      },
      {
        "id": "cambio",
        "title": "Si ha cambiado la situación familiar",
        "paragraphs": [
          "Explica qué cambió, cuándo y qué apoyo necesitas. Pregunta al órgano gestor si las bases admiten ese supuesto, qué fecha de renta se utiliza y cómo acreditarlo. Una pérdida reciente de ingresos no cambia automáticamente la renta de referencia ni reabre el plazo.",
          "No adjuntes por defecto una vida laboral, un certificado de empresa y el padrón: aporta la documentación pertinente exigida para esa vía. Pide que te indiquen el formulario y el canal aceptados."
        ]
      },
      {
        "id": "necesidad",
        "title": "Atender la necesidad mientras se tramita",
        "paragraphs": [
          "Consulta al centro y a servicios sociales municipales si existe apoyo de urgencia, bonificación u otra ayuda compatible. Pide valorar tu situación; la atención o un informe no equivalen a una prestación concedida.",
          "Si hay facturas, comprueba quién cobra y pregunta si admite aplazamiento o fraccionamiento y con qué condiciones. La solicitud de ayuda no suspende automáticamente el pago ni garantiza que se financien meses anteriores. No se ofrece una deducción fiscal como sustituto inmediato del comedor."
        ]
      }
    ],
    "related": [
      {
        "href": "/comedor",
        "label": "Comedor escolar"
      },
      {
        "href": "/comedor/beca-comedor-2026-2027",
        "label": "Convocatorias seleccionadas 2026/27"
      },
      {
        "href": "/comedor/no-puedo-pagar-comedor-escolar",
        "label": "Dificultades para pagar"
      },
      {
        "href": "/comedor/impago-comedor-escolar",
        "label": "Revisar un impago"
      }
    ],
    "disclaimer": "No somos Administración Pública. Consulta la convocatoria y las normas del servicio concreto; no adjudicamos ayudas ni suspendemos cobros o plazos."
  },
  {
    "id": "no-puedo-pagar",
    "pack": "comedor",
    "path": "/comedor/no-puedo-pagar-comedor-escolar",
    "h1": "No puedo pagar el comedor escolar: cómo pedir apoyo",
    "title": "No puedo pagar el comedor escolar: cómo pedir apoyo",
    "description": "Comunica la dificultad económica, revisa facturas y normas del servicio y consulta ayudas o acuerdos de pago. No hay suspensión ni cobertura social automáticas.",
    "lead": "Contacta cuanto antes con dirección o secretaría y con quien gestione el cobro. Explica si hay un recibo pendiente o si no podrás pagar el siguiente y pide una respuesta sobre continuidad del servicio y apoyos disponibles. La dificultad económica merece valoración; no acredita por sí sola una beca o un aplazamiento.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.tramitacastillayleon.jcyl.es/web/jcyl/AdministracionElectronica/es/Plantilla100Detalle/1251181053840/Ayuda012/1209383392824/Propuesta",
      "label": "Castilla y León: ejemplo de ayudas y situaciones carenciales"
    },
    "sources": [
      {
        "href": "https://www.tramitacastillayleon.jcyl.es/web/jcyl/AdministracionElectronica/es/Plantilla100Detalle/1251181053840/Ayuda012/1209383392824/Propuesta",
        "label": "Castilla y León: ejemplo de ayudas y situaciones carenciales"
      },
      {
        "href": "https://ws040.juntadeandalucia.es/sedeboja/lconsolidada/eli/es-an/o/2017/04/17/%281880789246%29/con/20240427/spa/html/LE0000596014_20240427.html",
        "label": "Andalucía: ejemplo de procedimiento ante impago"
      }
    ],
    "sections": [
      {
        "id": "factura",
        "title": "Comprobar qué se está cobrando",
        "paragraphs": [
          "Pide un desglose de fechas, días facturados, precio, bonificación aplicada y pagos registrados. Si hay un error, comunica la discrepancia con el justificante. Si una beca ya está concedida, comprueba desde cuándo produce efectos y cómo se aplica al recibo.",
          "Identifica al titular del servicio y al acreedor: no deduzcas una ordenanza municipal, recargos o vía de apremio solo porque el comedor esté en un colegio. Pide las reglas de cobro y de pérdida de la condición de usuario que correspondan."
        ]
      },
      {
        "id": "apoyo",
        "title": "Solicitar apoyo económico y organizativo",
        "paragraphs": [
          "Consulta las ayudas vigentes de tu territorio y si admiten tu situación durante el curso. Por ejemplo, Castilla y León contempla situaciones carenciales específicas, sujetas a valoración y requisitos. No se aconseja presentar una nueva solicitud fuera de plazo sin comprobar que el procedimiento la admite.",
          "Si no puedes cubrir la alimentación del menor, comunica esa urgencia al centro y a servicios sociales municipales y pide valoración de los recursos disponibles. Pregunta quién coordinará la respuesta y cómo conocerás el resultado; no des por confirmada la cobertura del menú.",
          "Pregunta al acreedor si admite un acuerdo de pago. Solicita por escrito importe, vencimientos y efectos sobre el servicio. Pedirlo no equivale a que esté aprobado ni paraliza por sí solo un procedimiento."
        ]
      },
      {
        "id": "aviso",
        "title": "Si recibes un aviso de baja o suspensión",
        "paragraphs": [
          "No ignores la comunicación: comprueba hechos, plazo para responder, órgano competente y vías de reclamación. La guía de impago explica un ejemplo normativo y qué documentos revisar. No existe una regla nacional que permita asegurar continuidad tras el primer recibo ni suspensión automática al mes.",
          "Conserva avisos, solicitudes y respuestas. Si deseas dejar el servicio, tramita la baja por su canal y confirma su fecha; una ausencia o la devolución de un recibo no equivalen a una baja confirmada."
        ]
      }
    ],
    "related": [
      {
        "href": "/comedor",
        "label": "Comedor escolar"
      },
      {
        "href": "/comedor/beca-comedor-2026-2027",
        "label": "Convocatorias seleccionadas 2026/27"
      },
      {
        "href": "/comedor/beca-comedor-fuera-de-plazo",
        "label": "Ayuda fuera del plazo ordinario"
      },
      {
        "href": "/comedor/impago-comedor-escolar",
        "label": "Revisar un impago"
      }
    ],
    "disclaimer": "No somos Administración Pública. Consulta la convocatoria y las normas del servicio concreto; no adjudicamos ayudas ni suspendemos cobros o plazos."
  },
  {
    "id": "alergias",
    "pack": "comedor",
    "path": "/comedor/documentos-alergia-comedor-escolar",
    "h1": "Alergia en el comedor: documentación y coordinación con el centro",
    "title": "Alergia en el comedor: documentación y coordinación con el centro",
    "description": "Prepara la acreditación médica y el formulario del centro, confirma su recepción y acuerda una atención segura. Qué hacer si falta documentación o cambia el diagnóstico.",
    "lead": "Comunica la alergia o intolerancia al centro y al responsable del comedor y aporta la documentación médica correspondiente. Si falta un documento, avisa igualmente y pide acordar medidas seguras: no debe darse por seguro el menú estándar por el mero hecho de que todavía no se haya entregado el certificado.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2025-7659#a1-2",
      "label": "Consultar la norma de menús especiales"
    },
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2025-7659#a1-2",
        "label": "BOE: disponibilidad de menús especiales, artículo 10"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2025-7659#a2",
        "label": "BOE: centros y etapas incluidos"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-11604#a40",
        "label": "Ley 17/2011: alimentación y alergias en centros escolares"
      },
      {
        "href": "https://www.aesan.gob.es/actualidad/publicaciones-nutricion/recomendaciones-elaboracion-transporte-de-comidas",
        "label": "AESAN: comida familiar y medios de conservación"
      },
      {
        "href": "https://site.educa.madrid.org/cp.cela.madrid/index.php/secretaria1/formularios/formulario-para-autorizar-a-otra-persona-2-2-2/",
        "label": "Ejemplo del CEIP Camilo José Cela: comunicación alimentaria"
      },
      {
        "href": "https://www.comunidad.madrid/salud/alergias-e-intolerancias-alimentarias",
        "label": "Comunidad de Madrid: alergias, información y comedor"
      }
    ],
    "sections": [
      {
        "id": "acreditar",
        "title": "Qué acredita el documento médico",
        "paragraphs": [
          "La normativa contempla certificado médico que acredite qué alimentos no puede ingerir el alumno por motivos de salud. La Ley 17/2011 se refiere a alergias o intolerancias diagnosticadas por especialistas; el Real Decreto 315/2025 contempla además otras enfermedades que exijan adaptación.",
          "Consulta con el profesional que atiende al alumno qué documento corresponde y con el centro cómo presentarlo. Una nota familiar comunica la situación, pero no sustituye la acreditación clínica. No se exige en las normas estatales citadas un formulario médico único ni que solo pueda emitirlo la pediatría pública."
        ]
      },
      {
        "id": "formulario",
        "title": "Formulario del centro y datos de contacto",
        "paragraphs": [
          "Pregunta si se requiere solicitud de adaptación, ficha de identificación u otra documentación, y distingue cada finalidad. Como ejemplo limitado a un centro, el CEIP Camilo José Cela de Madrid solicita informe médico y documento de firma; para reacciones graves añade una ficha de identificación del alumnado alérgico. No es una lista nacional de requisitos.",
          "Facilita contactos actualizados y utiliza el canal indicado por el centro. Conserva copia y justificante de recepción. Pide confirmar quién coordina la información con cocina y con las personas responsables durante la comida; no presupongas que siempre existe una concesionaria o que el envío ya se ha realizado."
        ]
      },
      {
        "id": "pendiente",
        "title": "Si falta documentación o aparece una nueva sospecha",
        "paragraphs": [
          "Comunica la situación cuanto antes y consulta al profesional sanitario. Solicita al centro una respuesta sobre cómo garantizar la atención segura mientras se completa la documentación; no hay una regla estatal que imponga servir el menú estándar hasta recibir el certificado.",
          "La familia y el centro deben concretar la solución conforme a las indicaciones sanitarias y al protocolo aplicable. Llevar comida de casa exige organizar su conservación y calentamiento seguros. Esta guía no determina qué alimentos puede tomar el alumno ni sustituye un plan sanitario individual."
        ]
      },
      {
        "id": "actualizar",
        "title": "Cuándo actualizar y qué confirmar",
        "paragraphs": [
          "Aporta cambios de diagnóstico o de indicaciones cuando los haya. Revisa el documento y las instrucciones del centro: una actualización anual no es una obligación general establecida por las dos normas estatales citadas. Si se solicita renovar, confirma qué información necesita actualizarse y por qué.",
          "Comprueba el menú acordado, la información de alérgenos y que el personal responsable conoce el procedimiento. Las autorizaciones o pautas sobre medicación y actuación ante una reacción son documentos y protocolos específicos; no se deducen automáticamente de una solicitud de menú adaptado."
        ]
      }
    ],
    "disclaimer": "No somos Administración Pública. Esta guía orienta sobre documentación y organización del comedor; no prescribe dietas ni tratamientos. El diagnóstico y las indicaciones sanitarias corresponden a los profesionales que atienden al alumno. Comprueba el procedimiento de tu centro y comunidad.",
    "related": [
      {
        "href": "/comedor",
        "label": "Guías de comedor"
      },
      {
        "href": "/comedor/menu-especial-comedor",
        "label": "Solicitar menú especial"
      }
    ]
  },
  {
    "id": "impago",
    "pack": "comedor",
    "path": "/comedor/impago-comedor-escolar",
    "h1": "Impago del comedor: revisar el aviso y sus consecuencias",
    "title": "Impago del comedor: revisar el aviso y sus consecuencias",
    "description": "Comprueba deuda, titular del servicio, procedimiento y posibles alegaciones. Ejemplo andaluz de baja por impago sin extenderlo a todos los comedores.",
    "lead": "El impago puede tener consecuencias sobre el servicio y el cobro, pero no existe un único plazo nacional ni una ordenanza municipal aplicable a todos los comedores. Lee el aviso concreto y pide la norma o condiciones que fundamentan lo reclamado. No presupongas ni la suspensión inmediata ni que el servicio continuará sin límite.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://ws040.juntadeandalucia.es/sedeboja/lconsolidada/eli/es-an/o/2017/04/17/%281880789246%29/con/20240427/spa/html/LE0000596014_20240427.html",
      "label": "Andalucía: artículo 22, baja y alegaciones"
    },
    "sources": [
      {
        "href": "https://ws040.juntadeandalucia.es/sedeboja/lconsolidada/eli/es-an/o/2017/04/17/%281880789246%29/con/20240427/spa/html/LE0000596014_20240427.html",
        "label": "Andalucía: artículo 22, baja y alegaciones"
      }
    ],
    "sections": [
      {
        "id": "norma",
        "title": "Un ejemplo concreto: centros públicos de Andalucía",
        "paragraphs": [
          "En los servicios incluidos en la Orden de 17 de abril de 2017, el artículo 22 contempla la baja por dos recibos impagados. Exige comunicación de dirección y diez días para alegar; después resuelve el Consejo Escolar, notifica y cabe recurso de alzada. Estos requisitos no se trasladan a otros territorios o servicios."
        ]
      },
      {
        "id": "revisar",
        "title": "Qué revisar en tu comunicación",
        "paragraphs": [
          "Comprueba quién reclama, a qué alumno y periodo se refiere, qué importe está pendiente y qué pagos o bonificaciones se han descontado. Si no coincide, reúne recibos, justificantes y resolución de ayuda y comunica la discrepancia por el canal indicado.",
          "Pide identificar la regla vigente sobre baja, requerimiento, respuesta y recurso. Un aviso de cobro y una resolución que retira el servicio pueden ser actos distintos. No uses el supuesto plazo de un mes de otra localidad para calcular el tuyo."
        ]
      },
      {
        "id": "cobro",
        "title": "Deuda y continuidad del servicio",
        "paragraphs": [
          "No todas las facturas de comedor son ingresos municipales. La vía de reclamación y los posibles costes dependen de la naturaleza de la deuda y de su fundamento; no se aplican recargos de apremio automáticamente a cualquier recibo devuelto. Pide el desglose y la base de cada concepto.",
          "Dejar de acudir no acredita que se haya extinguido una deuda ni formalizado la baja. Si discrepas del importe o de la pérdida del servicio, atiende los plazos del procedimiento y solicita asesoramiento adecuado a la comunicación recibida."
        ]
      },
      {
        "id": "solucion",
        "title": "Si la dificultad es económica",
        "paragraphs": [
          "Explica la situación al centro, consulta recursos sociales y ayudas que admitan tu caso y pregunta al acreedor por un posible acuerdo de pago. Pide confirmar por escrito qué ocurre con el servicio durante su estudio.",
          "No se promete fraccionamiento, beca retroactiva, condonación ni que la solicitud suspenda los efectos del aviso. La guía de dificultades económicas organiza estos pasos y la de ayuda fuera de plazo distingue las vías de cada convocatoria."
        ]
      }
    ],
    "related": [
      {
        "href": "/comedor",
        "label": "Comedor escolar"
      },
      {
        "href": "/comedor/beca-comedor-2026-2027",
        "label": "Convocatorias seleccionadas 2026/27"
      },
      {
        "href": "/comedor/beca-comedor-fuera-de-plazo",
        "label": "Ayuda fuera del plazo ordinario"
      },
      {
        "href": "/comedor/no-puedo-pagar-comedor-escolar",
        "label": "Dificultades para pagar"
      }
    ],
    "disclaimer": "No somos Administración Pública. Consulta la convocatoria y las normas del servicio concreto; no adjudicamos ayudas ni suspendemos cobros o plazos."
  },
  {
    "id": "ies-sin-comedor",
    "pack": "comedor",
    "path": "/comedor/ies-sin-comedor",
    "h1": "El instituto no tiene comedor: qué puedes solicitar",
    "title": "Instituto sin comedor: opciones y escolarización rural",
    "description": "Qué consultar si el IES no tiene comedor: escolarización rural, servicio autorizado y ayudas. La ESO no queda excluida de todas las garantías de la LOE.",
    "lead": "Si tu instituto no tiene comedor, pide a dirección y a la Administración educativa que confirmen qué servicio o alternativa corresponde a tu caso. La respuesta depende de la escolarización, el territorio y el servicio autorizado. No puede descartarse un derecho por el mero hecho de cursar ESO.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a82",
      "label": "LOE: escolarización y servicios en zonas rurales"
    },
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a82",
        "label": "LOE, artículo 82: garantías del ámbito rural"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2025-7659#a2",
        "label": "Real Decreto 315/2025: ámbito de los servicios de alimentación"
      },
      {
        "href": "https://ceocaminodesantiago.centros.educa.jcyl.es/sitio/index.cgi?wid_item=119&wid_seccion=7",
        "label": "CEO Camino de Santiago: ejemplo de comedor con alumnado de secundaria"
      }
    ],
    "related": [
      {
        "href": "/comedor",
        "label": "Comedor escolar"
      },
      {
        "href": "/solicitud-comedor-escolar",
        "label": "Solicitud de alta o baja"
      },
      {
        "href": "/comedor/no-puedo-pagar-comedor-escolar",
        "label": "Dificultades para pagar el comedor"
      }
    ],
    "sections": [
      {
        "id": "rural",
        "title": "La excepción de la escolarización rural",
        "paragraphs": [
          "El artículo 82.2 de la LOE contempla que la Administración escolarice alumnado de educación básica de zonas rurales en un municipio próximo para garantizar la calidad de la enseñanza. En ese supuesto debe prestar gratuitamente transporte y, en su caso, comedor e internado. La educación básica incluye la ESO. Por eso no es correcto negar de forma absoluta una garantía estatal de comedor en secundaria.",
          "Esta previsión no convierte cualquier desplazamiento elegido por la familia en comedor gratuito ni obliga por sí sola a instalar un comedor dentro de cada IES. Si estás en ese supuesto, pide a la Administración educativa que concrete cómo atenderá el servicio y qué acreditación de escolarización necesita."
        ]
      },
      {
        "id": "servicio",
        "title": "Comprobar qué servicio está autorizado",
        "paragraphs": [
          "Hay servicios que atienden también a alumnado de secundaria: el CEO Camino de Santiago, en Castilla y León, publica expresamente ese uso. Es un ejemplo concreto, no una medida de cuántos institutos disponen de comedor.",
          "El Real Decreto 315/2025 incluye la ESO en su ámbito y regula condiciones de los servicios de alimentación. Esa inclusión no equivale a una obligación de crear un comedor físico en cada instituto. Consulta la organización y normativa territorial aplicables."
        ]
      },
      {
        "id": "consultar",
        "title": "Qué preguntar al instituto y a Educación",
        "paragraphs": [
          "Empieza por dirección o secretaría del IES y pide el contacto de la unidad educativa responsable. Explica centro, curso, municipio de residencia, horario y, si procede, la asignación de plaza en otro municipio. Conserva la solicitud y la respuesta.",
          "Si planteas usar el comedor de otro centro, pide confirmación de admisión, plazas, precio o gratuidad, desplazamiento y supervisión. No des por autorizada esa asistencia ni la salida del instituto por haber encontrado un comedor cercano.",
          "Para una ayuda económica, comprueba convocatoria, destinatarios y gastos cubiertos. La falta de comedor no acredita por sí sola que exista una ayuda para comer fuera del centro. Si la dificultad es económica, consulta también los recursos de servicios sociales, sin dar por concedida una prestación."
        ]
      },
      {
        "id": "peticion",
        "title": "Solicitar una solución y conservar la respuesta",
        "paragraphs": [
          "La asociación de familias y el consejo escolar pueden servir como canales para plantear la necesidad al centro. Documenta la situación y dirige la petición al órgano competente. No se promete que una petición colectiva cree el servicio ni se atribuyen resultados a experiencias de familias no verificadas.",
          "Si recibes una denegación formal, revisa su motivación y las vías y plazos de reclamación indicados. Una consulta informal no sustituye la solicitud ni suspende automáticamente los plazos de una resolución."
        ]
      }
    ]
  },

];
