# Auditoría SEO, GEO y rediseño — 7 de septiembre de 2026

## Estado vigente de producción

La release activa es `tSaLmQxc_8_5ek2TQNGHB` en `/srv/tenants/slot2/releases/20260907T211050Z` (anterior conservada: `/srv/tenants/slot2/releases/20260907T202312Z`). La auditoría privada cubre 997 HTML, 228 indexables, 16.418 enlaces con fragmento y 1.190 IDs sin incidencias. El crawl público final confirma 228 URLs del sitemap y 768 destinos enlazados fuera de sitemap, todos HTTP 200, sin duplicados ni targets rotos. La auditoría de enlaces externos encuentra 57 destinos alcanzables y 25 no verificables por bloqueos o certificados, sin 404/410.

La revisión editorial inventaría 268 menciones absolutas en 130 páginas, 65 de urgencia en 31, 82 de espera o porcentajes en 40 y 238 monetarias en 51. Son señales para revisión humana: pueden ser datos oficiales o advertencias de contraste. Las correcciones finales matizan disponibilidad, horarios, tasas y canales locales. La nueva comprobación de codificación no detecta U+00C3, U+00C2, U+00E2 ni U+FFFD.

El frontend sigue el sistema editorial derivado del proyecto Stitch `9918002176358718983`: verde cívico, fondo claro, jerarquía tipográfica, filas de directorio y radios discretos. El escaneo anti-slop del código activo no detecta gradientes, glassmorphism, `backdrop-filter`, Inter, sombras XL/2XL ni transformaciones hover. Chrome verifica portada y guía a 1280 x 1200 y 390 x 844 sin overflow; el menú abre y cierra con Escape.

Evidencia actual: `audit-production-20260907-editorial-post-final2.json`, `editorial-risk-scan-final.json`, `final-public-smoke.json`, `audit-accessibility-build-final.json`, `audit-accessibility-public-final.json`, `audit-public-encoding-final.json`, `audit-external-links-final.json`, `browser-visual-final.json` y `ESTADO-AUDITORIA.md`.

## Estado

Las notas historicas de este informe se conservan para trazabilidad. La revision descrita aqui ya esta desplegada; consulta el estado vigente anterior para no mezclar builds.

## Evidencia de producción

`audit-production-before.json` contiene el rastreo HTTP de las 969 URLs anunciadas por el sitemap de producción, sus metadatos y enlaces internos. Hay 35 respuestas 404 y una petición fallida (status 0, requiere repetir). La discrepancia de canonical en `/` es un falso positivo por la barra final; el auditor ya normaliza este caso.

Producción anuncia como indexables fichas municipales pendientes (comprobado en Álamo). El código local tiene 769 municipios y solo Madrid supera el filtro editorial de señales locales. No se ha relajado este filtro para aumentar artificialmente las URLs indexables. El sitemap local regenerado contiene 230 URLs, incluyendo dos escenarios que faltaban: volante online y cita previa Madrid.

## Correcciones realizadas en código

- Robots: un grupo universal conserva las exclusiones `/api/` y `/borrador/` para buscadores y rastreadores de IA. Las reglas específicas anteriores las anulaban.
- FAQ: preguntas y respuestas comparten una fuente entre el contenido visible y JSON-LD. Se añade Article a las guías. Se elimina HowTo de las guías genéricas: sus secciones no constituyen necesariamente una secuencia de pasos. Las fichas y el pilar conservan sus pasos explícitos.
- Sitemap: no se inventa una fecha de modificación al ejecutar el generador. Las fichas utilizan su `last_verified`; las URLs sin fecha documentada omiten el dato opcional. Unificación del origen con `NEXT_PUBLIC_SITE_URL`.
- Buscador municipal: editar la consulta invalida la selección anterior; IDs accesibles únicos, estado sin coincidencias y alternativa a la guía nacional.
- Portada: búsqueda conjunta de guías y municipios, categorías antes del asistente y textos comprensibles sin jerga como PII.
- Asistente: seis pasos, avance condicionado a la respuesta, retroceso y revisión; la copia de documentos solo anuncia éxito si termina correctamente.
- Navegación móvil: cierre al navegar y con Escape; índices de contenido para guías y fichas; búsqueda en categorías y territorios.
- Diseño compartido: cabecera, pie, tipografías, tarjetas, tablas, CTA, páginas editoriales y adaptación móvil.
- Pruebas añadidas para cobertura de todas las guías en sitemap, paridad FAQ visible/JSON-LD y destinos de enlaces relacionados. Corregidos errores de tipado preexistentes en pruebas editoriales.

## Google Stitch

Proyecto real creado para esta tarea: https://stitch.withgoogle.com/projects/9918002176358718983

Stitch generó el sistema «RutaTrámite Civic Editorial System»: primary #2D6A4F, secondary #1B4332, tertiary #C2D66D, neutral #FAF7F2, titulares Newsreader y texto Inter. Se solicitaron portada desktop y móvil, guía, ficha municipal, asistente móvil e índice de categoría. Se inspeccionaron las primeras propuestas en el lienzo y sus tokens. La finalización de todas las pantallas y su exportación aún deben verificarse: el navegador perdió la conexión durante la revisión del lienzo.

La implementacion toma del proyecto la paleta verde civica (#2D6A4F / #1B4332), el fondo claro, la jerarquia editorial, la composicion asimetrica y los radios discretos. Public Sans sustituye a las fuentes genericas de la maqueta para cumplir el checklist anti-slop. No se copian afirmaciones de ejemplo no verificadas del diseno.

## Validación hasta ahora

Actualización de la continuación: el build `70491` terminó con exit code 0. Se lanzó `scripts/audit_build.py` sobre sus 1005 páginas generadas; proceso de auditoría `97202` aún activo al último sondeo. El servidor de revisión `87464` sirve este build en `http://127.0.0.1:3100`. Este build precede a los cambios editoriales que se enumeran a continuación y deberá regenerarse después de cerrar esa revisión.

### Revisión editorial añadida

- Corregido el falso requisito general de nota 6,5 para la cuantía variable de la beca. Fuente: https://www.becaseducacion.gob.es/becas-y-ayudas/universidad-grado-master/que-necesitas.html (consultada 7/9/2026).
- Corregida la definición de Mercurio y añadidos accesos separados para presentar documentos y consultar el estado del expediente. Fuentes: https://sede.administracionespublicas.gob.es/pagina/index/directorio/mercurio2 y https://sede.administracionespublicas.gob.es/pagina/index/directorio/expedientes_extranjeria.
- Verificada en Correos la existencia del periodo de subsanación hasta el 30/9/2026; la guía ya enlaza directamente el procedimiento, no la portada genérica.
- Todas las guías muestran una sección de fuentes. Las revisadas disponen de fecha individual; las demás muestran «Edición del contenido», evitando presentar la fecha global como una verificación reciente.
- Retiradas estimaciones de espera de citas no respaldadas por evidencia conservada. Metodología reescrita para describir de forma comprensible la cobertura y las limitaciones reales.
- 23/23 pruebas dirigidas de catálogo, nichos y SEO pasan tras estos cambios. La revisión editorial del resto de guías sigue pendiente.
- Los intentos de leer el lienzo existente de Stitch mediante DOM y captura volvieron a agotar el tiempo de respuesta. No se ha reiniciado la generación ni creado otro proyecto.

- Primer build: 1005 páginas generadas, éxito, anterior a los últimos cambios de frontend.
- Pruebas del catálogo: 3/3 correctas tras distinguir enlaces externos de rutas locales.
- Suite completa posterior: **62/62 pruebas**, 12 archivos correctos (56,40 s). TypeScript (`npx tsc --noEmit`) también termina correctamente.
- Portada observada en navegador; búsqueda «dni» devuelve guías reales. Menú móvil abierto y navegación al asistente comprobadas. No constituye todavía una revisión completa de accesibilidad.
- Auditoría npm inicial: dos avisos relacionados con PostCSS 8.4.31 transitivo de Next. Override instalado y lockfile corregido para resolver PostCSS 8.5.28; **npm informa de 0 vulnerabilidades**. Informe posterior en `audit-dependencies-after.json`.

## Pendiente para cerrar el objetivo

1. Revisar el build definitivo iniciado tras instalar PostCSS corregido (`docs/build-final.log`). No reutilizar builds anteriores a los cambios. La suite, TypeScript y auditoría npm ya pasaron; volver a ejecutarlos si se modifica código que lo requiera.
2. Completar flujo de seis pasos con teclado y móvil, selección/cambio de municipio, copia y navegación atrás. Revisar todas las familias de página a 390, 768 y desktop; corregir cualquier problema de foco, contraste o desbordamiento.
3. Recuperar el proyecto Stitch existente, verificar seis pantallas, conservar/exportar evidencia; no generar un segundo proyecto por un timeout de observación.
4. Auditar HTML de todas las páginas del build definitivo: canonical, indexación, títulos, descripciones, enlaces y fragmentos. Repetir la URL que falló en producción y contrastar los 404 con el build.
5. Ampliar revisión editorial/GEO: verificar fuentes y afirmaciones variables de tasas, becas y extranjería; no tratar la fecha global actual como prueba de revisión individual. Revisar el contenido repetido de fichas y los hubs antes de declarar resueltos todos los errores SEO.
6. Medir rendimiento y accesibilidad sobre build de producción. No hay todavía resultados Lighthouse/Core Web Vitals.
7. Preparar release con aplicación, datos y sitemap del mismo build; verificar el acceso al VPS y desplegar solo el tenant de RutaTrámite según `VPS_DESPLIEGUE.md`, sin tocar VisionSetil. Repetir rastreo en producción y comprobar redirects, robots, 404 y sitemap. No se ha realizado esta publicación.

## Referencias de criterios

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://github.com/postcss/postcss/releases
- https://github.com/advisories/GHSA-fxqj-rqcc-2cmp

La presencia de JSON-LD o llms.txt no garantiza indexación ni citas en respuestas de IA. La auditoría prioriza contenido visible verificable, enlaces rastreables y correspondencia entre página, metadatos y sitemap.

## Ajuste anti-slop solicitado (7 septiembre)

- Aplicadas avoid-ai-design y no-slop-ui; revisión complementaria de Taste e Impeccable. Fuentes, decisiones y límites en ../DESIGN.md.
- Public Sans sustituye Inter y Newsreader. Portada como directorio de filas, sin tarjetas de altura fija. CSS consolidado, sin gradientes, desenfoques ni movimiento hover. Eliminados flechas, kickers en plantillas principales y notas internas Q4 del índice de mudanza.
- Contraste de placeholders reforzado y selector municipal corregido al recuperar foco y salir del control. Navegación con aria-current.
- 62/62 pruebas tras cambio estructural; 20/20 pruebas dirigidas tras últimos cambios; TypeScript final correcto.
- Vista local actual: http://127.0.0.1:3101/ (.next-review, sesión 42843). La vista 3100 sirve el build anterior.
- Build nuevo en .next-antislop, sesión 46113, registro docs/build-antislop.log. Pendiente confirmar resultado. No modificar .next mientras siga el audit_build.py de sesión 97202.
- Auditoría HTML anterior sigue en sesión 97202 sin informe al último control. No presentarla como terminada.
- Navegador inestable: capturas de portada escritorio/móvil y búsqueda/menú correctas; flujo probado hasta pregunta NIE/TIE. Después expiró la conexión. El intento de restaurar viewport falló; verificarlo al reconectar. No declarar validado el flujo completo.
- No se ha desplegado esta variante ni cerrado el objetivo SEO/GEO completo.

## Verificación de release (7 septiembre, continuación)

- El build de .next-antislop terminó correctamente. Sirve en http://127.0.0.1:3102/ mediante sesión 94931.
- El rastreo anterior de .next terminó con éxito: docs/audit-build.json contiene 997 HTML, 228 indexables y 228 URLs de sitemap, sin incidencias en los controles implementados. Es evidencia de aquel build, no del código posterior.
- El rastreo de .next-antislop sigue en sesión 35332; llegó a 500 HTML en el último registro. Su salida será docs/audit-build-antislop.json. No reiniciarlo por lentitud.
- El sitemap se regeneró después y contiene ahora 230 URLs, incluidas las dos rutas de escenario que existían en el build pero faltaban en el fichero público de origen. Comprobar el sitemap del release final, sin usar como prueba el informe previo de 228 URLs.
- Cambios editoriales: páginas territoriales sin notas internas de JSON, oleadas o SEO; cobertura parcial explícita. Fechas de sus metadatos y Article alineadas al 7 de septiembre. Fuentes municipales enlazadas y CTA directo al procedimiento cuando existe.
- Madrid: procedimiento oficial leído; enlace largo actualizado y peculiaridades revisadas (consentimientos, incompatibilidad de expedientes simultáneos, justificante y resolución). Se conserva la fecha global antigua porque no se ha revisado todo el resto de la ficha. Eliminada emisión de CivicStructure para direcciones que solo dicen consultar un listado.
- La indexación municipal exige también confidence=official, tanto en TypeScript como en el generador de sitemap. Nueva prueba contra fichas completas pero inferidas/no verificadas.
- Suite completa: 63/63 pruebas correctas. Tras últimos cambios de ficha, las 14 aserciones pasaron pero Vitest terminó con error RPC onTaskUpdate; no contarlo como ejecución correcta. Se repite la comprobación afectada tras detener el servidor de desarrollo.
- Pipeline vigente: sesión 33195 ejecuta pruebas afectadas, huella de entradas, build final .next (docs/build-release-final.log) y comprobación de que las entradas no cambiaron. No editar src/data/content/public/configs mientras termina. El build anterior de sesión 16715 terminó correctamente pero quedó obsoleto respecto a la última limpieza de texto.
- scripts/release_inputs.py registra la huella de código y datos; scripts/pack_release.py la exige y rechaza builds anteriores. scripts/activate_release.sh verifica SHA256, cambia symlink atómicamente y revierte ante fallo HTTP local. Preparados, no ejecutados para publicar.
- Acceso VPS confirmado: release /srv/tenants/slot2/releases/20260904T065837Z; servicio activo, HTTP local 200; 57 GB libres. Docs/VPS_DESPLIEGUE.md actualizado con procedimiento nuevo. No se ha tocado producción.
- Navegador: seis pasos completados para Madrid/propietario/española/sin NIE/sin menores/alta; resultado correcto, botón de copia muestra Checklist copiada, revisión conserva respuestas. Cambiar municipio desactiva Continuar hasta seleccionar una sugerencia; Getafe habilita de nuevo el avance. Esto se probó en el build compilado, no en desarrollo.
- Captura guía DNI a innerWidth 391 y scrollWidth 371, sin desbordamiento. Ficha Madrid observada con índice lateral y columna de lectura en escritorio. Viewport restaurado correctamente.
- Stitch recuperado en una pestaña nueva: se observaron inicio desktop/móvil, guía, ficha Valencia, categoría educación/becas y asistente móvil, además de pantallas extra y tokens. Hay afirmaciones/funciones inventadas en maquetas; no importarlas a producto. Exportación por content.export no soportada en Chrome; acciones posteriores sobre la pestaña dieron debugger no adjunto. Proyecto original intacto: 9918002176358718983.

Pendiente: concluir build y auditoría finales, validar artefacto standalone y desplegar; completar revisión de fuentes/contenido repetido, mediciones de rendimiento/accesibilidad y comprobación de producción tras la publicación. No cerrar el objetivo por tener pruebas unitarias verdes.

## Estado definitivo de compilación y preparación

- Pipeline 33195 finalizado con código 0: 18 pruebas dirigidas correctas y build final de producción completo. Huella de 922 entradas verificada sin cambios (docs/release-inputs.json).
- Auditoría final en sesión 9228: analiza .next y añade comprobaciones de idioma, JSON-LD válido y URLs duplicadas en sitemap. Informe previsto: docs/audit-build-release.json. El informe anterior de 228 URLs no sustituye este control.
- Empaquetado final en sesión 25574; el manifiesto se escribe únicamente cuando termina. No subir el tar parcial.
- scripts/check_release.sh preparado y comprobado con bash -n en el VPS. Verificará el archivo en un servicio privado temporal, puerto 8199, antes de activar el release. Incluye páginas, noindex, fuentes, CSS, robots, sitemap y 404. No ejecutado aún.
- Scripts de comprobación y activación subidos a /tmp. La aplicación pública continúa en el release anterior.

### Corrección detectada por el rastreo final

El rastreo 9228 terminó: 997 HTML, 228 páginas indexables y dos entradas repetidas en sitemap (volante-online y cita-previa-madrid). No se detectaron otras incidencias en los controles implementados. Las 230 entradas comunicadas anteriormente correspondían a 228 URLs únicas; no eran dos rutas adicionales.

Corregida la duplicación en CORE de scripts/build_sitemaps.py y regenerado public/sitemap.xml. Control posterior: 228 URLs únicas; evidencia en audit-sitemap-correction.json. La comprobación de destinos del nuevo build queda pendiente mientras se recompila. El informe original audit-build-release.json conserva los hallazgos, sin sobrescribirlos como si no hubieran existido.

Empaquetado 25574 detenido porque su sitemap quedó obsoleto. No subir su tar parcial. Pipeline sustituto 62923 registra nueva huella, compila en .next (build-release-sitemap.log), comprueba entradas y empaqueta al terminar. Sigue pendiente validar el archivo final en VPS y publicar. El navegador ha perdido la conexión y no hay instancias disponibles en la consulta de recuperación; no se ha repetido la revisión visual en esta continuación.

### Revisión editorial posterior: errores confirmados en becas

- Pipeline 62923 detenido de forma deliberada tras encontrar errores de contenido; no tratar ese build como release vigente. No fue un reinicio por lentitud.
- MEC: la resolución BOE-B-2026-16327 prorrogó el cierre al 19 de mayo de 2026, 15:00 hora peninsular. Corregida la constante compartida, metadatos y texto; enlazada la resolución. Eliminadas predicciones cerradas de pagos y del calendario 2027-28 en las dos páginas principales.
- MUFACE: BOE-A-2026-10876 corresponde a estudios propios del mutualista en 2025/26. La guía afirmaba erróneamente que podían solicitar sus hijos beneficiarios. Reescrita con requisitos, documentos, cuantía y compatibilidad; CTA al procedimiento concreto y fuente BOE. Fecha individual de revisión 7/9/2026.
- Retirada del aviso genérico la afirmación de verificación integral que la evidencia no sostenía. Retiradas etiquetas P0 del contacto y llms.txt. El aviso municipal pendiente de verificación deja de usar píldora y mayúsculas decorativas.
- La prueba de guías conserva comprobaciones de aviso, HTTPS y contenido de secciones; se elimina el mínimo arbitrario de palabras que incentivaba relleno. Actualizada la expectativa del cierre MEC al 19 de mayo.
- Suite completa en sesión 78565, salida docs/tests-editorial-final.log. Pendiente confirmar el resultado y generar nueva huella/build/paquete después de estas ediciones.
- La prueba privada del VPS ahora recorre todas las URLs del sitemap. Script subido y bash -n correcto; no se ha ejecutado contra un nuevo artefacto ni publicado.

Fuentes consultadas: https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-16327 y https://www.boe.es/buscar/doc.php?id=BOE-A-2026-10876. Continúa pendiente la revisión del resto de afirmaciones variables de las guías.

La sesión 78565 terminó con 63 aserciones correctas pero código 1 por timeout RPC onTaskUpdate. Se ha añadido una cesión al bucle de eventos entre fichas en el test que renderiza 769 municipios; conserva todas sus comprobaciones y evita bloquear la comunicación del worker durante un bucle largo. Repetición activa 84951, registro tests-editorial-verified.log: comprobar resultado antes de darlo por resuelto.

Pipeline de release actual: 66089, registro build-editorial-final.log. Huella 578f04e71a31aa3ecbafdbc81b78552abfa7994a6fb6cee9534ba5a073d43126 (922 entradas). Compilación del código correcta; validación de tipos, generación, comprobación de huella y empaquetado aún en curso al último control. No editar código/datos/públicos mientras se prepara ese artefacto. Los cambios del test y de esta documentación quedan fuera de la huella del producto.

Confirmación posterior: sesión 84951 terminó con código 0, 63/63 pruebas en 12 archivos y sin errores internos (113,49 s). La compilación 66089 ha generado sus 1005 rutas; aún debe terminar la preparación del standalone y su empaquetado. pack_release.py comprueba ahora también que las entradas no hayan cambiado durante el empaquetado, antes de emitir el manifiesto.

Comprobación estática de accesibilidad: siete páginas representativas del build RG-IFGkNbtj4GhuWqm1Tl sin incidencias en identificadores duplicados, landmark main, atributo alt, texto/nombre de botones y asociación de campos con etiquetas. El comprobador reconoce tanto label-for como etiquetas envolventes; los primeros avisos del asistente eran falsos positivos del comprobador, corregidos tras inspeccionar RadioOption. Evidencia: docs/audit-accessibility-static.json. No mide contraste calculado, foco, interacción ni conformidad WCAG completa.

Rastreo HTML actual en sesión 70764, salida docs/audit-build-editorial.json. El informe incorpora build_id para relacionarlo con el artefacto exacto. Último avance observado: 100/997 HTML; no darlo por terminado. El script privado del VPS incluye además comprobaciones del contenido corregido MEC y MUFACE y está subido a /tmp/rutatramite-check.sh.

El build 66089 terminó correctamente y confirmó entradas sin cambios. La misma sesión está empaquetando en C:/Users/Mariano/AppData/Local/Temp/rutatramite-release-j_l_p22_/release.tar; último mensaje Adding .next. No subir antes de que termine y emita docs/release-manifest.json. El rastreo 70764 avanzó a 200/997. Consulta de navegadores: ninguna instancia disponible; continúa pendiente la revisión visual restante.

Contraste de siete combinaciones declaradas en CSS calculado: ratios entre 5,91 y 14,46 para texto/enlaces/botones, y 7,91 para foco sobre blanco. Evidencia docs/audit-contrast-tokens.json. Es una muestra de tokens explícitos, no una evaluación de estilos calculados de toda la aplicación.

### Secuencia de publicación en ejecución

Sesión 27778 ejecuta scripts/deploy_verified_release.py --build-id RG-IFGkNbtj4GhuWqm1Tl --wait. Está esperando al manifiesto del empaquetado 66089; no iniciar otra publicación en paralelo. La secuencia verifica huella y SHA256, sube el tar completo, ejecuta la prueba privada y espera el informe de rastreo 70764 del mismo build sin incidencias antes de activar. Tras activar conserva recibo deployed-RG-IFGkNbtj4GhuWqm1Tl.json y ejecuta rastreo público. Se detiene si falla un control; los logs separados indican dónde.

Sintaxis Python del coordinador y bash de ambos scripts remotos comprobada. No equivale a que se haya publicado: al último control solo se esperaba el paquete. Rastreo 70764 en 400/997 HTML. Mantener sin cambios src/data/content/public/configs hasta terminar esta secuencia. Si hace falta editar el producto, detener primero el coordinador 27778 y el empaquetado 66089 para impedir publicar una entrada obsoleta.

Control HTTP directo: http://rutatramite.com, http://www.rutatramite.com y https://www.rutatramite.com terminan en https://rutatramite.com/ con estado 200; dominio canónico HTTPS también responde 200. Evidencia audit-domain-redirects.json, sobre el servidor aún anterior a esta publicación. El rastreo 70764 avanzó a 500/997; empaquetado 66089 y coordinador 27778 confirmados activos al último sondeo.

Diagnóstico de E/S del empaquetado: lectura inicial de 20 archivos (1,3 MB) 6,569 s; incorporación posterior de esos mismos archivos a un tar en memoria 0,099 s. La lentitud observada procede principalmente del acceso inicial a archivos, no demuestra un bloqueo del proceso. Para ayudar sin reiniciarlo, sesión 27474 lee en paralelo (8 workers, buffers de 256 KiB) los 6759 archivos del standalone/estáticos/públicos/datos/contenido. Solo lectura, no modifica el build. Rastreo 70764 llegó a 700/997; los procesos 66089, 70764, 27778 y 27474 siguen activos. No iniciar duplicados ni subir tar parcial.

Rastreo 70764 finalizado con código 0. Informe audit-build-editorial.json: build RG-IFGkNbtj4GhuWqm1Tl, 997 HTML, 228 indexables, 228 URLs de sitemap, issue_counts vacío e issues vacío. Este es el informe vigente para el coordinador de publicación. No volver a esperar la sesión 70764 ni sustituirlo por los informes históricos con duplicados.

Resumen de situación legible y matriz de cierre en docs/ESTADO-AUDITORIA.md. El empaquetado 66089, coordinador 27778 y lectura paralela 27474 continúan activos; la lectura paralela alcanzó 1000/6759 archivos. Publicación aún pendiente.

### Hallazgos regionales y detención de activación

Coordinador 27778 detenido mediante Ctrl-C, código 1, antes de disponer de manifiesto y antes de subir/activar. No volver a iniciarlo con este build para publicar. Se conservan empaquetado 66089 y lectura 27474 para completar el artefacto y probar técnicamente el standalone.

La revisión oficial identifica que Manuela Solís usa procedimiento 95885, distinto del 265 de exención de tasas; la guía mezclaba ambos y atribuía cuatro ventanas de solicitud sin respaldo conservado. Los resultados de la sede distinguen fases de recurso, que no deben presentarse como nuevas solicitudes. Además, la Universidad de Burgos confirma que las ayudas CyL 2025-2026 exigen haber obtenido beca MEC; no son la alternativa general por haber perdido su plazo que afirmaba la guía.

Preparada reescritura en tmp/becas-next.ts mediante tmp/prepare_regional_becas.py. El código src permanece estable mientras acaba el paquete. Después de completar su prueba técnica, ejecutar el preparador con --apply-after-package, revisar los cambios y construir una nueva versión. El preparador requiere un manifiesto del build actual para evitar cambiar entradas durante su empaquetado. Aún no aplicado.

Fuentes: https://www.gva.es/es/inicio/procedimientos?id_proc=95885 y https://www.ubu.es/te-interesa/ayudas-al-estudio-de-la-junta-de-castilla-y-leon-para-alumnos-de-grado-y-master. UBU leído completo; GVA/JCyL devolvieron restricciones al abrir, por lo que para GVA se usa solo la información explícita de resultados oficiales, sin declarar revisión integral ni anticipar fechas.

El preparador regional incluye ahora tres borradores de componentes en tmp: UnverifiedBadge-next.tsx sustituye la utilidad inexistente border-forest por border-moss; OfficialCta-next.tsx alinea sus clases base con radio pequeño y verde (ya impuestos por CSS); PilarView-next.tsx cambia las píldoras territoriales por enlaces subrayados en dos columnas. No aplicados todavía. --apply-after-package aplicará tanto becas como estos componentes cuando exista el manifiesto del paquete actual.

Actualización: esos cambios ya se aplicaron con --apply-after-package después de terminar el paquete. Los borradores pasaron la comprobación de tipos del proyecto mediante tmp/check_next_drafts.cjs, sin cambiar las entradas durante su empaquetado (sesión 88114, código 0). Pruebas afectadas en sesión 87175, docs/tests-regional-final.log; pendiente confirmar resultado y hacer nuevo build.

Empaquetado 66089 finalizado con código 0: archivo de 252057600 bytes, SHA256 050407538b983e2ffd75c93ca650d00789af6e2a96779133eb34d2f5820dc327, build RG-IFGkNbtj4GhuWqm1Tl. Lectura paralela 27474 también finalizada. No volver a esperar esas sesiones.

Sesión 33941 ejecuta el coordinador con --preview-only: está subiendo el archivo a /tmp/rutatramite-RG-IFGkNbtj4GhuWqm1Tl.tar y ejecutará check_release.sh, sin activar producción. Logs release-upload.log y release-preview.log. Este modo permite probar un artefacto ya cerrado aunque el código fuente haya avanzado; sigue validando hash y build_id del archivo. La activación normal conserva la comprobación de huella del código.

Confirmado: 33941 terminó con código 0, PREVIEW_OK sitemap=228 checked_pages=228 assets=10. Preview /srv/tenants/slot2/previews/20260907T114440Z; servicio temporal detenido automáticamente. No activó producción. Pruebas regionales 87175 terminaron con código 0: 31 pruebas en cuatro archivos, sin errores internos, 89,74 s.

Pipeline vigente 92142: build-regional-final.log y empaquetado posterior. Huella b608828d1628bd99110645a5b5176b525b77f7bc8a4d4ed5781dd68d0a6743ae, 922 entradas. Mantener src/data/content/public/configs estables. El manifiesto y audit-build-editorial.json todavía corresponden al build anterior RG-IFGkNbtj4GhuWqm1Tl hasta que los procesos nuevos terminen; no usarlos para afirmar verificada esta nueva compilación. check_release.sh actualizado y subido con comprobaciones de GVA y CyL para el próximo artefacto.

pack_release.py usa ahora bsdtar nativo de Windows cuando está disponible y conserva fallback Python en otras plataformas. La selección de entradas, huella antes/después, SHA256 y manifiesto no cambian. Prueba real de dos directorios de origen y ruta de salida con espacios correcta; contenido de sitemap extraído idéntico. El siguiente archivo debe repetir la prueba privada completa, sin extrapolar esta comprobación pequeña a todo el release. No se reinició el build 92142: el empaquetador se ejecutará al terminar. Último log: compilado correctamente en 64 s, comprobación de tipos en curso.

Build regional identificado como n02Px0J0ZlmBSVvXDMiH2: tipos correctos y 1005 rutas generadas; 92142 continúa con trazas/standalone y empaquetado. Coordinador de publicación NUEVO en sesión 25984 con ese build-id, esperando manifiesto. Puede activar producción tras superar prueba privada e informe HTML del mismo identificador; no iniciar otro coordinador. No confundirlo con 27778 detenido ni 33941 finalizado en modo privado.

Rastreo nuevo en sesión 37602, salida docs/audit-build-editorial.json. El informe del build anterior se conservó en audit-build-RG-IFGkNbtj4GhuWqm1Tl.json antes de que el nuevo rastreo escriba el resultado. Procesos actuales a seguir: 92142, 25984 y 37602. No modificar entradas del producto mientras estén preparando/publicando n02Px0J0ZlmBSVvXDMiH2.

### Prueba limpia en Linux y corrección de dependencias

Se añadió --root al auditor para ejecutarlo sobre el paquete extraído en Linux. La prueba del artefacto anterior RG-IFGkNbtj4GhuWqm1Tl en /srv/tenants/slot2/previews/20260907T114440Z terminó correctamente: 997 HTML, 228 indexables/sitemap, sin incidencias. Sesión 38757 finalizada. check_release.sh ahora incluye esa auditoría completa antes de emitir PREVIEW_OK, además de las comprobaciones HTTP. Scripts de auditoría instalados en /tmp/rutatramite-audit-tools.

El VPS tiene 7,7 GB RAM, unos 5,9 GB disponibles y 56 GB libres; tenant-slot2.slice limita memoria a 2 GB y CPU a un núcleo. Se preparó una compilación aislada con esos límites, NODE_OPTIONS=--max-old-space-size=512 y caché npm dentro de su directorio. Fuente comprimida de 727869 bytes, hash 0cb1578dc11c1a83b8fded0fb4e049fe66c0cdd69b3b9e4ca9749e1dc0eb4f6c; no incluye dependencias, builds ni archivos de entorno. Evidencia docs/source-bundle.json.

La compilación limpia en /srv/tenants/slot2/builds/20260907T115847Z terminó con error real en npm ci: Missing @swc/helpers@0.5.23 from lock file. npm local 11.6.2 frente a npm 10.9.8 en VPS. No eludir npm ci ni considerar reproducible el lock anterior por tener un build local correcto.

Por ese hallazgo se detuvieron 25984 (publicación) y 92142 (empaquetado), ambos con código 1. No publicar sus archivos parciales ni reiniciarlos sin reparar el lock. El rastreo 37602 puede terminar sobre los HTML ya generados, pero no prueba la instalación limpia.

Reparación del lock en sesión 97170: npx --yes npm@10.9.8 install --package-lock-only --ignore-scripts --no-audit --no-fund. Registro docs/lockfile-repair.log. Pendiente confirmar resultado y repetir npm ci en el build Linux aislado antes de decidir el artefacto a publicar. El servicio público sigue sin cambios.

Reparación 97170 finalizada con código 0: añadido node_modules/next-intl/node_modules/@swc/helpers 0.5.23. SHA256 del lock corregido: 302c293717b71f1507cc0dc96e5169350aebf814e9d7bdc9f1ca41659d07f4da. Se subió a /tmp/rutatramite-fixed-package-lock.json y se instaló, tras verificar hash, en el build aislado Linux. El resto de entradas del producto proceden del source bundle registrado.

npm ci en Linux pasó: 319 paquetes instalados. La sesión observadora 43086 terminó por UnicodeEncodeError de cp1252 al imprimir el triángulo de Next; consulta posterior al journal confirmó que la unidad repaired también terminó con código 1. No se interpretó el timeout como terminación ni se reinició a ciegas.

Se lanzó una unidad distinta con logs persistentes y salida desacoplada de SSH: slot2-build-20260907T115847Z-logged.service, confirmada activa. Directorio /srv/tenants/slot2/builds/20260907T115847Z; log docs/linux-job.log dentro de ese directorio. Usar python.exe -X utf8 al invocar vps.py para evitar errores de codificación. No volver a esperar sesiones locales 43086 o 37602: ambas terminaron. 37602 dejó rastreo n02Px0J0ZlmBSVvXDMiH2 sin incidencias, pero ese build usa el lock anterior.

Siguiente: comprobar unidad logged y log remoto sin reiniciarla; recoger manifiesto y auditoría Linux cuando termine, ejecutar pruebas sobre instalación limpia y preflight del archivo Linux antes de activar. No hay coordinador de publicación activo ahora. Mantener fuentes estables. El registro Linux de entradas usa orden de rutas de esa plataforma (572955717586c99fd53f0b5081a4383a7dd34e617a4ac04527885d036a16dcc2); la procedencia se acredita por bundle original y hash del lock reemplazado, no suponiendo que el orden de Path sea idéntico entre Windows y Linux.

### Publicación Linux completada y verificada

Build Q0kL8ZnTNf3l-fC6sQw7T terminado con LINUX_BUILD_OK. Artefacto de 271319040 bytes, SHA256 73f8c9c1ada1887676123b2d9687c4be0ff772d6162dd491f6a475337d387ef7. Auditoría de 997 HTML, 228 indexables y 228 URLs de sitemap sin incidencias. La comprobación estática de accesibilidad sobre siete páginas del mismo build también terminó sin avisos.

La primera suite Linux tuvo 62 correctas y un fallo ENOENT porque el bundle de fuentes omitía las copias del pack que compara el test editorial. Se añadieron los archivos originales de pack/rutatramite-empadronamiento-agent-pack/05_content/escenarios; pack_source.py ya los incluye para futuras ejecuciones. No se cambiaron las entradas del producto: release_inputs.py --check volvió a pasar.

La unidad slot2-tests-20260907T115847Z-complete terminó: 63/63 pruebas, 12 archivos, 30,40 s, sin errores internos. npm audit sobre esa instalación limpia informó 0 vulnerabilidades. Informes descargados en docs/linux-tests-complete.log y docs/audit-linux-dependencies.json.

Preflight del artefacto Linux completado en sesión 39466: 228 páginas HTTP, 11 recursos y auditoría de los 997 HTML extraídos, sin incidencias. Preview /srv/tenants/slot2/previews/20260907T120923Z, servicio temporal detenido automáticamente. Evidencia docs/release-linux-preview.log.

Activado con éxito /srv/tenants/slot2/releases/20260907T121358Z. Se conserva el anterior /srv/tenants/slot2/releases/20260904T065837Z. Solo se reinició slot2-app.service. Recibo docs/deployed-Q0kL8ZnTNf3l-fC6sQw7T.json y log docs/release-linux-activation.log.

Rastreo público 47536 finalizado: 228 páginas de sitemap + 768 destinos enlazados fuera de sitemap; sin errores HTTP, duplicados, incidencias de metadatos ni destinos rotos. Los 35 HTTP 404 del sitemap inicial están resueltos en el rastreo actual. Desde Windows se comprobaron además portada, guías GVA/CyL y el _buildManifest.js del build Q0kL8ZnTNf3l-fC6sQw7T: todos HTTP 200 y contenido esperado. Un primer aviso de portada fue un falso negativo por codificación del literal de prueba en PowerShell; repetido con escapes Unicode correctos, pasó.

Evidencia remota descargada por sesión 25847, terminada. Archivos docs/linux-release-manifest.json, linux-release-inputs.json, linux-audit-build-editorial.json, linux-audit-accessibility-static.json, linux-audit-production-after.json, linux-job.log, linux-tests.log (fallo histórico por fixture) y linux-tests-complete.log (correcto). docs/ESTADO-AUDITORIA.md contiene el resumen vigente.

No hay builds ni coordinadores de publicación pendientes de esta versión. El objetivo sigue abierto por las comprobaciones visuales restantes, evidencia de Stitch, mediciones de accesibilidad/rendimiento y alcance editorial pendiente; la petición asíncrona para reabrir navegador sigue sin respuesta al último control. No afirmar revisión visual completa ni verificación editorial de todo el catálogo a partir de estos controles técnicos.

Consulta de navegador nuevamente vacía. Se ha solicitado al usuario de forma asíncrona que reabra el navegador usado para Stitch; la comprobación visual depende de esa conexión, sin impedir avanzar en servidor y código. Empaquetado 66089 y lectura paralela 27474 siguen activos. Coordinador 27778 sigue detenido: no reanudar una publicación automática del build con errores regionales conocidos. El paquete terminado puede subirse y ejecutarse con check_release.sh para una prueba privada sin activar.
