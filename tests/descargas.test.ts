import fs from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { ESCENARIO_SLUGS } from "@/lib/types";
import { descargasByVertical, descargasForGuide, loadDescargasManifest } from "@/lib/descargas";

const ROOT = process.cwd();
const PDF_DIR = path.join(ROOT, "public", "pdf");

describe("manifiesto de formularios oficiales", () => {
  const manifest = loadDescargasManifest();

  it("declara formularios y políticas", () => {
    expect(manifest.files.length).toBe(33);
    expect(manifest.files.some(f => f.file === "pdf/cm-hoja-padronal.pdf")).toBe(false);
    expect(manifest.online_only.length).toBeGreaterThan(0);
    expect(manifest.generated).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("cada entrada apunta a un PDF real y verificable", () => {
    for (const f of manifest.files) {
      const data = fs.readFileSync(path.join(ROOT, "public", f.file));
      expect(data.subarray(0, 5).toString(), f.file).toBe("%PDF-");
      expect(data.length, f.file).toBe(f.bytes);
      expect(f.sha256, f.file).toMatch(/^[0-9a-f]{64}$/);
      expect(createHash("sha256").update(data).digest("hex"), f.file).toBe(f.sha256);
      expect(f.purpose.length, f.file).toBeGreaterThan(40);
      expect(f.source_url, f.file).toMatch(/^https:\/\//);
      expect(f.verified, f.file).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("las guías referenciadas existen en el catálogo o son escenarios de padrón", () => {
    const paths = new Set([
      ...ALL_GUIDES.map((g) => g.path),
      ...ESCENARIO_SLUGS.map((slug) => `/empadronarse/${slug}`),
    ]);
    const prefixSections = new Set([
      ...ALL_GUIDES.map((g) => g.path.split("/")[1]),
      "empadronarse",
    ]);
    for (const f of manifest.files) {
      for (const guide of f.related_guides) {
        expect(paths.has(guide), `${f.file} -> ${guide}`).toBe(true);
      }
      for (const prefix of f.guide_prefixes) {
        expect(prefixSections.has(prefix.slice(1)), `${f.file} -> ${prefix}`).toBe(true);
      }
    }
  });
});

describe("agrupación y emparejamiento por guía", () => {
  it("agrupa por vertical sin duplicados ni vacíos", () => {
    const groups = descargasByVertical();
    const total = groups.reduce((n, g) => n + g.items.length, 0);
    expect(total).toBe(loadDescargasManifest().files.length);
    for (const group of groups) {
      expect(new Set(group.items.map((f) => f.file)).size).toBe(group.items.length);
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it("ofrece solo los formularios del procedimiento concreto", () => {
    const ex13 = descargasForGuide("/extranjeria/autorizacion-regreso-ex13").map((f) => f.file);
    expect(ex13).toContain("pdf/ex13-autorizacion-regreso.pdf");

    const cualquierExtranjeria = descargasForGuide("/extranjeria/mercurio").map((f) => f.file);
    expect(cualquierExtranjeria).toEqual([]);
    expect(ex13).toEqual(["pdf/ex13-autorizacion-regreso.pdf"]);
    expect(descargasForGuide("/extranjeria/certificado-digital-nie")).toEqual([]);
    expect(descargasForGuide("/dni/viajar-reino-unido")).toEqual([]);
    expect(descargasForGuide("/extranjeria/certificado-registro-ue").map(f => f.file)).toEqual(["pdf/ex18-registro-ue.pdf"]);

    const sinFormularios = descargasForGuide("/becas/mec/estado");
    expect(sinFormularios).toEqual([]);
  });

  it("limita los impresos municipales a Madrid y distingue la representación", () => {
    const files = descargasForGuide("/empadronarse/con-contrato").map((f) => f.file);
    expect(files).toEqual([]);
    const madrid = descargasForGuide("/empadronarse/cita-previa-madrid");
    expect(madrid.map(f => f.file)).toEqual(["pdf/mad-hoja-padronal.pdf", "pdf/mad-autorizacion-empadronamiento.pdf"]);
    expect(madrid[1].title).toContain("presentar la solicitud");
    expect(madrid[1].purpose).toContain("representante");
  });
});
