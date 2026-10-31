import type { ReactNode } from "react";
import type { GuideChart } from "@/lib/tramites/types";

const fmt = (n: number) => n.toLocaleString("es-ES", { maximumFractionDigits: 1, minimumFractionDigits: n % 1 ? 1 : 0 });

/** Static, accessible inline SVG chart. No scripts, no external assets (CSP-safe). */
export function GuideChartSvg({ chart }: { chart: GuideChart }) {
  const rowH = 30, labelW = 120, plotW = 200, pad = 8, valueW = 0;
  const groups = chart.rows.map((r) => r.group).filter((g, i, a) => g && a.indexOf(g) === i);
  const headerRows = groups.length;
  const height = (chart.rows.length + headerRows) * rowH + pad * 2 + 18;
  const vals = chart.rows.flatMap((r) => [r.value, r.min, r.max, r.marker].filter((v): v is number => typeof v === "number"));
  const lo = chart.kind === "bars" ? Math.min(0, ...vals) : 0;
  const hi = Math.max(0, ...vals);
  const span = hi - lo || 1;
  const x = (v: number) => labelW + ((v - lo) / span) * plotW;
  let y = pad;
  let lastGroup: string | undefined;
  const items: ReactNode[] = [];
  chart.rows.forEach((r, i) => {
    if (r.group && r.group !== lastGroup) {
      items.push(<text key={`g${i}`} x={4} y={y + 20} fontSize="13" fontWeight="700" fill="currentColor">{r.group}</text>);
      y += rowH; lastGroup = r.group;
    }
    const cy = y + 6;
    items.push(<text key={`l${i}`} x={labelW - 8} y={cy + 13} fontSize="13" textAnchor="end" fill="currentColor">{r.label}</text>);
    if (chart.kind === "bars" && typeof r.value === "number") {
      const x0 = x(Math.min(0, r.value)), w = Math.max(1, Math.abs(x(r.value) - x(0)));
      items.push(<rect key={`b${i}`} x={x0} y={cy} width={w} height={18} rx={2} fill={r.value < 0 ? "#b45309" : "#3f6b4f"} />);
      items.push(<text key={`v${i}`} x={labelW + plotW + 6} y={cy + 13} fontSize="13" fill="currentColor">{(r.value > 0 ? "+" : "") + fmt(r.value)}{chart.unit}</text>);
    } else if (typeof r.min === "number" && typeof r.max === "number") {
      items.push(<rect key={`r${i}`} x={x(r.min)} y={cy} width={Math.max(2, x(r.max) - x(r.min))} height={18} rx={2} fill="#3f6b4f" />);
      if (typeof r.marker === "number") items.push(<rect key={`m${i}`} x={x(r.marker) - 2} y={cy - 3} width={4} height={24} fill="#b45309" />);
      items.push(<text key={`v${i}`} x={labelW + plotW + 6} y={cy + 13} fontSize="12" fill="currentColor">{fmt(r.min)}–{fmt(r.max)}{chart.unit}{typeof r.marker === "number" ? ` · ${r.markerLabel ?? ""} ${fmt(r.marker)}${chart.unit}` : ""}</text>);
    }
    y += rowH;
  });
  const W = labelW + plotW + valueW + (chart.kind === "ranges" ? 150 : 70);
  return (
    <figure className="mt-6 overflow-x-auto" data-guide-chart="">
      <svg role="img" viewBox={`0 0 ${W} ${height}`} width="100%" preserveAspectRatio="xMinYMin meet" className="max-w-full text-ink">
        <title>{chart.caption}</title>
        {chart.kind === "bars" && lo < 0 ? <line x1={x(0)} x2={x(0)} y1={pad} y2={height - 18} stroke="currentColor" strokeWidth={1} /> : null}
        {items}
      </svg>
      <figcaption className="mt-2 text-sm text-ink/80">{chart.caption}{chart.note ? ` ${chart.note}` : ""}</figcaption>
    </figure>
  );
}
