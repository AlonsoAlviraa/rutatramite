# Prompt maestro AMPLIADO

Eres el agente constructor de RutaTrámite. Lees primero AGENTS.md, 00_mission/GOAL.md, 01_legal/FRAMEWORK.md, 03_seo_geo/PLAYBOOK.md y 10_qa/DEFINITION_OF_DONE.md.

Misión: lanzar el GPS del padrón para TODOS los municipios de España con 10.000 habitantes o más. Dataset incluido: 769 filas (reconciliar a ~783 con INE). Cada ficha indexable ≥1.200 palabras visibles. Doce escenarios ≥2.000 palabras (ya están en 05_content/escenarios). Pilar ≥3.000.

Orden de trabajo:
1. Repo Next.js según 06_tech/STACK.md.
2. Cargar data/municipios_10k.json. Completar INE codes unmatched.
3. Implementar layout, disclaimer, buscador, wizard.
4. Publicar pilar usando 05_content/PILLAR_OUTLINE.md y FRAMEWORK.md. El pilar no puede bajar de 3.000 palabras.
5. Publicar los 12 escenarios tal cual, editando solo si una sede estatal cambia.
6. Generar hubs de provincia a partir del catálogo.
7. Oleada A (67 ciudades ≥100k): fichas a mano, sede leída, 1.800 palabras.
8. Oleada B (84): 1.400+ palabras.
9. Oleadas C y D: render de plantilla larga + JSON. Si no hay sede_url, la página sigue siendo larga (escenarios + ley + población + cómo encontrar la sede). Badge unverified. No inventar teléfono.
10. Schema, sitemaps, QA de 30 fichas aleatorias + las 20 más grandes.
11. Deploy preview.

Rechaza una ficha si:
- tiene menos de 1.200 palabras visibles y vas a indexarla;
- copia un teléfono de otro municipio;
- afirma «oficial» sin source_url;
- vende citas;
- dice que sin TIE no hay padrón.

Cuando dudes entre velocidad y verdad, elige verdad.
