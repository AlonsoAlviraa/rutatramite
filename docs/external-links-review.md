# Enlaces externos y corrección de la T-16

Revisión del 7 de septiembre de 2026. El resultado automático original se conserva en [audit-external-links.json](audit-external-links.json): 228 páginas indexables, 53 destinos externos únicos, 34 accesibles, 18 sin verificar por respuestas de bloqueo o fallos de conexión y un 404.

Los 18 destinos sin verificar no se consideran enlaces rotos. Una respuesta 403 de un portal oficial no demuestra que el enlace falle para una persona que navega.

## Correcciones

- INE: confirmado mediante GET que la antigua URL de la operación estadística devuelve 404 y la ruta oficial actual devuelve 200. Actualizado el enlace en Fuentes.
- T-16: sustituido el enlace genérico de T-mobilitat por las instrucciones concretas de TMB. La consulta oficial reveló errores de contenido, no solo de enlace.
- La guía delimita el sistema integrado de Barcelona y la zona del municipio de residencia; corrige la vigencia desde los 4 años hasta seis meses después del 16.º cumpleaños.
- Explica la solicitud online y elimina la presencia obligatoria del menor y la supuesta toma de fotografía. Distingue el título gratuito del soporte de 4,50 €.
- Retirado el apartado que afirmaba que casi toda la información oficial solo estaba disponible en catalán: las fuentes consultadas tienen versión castellana.

Fuentes: [condiciones de la T-16](https://www.tmb.cat/es/tarifas-metro-bus-barcelona/t-16) e [instrucciones de alta y solicitud](https://www.tmb.cat/es/tarifas-metro-bus-barcelona/t-mobilitat/bonificaciones-y-descuentos/t-16-t-jove). La fecha de revisión se incorpora solo a esta guía.

Validación: 20 pruebas de catálogo, nichos y regresiones pasan. Compilación Linux publicada como `khxBB62AOxX7FIvxEtA3m`, release `20260907T133141Z`, tras comprobar 997 HTML, 228 páginas del sitemap y 11 recursos sin incidencias. La comprobación pública específica se conserva en [t16-public-smoke.json](t16-public-smoke.json).
