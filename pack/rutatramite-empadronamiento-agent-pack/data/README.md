# Datos del pack ampliado

- `municipios_10k.json` / `municipios_10k.csv`: 769 municipios con población pública ≥10.000 a 1 de enero de 2025.
- `CATALOGO_10K.md`: índice por provincia.
- Oleadas: A 67 (≥100k), B 84 (50–100k), C 272 (20–50k), D 346 (10–20k).
- INE estima ~783 en la tabla de tamaños (≥10.001). El agente descarga pobmun oficial y añade los que falten. No se queda en 20.
- `matched_ine=false` (~80 nombres en forma castellana antigua): resolver a mano con el CSV CodeForSpain.
- Código INE de 5 dígitos = ID estable.
- Población agregada del listado ≈ 39,1 millones.

Comando de reconciliación (cuando exista el xlsx INE):
filtrar pob >= 10000, join por municipio_id, regenerar este directorio.
