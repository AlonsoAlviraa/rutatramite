# Documentación de menores

Revisión del 7 de septiembre de 2026. Guías afectadas: `/dni/primera-expedicion-menor`, `/pasaporte/bebe`, `/dni/checklist` y `/pasaporte/cita-previa`.

La primera expedición distingue DNI y pasaporte; ya no presenta el libro de familia como sustituto general del certificado de nacimiento. La guía de bebé contempla el pasaporte sin DNI, la certificación DICIREG y la acreditación separada del parentesco. Se explica quién debe consentir, la diferencia respecto a custodia y la posibilidad de formalizarlo por separado. Se retiran promesas sobre reservas conjuntas y consejos fotográficos sin fuente. Se corrige el límite de treinta años en la validez.

El checklist y la guía de cita remiten a los requisitos específicos y recogen la excepción de fotografía para pasaporte cuando se obtiene o renueva el DNI el mismo día. La guía de DNI explica la consulta electrónica prevista por el RD 255/2025 junto con la documentación práctica que publica Interior, sin garantizar que todas las unidades puedan obtenerla.

Fuentes leídas:

- [Interior: documentación DNI](https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/documentacion-necesaria-para-su-tramitacion/index.html).
- [BOE: RD 255/2025](https://www.boe.es/eli/es/rd/2025/04/01/255), artículo 6.
- [Interior: expedición de pasaporte](https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/procedimiento-de-expedicion/).
- [BOE: RD 896/2003 consolidado](https://www.boe.es/eli/es/rd/2003/07/11/896/con), artículos 4 y 5.

Pasan 28 pruebas afectadas. Compilación Linux completada en `/srv/tenants/slot2/builds/20260907T145146Z`. Publicado el build `grOSGJ6mhGyeckkxfln73`, release `/srv/tenants/slot2/releases/20260907T145551Z`; anterior conservado `20260907T144807Z`. Paquete de 268.410.880 bytes, SHA-256 `2a449cd106ce706dfa6994257545ecc2281e16901179910671009de45871c5c3`.

Prepublicación: 997 HTML, 228 páginas del sitemap y 12 recursos sin incidencias. Las cuatro páginas públicas pasan `scripts/check_minor_documents.py`: evidencia en `minor-documents-public-smoke.json`. En Chrome se inspeccionó la parte superior de primera expedición en escritorio: título en dos líneas, fecha, introducción y CTA sin solapamientos visibles; el índice contiene secciones distintas de DNI y pasaporte. No es una revisión de toda la página ni de móvil.

Las dos guías específicas de menores reciben fecha de revisión. Las otras dos conservan su alcance de revisión parcial. No se ha completado el resto de guías de DNI ni la revisión visual integral del sitio.
