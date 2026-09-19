import fs from "node:fs";
import path from "node:path";
import type { Municipio, MunicipioIndexEntry } from "@/lib/types";
import { isFichaIndexable } from "@/lib/seo/localSignals";

const ROOT = process.cwd();
const reviewPath = path.join(ROOT, "data", "municipal-reviews.json");
const reviews: Record<string, Partial<Municipio>> = fs.existsSync(reviewPath) ? JSON.parse(fs.readFileSync(reviewPath, "utf8")) : {};
function reviewed(m: Municipio): Municipio { return { ...m, ...reviews[m.ine_code] }; }
const INE_POP_URL =
  "https://www.ine.es/dyngs/INEbase/operacion.htm?c=Estadistica_C&cid=1254736177031";

export function dataDir(): string {
  return process.env.MUNICIPIOS_OUT || path.join(ROOT, "data", "municipios");
}

function catalogIndexPath(): string {
  return path.join(ROOT, "data", "catalog", "municipios_index.json");
}

function generatedIndexPath(): string {
  return path.join(ROOT, "src", "lib", "data", "municipios_index.generated.json");
}

function parseIndexFile(p: string): MunicipioIndexEntry[] {
  const raw = JSON.parse(fs.readFileSync(p, "utf8")) as MunicipioIndexEntry[];
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error(`empty municipio index at ${p}`);
  }
  return raw;
}

let cachedIndex: MunicipioIndexEntry[] | null = null;
let cachedByPath: Map<string, MunicipioIndexEntry> | null = null;

export function loadIndex(): MunicipioIndexEntry[] {
  if (cachedIndex) return cachedIndex;
  const live = path.join(dataDir(), "_index.json");
  if (!fs.existsSync(live)) {
    throw new Error("no municipio index at data/municipios/_index.json");
  }
  cachedIndex = parseIndexFile(live).map((entry) => {
    const file = path.join(dataDir(), `${entry.ine_code}.json`);
    const full = reviewed(fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : synthesizeMunicipio(entry));
    return { ...entry, sede_url: full.sede_url, cita_url: full.cita_url, confidence: full.confidence, docs_extra: full.docs_extra ?? [], local_verified: isFichaIndexable(full),
      procedure_docs: full.procedure_docs, certificado_url: full.certificado_url, tramite_alta_url: full.tramite_alta_url };
  });
  return cachedIndex;
}

function pathKey(ccaa: string, provincia: string, municipio: string): string {
  return `${ccaa}/${provincia}/${municipio}`;
}

function indexByPath(): Map<string, MunicipioIndexEntry> {
  if (cachedByPath) return cachedByPath;
  cachedByPath = new Map(loadIndex().map((e) => [pathKey(e.ccaa_slug, e.province_slug, e.slug), e]));
  return cachedByPath;
}

export function synthesizeMunicipio(e: MunicipioIndexEntry): Municipio {
  return {
    ine_code: e.ine_code,
    name: e.name,
    name_official_alt: null,
    slug: e.slug,
    province_code: e.province_code,
    province_name: e.province_name,
    province_slug: e.province_slug,
    ccaa_name: e.ccaa_name,
    ccaa_slug: e.ccaa_slug,
    poblacion: e.poblacion,
    poblacion_ref:
      e.oleada === "E"
        ? "INE Relación de municipios (CodeForSpain/26codmun); población <10.000, cifra concreta a contrastar en ine.es"
        : "INE 1-ene-2025 (vía listado público; contrastar cifra vigente en ine.es)",
    sede_url: e.sede_url,
    tramite_alta_url: null,
    cita_url: e.cita_url,
    certificado_url: null,
    online: "unknown",
    presencial: null,
    cita_previa: "unknown",
    oficinas: [],
    tasa_alta: 0,
    tasa_volante: null,
    tasa_certificado: null,
    docs_extra: e.docs_extra ?? [],
    peculiaridades: [],
    idiomas_sede: ["es"],
    last_verified: e.oleada === "E" ? "2026-09-04" : "2026-09-03",
    source_urls: [INE_POP_URL],
    confidence: e.confidence,
    status: e.status,
    oleada: e.oleada,
    min_words: e.min_words,
    banda: e.oleada === "E" ? "<10k" : null,
    path: e.path,
  };
}

export function loadMunicipio(ineCode: string): Municipio {
  const p = path.join(dataDir(), `${ineCode}.json`);
  if (fs.existsSync(p)) {
    return reviewed(JSON.parse(fs.readFileSync(p, "utf8")) as Municipio);
  }
  const hit = loadIndex().find((e) => e.ine_code === ineCode);
  if (!hit) throw new Error(`municipio ${ineCode} not in index`);
  return reviewed(synthesizeMunicipio(hit));
}

export function loadAllMunicipios(): Municipio[] {
  return loadIndex().map((e) => loadMunicipio(e.ine_code));
}

export function findByPath(ccaa: string, provincia: string, municipio: string): Municipio | null {
  const hit = indexByPath().get(pathKey(ccaa, provincia, municipio));
  return hit ? loadMunicipio(hit.ine_code) : null;
}

export function loadEscenarioMarkdown(slug: string): string {
  const p = path.join(ROOT, "content", "escenarios", `${slug}.md`);
  return fs.readFileSync(p, "utf8");
}

export function schemaPath(): string {
  return path.join(ROOT, "data", "schemas", "municipio.schema.json");
}

export function loadSchema(): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(schemaPath(), "utf8")) as Record<string, unknown>;
}

export function catalogPath(): string {
  return path.join(ROOT, "data", "catalog", "municipios_10k.json");
}
