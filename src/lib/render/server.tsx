import { renderToStaticMarkup } from "react-dom/server";
import { EscenarioView } from "@/components/empadronamiento/EscenarioView";
import { FichaView } from "@/components/empadronamiento/FichaView";
import { HubView } from "@/components/empadronamiento/HubView";
import { PilarArticle } from "@/components/empadronamiento/PilarView";
import { loadEscenarioMarkdown, loadIndex, loadMunicipio } from "@/lib/data/load";
import { buildFichaModel } from "@/lib/ficha/buildFicha";
import { buildCcaaHub, buildProvinciaHub } from "@/lib/hub/buildHub";
import type { EscenarioSlug, Municipio } from "@/lib/types";
import { GuideView } from "@/components/tramites/GuideView";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { countVisibleWords } from "@/lib/render/words";

export function renderFichaHtml(municipio: Municipio): string {
  const index = loadIndex();
  const model = buildFichaModel(municipio, index);
  return renderToStaticMarkup(<FichaView model={model} />);
}

export function renderPilarHtml(): string {
  return renderToStaticMarkup(<PilarArticle index={loadIndex()} includeWizard={false} />);
}

export function renderEscenarioHtml(slug: EscenarioSlug): string {
  return renderToStaticMarkup(<EscenarioView slug={slug} markdown={loadEscenarioMarkdown(slug)} />);
}

export function renderCcaaHubHtml(name: string, slug: string, provinceNames: string[]): string {
  const index = loadIndex().filter((m) => m.ccaa_slug === slug);
  const model = buildCcaaHub(name, slug, index, provinceNames);
  return renderToStaticMarkup(<HubView model={model} ccaaSlug={slug} />);
}

export function renderProvinciaHubHtml(
  name: string,
  ccaaName: string,
  ccaaSlug: string,
  provinceSlug: string,
): string {
  const index = loadIndex().filter((m) => m.ccaa_slug === ccaaSlug && m.province_slug === provinceSlug);
  const model = buildProvinciaHub(name, ccaaName, index);
  return renderToStaticMarkup(<HubView model={model} ccaaSlug={ccaaSlug} provinceSlug={provinceSlug} />);
}

export function renderGuideHtml(path: string): string {
  const guide = getGuideByPath(path);
  if (!guide) throw new Error(`Unknown guide path: ${path}`);
  return renderToStaticMarkup(<GuideView guide={guide} />);
}

export function visibleWordsFromHtml(html: string): number {
  return countVisibleWords(html);
}

export function loadAndRenderFicha(ine: string): { html: string; words: number; municipio: Municipio } {
  const municipio = loadMunicipio(ine);
  const html = renderFichaHtml(municipio);
  return { html, words: countVisibleWords(html), municipio };
}
