import { PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/seo/meta";
import { CONTACT_EMAIL } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description: "Contacto de RutaTrámite: correo editorial. No es un canal de citas ni de trámites.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <PageShell as="article" className="space-y-4">
      <h1 className="font-display text-4xl">Contacto</h1>
      <p>
        Para comunicar un error en una guía o proponer una corrección, escribe a nuestro
        correo editorial: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Qué incluir</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>El enlace de la página que quieres que revisemos.</li>
        <li>El dato o la explicación que necesita una corrección.</li>
        <li>La fuente oficial que permite comprobarlo, si la tienes.</li>
      </ul>
      <p>No adjuntes documentos de identidad ni datos personales de tu expediente.</p>
      <h2 className="pt-4 text-2xl font-semibold">Para gestionar tu trámite</h2>
      <p>
        Contacta con el organismo responsable a través de su canal oficial. Este buzón
        no permite reservar citas, presentar solicitudes ni consultar el estado de un expediente.
      </p>
    </PageShell>
  );
}
