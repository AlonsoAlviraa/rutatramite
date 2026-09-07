# Directorio de becas: revisión de escritorio

7 de septiembre de 2026, versión pública anterior a la publicación de documentos de menores (`F5HxVkR76tC3rbTqcxsE5`).

Captura visible inspeccionada en Chrome: encabezado, introducción, etiqueta y control de búsqueda, primera fila del directorio en dos columnas. Sin solapamientos visibles en esa zona. La captura no cubre toda la página ni demuestra comportamiento móvil.

El DOM muestra 23 guías, un H1 y títulos H2 para cada entrada. Consulta «muface»: un resultado. Consulta «zzsincoincidenciaszz»: mensaje que invita a reducir palabras o revisar el listado. Son comprobaciones funcionales de estos dos estados, no una auditoría completa de accesibilidad.

Incidencia confirmada pendiente: `src/components/tramites/PackIndex.tsx` usa `<Disclaimer />` sin contexto y muestra un aviso de padrón al pie de becas. Corregir la plantilla de categorías, comprobar todas las familias y revisar los casos que utilicen el mismo valor por defecto.

El contenido visible también mantiene afirmaciones pendientes de contraste en Bachillerato, renuncia, compatibilidad Erasmus y subsanación. La revisión visual no valida esas afirmaciones.
