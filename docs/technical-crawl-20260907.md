# Rastreo técnico y referencias de navegación

Rastreo público del 7 de septiembre de 2026 sobre el build `NmznDxlYoGMMxY2ROmHgg`, previo a la corrección descrita abajo.

228 páginas del sitemap: estados, títulos y descripciones presentes y únicos, canonical esperado, un H1, idioma y JSON-LD sintácticamente válidos, sin noindex ni redirecciones en sitemap. Evidencia: `audit-production-20260907-final-pass.json` (el nombre del archivo identifica esta pasada, no declara terminado el objetivo).

768 destinos enlazados adicionales: tres fallos de transporte iniciales (status 0), todos con respuesta 200 al repetir la consulta. Evidencia separada: `crawl-rechecked-targets.json`. No se borró el resultado original ni se clasificaron esos fallos como 404.

El nuevo verificador `audit_fragment_references.py` revisa todos los HTML de producción: 997 páginas, 16.418 enlaces con fragmento y 1.190 referencias de ID. Encontró un único ID duplicado: `contenido` en `/colegio/autorizacion-recogida-menores`, compartido por main y una sección. Resultado anterior: `fragment-references-before.json`.

Se renombra la sección a `datos-autorizacion`; el índice deriva su enlace del mismo dato. `contenido` sigue reservado para el enlace de salto al main. El control de IDs duplicados, referencias ARIA/label y anclas entre páginas se incorpora al trabajo de compilación, antes de empaquetar.

Pasan 14 pruebas afectadas. Build `fi6DoeMInkIqNKbcCxjGe` publicado en `/srv/tenants/slot2/releases/20260907T154659Z`. El nuevo control pasa: 997 páginas, 16.418 fragmentos y 1.190 referencias, sin incidencias. Prepublicación: 228 páginas HTTP y 12 recursos correctos. Comprobación pública de la guía: HTTP 200, un único `contenido`, un único `datos-autorizacion` y enlace del índice correcto (`fragment-public-smoke.json`).

Límites: este rastreo no valida semánticamente todas las propiedades de schema.org ni la veracidad del texto editorial; la comprobación estática de referencias no demuestra accesibilidad completa. El catálogo y las comprobaciones visuales pendientes conservan su alcance anterior.
