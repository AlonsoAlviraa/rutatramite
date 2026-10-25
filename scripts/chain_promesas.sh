set -e
cd "$(dirname "$0")/.."
S=scripts
python3 $S/sync_promesas_contrato_20261019.py
python3 $S/sync_promesas_podemos_20261019.py
python3 $S/sync_promesas_mitines_20261020.py
python3 $S/sync_promesas_mitines_20261021.py
python3 $S/sync_promesas_pp_sevilla_20261021.py
[ "$WITH22" = 1 ] && python3 $S/sync_promesas_mitines_20261022.py
[ "$WITH23" = 1 ] && python3 $S/sync_promesas_mitines_20261023.py
[ "$WITH24" = 1 ] && python3 $S/sync_promesas_mitines_20261024.py
[ "$WITH25" = 1 ] && python3 $S/sync_promesas_mitines_20261025.py
python3 $S/gen_promesas_29n.py
python3 $S/splice_promesas_ts.py
python3 $S/patch_promesas_temas_20261019.py
python3 $S/edit_programas_mitines_20261019.py
python3 $S/exploit_clicks_20261019.py
python3 $S/link_cuando_29n_20261019.py
python3 $S/link_voto_nulo_20261019.py
python3 $S/gen_contrato_pp_20261019.py
python3 $S/edit_contrato_pp_20261019.py
python3 $S/edit_podemos_5p_20261019.py
python3 $S/edit_programas_mitines_20261020.py
python3 $S/edit_programas_mitines_20261021.py
python3 $S/edit_programas_pp_sevilla_20261021.py
[ "$WITH22" = 1 ] && python3 $S/edit_programas_mitines_20261022.py
: # rutina_contenido_20261021.py ya aplicado; falla tras el cambio de title del sorteo (24-10)
: # rutina_contenido_20261022.py ya aplicado; falla por la fecha de cuando-29n.ts

python3 $S/link_promesas_incumplidas_20261022.py
python3 $S/link_maricarmen_huelga_20261022.py
python3 $S/fix_anclas_promesas_20261023.py
[ "$WITH23" = 1 ] && python3 $S/edit_programas_mitines_20261023.py
[ "$WITH24" = 1 ] && python3 $S/edit_programas_mitines_20261024.py
[ "$WITH25" = 1 ] && python3 $S/edit_programas_mitines_20261025.py
true
