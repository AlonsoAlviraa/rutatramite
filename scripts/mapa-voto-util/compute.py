import json,re
r23=json.load(open('r23.json'))
src=open('/workspace/dni/tree/src/lib/datos/voto-provincia.ts').read()
rows=re.findall(r'circ: "([^"]+)", diputados: (\d+), poblacion: (\d+)',src)
s26={c:(int(d),int(p)) for c,d,p in rows}
assert len(s26)==52 and set(s26)==set(r23)
def short(n):
    m=re.findall(r'\(([^()]+)\)\.?$',n.strip()); s=m[0] if m else n
    return {'PSC':'PSC','VOX':'Vox','SUMAR':'Sumar','JUNTS':'Junts','EH Bildu':'EH Bildu'}.get(s,s)
DER={'PP','Vox','UPN'}; IZQ={'PSOE','PSC','Sumar','ERC','EH Bildu','BNG'}
bloc=lambda p:'der' if p in DER else 'izq' if p in IZQ else 'otr'
def dh(votes,valid,seats):
    el={k:v for k,v in votes.items() if v>=0.03*valid}
    q=sorted([(v/i,k,i) for k,v in el.items() for i in range(1,seats+1)],reverse=True)
    s={}
    for _,k,_i in q[:seats]: s[k]=s.get(k,0)+1
    last=q[seats-1]
    # next in line: highest quotient after last among other parties
    nxt=next(x for x in q[seats:] if x[1]!=last[1]) if len(q)>seats else None
    # votes short: party nxt needs (last_q*(s_n+1)) - votes_n +1
    short_by=None
    if nxt:
        n=nxt[1]; short_by=int(last[0]*(s.get(n,0)+1)-votes[n])+1
    # also any below-threshold party that would beat last? ignore
    sinesc={'der':0,'izq':0,'otr':0}
    for k,v in votes.items():
        if not s.get(k): sinesc[bloc(k)]+=v
    return dict(seats=s,last=last[1],lastQ=round(last[0]),next=nxt[1] if nxt else None,nextQ=round(nxt[0]) if nxt else None,shortBy=short_by,
                marginPct=round(short_by/valid*100,3) if short_by else None,sinEscano=sinesc)
# 2023 national shares
V=sum(d['valid'] for d in r23.values())
nat=lambda keys:sum(x['v'] for d in r23.values() for k,x in d['parties'].items() if short(k) in keys)/V*100
N23={'PP':nat({'PP'}),'PSOE':nat({'PSOE','PSC'}),'Vox':nat({'Vox'})}
POLLS=[("Sigma Dos / El Mundo","8-22 oct","26-10-2026",3122,30.6,26.1,19.9),("SocioMétrica / El Español","1 sep-25 oct","25-10-2026",3223,32.4,27,18.6),
("Target Point / El Debate","6-9 oct","11-10-2026",1002,32,25.9,18.7),("GAD3 / ABC","6-8 oct","12-10-2026",1077,31.4,26.4,18.2),
("GESOP / Prensa Ibérica","6-8 oct","12-10-2026",1000,28.7,26.1,18.9),("Hamalgama Métrica / Vozpópuli","5-8 oct","11-10-2026",1000,33.4,25.3,19.6),
("IMOP Insights / El Confidencial","13-16 oct","23-10-2026",1000,28.5,27.1,20),("NC Report / La Razón","22-24 oct","26-10-2026",1000,32.9,25.8,19),
("40dB / El País-SER","7-8 oct","2026-10",800,31.9,28.1,18.9),("DYM / Grupo Joly","5-7 oct","2026-10",1011,34,28.2,18.2),
("Ateneo del Dato / elDiario.es","20-22 oct","25-10-2026",2000,31.1,27.6,19.8),
("Winston / Artículo14","21-23 oct","26-10-2026",1200,29.4,27.1,19.2)]
A={'PP':sum(p[4] for p in POLLS)/len(POLLS),'PSOE':sum(p[5] for p in POLLS)/len(POLLS),'Vox':sum(p[6] for p in POLLS)/len(POLLS)}
A={k:round(v,2) for k,v in A.items()}
SW={k:A[k]-N23[k] for k in A}
out=[];ch=[]
for c,d in r23.items():
    votes={short(k):x['v'] for k,x in d['parties'].items()}
    valid=d['valid']; a=dh(votes,valid,d['seats'])
    assert a['seats']=={short(k):x['s'] for k,x in d['parties'].items() if x['s']}
    # 2026 projection
    sh={k:v/valid for k,v in votes.items()}; blank=1-sum(sh.values())
    new={}
    for k,v in sh.items():
        key='PSOE' if k=='PSC' else k
        if key in SW: new[k]=max(0,v+SW[key]/100)
    big23=sum(v for k,v in sh.items() if k in new); big26=sum(new.values())
    f=(1-big26)/(1-big23)
    for k,v in sh.items():
        if k not in new: new[k]=v*f
    v26={k:round(x*valid) for k,x in new.items()}
    seats26,pob=s26[c]
    b=dh(v26,valid,seats26)
    vps=lambda s: round(sum(votes.values())/len(s)) if s else 0
    out.append(dict(c=c,pob=pob,d26=seats26,d23=d['seats'],valid=valid,habDip=round(pob/seats26),
        y23=dict(**a,votes=dict(sorted(votes.items(),key=lambda x:-x[1])[:8]),votosPorEscano=round(sum(votes[k] for k in a['seats'])/d['seats'])),
        y26=dict(**b,votes=dict(sorted(v26.items(),key=lambda x:-x[1])[:8]),votosPorEscano=round(sum(v26[k] for k in b['seats'])/seats26))))
json.dump(dict(N23={k:round(v,2) for k,v in N23.items()},avg=A,swing={k:round(v,2) for k,v in SW.items()},polls=POLLS,prov=out),open('mapa.json','w'),ensure_ascii=False)
print(N23,A,SW)
for y in ('y23','y26'):
    print(y,sorted(((p[y]['marginPct'],p['c'],p[y]['last'],p[y]['next'],p[y]['shortBy']) for p in out if p[y]['shortBy']))[:6])
print('seats26 tot',{k:sum(p['y26']['seats'].get(k,0) for p in out) for k in ['PP','PSOE','PSC','Vox','Sumar','ERC','Junts','EH Bildu','EAJ-PNV','BNG','CCa','UPN']})
print('changes',[ (p['c'],p['y23']['last'],p['y26']['last']) for p in out if p['y23']['last']!=p['y26']['last']])
