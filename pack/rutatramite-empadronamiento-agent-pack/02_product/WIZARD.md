# Wizard “dónde me empadrono”

6 preguntas. Cero PII al servidor. El output es un checklist + URL oficial.

## Preguntas

1. Municipio (typeahead sobre `_index.json`, 8.132 filas).
2. ¿El contrato o la escritura está a tu nombre? `sí / no / soy propietario / no tengo papeles de la casa / no tengo techo`.
3. Nacionalidad: `española / UE-EEE-CH / resto`.
4. ¿Tienes NIE o TIE? `sí / no`.
5. ¿Hay menores en el alta? `sí / no`.
6. ¿Quieres alta, cambio de domicilio, volante, certificado o renovación 2 años?

## Output

- Caso detectado + enlace al spoke.
- Ficha del municipio (o stub).
- Checklist de documentos **de ese cruce** (caso × municipio.docs_extra).
- Botón primario: sede oficial.
- Botón secundario: cita, solo si `cita_url` existe.
- Aviso si `confidence != official`.

## Reglas

- No pedir DNI, pasaporte, dirección ni fotos.
- No guardar el resultado en cuenta.
- Permitir copiar checklist o imprimir.
- Si el municipio es stub: mostrar marco estatal + “confirma en el ayuntamiento” + query sugerida de Google restringida a `site:ayto*` no. Mejor: “busca ‘empadronamiento sede {municipio} {provincia}’”.
