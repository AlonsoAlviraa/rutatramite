# Corrección de llms.txt

7 de septiembre de 2026. PageSpeed detectó que el archivo anterior no contenía enlaces reconocibles: las URLs estaban en texto plano. La [propuesta de formato](https://llmstxt.org/) describe listas de enlaces Markdown bajo encabezados H2.

El archivo conserva el H1 y un resumen breve, y organiza 29 destinos reales en directorio, situaciones de padrón y criterios editoriales. Su descripción cubre las secciones actuales del sitio. Se retiran ejemplos de direcciones incompletas de las listas de enlaces; los patrones quedan explicados como texto.

Verificación local: tres pruebas de búsqueda/GEO correctas y 29 destinos con HTTP 200, sin duplicados. Evidencia: `llms-link-check.json`. El archivo orienta a los agentes hacia contenido y fuentes; no establece permisos de rastreo ni garantiza posicionamiento o citas en respuestas generadas.

Publicado el build `bhL1Q0fozAG9RCH2m1t7J`, release `20260907T135505Z`. Comprobación privada: 997 HTML, 228 páginas del sitemap y 11 recursos sin incidencias. El archivo público responde 200 y coincide byte a byte con el local (`llms-public-smoke.json`).

PageSpeed repetido a las 15:55 CEST confirma **3/3 en navegación agéntica**, frente al 2/3 anterior. [Informe](https://pagespeed.web.dev/analysis/https-rutatramite-com-empadronarse-comunidad-de-madrid-madrid-madrid/so3juasno0?form_factor=mobile). Lectura completa: `pagespeed-llms-fixed-20260907.txt`.

Esta repetición sobre Madrid muestra rendimiento móvil 100, LCP 1,7 s, TBT 0 ms y CLS 0. Son resultados variables de laboratorio; no se atribuye esa variación de rendimiento a la modificación de un archivo que la página no carga durante su renderizado.
