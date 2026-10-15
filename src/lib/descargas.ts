import fs from "node:fs";
import path from "node:path";

export type DescargaVertical = "empadronamiento" | "extranjeria" | "menores" | "hacienda" | "registro-civil";

export type Descarga = {
  file: string;
  bytes: number;
  sha256: string;
  verified: string;
  vertical: DescargaVertical;
  vertical_label: string;
  title: string;
  kind: "formulario" | "guia";
  purpose: string;
  source_url: string;
  source_name: string;
  related_guides: string[];
  guide_prefixes: string[];
};

export type DescargasManifest = {
  generated: string;
  policy: string;
  online_only: string[];
  files: Descarga[];
};

/** Orden editorial de los grupos en la página /descargas. */
export const DESCARGA_VERTICAL_ORDER: DescargaVertical[] = [
  "empadronamiento",
  "extranjeria",
  "menores",
  "hacienda",
  "registro-civil",
];

let cache: DescargasManifest | null = null;

export function loadDescargasManifest(): DescargasManifest {
  if (cache) return cache;
  const p = path.join(process.cwd(), "public", "pdf", "manifest.json");
  cache = JSON.parse(fs.readFileSync(p, "utf8")) as DescargasManifest;
  return cache;
}

export function descargasByVertical(): { vertical: DescargaVertical; label: string; items: Descarga[] }[] {
  const files = loadDescargasManifest().files;
  return DESCARGA_VERTICAL_ORDER.map((vertical) => ({
    vertical,
    label: files.find((f) => f.vertical === vertical)?.vertical_label ?? vertical,
    items: files.filter((f) => f.vertical === vertical),
  })).filter((group) => group.items.length > 0);
}

/** Una asociación debe corresponder al trámite y territorio concretos. */
export function descargasForGuide(guidePath: string): Descarga[] {
  return loadDescargasManifest().files.filter(
    (f) => f.related_guides.includes(guidePath),
  );
}
