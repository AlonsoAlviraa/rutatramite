import { buildPilarModel } from "@/lib/pilar/content";
import { SITE_ORIGIN } from "@/lib/types";

export const dynamic = "force-static";

export function GET() {
  const pilar = buildPilarModel();
  return Response.json(
    {
      url: `${SITE_ORIGIN}/empadronarse`,
      inLanguage: "es-ES",
      disclaimer: "Orientación. Contrasta la sede del ayuntamiento. RutaTrámite no es Administración.",
      faqs: pilar.faqs.map((f) => ({ q: f.q, a: f.a })),
    },
    { headers: { "cache-control": "public, max-age=3600" } },
  );
}
