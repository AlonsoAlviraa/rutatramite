/** Honest locale map: the site is Spanish-only (es-ES). Do not invent other locales. */
export function localeAlternates(url: string): Record<string, string> {
  return { es: url, "x-default": url };
}
