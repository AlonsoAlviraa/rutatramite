import { aiSummaryJson } from "@/lib/seo/llms";

export const dynamic = "force-static";

export function GET() {
  return Response.json(aiSummaryJson(), {
    headers: { "cache-control": "public, max-age=3600" },
  });
}
