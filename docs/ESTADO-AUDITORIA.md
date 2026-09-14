# RutaTrámite: estado vigente

Ampliación de los cuatro puntos publicada y verificada el 14 de septiembre de 2026. El objetivo de 1.000 impresiones y 50 clics diarios no está acreditado.

## Publicación

- Build `KV7Uq4eM6hwFir1Irn3wO`; release `/srv/tenants/slot2/releases/20260914T192535Z`.
- Versión anterior conservada: `/srv/tenants/slot2/releases/20260914T181705Z`.
- SHA256 del paquete: `ce3912bac8e6d239482419f27eb7897c597e523351da12e4082e8af11c20737f`.
- 258 URLs indexables, 1.009 páginas navegables, 1.010 HTML y 33 PDF aprobados.
- [Activación](followup-deployed.json), [comprobación pública](followup-public-verification.json), [resultados](followup-final-verification.json).

## Resultado de los cuatro puntos

Revisados de nuevo los diez municipios pendientes: siete reúnen ahora evidencia suficiente. La comparación municipal tiene 18 verificados y tres pendientes: Gijón, Las Palmas de Gran Canaria y Vitoria-Gasteiz. Las limitaciones concretas y sus fuentes permanecen visibles. A Coruña mantiene el canal electrónico desconocido.

Los datos de ayudas pasan de 8 a 22 registros, con referencias seleccionadas de las 17 comunidades y la guía `/alquiler/ayudas-por-comunidad`. No es un catálogo exhaustivo ni son 17 solicitudes abiertas. Se diferencian convocatorias, justificaciones y programas propios. JSON/CSV 1.2 conservan fechas sin hora y calculan los cierres conocidos.

La medición diaria y semanal está instalada, actualizada y ejecutada. Se conservan los días definitivos, una referencia del 7 al 13 de septiembre y ventanas de 7, 14 y 28 días desde el 15 de septiembre. Las revisiones del 21 y 28 de septiembre y del 12 de octubre esperan sus datos definitivos. [Medición](four-points-ops.json).

Comprobadas las cinco conversaciones enviadas: ninguna respuesta observada. Las búsquedas en los cinco dominios no encontraron menciones indexadas; no se confirma ningún backlink nuevo. No se enviaron mensajes adicionales. [Recibo](four-points-outreach-readback.json).

Copilot completado: diez preguntas originales enviadas una vez cada una en conversaciones independientes; diez respuestas completas observadas, 0 con citas a RutaTrámite y 0 con mención de marca. La verificación humana se completó con autorización del usuario. El control del navegador está recuperado. Modo Smart, región efectiva no verificada. [Resultados y límites](COPILOT-RESULTADOS-20260914.md).

## Validación

Pasaron 107 pruebas de aplicación, seis de crecimiento y dos de seguimiento; compilación y tipos correctos. El paquete supera 5.258 controles de descubrimiento (418 no aplicables), y los auditores de HTML, accesibilidad estática y referencias no detectan incidencias.

Pasaron 1257 comprobaciones E2E de la previsualización: todas las rutas HTTP/PDF/datos, 40 vistas móviles y de escritorio de páginas afectadas y 102 recorridos funcionales en Chromium, Firefox y WebKit. Tras activar pasaron otras 1.115 comprobaciones HTTP/PDF/datos en producción con un solo trabajador y sin reintentos automáticos. Las dos pasadas paralelas previas terminaron cada una con 1.114 aprobadas y un corte ECONNRESET, en Camargo y en la portada. La causa sigue sin establecerse; la pasada secuencial no acredita que la incidencia concurrente esté resuelta. La repetición visual de todo el inventario se interrumpió por memoria y se conserva sin contabilizarla como aprobada. [Alcance y correcciones](SEGUIMIENTO-VALIDACION-20260914.md).

El sitemap público está actualizado. El recibo distingue los permisos de envío a Google y su lectura; la propiedad ya tenía el sitemap registrado. IndexNow respondió con HTTP 200. La recepción no garantiza indexación ni tráfico. [Distribución](followup-search-distribution.json).

Se mantiene el contador agregado privado, sin identificadores ni datos de consultas, con retención de 180 días. Las rutas de métricas privadas y el PDF excluido devuelven 404.

[Seguimiento de los cuatro puntos](SEGUIMIENTO-CUATRO-PUNTOS-20260914.md). [Publicación anterior](plan-final-verification.json).
