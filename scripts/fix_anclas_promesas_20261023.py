"""23-10-2026 · Reaplica las anclas de consulta exacta del commit 01742f6 (22-10) que la cadena de regeneración de promesas-29n.ts pisaba (idempotente).
Ejecutar al final de la cadena de promesas."""
import pathlib
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text()
s = s.replace('"href": "/elecciones/programas-electorales-29n",\n"label": "Programas y mítines del 29-N"',
              '"href": "/elecciones/programas-electorales-29n",\n"label": "Cuándo salen los programas electorales del 29-N"')
s = s.replace('"href": "/elecciones/quiere-algun-partido-quitar-las-pensiones",\n"label": "¿Quiere algún partido quitar las pensiones?"',
              '"href": "/elecciones/quiere-algun-partido-quitar-las-pensiones",\n"label": "¿Qué partido quiere quitar las pensiones?"')
F.write_text(s); print("ok anclas 01742f6")
