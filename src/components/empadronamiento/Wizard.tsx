"use client";

import { useMemo, useRef, useState } from "react";
import { MunicipioTypeahead } from "@/components/empadronamiento/MunicipioTypeahead";
import { OfficialCta } from "@/components/empadronamiento/OfficialCta";
import { RadioOption } from "@/components/ui/RadioOption";
import { runWizard } from "@/lib/wizard/engine";
import type { Housing, MunicipioIndexEntry, Nacionalidad, Tramite, WizardAnswers } from "@/lib/types";
import { WIZARD_QUESTIONS } from "@/lib/types";
import { escenarioPath } from "@/lib/geo/paths";

const empty: WizardAnswers = {
  ineCode: null,
  housing: null,
  nacionalidad: null,
  nieTie: null,
  menores: null,
  tramite: null,
};

export function Wizard({ index }: { index: MunicipioIndexEntry[] }) {
  const [answers, setAnswers] = useState<WizardAnswers>(empty);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [step, setStep] = useState(0);
  const panel = useRef<HTMLFormElement>(null);
  const municipio = useMemo(
    () => index.find((m) => m.ine_code === answers.ineCode) ?? null,
    [index, answers.ineCode],
  );
  const ready =
    answers.ineCode &&
    answers.housing &&
    answers.nacionalidad &&
    answers.nieTie !== null &&
    answers.menores !== null &&
    answers.tramite;
  const result = ready ? runWizard(answers, municipio) : null;
  const completed = [
    answers.ineCode,
    answers.housing,
    answers.nacionalidad,
    answers.nieTie !== null,
    answers.menores !== null,
    answers.tramite,
  ].map(Boolean);
  const doneCount = completed.filter(Boolean).length;
  function go(next: number) {
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
          {doneCount} de 6 respondidas
        </p>
        <div className="rt-progress mt-2" aria-hidden="true">
          <span style={{ width: `${(doneCount / 6) * 100}%` }} />
        </div>
      </div>
      <ol className="wizard-steps sr-only" data-wizard-questions="">
        {WIZARD_QUESTIONS.map((q, i) => (
          <li key={q} className={completed[i] ? "is-done" : i === step ? "is-current" : ""}>
            {q}
          </li>
        ))}
      </ol>

      <div hidden={step !== 0}>
      <MunicipioTypeahead
        index={index}
        value={answers.ineCode}
        onChange={(ine) => setAnswers((a) => ({ ...a, ineCode: ine }))}
      />
      </div>

      <fieldset hidden={step !== 1}>
        <legend className="text-sm font-semibold">¿El contrato o la escritura está a tu nombre?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {(
            [
              ["contrato", "Sí, el contrato o la escritura está a mi nombre"],
              ["no-contrato", "No"],
              ["propietario", "Soy propietario"],
              ["sin-papeles", "No tengo papeles de la casa"],
              ["sin-techo", "No tengo techo"],
            ] as [Housing, string][]
          ).map(([v, label]) => (
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
          {(
            [
              ["espanola", "Española"],
              ["ue", "UE-EEE-CH"],
              ["resto", "Resto"],
            ] as [Nacionalidad, string][]
          ).map(([v, label]) => (
            <RadioOption
              key={v}
              name="nacionalidad"
              value={v}
              checked={answers.nacionalidad === v}
              onChange={() => setAnswers((a) => ({ ...a, nacionalidad: v }))}
              label={label}
            />
          ))}
        </div>
      </fieldset>

      <fieldset hidden={step !== 3}>
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
          {(
            [
              ["alta", "Alta"],
              ["cambio", "Cambio de domicilio"],
              ["volante", "Volante"],
              ["certificado", "Certificado"],
              ["renovacion", "Renovación 2 años"],
            ] as [Tramite, string][]
          ).map(([v, label]) => (
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
        <button type="button" className="wizard-back" disabled={step === 0} onClick={() => go(step - 1)}>Atrás</button>
        <span className="text-xs text-ink/70">Paso {step + 1} de 6</span>
        <button type="button" className="wizard-next" disabled={!completed[step]} onClick={() => go(step + 1)}>{step === 5 ? "Ver mi guía" : "Continuar"}</button>
      </div>}
      {step === 6 && result ? (
        <div className="rt-result space-y-3" data-wizard-output="">
          <p className="rt-kicker">Tu ruta</p>
          <button type="button" className="underline text-sm" onClick={() => go(0)}>Revisar mis respuestas</button>
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
                  {s}
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
