import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { YoutubeShortFacade } from "@/components/youtube/YoutubeShortFacade";
import { YOUTUBE_CHANNEL_URL, shortForPath, videoObjectJsonLd } from "@/lib/youtube/shorts";

export function GuideShort({ path }: { path: string }) {
  const short = shortForPath(path);
  if (!short) return null;

  return (
    <aside className="yt-short-block" data-yt-short={short.videoId}>
      <JsonLd data={videoObjectJsonLd(short)} />
      <h2 className="font-display text-2xl text-mossDark">Míralo en 20 segundos</h2>
      <p className="text-sm leading-relaxed">{short.name}</p>
      <YoutubeShortFacade videoId={short.videoId} title={short.name} />
      <p className="text-sm">
        <a href={YOUTUBE_CHANNEL_URL} rel="noopener noreferrer">
          Más Shorts en el canal de RutaTrámite
        </a>
      </p>
      <p className="text-sm text-ink/70">El reproductor de YouTube se carga solo si pulsas reproducir.</p>
    </aside>
  );
}
