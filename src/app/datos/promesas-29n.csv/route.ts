import { promesasCsv } from "@/lib/promesas-data";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return new Response(promesasCsv(), { headers: {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": 'attachment; filename="rutatramite-promesas-29n.csv"',
    "Access-Control-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex",
  } });
}
