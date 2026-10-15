import { EDUCACION_URL } from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

/**
 * Segunda línea de nichos colegio + comedor (facts verificados en la corrida de research de 2026-09-04).
 * Transporte escolar-metropolitano (T-16 y abono joven) vive bajo /comedor por afinidad de audiencia familiar.
 */
export const COLE_COMEDOR_NICHOS2_GUIDES: Guide[] = [
  {
    "id": "cambioMitadCurso",
    "path": "/colegio/cambiar-de-colegio-a-mitad-de-curso",
    "pack": "colegio",
    "h1": "Cambiar de colegio durante el curso: procedimiento y continuidad",
    "title": "Cambiar de colegio durante el curso: procedimiento y continuidad",
    "description": "Comprueba motivos admitidos, vacantes y efectos sobre la plaza actual. Solicitud, traslado académico y protección si existe un problema de seguridad.",
    "lead": "Para cambiar durante el curso, consulta el procedimiento de admisión o traslado que corresponde a tu comunidad, etapa y situación. No basta con dejar de acudir a un centro y presentarse en otro. Tampoco debe afirmarse que solo una comisión puede recibir la solicitud, que siempre hay el mismo calendario o que todos los cambios exigen idéntica causa.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a86",
      "label": "Consultar la norma de admisión y presentación"
    },
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a84",
        "label": "LOE: admisión y elección de centro"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a86",
        "label": "LOE: presentación de solicitudes"
      },
      {
        "href": "https://www.comunidad.madrid/educacion/solicita-tu-admision-educacion-infantil-obligatoria-bachillerato",
        "label": "Madrid: proceso extraordinario 2026/2027"
      },
      {
        "href": "https://www.juntadeandalucia.es/educacion/portales/web/escolarizacion/infantil-a-bachillerato/preguntas-frecuentes",
        "label": "Andalucía: admisión 2026/2027"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2022-3296#a2-11",
        "label": "BOE: traslado en Primaria, artículo 29"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2022-4975#a3-6",
        "label": "BOE: traslado en ESO, artículo 34"
      }
    ],
    "sections": [
      {
        "id": "procedimiento",
        "title": "Motivo, canal y condiciones",
        "paragraphs": [
          "Explica si se trata de mudanza, incorporación desde otro territorio, necesidad de apoyo, convivencia u otra circunstancia. Comprueba los supuestos que admite tu Administración y su documentación; una causa orientativa no garantiza adjudicación.",
          "La LOE permite presentar solicitudes al centro, al órgano de garantías o a la Administración educativa. En Madrid, la información extraordinaria de 2026/2027 contempla centros con vacantes y servicio de escolarización. En otras comunidades, sigue sus instrucciones específicas."
        ]
      },
      {
        "id": "plaza",
        "title": "Revisar los efectos sobre la plaza actual",
        "paragraphs": [
          "Confirma la nueva admisión y fecha de incorporación y evita renunciar sin conocer las consecuencias. Lee también las opciones de la solicitud: la FAQ andaluza describe una casilla para otros centros con vacante que implica perder la reserva anterior. No todos los procedimientos mantienen la misma reserva.",
          "Si existe riesgo para el menor, pide medidas inmediatas de protección y continuidad educativa; no conviertas el consejo de conservar plaza en una obligación de soportar una situación peligrosa. La guía de acoso explica cómo comunicarlo sin esperar a completar un expediente."
        ]
      },
      {
        "id": "documentos",
        "title": "Traslado académico entre centros",
        "paragraphs": [
          "Durante Primaria y ESO, el centro de origen envía al receptor, cuando este lo solicita, informe personal y copia del historial. La matrícula será definitiva al recibirse el historial. Confirma quién pide el envío y qué queda pendiente.",
          "Guarda documentos y justificantes que tengas. No sustituyen el traslado oficial, pero pueden ser útiles para la solicitud. No se ordena retirar originales médicos o académicos del archivo del centro sin un procedimiento específico."
        ]
      },
      {
        "id": "tiempo",
        "title": "Calendario, vacantes y servicios",
        "paragraphs": [
          "Consulta el calendario del curso y etapa. No existe un plazo nacional de resolución de días o semanas ni puede afirmarse que todas las listas ordinarias dejan de operar al comenzar el curso. Comprueba la situación de tu solicitud con el órgano responsable.",
          "Revisa por separado comedor, transporte y ayudas, así como contactos y apoyos educativos. El cambio de matrícula no acredita que esos servicios se hayan trasladado automáticamente."
        ]
      }
    ],
    "disclaimer": "No somos Administración Pública. Comprueba el procedimiento vigente de tu comunidad, la etapa y el tipo de centro. Las referencias autonómicas son ejemplos delimitados; esta guía no adjudica plaza ni sustituye una resolución.",
    "related": [
      {
        "href": "/colegio",
        "label": "Guías de colegio"
      },
      {
        "href": "/colegio/documentos-matricula-colegio",
        "label": "Preparar documentación"
      },
      {
        "href": "/colegio/cambiar-de-colegio-fuera-de-plazo",
        "label": "Admisión fuera de plazo"
      },
      {
        "href": "/colegio/cambio-de-colegio-por-acoso",
        "label": "Protección ante acoso"
      }
    ]
  },
  {
    "id": "cambioPorAcoso",
    "path": "/colegio/cambio-de-colegio-por-acoso",
    "pack": "colegio",
    "h1": "Acoso escolar y cambio de centro: protección, comunicación y solicitud",
    "title": "Acoso escolar y cambio de centro: protección, comunicación y solicitud",
    "description": "Activa protección ante indicios sin esperar a reunir un expediente. Distingue protocolo, seguimiento y solicitud de cambio según la Administración educativa.",
    "lead": "Ante indicios de acoso o violencia, comunica la situación a la dirección y al coordinador de bienestar y protección y pide medidas de seguridad. La ley exige iniciar los protocolos ante indicios o la comunicación de los hechos por el menor: no depende de que la familia registre primero un escrito. El posible cambio de centro se valora por el cauce educativo correspondiente.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.educacionfpydeportes.gob.es/en/mc/sgctie/acoso-escolar.html",
      "label": "Consultar el servicio de ayuda contra el acoso"
    },
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2021-9347#a3-6",
        "label": "BOE: inicio de protocolos ante indicios o comunicación"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2021-9347#a3-7",
        "label": "BOE: coordinador de bienestar y protección"
      },
      {
        "href": "https://www.educacionfpydeportes.gob.es/en/mc/sgctie/acoso-escolar.html",
        "label": "Ministerio: teléfono y canales de ayuda"
      },
      {
        "href": "https://www.educacionfpydeportes.gob.es/prensa/actualidad/2026/04/20260415-protocoloacoso.html",
        "label": "Ministerio: alcance del protocolo marco de abril de 2026"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2022-3296#a2-11",
        "label": "BOE: traslado en Primaria, artículo 29"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2022-4975#a3-6",
        "label": "BOE: traslado en ESO, artículo 34"
      }
    ],
    "sections": [
      {
        "id": "proteccion",
        "title": "Atender la seguridad desde el principio",
        "paragraphs": [
          "Si existe peligro inmediato, llama al 112. Para orientación sobre acoso escolar, el Ministerio publica el 900 018 018, gratuito y disponible las 24 horas todos los días, además de canales accesibles. Pedir ayuda no sustituye comunicar la situación al centro.",
          "No se debe esperar a una resolución de cambio o a reunir un informe completo para pedir protección. Solicita medidas y seguimiento que permitan continuidad educativa segura; no se prescribe permanecer físicamente en una situación peligrosa mientras se tramita."
        ]
      },
      {
        "id": "comunicar",
        "title": "Comunicar hechos y conservar constancia",
        "paragraphs": [
          "Explica hechos, fechas, personas que puedan aportar información y necesidades de protección. Un escrito con justificante de entrega ayuda a conservar constancia, pero una comunicación verbal o la del propio menor no carece por ello de valor ni impide activar el protocolo. No retrases una alerta para conseguir un sello.",
          "Los artículos 34 y 35 de la Ley Orgánica 8/2021 exigen protocolos y coordinador de bienestar en todos los centros con menores, con independencia de su titularidad. Pide identificar a las personas responsables, las medidas y el canal de seguimiento; protege los datos de los menores al aportar pruebas."
        ]
      },
      {
        "id": "seguimiento",
        "title": "Protocolo, inspección y plazos",
        "paragraphs": [
          "Consulta el protocolo de la comunidad y, si no hay respuesta suficiente o persiste el riesgo, comunica los hechos a la inspección o al servicio educativo competente. No se afirma que inspección sea siempre quien instruye todo expediente ni que haya un mismo plazo nacional.",
          "El protocolo marco presentado por el Ministerio en abril de 2026 se ofrece como referencia a las autonomías. No se sustituye con él la comprobación del protocolo aplicable ni se convierten sus pautas en plazos obligatorios universales."
        ]
      },
      {
        "id": "cambio",
        "title": "Solicitar y valorar un cambio de centro",
        "paragraphs": [
          "Explica por qué se solicita el cambio y pide información sobre órgano, documentos y apoyos. La Administración debe valorar la protección y continuidad educativa; esta guía no garantiza cambio automático, centro concreto ni que en todos los territorios deba finalizar primero el expediente de acoso.",
          "El traslado académico de Primaria y ESO se realiza entre centros. Un cambio de colegio no elimina por sí solo la necesidad de investigar, proteger y dar seguimiento, ni garantiza que no haya dificultades educativas. Antes de formalizarlo, pide un plan de incorporación y de apoyo adaptado al menor."
        ]
      }
    ],
    "disclaimer": "No somos Administración Pública. Comprueba el procedimiento vigente de tu comunidad, la etapa y el tipo de centro. Las referencias autonómicas son ejemplos delimitados; esta guía no adjudica plaza ni sustituye una resolución.",
    "related": [
      {
        "href": "/colegio",
        "label": "Guías de colegio"
      },
      {
        "href": "/colegio/documentos-matricula-colegio",
        "label": "Preparar documentación"
      },
      {
        "href": "/colegio/cambiar-de-colegio-fuera-de-plazo",
        "label": "Admisión fuera de plazo"
      }
    ]
  },
  {
    "id": "listaEsperaInfantil",
    "path": "/colegio/lista-espera-escuela-infantil",
    "pack": "colegio",
    "h1": "Lista de espera de escuela infantil 0-3: baremo y vacantes",
    "title": "Lista de espera de escuela infantil 0-3: baremo y vacantes",
    "description": "Revisa puntuación, exclusión y listas de espera de infantil. Ejemplos 2026/2027 de las redes autonómica y municipal de Madrid y solicitud extraordinaria.",
    "lead": "Si no has obtenido plaza en una escuela infantil, comprueba si figuras como no admitido en espera o como excluido y cuál es el motivo. El primer ciclo de Infantil es voluntario y su acceso depende del procedimiento y la oferta aplicables. Estar en espera no equivale a tener plaza adjudicada ni permite prever cuándo llegará una vacante.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://sede.comunidad.madrid/ofertas-formacion/admision-primer-ciclo-educacion-infantil",
      "label": "Consultar el ejemplo autonómico de admisión"
    },
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a12",
        "label": "LOE: carácter voluntario de Educación Infantil"
      },
      {
        "href": "https://sede.comunidad.madrid/ofertas-formacion/admision-primer-ciclo-educacion-infantil",
        "label": "Comunidad de Madrid: admisión 2026/2027 y ámbito"
      },
      {
        "href": "https://sede.comunidad.madrid/medias/anexoibaremodeadmisionparaprimerciclodeeducacioninfantilpdf/download",
        "label": "Madrid: baremo de primer ciclo"
      },
      {
        "href": "https://www.madrid.es/UnidadesDescentralizadas/UDCBOAM/2023Junio/Areas/PolSocialesFamIgualdad/A%C3%B1o%202026/Escuelas%20Infantiles%2026-27/ANEXO%20BASES.pdf",
        "label": "Ayuntamiento de Madrid: bases 2026/2027, artículos 15 y 18"
      }
    ],
    "sections": [
      {
        "id": "comprobar",
        "title": "Revisar el resultado y el baremo",
        "paragraphs": [
          "Localiza las bases del curso y la red del centro: autonómica, municipal o privada. Comprueba edad, opciones solicitadas, puntuación de cada criterio y causa de exclusión, si la hay. Guarda la solicitud y el justificante para contrastarlos con el resultado.",
          "Si detectas un error, usa el plazo y canal de reclamación publicados. Diferencia corregir datos de alegar circunstancias nuevas: las bases determinan qué puede valorarse y en qué fecha. Esperar una posible renuncia de otra familia no sustituye reclamar a tiempo."
        ]
      },
      {
        "id": "baremo",
        "title": "Ejemplo: primer ciclo de la Comunidad de Madrid, 2026/2027",
        "paragraphs": [
          "El baremo autonómico asigna 2 puntos por hermanos ya matriculados en el centro solicitado o en el colegio público donde se ubique la escuela infantil o casa de niños. Si otro hermano solicitante ya nacido obtiene plaza en la misma convocatoria y centro, el apartado específico prevé 1 punto.",
          "La renta familiar por persona puntúa hasta 5 puntos; la proximidad del domicilio o trabajo, 3 en el municipio del centro o 1 en otro municipio madrileño. Consulta el anexo completo, las condiciones de acreditación y los desempates. Estas cifras no son un baremo nacional ni el de las escuelas del Ayuntamiento de Madrid."
        ]
      },
      {
        "id": "redes",
        "title": "Comunidad y Ayuntamiento de Madrid: solicitudes distintas",
        "paragraphs": [
          "La convocatoria autonómica excluye las escuelas de titularidad del Ayuntamiento de Madrid. Dentro de un mismo Servicio de Apoyo a la Escolarización autonómico se presenta una solicitud con primera opción y hasta 11 centros adicionales; se permiten solicitudes a distintos servicios. Identifica la red antes de enviar formularios duplicados.",
          "La convocatoria municipal 2026/2027 mantiene la lista de no admitidos para cubrir vacantes hasta el 30 de mayo de 2027. Su artículo 18 regula la gestión por la escuela y los efectos de aceptar una plaza sobre las demás listas. No se han eliminado las listas de espera de segundo y tercer curso."
        ]
      },
      {
        "id": "extraordinario",
        "title": "Si no solicitaste en el periodo ordinario",
        "paragraphs": [
          "Consulta si existe admisión extraordinaria y cómo se relaciona con las solicitudes anteriores. En la red municipal madrileña, el artículo 15 permite a quienes no solicitaron en plazo presentar solicitud extraordinaria en cada escuela; se ordena por entrega y se atiende tras agotarse la lista ordinaria, con la particularidad prevista para menores aún no nacidos. No equivale a saltarse a quienes esperan.",
          "En otro municipio o red, comprueba su procedimiento concreto: una regla municipal no autoriza a solicitar centro por centro en todos los sistemas. Conserva el justificante y pide confirmar tu situación en la lista."
        ]
      },
      {
        "id": "seguimiento",
        "title": "Seguimiento y preparación de la matrícula",
        "paragraphs": [
          "Mantén actualizados los datos de contacto y revisa los canales oficiales de publicación. Anota el plazo de aceptación y matrícula cuando se te ofrezca una plaza. Una llamada informativa no sustituye la formalización que exijan las bases.",
          "Consulta las opciones compatibles con tus horarios y presupuesto, sin contar con una vacante futura como si estuviera concedida. Para matricular, sigue la lista documental de esa red y distingue documentos aportados de consultas administrativas. No existe una lista única nacional de documentos para todas las escuelas infantiles."
        ]
      }
    ],
    "disclaimer": "No somos Administración Pública. Los ejemplos corresponden a los municipios, redes y cursos indicados. Comprueba la convocatoria aplicable y sus actualizaciones antes de presentar una solicitud.",
    "related": [
      {
        "href": "/colegio",
        "label": "Guías de colegio"
      },
      {
        "href": "/colegio/inscripcion-extraescolares-ayuntamiento",
        "label": "Inscripción en extraescolares"
      },
      {
        "href": "/colegio/documentos-matricula-colegio",
        "label": "Documentos de matrícula"
      }
    ]
  },
  {
    "id": "extraescolaresMunicipales",
    "path": "/colegio/inscripcion-extraescolares-ayuntamiento",
    "pack": "colegio",
    "h1": "Extraescolares municipales: inscripción, sorteo y ayudas",
    "title": "Extraescolares municipales: inscripción, sorteo y ayudas",
    "description": "Localiza la convocatoria de tu actividad y distingue preinscripción, plaza y ayuda económica. Ejemplos de Rivas y Barcelona para 2026/2027.",
    "lead": "Para apuntarte a una extraescolar, localiza quién organiza la actividad, el centro donde se realiza y la convocatoria del curso. La preinscripción, la adjudicación de plaza y la ayuda para pagarla pueden ser trámites separados, con calendarios distintos. No hay un plazo de inscripción común para todos los ayuntamientos.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://sede-electronica.rivasciudad.es/tramite/actividades-extraescolares/",
      "label": "Consultar el ejemplo de inscripción de Rivas"
    },
    "sources": [
      {
        "href": "https://sede-electronica.rivasciudad.es/tramite/actividades-extraescolares/",
        "label": "Rivas: inscripción y sorteo 2026/2027"
      },
      {
        "href": "https://lesmevesajudes.barcelona.cat/llistat-dajudes/subvencions-a-infants-i-joves-entre-6-i-17-anys-per-a-les-activitats-extraescolars-esportives-de-la-ciutat-de-barcelona/",
        "label": "Barcelona: fases de la ayuda económica en 2026"
      }
    ],
    "sections": [
      {
        "id": "localizar",
        "title": "Encontrar la convocatoria de la actividad",
        "paragraphs": [
          "Busca en los apartados de Educación, Deportes o Cultura del ayuntamiento y en la información del centro. Comprueba quién recibe la solicitud: que se utilice un colegio o una instalación municipal no basta para identificar al organizador.",
          "Antes de enviar, verifica edades, curso escolar, horarios, lugar, requisitos de residencia o escolarización si existen, precio, bonificaciones y condiciones de baja. Revisa cómo debe identificarse la persona adulta y cómo se añade al menor; sigue el sistema concreto del portal."
        ]
      },
      {
        "id": "rivas",
        "title": "Rivas-Vaciamadrid: preinscripción y sorteo 2026/2027",
        "paragraphs": [
          "La sede de Rivas publicó preinscripción del 8 al 14 de junio de 2026, sorteo el 23 de junio y formalización del 23 al 30 de junio. Son fases ya transcurridas a la fecha de esta revisión, no un plazo abierto en septiembre.",
          "Sus instrucciones exigen una solicitud por centro y participante; si se repite, vale la última. Conserva y revisa el comprobante enviado por correo. Elige actividades a las que puedas acudir: obtener una en el sorteo elimina la espera de otras opciones de los mismos días y horas, no de todas las actividades sin distinción."
        ]
      },
      {
        "id": "barcelona",
        "title": "Barcelona: una ayuda económica tiene su propio calendario",
        "paragraphs": [
          "La ficha municipal de ayudas deportivas de 2026 distingue la asignación del nivel de ayuda, del 15 de enero al 11 de febrero, y la solicitud de la ayuda en septiembre/octubre. Estas fechas corresponden a la subvención, no a un periodo general de inscripción en actividades.",
          "Consulta tanto las condiciones de la entidad organizadora como las de la ayuda. Verifica si la actividad es subvencionable, qué inscripción previa pide la convocatoria y los efectos de contratarla antes de conocer la resolución. Solicitar una ayuda no garantiza plaza ni financiación."
        ]
      },
      {
        "id": "vacantes",
        "title": "Si ha terminado el plazo de inscripción",
        "paragraphs": [
          "Consulta si el programa admite solicitudes tardías, tiene lista de espera o abre un proceso de vacantes. En la revisión de la sede de Rivas aparece un nuevo proceso referido a actividades de Deportes; ese aviso no acredita que se hayan reabierto las de todas las concejalías. Confirma fechas y canal en la actividad concreta.",
          "No se entra automáticamente en una lista por haber perdido el plazo. Pide confirmar si debes solicitar el alta, cómo se ordena y cómo se comunica una vacante. La existencia y frecuencia de bajas no permiten prometer una plaza en octubre o noviembre."
        ]
      },
      {
        "id": "formalizar",
        "title": "Cuando se ofrece la plaza",
        "paragraphs": [
          "Revisa la adjudicación y completa aceptación, documentación y pago dentro del plazo que indiquen. Comprueba el inicio de la actividad y cómo se tramitan recogida, necesidades de apoyo o autorizaciones que procedan.",
          "Si buscas alternativas en una AMPA, asociación o entidad privada, consulta sus propias fechas, precios y condiciones. No presupongas que comparten el sistema de admisión o las bonificaciones del ayuntamiento."
        ]
      }
    ],
    "disclaimer": "No somos Administración Pública. Los ejemplos corresponden a los municipios, redes y cursos indicados. Comprueba la convocatoria aplicable y sus actualizaciones antes de presentar una solicitud.",
    "related": [
      {
        "href": "/colegio",
        "label": "Guías de colegio"
      },
      {
        "href": "/colegio/lista-espera-escuela-infantil",
        "label": "Lista de espera de infantil"
      },
      {
        "href": "/colegio/documentos-matricula-colegio",
        "label": "Documentos de matrícula"
      }
    ]
  },
  {
    "id": "becaComedor2627",
    "pack": "comedor",
    "path": "/comedor/beca-comedor-2026-2027",
    "h1": "Beca de comedor 2026/27: fechas y convocatorias seleccionadas",
    "title": "Becas comedor 2026/2027: plazos CyL, Madrid y Barcelona",
    "description": "¿Cuándo pedir la beca de comedor 2026/2027? Plazos contrastados de Castilla y León, Madrid, Barcelona y Andalucía. Distingue plazo familiar y subvención al centro.",
    "lead": "Antes de solicitar, comprueba curso, territorio, etapa, tipo de centro y quién puede ser solicitante. Estas referencias seleccionadas se revisaron el 16 de septiembre de 2026. No son un mapa completo de España y una fase de recurso o una subvención al centro no equivale a un plazo de solicitud familiar.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.tramitacastillayleon.jcyl.es/web/jcyl/AdministracionElectronica/es/Plantilla100Detalle/1251181053840/Ayuda012/1209383392824/Propuesta",
      "label": "Castilla y León: ayuda de comedor y periodo extraordinario"
    },
    "sources": [
      {
        "href": "https://www.tramitacastillayleon.jcyl.es/web/jcyl/AdministracionElectronica/es/Plantilla100Detalle/1251181053840/Ayuda012/1209383392824/Propuesta",
        "label": "Castilla y León: ayuda de comedor y periodo extraordinario"
      },
      {
        "href": "https://www.edubcn.cat/ca/alumnat_i_familia/ajuts_beques_i_subvencions/ajuts_de_menjador_escolar",
        "label": "Barcelona ciudad: convocatoria y periodos 2026/27"
      },
      {
        "href": "https://sede.comunidad.madrid/ayudas-becas-subvenciones/becas-comedor-escolar-2026-2027",
        "label": "Madrid: calendario y tramitación 2026/27"
      },
      {
        "href": "https://ws040.juntadeandalucia.es/sedeboja/lconsolidada/eli/es-an/o/2017/04/17/%281880789246%29/con/20240427/spa/html/LE0000596014_20240427.html",
        "label": "Andalucía: servicios complementarios, artículos 22 y 25"
      },
      {
        "href": "https://www.juntadeandalucia.es/boja/2026/127/3.html",
        "label": "Andalucía: subvención a determinados centros concertados"
      },
      {
        "href": "https://sede.xunta.gal/detalle-procedemento?ano=2026&c=cidadans&codtram=ED601C&lang=es&numpub=1",
        "label": "Galicia ED601C: curso 2025/26, no 2026/27"
      }
    ],
    "sections": [
      {
        "id": "castilla-leon",
        "title": "Castilla y León: septiembre tiene destinatarios concretos",
        "paragraphs": [
          "La sede anuncia del 1 al 22 de septiembre de 2026 para alumnado de nueva matriculación en las etapas y centros públicos contemplados. Advierte que quien ya solicitó en el periodo ordinario no puede presentar una nueva solicitud. No es una reapertura indiscriminada para quien olvidó pedirla.",
          "La misma ficha contempla solicitudes durante el curso para determinados supuestos. Consulta el detalle en la guía de ayuda fuera de plazo y verifica documentación y canal en la sede; existe presentación en el centro y por la aplicación, además de las vías registrales indicadas."
        ]
      },
      {
        "id": "barcelona",
        "title": "Barcelona ciudad: varios periodos durante el curso",
        "paragraphs": [
          "Para alumnado de I3 a 4.º de ESO en centros públicos y concertados de la ciudad, el segundo periodo es del 8 al 27 de septiembre de 2026; la documentación que deba aportarse al centro tiene plazo hasta el 30. La solicitud se hace mediante el formulario telemático del Consorci.",
          "La convocatoria publica también del 28 de septiembre al 29 de noviembre de 2026, del 30 de noviembre de 2026 al 28 de febrero de 2027 y un último periodo desde el 1 de marzo hasta el cierre de nuevas admisiones del curso. Revisa requisitos, documentación y efectos de cada periodo; no extiendas estas fechas al resto de Cataluña."
        ]
      },
      {
        "id": "madrid",
        "title": "Madrid: distinguir solicitud, subsanación y recurso",
        "paragraphs": [
          "El plazo de solicitud fue del 29 de abril al 28 de mayo de 2026; la subsanación, del 22 de junio al 3 de julio. La sede publicó resolución el 4 de septiembre y señala recurso de reposición del 5 de septiembre al 5 de octubre de 2026. Un recurso sirve para impugnar una resolución; no es por sí solo una nueva convocatoria para quienes no solicitaron. Consulta la ficha y las instrucciones correspondientes a tu expediente."
        ]
      },
      {
        "id": "andalucia",
        "title": "Andalucía: bonificación familiar y subvención al centro",
        "paragraphs": [
          "Para los centros públicos y servicios comprendidos en la Orden de 17 de abril de 2017, el artículo 25 sitúa la petición de bonificación del 1 al 7 de septiembre. Comprueba con el centro el procedimiento aplicable a tu incorporación.",
          "El plazo del 1 al 15 de septiembre de 2026 de la resolución de 19 de junio está dirigido a determinados centros concertados de educación especial o con planes de compensación educativa. No es una segunda ventana general para que las familias pidan beca."
        ]
      },
      {
        "id": "galicia",
        "title": "Galicia: no confundir año de solicitud con curso financiado",
        "paragraphs": [
          "La ficha ED601C que abrió del 6 de julio al 6 de agosto de 2026 corresponde al curso 2025/26 y a comedores no gestionados directa ni indirectamente por la Consellería. No debe presentarse como una ayuda del curso 2026/27 por haberse solicitado en 2026. Consulta el programa y curso que te correspondan."
        ]
      },
      {
        "id": "comprobar",
        "title": "Antes de enviar y si el plazo ha terminado",
        "paragraphs": [
          "Lee qué renta y unidad familiar se valoran, qué matrícula o uso del comedor exige la convocatoria y qué documentos se consultan o aportan. No presupongas un certificado de padrón obligatorio en todos los programas. Guarda el justificante de envío; rellenar un borrador no acredita presentación.",
          "Si llegas tarde, busca una fase admitida por esa convocatoria o consulta una ayuda distinta del municipio. Solicita orientación sobre la necesidad inmediata al centro y a servicios sociales. La petición de ayuda no garantiza cobertura ni cancela recibos pendientes."
        ]
      }
    ],
    "related": [
      {
        "href": "/comedor",
        "label": "Comedor escolar"
      },
      {
        "href": "/comedor/beca-comedor-fuera-de-plazo",
        "label": "Ayuda fuera del plazo ordinario"
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
    "id": "menuEspecialComedor",
    "pack": "comedor",
    "path": "/comedor/menu-especial-comedor",
    "h1": "Menú especial en el comedor: motivos, solicitud y alternativas",
    "title": "Menú especial en el comedor: motivos, solicitud y alternativas",
    "description": "Solicita adaptación por salud, motivos éticos o religiosos. Comprueba documentación y la alternativa de conservar y calentar comida familiar de forma segura.",
    "lead": "Comunica al centro el motivo por el que necesitas un menú especial y pide el procedimiento aplicable. Para salud se exige acreditación médica; los motivos éticos o religiosos tienen un tratamiento distinto. La respuesta puede consistir en un menú adaptado o en los medios adecuados para conservar y calentar el aportado por la familia, conforme a la normativa.",
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
      }
    ],
    "sections": [
      {
        "id": "motivo",
        "title": "Distinguir el motivo de la solicitud",
        "paragraphs": [
          "El artículo 10 del Real Decreto 315/2025 contempla necesidades por alergias, intolerancias u otras enfermedades acreditadas mediante certificado médico. También contempla motivos éticos o religiosos, sin exigir para estos una justificación médica.",
          "Identifica en la solicitud al alumno, curso, servicio y motivo. Pide conocer el formulario y quién lo recibe. Evita utilizar un modelo de alergias para justificar una petición que no responde a un problema de salud."
        ]
      },
      {
        "id": "alcance",
        "title": "Qué centros y etapas contempla la norma",
        "paragraphs": [
          "El real decreto se aplica a centros públicos, concertados y privados de segundo ciclo de Infantil, Primaria, Educación Especial, ESO, Bachillerato y FP de grado básico o medio. Sus reglas de menús especiales están vigentes desde el 16 de abril de 2026.",
          "El primer ciclo de Infantil no figura en ese ámbito: para escuelas de 0 a 3 años hay que comprobar el artículo 40 de la Ley 17/2011 y la regulación aplicable. La ley también prevé adaptación por alergias o intolerancias y una alternativa de conservación y calentamiento bajo las condiciones que establece."
        ]
      },
      {
        "id": "alternativa",
        "title": "Menú adaptado o comida proporcionada por la familia",
        "paragraphs": [
          "Pide que el centro concrete qué solución ofrece y cómo se organiza. La alternativa prevista requiere medios de refrigeración y calentamiento adecuados; no basta con autorizar que el alumno lleve cualquier recipiente sin acordar conservación, entrega y consumo seguros. AESAN publica orientación específica para las familias.",
          "La disposición adicional del real decreto impide que su aplicación incremente el coste total del menú para las familias. Esto no equivale a que el servicio de comedor sea gratuito. Si te comunican un coste añadido por la adaptación, solicita explicación de su concepto y fundamento."
        ]
      },
      {
        "id": "documentacion",
        "title": "Documentación y seguimiento",
        "paragraphs": [
          "Cuando el motivo sea sanitario, aporta la acreditación médica de los alimentos que no pueden ingerirse. Pide al centro aclarar si el informe disponible cumple su procedimiento o necesita completarse; las normas estatales citadas no reservan su emisión exclusivamente a un pediatra del sistema público.",
          "Conserva justificante de entrega y solicita confirmar la solución acordada antes de utilizarla. Si cambia la indicación sanitaria, comunícalo y aporta la actualización correspondiente. No se establece en estas normas una renovación anual general del certificado."
        ]
      },
      {
        "id": "informacion",
        "title": "Información del menú y dudas sin resolver",
        "paragraphs": [
          "Pide la planificación del menú especial y la información de alérgenos. El artículo 11 regula la información mensual a las familias, también para necesidades especiales. La documentación clínica y la organización segura del servicio son tareas relacionadas, pero entregar un certificado no acredita por sí solo que el circuito esté preparado.",
          "Si la respuesta es insuficiente, deja constancia ante la dirección y consulta al órgano educativo o sanitario competente según el problema. Ante una alerta de alergia, comunícala de inmediato; no esperes a completar papeles para pedir medidas seguras."
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
        "href": "/comedor/documentos-alergia-comedor-escolar",
        "label": "Documentar una alergia o intolerancia"
      }
    ]
  },
  {
    id: "t16Solicitud",
    pack: "transporte",
    path: "/transporte/t16-como-solicitar",
    h1: "T-16: cómo solicitarla para un menor en Barcelona",
    title: "Tarjeta T-16: cómo solicitarla paso a paso",
    description:
      "T-16 del sistema integrado de Barcelona: edad, zona de uso, alta online del menor y coste de la tarjeta. Pasos y fuentes oficiales en castellano.",
    lead:
      "La T-16 permite viajar desde los 4 años hasta seis meses después de cumplir los 16, dentro de la zona tarifaria del municipio de residencia. Esta guía explica la solicitud en el sistema integrado de Barcelona a través de TMB.",
    cta: { href: "https://www.tmb.cat/es/tarifas-metro-bus-barcelona/t-mobilitat/bonificaciones-y-descuentos/t-16-t-jove", label: "Solicitar la T-16: instrucciones de TMB" },
    reviewedAt: "2026-09-07",
    sources: [
      { label: "TMB: condiciones y gestiones de la T-16", href: "https://www.tmb.cat/es/tarifas-metro-bus-barcelona/t-16" },
      { label: "TMB: alta del menor y solicitud online", href: "https://www.tmb.cat/es/tarifas-metro-bus-barcelona/t-mobilitat/bonificaciones-y-descuentos/t-16-t-jove" },
    ],
    disclaimer: "Guía independiente para la T-16 del sistema integrado de Barcelona. Confirma condiciones y tarifas en TMB antes de solicitarla. No somos Administración Pública ni operador de transporte.",
    related: [
      { href: "/transporte/abono-joven-estudiante", label: "Abono joven de transporte" },
      { href: "/transporte", label: "Abonos y tarjetas de transporte" },
      { href: "/colegio", label: "Colegio: todas las guías" },
    ],
    sections: [
      {
        id: "que-es",
        title: "Dónde sirve y cuándo caduca",
        paragraphs: [
          "Es personal e intransferible. Los viajes son ilimitados en la zona para la que se emite; comprueba la de tu municipio en el mapa enlazado por TMB. Durante una inspección hay que acreditar la identidad del titular con un documento oficial vigente.",
          "La tarjeta no necesita renovaciones periódicas. Su caducidad llega seis meses después del 16.º cumpleaños: prepara otro título antes de esa fecha.",
        ],
      },
      {
        id: "alta-paso-a-paso",
        title: "El alta, paso a paso",
        paragraphs: [
          "La persona adulta responsable puede tramitarla online desde su cuenta de T-mobilitat en TMB Tickets. El título de viaje es gratuito, pero emitir la tarjeta cuesta 4,50 €.",
        ],
        lists: [
          [
            "Da de alta al menor: autoriza la comprobación administrativa o adjunta su documento de identidad y la documentación familiar que indica TMB.",
            "Comprueba que aparece en Personas a cargo y asígnale el perfil T-16.",
            "Solicita el soporte desde su apartado. TMB indica unos diez días hábiles para recibirlo en casa.",
            "Activa la tarjeta antes del primer viaje siguiendo las instrucciones oficiales.",
          ],
        ],
      },
      {
        id: "uso-y-caducidad",
        title: "Si prefieres acudir a un Punt TMB",
        paragraphs: [
          "El menor no tiene que asistir. Puede acudir su padre, madre, tutor legal o una persona adulta autorizada. Revisa en TMB los documentos originales y, si procede, la autorización que debes llevar. La cita previa es recomendable.",
        ],
      },
      {
        id: "perdida-o-mudanza",
        title: "Pérdida de la tarjeta o cambio de domicilio",
        paragraphs: [
          "Si se pierde o te la roban, bloquea y da de baja el soporte antes de pedir el duplicado, que cuesta 4,50 €. Si cambia tu domicilio, actualiza los datos; una mudanza a otra zona tarifaria puede requerir una nueva tarjeta.",
        ],
      },
    ],
  },
  {
    "id": "abonoJovenEstudiante",
    "pack": "transporte",
    "path": "/transporte/abono-joven-estudiante",
    "h1": "Abonos jóvenes de transporte: Madrid, T-jove y Abono Único",
    "title": "Abono joven: edades, requisitos y solicitud en 2026",
    "description": "Compara el Abono Joven de Madrid, la T-jove de Barcelona y el Abono Único estatal: edad, residencia, cobertura y pasos de compra en 2026.",
    "lead": "El límite de edad y el trámite dependen del título: el Abono Joven de Madrid, la T-jove de Barcelona y el Abono Único estatal tienen reglas distintas. Estos tres ejemplos permiten comprobar qué necesitas antes de comprar. Un título por edad no equivale a una ayuda por ser estudiante, y la matrícula no sustituye otros requisitos de acceso.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.crtm.es/billetes-y-tarifas/buscador/abono-joven/",
      "label": "Consultar el Abono Joven de Madrid"
    },
    "secondaryCta": {
      "href": "https://www.renfe.com/es/es/viajar/prepara-tu-viaje/trenes-media-distancia-avant/abonos-media-distancia/media-distancia/abono-unico",
      "label": "Consultar el Abono Único en Renfe"
    },
    "sources": [
      {
        "href": "https://www.crtm.es/billetes-y-tarifas/buscador/abono-joven/",
        "label": "CRTM: edad, tarifa y carga del Abono Joven"
      },
      {
        "href": "https://www.crtm.es/landing-billetes-y-tarifas/tarjeta-transporte-publico-personal/",
        "label": "CRTM: requisitos y solicitud de tarjeta personal"
      },
      {
        "href": "https://www.tmb.cat/es/tarifas-metro-bus-barcelona/t-jove",
        "label": "TMB: edad y validez de la T-jove"
      },
      {
        "href": "https://www.renfe.com/es/es/viajar/prepara-tu-viaje/trenes-media-distancia-avant/abonos-media-distancia/media-distancia/abono-unico",
        "label": "Renfe: cobertura y compra del Abono Único"
      },
      {
        "href": "https://www.renfe.com/es/es/normativa",
        "label": "Renfe: condiciones del Abono Único Joven y Niño"
      },
      {
        "href": "https://sede.transportes.gob.es/proc-servicios-comunes/abono-nominativo-tarifa-unica-servicios-publicos-transporte-regular-viajeros-carretera-durante-2026",
        "label": "Transportes: tarifas y vigencia de 2026"
      },
      {
        "href": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-18418",
        "label": "BOE: programa de adhesión al sistema de Abono Único"
      },
      {
        "href": "https://codigoviajero.transportes.gob.es/",
        "label": "Transportes: registro Código Viajero"
      }
    ],
    "disclaimer": "No somos Administración Pública ni operador de transporte. Precios y condiciones contrastados el 16 de septiembre de 2026. Comprueba la ficha vigente, la cobertura del trayecto y las condiciones del operador antes de comprar.",
    "related": [
      {
        "href": "/transporte/t16-como-solicitar",
        "label": "T-16: solicitud y edad de uso"
      },
      {
        "href": "/empadronarse",
        "label": "Trámites de padrón"
      },
      {
        "href": "/becas",
        "label": "Guías de becas"
      },
      {
        "href": "/transporte",
        "label": "Abonos y tarjetas de transporte"
      }
    ],
    "sections": [
      {
        "id": "madrid",
        "title": "Madrid: Abono Joven y tarjeta personal",
        "paragraphs": [
          "El CRTM publica el Abono Joven de 30 días para edades de 15 a 25 años, hasta la fecha en que se cumplen 26. El precio publicado es 10 euros. Cubre las zonas A a E2, con exclusión de viajes internos de Castilla-La Mancha. Se carga en una Tarjeta Transporte Público Personal.",
          "La tarjeta se solicita por internet o en oficina con cita; su primera emisión cuesta 4 euros, aparte del título. El CRTM exige residencia en Madrid o en los municipios de Castilla-La Mancha y Castilla y León de su listado. Las familias numerosas están exceptuadas de acreditar ese requisito.",
          "Prepara identidad, fotografía y certificado o volante de padrón expedido en los tres meses anteriores. Para residentes en municipios madrileños se permite autorizar la consulta de padrón; la oficina puede hacer la fotografía. Revisa las particularidades de tu caso en la ficha de la tarjeta. Después carga el abono en la app o puntos de venta autorizados: obtener el soporte y comprar el título son operaciones distintas."
        ]
      },
      {
        "id": "barcelona",
        "title": "Barcelona: T-jove para menores de 30",
        "paragraphs": [
          "La T-jove permite viajes integrados durante 90 días consecutivos desde la primera validación en todas las coronas del sistema ATM de Barcelona. Se necesita alta en T-mobilitat y perfil Joven. Para menores de edad, el alta la gestiona la persona adulta responsable.",
          "Si se valida antes de cumplir 30 años, TMB permite seguir utilizándola hasta su caducidad. Por tanto, no corresponde aplicar a este título un corte general a los 26. Consulta su precio y soportes en TMB antes de comprar."
        ]
      },
      {
        "id": "unico",
        "title": "Abono Único de 2026: tarifa y beneficiarios",
        "paragraphs": [
          "El Abono Único es un título nominativo con validez de 30 días desde el inicio elegido. La tarifa normal es 60 euros y la de Jóvenes y Niños, 30 euros. En 2026, esta última admite personas nacidas entre el 1 de enero de 2000 y el 31 de diciembre de 2026, con nacionalidad española o extranjera con residencia legal en España.",
          "Una persona nacida en 2000 que ya haya cumplido 26 sigue dentro del intervalo de nacimiento de esta modalidad en 2026. No se exige matrícula de estudiante, pero tampoco basta solo con la edad. La sede de Transportes fija el 31 de diciembre de 2026 como límite para seleccionar el inicio de vigencia; consulta posibles cambios para años posteriores."
        ]
      },
      {
        "id": "cobertura",
        "title": "Comprobar que cubre el trayecto",
        "paragraphs": [
          "Renfe incluye Cercanías, Media Distancia y Regionales de Catalunya sujetos a obligación de servicio público, así como determinadas relaciones Avant expresamente listadas. También participan los servicios regulares por carretera de competencia estatal. Antes de pagar, identifica el servicio concreto y comprueba si exige reserva o validación.",
          "El programa aprobado por la Orden TRM/910/2026 contempla adhesión voluntaria de autoridades autonómicas y locales. Su aprobación no prueba por sí sola que cualquier metro o autobús urbano acepte el abono. Verifica la adhesión y los servicios incluidos; tampoco debe descartarse toda integración futura por afirmar que los sistemas son necesariamente independientes."
        ]
      },
      {
        "id": "comprar",
        "title": "Código de registro, compra y uso",
        "paragraphs": [
          "Para el Abono Único de Jóvenes y Niños, Renfe pide registrarse en el portal Código Viajero de Transportes al menos 24 horas antes de la compra. Obtener el código no equivale a tener un abono emitido. Después elige un canal de venta del operador y la fecha de inicio. El portal oficial es codigoviajero.transportes.gob.es.",
          "Renfe vende en taquillas y máquinas; también en su web con las excepciones de servicios que indica su ficha. Conserva el localizador y PIN y sigue las instrucciones para utilizar el mismo abono en otros servicios. Solo se permite un Abono Único activo por persona para el mismo periodo; no compres otro para enlazar operadores. Formaliza o valida cada viaje según corresponda."
        ]
      },
      {
        "id": "elegir",
        "title": "Si cambia tu edad o tu recorrido",
        "paragraphs": [
          "Consulta la fecha de fin del perfil y la validez del título cargado en el sistema que utilizas. No confundas cumplir años con que el soporte físico caduque, ni cuentes con un aviso automático de la app.",
          "Compara coste, zonas, servicios y frecuencia de tus desplazamientos. Si buscas una tarifa estudiantil distinta, verifica matrícula y demás condiciones específicas. Tener varios títulos no demuestra que sus descuentos puedan acumularse ni que uno cubra todo lo que cubre otro."
        ]
      }
    ]
  },
];
