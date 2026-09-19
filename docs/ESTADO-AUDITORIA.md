# RutaTrámite: estado vigente

Corrección del aviso de licencia de Google publicada y verificada el 15 de septiembre de 2026, sobre la ampliación de los cuatro puntos del día 14. El objetivo de 1.000 impresiones y 50 clics diarios no está acreditado.

Google ha iniciado la validación de los dos conjuntos de datos y ha aceptado el sitemap actualizado: 258 URLs, cero errores o avisos. La inspección individual de las 258 URLs confirma 13 indexadas, 68 descubiertas sin indexar, seis rastreadas sin indexar y 171 todavía no reconocidas por la inspección. Las validaciones siguen pendientes. [Correos, actuaciones y límites](GOOGLE-AVISOS-20260915.md).

## Publicación

- Build `mc2BEFYMW13Izl_iG8j50`; release `/srv/tenants/slot2/releases/20260915T171408Z`.
- Versión anterior conservada: `/srv/tenants/slot2/releases/20260914T192535Z`.
- SHA256 del paquete: `eae3660d0c7ddb419d4efde1785ba4e2e7894b5e1851612b5590bf74c874079c`.
- 258 URLs indexables, 1.009 páginas navegables, 1.010 HTML y 33 PDF aprobados.
- [Publicación actual comprobada](google-license-published-20260915.json), [auditoría pública actual](google-postpublish-audit-20260915.json). [Activación anterior](followup-deployed.json), [resultados anteriores](followup-final-verification.json).

## Resultado de los cuatro puntos

Revisados de nuevo los diez municipios pendientes: siete reúnen ahora evidencia suficiente. La comparación municipal tiene 18 verificados y tres pendientes: Gijón, Las Palmas de Gran Canaria y Vitoria-Gasteiz. Las limitaciones concretas y sus fuentes permanecen visibles. A Coruña mantiene el canal electrónico desconocido.

Los datos de ayudas pasan de 8 a 22 registros, con referencias seleccionadas de las 17 comunidades y la guía `/alquiler/ayudas-por-comunidad`. No es un catálogo exhaustivo ni son 17 solicitudes abiertas. Se diferencian convocatorias, justificaciones y programas propios. JSON/CSV 1.2 conservan fechas sin hora y calculan los cierres conocidos.

La medición diaria y semanal está instalada, actualizada y ejecutada. Se conservan los días definitivos, una referencia del 7 al 13 de septiembre y ventanas de 7, 14 y 28 días desde el 15 de septiembre. Las revisiones del 21 y 28 de septiembre y del 12 de octubre esperan sus datos definitivos. [Medición](four-points-ops.json).

Comprobadas las cinco conversaciones enviadas: ninguna respuesta observada. Las búsquedas en los cinco dominios no encontraron menciones indexadas; no se confirma ningún backlink nuevo. No se enviaron mensajes adicionales. [Recibo](four-points-outreach-readback.json).

Copilot completado: diez preguntas originales enviadas una vez cada una en conversaciones independientes; diez respuestas completas observadas, 0 con citas a RutaTrámite y 0 con mención de marca. La verificación humana se completó con autorización del usuario. El control del navegador está recuperado. Modo Smart, región efectiva no verificada. [Resultados y límites](COPILOT-RESULTADOS-20260914.md).

## Validación

El 15 de septiembre pasaron 110 pruebas de aplicación, seis de crecimiento y dos de seguimiento; compilación y tipos correctos. El paquete supera 5.258 controles de descubrimiento (418 no aplicables), y los auditores de HTML, accesibilidad estática y referencias no detectan incidencias. La auditoría pública posterior comprueba las 258 páginas del sitemap y 788 destinos enlazados adicionales sin incidencias. La matriz de tres navegadores descrita a continuación corresponde al 14 de septiembre y no se contabiliza como una ejecución nueva.

Pasaron 1257 comprobaciones E2E de la previsualización: todas las rutas HTTP/PDF/datos, 40 vistas móviles y de escritorio de páginas afectadas y 102 recorridos funcionales en Chromium, Firefox y WebKit. Tras activar pasaron otras 1.115 comprobaciones HTTP/PDF/datos en producción con un solo trabajador y sin reintentos automáticos. Las dos pasadas paralelas previas terminaron cada una con 1.114 aprobadas y un corte ECONNRESET, en Camargo y en la portada. La causa sigue sin establecerse; la pasada secuencial no acredita que la incidencia concurrente esté resuelta. La repetición visual de todo el inventario se interrumpió por memoria y se conserva sin contabilizarla como aprobada. [Alcance y correcciones](SEGUIMIENTO-VALIDACION-20260914.md).

El sitemap público está actualizado. El recibo distingue los permisos de envío a Google y su lectura; la propiedad ya tenía el sitemap registrado. IndexNow respondió con HTTP 200. La recepción no garantiza indexación ni tráfico. [Distribución](followup-search-distribution.json).

Se mantiene el contador agregado privado, sin identificadores ni datos de consultas, con retención de 180 días. Las rutas de métricas privadas y el PDF excluido devuelven 404.

[Seguimiento de los cuatro puntos](SEGUIMIENTO-CUATRO-PUNTOS-20260914.md). [Publicación anterior](plan-final-verification.json).
