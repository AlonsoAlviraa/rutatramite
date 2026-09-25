import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/empadronamiento/SiteFooter";
import { renderEscenarioHtml, renderGuideHtml, renderPilarHtml } from "@/lib/render/server";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import {
  GUIDE_SHORTS,
  YOUTUBE_CHANNEL_URL,
  shortForPath,
  videoObjectJsonLd,
  youtubeNocookieEmbedUrl,
} from "@/lib/youtube/shorts";

const PUBLISHED = [
  {
    videoId: "Ywv0Yw4PfYQ",
    path: "/empadronarse/extranjeros-no-ue",
    name: "¿Estás en España sin papeles? Sí puedes empadronarte.",
    answer: "sin papeles no hay nada",
    next: "El caso típico",
    html: () => renderEscenarioHtml("extranjeros-no-ue"),
  },
  {
    videoId: "bQX7V-y5A5I",
    path: "/extranjeria/arraigo-padron",
    name: "El padrón NO te regulariza. Pero para el arraigo importa mucho.",
    answer: "Qué hace el RD 1155/2024 aquí",
    next: "Si te empadronas ahora",
    html: () => renderGuideHtml("/extranjeria/arraigo-padron"),
  },
  {
    videoId: "deo6lRKLWx8",
    path: "/empadronarse/sin-contrato",
    name: "¿Vives en casa de un familiar? Sí puedes empadronarte.",
    answer: "casa de un familiar",
    next: "El caso típico",
    html: () => renderEscenarioHtml("sin-contrato"),
  },
  {
    videoId: "jxIv0WcFwQo",
    path: "/empadronarse/renovacion-2-anos",
    name: "“El padrón caduca a los 2 años”: cierto, pero no para todos.",
    answer: "cada veinticuatro meses",
    next: "El caso típico",
    html: () => renderEscenarioHtml("renovacion-2-anos"),
  },
  {
    videoId: "9T2oMY8qIr8",
    path: "/empadronarse/extranjeros-ue",
    name: "¿Eres de la UE? No esperes al certificado de registro.",
    answer: "certificado de registro de ciudadano de la Unión",
    next: "El caso típico",
    html: () => renderEscenarioHtml("extranjeros-ue"),
  },
  {
    videoId: "VF2Lgwxc7N8",
    path: "/empadronarse",
    name: "Cita para empadronarte en Madrid: no compliques la búsqueda.",
    answer: "La respuesta directa",
    next: "Tabla de trámites",
    html: () => renderPilarHtml(),
  },
] as const;

function visibleHtml(html: string): string {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function jsonLdBlocks(html: string): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const re = /<script type="application\/ld\+json">([^<]*)<\/script>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    out.push(JSON.parse(match[1]) as Record<string, unknown>);
  }
  return out;
}

describe("YouTube Shorts on guide pages", () => {
  it("keeps the six published Shorts in one map", () => {
    expect(GUIDE_SHORTS.map((short) => short.path)).toEqual(PUBLISHED.map((short) => short.path));
    expect(GUIDE_SHORTS.map((short) => short.videoId)).toEqual(PUBLISHED.map((short) => short.videoId));
    for (const published of PUBLISHED) {
      const short = shortForPath(published.path);
      expect(short?.videoId).toBe(published.videoId);
      expect(short?.name).toBe(published.name);
      expect(short?.uploadDate).toBe("2026-09-24");
      expect(short?.description.length).toBeGreaterThan(20);
    }
    expect(shortForPath("/empadronarse/casa-de-familiar")).toBeUndefined();
    expect(shortForPath("/empadronarse/cita-previa-madrid")).toBeUndefined();
    expect(YOUTUBE_CHANNEL_URL).toBe("https://www.youtube.com/@rutatramitebot");
  });

  it("adds the channel to Organization sameAs and the footer", () => {
    expect(organizationJsonLd().sameAs).toContain(YOUTUBE_CHANNEL_URL);
    const footer = renderToStaticMarkup(createElement(SiteFooter));
    expect(footer).toContain(`href="${YOUTUBE_CHANNEL_URL}"`);
    expect(footer).toContain("YouTube");
    expect(footer).toContain('rel="noopener noreferrer"');
  });

  it("shows a lazy 9:16 facade after the first answer and does not load an iframe", () => {
    for (const published of PUBLISHED) {
      const html = published.html();
      const body = visibleHtml(html);
      const answerAt = body.indexOf(published.answer);
      const shortAt = body.indexOf(`data-yt-short="${published.videoId}"`);
      const nextAt = body.indexOf(published.next);
      expect(answerAt, published.path).toBeGreaterThan(-1);
      expect(shortAt, published.path).toBeGreaterThan(answerAt);
      expect(nextAt, published.path).toBeGreaterThan(shortAt);
      expect(body).toContain("Míralo en 20 segundos");
      expect(body).toContain(`https://i.ytimg.com/vi/${published.videoId}/hqdefault.jpg`);
      expect(body).toContain('loading="lazy"');
      expect(body).toContain("aspect-ratio:9/16");
      expect(body).toContain(YOUTUBE_CHANNEL_URL);
      expect(body).not.toMatch(/<iframe[\s>]/i);
      expect(body).not.toContain("youtube-nocookie.com");
      expect(body).not.toContain("youtube.com/embed");

      const video = jsonLdBlocks(html).find((block) => block["@type"] === "VideoObject");
      expect(video, published.path).toMatchObject({
        name: published.name,
        thumbnailUrl: `https://i.ytimg.com/vi/${published.videoId}/hqdefault.jpg`,
        uploadDate: "2026-09-24",
        embedUrl: youtubeNocookieEmbedUrl(published.videoId),
      });
      expect(typeof video?.description).toBe("string");
      expect(String(video?.description).length).toBeGreaterThan(20);
      expect(video).not.toHaveProperty("duration");
    }
  });

  it("leaves unrelated guides without a Short", () => {
    expect(visibleHtml(renderEscenarioHtml("casa-de-familiar"))).not.toContain("data-yt-short");
    expect(visibleHtml(renderGuideHtml("/extranjeria/nie"))).not.toContain("data-yt-short");
    expect(visibleHtml(renderGuideHtml("/extranjeria/nie"))).not.toContain("youtube-nocookie.com");
  });

  it("builds VideoObject only from fields we can state", () => {
    const short = shortForPath("/empadronarse")!;
    const json = videoObjectJsonLd(short);
    expect(json["@type"]).toBe("VideoObject");
    expect(json.uploadDate).toBe("2026-09-24");
    expect(json).not.toHaveProperty("duration");
    expect(json.embedUrl).toBe("https://www.youtube-nocookie.com/embed/VF2Lgwxc7N8");
  });
});
