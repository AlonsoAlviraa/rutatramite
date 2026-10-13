/** Same rules as pack scripts/seed_ine.py — used by SSG and tests. */
export function slugify(name: string): string {
  const n = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’·]/g, "");
  return n.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
