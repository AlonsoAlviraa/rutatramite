# Revisión de ejecución — 7 septiembre 2026

Build público: `PmeDpPKMZjEFzXe57IVKg`.

## Transferencia HTTP

Informe `audit-transfer.json`, medido con `scripts/audit_transfer.py`. Una muestra desde este equipo: HTML 56442 bytes comprimidos (512450 sin comprimir); HTML y once recursos referenciados suman 245023 bytes. Todos responden 200. JS/CSS/fuente versionados declaran caché pública inmutable de un año; HTML usa s-maxage de un año.

La suma incluye polyfills condicionales y no incluye solicitudes posteriores de un navegador. Los tiempos individuales incluyen DNS/TLS y la red local. No equivalen a carga total, Lighthouse, LCP, INP ni CLS. Queda pendiente esa medición ejecutada.

La solicitud a PageSpeed Insights API para móvil (rendimiento, accesibilidad y SEO) respondió HTTP 429 por cuota disponible cero. No devolvió puntuaciones ni resultados Lighthouse. Respuesta conservada en `pagespeed-request-status.json`; no presentar este intento como una medición superada.

## Categoría Becas en móvil

Chrome confirma h1, buscador, lista de guías y contenido principal con altura 6216 CSS px. A viewport 390, scrollWidth 375: no hay desbordamiento horizontal. Dos intentos de captura fallaron por tiempo de espera, aunque la lectura DOM siguió disponible. Esto acredita la geometría medida, no la revisión visual completa. Se restauró el tamaño de ventana.

Pendiente editorial detectado: la introducción de PackIndex para Becas sigue anunciando genéricamente convocatorias autonómicas «con ventana este otoño», aunque varias guías describen convocatorias históricas. Debe neutralizarse esa afirmación en la próxima agrupación de cambios.
