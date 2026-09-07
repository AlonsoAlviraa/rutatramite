# Corrección CSP en producción — 7 septiembre 2026

Chrome detectó que la portada mostraba el HTML inicial y después quedaba vacía, con `Error: Connection closed` de React. El rastreo HTTP no detectaba este fallo.

La respuesta incluía scripts inline de Next Flight, pero Caddy enviaba `script-src 'self'`, que los bloqueaba. Se cambió exclusivamente `/etc/caddy/sites/rutatramite.com.caddy` a `script-src 'self' 'unsafe-inline'`. Se conservaron las demás directivas. Esto permite scripts inline y reduce la protección de CSP frente a inyección de scripts; es la configuración sin nonces documentada por Next.js para esta arquitectura estática. Los nonces exigirían renderizado dinámico.

Referencia: https://nextjs.org/docs/app/guides/content-security-policy

Copia previa: `/etc/caddy/sites/rutatramite.com.caddy.bak-20260907T122746Z`. `caddy validate` terminó correctamente y se recargó Caddy. Un GET público posterior confirma la nueva cabecera. No se cambió el artefacto Q0kL8ZnTNf3l-fC6sQw7T ni otros sitios.

La primera instantánea DOM tras la corrección contiene toda la portada y sus controles. La comprobación posterior del buscador y captura expiró; una reconexión también expiró. Todavía no se acredita la estabilidad tras hidratación ni el funcionamiento interactivo en producción. Es necesario completar esa prueba antes de cerrar el incidente.

Actualización posterior: en una nueva conexión Chrome la portada conserva título y contenido tras varias interacciones. Captura de escritorio visible; búsqueda «pasaporte»: 7 resultados; búsqueda sin coincidencias: mensaje de recuperación; borrado con teclado devuelve el estado inicial. Consola sin errores ni avisos. A 390 CSS px el ancho de contenido es 375, sin desbordamiento. El incidente de página vacía no se reproduce. Se detecta aparte que Escape en el botón del menú no lo cierra (el manejador está solo en el nav), pendiente de ajuste. Las pruebas anteriores cubren la portada; no sustituyen la revisión de todas las familias.
