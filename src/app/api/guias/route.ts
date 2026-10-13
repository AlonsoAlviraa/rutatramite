import { ALL_GUIDES } from "@/lib/tramites/catalog";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    ALL_GUIDES.map((guide) => ({ title: guide.h1, href: guide.path, category: "" })),
    { headers: { "X-Robots-Tag": "noindex" } },
  );
}
