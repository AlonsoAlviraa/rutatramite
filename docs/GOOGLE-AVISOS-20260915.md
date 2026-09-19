# Correos, avisos e indexación de Google — 15 de septiembre de 2026

La falta de `license` de los dos conjuntos de datos de RutaTrámite está corregida y publicada. Google aceptó la validación el 15 de septiembre. También aceptó el sitemap actualizado con 258 URLs y la solicitud individual de actualización de `/recursos`. Estas recepciones no acreditan que la validación haya terminado ni que Google indexe todas las páginas.

## Avisos revisados y actuación

- Correo del 15 de septiembre: falta `license` en `/recursos` y `/recursos/padron-municipal`. Google lo clasifica como no crítico y los dos elementos siguen siendo válidos. Se añadió una licencia personalizada versionada, sus condiciones visibles y metadatos coherentes en los dos JSON descargables. La licencia abarca la aportación editorial de RutaTrámite; los PDF y contenidos de terceros conservan sus condiciones.
- Search Console muestra **«Resultado de la validación: Iniciada»**, con fecha 15/9/26, para los dos elementos. Se verificó el HTML público antes de solicitarla.
- El correo del 12 de septiembre sobre 968 URLs descubiertas sin indexar corresponde a una validación ya iniciada. Sus detalles muestran 968 pendientes y cero errores; se conserva esa revisión en curso.
- RutaTrámite: **ninguna acción manual ni problema de seguridad detectado**. El resumen muestra 11 elementos válidos de rutas de exploración y cero inválidos; HTTPS muestra dos URLs HTTPS y cero no HTTPS. Core Web Vitals carece de muestra; no equivale a aprobar sus métricas.
- VisionSetil: los dos Soft 404 históricos se comprobaron en vivo. `exidia-glandulosa` sirve una ficha real con HTTP 200; `mapa?lang=eu` termina en `/mapa`, con contenido real, canonical propio e indexación permitida. Se inició su validación en Google el 15/9/26. [Evidencia HTTP](google-soft404-live-20260915.json).
- Las categorías de redirección, `noindex` y canonical alternativo de VisionSetil no se han tratado indiscriminadamente como fallos. No se han retirado esas directivas ni cambiado URLs sin comprobar su propósito.

Se revisaron ocho correos coincidentes de Google, incluidos avisos de alta, duplicados y rendimiento. No se enviaron correos ni se modificaron permisos de la cuenta.

## Indexación comprobada

Se inspeccionaron las 258 URLs actuales del sitemap mediante la API de Google. Trece solicitudes devolvieron inicialmente un error temporal; se repitieron exclusivamente esas trece y todas respondieron correctamente. Los resultados originales se conservan por separado.

| Resultado de Google | URLs |
| --- | ---: |
| Enviada e indexada | 13 |
| Descubierta: actualmente sin indexar | 68 |
| Rastreada: actualmente sin indexar | 6 |
| Google no reconoce esta URL | 171 |
| Errores de API después de la comprobación dirigida | 0 |

El informe general de páginas de RutaTrámite aún tiene fecha 4/9/26 y muestra dos indexadas y 968 no indexadas. No se suma ni compara directamente con este inventario actual de 258 URLs. «Google no reconoce esta URL» describe el resultado de la inspección; la posterior recepción del sitemap no acredita un rastreo ni una indexación inmediata.

Las seis rastreadas sin indexar son `/fuentes`, `/empadronarse/con-contrato`, `/empadronarse/sin-contrato`, `/empadronarse/cita-previa-madrid`, `/extranjeria/autorizacion-regreso` y `/bebe/calendario-vacunal-castilla-y-leon`. Las tres de empadronamiento conservan un último rastreo del 12 de septiembre, anterior a su revisión editorial publicada el 14. Todas indican `robotsTxtState: ALLOWED`. No se atribuye una causa única a la decisión de Google.

El informe general de VisionSetil muestra 1.101 indexadas y 203 no indexadas, también con fecha 4/9/26. Las tres inspecciones adicionales —portada, Amanita phalloides y Amanita muscaria— confirman indexación y canonical propio para esas URLs; no sustituyen una auditoría de todas sus páginas.

[Respuestas originales](google-review-20260915T165638Z.json) · [Reintentos y recuento definitivo](google-review-retries-20260915.json).

## Publicación y comprobaciones

- Build `mc2BEFYMW13Izl_iG8j50`, release `/srv/tenants/slot2/releases/20260915T171408Z`.
- Rollback conservado: `/srv/tenants/slot2/releases/20260914T192535Z`.
- Paquete SHA256 `eae3660d0c7ddb419d4efde1785ba4e2e7894b5e1851612b5590bf74c874079c`.
- Fuente aislada: 1.100 archivos, huella `24d9fa4836524fd59600e3b275701d3b1bba9a3afcaf5b02f6406bad2e5f7335`.
- 110 pruebas de aplicación aprobadas, incluidas tres de la licencia; seis de crecimiento y dos de seguimiento aprobadas. Compilación y tipos correctos.
- 1.010 HTML, 258 URLs indexables y 5.258 controles de descubrimiento aprobados; 418 no aplicables. Auditores de HTML, referencias y accesibilidad estática sin incidencias.
- Previsualización: las 258 páginas, 33 PDF y sus huellas/cabeceras, 13 assets, datos JSON/CSV y las condiciones de los dos conjuntos comprobados.
- Auditoría pública posterior: 258 páginas del sitemap y 788 destinos enlazados adicionales responden correctamente. Cero incidencias de metadatos, fragmentos locales, duplicados de títulos/descripciones o enlaces rotos en este alcance.
- La comparación literal de la primera auditoría marcó `/` porque su canonical omite la barra final. Ambas formas representan la raíz del mismo origen: aviso descartado con esa justificación, conservando el resultado original.

La primera previsualización falló porque el comprobador de la copia de CI aún esperaba ocho ayudas y esquema 1.1. La publicación anterior ya contenía 22 y esquema 1.2. Se usó el comprobador vigente, que además exige las 17 referencias autonómicas y 18 municipios verificados. La segunda previsualización completa aprobó; ambos resultados se conservan. No se rebajaron las comprobaciones.

No se ha repetido en esta publicación toda la matriz de recorridos funcionales en tres navegadores. La evidencia E2E histórica del 14 de septiembre permanece separada. Se preservaron los cambios ajenos y los PDF pendientes de revisión editorial.

[Publicación comprobada](google-license-published-20260915.json) · [Auditoría pública](google-postpublish-audit-20260915.json) · [Previsualización aprobada](google-release-20260915-preview-passed.log) · [Primer fallo](google-release-20260915-preview-failed.log) · [Pruebas](google-release-20260915-tests.log) · [Compilación](google-release-20260915-build.log).

## Envíos y seguimiento

El intento de envío por API devolvió 403 porque la credencial solo tiene alcance de lectura. Se completó el envío desde la sesión autorizada de Search Console: **«Se ha enviado el sitemap correctamente»**. La lectura posterior por API confirma envío el 15/9/26 a las 17:18:25 UTC, descarga un segundo después, 258 URLs y cero errores o avisos. El antiguo campo `indexed: 0` del recurso sitemap no se usa para contar páginas indexadas.

Google mostró **«Se ha solicitado la indexación»** para `/recursos`. No se repitió ese envío. La solicitud individual de `/recursos/padron-municipal` no quedó confirmada antes de perderse el control del navegador; la validación de licencia iniciada sí incluye ambos conjuntos. El diagnóstico detectó el componente de conexión de Chrome sin su registro de Windows. La [skill de Chrome](C:/Users/Mariano/.codex/plugins/cache/openai-bundled/chrome/26.825.31414/skills/control-chrome/SKILL.md), mediante su documentación `chrome-troubleshooting`, prohíbe repararlo directamente: «Do not install or repair the native host yourself». Para recuperar ese control, indica reinstalar Browser desde la interfaz de ChatGPT. No afecta a la web publicada ni a los envíos ya aceptados.

IndexNow aceptó con HTTP 200 las dos URLs modificadas. [Recibo de envío y lectura](google-sitemap-submission-20260915.json).

El seguimiento diario se ejecutó correctamente el 15/9/26 a las 06:30 UTC. Próxima ejecución observada: 16/9/26 a las 06:32:55 UTC. Seguimiento semanal programado para el 21/9/26 a las 07:00 UTC. Estas tareas miden resultados; no cierran automáticamente las validaciones de Search Console.

En la ventana de 90 días consultada hasta el 12/9/26, con datos finales de Google, RutaTrámite suma 14 impresiones y cero clics; VisionSetil, 5.173 impresiones y 49 clics. No hay evidencia de haber alcanzado los objetivos de crecimiento ni de haber eliminado todas las exclusiones de Google. Las validaciones permanecen pendientes de su procesamiento.
