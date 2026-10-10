import { INDEXNOW_KEY } from "@/lib/seo/crawlers";
import { canonicalSiteOrigin, withoutLegacyEsHost } from "@/lib/seo/origin";
import { SITE_ORIGIN } from "@/lib/types";

export { INDEXNOW_KEY };

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export function indexNowKeyLocation(origin = SITE_ORIGIN): string {
  return `${canonicalSiteOrigin(origin)}/${INDEXNOW_KEY}.txt`;
}

/** Homepage + pillars + editorial. Keep the list short; IndexNow is for change pings, not a second sitemap. */
export const INDEXNOW_PILLARS = [
  "/",
  "/empadronarse",
  "/dni",
  "/pasaporte",
  "/extranjeria",
  "/mudanza",
  "/colegio",
  "/comedor",
  "/fp",
  "/bebe",
  "/becas",
  "/modelos",
  "/metodologia",
  "/fuentes",
] as const;

export function indexNowUrlList(paths: readonly string[] = INDEXNOW_PILLARS, origin = SITE_ORIGIN): string[] {
  const host = canonicalSiteOrigin(origin);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const path of paths) {
    const url = path.startsWith("http") ? withoutLegacyEsHost(path) : `${host}${path.startsWith("/") ? path : `/${path}`}`;
    if (seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

export type IndexNowResult = {
  ok: boolean;
  status: number;
  submitted: number;
  error?: string;
};

export async function pingIndexNow(opts?: {
  paths?: readonly string[];
  origin?: string;
  fetchImpl?: typeof fetch;
}): Promise<IndexNowResult> {
  const origin = canonicalSiteOrigin(opts?.origin ?? SITE_ORIGIN);
  const urlList = indexNowUrlList(opts?.paths ?? INDEXNOW_PILLARS, origin);
  const host = origin.replace(/^https?:\/\//, "");
  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: indexNowKeyLocation(origin),
    urlList,
  };
  try {
    const fetchImpl = opts?.fetchImpl ?? fetch;
    const res = await fetchImpl(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, submitted: urlList.length };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      submitted: urlList.length,
      error: err instanceof Error ? err.message : "indexnow_failed",
    };
  }
}
