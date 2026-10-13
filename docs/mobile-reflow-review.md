# Reflujo e interacción móvil

7 de septiembre de 2026, build público `tSaLmQxc_8_5ek2TQNGHB` y release `/srv/tenants/slot2/releases/20260907T211050Z`.

La portada y la guía DNI se comprobaron en Chrome a 390 x 844 CSS px; ambas mantienen `scrollWidth` de 375 px frente a 390 px de viewport, un solo H1 y un solo canonical. En escritorio a 1280 x 1200 px, ambas mantienen `scrollWidth` de 1265 px frente a 1280 px.

El menú móvil abre con `aria-expanded=true`, muestra la navegación, Escape lo cierra y deja `aria-expanded=false`. El buscador de `DNI` devuelve resultados reales, el skip link enfoca `#contenido` y el asistente conserva etiquetas visibles.

La comprobación por DOM y medidas no sustituye una inspección manual con lector de pantalla, contraste y dispositivos físicos.
