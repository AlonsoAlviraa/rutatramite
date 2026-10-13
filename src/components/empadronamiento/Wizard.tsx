"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MunicipioTypeahead } from "@/components/empadronamiento/MunicipioTypeahead";
import { OfficialCta } from "@/components/empadronamiento/OfficialCta";
import { RadioOption } from "@/components/ui/RadioOption";
import { runWizard } from "@/lib/wizard/engine";
import type { ClientMunicipio } from "@/lib/wizard/clientIndex";
import { loadRemoteClientIndex } from "@/lib/wizard/loadClientIndex";
import type { Housing, Nacionalidad, Tramite, WizardAnswers } from "@/lib/types";
import { ESCENARIO_LABELS, WIZARD_QUESTIONS } from "@/lib/types";
import { escenarioPath } from "@/lib/geo/paths";
import { sendMetric } from "@/lib/metrics/events";

const empty: WizardAnswers = {
  ineCode: null,
  housing: null,
  nacionalidad: null,
  nieTie: null,
  menores: null,
  tramite: null,
};

const HOUSING_OPTIONS: [Housing, string][] = [
  ["contrato", "Sí, el contrato o la escritura está a mi nombre"],
  ["no-contrato", "No está a mi nombre"],
  ["propietario", "Soy propietario"],
  ["sin-papeles", "No tengo papeles de la casa"],
  ["sin-techo", "No tengo techo"],
];

const NACIONALIDAD_OPTIONS: [Nacionalidad, string][] = [
  ["espanola", "Española"],
  ["ue", "UE, EEE o Suiza"],
  ["resto", "Otra nacionalidad"],
];

const TRAMITE_OPTIONS: [Tramite, string][] = [
  ["alta", "Alta"],
  ["cambio", "Cambio de domicilio"],
  ["volante", "Volante"],
  ["certificado", "Certificado"],
  ["renovacion", "Renovación 2 años"],
];

export function visibleWizardAnswers(answers: WizardAnswers, municipioName: string | null): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [
    { label: "Municipio", value: municipioName?.trim() || "Sin ficha en esta guía" },
  ];
  const housingLabel = HOUSING_OPTIONS.find(([value]) => value === answers.housing)?.[1];
  if (housingLabel) rows.push({ label: "Vivienda", value: housingLabel });
  const nacionalidadLabel = NACIONALIDAD_OPTIONS.find(([value]) => value === answers.nacionalidad)?.[1];
  if (nacionalidadLabel) rows.push({ label: "Nacionalidad", value: nacionalidadLabel });
  if (answers.nacionalidad && answers.nacionalidad !== "espanola" && answers.nieTie !== null) {
    rows.push({ label: "NIE o TIE", value: answers.nieTie ? "Sí" : "No" });
  }
  if (answers.menores !== null) rows.push({ label: "Menores", value: answers.menores ? "Sí" : "No" });
  const tramiteLabel = TRAMITE_OPTIONS.find(([value]) => value === answers.tramite)?.[1];
  if (tramiteLabel) rows.push({ label: "Trámite", value: tramiteLabel });
  return rows;
}

export function Wizard({ index }: { index?: ClientMunicipio[] }) {
  const seeded = index && index.length > 0 ? index : null;
  const [remote, setRemote] = useState<ClientMunicipio[] | null>(seeded);
  useEffect(() => {
    if (seeded) return;
    let cancelled = false;
    loadRemoteClientIndex()
      .then((rows) => {
        if (!cancelled) setRemote(rows);
      })
      .catch(() => {
        if (!cancelled) setRemote([]);
      });
    return () => {
      cancelled = true;
    };
  }, [seeded]);
  const rows = remote ?? [];
  const [answers, setAnswers] = useState<WizardAnswers>(empty);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [step, setStep] = useState(0);
  const panel = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const municipio = useMemo(
    () => rows.find((m) => m.ine_code === answers.ineCode) ?? null,
    [rows, answers.ineCode],
  );
  const skipNie = answers.nacionalidad === "espanola";
  const ready =
    answers.ineCode &&
    answers.housing &&
    answers.nacionalidad &&
    (skipNie || answers.nieTie !== null) &&
    answers.menores !== null &&
    answers.tramite;
  const result = ready ? runWizard(answers, municipio) : null;
  const completed = [
    answers.ineCode,
    answers.housing,
    answers.nacionalidad,
    skipNie || answers.nieTie !== null,
    answers.menores !== null,
    answers.tramite,
  ].map(Boolean);
  const visibleSteps = skipNie ? 5 : 6;
  function visibleNumber(s: number) {
    if (!skipNie) return s + 1;
    return s <= 2 ? s + 1 : s;
  }
  function adjacent(from: number, dir: 1 | -1) {
    let next = from + dir;
    if (skipNie && next === 3) next += dir;
    return next;
  }
  const progressStep = step < 6 ? visibleNumber(step) : visibleSteps;
  function go(next: number) {
    if (next === 1 && !started.current) { sendMetric("wizard_start"); started.current = true; }
    if (next === 6 && result) sendMetric("wizard_complete");
    setStep(next);
    setCopied(false);
    setCopyError(false);
    panel.current?.focus();
  }

  return (
    <form
      ref={panel}
      tabIndex={-1}
      aria-label="Asistente de empadronamiento"
      className="space-y-6"
      data-wizard=""
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-moss">
          Paso {progressStep} de {visibleSteps}
        </p>
        <div className="rt-progress mt-2" aria-hidden="true">
          <span style={{ width: `${(progressStep / visibleSteps) * 100}%` }} />
        </div>
      </div>
      <ol className="sr-only" data-wizard-questions="">
        {WIZARD_QUESTIONS.map((q, i) => (
          <li key={q} className={completed[i] ? "is-done" : i === step ? "is-current" : ""}>
            {q}
          </li>
        ))}
      </ol>

      <div hidden={step !== 0}>
      <MunicipioTypeahead
        index={rows}
        value={answers.ineCode}
        onChange={(ine) => setAnswers((a) => ({ ...a, ineCode: ine }))}
      />
      </div>

      <fieldset hidden={step !== 1}>
        <legend className="text-sm font-semibold">¿El contrato o la escritura está a tu nombre?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {HOUSING_OPTIONS.map(([v, label]) => (
            <RadioOption
              key={v}
              name="housing"
              value={v}
              checked={answers.housing === v}
              onChange={() => setAnswers((a) => ({ ...a, housing: v }))}
              label={label}
            />
          ))}
        </div>
      </fieldset>

      <fieldset hidden={step !== 2}>
        <legend className="text-sm font-semibold">Nacionalidad</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {NACIONALIDAD_OPTIONS.map(([v, label]) => (
            <RadioOption
              key={v}
              name="nacionalidad"
              value={v}
              checked={answers.nacionalidad === v}
              onChange={() =>
                setAnswers((a) => ({
                  ...a,
                  nacionalidad: v,
                  nieTie: v === "espanola" ? false : a.nacionalidad === "espanola" ? null : a.nieTie,
                }))
              }
              label={label}
            />
          ))}
        </div>
      </fieldset>

      <fieldset hidden={step !== 3 || skipNie}>
        <legend className="text-sm font-semibold">¿Tienes NIE o TIE?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[
            [true, "Sí"],
            [false, "No"],
          ].map(([v, label]) => (
            <RadioOption
              key={String(v)}
              name="nieTie"
              value={String(v)}
              checked={answers.nieTie === v}
              onChange={() => setAnswers((a) => ({ ...a, nieTie: v as boolean }))}
              label={String(label)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset hidden={step !== 4}>
        <legend className="text-sm font-semibold">¿Hay menores en el alta?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[
            [true, "Sí"],
            [false, "No"],
          ].map(([v, label]) => (
            <RadioOption
              key={String(v)}
              name="menores"
              value={String(v)}
              checked={answers.menores === v}
              onChange={() => setAnswers((a) => ({ ...a, menores: v as boolean }))}
              label={String(label)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset hidden={step !== 5}>
        <legend className="text-sm font-semibold">
          ¿Quieres alta, cambio de domicilio, volante, certificado o renovación 2 años?
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {TRAMITE_OPTIONS.map(([v, label]) => (
            <RadioOption
              key={v}
              name="tramite"
              value={v}
              checked={answers.tramite === v}
              onChange={() => setAnswers((a) => ({ ...a, tramite: v }))}
              label={label}
            />
          ))}
        </div>
      </fieldset>

      {step < 6 && <div className="flex items-center justify-between gap-3 border-t border-sand pt-5">
        <button type="button" className="wizard-back" disabled={step === 0} onClick={() => go(adjacent(step, -1))}>Atrás</button>
        <button type="button" className="wizard-next" disabled={!completed[step]} onClick={() => go(adjacent(step, 1))}>{step === 5 ? "Ver mi guía" : "Continuar"}</button>
      </div>}
      {step === 6 && result ? (
        <div className="rt-result space-y-3" data-wizard-output="">
          <p className="rt-kicker">Tu ruta</p>
          <button type="button" className="underline text-sm" onClick={() => go(0)}>Revisar mis respuestas</button>
          <h3 className="font-semibold">Tus respuestas</h3>
          <dl className="space-y-1 text-sm" data-wizard-answers="">
            {visibleWizardAnswers(answers, municipio?.name ?? null).map((row) => (
              <div key={row.label}>
                <dt className="font-semibold">{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          <p>
            Caso detectado:{" "}
            <a className="font-semibold underline decoration-sand underline-offset-2" href={escenarioPath(result.primary)} data-caso-spoke="">
              {result.label}
            </a>
          </p>
          {result.extras.length ? (
            <p className="text-sm">
              También te aplica:{" "}
              {result.extras.map((s) => (
                <a key={s} className="mr-2 underline decoration-sand underline-offset-2" href={escenarioPath(s)}>
                  {ESCENARIO_LABELS[s]}
                </a>
              ))}
            </p>
          ) : null}
          {result.municipioPath ? (
            <p>
              Ficha:{" "}
              <a className="underline decoration-sand underline-offset-2" href={result.municipioPath}>
                {municipio?.name}
              </a>
            </p>
          ) : (
            <p>Municipio no seleccionado o sin ficha.</p>
          )}
          {result.confidence !== "official" && result.confidence !== "unknown" ? (
            <p className="text-sm">Aviso: la ficha local no está verificada como lectura oficial de sede.</p>
          ) : null}
          <h3 className="font-semibold">Checklist de documentos</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm" data-checklist="">
            {result.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <OfficialCta href={result.sedeUrl} label="Ir a la sede del ayuntamiento" />
            {result.citaUrl ? (
              <OfficialCta href={result.citaUrl} label="Pedir cita en la sede oficial" variant="secondary" />
            ) : null}
          </div>
          {result.searchHint ? <p className="text-sm">{result.searchHint}</p> : null}
          <button
            type="button"
            className="rounded-lg border border-sand px-3 py-2 text-sm font-semibold"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(result.checklist.join("\n"));
                setCopied(true);
                setCopyError(false);
                sendMetric("model_copy");
              } catch { setCopyError(true); }
            }}
          >
            {copied ? "Checklist copiada" : "Copiar checklist"}
          </button>
          {copyError && <p role="status" className="text-sm">No se ha podido copiar. Puedes seleccionar la lista y copiarla manualmente.</p>}
        </div>
      ) : (
        <p className="text-sm text-ink/70">Tus respuestas solo se usan en este navegador para preparar tu guía.</p>
      )}
    </form>
  );
}
