import type { MetadataRoute } from "next";
import {
  BLOCKED_BOTS,
  DISCOVERY_DISALLOW,
  SEARCH_CITATION_BOTS,
  TRAINING_ALLOW_BOTS,
} from "@/lib/seo/crawlers";
import { SITE_ORIGIN } from "@/lib/types";

const disallow = [...DISCOVERY_DISALLOW];

type RobotRule = {
  userAgent: string;
  allow?: string;
  disallow?: string | string[];
};

function allowRule(userAgent: string): RobotRule {
  return { userAgent, allow: "/", disallow };
}

export default function robots(): MetadataRoute.Robots {
  const rules: RobotRule[] = [
    allowRule("*"),
    ...SEARCH_CITATION_BOTS.map(allowRule),
    ...TRAINING_ALLOW_BOTS.map(allowRule),
    ...BLOCKED_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
  ];
  return {
    rules,
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN.replace(/^https?:\/\//, ""),
  };
}
