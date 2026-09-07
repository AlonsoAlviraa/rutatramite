# Contexto de categorías y directorio de pasaporte

7 de septiembre de 2026.

`PackIndex` mostraba el aviso de padrón en todas las categorías. Ahora pasa un aviso general explícito; las plantillas de padrón mantienen el texto específico. La búsqueda de usos de `Disclaimer` confirmó que los demás consumidores están en páginas o secciones de padrón.

La ruta `/pasaporte` reutilizaba el directorio completo de DNI con su H1 y su ruta de migas. Ahora tiene título, introducción y ruta propios, y filtra tanto el listado como el índice de búsqueda a guías de pasaporte y tres guías compartidas: primera expedición de menores, documentos y cita conjunta. Conserva acceso al directorio general de DNI.

Validación local: 21 pruebas existentes pasan y el archivo de frontend pasa con cuatro pruebas, incluida una nueva sobre la ruta de pasaporte (22 pruebas distintas en conjunto). Compilación completada en `/srv/tenants/slot2/builds/20260907T145918Z`.

Publicado el build `xB8I9Pt6sMMxKaRlimbUQ`, release `/srv/tenants/slot2/releases/20260907T150342Z`, anterior `20260907T145551Z`. SHA-256 del paquete: `fcad862e8211990a80892ae192fe3ff2801870cdfa72818f411318f804319631`; 268.380.160 bytes. Prepublicación sin incidencias: 997 HTML, 228 páginas del sitemap y 12 recursos.

La comprobación pública pasa sobre diez rutas: `category-context-public-smoke.json`. El primer verificador suponía erróneamente que mudanza también usaba PackIndex; se confirmó que usa TramitePage y se ajustó la comprobación, conservando los controles de estado e independencia. Las otras nueve rutas comprueban además el aviso general y el buscador.

Chrome confirma nueve guías en pasaporte, cero resultados para «banco» y uno para «bebé». La captura móvil de becas a 390 px agotó el tiempo de espera; se restauró el viewport. No se considera revisión visual móvil completada.
