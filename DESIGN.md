# RutaTrámite: directorio de consulta

## Propósito
Ayudar a encontrar un trámite, entender qué documentos preparar y continuar en la sede oficial. Sitio independiente de la Administración. Lectura en guías e índices; interacción en buscador y asistente.

## Dirección visual
Newsreader para titulares y Public Sans para interfaz, ambas servidas mediante next/font. Jerarquía por tamaño y peso, sin titulares en cursiva. Fondo blanco; verde #2D6A4F para enlaces, #1B4332 para acciones y títulos; superficie secundaria #F3F6F4. Texto #252B26. No hay gradientes, transparencias desenfocadas ni fondos decorativos.

El buscador precede al directorio. Categorías en filas enlazadas con descripción y separadores, dos columnas en escritorio y una en móvil. No convertirlas en tarjetas de altura fija. Guías con columna de lectura e índice lateral cuando el ancho lo permite. Formularios con etiquetas visibles, foco claro, botones de al menos 44 px y mensajes de recuperación. Radio seleccionado y progreso reflejan respuestas reales.

Radios pequeños, 4 px en controles; sin sombras salvo el desplegable que se superpone al formulario. Transiciones de color de 150 ms; respetar movimiento reducido. No mover elementos al pasar el cursor. No añadir números, insignias, flechas o iconos meramente decorativos.

## Fuentes aplicadas
- [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/SKILL.md): diagnóstico por severidad y reescritura, catálogo de patrones y direcciones estéticas.
- [no-slop-ui](https://github.com/LeoStehlik/no-slop-ui/blob/master/SKILL.md): restricciones para superficies, tipografía, formularios y movimiento; leído también banned-patterns.md.
- [Taste / redesign](https://github.com/Leonxlnx/taste-skill/blob/main/skills/redesign-skill/SKILL.md): revisión de navegación activa, legibilidad y estados. Se descartan recomendaciones contrarias al encargo, como gradientes, desplazamientos hover o fechas aleatorias. Las fechas siempre proceden de hechos verificables.
- [Impeccable](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md): revisión manual con polish y craft-floor. No se instaló ni ejecutó su detector.
- Base previa: proyecto Google Stitch 9918002176358718983. Este documento registra la corrección solicitada posteriormente por el usuario; no afirma que esta variante haya sido generada o exportada desde Stitch.

SDesign se consultó como catálogo; no se ha aplicado un sistema de esa biblioteca. UIZZE y UI/UX Pro Max no se han instalado ni ejecutado. No mezclar bibliotecas de estilo sin una necesidad concreta.

## Evidencia y límites (7 septiembre 2026)
Exportación real de Stitch conservada en `research/stitch-20260907/reference.zip`, con inventario y huella en `manifest.json`. Contiene HTML/PNG de once pantallas y dos sistemas de diseño. El PNG de escritorio está vacío; su HTML sí está presente. Alcance y adaptaciones documentados en `research/stitch-20260907/README.md`.
Eliminados del código activo Inter, gradientes, backdrop-filter, transformaciones hover, logo con flecha, CTAs con flechas y cuadrícula de tres tarjetas en portada. Retirados los encabezados decorativos de las plantillas principales y la hoja CSS duplicada.

Portada comprobada en escritorio y móvil, incluidos búsqueda con resultados y sin coincidencias y menú móvil. Asistente completado en sus seis pasos: resultado, copia, revisión de respuestas y cambio de municipio comprobados. La guía de DNI se revisó a 391 CSS px, sin desbordamiento (scrollWidth 371); ficha Madrid revisada en escritorio. Falta ampliar las comprobaciones al resto de familias y anchos.

Publicado el build `tSaLmQxc_8_5ek2TQNGHB` en rutatramite.com: las 64 pruebas, 997 HTML auditados y las comprobaciones privadas de 228 paginas del sitemap pasan sin incidencias. El smoke publico, la auditoria global de prerrequisitos HTML, la comprobacion de codificacion de las 228 URLs y la revision Chrome de escritorio y movil pasan sin incidencias. Sigue pendiente la validacion manual WCAG y el rendimiento de campo.

La versión publicada retira también las píldoras territoriales y las mayúsculas decorativas del aviso municipal. Corrige las guías de becas, los textos internos P0 y las clases de color inconsistentes. Evidencia y límites actuales en docs/ESTADO-AUDITORIA.md.

