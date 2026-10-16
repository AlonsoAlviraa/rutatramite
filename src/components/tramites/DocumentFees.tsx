import { CITA_DNI_URL, TASA_DNI_LABEL, TASA_PASAPORTE_LABEL } from "@/lib/tramites/facts";

export function DocumentFees({ passport }: { passport: boolean }) {
  return <section aria-labelledby="tasas-documentos" className="mt-7 space-y-4 border border-sand p-5">
    <h2 id="tasas-documentos" className="font-display text-2xl text-mossDark">{passport ? "¿Cuánto cuesta hacer o renovar el pasaporte?" : "¿Cuánto cuesta renovar el DNI en 2026?"}</h2>
    <p>{passport ? <>El pasaporte ordinario cuesta <strong>{TASA_PASAPORTE_LABEL}</strong> en España. Es la tasa general tanto para obtenerlo por primera vez como para renovarlo o sustituirlo por pérdida, robo o deterioro.</> : <>La tasa general del DNI es de <strong>{TASA_DNI_LABEL}</strong>. Renovarlo por caducidad o pedir un duplicado por pérdida, robo o deterioro no elimina por sí solo el pago.</>}</p>
    <dl className="grid gap-4 sm:grid-cols-2"><div><dt className="font-semibold">DNI</dt><dd>{TASA_DNI_LABEL}, salvo exención.</dd></div><div><dt className="font-semibold">Pasaporte ordinario</dt><dd>{TASA_PASAPORTE_LABEL}, salvo exención.</dd></div></dl>
    <p>La condición de familia numerosa, acreditada con título o carné vigente, permite la gratuidad de ambos documentos. El DNI también es gratuito al renovar un documento en vigor por cambio de domicilio o filiación, y para menores de 14 años de una unidad de convivencia que solicite el ingreso mínimo vital.</p>
    <p>Puedes pagar en efectivo o con tarjeta en la unidad de documentación, o por vía telemática al solicitar la cita. La reserva de cita es gratuita; <a className="underline" href="https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-18093">llamar al 060 tiene coste, con un precio fijo por llamada</a>. Estos importes corresponden a los documentos, no a un servicio de esta web.</p>
    <p className="text-sm">Tasas contrastadas el <time dateTime="2026-09-14">14 de septiembre de 2026</time>: <a className="underline" href="https://www.dnielectronico.es/PortalDNIe/PRF1_Cons02.action?id_menu=7_+8&pag=REF_480">Policía: tasas y exenciones del DNI</a> · <a className="underline" href="https://www.dnielectronico.es/PortalDNIe/PRF1_Cons02.action?id_menu=55&pag=REF_1086">Policía: tasas del pasaporte</a>.</p>
    <p className="flex flex-wrap gap-4"><a className="underline font-semibold" href={CITA_DNI_URL}>Pedir cita en el portal oficial</a><a className="underline" href="/dni/checklist">Documentos y formas de pago</a><a className="underline" href={passport ? "/pasaporte/cita-previa" : "/dni/cita-previa"}>Cómo preparar la cita</a></p>
  </section>;
}
