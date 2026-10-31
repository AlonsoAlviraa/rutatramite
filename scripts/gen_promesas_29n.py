import json, re
D = json.load(open('data/promesas-29n/promises.json'))
UPD = D['updated']
P = {p['id']: p for p in D['parties']}
ORDER = [p['id'] for p in D['parties']]
TOP = D['topics']
PR = D['promises']
BASE = '/elecciones/promesas'
RD = {"label": "BOE: Real Decreto 806/2026, convocatoria del 29-N", "href": "https://www.boe.es/eli/es/rd/2026/10/05/806"}
NOTE = ("Contenido informativo y neutral. Mismo formato para todos los partidos, ordenados por votos en las generales de 2023. "
        "Cada medida enlaza a su fuente con fecha; si un partido no ha publicado nada, lo indicamos como «pendiente de programa». "
        "No recomendamos ningún voto.")
STYPE = {"oficial-partido": "web oficial del partido", "oficial-gobierno": "fuente oficial del Gobierno", "prensa": "prensa (sin documento oficial del partido)"}
PROFILES = {
 "estudiante": ("Estudiantes", "estudiantes", "/ayudas-por-gobierno/estudiantes"),
 "familia": ("Familias con hijos", "familias con hijos", "/ayudas-por-gobierno/familias"),
 "joven-alquiler": ("Jóvenes y alquiler", "jóvenes que alquilan o quieren comprar", "/ayudas-por-gobierno/jovenes-alquiler"),
 "jubilado": ("Jubilados y pensionistas", "jubilados y pensionistas", "/ayudas-por-gobierno/jubilados"),
 "autonomo": ("Autónomos", "autónomos", "/ayudas-por-gobierno/autonomos"),
 "parado": ("Personas en paro", "personas en paro", "/ayudas-por-gobierno/desempleados"),
 "dependencia": ("Discapacidad y dependencia", "personas con discapacidad o dependencia", "/ayudas-por-gobierno/discapacidad-dependencia"),
}
CCAA = [
 ("andalucia","Andalucía",60,"comun"),("aragon","Aragón",13,"comun"),("asturias","Asturias",7,"comun"),("illes-balears","Illes Balears",8,"comun"),
 ("canarias","Canarias",15,"canarias"),("cantabria","Cantabria",5,"comun"),("castilla-y-leon","Castilla y León",31,"comun"),
 ("castilla-la-mancha","Castilla-La Mancha",21,"comun"),("cataluna","Cataluña",48,"comun"),("comunitat-valenciana","Comunitat Valenciana",33,"comun"),
 ("extremadura","Extremadura",9,"comun"),("galicia","Galicia",23,"comun"),("madrid","Comunidad de Madrid",38,"comun"),("murcia","Región de Murcia",10,"comun"),
 ("navarra","Navarra",5,"foral"),("pais-vasco","País Vasco",18,"foral"),("la-rioja","La Rioja",4,"comun"),("ceuta","Ceuta",1,"ceutamelilla"),("melilla","Melilla",1,"ceutamelilla")]
assert sum(c[2] for c in CCAA) == 350
LOIRPF = "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764"
LIVA = "https://www.boe.es/buscar/act.php?id=BOE-A-1992-28740"
REGIME = {
 "comun": "Régimen fiscal común: el IRPF tiene un tramo estatal y otro autonómico, y el Impuesto de Transmisiones (ITP) de la vivienda usada lo fija la comunidad. Vivienda, educación y sanidad son competencias de la comunidad.",
 "foral": "Régimen foral: la Hacienda foral tiene su propio IRPF e ITP, así que las rebajas del IRPF estatal no se aplican directamente aquí. Vivienda, educación y sanidad son competencias propias.",
 "canarias": "Canarias no aplica el IVA, sino el IGIC (impuesto canario). Las rebajas de IVA no se trasladan solas: haría falta un cambio del IGIC. El IRPF y el ITP funcionan como en el régimen común.",
 "ceutamelilla": "Ceuta y Melilla no aplican el IVA, sino el IPSI, y sus residentes tienen una deducción especial en el IRPF (art. 68.4 de la Ley del IRPF). La sanidad y la educación las gestiona el Estado, no la ciudad.",
}
def apply_in(pr, reg):
    tax = pr.get('tax') or ''; lvl = pr['level']
    if 'itp' in tax and 'iva' in tax:
        return "En parte: el ITP depende de " + ("la Hacienda foral" if reg == 'foral' else "la comunidad") + ("; y aquí no hay IVA, sino " + ("IGIC" if reg == 'canarias' else "IPSI") + "." if reg in ('canarias', 'ceutamelilla') else "; el IVA es estatal.")
    if 'iva' in tax and reg in ('canarias', 'ceutamelilla'):
        return "No aplica tal cual: aquí no hay IVA (" + ("IGIC" if reg == 'canarias' else "IPSI") + ")."
    if 'irpf' in tax and reg == 'foral':
        return "No directamente: el IRPF es foral; dependería de la Hacienda foral."
    if 'itp' in tax:
        return "En parte: el ITP lo fija " + ("la Hacienda foral." if reg == 'foral' else "la comunidad autónoma.")
    if 'autonómica' in lvl:
        return {"vivienda": "Sí, pero necesita a la comunidad: la vivienda y la gestión son competencia autonómica.",
                "sanidad": "Sí, pero necesita a la comunidad: la gestión de la sanidad es competencia autonómica (en Ceuta y Melilla, del Estado).",
                "educacion": "Sí, pero necesita a la comunidad: la gestión de la educación es competencia autonómica (en Ceuta y Melilla, del Estado)."}.get(pr['topic'], "Sí, pero necesita a la comunidad: la gestión es competencia autonómica.")
    return "Sí: es una medida estatal, igual en toda España."
def apply_kind(pr, reg):
    t = apply_in(pr, reg)
    if t.startswith("Sí: "): return "igual"
    if t.startswith("Sí, pero"): return "comunidad"
    return "parcial"
REGNAME = {"comun": "regimen_comun", "foral": "pais_vasco_navarra", "canarias": "canarias", "ceutamelilla": "ceuta_melilla"}
def src(pr):
    return {"label": f"{pr['source_title']} ({fmtdate(pr['source_date'])}, {STYPE[pr['source_type']]})", "href": pr['source_url']}
MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
def fmtdate(s):
    p = s.split('-')
    if len(p) == 2: return f"{MESES[int(p[1])-1]} de {p[0]}"
    return f"{int(p[2])} de {MESES[int(p[1])-1]} de {p[0]}"
def pname(pid): return P[pid]['name']
def short(pid): return {"pp":"PP","psoe":"PSOE","vox":"Vox","frente-amplio":"Frente Amplio","podemos":"Podemos","democracia-21":"Democracia 21"}[pid]
NP = len(ORDER)
ALLP = ", ".join(short(o) for o in ORDER[:-1]) + " y " + short(ORDER[-1])
def runs_in(pid, slug): return slug in P[pid].get('circunscripciones', [slug])
def who(pr): return pr.get('who')
def fitdesc(s):
    s = re.sub(r'\s+', ' ', s).strip()
    pad = " Fuentes y fecha de cada medida."
    if len(s) < 110: s = s + pad
    if len(s) < 110: s = s + " Neutral y actualizado."
    if len(s) > 158: s = s[:155].rsplit(' ', 1)[0].rstrip(',;:') + "…"
    assert 110 <= len(s) <= 158, (len(s), s)
    return s
def impact_text(pr):
    k = pr.get('impact')
    if k == 'iva6':
        return ("Cálculo: pasar del 10 % al 4 % ahorra el 6 % del precio de una vivienda nueva. Con 150.000 € serían 9.000 €; con 200.000 €, 12.000 €; con 250.000 €, 15.000 €. "
                "Solo vale para vivienda nueva comprada al promotor (la usada paga ITP, no IVA) y no aplica en Canarias, Ceuta ni Melilla, que no tienen IVA. Base legal del IVA: Ley 37/1992.")
    if k == 'tucasa':
        return ("Cálculo: el préstamo es el 20 % del valor con un tope de 50.000 €. Para 150.000 € serían 30.000 €; para 200.000 €, 40.000 €; desde 250.000 €, 50.000 €. "
                "Es un préstamo al 0 % que se devuelve, no una ayuda a fondo perdido; los requisitos finales los fija un acuerdo posterior del Consejo de Ministros.")
    if k == 'alquiler10':
        return ("Cálculo: el 10 % del alquiler pagado en el año. Con 600 € al mes (7.200 € al año) serían 720 €; con 800 € al mes, 960 €. Solo para rentas inferiores a 33.007,20 € al año. "
                "La nota oficial no detalla un tope de deducción: compruébalo en el BOE. En País Vasco y Navarra no aplica, porque su IRPF es foral.")
    return None
G = []
def guide(slug, h1, title, desc, lead, sections, faqs, related, sources, cta=None, pack="promesas-29n", path=None):
    g = {"id": "p29n-" + slug, "pack": pack, "reviewedAt": UPD, "path": path or f"{BASE}/{slug}", "h1": h1, "title": title,
         "description": fitdesc(desc), "lead": lead, "cta": cta or {"href": f"{BASE}", "label": "Ver todas las promesas del 29-N"},
         "secondaryCta": {"href": "/elecciones", "label": "Guía para votar el 29-N"}, "sources": sources, "related": related,
         "disclaimer": NOTE, "faqs": faqs, "sections": sections}
    G.append(g); return g
def rows_for(prs, cols):
    return [{"cells": c(pr), "source": {"label": fmtdate(pr['source_date']), "href": pr['source_url']}} for pr in prs for c in [cols]]
def uniq_sources(prs):
    seen = {}; 
    for pr in prs: seen.setdefault(pr['source_url'], src(pr))
    return [RD] + list(seen.values())
PEND = "Pendiente de programa: a {d} no hemos encontrado ninguna medida concreta de este partido sobre este tema en su web oficial ni en declaraciones públicas fechadas."
COMMON_REL = [{"href": BASE, "label": "Promesas del 29-N: todas las medidas"}, {"href": f"{BASE}/metodologia", "label": "Cómo elaboramos esta comparativa"}, {"href": "/elecciones", "label": "Elecciones del 29-N: cómo votar"}, {"href": "/ayudas-por-gobierno", "label": "Ayudas según cada gobierno desde 1996"}]
def party_table(prs, cap, extra=None):
    head = ["Partido", "Medida", "Tipo de fuente"] + ([extra[0]] if extra else []) + ["Fuente"]
    rows = []
    for pr in prs:
        cells = [short(pr['party']), pr['measure'], STYPE[pr['source_type']]] + ([extra[1](pr)] if extra else [])
        rows.append({"cells": cells, "source": {"label": f"{pr['source_title']}, {fmtdate(pr['source_date'])}", "href": pr['source_url']}})
    return {"caption": cap, "head": head, "rows": rows}
dU = fmtdate(UPD)
# ---- topics (comparators)
TOPIC_SLUG = {"vivienda":"vivienda","impuestos":"impuestos","empleo":"empleo-y-salarios","inmigracion":"inmigracion","administracion":"burocracia-y-cita-previa","pensiones":"pensiones","sanidad":"sanidad","educacion":"educacion","instituciones":"instituciones-y-gasto-publico"}
LGS = {"label": "BOE: Ley 14/1986, General de Sanidad", "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1986-10499"}
LOE = {"label": "BOE: Ley Orgánica 2/2006, de Educación", "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899"}
TOPIC_EXTRA = {
 "sanidad": {"id": "quien-decide", "title": "Quién decide en sanidad: Estado y comunidades", "paragraphs": [
   "La Ley General de Sanidad (Ley 14/1986) organiza el Sistema Nacional de Salud como el conjunto de los servicios de salud del Estado y de las comunidades autónomas. El Estado fija las bases y la coordinación general de la sanidad (artículo 149.1.16.ª de la Constitución); la gestión de hospitales y centros de salud corresponde a cada comunidad. En Ceuta y Melilla la gestiona el Estado, a través del Instituto Nacional de Gestión Sanitaria (INGESA).",
   "Por eso muchas promesas sanitarias de unas generales necesitan después el acuerdo o la gestión de la comunidad autónoma: listas de espera, plantillas y conciertos dependen sobre todo del servicio de salud de tu comunidad."]},
 "educacion": {"id": "quien-decide", "title": "Quién decide en educación: Estado y comunidades", "paragraphs": [
   "La Ley Orgánica de Educación (LOE, Ley Orgánica 2/2006) fija la ordenación general del sistema educativo, los títulos y las enseñanzas mínimas. Las comunidades autónomas gestionan los centros, el profesorado y buena parte del currículo; en Ceuta y Melilla lo gestiona el Ministerio de Educación.",
   "Un objetivo estatal, como reducir el abandono escolar, se aplica en la práctica con programas acordados con las comunidades autónomas."]},
}
TOPIC_SRC = {"sanidad": [LGS], "educacion": [LOE]}
for t, tname in TOP.items():
    prs = [p for p in PR if p['topic'] == t]
    secs = []
    for pid in ORDER:
        mine = [p for p in prs if p['party'] == pid]
        paras = [f"Candidato o líder: {P[pid]['leader']}. Programa para el 29-N: {P[pid]['programa29n']}." + ((" " + P[pid]['nota']) if P[pid].get('nota') else "")]
        if mine:
            paras += [(f"«{p['quote']}» ({who(p)}; fuente: {p['source_title']})." if who(p) else f"«{p['quote']}» ({p['source_title']}, {fmtdate(p['source_date'])}).") for p in mine]
            for p in mine:
                it = impact_text(p)
                if it: paras.append(it)
            sec = {"id": pid, "title": f"{pname(pid)}", "paragraphs": paras, "table": party_table(mine, f"{short(pid)}: medidas sobre {tname.lower()}")}
        else:
            sec = {"id": pid, "title": f"{pname(pid)}", "paragraphs": paras + [PEND.format(d=dU)]}
        secs.append(sec)
    n = len({p['party'] for p in prs})
    if t in TOPIC_EXTRA: secs.append(TOPIC_EXTRA[t])
    secs.append({"id": "como-leer", "title": "Cómo leer esta comparativa", "paragraphs": [D['order_rule'], "Que un partido tenga más filas no significa que su propuesta sea mejor: solo refleja cuántas medidas concretas ha publicado hasta ahora. Las marcadas como «prensa» no tienen todavía un documento oficial del partido."]})
    G.append(None); G.pop()
    guide(f"que-propone-cada-partido-{TOPIC_SLUG[t]}",
          f"Qué propone cada partido sobre {tname.lower()} para el 29-N",
          f"{tname}: qué propone cada partido el 29-N",
          f"{tname} el 29-N: qué proponen {ALLP}, con la cita, la fecha y la fuente de cada medida.",
          f"Respuesta corta: {n} de los {NP} partidos que comparamos han concretado algo sobre {tname.lower()} a {dU}, en notas oficiales, mítines o actos; ningún programa completo del 29-N está publicado aún. Abajo, cada partido con sus medidas citadas o marcado como «pendiente de programa».",
          secs,
          [{"q": f"¿Qué partido propone más sobre {tname.lower()}?", "a": "No lo valoramos. Mostramos todas las medidas concretas que cada partido ha publicado o anunciado, con la misma estructura para todos."},
           {"q": "¿Están ya los programas electorales del 29-N?", "a": f"A {dU} ningún partido principal ha publicado su programa completo para el 29-N. Actualizamos esta página cada día."},
           {"q": "¿Por qué algunas medidas pone «prensa»?", "a": "Porque el anuncio solo aparece en medios y no en un documento oficial del partido. Lo indicamos para que sepas cuánto peso darle."}],
          COMMON_REL + [{"href": f"{BASE}/perfil-joven-alquiler", "label": "Cómo te afecta si eres joven y alquilas"}],
          uniq_sources(prs) + TOPIC_SRC.get(t, []))
# ---- parties
for pid in ORDER:
    mine = [p for p in PR if p['party'] == pid]
    secs = [{"id": "ficha", "title": "Ficha", "paragraphs": [f"Líder o candidato: {P[pid]['leader']}.", f"Resultado en 2023: {P[pid]['votes2023']}.", f"Programa para el 29-N: {P[pid]['programa29n']}."] + ([P[pid]['nota']] if P[pid].get('nota') else []) + ["Las candidaturas se proclaman el 2 de noviembre y se publican en el BOE el 3 de noviembre: hasta entonces no hay candidatos oficiales."]}]
    for t, tname in TOP.items():
        m = [p for p in mine if p['topic'] == t]
        if m:
            secs.append({"id": t, "title": tname, "paragraphs": [p['measure'] for p in m] + [x for x in (impact_text(p) for p in m) if x], "table": party_table(m, f"{short(pid)}: {tname.lower()}")})
        else:
            secs.append({"id": t, "title": tname, "paragraphs": [PEND.format(d=dU)]})
    guide(f"partido-{pid}", f"{pname(pid)}: qué promete para el 29-N",
          f"{short(pid)}: promesas y medidas para el 29-N",
          f"Qué propone {short(pid)} para las elecciones del 29-N: vivienda, impuestos, empleo, pensiones, sanidad y más, con la fuente y la fecha de cada medida.",
          f"Respuesta corta: {short(pid)} ha concretado {len(mine)} medida{'s' if len(mine)!=1 else ''} con fuente a {dU}; su programa completo para el 29-N está pendiente. Mismo formato y mismos temas que el resto de partidos.",
          secs,
          [{"q": f"¿Ha publicado {short(pid)} su programa para el 29-N?", "a": f"A {dU}, no. Recogemos lo que ha anunciado con fuente y fecha, y lo sustituiremos por el programa en cuanto se publique."},
           {"q": "¿Cómo eligen qué medidas aparecen?", "a": "Aparecen todas las medidas concretas que hemos encontrado con fuente fechada. No seleccionamos por relevancia ni por afinidad."},
           {"q": "¿Por qué este orden de partidos?", "a": D['order_rule']}],
          COMMON_REL + [{"href": f"{BASE}/partido-{o}", "label": f"Qué promete {short(o)}"} for o in ORDER if o != pid][:3],
          uniq_sources(mine) + [{"label": f"Web oficial de {short(pid)}", "href": P[pid]['web']}])
# ---- otros
guide("otros-partidos", "Otros partidos del 29-N: ERC, Junts, Bildu, PNV, BNG y más", "Otros partidos del 29-N: qué proponen",
      "ERC, Junts, EH Bildu, PNV, BNG, Coalición Canaria, UPN y nuevos partidos en el 29-N: estado de sus programas y cuándo se conocerán las candidaturas.",
      f"Respuesta corta: a {dU} ninguno de estos partidos ha publicado su programa para el 29-N. Los añadiremos con el mismo formato cuando lo hagan o cuando el BOE publique las candidaturas proclamadas (3 de noviembre).",
      [{"id": "lista", "title": "Estado de cada partido", "paragraphs": [f"{o}: pendiente de programa." for o in D['others']]},
       {"id": "criterio", "title": "Por qué no tienen ficha propia todavía", "paragraphs": ["Damos ficha propia a los partidos con grupo estatal relevante en 2023 y a Democracia 21, que se presenta como alternativa estatal aunque solo concurre en Madrid y Barcelona. Las propuestas de mítines de los demás partidos están en la página de programas y mítines del 29-N."]}],
      [{"q": "¿Cuándo se sabe qué partidos se presentan?", "a": "Las candidaturas se presentan del 21 al 26 de octubre y el BOE publica las proclamadas el 3 de noviembre."},
       {"q": "¿Aparecen en mi papeleta los partidos que solo van en otras provincias?", "a": "No: en las generales cada provincia tiene sus propias listas, así que solo verás las candidaturas presentadas en la tuya."}],
      COMMON_REL, [RD])
# ---- CCAA
for slug, name, dip, reg in CCAA:
    rows = []
    for pid in ORDER:
        mine = [p for p in PR if p['party'] == pid]
        if not runs_in(pid, slug):
            rows.append({"cells": [short(pid), "No presenta candidatura en esta comunidad", "No aplica: solo concurre en Madrid y Barcelona"], "source": {"label": "Junta Electoral Central: coaliciones", "href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales"}})
            continue
        if not mine:
            rows.append({"cells": [short(pid), "Pendiente de programa", "—"], "source": {"label": "Web del partido", "href": P[pid]['web']}})
        for p in mine:
            rows.append({"cells": [short(pid), p['measure'], apply_in(p, reg)], "source": {"label": f"{p['source_title']}, {fmtdate(p['source_date'])}", "href": p['source_url']}})
    summary = []; cnt = {"igual": 0, "comunidad": 0, "parcial": 0}
    for pid in ORDER:
        c = {"igual": 0, "comunidad": 0, "parcial": 0}
        mine = [p for p in PR if p['party'] == pid]
        if not runs_in(pid, slug):
            summary.append({"cells": [short(pid), "0 (no se presenta en esta comunidad)", "0", "0", "0", "No aplica: solo concurre en Madrid y Barcelona"], "source": {"label": "Junta Electoral Central: coaliciones", "href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales"}})
            continue
        for p in mine: c[apply_kind(p, reg)] += 1
        for k in cnt: cnt[k] += c[k]
        prog = P[pid]['programa29n']
        summary.append({"cells": [short(pid), str(len(mine)) if mine else "0 (pendiente de programa)", str(c['igual']), str(c['comunidad']), str(c['parcial']), prog], "source": {"label": ("Programa oficial" if prog.startswith("http") else f"Web oficial de {short(pid)}"), "href": prog if prog.startswith("http") else P[pid]['web']}})
    HERE = [pid for pid in ORDER if runs_in(pid, slug)]
    PRH = [p for p in PR if p['party'] in HERE]
    pend = [short(pid) for pid in HERE if not P[pid]['programa29n'].startswith("http")]
    pend_txt = ("Ningún partido de esta comparativa ha publicado aún su programa completo del 29-N." if len(pend) == len(HERE) else ("Programa completo pendiente: " + ", ".join(pend) + ".") if pend else "")
    nota = {"canarias": "En Canarias, las propuestas de bajar el IVA (vivienda nueva, alimentos) no se aplicarían tal cual.",
            "ceutamelilla": f"En {name}, las propuestas de bajar el IVA no se aplicarían tal cual, porque allí rige el IPSI.",
            "foral": f"En {name}, las rebajas del IRPF estatal (por ejemplo, para jóvenes o deflactar la tarifa) no se aplicarían directamente.",
            "comun": f"En {name} se aplican todas las medidas estatales; las de vivienda y el ITP dependen además del gobierno autonómico."}[reg]
    guide(f"comunidad-{slug}", f"Promesas del 29-N y cómo afectarían en {name}", f"Promesas electorales del 29-N en {name}",
          f"Cómo afectarían en {name} las promesas del 29-N de cada partido: impuestos, vivienda, sanidad y competencias. Elige {dip} diputados.",
          f"Respuesta corta (datos a {dU}): {name} elige {dip} diputado{'s' if dip!=1 else ''} el 29-N (BOE, RD 806/2026). De las {len(PRH)} medidas con fuente que han anunciado los {len(HERE)} partidos de esta comparativa que se presentan aquí, {cnt['igual']} se aplicarían igual en {name}, {cnt['comunidad']} necesitarían además al gobierno autonómico y {cnt['parcial']} solo en parte o no tal cual. {pend_txt} {nota}",
          [{"id": "resumen", "title": f"Resumen por partido en {name}", "paragraphs": [f"Última actualización de los datos: {dU}. Cada partido aparece con las mismas columnas y en el mismo orden (votos en 2023). Un número mayor solo indica que el partido ha concretado más medidas hasta ahora, no que sean mejores o peores para {name}.", "Datos descargables: /datos/promesas-29n.csv y /datos/promesas-29n.json (cada medida con su cita, enlace y fecha, y cómo se aplica en cada régimen territorial)."], "table": {"caption": f"Medidas anunciadas para el 29-N y cómo se aplicarían en {name}, por partido (a {dU})", "head": ["Partido", "Medidas con fuente", "Igual que en el resto de España", "Necesitan también a la comunidad", "Solo en parte o no tal cual aquí", "Programa del 29-N"], "rows": summary}},
           {"id": "que-se-vota", "title": f"Qué se vota en {name} el 29-N", "paragraphs": [f"Se eligen {dip} diputado{'s' if dip!=1 else ''} al Congreso y los senadores de la circunscripción. No hay elecciones autonómicas convocadas para ese día por el Real Decreto 806/2026."]},
           {"id": "competencias", "title": "Qué decide el Estado y qué decide tu comunidad", "paragraphs": [REGIME[reg], "Por eso una misma promesa estatal puede notarse distinto según dónde vivas. La columna «¿Se aplicaría aquí?» lo explica medida a medida."]},
           {"id": "tabla", "title": f"Todas las medidas y si se aplicarían en {name}", "paragraphs": [D['order_rule']], "table": {"caption": f"Promesas del 29-N y su aplicación en {name}", "head": ["Partido", "Medida", "¿Se aplicaría aquí?", "Fuente"], "rows": rows}}],
          [{"q": f"¿Cuántos diputados elige {name}?", "a": f"{dip}, según el anexo del Real Decreto 806/2026 de convocatoria."},
           {"q": f"¿Se vota también el parlamento de {name} el 29-N?", "a": "No. El Real Decreto 806/2026 solo convoca elecciones al Congreso y al Senado."},
           {"q": "¿Por qué una promesa no se aplicaría en mi comunidad?", "a": "Porque algunos impuestos o competencias son autonómicos o forales, o porque en tu territorio no rige el IVA (Canarias, Ceuta y Melilla)."},
           {"q": f"¿Cuántas medidas del 29-N se aplicarían igual en {name}?", "a": f"A {dU}, {cnt['igual']} de {len(PRH)} medidas anunciadas con fuente se aplicarían igual que en el resto de España, {cnt['comunidad']} necesitarían también al gobierno autonómico y {cnt['parcial']} solo en parte o no tal cual. La tabla «Resumen por partido» lo desglosa partido a partido."},
           {"q": "¿Cuándo se actualizaron estos datos y puedo descargarlos?", "a": f"Última actualización: {dU}. Revisamos las webs oficiales de los partidos y el BOE y, cuando se publique un programa, lo enlazamos aquí. Los datos completos están en /datos/promesas-29n.csv y /datos/promesas-29n.json; puedes reutilizarlos citando a RutaTrámite y la fuente original de cada medida."}],
          COMMON_REL, [RD, {"label": "BOE: Ley 35/2006 del IRPF", "href": LOIRPF}, {"label": "BOE: Ley 37/1992 del IVA", "href": LIVA}])
# ---- profiles
for k, (label, lower, ayg) in PROFILES.items():
    prs = [p for p in PR if k in p['profiles']]
    secs = []
    for pid in ORDER:
        m = [p for p in prs if p['party'] == pid]
        if m:
            secs.append({"id": pid, "title": pname(pid), "paragraphs": [p['measure'] for p in m] + [x for x in (impact_text(p) for p in m) if x], "table": party_table(m, f"{short(pid)}: medidas que afectan a {lower}")})
        else:
            secs.append({"id": pid, "title": pname(pid), "paragraphs": [PEND.format(d=dU)]})
    secs.append({"id": "historia", "title": "Qué hicieron los gobiernos anteriores", "paragraphs": [f"Para comparar promesas con hechos, consulta qué ayudas creó y recortó cada gobierno desde 1996 para {lower}, con su norma del BOE: {ayg}."]})
    guide(f"perfil-{k}", f"Promesas del 29-N para {lower}: qué propone cada partido", f"29-N para {label.lower()}: qué te afectaría",
          f"Qué cambiaría para {lower} con las promesas del 29-N de cada partido, con su fuente y con cálculos cuando hay datos oficiales.",
          f"Respuesta corta: {len({p['party'] for p in prs})} de los {NP} partidos que comparamos tienen alguna medida publicada que afecta a {lower} a {dU}. Abajo, todas, con su fuente y, cuando se puede calcular con datos oficiales, cuánto supondría.",
          secs,
          [{"q": f"¿Qué partido es mejor para {lower}?", "a": "No hacemos esa valoración. Te mostramos qué propone cada uno y, cuando es posible, cuánto supondría, para que decidas tú."},
           {"q": "¿De dónde salen los cálculos?", "a": "Solo calculamos cuando la medida da cifras exactas (porcentajes, topes) y aplicamos la operación a precios de ejemplo. El método está en la página de metodología."},
           {"q": "¿Y si vivo en Canarias, País Vasco, Navarra, Ceuta o Melilla?", "a": "Algunas medidas fiscales no se aplican igual. Consulta la página de tu comunidad."}],
          COMMON_REL + [{"href": ayg, "label": f"Ayudas para {lower} según cada gobierno"}], uniq_sources(prs))
# ---- metodologia
guide("metodologia", "Metodología de las promesas del 29-N: fuentes, orden y actualizaciones", "Metodología: cómo comparamos las promesas del 29-N",
      "Cómo elaboramos la comparativa de promesas del 29-N: qué fuentes valen, cómo ordenamos los partidos, cuándo calculamos impactos y cómo actualizamos.",
      "Respuesta corta: solo recogemos medidas concretas con fuente fechada, con el mismo formato para todos los partidos, sin valorar ni recomendar ningún voto, y revisamos los datos cada día.",
      [{"id": "que-fuentes", "title": "Qué fuentes usamos", "paragraphs": ["1) Programa electoral oficial del 29-N (cuando exista). 2) Notas de prensa y documentos en la web oficial del partido. 3) Fuentes oficiales del Gobierno o del BOE cuando la medida ya está aprobada y el partido promete mantenerla. 4) Prensa, solo si no hay documento oficial; lo marcamos como «prensa».", "Cada medida guarda: partido, tema, medida en lenguaje sencillo, cita literal, enlace, fecha, tipo de fuente, perfiles afectados, nivel de competencia (estatal, autonómica o municipal) y coste si el partido lo da."]},
       {"id": "orden", "title": "Orden y simetría", "paragraphs": [D['order_rule'], "Todos los partidos tienen las mismas secciones en el mismo orden. Si un partido no ha publicado nada sobre un tema, la sección aparece igual con «pendiente de programa»."]},
       {"id": "calculos", "title": "Cuándo calculamos el impacto", "paragraphs": ["Solo cuando la medida da cifras exactas y la operación no necesita suposiciones: por ejemplo, IVA del 10 % al 4 % (ahorro = 6 % del precio), préstamo del 20 % con tope de 50.000 € o deducción del 10 % del alquiler. Mostramos la fórmula y precios de ejemplo. En el resto, la explicación es cualitativa.", "No usamos encuestas, estimaciones de terceros ni cifras sin fuente. Si un partido da su propio cálculo, lo atribuimos al partido."]},
       {"id": "territorio", "title": "Cómo decidimos si una medida se aplica en tu comunidad", "paragraphs": ["Usamos reglas fijas: las rebajas de IVA no se aplican tal cual en Canarias (IGIC), Ceuta ni Melilla (IPSI); las del IRPF estatal no se aplican directamente en País Vasco ni Navarra (IRPF foral); el ITP y la vivienda dependen de la comunidad."]},
       {"id": "actualizacion", "title": "Actualización diaria", "paragraphs": [f"Revisamos cada día las webs oficiales de los partidos, el BOE y la Junta Electoral Central. Cuando un partido publique su programa, sustituimos sus anuncios por el texto del programa. Última revisión: {dU}.", "¿Ves un error o una medida que falta? Escríbenos desde la página de contacto con el enlace a la fuente."]}],
      [{"q": "¿Sois de algún partido?", "a": "No. RutaTrámite es una web de trámites independiente y no recomienda ningún voto."},
       {"q": "¿Por qué no aparece ClaimReview ni verificaciones?", "a": "Porque no juzgamos si una promesa es verdadera o viable: solo la explicamos y la citamos."},
       {"q": "¿Puedo reutilizar los datos?", "a": "Sí, citando a RutaTrámite y la fuente original de cada medida."}],
      [{"href": BASE, "label": "Promesas del 29-N"}, {"href": "/metodologia", "label": "Metodología general de RutaTrámite"}, {"href": "/elecciones", "label": "Elecciones del 29-N"}], [RD])
json.dump(G, open('data/promesas-29n/pages.json', 'w'), ensure_ascii=False)
EXP = {"name": "Promesas electorales del 29-N (elecciones generales 2026) por partido y su aplicación territorial", "updated": UPD, "publisher": "RutaTrámite", "url": "https://rutatramite.com/elecciones/promesas", "methodology": "https://rutatramite.com/elecciones/promesas/metodologia", "license": "Reutilización libre citando a RutaTrámite y la fuente original de cada medida", "election": D['election'], "order_rule": D['order_rule'], "parties": D['parties'], "others": D['others'], "topics": D['topics'],
       "territories": [{"id": s_, "name": n_, "diputados": d_, "regimen": REGNAME[r_]} for s_, n_, d_, r_ in CCAA],
       "promises": [dict(p, aplicacion={REGNAME[r]: apply_in(p, r) for r in REGIME}) for p in PR]}
json.dump(EXP, open('data/promesas-29n/export.json', 'w'), ensure_ascii=False, indent=1)
paths = [g['path'] for g in G]
assert len(set(paths)) == len(paths); assert len({g['title'] for g in G}) == len(G)
print(len(G))
