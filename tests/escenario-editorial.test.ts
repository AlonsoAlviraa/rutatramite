import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ESCENARIO_SLUGS } from "@/lib/types";
import { BRIEFS } from "../scripts/gen/escenarios-briefs.mjs";
import { REVIEWS, validateReviewed } from "../scripts/gen/escenarios-revisados.mjs";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "escenarios");
const PACK_DIR = path.join(
  ROOT,
  "pack",
  "rutatramite-empadronamiento-agent-pack",
  "05_content",
  "escenarios",
);

const H2_SKELETON = [
  "## El caso típico",
  "## Qué dice la norma (y qué es rumor de ventanilla)",
  "## Documentos para este caso",
  "## Cómo se hace, paso a paso",
  "## Errores que retrasan este trámite",
  "## Cómo encaja con otros trámites",
  "## Si el ayuntamiento se niega",
  "## Preguntas frecuentes",
  "## Fuentes",
];

/** Frases del relleno clónico original: su reaparición es un bug de regresión. */
const BANNED_PHRASES = [
  "la respuesta corta depende del ayuntamiento, pero el marco es estable",
  "## Respuestas largas a la FAQ",
  "Se escribe una sola vez a nivel nacional",
  "el agente las especializa con el nombre del municipio",
];

const STOPWORDS = new Set(
  ("de la que el en y a los se del las un por con no una su para es al lo como mas mas o pero sus le ya este si porque " +
    "esta entre cuando muy sin sobre tambien me hasta hay donde quien desde todo nos durante todos uno les ni contra " +
    "otros ese eso ante ellos e esto mi antes algunos que unos yo otro otras otra el tanto esa estos usted ustedes " +
    "han haya tiene tienen tengo podemos debes debe deben debido cosa cosas forma manera cada vez va van ser eres soy " +
    "somos sera sera siempre nunca ahora luego asi asi solo sola tale tales cualquier cualquiera").split(/\s+/),
);

function tokens(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/[#*_>`]/g, " ")
      .split(/[^a-záéíóúüñ0-9]+/i)
      .filter((w) => w.length >= 3 && !STOPWORDS.has(w) && !/^\d+$/.test(w)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

function readContent(slug: string): string {
  return fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
}

function visible(md: string): string {
  return md.replace(/<!--[\s\S]*?-->/g, "");
}

type Faq = { q: string; body: string };

function faqs(md: string): Faq[] {
  const out: Faq[] = [];
  const re = /^### (.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    const after = md.slice(re.lastIndex);
    const nextH = after.search(/^#{1,3} /m);
    out.push({ q: m[1].trim(), body: (nextH === -1 ? after : after.slice(0, nextH)).trim() });
  }
  return out;
}

const norm = (s: string) => s.toLowerCase().replace(/[¿?]/g, "").replace(/\s+/g, " ").trim();

describe("escenarios: editorial única y sin relleno clónico", () => {
  it("los 12 archivos existen y las copias de content/ y del pack son idénticas", () => {
    for (const slug of ESCENARIO_SLUGS) {
      const content = readContent(slug);
      const pack = fs.readFileSync(path.join(PACK_DIR, `${slug}.md`), "utf8");
      expect(pack, `${slug}: pack desincronizado`).toBe(content);
    }
  });

  it("cada archivo conserva la cabecera de pack como comentario HTML (invisible al renderizar)", () => {
    for (const slug of ESCENARIO_SLUGS) {
      const md = readContent(slug);
      expect(md, slug).toMatch(/<!--[\s\S]*RutaTrámite · escenario nacional[\s\S]*-->/);
      expect(visible(md), `${slug}: meta del pack visible`).not.toMatch(
        /Se escribe una sola vez|No clones este archivo/,
      );
    }
  });

  it("estructura común: H1 propio y los nueve H2 en orden", () => {
    const briefBySlug = new Map(BRIEFS.map((b) => [b.slug, b]));
    for (const slug of ESCENARIO_SLUGS) {
      if (REVIEWS[slug]) {
        expect(validateReviewed(slug, readContent(slug)).errors, slug).toEqual([]);
        continue;
      }
      const md = visible(readContent(slug));
      const brief = briefBySlug.get(slug);
      expect(brief, `brief para ${slug}`).toBeDefined();
      expect(md.startsWith(`# ${brief!.h1}\n`), `${slug}: H1`).toBe(true);
      const positions = H2_SKELETON.map((h2) => md.indexOf(h2));
      for (const [i, p] of positions.entries()) {
        expect(p, `${slug}: falta el H2 «${H2_SKELETON[i]}»`).toBeGreaterThanOrEqual(0);
        if (i > 0) expect(p, `${slug}: H2 desordenado`).toBeGreaterThan(positions[i - 1]);
      }
    }
  });

  it("preguntas completas del brief o de la revisión manual, con respuestas no vacías", () => {
    const briefBySlug = new Map(BRIEFS.map((b) => [b.slug, b]));
    for (const slug of ESCENARIO_SLUGS) {
      const md = visible(readContent(slug));
      const items = faqs(md);
      const questions = REVIEWS[slug]?.questions ?? briefBySlug.get(slug)!.faq;
      expect(items.length, `${slug}: ${items.length} respuestas FAQ`).toBe(questions.length);
      questions.forEach((q: string, i: number) => {
        expect(norm(items[i].q), `${slug} FAQ ${i + 1}`).toBe(norm(q));
      });
      items.forEach((a, i) => {
        expect(a.body.trim(), `${slug} FAQ ${i + 1}: respuesta vacía`).not.toBe("");
      });
    }
  });

  it("conserva los documentos heredados; las revisiones manuales validan cobertura y fuentes", () => {
    for (const slug of ESCENARIO_SLUGS) {
      if (REVIEWS[slug]) {
        expect(validateReviewed(slug, readContent(slug)).errors, slug).toEqual([]);
        continue;
      }
      const wc = words(visible(readContent(slug)).replace(/[#*_>-]/g, " "));
      expect(wc, `${slug}: ${wc} palabras`).toBeGreaterThanOrEqual(2200);
    }
  });

  it("prohibido el relleno: ninguna frase clónica del modelo antiguo", () => {
    for (const slug of ESCENARIO_SLUGS) {
      const lower = readContent(slug).toLowerCase();
      for (const phrase of BANNED_PHRASES) {
        expect(lower, `${slug}: contiene «${phrase}»`).not.toContain(phrase);
      }
    }
  });

  it("anti-clonación dentro de cada archivo: respuestas FAQ no repetidas entre sí", () => {
    for (const slug of ESCENARIO_SLUGS) {
      const items = faqs(visible(readContent(slug)));
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const sim = jaccard(tokens(items[i].body), tokens(items[j].body));
          expect(
            sim < 0.55,
            `${slug}: FAQ ${i + 1} y ${j + 1} casi idénticas (J=${sim.toFixed(2)})`,
          ).toBe(true);
        }
      }
    }
  });

  it("anti-clonación entre archivos: ni respuestas ni cuerpos parecidos entre escenarios", () => {
    const all = ESCENARIO_SLUGS.map((slug) => ({
      slug,
      items: faqs(visible(readContent(slug))),
      doc: tokens(visible(readContent(slug))),
    }));
    for (let a = 0; a < all.length; a++) {
      for (let b = a + 1; b < all.length; b++) {
        const A = all[a];
        const B = all[b];
        for (let i = 0; i < A.items.length; i++) {
          for (let j = 0; j < B.items.length; j++) {
            const sim = jaccard(tokens(A.items[i].body), tokens(B.items[j].body));
            expect(
              sim < 0.5,
              `${A.slug} FAQ ${i + 1} ≈ ${B.slug} FAQ ${j + 1} (J=${sim.toFixed(2)})`,
            ).toBe(true);
          }
        }
        const docSim = jaccard(A.doc, B.doc);
        expect(
          docSim < 0.45,
          `${A.slug} y ${B.slug} comparten demasiado texto (J=${docSim.toFixed(2)})`,
        ).toBe(true);
      }
    }
  });

  it("sin datos inventados: solo URLs oficiales permitidas y sin tasas concretas", () => {
    for (const slug of ESCENARIO_SLUGS) {
      const md = readContent(slug);
      for (const url of md.match(/https?:\/\/[^\s)]+/g) ?? []) {
        expect(["idapadron.ine.es", "www.boe.es", "boe.es", "www.madrid.es", "sede.madrid.es"], `${slug}: URL no permitida`).toContain(new URL(url).hostname);
      }
      for (const money of md.match(/\d+([.,]\d+)?\s*€/g) ?? []) {
        expect(money, `${slug}: tasa inventada`).toMatch(/^0([.,]0*)?\s*€/);
      }
      expect(md.replace(/https?:\/\/[^\s)]+/g, ""), `${slug}: parece haber un teléfono`).not.toMatch(
        /(?:\+34\s?)?[89]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/,
      );
    }
  });
});
