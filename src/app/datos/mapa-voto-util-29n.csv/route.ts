import { MAPA_CSV } from "@/lib/datos/mapa-voto-util";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return new Response(MAPA_CSV, { headers: {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": 'attachment; filename="rutatramite-mapa-voto-util-29n.csv"',
    "Access-Control-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex",
  } });
}
