# PageSpeed Insights: portada

Medición ejecutada el 7 de septiembre de 2026 a las 15:43 CEST sobre `https://rutatramite.com/`, con el build público `ZeUg8PtURNf4886PFCgiL`. Se utilizó la interfaz web de PageSpeed, ya que el intento anterior mediante API devolvió cuota cero.

[Informe de Google](https://pagespeed.web.dev/analysis/https-rutatramite-com/9r87fhvl02?form_factor=mobile). Lecturas completas de la interfaz guardadas en `pagespeed-mobile-20260907.txt` y `pagespeed-desktop-20260907.txt`.

| Métrica | Móvil | Escritorio |
| --- | --- | --- |
| Rendimiento | 98 | 100 |
| Accesibilidad automática | 100 | 100 |
| Prácticas recomendadas | 100 | 100 |
| SEO básico | 100 | 100 |
| FCP | 1,1 s | 0,3 s |
| LCP | 2,0 s | 0,4 s |
| TBT | 30 ms | 0 ms |
| CLS | 0 | 0 |
| Speed Index | 3,7 s | 0,5 s |

Lighthouse 13.4.1. Móvil: Moto G Power emulado, 4G lenta, carga inicial. Son medidas de laboratorio de una página. El informe indica que no hay datos de usuarios reales; no acredita Core Web Vitals de campo ni conformidad WCAG completa.

Oportunidades mostradas: unos 21 KiB de JavaScript sin usar, 12 KiB de JavaScript antiguo y 110 ms estimados de bloqueo de renderizado en móvil. No se justifican cambios de compatibilidad a ciegas por estas cifras; se debe identificar el recurso y su uso antes de retirar código.

La categoría experimental de navegación agéntica muestra 2/3. El detalle de `llms.txt` indica «Parece que el archivo no contiene ningún enlace». La inspección de `public/llms.txt` confirma URLs en texto plano en vez de enlaces Markdown. Queda corregir su formato y alcance en el siguiente paquete; no estaba incluido en la compilación institucional ya iniciada.
