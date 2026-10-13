# Revisión de cobro MEC — 7 septiembre 2026

Se corrigieron `/becas/mec/cuando-se-cobra` y `/becas/mec/no-cobrada`: retiradas las promesas de octubre/abril/mayo, el máximo de 45 días, la afirmación de que toda cuantía fija es igual, la atribución automática de retrasos a la cuenta y la afirmación de que toda llamada administrativa es fraude. También se retiró una promesa estacional en la guía de cambios de datos.

Fuentes oficiales consultadas y enlazadas en ambas guías:
- https://www.becaseducacion.gob.es/dudas/faqs.html
- https://www.becaseducacion.gob.es/dudas/asi-de-facil.html

El plazo habitual de cuatro o cinco semanas se presenta como orientación. La matrícula y los posibles pagos parciales se distinguen del ingreso bancario. Las incidencias remiten a la Unidad de Becas.

Pendiente de publicación. Fuente local: 922 archivos, SHA256 `0b0b59d071baf43ee66e0b8695b651fa5348f9178e091dff3de3a82edd859ba4`. Archivo fuente enviado: SHA256 `154f71b6e11f95675351b61372dd2952601a0c091b49e6dc6a7a059b8e1420e6`.

Compilación iniciada en `/srv/tenants/slot2/builds/20260907T123357Z`, unidad `slot2-build-20260907T123357Z.service`. Consultar su estado y `build-job.log` antes de continuar; no reiniciar por una desconexión del observador. La versión pública sigue siendo Q0kL8ZnTNf3l-fC6sQw7T hasta completar pruebas y activación.

Compilación finalizada: build `eoMQIIenyrR38irmuvzWc`, 997 HTML auditados, 228 indexables y cero incidencias. Archivo `/tmp/rutatramite-linux-eoMQIIenyrR38irmuvzWc.tar`, SHA256 `4e0a477baa46102aea21dd40c3012405fa49b2014a06a66b4062ca84a2a03255`. Pruebas locales de contenido: 13/13 correctas (tres archivos, 190,93 s). Suite completa Linux iniciada en `slot2-tests-payments.service`; registro `tests-job.log` dentro del build. Prueba privada iniciada, pendiente de resultado antes de activar.

Prueba privada finalizada correctamente: 228 páginas HTTP, 11 recursos y 997 HTML del artefacto. La primera suite completa dio 62/63 porque un test exigía el texto incorrecto «45». Se actualizó esa expectativa a la orientación oficial, su fuente y la ausencia de garantía. Solo cambió el test, sin modificar el artefacto; suite posterior en `slot2-tests-payments-corrected.service`, registro `tests-corrected.log`.

Suite corregida finalizada: 63/63, 12 archivos, 24,96 segundos. Activado el build `eoMQIIenyrR38irmuvzWc` en `/srv/tenants/slot2/releases/20260907T124042Z`. Se conserva el anterior `/srv/tenants/slot2/releases/20260907T121358Z`. Las correcciones de cobro están publicadas.
