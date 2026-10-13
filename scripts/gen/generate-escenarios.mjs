// Genera los 12 escenarios nacionales con Gemini Flash (Vertex AI) usando las
// credenciales de gcloud. Dos fases:
//   1) generación + validación estructural (H1/H2, 15 preguntas exactas, sin datos inventados)
//   2) ajuste fino determinista: recorte del total y expansión individual de respuestas cortas
// Antes de escribir en content/ y en el pack se valida también la similitud
// entre archivos y entre respuestas FAQ (anti-clonación).
//
// Uso:
//   node scripts/gen/generate-escenarios.mjs                  # los 12
//   node scripts/gen/generate-escenarios.mjs --only baja,menores
//   node scripts/gen/generate-escenarios.mjs --check          # valida lo ya escrito, sin llamar a la API

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { BRIEFS, H2_SKELETON } from "./escenarios-briefs.mjs";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const CONTENT_DIR = path.join(ROOT, "content", "escenarios");
const PACK_DIR = path.join(ROOT, "pack", "rutatramite-empadronamiento-agent-pack", "05_content", "escenarios");
const DRAFTS_DIR = path.join(ROOT, "scripts", "gen", "_drafts");

const PROJECT = process.env.GCP_PROJECT ?? "project-89d8567f-49f2-48bc-a00";
const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const ENDPOINT = `https://aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/global/publishers/google/models/${MODEL}:generateContent`;

const TOTAL_MIN = 2400;
const TOTAL_MAX = 3550;

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

function accessToken() {
  if (process.env.GCP_TOKEN) return process.env.GCP_TOKEN.trim();
  const candidates = [
    "gcloud auth print-access-token",
    `"C:\\Users\\Mariano\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd" auth print-access-token`,
  ];
  for (const cmd of candidates) {
    try {
      return execSync(cmd, { encoding: "utf8", timeout: 60_000, stdio: ["ignore", "pipe", "ignore"] }).trim();
    } catch {
      /* siguiente candidato */
    }
  }
  throw new Error("No se pudo obtener el token de gcloud. Autentica con `gcloud auth login`.");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const STOPWORDS = new Set(
  ("de la que el en y a los se del las un por con no una su para es al lo como mas mas o pero sus le ya este si porque " +
    "esta entre cuando muy sin sobre tambien me hasta hay donde quien desde todo nos durante todos uno les ni contra " +
    "otros ese eso ante ellos e esto mi antes algunos que unos yo otro otras otra el tanto esa estos usted ustedes " +
    "han haya tiene tienen tengo tenemos puedes puede pueden debe deben debido cosa cosas forma manera cada vez va van " +
    "ser eres soy somos sera sera siempre nunca ahora luego asi asi solo sola solo tale tales cualquier cualquiera").split(/\s+/),
);

function contentTokens(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/<[^>]+>/g, " ")
      .split(/[^a-záéíóúüñ0-9]+/i)
      .filter((w) => w.length >= 3 && !STOPWORDS.has(w) && !/^\d+$/.test(w)),
  );
}

function jaccard(a, b) {
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

const clean = (draft, h1) => {
  let text = draft.replace(/^```(?:markdown|md)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
  const h1Idx = text.indexOf(`# ${h1}`);
  if (h1Idx > 0) text = text.slice(h1Idx); // descarta preámbulos del modelo
  return text.trim() + "\n";
};

const saveDraft = (slug, md) => {
  fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  fs.writeFileSync(path.join(DRAFTS_DIR, `${slug}.md`), md, "utf8");
};

// ---------------------------------------------------------------------------
// Prompt editorial
// ---------------------------------------------------------------------------

function packHeader(slug) {
  return [
    `<!--`,
    `RutaTrámite · escenario nacional «${slug}».`,
    `Escrito una sola vez para todo el Estado (2.000–3.500 palabras). Prohibido el relleno semántico`,
    `y los bloques clónicos (PILLAR_OUTLINE.md y AGENTS.md del pack). Las fichas municipales ≥10k`,
    `NO copian este texto: montan un bloque «Si tu caso es ${slug}» de 150–250 palabras, enlazan aquí`,
    `y añaden la peculiaridad local (modelo propio, cita, sede, canal). No clonar este archivo 769 veces.`,
    `-->`,
  ].join("\n");
}

function buildPrompt(brief) {
  const faqList = brief.faq.map((q) => `- ${q}`).join("\n");
  const enfasis = brief.enfasis.map((e) => `- ${e}`).join("\n");
  const evita = brief.evita.map((e) => `- ${e}`).join("\n");

  return `Eres el editor jefe de RutaTrámite, una publicación española de guías de trámites municipales. Escribes la pieza long-form de uno de sus doce escenarios nacionales de empadronamiento. La pieza se publica tal cual: no es un borrador para otro redactor.

ESCENARIO A ESCRIBIR
Título H1 (úsalo literal): ${brief.h1}
Caso típico con el que abre la pieza: ${brief.casoTipico}
Ángulo editorial: ${brief.angulo}
Puntos que la pieza debe desarrollar (cúmplelos, con tus propias palabras y ampliando):
${enfasis}
Zonas prohibidas (pertenecen a otros escenarios del site; máximo una mención de pasada):
${evita}

ESTILO
- Español de España, registro de periodismo de servicio público: tuteo, frases cortas, terminología administrativa explicada la primera vez que aparece.
- Cada sección aporta información nueva. Prohibido el relleno: nada de párrafos que repitan la misma idea con otras palabras, fórmulas de transición vacías ni conclusión genérica.
- Cero marketing, cero promesas de plazos («en 24 horas», «garantizado»), cero alarmismo.
- El lector vive en un municipio concreto que no conoces: cuando el detalle dependa del ayuntamiento, dilo y explica qué debe mirar en la sede local (modelo propio, cita, canal online), sin inventar nombres de ayuntamientos, URLs, teléfonos, tasas ni plazos.
- Negritas y cursivas: como mucho, tres negritas en todo el texto para conceptos clave. Nada de emojis, tablas ni bloques de código.
- El alta en el padrón es gratuita en toda España: puedes afirmarlo. Cualquier otra cifra de tasas: prohibido.
- Si citas organismos o registros con sigla (INE, CERA, OAC, TIE, NIE, Cl@ve), usa el nombre exacto y su función: no los mezcles ni los agrupes bajo una sigla que no les corresponde. Si dudas de una sigla, escribe el nombre completo sin abreviar.

MARCO LEGAL CITABLE (solo estas referencias; no inventes BOE ni artículos)
${[
  "Artículos 15 a 17 de la Ley 7/1985 (LBRL): obligación de inscribirse donde se reside habitualmente, la inscripción no depende de la situación administrativa, datos obligatorios, certificaciones con carácter de documento público.",
  "RD 1690/1986, Reglamento de Población: gestión, comprobación, altas de oficio, bajas, coordinación con el INE.",
  "Resolución del INE de 30 de enero de 2015 (BOE-A-2015-3109) y Resolución de 17 de febrero de 2020 (BOE-A-2020-4784): instrucciones sobre identidad, acreditación del domicilio, menores y renovación de no comunitarios.",
  "Ley 39/2015, art. 5: representación y autorización entre particulares ante la Administración.",
  "Modelos y hojas padronales del INE: idapadron.ine.es.",
].join("\n")}
${brief.fuentesExtra ? "Referencia adicional permitida para esta pieza: " + brief.fuentesExtra : ""}

ESTRUCTURA OBLIGATORIA (exactamente estos nueve H2, en este orden, sin numerarlos)
${H2_SKELETON.join("\n")}

PRESUPUESTO DE PALABRAS POR SECCIÓN (el total del documento debe quedar entre 2.200 y 2.600 palabras; a partir de 2.900 el control de calidad rechaza la pieza)
- Sin H1 a «El caso típico»: abre con dos párrafos de gancho (100–140 palabras en total) que metan al lector en el caso típico; luego la sección «El caso típico» lo despliega (130–170 palabras).
- «Qué dice la norma (y qué es rumor de ventanilla)»: 180–240 palabras. Contrasta lo que obliga la norma con las prácticas locales que no son ley.
- «Documentos para este caso»: 180–240 palabras, en lista con viñetas; cada documento con una frase de por qué y una de riesgos.
- «Cómo se hace, paso a paso»: lista numerada de 8 a 12 pasos, 210–290 palabras en total; pasos concretos, con la decisión práctica dentro.
- «Errores que retrasan este trámite»: 120–160 palabras, errores específicos de ESTE escenario, no genéricos.
- «Cómo encaja con otros trámites»: 100–140 palabras, los trámites relacionados que de verdad importan en este escenario.
- «Si el ayuntamiento se niega»: 90–120 palabras, motivos de denegación típicos de este escenario y réplica práctica de cada uno.
- «Preguntas frecuentes»: exactamente las 15 preguntas del listado, en el mismo orden, cada una como H3 (###) seguida de su respuesta en un solo párrafo de 130 a 150 palabras. MÍNIMO ESTRICTO: 85 palabras. MÁXIMO ESTRICTO: 150 palabras; cuentalas antes de cerrar el párrafo.
- «Fuentes»: lista con viñetas con las referencias del marco legal citable que apliquen (máximo 5 líneas).

REGLAS DE ORO DE LAS RESPUESTAS FAQ
1. La primera frase responde a la pregunta (sí, no, depende + la respuesta concreta). El desarrollo va después, nunca antes.
2. Cada respuesta es distinta de las demás en enfoque y retórica: una abre con el sí/no, otra con la norma, otra con el caso práctico, otra con el error típico. Prohibido repetir fórmulas de cierre.
3. Prohibido que todas las respuestas citen las mismas leyes: cita solo cuando suma.
4. Ninguna respuesta puede reutilizar párrafos o medios párrafos de otra, ni de otra sección del mismo texto.
5. Está prohibido escribir la fórmula «la respuesta corta depende del ayuntamiento, pero el marco es estable» o cualquier variante clónica de relleno.

PREGUNTAS FAQ (en este orden, literal, cada una acabada en «?»)
${faqList}

FORMATO DE SALIDA
Markdown puro que empieza directamente con la línea «# ${brief.h1}». Sin bloque de código que envuelva el texto, sin frontmatter, sin comentarios, sin notas al editor. Nada antes del H1 ni después de la sección «Fuentes».`;
}

// ---------------------------------------------------------------------------
// Llamadas a Gemini
// ---------------------------------------------------------------------------

async function callGemini(prompt, { temperature = 0.8 } = {}) {
  const token = accessToken();
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature,
      topP: 0.95,
      maxOutputTokens: 32768,
      thinkingConfig: { thinkingBudget: 1024 },
    },
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${detail.slice(0, 300)}`);
  }
  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const text = parts.map((p) => p.text ?? "").join("").trim();
  if (!text) throw new Error(`Respuesta vacía (finishReason=${data?.candidates?.[0]?.finishReason})`);
  return text;
}

async function callWithRetries(fn, label) {
  let lastErr;
  for (let i = 0; i < 3; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      console.error(`  [${label}] intento ${i + 1} fallido: ${String(err.message).slice(0, 200)}`);
      await sleep(8000 * (i + 1));
    }
  }
  throw lastErr;
}

async function repairTrim(brief, md, total) {
  const prompt = `Este es el borrador de «${brief.h1}» para RutaTrámite, con ${total} palabras. Se pasa del máximo de ${TOTAL_MAX}.

Recorta unas ${total - 3200} palabras del CUERPO del artículo (las secciones anteriores a «Preguntas frecuentes»), empezando por las más largas: condensa redundancias, elimina calificativos y frases duplicadas. NO toques la sección «Preguntas frecuentes» ni la de «Fuentes», no cambies el orden de secciones ni añadas información nueva. Devuelve el documento COMPLETO corregido en markdown puro, empezando por el H1.

BORRADOR:

${md}`;
  return callWithRetries(() => callGemini(prompt, { temperature: 0.4 }), "recorte");
}

async function expandAnswer(brief, q, body) {
  const prompt = `Esta respuesta FAQ de la pieza «${brief.h1}» (RutaTrámite) está demasiado corta (${wordCount(
    body,
  )} palabras; exigido 80–150, ideal 100–120).

PREGUNTA: ${q}
RESPUESTA ACTUAL: ${body}

Reescribe la respuesta manteniendo su primera frase (la que ya responde) y añade profundidad real: un matiz práctico, una excepción frecuente o el paso siguiente si la ventanilla se atasca. Sin relleno, sin repetir la pregunta, sin fórmulas clónicas de cierre. Devuelve SOLO el párrafo final, sin el H3 ni comillas. Objetivo: 110–130 palabras, nunca más de 140.`;
  return callWithRetries(() => callGemini(prompt, { temperature: 0.6 }), "expandir");
}

async function shortenAnswer(brief, q, body) {
  const prompt = `Esta respuesta FAQ de la pieza «${brief.h1}» (RutaTrámite) se pasa de longitud (${wordCount(
    body,
  )} palabras; máximo 150, ideal 100–120).

PREGUNTA: ${q}
RESPUESTA ACTUAL: ${body}

Condénsala sin perder la primera frase (la que responde) ni la información útil: quita redundancias y calificativos. Devuelve SOLO el párrafo final, sin el H3 ni comillas. Objetivo: 100–120 palabras.`;
  return callWithRetries(() => callGemini(prompt, { temperature: 0.4 }), "acortar");
}

// ---------------------------------------------------------------------------
// Validación
// ---------------------------------------------------------------------------

const URL_ALLOW = /(idapadron)\.ine\.es|boe\.es|BOE-A-/i;
const BANNED_PHRASES = [
  "la respuesta corta depende del ayuntamiento, pero el marco es estable",
  "no pagues la cita. no uses webs que imitan al gobierno",
];

function extractFaqAnswers(md) {
  const answers = [];
  const re = /^### (.+)$/gm;
  let m;
  while ((m = re.exec(md)) !== null) {
    const after = md.slice(re.lastIndex);
    const nextH = after.search(/^#{1,3} /m);
    const body = (nextH === -1 ? after : after.slice(0, nextH)).trim();
    answers.push({ q: m[1].trim(), body });
  }
  return answers;
}

function validateDoc(brief, rawMd) {
  const md = rawMd.replace(/<!--[\s\S]*?-->/g, "").trim() + "\n";
  const errors = [];
  if (!md.startsWith(`# ${brief.h1}`)) errors.push(`El documento no empieza con el H1 literal «${brief.h1}»`);
  for (const h2 of H2_SKELETON) {
    if (!md.includes(`\n${h2}\n`)) errors.push(`Falta o está mal escrito el H2 «${h2}»`);
  }
  const h2Order = H2_SKELETON.map((h2) => md.indexOf(h2));
  if (h2Order.some((p) => p === -1) || h2Order.some((p, i) => i > 0 && p < h2Order[i - 1])) {
    errors.push("Los H2 no están en el orden exigido");
  }
  if (!/empadron/i.test(md)) errors.push('El texto no contiene la palabra "empadron"');

  const answers = extractFaqAnswers(md);
  if (answers.length !== 15) errors.push(`Hay ${answers.length} respuestas FAQ (###) en lugar de 15`);
  const norm = (s) => s.toLowerCase().replace(/[¿?]/g, "").replace(/\s+/g, " ").trim();
  brief.faq.forEach((q, i) => {
    const got = answers[i]?.q;
    if (!got || norm(got) !== norm(q)) {
      errors.push(`FAQ ${i + 1}: la pregunta no coincide con el brief. Esperaba «${q}» y llegó «${got ?? "—"}»`);
    }
  });
  answers.forEach((a, i) => {
    const wc = wordCount(a.body);
    if (wc < 80 || wc > 150) {
      errors.push(`LONGITUD|FAQ ${i + 1}|${a.q}|${wc}`);
    }
  });

  const total = wordCount(md);
  if (total < TOTAL_MIN || total > TOTAL_MAX) {
    const sectionInfo = md
      .split(/^## /m)
      .slice(1)
      .map((s) => {
        const title = s.slice(0, s.indexOf("\n")).trim();
        return { title, wc: wordCount(s.slice(s.indexOf("\n"))) };
      })
      .sort((a, b) => b.wc - a.wc)
      .slice(0, 3)
      .map((s) => `${s.title}: ${s.wc}`)
      .join("; ");
    errors.push(`LONGITUD|TOTAL|${total} palabras (margen ${TOTAL_MIN}–${TOTAL_MAX}); secciones más largas: ${sectionInfo}`);
  }

  for (const url of md.match(/https?:\/\/[^\s)]+/g) ?? []) {
    if (!URL_ALLOW.test(url)) errors.push(`URL no permitida: ${url}`);
  }
  for (const money of md.match(/\d+([.,]\d+)?\s*€/g) ?? []) {
    if (!/^0([.,]0*)?\s*€/.test(money)) errors.push(`Cifra de dinero no permitida: ${money}`);
  }
  if (/(?:\+34\s?)?[89]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/.test(md)) errors.push("Parece haber un número de teléfono");
  const lower = md.toLowerCase();
  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase)) errors.push(`Frase clónica prohibida presente: «${phrase}»`);
  }
  return { errors, answers, total };
}

const isStructural = (e) => !e.startsWith("LONGITUD|");

function replaceAnswer(md, q, newBody) {
  const re = new RegExp(`(^### ${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n)([\\s\\S]*?)(?=^#{1,3} |$)`, "m");
  if (!re.test(md)) throw new Error(`No se encontró el bloque H3 «${q}» para parchear`);
  return md.replace(re, `$1\n${newBody.trim()}\n`);
}

// ---------------------------------------------------------------------------
// Flujo principal
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const onlyIdx = args.indexOf("--only");
  const only = onlyIdx !== -1 ? args[onlyIdx + 1]?.split(",").map((s) => s.trim()) : null;
  return { only, check: args.includes("--check") };
}

async function generateBrief(brief) {
  console.log(`\n=== ${brief.slug} ===`);
  let md = null;

  const draftPath = path.join(DRAFTS_DIR, `${brief.slug}.md`);
  if (fs.existsSync(draftPath)) {
    const cached = fs.readFileSync(draftPath, "utf8");
    const cachedCheck = validateDoc(brief, cached);
    if (!cachedCheck.errors.length) {
      console.log(`  borrador previo ya válido · ${cachedCheck.total} palabras`);
      return { md: cached.replace(/^# .+\n/, (h) => `${h}\n${packHeader(brief.slug)}\n`), answers: cachedCheck.answers, total: cachedCheck.total };
    }
    if (!cachedCheck.errors.some(isStructural)) {
      console.log(`  retomando borrador previo (solo longitudes por ajustar)`);
      md = cached;
    }
  }

  // Fase 1: generación hasta que la estructura sea válida
  if (md === null) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      console.log(`  generando (intento ${attempt})…`);
      const draft = await callWithRetries(() => callGemini(buildPrompt(brief)), "generación");
      md = clean(draft, brief.h1);
      saveDraft(brief.slug, md);
      const { errors } = validateDoc(brief, md);
      const structural = errors.filter(isStructural);
      if (!structural.length) break;
      console.log(`  errores estructurales:\n    - ${structural.slice(0, 8).join("\n    - ")}`);
      if (attempt === 3) throw new Error(`${brief.slug}: la estructura no converge.\n- ${structural.join("\n- ")}`);
    }
  }

  // Fase 2: ajuste fino determinista, una operación por pasada.
  // Orden: condensar respuestas largas (determinista y barato) → recortar total → expandir cortas.
  for (let pass = 1; pass <= 6; pass++) {
    const { errors, answers, total } = validateDoc(brief, md);
    if (!errors.length) {
      console.log(`  OK · ${total} palabras · 15 respuestas de 80–150`);
      return { md: md.replace(/^# .+\n/, (h) => `${h}\n${packHeader(brief.slug)}\n`), answers, total };
    }
    const structural = errors.filter(isStructural);
    if (structural.length) {
      throw new Error(`${brief.slug}: estructura rota tras los ajustes.\n- ${structural.join("\n- ")}`);
    }
    const longIdx = answers.map((a, i) => ({ i, wc: wordCount(a.body) })).filter((a) => a.wc > 140).map((a) => a.i);
    const shortIdx = answers.map((a, i) => ({ i, wc: wordCount(a.body) })).filter((a) => a.wc < 80).map((a) => a.i);
    const overTotal = total > TOTAL_MAX;
    if (longIdx.length && (overTotal || longIdx.some((i) => wordCount(answers[i].body) > 150))) {
      console.log(`  pasada ${pass}: condensando ${longIdx.length} respuestas largas…`);
      for (const i of longIdx) {
        const a = answers[i];
        md = replaceAnswer(md, a.q, await shortenAnswer(brief, a.q, a.body));
      }
    } else if (overTotal) {
      console.log(`  pasada ${pass}: recorte del total (${total} → objetivo ≤${TOTAL_MAX})…`);
      const trimmed = clean(await repairTrim(brief, md, total), brief.h1);
      if (validateDoc(brief, trimmed).errors.some(isStructural)) {
        console.log("  el recorte rompió la estructura; se descarta");
      } else {
        md = trimmed;
      }
    } else if (shortIdx.length) {
      console.log(`  pasada ${pass}: expandiendo ${shortIdx.length} respuestas cortas…`);
      for (const i of shortIdx) {
        const a = answers[i];
        md = replaceAnswer(md, a.q, await expandAnswer(brief, a.q, a.body));
      }
    } else {
      console.log(`  pasada ${pass}: defectos restantes:\n    - ${errors.join("\n    - ")}`);
      throw new Error(`${brief.slug}: defectos no reparables automáticamente.`);
    }
    saveDraft(brief.slug, md);
  }
  const { errors, total } = validateDoc(brief, md);
  throw new Error(`${brief.slug}: sin converger tras 6 pasadas (${total} palabras).\n- ${errors.join("\n- ")}`);
}

async function main() {
  const { only, check } = parseArgs();
  const briefs = only ? BRIEFS.filter((b) => only.includes(b.slug)) : BRIEFS;
  if (!briefs.length) throw new Error("Ningún brief coincide con --only");

  if (check) {
    console.log("Modo --check: valida los archivos ya presentes en content/escenarios (sin llamar a la API).");
    for (const brief of briefs) {
      const md = fs.readFileSync(path.join(CONTENT_DIR, `${brief.slug}.md`), "utf8");
      const { errors, total } = validateDoc(brief, md);
      if (errors.length) throw new Error(`${brief.slug}:\n- ${errors.join("\n- ")}`);
      console.log(`  ${brief.slug}: OK (${total} palabras, 15 respuestas)`);
    }
    console.log("\n--check: todo correcto.");
    return;
  }
  for (const brief of briefs) {
    const result = await generateBrief(brief);
    // Persistencia incremental: cada pieza se escribe en cuanto converge
    const contentPath = path.join(CONTENT_DIR, `${brief.slug}.md`);
    const packPath = path.join(PACK_DIR, `${brief.slug}.md`);
    fs.writeFileSync(contentPath, result.md, "utf8");
    fs.writeFileSync(packPath, result.md, "utf8");
    console.log(`  escrito ${path.relative(ROOT, contentPath)} (+ copia pack)`);
  }

  // Validación cruzada sobre los 12 archivos finales presentes en disco
  console.log(`\n=== validación cruzada (content/escenarios) ===`);
  const slugs = BRIEFS.map((b) => b.slug);
  const disk = new Map();
  for (const slug of slugs) {
    const md = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
    const { answers } = validateDoc(BRIEFS.find((b) => b.slug === slug), md);
    disk.set(slug, { md, answers });
  }
  const crossErrors = [];
  for (const slug of slugs) {
    const answers = disk.get(slug).answers;
    for (let i = 0; i < answers.length; i++) {
      for (let j = i + 1; j < answers.length; j++) {
        const sim = jaccard(contentTokens(answers[i].body), contentTokens(answers[j].body));
        if (sim >= 0.55) crossErrors.push(`${slug}: FAQ ${i + 1} y ${j + 1} casi idénticas (J=${sim.toFixed(2)})`);
      }
    }
  }
  for (let a = 0; a < slugs.length; a++) {
    for (let b = a + 1; b < slugs.length; b++) {
      const A = disk.get(slugs[a]);
      const B = disk.get(slugs[b]);
      for (let i = 0; i < A.answers.length; i++) {
        for (let j = 0; j < B.answers.length; j++) {
          const sim = jaccard(contentTokens(A.answers[i].body), contentTokens(B.answers[j].body));
          if (sim >= 0.5) {
            crossErrors.push(`${slugs[a]} FAQ ${i + 1} ≈ ${slugs[b]} FAQ ${j + 1} (J=${sim.toFixed(2)})`);
          }
        }
      }
      const docSim = jaccard(contentTokens(A.md), contentTokens(B.md));
      if (docSim >= 0.45) crossErrors.push(`${slugs[a]} y ${slugs[b]} demasiado parecidos (J=${docSim.toFixed(2)})`);
    }
  }
  if (crossErrors.length) {
    throw new Error(`Similitud excesiva entre piezas:\n- ${crossErrors.slice(0, 30).join("\n- ")}`);
  }
  console.log("  sin colisiones entre respuestas ni entre documentos");
  console.log("\nHecho.");
}

main().catch((err) => {
  console.error(`\nFALLO: ${err.message}`);
  process.exit(1);
});
