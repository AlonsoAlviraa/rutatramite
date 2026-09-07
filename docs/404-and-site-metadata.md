# Página 404 y descripción del sitio

7 de septiembre de 2026.

La página de error incorpora el buscador de guías y un enlace al directorio completo, en lugar de limitar la recuperación a la portada y al padrón. Conserva un único H1 y la exclusión de indexación. Se declaran nulos los metadatos alternativos y sociales heredados en esta página de error.

La descripción por defecto y el objeto Organization describen el catálogo actual de trámites, educación, familia y modelos, manteniendo la condición de guía independiente. El icono usado por el objeto Organization responde 200 con tipo image/png; no era un enlace roto.

Antes del cambio, cinco rutas inexistentes de distintas familias ya devolvían 404 y noindex. Evidencia: `404-routes-before.json`. Se conserva este comportamiento; no se atribuye al cambio un arreglo de estado HTTP que no era necesario.

17 pruebas de SEO, búsqueda y frontend pasan. El primer paquete no se publicó: incluir el catálogo directamente en not-found aumentaba su tamaño de 267,6 MB a 298,5 MB. Se sustituyó por una carga de `/api/guias` al montar la página de error. El endpoint estático publica solo títulos y destinos públicos y declara X-Robots-Tag: noindex. Si la carga falla, permanece el enlace al directorio.

Publicado el build `dNQLM5MQKrZwq8l6Jcru2`, release `/srv/tenants/slot2/releases/20260907T142816Z`. Paquete final: 268.328.960 bytes, SHA-256 `8e6b4f7f6cc82b20b525a4e8bb7936f886e67c78aaa0a786944b0db18a5d681f`. El build EHwzX8LQoHJ_bDlH2SkSu quedó descartado.

La auditoría estática pasa sobre 997 HTML; la prepublicación comprueba 228 páginas del sitemap y 12 recursos. Las cinco rutas públicas inexistentes conservan HTTP 404, noindex, un H1 y ausencia de canonical heredado: `404-public-smoke.json`. El índice responde 200, application/json y X-Robots-Tag noindex, con 126 entradas y destinos únicos.

En Chrome, la consulta «pasaporte» muestra siete resultados y el enlace «Cita previa pasaporte oficial» abre `https://rutatramite.com/pasaporte/cita-previa` con su encabezado correcto. Comprobado el 7 de septiembre de 2026. No se ha simulado funcionalmente el fallo de descarga del índice ni completado una revisión visual de todos los anchos. Estas comprobaciones no cierran la auditoría editorial integral.
