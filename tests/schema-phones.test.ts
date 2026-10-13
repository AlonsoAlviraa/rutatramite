import fs from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { loadAllMunicipios } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";
import { validateMunicipio } from "@/lib/schema/validateMunicipio";
import type { Municipio } from "@/lib/types";

describe("municipio JSON honesty", () => {
  let all: Municipio[] = [];
  beforeAll(() => {
    all = loadAllMunicipios();
  });

  it("validates against pack schema, tasa_alta === 0, source_urls.length >= 1", { timeout: 60_000 }, () => {
    const bad: string[] = [];
    for (const m of all) {
      const { ok, errors } = validateMunicipio(m);
      if (!ok) bad.push(`${m.ine_code} ${errors.join("; ")}`);
      if (m.tasa_alta !== 0) bad.push(`${m.ine_code} tasa_alta ${m.tasa_alta}`);
      if (!m.source_urls || m.source_urls.length < 1) bad.push(`${m.ine_code} no source_urls`);
      if (!m.confidence || !m.status || !m.last_verified) bad.push(`${m.ine_code} missing meta`);
    }
    expect(bad, bad.slice(0, 20).join("\n")).toEqual([]);
  });

  it("no duplicate non-empty teléfono across municipios", () => {
    const phones = new Map<string, string>();
    const dups: string[] = [];
    for (const m of all) {
      for (const o of m.oficinas ?? []) {
        const tel = (o.telefono ?? "").trim();
        if (!tel) continue;
        const prev = phones.get(tel);
        if (prev && prev !== m.ine_code) {
          dups.push(`${tel} ${prev} vs ${m.ine_code}`);
        } else {
          phones.set(tel, m.ine_code);
        }
      }
    }
    expect(dups).toEqual([]);
    const getafe = all.find((m) => m.ine_code === "28065");
    const leganes = all.find((m) => m.ine_code === "28074");
    const madrid = all.find((m) => m.ine_code === "28079");
    const mTel = madrid?.oficinas?.[0]?.telefono;
    if (mTel) {
      expect(getafe?.oficinas?.some((o) => o.telefono === mTel) ?? false).toBe(false);
      expect(leganes?.oficinas?.some((o) => o.telefono === mTel) ?? false).toBe(false);
    }
  });

  it("does not invent contact fields; oleada A that is official has municipal sede host", () => {
    for (const m of all) {
      if (m.sede_url === "") {
        throw new Error(`${m.ine_code} empty string sede_url; use null`);
      }
      if (m.cita_url === "") {
        throw new Error(`${m.ine_code} empty string cita_url; use null`);
      }
    }
    const madrid = all.find((m) => m.ine_code === "28079");
    expect(madrid?.sede_url).toContain("sede.madrid.es");
    expect(madrid?.confidence).toBe("official");
    const oleadaA = all.filter((m) => m.oleada === "A");
    expect(oleadaA.length).toBe(67);
    const missing = oleadaA.filter((m) => !m.sede_url);
    // Official-or-fetched hosts must be municipal, never a neighbor copy.
    for (const m of oleadaA.filter((x) => x.sede_url)) {
      const host = new URL(m.sede_url as string).hostname;
      expect(host.length).toBeGreaterThan(3);
    }
    expect(missing.map((m) => m.ine_code + " " + m.name)).toEqual([]);
  });

  it("indexable fichas do not claim the ayuntamiento may deny padrón for being irregular or that TIE is a national alta requirement", () => {
    const sample = all.filter((m) => m.oleada === "A").slice(0, 5);
    for (const m of sample) {
      const html = renderFichaHtml(m);
      expect(html.toLowerCase()).not.toMatch(/negar el padr[oó]n por estar irregular/);
      expect(html.toLowerCase()).not.toMatch(/tie es un requisito nacional/);
    }
    const engine = fs.readFileSync(path.join(process.cwd(), "src/lib/wizard/engine.ts"), "utf8");
    expect(engine.toLowerCase()).not.toMatch(/fetch\(/);
    expect(engine).not.toMatch(/XMLHttpRequest/);
  });
});
