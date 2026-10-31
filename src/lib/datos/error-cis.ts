/** Estimación final del CIS frente al resultado oficial (voto válido), generales 2019–2023. Fuentes: CIS 3242, 3263, 3411; BOE. */
export const ERROR_CIS_ROWS: { eleccion: string; fecha: string; estudio: string; partido: string; cis: number; resultado: number }[] = [
  { eleccion: "Generales abril 2019", fecha: "2019-04-28", estudio: "CIS 3242", partido: "PP", cis: 17.2, resultado: 16.7 },
  { eleccion: "Generales abril 2019", fecha: "2019-04-28", estudio: "CIS 3242", partido: "PSOE", cis: 30.2, resultado: 28.7 },
  { eleccion: "Generales abril 2019", fecha: "2019-04-28", estudio: "CIS 3242", partido: "Vox", cis: 11.9, resultado: 10.3 },
  { eleccion: "Generales abril 2019", fecha: "2019-04-28", estudio: "CIS 3242", partido: "Ciudadanos", cis: 13.6, resultado: 15.9 },
  { eleccion: "Generales noviembre 2019", fecha: "2019-11-10", estudio: "CIS 3263", partido: "PP", cis: 18.1, resultado: 20.8 },
  { eleccion: "Generales noviembre 2019", fecha: "2019-11-10", estudio: "CIS 3263", partido: "PSOE", cis: 32.2, resultado: 28.0 },
  { eleccion: "Generales noviembre 2019", fecha: "2019-11-10", estudio: "CIS 3263", partido: "Vox", cis: 7.9, resultado: 15.1 },
  { eleccion: "Generales noviembre 2019", fecha: "2019-11-10", estudio: "CIS 3263", partido: "Ciudadanos", cis: 10.6, resultado: 6.8 },
  { eleccion: "Generales julio 2023", fecha: "2023-07-23", estudio: "CIS 3411", partido: "PP", cis: 31.4, resultado: 33.1 },
  { eleccion: "Generales julio 2023", fecha: "2023-07-23", estudio: "CIS 3411", partido: "PSOE", cis: 31.2, resultado: 31.7 },
  { eleccion: "Generales julio 2023", fecha: "2023-07-23", estudio: "CIS 3411", partido: "Vox", cis: 10.6, resultado: 12.4 },
  { eleccion: "Generales julio 2023", fecha: "2023-07-23", estudio: "CIS 3411", partido: "Sumar", cis: 16.4, resultado: 12.3 },
];
export function errorCisCsv(): string {
  const head = "eleccion,fecha,estudio_cis,partido,estimacion_cis_pct,resultado_oficial_pct,diferencia_puntos";
  return [head, ...ERROR_CIS_ROWS.map((r) => [r.eleccion, r.fecha, r.estudio, r.partido, r.cis.toFixed(1), r.resultado.toFixed(1), (r.cis - r.resultado).toFixed(1)].join(","))].join("\n") + "\n";
}
