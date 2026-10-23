import re,html,json,unicodedata
h=open('/tmp/boe23.html',encoding='utf-8',errors='ignore').read()
cl=lambda c:html.unescape(re.sub('<.*?>','',c)).replace('\xa0',' ').strip()
num=lambda s:int(s.replace('.','')) if s.strip('. ') else 0
prov={}
for t in re.findall(r'<table.*?</table>',h,re.S):
    rows=[[cl(c) for c in re.findall(r'<t[dh].*?</t[dh]>',r,re.S)] for r in re.findall(r'<tr.*?</tr>',t,re.S)]
    head=rows[0][1:]; seated = head[0]=='Total escaños'
    parties=head[1:] if seated else head
    for r in rows[2:]:
        name=r[0].rstrip('.')
        if name.startswith('Total'): continue
        d=prov.setdefault(name,{'seats':0,'parties':{}})
        if seated:
            d['seats']=int(r[1]); vals=r[2:]
            for i,p in enumerate(parties):
                v,s=vals[2*i],vals[2*i+1]
                if v.strip('. '): d['parties'][p]={'v':num(v),'s':int(s or 0)}
        else:
            for i,p in enumerate(parties):
                v=r[1+i] if 1+i<len(r) else ''
                if v.strip('. '): d['parties'][p]={'v':num(v),'s':0}
# valid votes from cuadro I
txt=open('/tmp/c1.txt').read()
def norm(s): return unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower().replace('(','').replace(')','').replace('/',' ').split()[0]
val={}
for m in re.finditer(r'^\s{5,}([A-ZÁÉÍÓÚÑ][^\d]+?)\s{2,}([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)',txt,re.M):
    val[m.group(1).strip()]=num(m.group(4))
print(len(prov),len(val))
def key(n):
    n=n.replace('Balears (Illes)','Balears').replace('Illes Balears','Balears')
    return unicodedata.normalize('NFKD',n).encode('ascii','ignore').decode().lower().split('/')[0].split(' (')[0].replace('.','').strip()
vk={key(k):v for k,v in val.items()}
miss=[]
for n,d in prov.items():
    d['valid']=vk.get(key(n))
    if d['valid'] is None: miss.append(n)
print('missing valid',miss, [k for k in vk if k not in {key(n) for n in prov}])
json.dump(prov,open('r23.json','w'),ensure_ascii=False,indent=0)
