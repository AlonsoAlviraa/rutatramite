import json,math
g=json.load(open('esp.geojson'))
ISO={'ES-AB':'Albacete','ES-A':'Alicante/Alacant','ES-AL':'Almería','ES-O':'Asturias','ES-BA':'Badajoz','ES-PM':'Balears (Illes)','ES-B':'Barcelona','ES-BI':'Bizkaia','ES-BU':'Burgos','ES-S':'Cantabria','ES-CS':'Castellón/Castelló','ES-CE':'Ceuta','ES-CR':'Ciudad Real','ES-CU':'Cuenca','ES-CC':'Cáceres','ES-CA':'Cádiz','ES-CO':'Córdoba','ES-GI':'Girona','ES-SS':'Gipuzkoa','ES-GR':'Granada','ES-GU':'Guadalajara','ES-H':'Huelva','ES-HU':'Huesca','ES-J':'Jaén','ES-C':'Coruña (A)','ES-LO':'Rioja (La)','ES-GC':'Palmas (Las)','ES-LE':'León','ES-LU':'Lugo','ES-L':'Lleida','ES-M':'Madrid','ES-ML':'Melilla','ES-MU':'Murcia','ES-MA':'Málaga','ES-NA':'Navarra','ES-OR':'Ourense','ES-P':'Palencia','ES-PO':'Pontevedra','ES-SA':'Salamanca','ES-TF':'Santa Cruz de Tenerife','ES-SG':'Segovia','ES-SE':'Sevilla','ES-SO':'Soria','ES-T':'Tarragona','ES-TE':'Teruel','ES-TO':'Toledo','ES-V':'Valencia/València','ES-VA':'Valladolid','ES-ZA':'Zamora','ES-Z':'Zaragoza','ES-VI':'Araba/Álava','ES-AV':'Ávila'}
K=math.cos(math.radians(40)); S=60
def proj(lon,lat,can):
    if can: lon,lat=lon+19.5,lat+7.2  # inset
    return ((lon+9.6)*K*S, (44.2-lat)*S)
def dp(pts,eps):
    if len(pts)<3: return pts
    a,b=pts[0],pts[-1];dx,dy=b[0]-a[0],b[1]-a[1];L=math.hypot(dx,dy) or 1e-9
    i,md=0,0
    for j in range(1,len(pts)-1):
        d=abs(dy*(pts[j][0]-a[0])-dx*(pts[j][1]-a[1]))/L
        if d>md:i,md=j,d
    return dp(pts[:i+1],eps)[:-1]+dp(pts[i:],eps) if md>eps else [a,b]
out={}
for f in g['features']:
    iso=f['properties']['iso_3166_2'];c=ISO[iso];can=iso in('ES-GC','ES-TF')
    polys=f['geometry']['coordinates'] if f['geometry']['type']=='MultiPolygon' else [f['geometry']['coordinates']]
    d=''
    for poly in polys:
        ring=[proj(x,y,can) for x,y in poly[0]]
        h=len(ring)//2; r=dp(ring[:h+1],0.5)[:-1]+dp(ring[h:],0.5)
        area=abs(sum(r[i][0]*r[i-1][1]-r[i-1][0]*r[i][1] for i in range(len(r))))/2
        if len(r)<4 or (area<1.5 and iso not in('ES-CE','ES-ML')): continue
        d+='M'+'L'.join(f'{x:.1f} {y:.1f}' for x,y in r)+'Z'
    xs=[proj(x,y,can) for poly in polys for x,y in poly[0]]
    cx=sum(p[0] for p in xs)/len(xs);cy=sum(p[1] for p in xs)/len(xs)
    out[c]={'d':d,'cx':round(cx,1),'cy':round(cy,1)}
allp=[float(v) for o in out.values() for v in o['d'].replace('M',' ').replace('L',' ').replace('Z',' ').split()]
print(min(allp[0::2]),max(allp[0::2]),min(allp[1::2]),max(allp[1::2]),sum(len(o['d']) for o in out.values()))
json.dump(out,open('paths.json','w'),ensure_ascii=False)
