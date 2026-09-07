# Copiar modelos de escritos

7 de septiembre de 2026. El bloque compartido de modelos incorpora una acción para copiar el cuerpo completo del escrito, conservando saltos de línea y campos editables.

- Cada botón identifica el modelo en su nombre accesible.
- Se impiden clics repetidos mientras la copia está en curso.
- Una región de estado anuncia el éxito o explica la alternativa manual cuando falla el portapapeles.
- El texto permanece renderizado y seleccionable, con ajuste de palabras para pantallas estrechas.
- El botón mantiene 44 px de altura mínima y el foco visible del sistema de diseño.

Diez pruebas de modelos, plantillas y regresiones pasan. Publicado el build `21OZ17gFBfPnqn2sS_hTM`, release `20260907T141124Z`, tras comprobar 997 HTML, 228 páginas del sitemap y 11 recursos.

Navegador público: modelos seco y cordial copiados y comparados carácter a carácter con el texto renderizado; ambos coinciden y son distintos entre sí. El cordial se activó mediante Enter. Mensajes de éxito y captura de escritorio inspeccionados. Evidencia: `model-copy-browser.json`. A 390 px, scrollWidth 375 y botones de unos 106 × 44 px; tamaño de ventana restaurado.

La primera lectura del portapapeles devolvió texto vacío pese al estado de éxito; la copia posterior y su lectura sí coincidieron. No se atribuye una causa a esa lectura inicial. No se ha simulado una denegación del permiso de portapapeles en el navegador; la rama de error está implementada, pero su comprobación funcional sigue pendiente.
