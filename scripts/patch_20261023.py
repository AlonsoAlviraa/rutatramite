"""23-10-2026: complemento brecha de género en /trabajo/revalorizacion-pensiones-2026 y servicios mínimos en la huelga 11-N. Idempotente."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[1] / "src/lib/tramites"
LGSS = {"label": "BOE: Ley General de la Seguridad Social, artículo 60 (complemento de brecha de género)", "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a60"}
INFO = {"label": "Seguridad Social: complemento para la reducción de la brecha de género", "href": "https://prestaciones.seg-social.es/servicio/complemento-brecha.html"}
C155 = {"label": "Seguridad Social: modelo C-155 de solicitud del complemento (PDF)", "href": "https://www.seg-social.es/wps/wcm/connect/wss/998ebcc5-4ef9-4bdd-bcc4-7add27a12894/C-155_Castellano_4+%287%29.pdf?MOD=AJPERES"}
RDL3 = {"label": "BOE: Real Decreto-ley 3/2026, de 3 de febrero (revalorización de pensiones 2026)", "href": "https://www.boe.es/eli/es/rdl/2026/02/03/3"}
SEC = {"id": "brecha-genero", "title": "Complemento de brecha de género: requisitos y cómo pedirlo",
 "paragraphs": [
  "Es un importe fijo por cada hijo que se suma a la pensión contributiva de jubilación, incapacidad permanente o viudedad (artículo 60 de la Ley General de la Seguridad Social). En 2026 son 36,90 € al mes por hijo, en 14 pagas, con un máximo de cuatro hijos (147,60 € al mes).",
  "Cada hijo da derecho a un solo complemento, que cobra el progenitor con la pensión más baja. No se paga con la jubilación parcial: se reconoce al pasar a la jubilación completa. Tampoco con pensiones no contributivas.",
  "Ejemplo: Carmen se jubila con dos hijos. Si su pensión es la más baja de la pareja, cobra 2 × 36,90 = 73,80 € más al mes, 1.033,20 € al año."],
 "table": {"caption": "Quién puede cobrar el complemento de brecha de género", "head": ["Situación", "Requisito", "Fuente"], "rows": [
  {"cells": ["Mujer con pensión de jubilación, incapacidad permanente o viudedad", "Haber tenido uno o más hijos (biológicos o adoptados). No hace falta acreditar que interrumpió su carrera."], "source": LGSS},
  {"cells": ["Hombre con pensión de viudedad", "Que algún hijo en común cobre pensión de orfandad, y que su pensión sea más baja que la de la madre."], "source": LGSS},
  {"cells": ["Hombre con jubilación o incapacidad permanente, hijos nacidos hasta 1994", "Más de 120 días sin cotizar entre los nueve meses antes del nacimiento y los tres años después (o desde la adopción), y pensión más baja que la de la madre."], "source": LGSS},
  {"cells": ["Hombre con jubilación o incapacidad permanente, hijos nacidos desde 1995", "Que la suma de sus bases de cotización de los 24 meses siguientes al nacimiento sea más de un 15 % inferior a la de los 24 meses anteriores, y pensión más baja que la de la madre."], "source": LGSS},
  {"cells": ["Importe 2026", "36,90 € al mes por hijo, hasta cuatro hijos"], "source": RDL3}]},
 "lists": [[
  "Si pides ahora la pensión, marca el complemento en la misma solicitud.",
  "Si ya cobras la pensión y no lo tienes, pídelo con el modelo C-155 en la sede electrónica de la Seguridad Social (certificado digital o Cl@ve), sin certificado en run.gob.es, por correo o con cita en un CAISS (901 10 65 70 o 91 541 25 30).",
  "Adjunta el libro de familia o el certificado del Registro Civil con los hijos.",
  "Los hombres que lo pidan por haber interrumpido su carrera deben poder acreditarlo; la Seguridad Social lo comprueba con su vida laboral."]]}
FAQS = [
 {"q": "¿Cuánto es el complemento de brecha de género en 2026?", "a": "36,90 € al mes por cada hijo, en 14 pagas y con un máximo de cuatro hijos, es decir, hasta 147,60 € al mes (Real Decreto-ley 3/2026 y artículo 60 de la Ley General de la Seguridad Social)."},
 {"q": "¿Cómo se pide el complemento de brecha de género si ya estoy jubilado?", "a": "Con el modelo C-155 de la Seguridad Social, en la sede electrónica, en run.gob.es sin certificado digital, por correo o con cita en un CAISS. Hay que adjuntar el libro de familia o el certificado del Registro Civil con los hijos."},
 {"q": "¿Pueden cobrarlo los hombres?", "a": "Sí, en tres casos: si cobran viudedad y un hijo en común cobra orfandad, o si en su jubilación o incapacidad permanente acreditan que su carrera se interrumpió o sus cotizaciones bajaron tras el nacimiento. En todos los casos su pensión debe ser más baja que la de la madre."}]
def guides(f):
    s = f.read_text(); i = s.index("= [") + 2; j = s.rindex("]") + 1
    return s, i, j, json.loads(s[i:j])
f = R / "jubilacion-2026.ts"; s, i, j, d = guides(f)
g = next(x for x in d if x["path"] == "/trabajo/revalorizacion-pensiones-2026")
if not any(x["id"] == "brecha-genero" for x in g["sections"]):
    k = next(n for n, x in enumerate(g["sections"]) if x["id"] == "comprobar")
    g["sections"].insert(k, SEC)
    g["faqs"] += FAQS
    for src in (LGSS, INFO, C155):
        if src not in g["sources"]: g["sources"].append(src)
    g["reviewedAt"] = "2026-10-23"
    f.write_text(s[:i] + json.dumps(d, ensure_ascii=False, indent=1) + s[j:])
    print("pensiones: ok")
h = R / "maricarmen-huelga-11n.ts"; t = h.read_text()
if "const FESMC" not in t:
    t = t.replace('const row = (', 'const FESMC = { href: "https://www.fesmcugt.org/noticias/actualidad/ricardo-casas-los-servicios-minimos-en-el-transporte-tienen-que-garantizar-lo-esencial-no-garantizar-la-normalidad", label: "FeSMC-UGT, 22-10-2026: UGT y CCOO presentan a Transportes su propuesta de servicios mínimos" };\n\nconst row = (', 1)
    a = t.index('id: "trabajo-huelga-general-11n"')
    seg = t[a:]
    seg = seg.replace('reviewedAt: "2026-10-22"', 'reviewedAt: "2026-10-23"', 1)
    seg = seg.replace('sources: [UGT, EDIARIO,', 'sources: [UGT, FESMC, EDIARIO,', 1)
    seg = seg.replace('''      {
        id: "descuento",''', '''      {
        id: "servicios-minimos",
        title: "Servicios mínimos del 11-N: estado a 23 de octubre",
        paragraphs: [
          "A 23-10-2026 no se ha publicado ninguna resolución oficial de servicios mínimos para el 11-N. Los fija cada administración competente (el Ministerio de Transportes en el transporte estatal, las comunidades autónomas en sus servicios) y suelen publicarse en los días previos a la huelga.",
          "El 22-10-2026, FeSMC-UGT y FSC-CCOO presentaron al Ministerio de Transportes y Movilidad Sostenible su propuesta de servicios mínimos para el transporte. Según FeSMC-UGT, piden que sean proporcionados y que garanticen los servicios esenciales sin impedir el seguimiento de la huelga.",
          "Si tu empresa te designa para cubrir servicios mínimos, debes acudir; si no te designa, puedes hacer huelga con normalidad. Esta sección se actualizará cuando se publiquen las resoluciones.",
        ],
      },
      {
        id: "descuento",''', 1)
    seg = seg.replace('    faqs: [\n', '    faqs: [\n      { q: "¿Hay ya servicios mínimos para la huelga del 11-N?", a: "A 23-10-2026 no se han publicado. UGT y CCOO presentaron el 22-10 al Ministerio de Transportes su propuesta para el transporte; cada administración fija los suyos y suelen conocerse en los días previos." },\n', 1)
    t = t[:a] + seg
    assert t.count("id: \"servicios-minimos\"") == 1 and "FESMC, EDIARIO" in t
    h.write_text(t); print("huelga: ok")
