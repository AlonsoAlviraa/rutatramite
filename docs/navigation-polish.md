# Revisión de navegación — 7 septiembre 2026

**Cerrado:** publicado en `PmeDpPKMZjEFzXe57IVKg`. En Chrome se verificó apertura del menú, Escape desde su botón, aria-expanded=false y foco devuelto a Menú. Detalle de publicación en `faq-editorial-cleanup.md`; los párrafos siguientes conservan el historial.

La comprobación real en Chrome encontró que Escape no cerraba el menú cuando el foco estaba en su botón. El componente escuchaba esa tecla únicamente dentro del elemento nav.

Se comparte ahora el manejador entre botón y navegación. Al cerrar, el foco vuelve mediante una referencia React al botón concreto, sin buscarlo globalmente en el documento. El menú cerrado ignora Escape. Se mantiene la apertura mediante clic y la selección de enlaces.

También se cambia el encabezado interno «El producto» del pie por «Sobre RutaTrámite».

Estos cambios están en el código local y pendientes de publicación y comprobación interactiva. La última revisión publicada probó búsqueda con resultados, sin resultados, borrado por teclado, ausencia de errores de consola y ausencia de desbordamiento a 390 CSS px. Eso no acredita todavía el nuevo manejador de Escape.

TypeScript (`npx tsc --noEmit`) termina correctamente. Compilación Linux activa en `/srv/tenants/slot2/builds/20260907T124403Z`, unidad `slot2-build-20260907T124403Z.service`, registro `build-job.log`. Fuente empaquetada con SHA256 `f563be3cc2672780307a5c16256a449f4389cd10304bad2a27488accd235f296`, entradas locales `5a5d48a8ec21a8ffbaae05741b26e32268937347c4452395b358c3a3c6f207ce`. La versión pública sigue siendo `eoMQIIenyrR38irmuvzWc`.

Otro hallazgo pendiente: `guideFaqs` en `src/lib/seo/jsonld.ts` transforma automáticamente todos los encabezados en preguntas y antepone «¿Dónde se pide» al h1. Esto produce preguntas incoherentes como «¿Dónde se pide Cuándo se cobra la beca MEC 2026-27?». Que el texto se vea y coincida con JSON-LD no acredita su utilidad. Revisar esta generación y los tests afectados después de resolver la compilación en curso; evitar añadir contenido de relleno para conservar expectativas antiguas.
