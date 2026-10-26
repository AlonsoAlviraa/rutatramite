import { it, expect } from "vitest";
import { DISTURBIOS_BCN } from "@/lib/tramites/disturbios-bcn";
it("cada fila tiene fuente https y no usa cifras descartadas", () => {
  for (const f of DISTURBIOS_BCN) { expect(f.fuentes.length).toBeGreaterThan(0); f.fuentes.forEach((s) => expect(s.href.startsWith("https://")).toBe(true)); }
  const all = JSON.stringify(DISTURBIOS_BCN);
  expect(all).not.toMatch(/3,1 mill|12 detenidos/);
  expect(all).toMatch(/128 detenidos/);
});
