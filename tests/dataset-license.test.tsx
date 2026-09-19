import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import RecursosPage from "@/app/recursos/page";
import PadronResource from "@/app/recursos/padron-municipal/page";
import { aidDataset } from "@/lib/aid-data";
import { padronDataset } from "@/lib/padron-data";
import { DATASET_LICENSE_URL } from "@/lib/dataset-license";

describe("dataset licence advertised to Google", () => {
  for (const [name, Page] of [["ayudas", RecursosPage], ["padrón", PadronResource]] as const) {
    it(`${name}: links structured metadata to visible, versioned reuse terms`, () => {
      const html = renderToStaticMarkup(<Page />);
      const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
        .flatMap(match => JSON.parse(match[1]));
      const dataset = scripts.find(value => value["@type"] === "Dataset");
      expect(dataset.license).toMatchObject({ "@type": "CreativeWork", url: DATASET_LICENSE_URL });
      expect(html).toContain('id="licencia-datos-v1"');
      expect(html).toContain("conserva las fuentes y fechas de revisión");
      expect(html).toContain("contenidos de terceros conservan sus propias condiciones");
    });
  }
  it("keeps downloaded metadata consistent with the HTML licence", () => {
    expect(aidDataset().license_url).toBe(DATASET_LICENSE_URL);
    expect(padronDataset().license_url).toBe(DATASET_LICENSE_URL);
  });
});
