# Prompt: extraer ficha de una sede

Entrada: nombre municipio, ine_code, URL candidata.

Salida: JSON válido contra `municipio.schema.json`.

Reglas:

- Solo extrae lo que está escrito en la sede o en una página `.es` / `.cat` / `.gal` / `.eus` del ayuntamiento.
- Si un campo no aparece, usa `null` / `unknown` / `[]`. Nunca adivines el teléfono.
- Distingue alta, certificado, volante, cita. No mezcles URLs.
- Guarda `source_urls` exactas.
- `last_verified` = hoy (UTC).
- `confidence=official` solo si leíste la ficha de trámite, no un listado genérico.
- Si la web es un buscador de citas privado, descártala.
