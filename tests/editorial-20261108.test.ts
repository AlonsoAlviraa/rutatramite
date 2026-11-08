import { describe, expect, it } from "vitest";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { guideFaqJsonLd } from "@/lib/seo/jsonld";

const guide = (path: string) => {
  const found = ALL_GUIDES.filter((g) => g.path === path);
  expect(found, path).toHaveLength(1);
  return found[0];
};

const flat = (g: ReturnType<typeof guide>) => JSON.stringify(g);

describe("corrección editorial 8 de noviembre de 2026", () => {
  it("mantiene URL, título, descripción y H1 de las tres páginas y de las protegidas", () => {
    const encuestas = guide("/elecciones/encuestas-29n");
    expect(encuestas.h1).toBe("Encuestas de las elecciones del 29-N: las últimas, con fuente y fecha");
    expect(encuestas.title).toBe("Encuestas elecciones 29-N: últimas, con fuente y fecha");
    expect(encuestas.reviewedAt).toBe("2026-10-27");

    const corte = guide("/transporte/corte-ave-madrid-andalucia-reembolso");
    expect(corte.path).toBe("/transporte/corte-ave-madrid-andalucia-reembolso");
    expect(corte.h1).toBe("Corte del AVE Madrid–Andalucía: reembolso, cambio de billete y cómo reclamar");
    expect(corte.title).toBe("AVE Madrid–Andalucía cortado: reembolso y cambio de billete");
    expect(corte.description).toBe(
      "Reembolso o cambio si se cancela tu tren Madrid–Andalucía: qué han anunciado Renfe, Iryo y OUIGO, y el Reglamento (UE) 2021/782.",
    );
    expect(corte.description.length).toBeLessThanOrEqual(158);
    expect(corte.title.length).toBeLessThanOrEqual(62);
    expect(corte.reviewedAt).toBe("2026-11-08");

    const madrid = guide("/elecciones/promesas/comunidad-madrid");
    expect(madrid.h1).toBe("Promesas del 29-N y cómo afectarían en Comunidad de Madrid");
    expect(madrid.title).toBe("Promesas electorales del 29-N en Comunidad de Madrid");
    expect(madrid.reviewedAt).toBe("2026-10-24");

    const programas = guide("/elecciones/programas-electorales-29n");
    expect(programas.h1).toBe("Programas electorales del 29-N: cuándo se publican y dónde leerlos");
    expect(programas.title).toBe("Programas electorales del 29-N: cuándo salen y dónde verlos");
    expect(programas.description).toBe(
      "¿Han salido ya los programas electorales del 29-N? A 18 de octubre ningún partido ha publicado el suyo. Qué han propuesto en los mítines, con fuente.",
    );

    const tarjeta = guide("/elecciones/tarjeta-censal-cuando-llega");
    expect(tarjeta.title).toBe("Tarjeta censal 29-N: cuándo llega la carta del censo electoral");
    expect(tarjeta.h1).toBe("Tarjeta censal del 29-N: cuándo llega la carta del censo y para qué sirve");
    expect(tarjeta.path).toBe("/elecciones/tarjeta-censal-cuando-llega");

    for (const g of [encuestas, corte, madrid, programas, tarjeta]) {
      expect(g).not.toHaveProperty("robots");
      expect(flat(g)).not.toContain("noindex");
    }
  });

  it("corrige la entradilla y el margen de encuestas sin tocar otra guía", () => {
    const hub = flat(guide("/elecciones/encuestas-29n"));
    expect(hub).toContain("No atribuimos las diferencias entre encuestas a una sola causa");
    expect(hub).toContain("±2,1 %");
    expect(hub).toContain("29 y el 30 de octubre");
    expect(hub).not.toContain("viene sobre todo del método de estimación, no de la fecha");
    expect(hub).not.toContain("es un empate");
    const margen = flat(guide("/elecciones/margen-de-error-encuestas"));
    expect(margen).toContain("empate técnico");
  });

  it("alinea cuerpo, FAQ y JSON-LD del corte con OUIGO, Renfe y los artículos 15 y 18", () => {
    const g = guide("/transporte/corte-ave-madrid-andalucia-reembolso");
    const text = flat(g);
    const ld = JSON.stringify(guideFaqJsonLd(g));
    for (const faq of g.faqs ?? []) {
      expect(ld).toContain(faq.a);
      expect(text).toContain(faq.a);
    }
    expect(text).toContain("Por Equipo RutaTrámite");
    expect(text).toContain("suspendidos hasta el 15 de noviembre por cierre de línea");
    expect(text).toContain("12 de noviembre inclusive");
    expect(text).toContain("Madrid-Atocha Cercanías");
    expect(text).toContain("artículo 18 del Reglamento (UE) 2021/782");
    expect(text).toContain("artículo 15 del Reglamento (UE) 2021/782");
    expect(text).toContain("nota del 29 de octubre (histórica)");
    expect(text).not.toContain("hasta el 2 de noviembre");
    expect(text).not.toContain("hasta el 9 de noviembre");
    expect(text).not.toContain("más de 60 minutos");
    expect(text).not.toContain("Puerta de Atocha");
    expect(text).not.toContain("Volveremos a revisarla el 3 de noviembre");
    expect(text).not.toContain("14 de noviembre");
    expect(text).not.toContain("912 320 320");
    expect(g.sections.find((s) => s.id === "ouigo")!.title).toBe("OUIGO: suspensión anunciada hasta el 15 de noviembre");
    expect(g.sources!.some((s) => s.href.includes("renfe-prorroga-plan-alternativo"))).toBe(true);
    expect(guide("/elecciones/voto-por-correo").reviewedAt).toBe("2026-10-31");
  });

  it("corrige solo Madrid el umbral del 3 % y el reparto de competencias", () => {
    const madrid = flat(guide("/elecciones/promesas/comunidad-madrid"));
    expect(madrid).toContain("al menos el 3 % de los votos válidos emitidos en ella");
    expect(madrid).toContain("no garantiza un escaño");
    expect(madrid).toContain("artículo 26.1.4");
    expect(madrid).toContain("artículo 27.4");
    expect(madrid).toContain("artículo 29 del Estatuto");
    expect(madrid).toContain("artículo 149.1.16");
    expect(madrid).toContain("artículo 149.1.30");
    expect(madrid).toContain("No se ha revalidado aquí la tabla de promesas");
    expect(madrid).not.toContain("superan el 3 %");
    expect(madrid).not.toContain("son competencias de la comunidad.");
    expect(madrid).toContain("acientosesentaytres");

    const andalucia = flat(guide("/elecciones/promesas/comunidad-andalucia"));
    expect(andalucia).toContain("superan el 3 % de los votos válidos en esa provincia");
    expect(andalucia).toContain("Vivienda, educación y sanidad son competencias de la comunidad.");
    expect(guide("/elecciones/promesas/comunidad-madrid").lead).toContain("datos a 27 de octubre de 2026");
  });
});
