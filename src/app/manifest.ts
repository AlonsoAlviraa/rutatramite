import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RutaTrámite",
    short_name: "RutaTrámite",
    description: "Guías para hacer tus trámites en España.",
    start_url: "/",
    display: "browser",
    background_color: "#FAF7F2",
    theme_color: "#1B4332",
    lang: "es",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
