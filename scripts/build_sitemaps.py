#!/usr/bin/env python3
"""One urlset at /sitemap.xml. Canonical host from SITE_ORIGIN.

A sitemap index is for files near the 50_000 URL / 50 MB cap. This site is ~1_000
URLs: a single file is what Google documents as the default, and AI crawlers
that fetch robots.txt → Sitemap get every loc in one hop (no index recursion).
"""
from __future__ import annotations

import json
import os
from xml.sax.saxutils import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "data" / "municipios" / "_index.json"
CATALOG_INDEX = ROOT / "data" / "catalog" / "municipios_index.json"
SRC_INDEX = ROOT / "src" / "lib" / "data" / "municipios_index.generated.json"
MUN_DIR = ROOT / "data" / "municipios"
REVIEWS_PATH = ROOT / "data" / "municipal-reviews.json"
REVIEWS = json.loads(REVIEWS_PATH.read_text(encoding="utf-8")) if REVIEWS_PATH.exists() else {}


def load_best_index() -> list:
    if not INDEX.exists():
        raise SystemExit("no municipio index at data/municipios/_index.json")
    rows = json.loads(INDEX.read_text(encoding="utf-8"))
    if not isinstance(rows, list) or not rows:
        raise SystemExit("empty municipio index")
    return rows


def is_ficha_indexable(rec: dict) -> bool:
    """Keep in lockstep with src/lib/seo/localSignals.ts (playbook ≥5 of 7)."""
    n = 0
    sede = rec.get("sede_url") or ""
    if str(sede).startswith("http") and "rutatramite." not in str(sede).lower():
        n += 1
    online = rec.get("online")
    cita_previa = rec.get("cita_previa")
    if online in (True, False, "partial") or cita_previa in (
        "required",
        "recommended",
        "walk-in",
    ):
        n += 1
    if rec.get("cita_url") or cita_previa == "walk-in":
        n += 1
    oficinas = rec.get("oficinas") or []
    if any(str(o.get("direccion") or "").strip() for o in oficinas):
        n += 1
    if any(str(o.get("telefono") or "").strip() for o in oficinas):
        n += 1
    if rec.get("docs_extra"):
        n += 1
    if rec.get("last_verified") and rec.get("source_urls"):
        n += 1
    import re
    evidence = rec.get("evidence") or {}
    supported = all(
        (e := evidence.get(key, {})).get("source_url", "").startswith(("http://", "https://"))
        and "rutatramite." not in e["source_url"].lower()
        and e["source_url"] in rec.get("source_urls", [])
        and re.fullmatch(r"\d{4}-\d{2}-\d{2}", e.get("checked_at", ""))
        for key in ("alta", "docs_extra", "canal")
    )
    return bool(supported and rec.get("tramite_alta_url") and rec.get("docs_extra") and rec.get("status") == "published" and rec.get("confidence") == "official" and n >= 5)


def load_municipio_record(ine_code: str, fallback: dict) -> dict:
    p = MUN_DIR / f"{ine_code}.json"
    if p.exists():
        try:
            rec = json.loads(p.read_text(encoding="utf-8"))
            if isinstance(rec, dict):
                return {**rec, **REVIEWS.get(ine_code, {})}
        except json.JSONDecodeError:
            pass
    return {**fallback, **REVIEWS.get(ine_code, {})}
TERR = ROOT / "data" / "geo" / "territories.json"
PUBLIC = ROOT / "public"


def canonical_origin(raw: str | None) -> str:
    origin = (raw or "https://rutatramite.com").strip().rstrip("/")
    if origin.lower() in {
        "https://rutatramite.es",
        "http://rutatramite.es",
        "https://www.rutatramite.es",
        "http://www.rutatramite.es",
    }:
        return "https://rutatramite.com"
    return origin


ORIGIN = canonical_origin(os.environ.get("NEXT_PUBLIC_SITE_URL", os.environ.get("SITE_ORIGIN", "https://rutatramite.com")))

# Split leftovers from the old index layout — remove so they cannot 200 with stale lists.
LEGACY = ("sitemap-core.xml", "sitemap-provincias.xml", "sitemap-municipios.xml")

CORE = [
    "/recursos/padron-municipal",
    "/ayudas",
    "/transporte",
    "/alquiler",
    "/alquiler/ayudas-por-comunidad",
    "/alquiler/bono-alquiler-joven",
    "/alquiler/plan-vivienda-2026-2030",
    "/alquiler/bono-alquiler-joven-madrid",
    "/alquiler/bono-alquiler-joven-andalucia",
    "/alquiler/ayudas-alquiler-cataluna",
    "/alquiler/decretos-vivienda-derogados-octubre-2026",
    "/alquiler/propuestas-vivienda-6-octubre-2026",
    "/elecciones",
    "/ayudas-por-gobierno",
    "/elecciones/promesas",
    "/elecciones/promesas/que-propone-cada-partido-vivienda",
    "/elecciones/promesas/que-propone-cada-partido-impuestos",
    "/elecciones/promesas/que-propone-cada-partido-empleo-y-salarios",
    "/elecciones/promesas/que-propone-cada-partido-inmigracion",
    "/elecciones/promesas/que-propone-cada-partido-burocracia-y-cita-previa",
    "/elecciones/promesas/que-propone-cada-partido-pensiones",
    "/elecciones/promesas/que-propone-cada-partido-sanidad",
    "/elecciones/promesas/que-propone-cada-partido-educacion",
    "/elecciones/promesas/que-propone-cada-partido-instituciones-y-gasto-publico",
    "/elecciones/promesas/partido-pp",
    "/elecciones/promesas/partido-psoe",
    "/elecciones/promesas/partido-vox",
    "/elecciones/promesas/partido-frente-amplio",
    "/elecciones/promesas/partido-podemos",
    "/elecciones/promesas/partido-democracia-21",
    "/elecciones/promesas/otros-partidos",
    "/elecciones/promesas/comunidad-andalucia",
    "/elecciones/promesas/comunidad-aragon",
    "/elecciones/promesas/comunidad-asturias",
    "/elecciones/promesas/comunidad-illes-balears",
    "/elecciones/promesas/comunidad-canarias",
    "/elecciones/promesas/comunidad-cantabria",
    "/elecciones/promesas/comunidad-castilla-y-leon",
    "/elecciones/promesas/comunidad-castilla-la-mancha",
    "/elecciones/promesas/comunidad-cataluna",
    "/elecciones/promesas/comunidad-comunitat-valenciana",
    "/elecciones/promesas/comunidad-extremadura",
    "/elecciones/promesas/comunidad-galicia",
    "/elecciones/promesas/comunidad-madrid",
    "/elecciones/promesas/comunidad-murcia",
    "/elecciones/promesas/comunidad-navarra",
    "/elecciones/promesas/comunidad-pais-vasco",
    "/elecciones/promesas/comunidad-la-rioja",
    "/elecciones/promesas/comunidad-ceuta",
    "/elecciones/promesas/comunidad-melilla",
    "/elecciones/promesas/perfil-estudiante",
    "/elecciones/promesas/perfil-familia",
    "/elecciones/promesas/perfil-joven-alquiler",
    "/elecciones/promesas/perfil-jubilado",
    "/elecciones/promesas/perfil-autonomo",
    "/elecciones/promesas/perfil-parado",
    "/elecciones/promesas/perfil-dependencia",
    "/elecciones/promesas/metodologia",
    "/elecciones/programas-electorales-29n",
    "/elecciones/iva-vivienda-4-por-ciento",
    "/elecciones/prestamo-tu-casa-50000-euros",
    "/elecciones/deduccion-alquiler-10-por-ciento",
    "/elecciones/prorroga-alquiler-dos-anos",
    "/elecciones/prioridad-nacional-que-es",
    "/elecciones/propuesta-fin-cita-previa",
    "/elecciones/salario-minimo-1800-euros",
    "/elecciones/deflactar-irpf-que-significa",
    "/elecciones/como-se-elige-presidente-gobierno",
    "/elecciones/diputados-por-provincia-29n",
    "/elecciones/contrato-con-espana-pp",
    "/elecciones/voto-nulo-ejemplos",
    "/elecciones/dos-papeletas-en-el-mismo-sobre",
    "/elecciones/papeleta-rota-voto-nulo",
    "/elecciones/escribir-en-la-papeleta",
    "/elecciones/objeto-en-el-sobre-de-votacion",
    "/elecciones/debate-electoral-29n",
    "/elecciones/sorteo-mesa-electoral-29n",
    "/elecciones/excusa-mesa-electoral",
    "/elecciones/modelo-escrito-excusa-mesa-electoral",
    "/elecciones/suplente-mesa-electoral",
    "/elecciones/primero-en-votar-mesa-electoral",
    "/elecciones/excusa-mesa-electoral-denegada",
    "/elecciones/mesa-electoral-casos-especiales",
    "/elecciones/mesa-electoral-vivo-fuera",
    "/elecciones/mesa-electoral-examen-estudiante",
    "/elecciones/mesa-electoral-trabajo-fuera",
    "/elecciones/mesa-electoral-cuidado-familiar-dependiente",
    "/elecciones/mesa-electoral-hijos-pequenos",
    "/elecciones/tarjeta-censal-cuando-llega",
    "/elecciones/no-recibir-propaganda-electoral",
    "/elecciones/candidaturas-29n-boe",
    "/elecciones/cuando-habra-gobierno-29n",
    "/elecciones/cis-preelectoral-29n",
    "/elecciones/que-pasa-si-no-voto",
    "/elecciones/quiere-algun-partido-quitar-las-pensiones",
    "/elecciones/quiere-el-pp-quitar-las-pensiones",
    "/elecciones/quiere-el-psoe-quitar-las-pensiones",
    "/elecciones/quiere-vox-quitar-las-pensiones",
    "/elecciones/encuestas-29n",
    "/elecciones/miente-el-cis",
    "/elecciones/estudio-error-cis-generales",
    "/elecciones/cuanto-vale-tu-voto-por-provincia-29n",
    "/elecciones/sanchez-la-revuelta-29n",
    "/elecciones/agenda-mitines-29n",
    "/elecciones/podcasts-entrevistas-candidatos-29n",
    "/elecciones/voto-util-29n",
    "/elecciones/feijoo-cadena-ser-29n",
    "/trabajo/salario-minimo-irpf-2026",
    "/elecciones/mapa-voto-util-29n",
    "/elecciones/cocina-de-las-encuestas",
    "/elecciones/como-se-hace-una-encuesta-electoral",
    "/elecciones/intencion-directa-vs-estimacion-de-voto",
    "/elecciones/margen-de-error-encuestas",
    "/elecciones/barometro-cis-que-es",
    "/elecciones/aciertos-y-fallos-de-las-encuestas",
    "/elecciones/como-leer-una-encuesta",
    "/elecciones/ficha-tecnica-encuesta",
    "/elecciones/indecisos-y-voto-oculto",
    "/elecciones/encuesta-a-pie-de-urna",
    "/elecciones/por-que-las-encuestas-dan-horquillas-de-escanos",
    "/elecciones/encuestas-falsas-en-redes",
    "/elecciones/mayoria-absoluta-176-escanos",
    "/elecciones/repeticion-electoral",
    "/elecciones/campana-y-precampana",
    "/elecciones/barrera-del-3-por-ciento-y-voto-util",
    "/elecciones/a-quien-beneficia-el-voto-en-blanco",
    "/elecciones/como-comparar-programas-electorales",
    "/elecciones/quiere-frente-amplio-quitar-las-pensiones",
    "/elecciones/quiere-podemos-quitar-las-pensiones",
    "/trabajo",
    "/trabajo/vida-laboral",
    "/trabajo/cita-previa-sepe",
    "/trabajo/ingreso-minimo-vital",
    "/trabajo/revalorizacion-pensiones-2026",
    "/trabajo/como-pedir-la-jubilacion",
    "/trabajo/pension-viudedad-pareja-de-hecho-con-hijos",
    "/trabajo/fondo-garantia-pago-alimentos-300-euros",
    "/dni/clave-registrarse",
    "/dni/certificado-digital-fnmt",
    "/ayudas-por-gobierno/estudiantes",
    "/ayudas-por-gobierno/familias",
    "/ayudas-por-gobierno/jovenes-alquiler",
    "/ayudas-por-gobierno/jubilados",
    "/ayudas-por-gobierno/autonomos",
    "/ayudas-por-gobierno/desempleados",
    "/ayudas-por-gobierno/discapacidad-dependencia",
    "/elecciones/voto-por-correo",
    "/elecciones/calendario-29-noviembre",
    "/elecciones/quien-puede-votar",
    "/elecciones/nuevo-partido-coalicion",
    "/elecciones/huelga-general-sindicatos",
    "/elecciones/pedir-voto-por-correo-por-internet",
    "/elecciones/pedir-voto-por-correo-en-correos",
    "/elecciones/documentacion-voto-por-correo",
    "/elecciones/enviar-voto-por-correo",
    "/elecciones/no-me-llega-voto-por-correo",
    "/elecciones/votar-en-persona-tras-pedir-correo",
    "/elecciones/voto-residentes-extranjero-cera",
    "/elecciones/votar-ley-de-nietos-29n",
    "/elecciones/promesas-incumplidas",
    "/alquiler/caso-maricarmen-desahucio",
    "/trabajo/huelga-general-11-noviembre",
    "/elecciones/voto-temporalmente-fuera-erta",
    "/elecciones/consultar-censo-electoral",
    "/elecciones/donde-voto-mesa-electoral",
    "/elecciones/que-llevar-a-votar",
    "/elecciones/dni-caducado-votar",
    "/elecciones/miembro-de-mesa",
    "/elecciones/miembro-de-mesa-dieta-y-permisos",
    "/elecciones/cuando-se-cobra-la-dieta-de-mesa",
    "/elecciones/voluntario-mesa-electoral",
    "/elecciones/que-pasa-si-no-voy-a-la-mesa",
    "/elecciones/horario-mesa-electoral",
    "/elecciones/permiso-trabajo-para-votar",
    "/elecciones/voto-accesible-braille",
    "/elecciones/votar-hospitalizado-o-enfermo",
    "/elecciones/votar-por-primera-vez",
    "/elecciones/extranjeros-pueden-votar-generales",
    "/elecciones/voto-nulo-y-voto-en-blanco",
    "/elecciones/como-se-reparten-los-escanos",
    "/elecciones/como-votar-al-senado",
    "/elecciones/jornada-de-reflexion",
    "/elecciones/encuestas-prohibidas",
    "/elecciones/interventores-y-apoderados",
    "/elecciones/cambio-de-domicilio-y-censo",
    "/elecciones/resultados-y-escrutinio",
    "/elecciones/junta-electoral-central",
    "/elecciones/bulos-y-fraudes-electorales",
    "/elecciones/preguntas-frecuentes-29n",
    "/elecciones/como-votar-el-dia-29",
    "/becas/ayudas-estudiantes",
    "/becas/apoyo-educativo",
    "/",
    "/empadronarse",
    "/quienes-somos",
    "/metodologia",
    "/fuentes",
    "/aviso-legal",
    "/privacidad",
    "/contacto",
    "/empadronarse/con-contrato",
    "/empadronarse/sin-contrato",
    "/empadronarse/propietario",
    "/empadronarse/casa-de-familiar",
    "/empadronarse/menores",
    "/empadronarse/extranjeros-ue",
    "/empadronarse/extranjeros-no-ue",
    "/empadronarse/sin-hogar",
    "/empadronarse/volante-vs-certificado",
    "/empadronarse/renovacion-2-anos",
    "/empadronarse/cambio-de-domicilio",
    "/empadronarse/me-quieren-cobrar",
    "/empadronarse/cobro-en-el-contrato",
    "/empadronarse/baja",
    "/dni",
    "/dni/cita-previa",
    "/dni/renovar-caducado",
    "/dni/misma-cita-pasaporte",
    "/dni/primera-expedicion-menor",
    "/dni/checklist",
    "/dni/caducado-viajar-ue",
    "/dni/midni",
    "/dni/unidades-moviles",
    "/dni/cambio-domicilio",
    "/pasaporte",
    "/pasaporte/cita-previa",
    "/pasaporte/urgente",
    "/pasaporte/caducado-sin-cita",
    "/mudanza",
    "/hacienda/modelo-030",
    "/extranjeria",
    "/extranjeria/subsanar-regularizacion-correos",
    "/extranjeria/mercurio",
    "/extranjeria/cita-huellas-tie",
    "/extranjeria/certificado-registro-ue",
    "/extranjeria/nie",
    "/extranjeria/arraigo-padron",
    "/extranjeria/autorizacion-regreso",
    "/extranjeria/no-hay-citas",
    "/extranjeria/huellas-sin-citas-barcelona",
    "/extranjeria/tie-caducada-viajar",
    "/extranjeria/autorizacion-regreso-navidad",
    "/extranjeria/regularizacion-2026-resolucion",
    "/dni/no-hay-citas",
    "/dni/a-que-hora-se-liberan-citas",
    "/dni/paginas-clon-cita",
    "/dni/urgente-sin-cita",
    "/dni/perdido-volar",
    "/dni/caducado-multa",
    "/dni/caducado-banco",
    "/dni/caducado-vueling",
    "/pasaporte/bebe",
    "/pasaporte/salvoconducto",
    "/pasaporte/renovar-antes-caducar",
    "/empadronarse/volante-online",
    "/empadronarse/cita-previa-madrid",
    "/colegio",
    "/colegio/cambiar-de-colegio-fuera-de-plazo",
    "/colegio/cambio-de-colegio-por-mudanza",
    "/colegio/documentos-matricula-colegio",
    "/colegio/autorizacion-recogida-menores",
    "/colegio/no-he-matriculado-a-mi-hijo",
    "/comedor",
    "/comedor/beca-comedor-fuera-de-plazo",
    "/comedor/no-puedo-pagar-comedor-escolar",
    "/comedor/documentos-alergia-comedor-escolar",
    "/comedor/impago-comedor-escolar",
    "/comedor/ies-sin-comedor",
    "/fp",
    "/fp/matricula-fp-en-septiembre",
    "/fp/convalidaciones-fp",
    "/bebe",
    "/bebe/tarjeta-sanitaria-bebe",
    "/bebe/cartilla-de-vacunacion-donde-se-saca",
    "/bebe/inscripcion-nacimiento-registro-civil",
    "/becas",
    "/becas/mec",
    "/becas/cobro-al-presentar",
    "/becas/mec/plazo",
    "/becas/mec/modificar-datos",
    "/becas/mec/cuando-se-cobra",
    "/becas/mec/estado",
    "/becas/mec/subsanacion",
    "/becas/mec/alegaciones",
    "/becas/mec/no-cobrada",
    "/becas/mec/denegada/por-patrimonio",
    "/becas/mec/compatibilidad/erasmus",
    "/becas/colaboracion",
    "/becas/autonomicas/beca-salario-gva",
    "/becas/autonomicas/ayudas-estudio-cyl",
    "/dni/consultar-cita",
    "/dni/viajar-reino-unido",
    "/extranjeria/nie-verde",
    "/extranjeria/nie-vs-nif",
    "/extranjeria/huellas-que-llevar",
    "/extranjeria/tie-recogida-cuanto-tarda",
    "/extranjeria/autorizacion-regreso-ex13",
    "/extranjeria/certificado-digital-nie",
    "/extranjeria/aviso-citacion-expediente",
    "/extranjeria/certificado-quien-cobra",
    "/colegio/cambiar-de-colegio-a-mitad-de-curso",
    "/colegio/cambio-de-colegio-por-acoso",
    "/colegio/lista-espera-escuela-infantil",
    "/colegio/escuela-infantil-publica",
    "/colegio/inscripcion-extraescolares-ayuntamiento",
    "/comedor/beca-comedor-2026-2027",
    "/comedor/menu-especial-comedor",
    "/transporte/t16-como-solicitar",
    "/transporte/abono-joven-estudiante",
    "/fp/cambiar-de-instituto-a-mitad-de-curso",
    "/fp/documentos-matricula-eso",
    "/fp/reserva-de-plaza-fp",
    "/bebe/calendario-vacunal-madrid",
    "/bebe/calendario-vacunal-castilla-y-leon",
    "/bebe/calendario-vacunal-por-comunidad",
    "/bebe/calendario-vacunal-andalucia",
    "/bebe/calendario-vacunal-aragon",
    "/bebe/calendario-vacunal-cataluna",
    "/bebe/calendario-vacunal-comunitat-valenciana",
    "/bebe/calendario-vacunal-murcia",
    "/bebe/calendario-vacunal-galicia",
    "/bebe/calendario-vacunal-navarra",
    "/bebe/apoyo-lactancia",
    "/bebe/certificado-vacunacion-descargar",
    "/bebe/cartilla-vacunacion-digital",
    "/bebe/libro-de-familia-vigente",
    "/bebe/prestacion-por-nacimiento",
    "/becas/mec/requisitos",
    "/becas/mec/bachillerato",
    "/becas/fp",
    "/becas/mec/no-devolver",
    "/becas/mec/cambio-estudios",
    "/becas/mec/renuncia",
    "/becas/muface",
    "/becas/residencia",
    "/becas/erasmus",
    "/becas/erasmus/complemento-regional",
    "/modelos",
    "/modelo-baja-voluntaria",
    "/baja-voluntaria-sin-preaviso",
    "/baja-periodo-de-prueba",
    "/modelo-finiquito",
    "/he-firmado-finiquito-puedo-reclamar",
    "/certificado-empresa-sepe",
    "/modelo-excedencia-voluntaria",
    "/modelo-reduccion-jornada",
    "/solicitud-vacaciones",
    "/reclamacion-salarios-modelo",
    "/solicitud-permiso-retribuido",
    "/preaviso-fin-alquiler",
    "/no-renovacion-alquiler",
    "/requerimiento-impago-alquiler",
    "/inventario-fianza-alquiler",
    "/autorizacion-empadronamiento",
    "/declaracion-responsable-padron",
    "/autorizacion-empadronar-menor",
    "/autorizacion-recogida-colegio",
    "/justificante-ausencia-escolar",
    "/solicitud-comedor-escolar",
    "/autorizacion-viaje-menor",
    "/autorizacion-representacion-tramite",
    "/acuse-de-recibo-modelo",
    "/modelo-subsanacion",
    "/modelo-030-cambio-domicilio",
    "/descargas",
    "/recursos",
]


def url_entry(path: str, lastmod: str | None = None) -> str:
    loc = escape(f"{ORIGIN}{path}")
    modified = f"<lastmod>{escape(lastmod)}</lastmod>" if lastmod else ""
    return f"  <url><loc>{loc}</loc>{modified}</url>"


def urlset(entries: list[str]) -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(entries)
        + "\n</urlset>\n"
    )


def main() -> None:
    PUBLIC.mkdir(exist_ok=True)
    index = load_best_index()
    terr = json.loads(TERR.read_text(encoding="utf-8"))
    # Do not label a sitemap regeneration as a content review.
    entries = [url_entry(p, "2026-09-14" if p in ("/empadronarse", "/dni", "/pasaporte", "/recursos") else None) for p in CORE]
    # 2026-10-13: provincias only if they contain an indexable ficha (src/lib/seo/provinciaIndex.ts).
    keep_prov = {f"{m['ccaa_slug']}/{m['province_slug']}" for m in index if is_ficha_indexable(load_municipio_record(m["ine_code"], m))}
    for c in terr["ccaa"]:
        entries.append(url_entry(f"/empadronarse/{c['slug']}"))
        for code in c["province_codes"]:
            p = terr["provinces"][code]
            if f"{c['slug']}/{p['slug']}" in keep_prov:
                entries.append(url_entry(f"/empadronarse/{c['slug']}/{p['slug']}"))
    for m in index:
        rec = load_municipio_record(m["ine_code"], m)
        if is_ficha_indexable(rec):
            entries.append(url_entry(m["path"], rec.get("last_verified")))
    (PUBLIC / "sitemap.xml").write_text(urlset(entries), encoding="utf-8")
    for name in LEGACY:
        p = PUBLIC / name
        if p.exists():
            p.unlink()
    print("Wrote single sitemap.xml", len(entries), "urls origin=", ORIGIN)


if __name__ == "__main__":
    main()
