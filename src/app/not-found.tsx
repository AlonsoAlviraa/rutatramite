import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { NotFoundSearch } from "@/components/ui/NotFoundSearch";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "Busca otra guía de RutaTrámite o vuelve al directorio de trámites.",
  alternates: null,
  openGraph: null,
  twitter: null,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell wide={false}>
      <p className="rt-kicker">Error 404</p>
      <h1 className="mt-3 font-display text-4xl text-mossDark">Página no encontrada</h1>
      <p className="mt-4">
        No encontramos esta dirección. Puedes buscar la guía que necesitas o volver al directorio.
      </p>
      <NotFoundSearch />
      <p className="mt-6"><a className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4" href="/#tramites">Ver todos los trámites</a></p>
    </PageShell>
  );
}
