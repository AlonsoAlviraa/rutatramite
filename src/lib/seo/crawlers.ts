/**
 * AI / search crawler tiers adapted from geo-optimizer-skill and geo-seo-claude
 * (patterns only — do not copy their products). Search/citation bots must stay allowed.
 * Training-only aggressive crawlers can be blocked without affecting live AI search.
 */

export const DISCOVERY_DISALLOW = ["/api/", "/borrador/"] as const;

/** Live search / citation — never block these if we want GEO visibility. */
export const SEARCH_CITATION_BOTS = [
  "Googlebot",
  "Googlebot-Image",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Applebot",
  "Applebot-Extended",
  "Google-Extended",
  "GoogleOther",
  "Amazonbot",
  "FacebookBot",
] as const;

/** Training-adjacent; allow for long-term citation corpora, same allow/disallow as search. */
export const TRAINING_ALLOW_BOTS = ["anthropic-ai", "CCBot"] as const;

/** Aggressive / low-value for this Spanish civic site. */
export const BLOCKED_BOTS = ["Bytespider"] as const;

export const INDEXNOW_KEY = "b7e4c91a0f3d28e65a1c47b90d2e8f36";
