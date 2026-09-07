# Limpieza de plantillas compartidas

7 de septiembre de 2026.

La revisión de la carta de baja voluntaria mostró enlaces a sí misma, descripciones de relleno y avisos repetidos. Se ha corregido `GuideView` para mostrar una lista de destinos relacionados únicos, excluyendo la página actual. No se añaden descripciones automáticas a esos enlaces.

El aviso de DNI se limita al grupo de DNI y pasaporte cuando no hay uno específico. Las demás guías usan un aviso general o su propio texto. El componente deja de añadir otra declaración de independencia al aviso existente. La sección de fuentes distingue los modelos de escritos de las guías de trámites.

El pie común conserva la declaración de independencia y privacidad, sin el aviso específico del padrón. Se retira el duplicado oculto del layout, que se repetía al leer la página con tecnologías de asistencia.

Validación: suite completa, 63 pruebas correctas en 23,32 segundos. Build Linux `ZeUg8PtURNf4886PFCgiL`, publicado en el release `20260907T133924Z` tras comprobar 997 HTML, 228 páginas del sitemap y 11 recursos sin incidencias. Las comprobaciones públicas de portada, carta, DNI y T-16 pasan; evidencia en [guide-cleanup-public-smoke.json](guide-cleanup-public-smoke.json).

## Revisión adicional de páginas institucionales

Tras publicar, captura de escritorio del pie inspeccionada en la carta: tres columnas de enlaces legibles y un único aviso dentro del pie. La comprobación HTML confirma la lista relacionada sin autorreferencia ni descripciones de relleno; el desplazamiento para capturar esa lista expiró, por lo que no se atribuye revisión visual a la lista completa.

Metodología: captura de escritorio inspeccionada; título, párrafos y navegación activa legibles. No se acredita todavía revisión visual móvil.

Pendientes fuera de este paquete, identificados en los archivos actuales:

- Privacidad conserva jerga de desarrollo («client-side», «typeahead», «v1», «uploads») y un enlace de contacto escrito como ruta sin enlace.
- Contacto muestra el correo sin enlace y textos centrados solo en padrón, aunque el sitio cubre más trámites.
- Aviso legal incluye detalles internos de marcado y frases poco claras; su contenido necesita una revisión propia, sin inventar información del titular.
- Las páginas institucionales incluyen todavía un aviso de padrón dentro de su propio contenido. El duplicado del pie y el layout sí se retira en este paquete.
