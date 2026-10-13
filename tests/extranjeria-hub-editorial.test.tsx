import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ExtranjeriaPage from "@/app/extranjeria/page";
import { SEDE_AAPP_URL } from "@/lib/tramites/facts";

describe("hub de extranjería", () => {
  it("enlaza la sede oficial y no publica un importe de tasa", () => {
    const html = renderToStaticMarkup(createElement(ExtranjeriaPage));
    const lead = html.split("data-pack-grid")[0];
    expect(lead).toContain(`href="${SEDE_AAPP_URL}"`);
    expect(lead).toContain("Sede de extranjería");
    expect(lead).not.toMatch(/\d+\s*€/);
  });
});
