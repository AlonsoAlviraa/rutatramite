import { loadIndex } from "@/lib/data/load";
import { slimClientIndex } from "@/lib/wizard/clientIndex";

export const dynamic = "force-static";

/** Slim catalog for the wizard typeahead. Not an indexable page. */
export function GET() {
  return Response.json(slimClientIndex(loadIndex()), {
    headers: { "X-Robots-Tag": "noindex" },
  });
}
