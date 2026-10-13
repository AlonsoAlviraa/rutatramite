import { afterEach, describe, expect, it, vi } from "vitest";
import { unstable_getResponseFromNextConfig } from "next/experimental/testing/server";
import nextConfig from "../next.config";
import { POST } from "@/app/api/metricas/route";
import { GET as indexNowGet, POST as indexNowPost } from "@/app/api/indexnow/route";
import { METRIC_BODIES_PER_MINUTE, resetMetricQuota } from "@/lib/metrics/quota";

const htmlUrls = ["https://rutatramite.com/", "https://rutatramite.com/empadronarse"];

async function responseHeaders(url: string) {
  const response = await unstable_getResponseFromNextConfig({ url, nextConfig });
  return response.headers;
}

function metricRequest(origin = "https://rutatramite.com") {
  return new Request("https://rutatramite.com/api/metricas", {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: "{}",
  });
}

describe("security headers", () => {
  it("reads HTML headers and does not enforce CSP", async () => {
    for (const url of htmlUrls) {
      const headers = await responseHeaders(url);
      expect(headers.get("x-content-type-options"), url).toBe("nosniff");
      expect(headers.get("referrer-policy"), url).toBe("strict-origin-when-cross-origin");
      expect(headers.get("x-frame-options"), url).toBe("SAMEORIGIN");
      expect(headers.get("permissions-policy"), url).toBe("camera=(), microphone=(), geolocation=()");
      expect(headers.get("content-security-policy"), url).toBeNull();
      expect(headers.get("x-robots-tag"), url).toBeNull();
      const policy = headers.get("content-security-policy-report-only");
      expect(policy, url).toContain("script-src 'self' 'unsafe-inline'");
      expect(policy, url).toContain("style-src 'self' 'unsafe-inline'");
      expect(policy, url).toContain("connect-src 'self'");
      expect(policy, url).toContain("frame-ancestors 'self'");
      expect(policy, url).not.toContain("unsafe-eval");
    }
  });

  it("keeps the current /pdf headers", async () => {
    const readHeaders = nextConfig.headers;
    if (!readHeaders) throw new Error("next.config headers() is missing");
    const rules = await readHeaders();
    const pdf = rules.find((rule) => rule.source === "/pdf/:path*");
    expect(pdf?.headers).toEqual([
      { key: "X-Robots-Tag", value: "noindex" },
      { key: "X-Content-Type-Options", value: "nosniff" },
    ]);
    const headers = await responseHeaders("https://rutatramite.com/pdf/ex00-estancia.pdf");
    expect(headers.get("x-robots-tag")).toBe("noindex");
    expect(headers.get("x-content-type-options")).toBe("nosniff");
  });
});

describe("metrics intake quota", () => {
  afterEach(() => {
    resetMetricQuota();
    vi.restoreAllMocks();
  });

  it("rejects a foreign origin with 403", async () => {
    const response = await POST(metricRequest("https://example.org"));
    expect(response.status).toBe(403);
    expect(await response.text()).toBe("");
  });

  it("returns 429 after the per-process body cap", async () => {
    expect(METRIC_BODIES_PER_MINUTE).toBe(120);
    expect(METRIC_BODIES_PER_MINUTE).toBeLessThan(6000);
    vi.spyOn(Date, "now").mockReturnValue(Date.parse("2020-01-01T00:00:30Z"));
    resetMetricQuota();
    for (let i = 0; i < METRIC_BODIES_PER_MINUTE; i += 1) {
      const response = await POST(metricRequest());
      expect(response.status, String(i)).not.toBe(429);
      expect(response.status, String(i)).not.toBe(403);
    }
    const blocked = await POST(metricRequest());
    expect(blocked.status).toBe(429);
    expect(await blocked.text()).toBe("");
  });
});

describe("indexnow intake", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not submit IndexNow from the HTTP route", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const post = await indexNowPost();
    const get = await indexNowGet();
    expect(post.status).toBe(405);
    expect(get.status).toBe(405);
    expect(await post.text()).toBe("");
    expect(await get.text()).toBe("");
    expect(post.headers.get("x-robots-tag")).toBe("noindex");
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe("canonical redirects", () => {
  it("keeps destinations on the canonical host", async () => {
    const readRedirects = nextConfig.redirects;
    if (!readRedirects) throw new Error("next.config redirects() is missing");
    const rules = await readRedirects();
    const allowedSourceHosts = new Set([
      "rutatramite.es",
      "www.rutatramite.es",
      "www.rutatramite.com",
    ]);
    const seenSourceHosts = new Set<string>();

    expect(rules.length).toBeGreaterThan(0);

    for (const rule of rules) {
      const destination = rule.destination;
      expect(destination, destination).not.toMatch(/\s/);
      expect(destination.startsWith("//"), destination).toBe(false);
      expect(destination.includes("\\"), destination).toBe(false);
      expect(destination.includes("@"), destination).toBe(false);

      const absolute = /^[a-z][a-z0-9+.-]*:/i.test(destination);
      if (!absolute) {
        expect(destination.startsWith("/"), destination).toBe(true);
        expect(destination.includes("://"), destination).toBe(false);
        continue;
      }

      expect(destination.startsWith("https://rutatramite.com/"), destination).toBe(true);
      const url = new URL(destination.replace(/:[A-Za-z0-9_]+(\*)?/g, "ruta"));
      expect(url.origin, destination).toBe("https://rutatramite.com");
      expect(url.hostname, destination).toBe("rutatramite.com");
      expect(url.username, destination).toBe("");
      expect(url.password, destination).toBe("");
      expect(rule.source, destination).toBe("/:path*");

      const sourceHosts = (rule.has ?? []).flatMap((condition) =>
        condition.type === "host" ? [condition.value] : [],
      );
      expect(sourceHosts, destination).toHaveLength(1);
      const sourceHost = sourceHosts[0];
      if (sourceHost === undefined) throw new Error(destination);
      expect(allowedSourceHosts.has(sourceHost), destination).toBe(true);
      seenSourceHosts.add(sourceHost);
    }

    expect(seenSourceHosts).toEqual(allowedSourceHosts);
  });
});
