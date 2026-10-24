import json
m=json.load(open('mapa.json'));P=json.load(open('paths.json'))
prov=[]
for p in sorted(m['prov'],key=lambda x:x['c']):
    g=P[p['c']]
    prov.append(dict(c=p['c'],d=g['d'],cx=g['cx'],cy=g['cy'],pob=p['pob'],d23=p['d23'],d26=p['d26'],valid=p['valid'],habDip=p['habDip'],y23=p['y23']))
y26={p['c']:p['y26'] for p in m['prov']}
ts='/* Generado por scripts/mapa-voto-util/compute.py. Fuentes: BOE-A-2023-18907 (resultados 2023), RD 806/2026 (diputados 2026), RD 1117/2025 (población). Geometría: Natural Earth (dominio público), simplificada. */\n'
ts+='export type Esc = { seats: Record<string, number>; last: string; lastQ: number; next: string | null; nextQ: number | null; shortBy: number | null; marginPct: number | null; sinEscano: { der: number; izq: number; otr: number }; votes: Record<string, number>; votosPorEscano: number };\n'
ts+='export type MapaProv = { c: string; d: string; cx: number; cy: number; pob: number; d23: number; d26: number; valid: number; habDip: number; y23: Esc };\n'
ts+='export const MAPA_PROV: MapaProv[] = '+json.dumps(prov,ensure_ascii=False,separators=(',',':'))+';\n'
ts+='/** LOREG art. 69: no se publican encuestas desde el 24-11-2026 (00:00 hora peninsular). */\nexport const POLL_CUTOFF_ISO = "2026-11-23T23:00:00Z";\nexport const pollsAllowed = (now = Date.now()) => now < Date.parse(POLL_CUTOFF_ISO);\n'
t2='/* Escenario 2026: estimación a partir de encuestas (no es un resultado ni una predicción). Solo lo importa el servidor; se omite en builds desde el 24-11-2026. */\nimport type { Esc } from "@/lib/datos/mapa-voto-util";\n'
t2+='export const MAPA_Y26_RAW: Record<string, Esc> = '+json.dumps(y26,ensure_ascii=False,separators=(',',':'))+';\n'
open('/workspace/wt-mapa/src/lib/datos/mapa-voto-util-2026.ts','w').write(t2)
ts+='export const MAPA_POLLS = '+json.dumps([dict(n=p[0],campo=p[1],pub=p[2],muestra=p[3],pp=p[4],psoe=p[5],vox=p[6]) for p in m['polls']],ensure_ascii=False)+';\n'
ts+=f'export const MAPA_MEDIA = {json.dumps(m["avg"])};\nexport const MAPA_NAC23 = {json.dumps(m["N23"])};\nexport const MAPA_SWING = {json.dumps(m["swing"])};\n'
ts+='export const POLLS_DATE = "23-10-2026";\n'
open('/workspace/wt-mapa/src/lib/datos/mapa-voto-util.ts','w').write(ts)
print(len(ts))
# CSV (solo 2023 oficial + diputados/poblacion 2026, sin encuestas)
import csv
import io
f=io.StringIO()
if True:
    w=csv.writer(f);w.writerow(['circunscripcion','diputados_2023','votos_validos_2023','escanos_2023','ultimo_escano_2023','cociente_ultimo_2023','siguiente_2023','votos_que_faltaron_2023','margen_pct_voto_valido_2023','votos_por_escano_2023','votos_sin_escano_bloque_derecha_2023','votos_sin_escano_bloque_izquierda_2023','votos_sin_escano_otros_2023','diputados_2026','poblacion_1_1_2025','habitantes_por_diputado_2026'])
    for p in prov:
        y=p['y23'];w.writerow([p['c'],p['d23'],p['valid'],' '.join(f'{k}:{v}' for k,v in sorted(y['seats'].items(),key=lambda x:-x[1])),y['last'],y['lastQ'],y['next'],y['shortBy'],y['marginPct'],y['votosPorEscano'],y['sinEscano']['der'],y['sinEscano']['izq'],y['sinEscano']['otr'],p['d26'],p['pob'],p['habDip']])

open('/workspace/wt-mapa/src/lib/datos/mapa-voto-util.ts','a').write('export const MAPA_CSV = '+json.dumps(f.getvalue(),ensure_ascii=False)+';\n')
