import type { Guide } from "@/lib/tramites/types";

export const MODELOS_SEDES: Guide[] = [
  {
    "id": "autorizacion-representacion-tramite",
    "pack": "modelos",
    "path": "/autorizacion-representacion-tramite",
    "h1": "Representación ante la Administración: autorización y acreditación",
    "title": "Representación ante la Administración: autorización y acreditación",
    "description": "Modelo limitado a actuaciones concretas. Comprueba cómo acreditar la representación: escrito admitido, apud acta o registro de apoderamientos y canal del trámite.",
    "lead": "Puedes actuar mediante representante, pero la forma de acreditar sus facultades depende de la actuación. El artículo 5 de la Ley 39/2015 exige prueba de representación para solicitudes, declaraciones, recursos, desistimiento y renuncia; en gestiones de mero trámite la presume. Una carta y dos documentos de identidad no garantizan por sí solos su aceptación en cualquier procedimiento.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565",
      "label": "Consultar la Ley 39/2015 en BOE"
    },
    "disclaimer": "No somos Administración. Adapta el escrito al procedimiento y utiliza el formulario y canal oficiales cuando sean obligatorios. No introduzcas aquí datos personales ni firmas.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a5",
        "label": "BOE: representación, prueba y subsanación"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a14",
        "label": "BOE: obligación de utilizar medios electrónicos"
      },
      {
        "href": "https://sede.administracion.gob.es/servicios-electronicos/rea",
        "label": "Punto de Acceso General: Registro Electrónico de Apoderamientos"
      }
    ],
    "related": [
      {
        "href": "/acuse-de-recibo-modelo",
        "label": "Guardar el justificante de registro"
      },
      {
        "href": "/modelo-subsanacion",
        "label": "Contestar un requerimiento"
      }
    ],
    "sections": [
      {
        "id": "acreditar",
        "title": "Comprobar cómo se acredita",
        "paragraphs": [
          "Se admite cualquier medio válido en Derecho que deje constancia fidedigna de la representación. La ley reconoce el apoderamiento apud acta presencial o electrónico y la inscripción en el registro de apoderamientos competente. Consulta el formulario y las vías que publica el órgano de tu trámite; esta plantilla no sustituye esa acreditación.",
          "El REA-AGE permite inscribir y gestionar poderes para actuaciones de su ámbito. Comprueba alcance, aceptación de la persona apoderada y estado del poder. No es un permiso para cualquier actuación personal: revisa si el trámite exige que acuda la persona interesada."
        ]
      },
      {
        "id": "alcance",
        "title": "Limitar las facultades y las notificaciones",
        "paragraphs": [
          "Describe órgano, expediente y actos autorizados. Presentar documentos no debe confundirse con consentir una renuncia o un desistimiento. La ley prevé entender las actuaciones con el representante salvo manifestación expresa en contra del interesado; decide cómo quieres recibir las notificaciones y exprésalo.",
          "Si representas a quien está obligado a relacionarse electrónicamente, también debes utilizar ese canal. No compartas claves personales: utiliza los mecanismos de representación admitidos por la sede."
        ]
      },
      {
        "id": "modelo",
        "title": "Plantilla para una actuación concreta",
        "paragraphs": [
          "Úsala solo cuando el órgano admita esta forma de acreditación. Completa o elimina los campos que correspondan y acredita la identidad por el medio exigido; no adjuntes copias de documentos automáticamente."
        ],
        "models": [
          {
            "id": "representacion",
            "title": "Autorización limitada — comprobar la acreditación exigida",
            "body": "[Lugar], [fecha]\n\nInteresado: [nombre e identificación]\nRepresentante: [nombre e identificación]\nÓrgano y expediente: [datos]\n\nOtorgo representación exclusivamente para [actuación concreta y documentos que se presentarán], con alcance temporal [indicar].\nNo autorizo mediante este escrito a desistir, renunciar a derechos ni interponer recursos.\nSolicito que las notificaciones se practiquen al interesado por [medio o dirección admitidos en el procedimiento].\n\nMedio de acreditación de la representación y documentos aportados: [indicar según las instrucciones oficiales].\nFirma del interesado: [firma]\nAceptación del representante, cuando proceda: [firma]"
          }
        ]
      },
      {
        "id": "defecto",
        "title": "Si requieren acreditar mejor la representación",
        "paragraphs": [
          "El artículo 5.6 permite subsanar la falta o insuficiencia de acreditación en los diez días que debe conceder el órgano, o en un plazo superior si lo requieren las circunstancias. Lee el requerimiento y atiéndelo; esta posibilidad no acredita que cualquier carta ya sea suficiente."
        ]
      }
    ]
  },
  {
    "id": "acuse-de-recibo-modelo",
    "pack": "modelos",
    "path": "/acuse-de-recibo-modelo",
    "h1": "Justificante de registro: qué acredita y cómo pedirlo",
    "title": "Justificante de registro: qué acredita y cómo pedirlo",
    "description": "Solicita y conserva fecha, hora, número de registro y documentos presentados ante la Administración. Modelo auxiliar y límites del acuse de recibo.",
    "lead": "Cuando presentas un escrito ante una Administración, conserva el recibo con fecha, hora y número de registro y comprueba sus anexos. Acredita la presentación, no que el trámite esté aprobado. La Ley 39/2015 no convierte una entrega a una empresa privada en un registro administrativo.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565",
      "label": "Consultar la Ley 39/2015 en BOE"
    },
    "disclaimer": "No somos Administración. Adapta el escrito al procedimiento y utiliza el formulario y canal oficiales cuando sean obligatorios. No introduzcas aquí datos personales ni firmas.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a16",
        "label": "BOE: registro y recibo de documentos"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a66",
        "label": "BOE: derecho al recibo y modelos específicos"
      },
      {
        "href": "https://sede.administracion.gob.es/servicios-electronicos/registro-electronico-general-age",
        "label": "Punto de Acceso General: REG-AGE y justificante"
      }
    ],
    "related": [
      {
        "href": "/autorizacion-representacion-tramite",
        "label": "Acreditar la representación"
      },
      {
        "href": "/modelo-subsanacion",
        "label": "Contestar un requerimiento"
      }
    ],
    "sections": [
      {
        "id": "recibo",
        "title": "Qué debe permitir comprobar",
        "paragraphs": [
          "En el registro electrónico se emite automáticamente un recibo con copia del escrito, fecha, hora y número de entrada, además de constancia de los documentos adjuntos. Descárgalo y comprueba destinatario, asunto y anexos. Un borrador, un correo de aviso o una captura de pantalla incompleta no equivalen por sí solos a ese recibo.",
          "En una oficina de asistencia en materia de registros puedes exigir un recibo de lo presentado. La documentación presencial se digitaliza y los originales se devuelven como regla, con las excepciones legales. No existe una obligación universal de llevar dos copias para todos los canales."
        ]
      },
      {
        "id": "canal",
        "title": "Elegir el registro adecuado",
        "paragraphs": [
          "Comprueba antes si hay formulario o procedimiento específico obligatorio. El REG-AGE permite remitir documentos a organismos integrados, pero no sustituye una forma de presentación especial que deba utilizarse. Un número de entrada no garantiza que hayas elegido el canal correcto.",
          "Esta carátula sirve como petición auxiliar de recibo ante una Administración. Para una comunicación laboral a una empresa privada, utiliza el modelo de esa comunicación y conserva su prueba de entrega; no invoques este derecho de registro administrativo como si obligara a la empresa."
        ]
      },
      {
        "id": "modelo",
        "title": "Petición auxiliar de recibo",
        "paragraphs": [
          "No hace falta rellenarla si el sistema ya ha emitido el justificante. No sustituyas por esta hoja la solicitud o el formulario obligatorio."
        ],
        "models": [
          {
            "id": "acuse",
            "title": "Petición de justificante de presentación",
            "body": "[Lugar], [fecha]\n\nA [órgano u oficina de asistencia en materia de registros]\nInteresado: [nombre e identificación]\nRepresentante, si procede: [datos y acreditación]\nAsunto y expediente: [indicar]\n\nPresento [identificación del escrito] y los siguientes documentos: [relación].\nSolicito el recibo correspondiente con fecha y hora de presentación, número de registro y constancia de los documentos aportados.\n\nFirma: [firma]"
          }
        ]
      },
      {
        "id": "incidencia",
        "title": "Si no encuentras el justificante",
        "paragraphs": [
          "Revisa el historial de presentaciones y la ayuda de la sede. Si hay una incidencia, conserva el mensaje y consulta al registro antes de dar por presentado el escrito. Perder tu copia no demuestra que la actuación nunca existiera: puede haber un asiento recuperable en el sistema."
        ]
      }
    ]
  },
  {
    "id": "modelo-subsanacion",
    "pack": "modelos",
    "path": "/modelo-subsanacion",
    "h1": "Modelo de subsanación: responder al requerimiento y comprobar el plazo",
    "title": "Modelo de subsanación: responder al requerimiento y comprobar el plazo",
    "description": "Plantilla para subsanar una solicitud administrativa: documentos, cómputo del plazo, canal de presentación y diferencia entre desistimiento, alegaciones y recurso.",
    "lead": "Lee el requerimiento y responde a cada defecto por el canal indicado. En el supuesto general del artículo 68.1 de la Ley 39/2015 se conceden diez días para subsanar la solicitud; no atenderlo puede llevar a que te tengan por desistido, previa resolución. Esa consecuencia no es una caducidad automática.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565",
      "label": "Consultar la Ley 39/2015 en BOE"
    },
    "disclaimer": "No somos Administración. Adapta el escrito al procedimiento y utiliza el formulario y canal oficiales cuando sean obligatorios. No introduzcas aquí datos personales ni firmas.",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a68",
        "label": "BOE: subsanación, ampliación y presentación electrónica"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a30",
        "label": "BOE: cómputo de plazos"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a76",
        "label": "BOE: alegaciones"
      },
      {
        "href": "https://sede.administracion.gob.es/servicios-electronicos/registro-electronico-general-age",
        "label": "Punto de Acceso General: límites del registro general"
      }
    ],
    "related": [
      {
        "href": "/autorizacion-representacion-tramite",
        "label": "Acreditar la representación"
      },
      {
        "href": "/acuse-de-recibo-modelo",
        "label": "Guardar el justificante de registro"
      },
      {
        "href": "/extranjeria/subsanar-regularizacion-correos",
        "label": "Subsanación específica de regularización"
      }
    ],
    "sections": [
      {
        "id": "plazo",
        "title": "Comprobar días, inicio y posibles ampliaciones",
        "paragraphs": [
          "En el régimen general, los plazos en días son hábiles salvo que una ley o el Derecho de la UE establezca otro cómputo. Se cuentan desde el día siguiente a la notificación o publicación, excluyendo sábados, domingos y festivos. Comprueba el calendario aplicable y cualquier regla especial; una fecha de correo de aviso no debe confundirse con la notificación.",
          "El artículo 68.2 permite ampliar hasta cinco días por dificultades especiales para aportar documentos, salvo procedimientos selectivos o de concurrencia competitiva. No es una ampliación automática por pedirla: atiende a lo que acuerde el órgano."
        ]
      },
      {
        "id": "canal",
        "title": "Usar el procedimiento y formulario correctos",
        "paragraphs": [
          "Si eres sujeto obligado a presentar electrónicamente y lo hiciste en papel, el artículo 68.4 prevé subsanarlo por vía electrónica y considera fecha de presentación la de esa subsanación. No des por conservada automáticamente la fecha del papel.",
          "Un modelo genérico no sustituye formularios obligatorios ni canales especiales. El REG-AGE puede rechazar escritos cuyo régimen exija otra forma. Para la regularización extraordinaria, consulta la guía específica y el requerimiento antes de utilizar Correos."
        ]
      },
      {
        "id": "modelo",
        "title": "Escrito de respuesta",
        "paragraphs": [
          "Identifica la notificación, contesta punto por punto y enumera los anexos reales. No declares estar dentro de plazo sin haberlo comprobado."
        ],
        "models": [
          {
            "id": "subsanacion",
            "title": "Respuesta a requerimiento de subsanación",
            "body": "[Lugar], [fecha]\n\nA [órgano y código, si consta]\nExpediente: [número]\nInteresado y representante, si procede: [datos y acreditación]\nNotificación del requerimiento: [fecha y referencia]\n\nEn respuesta al requerimiento indicado:\n1. Respecto de [defecto señalado], aporto [documento o explicación].\n2. Respecto de [otro defecto], aporto [documento o explicación].\n\nDocumentos adjuntos: [lista completa].\nSolicito incorporar lo aportado al expediente y tener por subsanados los defectos acreditados, continuando la tramitación cuando proceda.\nMedio o dirección de notificación: [según el procedimiento].\nFirma: [firma]"
          }
        ]
      },
      {
        "id": "diferencias",
        "title": "Subsanación, alegaciones y recurso",
        "paragraphs": [
          "Subsanar corrige un defecto de la solicitud; alegar expone hechos y razones en el momento procedimental que corresponda. Un recurso contra una resolución tiene su vía y plazo propios. Titular el escrito «subsanación» no amplía el plazo ni sustituye el recurso necesario.",
          "Guarda el recibo y los anexos enviados. La presentación no garantiza que el órgano considere subsanado el defecto. Si ya existe resolución de desistimiento, revisa su notificación y recursos en lugar de asumir que basta con este modelo."
        ]
      }
    ]
  },
  {
    "id": "modelo-030-cambio-domicilio",
    "pack": "modelos",
    "path": "/modelo-030-cambio-domicilio",
    "h1": "Modelo 030 oficial: preparar, presentar y guardar el justificante",
    "title": "Modelo 030 oficial: preparar, presentar y guardar el justificante",
    "description": "Accede al formulario 030 de la AEAT. Comprueba si te corresponde, prepara los datos, firma la presentación y conserva el CSV; el borrador no acredita el envío.",
    "lead": "Utiliza el formulario oficial de la AEAT para comunicar el cambio de domicilio mediante el modelo 030 cuando te corresponda. Esta página ayuda a preparar la presentación; el 030 no es el padrón ni una carta libre. Si estás en el censo empresarial, revisa la vía del modelo 036.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://sede.agenciatributaria.gob.es/Sede/procedimientoini/G321.shtml",
      "label": "Abrir gestiones y formulario oficial 030"
    },
    "related": [
      {
        "href": "/hacienda/modelo-030",
        "label": "Quién utiliza el 030 y sus plazos"
      },
      {
        "href": "/mudanza",
        "label": "Organizar los trámites de mudanza"
      },
      {
        "href": "/empadronarse/cambio-de-domicilio",
        "label": "Domicilio en el padrón"
      }
    ],
    "sources": [
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/censos/modelo-030-censo_____de-domicilio-variacion-personales_/instrucciones.html",
        "label": "AEAT: quién utiliza el modelo 030 y presentación en papel"
      },
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/tramites-censales-relacionados-datos-personales-domicilio/preguntas-frecuentes-modelo-030/domicilio-fiscal.html",
        "label": "AEAT: plazo y excepción de Renta"
      },
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/tramites-censales-relacionados-empresarios-profesionales-retenedores/preguntas-frecuentes-modelos-036-037/modificaciones-censales.html",
        "label": "AEAT: cambio de domicilio mediante modelo 036"
      },
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/ayuda/consultas-informaticas/presentacion-declaraciones-ayuda-tecnica/modelo-030/presentacion-electronica-modelo-030.html",
        "label": "AEAT: presentación electrónica y justificante"
      }
    ],
    "sections": [
      {
        "id": "antes",
        "title": "Antes de abrir el formulario",
        "paragraphs": [
          "Comprueba el plazo aplicable: tres meses para el cambio mediante 030, salvo la excepción de IRPF explicada en la guía de plazos. El modelo 036 tiene su propio plazo general de un mes."
        ],
        "lists": [
          [
            "Prepara tus datos identificativos y la dirección fiscal correcta. No copies una dirección antigua del padrón sin comprobar tu residencia actual.",
            "Revisa si también cambia el domicilio de notificaciones y qué documentación exige tu caso.",
            "Si actúas por otra persona, comprueba la representación. Para una presentación electrónica conjunta de cónyuges, la AEAT exige acreditar el apoderamiento correspondiente."
          ]
        ]
      },
      {
        "id": "electronica",
        "title": "Presentación electrónica",
        "paragraphs": [
          "En la sede, abre la opción de modificación o presentación del modelo 030. La ayuda oficial admite Cl@ve Móvil, certificado o DNI electrónico. Selecciona la causa y completa los apartados que habilite el formulario.",
          "Valida y corrige los errores. La vista previa genera un borrador que no sirve como declaración presentada. Completa la firma y envío hasta obtener la respuesta con CSV y copia de la declaración."
        ]
      },
      {
        "id": "papel",
        "title": "Si lo presentas en papel",
        "paragraphs": [
          "Descarga el modelo desde la página oficial y sigue sus instrucciones. La AEAT permite entregarlo en la oficina correspondiente o enviarlo por correo certificado. Consulta cita y documentación antes de acudir; esta lista de preparación no sustituye el impreso."
        ]
      },
      {
        "id": "despues",
        "title": "Después de presentar",
        "paragraphs": [
          "Conserva el justificante: se obtiene después del envío, no es un documento que debas tener antes de empezar. La actualización de datos requiere validación y puede no ser inmediata. Consulta el resultado por las opciones oficiales antes de dar por terminada la gestión."
        ],
        "models": [
          {
            "id": "recordatorio-030",
            "title": "Lista de comprobación personal — no es el formulario AEAT",
            "body": "Antes: comprobar modelo y plazo; preparar identificación, dirección y representación si procede.\nAl presentar: revisar datos, validar y completar firma y envío, o seguir la presentación en papel.\nDespués: guardar el justificante y comprobar la actualización.\nEsta lista no sustituye el formulario oficial ni acredita una presentación."
          }
        ]
      }
    ],
    "disclaimer": "No somos Administración. El formulario y la presentación corresponden a la Agencia Tributaria; no introduzcas aquí datos fiscales o de identidad."
  },

];
