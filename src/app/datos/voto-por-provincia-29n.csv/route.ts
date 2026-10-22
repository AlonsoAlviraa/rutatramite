import { votoProvinciaCsv } from "@/lib/datos/voto-provincia";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return new Response(votoProvinciaCsv(), { headers: {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": 'attachment; filename="rutatramite-voto-por-provincia-29n.csv"',
    "Access-Control-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex",
  } });
}
