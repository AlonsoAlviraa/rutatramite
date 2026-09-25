"use client";

import { useState } from "react";
import { youtubeNocookieEmbedUrl, youtubeThumbnailUrl } from "@/lib/youtube/shorts";

export function YoutubeShortFacade({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="yt-short" style={{ aspectRatio: "9/16", width: "min(11.25rem, 46vw)" }}>
      {playing ? (
        <iframe
          src={`${youtubeNocookieEmbedUrl(videoId)}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button type="button" className="yt-short-hit" onClick={() => setPlaying(true)} aria-label={`Reproducir: ${title}`}>
          <img
            src={youtubeThumbnailUrl(videoId)}
            alt=""
            width={480}
            height={360}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          <span className="yt-short-play">Reproducir</span>
        </button>
      )}
    </div>
  );
}
