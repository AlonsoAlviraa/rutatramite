"""1-11-2026: pasa a pasado el plazo del 31-10 en /trabajo/autonomos-cambio-base-cotizacion-2027.
No cambia URL, title, description ni H1. Se niega a ejecutarse antes del 1-11-2026 (hora de Madrid). Idempotente."""
import pathlib, sys, datetime, zoneinfo
if datetime.datetime.now(zoneinfo.ZoneInfo("Europe/Madrid")).date() < datetime.date(2026, 11, 1):
    sys.exit("Todavía es 31-10 o antes: el texto actual es correcto hoy. Ejecutar el 1-11.")
F = pathlib.Path(__file__).resolve().parents[1] / "src/lib/tramites/autonomos-verifactu-20261025.ts"
s = F.read_text()
REPL = [
    ("Si lo pides hasta el 31 de octubre, se aplica ya el 1 de noviembre de 2026.",
     "El periodo anterior, con efectos el 1 de noviembre de 2026, terminó el 31 de octubre."),
    ("Si lo pides antes, hasta el 31 de octubre, el cambio se aplica el 1 de noviembre de 2026.",
     "Las solicitudes presentadas hasta el 31 de octubre de 2026 se aplicaron el 1 de noviembre de 2026."),
    ("Si quieres que el cambio se note ya en noviembre, tienes hasta el sábado 31 de octubre de 2026.",
     "El plazo para que el cambio se aplicara el 1 de noviembre de 2026 terminó el sábado 31 de octubre; lo que pidas ahora se aplica el 1 de enero de 2027."),
    ("(este periodo acaba el 31-10-2026)", "(este periodo terminó el 31-10-2026)"),
]
n = 0
for a, b in REPL:
    if a in s: s = s.replace(a, b); n += 1
    elif b not in s: sys.exit(f"Texto no encontrado: {a[:60]}")
F.write_text(s); print("cambios:", n)
