"""25-10-2026 · /elecciones/huelga-general-sindicatos: la convocatoria ya se registró (19-10, RTVE), CEOE anuncia impugnación,
propuesta sindical de servicios mínimos en transporte (22-10) y enlace a la guía práctica de derechos. Idempotente."""
import json, pathlib
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/actualidad-20261006.ts"
s = F.read_text(); i = s.find('"path": "/elecciones/huelga-general-sindicatos"'); assert i > 0
a = s.rfind("\n", 0, i) + 1; b = s.find("\n", i); line = s[a:b]
pre = line[: len(line) - len(line.lstrip())]; body = line.strip(); comma = body.endswith(",")
g = json.loads(body.rstrip(","))
T0 = (g["title"], g["h1"], g["description"])
RTVE = {"href": "https://www.rtve.es/noticias/20261019/sindicatos-registran-ministerio-huelga-general-11-noviembre/17272505.shtml", "label": "RTVE, 19 de octubre de 2026: los sindicatos registran la huelga general y la CEOE anuncia que la impugnará"}
FESMC = {"href": "https://www.fesmcugt.org/noticias/actualidad/ricardo-casas-los-servicios-minimos-en-el-transporte-tienen-que-garantizar-lo-esencial-no-garantizar-la-normalidad", "label": "FeSMC-UGT, 22 de octubre de 2026: UGT y CCOO presentan a Transportes su propuesta de servicios mínimos"}
g["lead"] = ("CCOO, UGT, CGT, CNT y otras organizaciones, con el Sindicato de Inquilinas, registraron el 19 de octubre en el Ministerio de Trabajo una huelga general de 24 horas para el miércoles 11 de noviembre de 2026, por la vivienda y los salarios, dos días antes de que empiece la campaña electoral. "
             "La CEOE ha anunciado que la impugnará. A 25 de octubre no se han publicado los servicios mínimos.")
g["reviewedAt"] = "2026-10-25"
g["disclaimer"] = "No somos un sindicato ni la autoridad laboral. Esta ficha resume información publicada hasta el 25 de octubre de 2026. Los servicios mínimos los fija cada administración competente."
for f in g["faqs"]:
    if f["q"] == "¿Quién la convoca?":
        f["a"] = "Según RTVE, el 19 de octubre registraron la convocatoria en el Ministerio de Trabajo CCOO, UGT, CGT, CNT, la Unión de Actores y Actrices y otras tres organizaciones, con el Sindicato de Inquilinas. RTVE añade que CIG, ELA y LAB presentan su propia convocatoria."
    if f["q"] == "¿Habrá servicios mínimos?":
        f["a"] = "Sí. Los fija cada administración competente (el Ministerio de Transportes en el transporte estatal, las comunidades autónomas en sus servicios). A 25 de octubre de 2026 no se ha publicado ninguna resolución; UGT y CCOO presentaron el 22 de octubre a Transportes su propuesta para el transporte."
if not any(f["q"].startswith("¿Es legal") for f in g["faqs"]):
    g["faqs"].insert(3, {"q": "¿Es legal la huelga del 11-N?", "a": "Está registrada y es legal mientras un juez no diga lo contrario. La CEOE anunció el 19 de octubre que la impugnará porque considera que sus motivos no son laborales; los sindicatos sostienen que la convocan por salarios y vivienda y que no es partidista (RTVE). El Real Decreto-ley 17/1977 considera ilegal la huelga por motivos políticos o ajenos al interés profesional de los trabajadores."})
for x in g["sections"]:
    if x["id"] == "lo-que-se-sabe":
        x["title"] = "Lo que se sabe a 25 de octubre"
        x["paragraphs"] = [
            "RTVE informó el 7 de octubre de que CCOO y UGT, junto al Sindicato de Inquilinas, acordaban una huelga general de 24 horas el miércoles 11 de noviembre, por la vivienda y los salarios.",
            "El 19 de octubre, los convocantes registraron la huelga en el Ministerio de Trabajo. Según RTVE, entre sus reivindicaciones laborales están subidas salariales de entre el 4 % y el 7 % y de al menos el 7 % para el salario mínimo. Ese mismo día, el presidente de la CEOE, Antonio Garamendi, anunció que la impugnará; Unai Sordo (CCOO) respondió que «todas las huelgas generales son políticas, pero no quiere decir que [esta] sea partidista».",
            "El 22 de octubre, FeSMC-UGT y FSC-CCOO presentaron al Ministerio de Transportes su propuesta de servicios mínimos para el transporte. La resolución oficial aún no se ha publicado.",
            "El comunicado de UGT del 6 de octubre vinculaba la huelga a salarios con los que acceder a una vivienda y a un decálogo de vivienda: pacto de Estado, parque público, límite del precio del alquiler y aplicación de la Ley por el Derecho a la Vivienda.",
            "Si vas a hacer huelga o trabajas ese día, la guía práctica explica qué te descuentan, quién puede hacerla y qué pasa si te designan para los servicios mínimos."]
for y in (RTVE, FESMC):
    if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].insert(1, y)
R = {"href": "/trabajo/huelga-general-11-noviembre", "label": "Huelga del 11-N: derechos, descuento y servicios mínimos"}
if not any(z["href"] == R["href"] for z in g["related"]): g["related"].insert(0, R)
assert (g["title"], g["h1"], g["description"]) == T0
s = s[:a] + pre + json.dumps(g, ensure_ascii=False) + ("," if comma else "") + s[b:]
F.write_text(s); print("ok huelga /elecciones 25-10")
