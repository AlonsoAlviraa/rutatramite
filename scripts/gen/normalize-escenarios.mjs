// Normalización tipográfica de los escenarios generados:
//  - comillas rectas "..." → latinas «...»
//  - línea en blanco tras cada H3 de FAQ
//  - colapsa líneas en blancas múltiples
//  - sincroniza la copia del pack
// Uso: node scripts/gen/normalize-escenarios.mjs

import fs from "node:fs";
import path from "node:path";
import { BRIEFS } from "./escenarios-briefs.mjs";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const CONTENT_DIR = path.join(ROOT, "content", "escenarios");
const PACK_DIR = path.join(ROOT, "pack", "rutatramite-empadronamiento-agent-pack", "05_content", "escenarios");

let changed = 0;
for (const brief of BRIEFS) {
  const p = path.join(CONTENT_DIR, `${brief.slug}.md`);
  if (!fs.existsSync(p)) continue;
  const original = fs.readFileSync(p, "utf8");
  const normalized = original
    .replace(/"([^"\n]{1,80})"/g, "«$1»")
    .replace(/(###[^\n]+)\n(?!\n)/g, "$1\n\n")
    .replace(/\n{3,}/g, "\n\n");
  if (normalized !== original) {
    fs.writeFileSync(p, normalized, "utf8");
    changed++;
    console.log(`normalizado ${brief.slug}`);
  }
  fs.writeFileSync(path.join(PACK_DIR, `${brief.slug}.md`), fs.readFileSync(p, "utf8"), "utf8");
}
console.log(`\n${changed} archivo(s) modificados; copias de pack sincronizadas.`);
