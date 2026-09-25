/** Published RutaTrámite Shorts and the guide each one explains. */
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@rutatramitebot";

/** Channel publish date for this first batch. Time of day is unknown, so the date stands alone. */
export const SHORTS_UPLOAD_DATE = "2026-09-24";

export type GuideShort = {
  videoId: string;
  path: string;
  /** Public title, without the #Shorts tag. */
  name: string;
  description: string;
  uploadDate: typeof SHORTS_UPLOAD_DATE;
};

export const GUIDE_SHORTS: readonly GuideShort[] = [
  {
    videoId: "Ywv0Yw4PfYQ",
    path: "/empadronarse/extranjeros-no-ue",
    name: "¿Estás en España sin papeles? Sí puedes empadronarte.",
    description: "Short de RutaTrámite: puedes empadronarte en España aunque estés sin papeles.",
    uploadDate: SHORTS_UPLOAD_DATE,
  },
  {
    videoId: "bQX7V-y5A5I",
    path: "/extranjeria/arraigo-padron",
    name: "El padrón NO te regulariza. Pero para el arraigo importa mucho.",
    description: "Short de RutaTrámite: el padrón no regulariza, pero sí cuenta para el arraigo.",
    uploadDate: SHORTS_UPLOAD_DATE,
  },
  {
    videoId: "deo6lRKLWx8",
    path: "/empadronarse/sin-contrato",
    name: "¿Vives en casa de un familiar? Sí puedes empadronarte.",
    description: "Short de RutaTrámite: puedes empadronarte si vives en casa de un familiar.",
    uploadDate: SHORTS_UPLOAD_DATE,
  },
  {
    videoId: "jxIv0WcFwQo",
    path: "/empadronarse/renovacion-2-anos",
    name: "“El padrón caduca a los 2 años”: cierto, pero no para todos.",
    description: "Short de RutaTrámite: la caducidad del padrón a los dos años no afecta a todo el mundo.",
    uploadDate: SHORTS_UPLOAD_DATE,
  },
  {
    videoId: "9T2oMY8qIr8",
    path: "/empadronarse/extranjeros-ue",
    name: "¿Eres de la UE? No esperes al certificado de registro.",
    description: "Short de RutaTrámite: si eres de la UE, no hace falta esperar al certificado de registro para empadronarte.",
    uploadDate: SHORTS_UPLOAD_DATE,
  },
  {
    videoId: "VF2Lgwxc7N8",
    path: "/empadronarse",
    name: "Cita para empadronarte en Madrid: no compliques la búsqueda.",
    description: "Short de RutaTrámite: cómo enfocar la cita para empadronarte en Madrid.",
    uploadDate: SHORTS_UPLOAD_DATE,
  },
];

const byPath = new Map(GUIDE_SHORTS.map((short) => [short.path, short]));

export function shortForPath(path: string): GuideShort | undefined {
  return byPath.get(path);
}

export function youtubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function youtubeNocookieEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function videoObjectJsonLd(short: GuideShort) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject" as const,
    name: short.name,
    description: short.description,
    thumbnailUrl: youtubeThumbnailUrl(short.videoId),
    uploadDate: short.uploadDate,
    embedUrl: youtubeNocookieEmbedUrl(short.videoId),
    contentUrl: `https://www.youtube.com/shorts/${short.videoId}`,
  };
}
