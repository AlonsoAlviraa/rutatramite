# FAQ editoriales — 7 septiembre 2026

Se elimina la fabricación de preguntas desde los h1 y encabezados de sección de las guías. El sistema anterior producía «¿Dónde se pide Cuándo se cobra…?» y repetía párrafos existentes sin una pregunta útil.

`Guide` admite ahora FAQ expresas. La vista, el índice de navegación y el JSON-LD usan esas mismas preguntas. Sin FAQ no se muestra una sección vacía, no queda un enlace de ancla huérfano y no se emite FAQPage. La guía de cobro MEC incluye dos preguntas editoriales sobre el plazo orientativo y el pago de matrícula, respaldadas por las fuentes ya enlazadas.

Pruebas afectadas: 21/21 correctas en tres archivos (37,92 segundos). Se comprueba que exista una muestra con FAQ, que sus respuestas sean visibles, que no se generen preguntas desde títulos y que una guía sin FAQ no tenga ese marcado ni el ancla.

La compilación de navegación anterior terminó correctamente: `qkYOz084VWJHnxddVidQn`, archivo privado `/tmp/rutatramite-release-v0zopet9/release.tar`. No se activó: la siguiente compilación incluye navegación y FAQ juntas.

Nueva fuente: `/tmp/rutatramite-source-editorial-faq.tar.gz`, SHA256 `151585dec91fac8447ed636019095d93fa89513e123434afcaa8c39c9ac5e8e6`; entradas locales `cc04edda18454a7ced6d1bbb1441d0b1f37af52c5fc0589964a386e33ce241f7`. Pendientes compilación final, revisión del paquete y activación. Producción sigue en `eoMQIIenyrR38irmuvzWc`.

Trabajo iniciado: `/srv/tenants/slot2/builds/20260907T124812Z`, unidad `slot2-build-20260907T124812Z.service`, registro `build-job.log`. Consultar este trabajo antes de iniciar otro.

Publicación finalizada: build `PmeDpPKMZjEFzXe57IVKg`, SHA256 del artefacto `5ad6fb36593c6ab2d27b6f9cc696e6100bde99cfd3b7ecaff1c9f4d7054aa067`, 269373440 bytes. Suite Linux 63/63 en 114,51 segundos; prueba privada de 228 páginas y 11 recursos correcta; auditoría de 997 HTML sin incidencias. Activo `/srv/tenants/slot2/releases/20260907T125347Z`, anterior `/srv/tenants/slot2/releases/20260907T124042Z` conservado.

Verificación Chrome posterior en la guía de cobro: dos FAQ editoriales, viewport 390 y scrollWidth 375; sin desbordamiento. Menú abierto con aria-expanded=true; Escape desde el botón lo cierra (false) y el foco permanece en Menú. Tamaño temporal restaurado. No hay trabajos de compilación o pruebas pendientes para esta publicación.


Estado actual: la paridad entre FAQ visibles y JSON-LD forma parte del build `tSaLmQxc_8_5ek2TQNGHB`, publicado en `/srv/tenants/slot2/releases/20260907T211050Z`.
