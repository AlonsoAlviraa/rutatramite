import fs from "node:fs";

export const REVIEWS = JSON.parse(fs.readFileSync(new URL("../../src/lib/data/escenarios-revisados.json", import.meta.url), "utf8"));

function stripHtmlComments(input) {
  let previous = "";
  let current = input;
  while (current !== previous) {
    previous = current;
    current = current.replace(/<!--[\s\S]*?-->/g, "");
  }
  return current;
}

/** Manual revisions replace length targets with an explicit editorial contract. */
export function validateReviewed(slug, raw) {
  const review = REVIEWS[slug];
  if (!review) throw new Error(`No reviewed profile: ${slug}`);
  const md = stripHtmlComments(raw.replace(/\r\n/g, "\n")).trim();
  const errors = [];
  if (!md.startsWith(`# ${review.h1}\n`)) errors.push("H1 revisado ausente");
  const headings = [...md.matchAll(/^## (.+)$/gm)].map(m => m[1]);
  if (JSON.stringify(headings) !== JSON.stringify(review.headings)) errors.push("Secciones revisadas ausentes o desordenadas");
  const answers = [...md.matchAll(/^### (.+)\n([\s\S]*?)(?=^#{1,3} |$(?![\s\S]))/gm)].map(m => ({q:m[1],body:m[2].trim()}));
  if (JSON.stringify(answers.map(a => a.q)) !== JSON.stringify(review.questions)) errors.push("Preguntas revisadas incompletas");
  if (answers.some(a => !a.body)) errors.push("Respuesta vacía");
  for (const link of review.requiredLinks) {
    if (!md.includes(`](${link})`) && !md.includes(`](${link}#`)) errors.push(`Falta fuente o ruta: ${link}`);
  }
  for (const term of review.requiredTerms) {
    if (!md.toLowerCase().includes(term.toLowerCase())) errors.push(`Falta el caso revisado: ${term}`);
  }
  for (const url of md.match(/https?:\/\/[^\s)]+/g) ?? []) {
    if (!["www.boe.es", "idapadron.ine.es", "sede.madrid.es", "www.madrid.es"].includes(new URL(url).hostname)) errors.push(`Fuente no permitida: ${url}`);
  }
  if (!/^\d+\. /m.test(md) || !/^\|.+\|$/m.test(md)) errors.push("Faltan pasos o tabla de decisiones");
  return { errors, answers, total: md.split(/\s+/).length };
}
