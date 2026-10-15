import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AIDS, aidStatus } from "@/lib/ayudas";
import { AidCalendar } from "@/components/tramites/AidCalendar";
import { getGuideByPath } from "@/lib/tramites/catalog";
import fs from "node:fs";

describe("aid deadlines and discovery", () => {
  const mec = AIDS.find(a => a.id === "mec-modificacion-2627")!;
  it("closes at the official hour, including the time-zone offset", () => {
    const fresh = { ...mec, checkedAt: "2026-09-28" };
    expect(aidStatus(fresh, new Date("2026-09-28T12:59:59Z"))).toBe("Actualización de solicitudes");
    expect(aidStatus(fresh, new Date("2026-09-28T13:00:00Z"))).toBe("Solicitud cerrada");
  });
  it("never treats modification as an initial application or stale evidence as open", () => {
    expect(aidStatus(mec, new Date("2026-09-14T12:00:00Z"))).toBe("Actualización de solicitudes");
    expect(aidStatus(mec, new Date("2026-09-25T12:00:00Z"))).toContain("nueva revisión");
    expect(aidStatus({ ...mec, checkedAt: "2026-09-01" }, new Date("2026-09-06T12:00:00Z"))).toBe("Pendiente de apertura");
    const madrid = AIDS.find(a => a.id === "bono-madrid")!;
    expect(aidStatus(madrid, new Date("2027-01-01T00:00:00Z"))).toContain("nueva revisión");
  });
  it("keeps closed applications and published regulations distinct", () => {
    expect(aidStatus(AIDS.find(a => a.id === "neae-2627")!, new Date("2026-09-14T12:00:00Z"))).toBe("Solicitud cerrada");
    expect(aidStatus(AIDS.find(a => a.id === "plan-vivienda")!)).toContain("Norma publicada");
  });
  it("every calendar destination has a guide, source, and sitemap entry", () => {
    const sitemap = fs.readFileSync("public/sitemap.xml", "utf8");
    for (const aid of AIDS) {
      expect(getGuideByPath(aid.path), aid.path).toBeDefined();
      expect(sitemap, aid.path).toContain(`https://rutatramite.com${aid.path}</loc>`);
      expect(aid.source.href).toMatch(/^https:\/\//);
    }
    const html = renderToStaticMarkup(createElement(AidCalendar, { category: "alquiler" }));
    expect(html).toContain("Bono Alquiler Joven de Madrid");
    expect(html).not.toContain("Becas de colaboración");
    expect(html).toMatch(/<time datetime="2026-09-14">/i);
  });
});
