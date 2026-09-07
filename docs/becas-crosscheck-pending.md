# Contraste adicional de becas — 7 septiembre 2026

**Correcciones FP publicadas:** build `HjRrAjnP0VZux0-LqCEhf`, release `/srv/tenants/slot2/releases/20260907T131733Z`. Artefacto SHA256 `221d1964dbe8a88fe7118ba664a6a09a0b95f2f2ce3587564a7ca7dd6e5bb041`. Auditoría de 997 HTML y prueba privada de 228 páginas/11 recursos correctas. Comprobación pública guardada en `fp-beca-public-smoke.json`. Las notas de pendientes siguientes son el historial previo al arreglo.

Actualización: guía `/becas/fp` corregida en código. Distingue primer curso de grado medio y superior, rendimiento desde segundo curso, condiciones de matrícula/repetición y limitaciones de matrícula parcial. Retira el plazo de cobro de 45 días, predicciones de 2027 y referencia improcedente a ayudas universitarias de CyL. Añade tres fuentes oficiales y revisión editorial individual. Veinte pruebas afectadas correctas en tres archivos, 6,60 segundos. Pendiente de publicación; producción sigue en `-KX-xzYWRuzO_KjTrFkQF`.

Compilación iniciada en `/srv/tenants/slot2/builds/20260907T131245Z`, unidad `slot2-build-20260907T131245Z.service`, registro `build-job.log`. Archivo fuente `/tmp/rutatramite-source-fp-beca.tar.gz`, SHA256 `9d12b2fdc0ed3d000afbb974abcd9958d05429bc168dfc4fa1694dc26b22ca19`; entradas locales `964e8e9a3529fbdbb8a48fb26e77ee26bdf05df1c602f2189b40b976301bb8e7`. Consultar este trabajo antes de iniciar otro.

Se confirman las fechas publicadas en dos fuentes oficiales:
- Actualización MEC 2026/27: del 7 de septiembre a las 08:00 al 28 a las 15:00, hora peninsular. https://www.becaseducacion.gob.es/novedades
- Colaboración 2026/27: hasta el 22 de septiembre a las 15:00. https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/catalogo/estudiantes/becas-ayudas/para-estudiar/universidad/grado/becas-colaboracion.html

Pendiente de corregir en `src/lib/tramites/nichos2-becas.ts`:
- La guía FP todavía promete cobro «hasta 45 días», contradiciendo la corrección de la guía de cobro MEC.
- Presenta resolución en otoño y apertura en primavera de 2027 como certezas futuras.
- Generaliza el requisito de nota 5 a todo primer curso de FP. La página ministerial distingue grado superior y medio y las condiciones de matrícula/repetición; revisar el bloque completo antes de actualizarlo.

Fuente para requisitos académicos: https://www.becaseducacion.gob.es/becas-y-ayudas/fp-bachillerato-otros/que-necesitas.html

Esta nota documenta una revisión pendiente, no acredita que esas correcciones estén publicadas.
