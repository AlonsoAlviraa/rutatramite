#!/usr/bin/env python3
"""Regenera public/pdf/manifest.json a partir de la tabla FORMS.

Cada entrada documenta el formulario oficial descargado en public/pdf: fuente
exacta, verificación de cabecera %PDF, SHA-256 y las guías donde debe mostrarse
(rutas exactas o prefijos). Ejecutar tras añadir o sustituir un PDF:

    python scripts/build_pdf_manifest.py
"""
from __future__ import annotations

import datetime
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / "public" / "pdf"
OUT = PDF_DIR / "manifest.json"
VERIFIED = "2026-09-14"

MIGRACIONES = "Ministerio de Inclusión, Seguridad Social y Migraciones — Modelos generales"
MIG_BASE = "https://www.inclusion.gob.es/documents/d/migraciones"

FORMS = [
    # Empadronamiento
    ("mad-hoja-padronal.pdf", "empadronamiento", "Hoja padronal de Madrid (alta y cambio de domicilio)",
     "https://sede.madrid.es/UnidadesDescentralizadas/UDCEstadistica/TramitesMunicipales/Ficheros/Hoja_padronal.pdf",
     "Ayuntamiento de Madrid — Trámite de padrón",
     ["/empadronarse/con-contrato", "/empadronarse/sin-contrato", "/empadronarse/cambio-de-domicilio", "/autorizacion-empadronamiento"],
     ["/empadronarse", "/mudanza"]),
    ("cm-hoja-padronal.pdf", "empadronamiento", "Hoja padronal de la Comunidad de Madrid",
     "https://www.madrid.org/usupadron/pdf/hojas/castellano.pdf",
     "Comunidad de Madrid — Padrón municipal",
     [], ["/empadronarse", "/mudanza"]),
    ("mad-autorizacion-empadronamiento.pdf", "empadronamiento", "Autorización para empadronarse en vivienda ajena (Madrid)",
     "https://sede.madrid.es/UnidadesDescentralizadas/UDCEstadistica/TramitesMunicipales/Ficheros/FORMULARIOAUTORIZACIONPARAEMPADRONAMIENTO.pdf",
     "Ayuntamiento de Madrid — Trámite de padrón",
     ["/autorizacion-empadronamiento", "/empadronarse/casa-de-familiar", "/empadronarse/sin-contrato"],
     ["/empadronarse"]),
    # Extranjería (modelos EX)
    ("ex00-estancia.pdf", "extranjeria", "Modelo EX-00 — Autorización de estancia y prórrogas",
     f"{MIG_BASE}/ex00-formulario-autorizacion-de-estancia-de-larga-duracion", MIGRACIONES, [], ["/extranjeria"]),
    ("ex02-reagrupacion.pdf", "extranjeria", "Modelo EX-02 — Residencia temporal por reagrupación familiar",
     f"{MIG_BASE}/ex02.pdf", MIGRACIONES, [], ["/extranjeria"]),
    ("ex04-practicas.pdf", "extranjeria", "Modelo EX-04 — Residencia para prácticas",
     f"{MIG_BASE}/ex04-formulario-autorizacion-de-residencia-para-pacticas", MIGRACIONES, [], ["/extranjeria"]),
    ("ex06-temporada.pdf", "extranjeria", "Modelo EX-06 — Residencia y trabajo de temporada",
     f"{MIG_BASE}/ex06-formulario-autorizacion-de-residencia-y-trabajo-para-actividades-temporada", MIGRACIONES, [], ["/extranjeria"]),
    ("ex07-cuenta-propia.pdf", "extranjeria", "Modelo EX-07 — Residencia temporal y trabajo por cuenta propia",
     f"{MIG_BASE}/ex07-formulario-autorizacion-de-residencia-temporal-y-trabajo-por-cuenta-propia", MIGRACIONES, [], ["/extranjeria"]),
    ("ex09-excepcion-trabajo.pdf", "extranjeria", "Modelo EX-09 — Residencia temporal sin autorización de trabajo",
     f"{MIG_BASE}/ex09-formulario-autorizacion-de-residencia-temporal-con-excepcion-de-la-autorizacion-de-trabajo", MIGRACIONES, [], ["/extranjeria"]),
    ("ex10-circunstancias-excepcionales.pdf", "extranjeria", "Modelo EX-10 — Residencia por circunstancias excepcionales",
     f"{MIG_BASE}/ex10.pdf", MIGRACIONES,
     ["/extranjeria/arraigo-padron"], ["/extranjeria"]),
    ("ex11-larga-duracion.pdf", "extranjeria", "Modelo EX-11 — Residencia de larga duración (y UE)",
     f"{MIG_BASE}/ex11-formulario-autorizacion-de-residencia-de-larga-duracion-o-de-larga-duracion-ue-1", MIGRACIONES, [], ["/extranjeria"]),
    ("ex13-autorizacion-regreso.pdf", "extranjeria", "Modelo EX-13 — Autorización de regreso",
     f"{MIG_BASE}/ex13-formulario-autorizacion-de-regreso-1", MIGRACIONES,
     ["/extranjeria/autorizacion-regreso", "/extranjeria/autorizacion-regreso-ex13", "/extranjeria/autorizacion-regreso-navidad"],
     ["/extranjeria"]),
    ("ex15-nie-certificados.pdf", "extranjeria", "Modelo EX-15 — Solicitud de NIE y certificados",
     f"{MIG_BASE}/ex15-formulario-solicitud-numero-de-identidad-de-extranjero-y-certificados", MIGRACIONES,
     ["/extranjeria/nie", "/extranjeria/nie-vs-nif", "/extranjeria/certificado-digital-nie"], ["/extranjeria"]),
    ("ex16-cedula-inscripcion-titulo-viaje.pdf", "extranjeria", "Modelo EX-16 — Cédula de inscripción o título de viaje",
     f"{MIG_BASE}/ex16-formulario-solicitud-cedula-de-inscripcion-o-titulo-de-viaje", MIGRACIONES,
     ["/extranjeria/tie-caducada-viajar"], ["/extranjeria"]),
    ("ex17-tie.pdf", "extranjeria", "Modelo EX-17 — Tarjeta de identidad de extranjero (TIE)",
     f"{MIG_BASE}/ex17-formulario-solicitud-tarjeta-de-identidad-de-extranjero", MIGRACIONES,
     ["/extranjeria/cita-huellas-tie", "/extranjeria/huellas-que-llevar", "/extranjeria/tie-recogida-cuanto-tarda"],
     ["/extranjeria"]),
    ("ex18-registro-ue.pdf", "extranjeria", "Modelo EX-18 — Inscripción en el Registro de ciudadanos de la UE",
     f"{MIG_BASE}/ex18-formulario-inscripcion-en-el-rce-residencia-ciudadano-de-la-ue-1", MIGRACIONES,
     ["/extranjeria/nie-verde", "/extranjeria/certificado-registro-ue"], ["/extranjeria"]),
    ("ex19-tarjeta-familiar-ue.pdf", "extranjeria", "Modelo EX-19 — Tarjeta de residencia de familiar de ciudadano de la UE",
     f"{MIG_BASE}/ex19-formulario-tarjeta-de-residencia-de-familiar-de-ciudadano-de-la-ue", MIGRACIONES,
     ["/extranjeria/certificado-registro-ue"], ["/extranjeria"]),
    ("ex20-uk-art50.pdf", "extranjeria", "Modelo EX-20 — Residencia (artículo 50 TUE) para nacionales del Reino Unido",
     f"{MIG_BASE}/ex20-formulario-residencia-articulo-50-tue-para-nacionales-del-reino-unido-1", MIGRACIONES,
     ["/dni/viajar-reino-unido"], ["/extranjeria"]),
    ("ex21-uk-familiares.pdf", "extranjeria", "Modelo EX-21 — Artículo 50 TUE para familiares de nacionales del Reino Unido",
     f"{MIG_BASE}/ex21-formulario-residencia-articulo-50-tue-para-3-s-paises-familiares-nacionales-reino-unido-1", MIGRACIONES,
     [], ["/extranjeria"]),
    ("ex22-uk-fronterizo.pdf", "extranjeria", "Modelo EX-22 — Permiso fronterizo del artículo 50 TUE",
     f"{MIG_BASE}/ex22-formulario-permiso-articulo-50-tue-para-trabajador-fronterizo-del-reino-unido-1", MIGRACIONES,
     [], ["/extranjeria"]),
    ("ex23-uk-tarjeta-retirada.pdf", "extranjeria", "Modelo EX-23 — Tarjeta del artículo 18.4 del Acuerdo de Retirada",
     f"{MIG_BASE}/ex23-formulario-solicitud-de-tarjeta-art-18-4-del-acuerdo-de-retirada-", MIGRACIONES,
     [], ["/extranjeria"]),
    ("ex24-familiares-espanoles.pdf", "extranjeria", "Modelo EX-24 — Residencia temporal de familiares de españoles",
     f"{MIG_BASE}/ex24-formulario-autorizacion-de-residencia-temporal-de-familiares-de-personas-con-nacionalidad-espanola-1", MIGRACIONES,
     ["/extranjeria/regularizacion-2026-resolucion"], ["/extranjeria"]),
    ("ex25-menores-desplazamiento.pdf", "extranjeria", "Modelo EX-25 — Residencia y desplazamiento temporal de menores",
     f"{MIG_BASE}/ex25.pdf", MIGRACIONES,
     ["/autorizacion-viaje-menor"], ["/extranjeria"]),
    ("ex26-modificacion.pdf", "extranjeria", "Modelo EX-26 — Modificación de autorización de residencia o estancia",
     f"{MIG_BASE}/ex26-formulario-de-solicitud-modificacion-de-autorizacion-de-residencia-o-estancia-1", MIGRACIONES,
     ["/extranjeria/regularizacion-2026-resolucion"], ["/extranjeria"]),
    ("ex28-dt2-rd1155-2024.pdf", "extranjeria", "Modelo EX-28 — Aplicación de la disposición transitoria 2ª del RD 1155/2024",
     f"{MIG_BASE}/ex28-formulario-solicitud-de-aplicacion-de-la-dt-2-rd-1155-2024", MIGRACIONES,
     ["/extranjeria/regularizacion-2026-resolucion"], ["/extranjeria"]),
    ("ex29-prorroga-corta-duracion.pdf", "extranjeria", "Modelo EX-29 — Prórroga de estancia de corta duración",
     f"{MIG_BASE}/ex29-formulario-solicitud-de-prorroga-de-estancia-de-corta-duracion", MIGRACIONES, [], ["/extranjeria"]),
    ("ex31-arraigo.pdf", "extranjeria", "Modelo EX-31 — Residencia por arraigo",
     f"{MIG_BASE}/ex31-formulario-autorizacion-de-residencia-por-circunstancias-excepcionales-por-razon-de-arraigo.pdf", MIGRACIONES,
     ["/extranjeria/arraigo-padron"], ["/extranjeria"]),
    ("ex32-arraigo-extraordinario.pdf", "extranjeria", "Modelo EX-32 — Residencia por arraigo (DA 21ª)",
     f"{MIG_BASE}/ex32-formulario-autorizacion-de-residencia-circunstancias-excepcionales-arraigo-extraordina-da21-", MIGRACIONES,
     ["/extranjeria/arraigo-padron"], ["/extranjeria"]),
    # DNI y viaje de menores
    ("cnp-autorizacion-viaje-menores.pdf", "menores", "Declaración de permiso de viaje de menores",
     "https://sede.policia.gob.es/portalCiudadano/sede_electronica/ciudadanos/declaracion_permiso_viaje_menores.pdf",
     "Sede electrónica de la Policía Nacional",
     ["/autorizacion-viaje-menor", "/dni/viajar-reino-unido"], ["/pasaporte"]),
    ("cnp-guia-permiso-viaje-menores.pdf", "menores", "Guía del trámite de permiso de viaje de menores",
     "https://sede.policia.gob.es/portalCiudadano/sede_electronica/ciudadanos/guia_tramite_permiso_viaje_menores.pdf",
     "Sede electrónica de la Policía Nacional",
     ["/autorizacion-viaje-menor"], ["/pasaporte"]),
    ("gc-permiso-viaje-menores.pdf", "menores", "Declaración firmada de permiso de viaje de menores (Guardia Civil)",
     "https://web.guardiacivil.es/export/sites/guardiaCivil/documentos/pdfs/2023/PRC_197953_Formulario_declaracixn_firmada_permiso_viaje_fuera_territorio.pdf",
     "Guardia Civil — Formulario de permiso de salida de menores",
     ["/autorizacion-viaje-menor"], ["/pasaporte"]),
    # Hacienda
    ("aeat-modelo-030.pdf", "hacienda", "Modelo 030 — Alta censal, cambio de domicilio y variación de datos",
     "https://sede.agenciatributaria.gob.es/static_files/Sede/Procedimiento_ayuda/G321/mod030_es_es.pdf",
     "Agencia Tributaria — Descarga del modelo 030",
     ["/hacienda/modelo-030", "/modelo-030-cambio-domicilio"], ["/mudanza"]),
    # Registro Civil
    ("justicia-modelo-solicitud-certificado-nacimiento.pdf", "registro-civil", "Modelo de solicitud de certificado de nacimiento",
     "https://www.mjusticia.gob.es/es/Ciudadano/TramitesGestiones/Documents/1292428235421-Modelo_de_Solicitud_de_Certificado_de_Nacimiento_.PDF",
     "Ministerio de Justicia — Certificados del Registro Civil",
     ["/bebe/inscripcion-nacimiento-registro-civil", "/bebe/libro-de-familia-vigente"], ["/bebe"]),
    ("justicia-solicitud-inscripcion-nacimiento-fuera-espana.pdf", "registro-civil", "Solicitud de inscripción de nacimiento de español ocurrido fuera de España",
     "https://www.mjusticia.gob.es/es/Ciudadano/EstadoCivil/Documents/Solicitud%20de%20Incripcion%20de%20Nacimiento%20de%20espannol%20ocurrido%20fuera%20de%20Espanna.pdf",
     "Ministerio de Justicia — Registro Civil",
     ["/bebe/inscripcion-nacimiento-registro-civil"], ["/bebe"]),
]

ONLINE_ONLY = [
    "Tasa 790 código 012 de extranjería: genera el impreso para tu trámite en la sede de la Policía Nacional. No corresponde a las tasas de expedición de DNI o pasaporte.",
    "Becas, ayudas al alquiler y admisión a estudios: consulta el formulario y los canales de presentación de cada convocatoria en su sede oficial.",
    "Padrón: cada ayuntamiento establece sus impresos. Los documentos de Madrid de este catálogo corresponden al municipio de Madrid.",
]

VERTICAL_LABELS = {
    "empadronamiento": "Empadronamiento",
    "extranjeria": "Extranjería",
    "menores": "Viaje de menores",
    "hacienda": "Hacienda",
    "registro-civil": "Registro Civil",
}


def main() -> None:
    files = []
    reviewed = json.loads((ROOT / 'data/pdf-editorial.json').read_text(encoding='utf-8'))['files']
    for name, vertical, title, url, source, guides, prefixes in FORMS:
        editorial = reviewed.get(name)
        if not editorial or not editorial.get('publish'):
            continue
        path = PDF_DIR / name
        if not path.exists():
            raise SystemExit(f"falta el fichero {name}; descárgalo de {url}")
        data = path.read_bytes()
        if data[:5] != b"%PDF-":
            raise SystemExit(f"{name} no es un PDF válido")
        if hashlib.sha256(data).hexdigest() != editorial['sha256']:
            raise SystemExit(f'{name}: el archivo cambió después de la revisión editorial')
        files.append({
            "file": f"pdf/{name}",
            "bytes": len(data),
            "sha256": hashlib.sha256(data).hexdigest(),
            "verified": VERIFIED,
            "vertical": vertical,
            "vertical_label": VERTICAL_LABELS[vertical],
            "title": editorial.get('title', title),
            "kind": editorial.get('kind', 'formulario'),
            "purpose": editorial.get('purpose', 'Comprueba que el procedimiento indicado en la cabecera coincide con el que vas a realizar. Lee todas las páginas, incluidas las instrucciones, antes de completar y firmar el documento.'),
            "source_url": url,
            "source_name": source,
            "related_guides": editorial.get('related_guides', []),
            "guide_prefixes": [],
        })
    manifest = {
        "generated": datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat(),
        "policy": (
            "Formularios oficiales de administraciones públicas españolas, descargados para "
            "consultarlos junto a cada guía. RutaTrámite no es Administración Pública: el "
            "formulario se presenta por el canal del organismo. Las fuentes oficiales "
            "conservan sus condiciones de uso y su versión vigente."
        ),
        "online_only": ONLINE_ONLY,
        "files": files,
    }
    OUT.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"manifiesto: {len(files)} PDFs -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
