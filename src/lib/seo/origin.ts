const LEGACY_ES_ORIGIN = /^https?:\/\/(?:www\.)?rutatramite\.es$/i;
const LEGACY_ES_URL = /^https?:\/\/(?:www\.)?rutatramite\.es(?=\/|$)/i;

/** Production host. The retired .es name must not become a canonical or og:url. */
export function canonicalSiteOrigin(raw?: string | null): string {
  const bare = (raw && raw.trim() ? raw : "https://rutatramite.com").trim().replace(/\/+$/, "");
  return LEGACY_ES_ORIGIN.test(bare) ? "https://rutatramite.com" : bare;
}

export function withoutLegacyEsHost(url: string): string {
  return url.replace(LEGACY_ES_URL, "https://rutatramite.com");
}
