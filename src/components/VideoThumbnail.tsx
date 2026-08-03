"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Play } from "lucide-react";

interface VideoThumbnailProps {
  src: string;
  /** Image statique pré-générée (prioritaire sur la capture dynamique) */
  thumbnail?: string;
  alt?: string;
  className?: string;
  objectFit?: "cover" | "contain";
  showPlayIcon?: boolean;
}

/**
 * Affiche la vignette d'une vidéo.
 *
 * - Si `thumbnail` est fourni (image statique pré-générée) → utilisé directement.
 * - Sinon → capture dynamique via <video> pausé à t=1s (déclenché au scroll).
 */
export function VideoThumbnail({
  src,
  thumbnail,
  alt = "Vignette vidéo",
  className = "",
  objectFit = "cover",
  showPlayIcon = true,
}: VideoThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Si on a une thumbnail statique, on ne fait pas de capture dynamique
  const useStaticThumb = !!thumbnail && !imgError;

  const initThumb = useCallback(() => {
    const video = videoRef.current;
    if (!video || videoReady || useStaticThumb) return;

    const onSeeked = () => setVideoReady(true);

    const trySeek = () => {
      // Aller à 1s (ou à 5% de la durée si la vidéo est courte)
      const seekTo = video.duration ? Math.min(1, video.duration * 0.05) : 1;
      video.currentTime = seekTo;
    };

    video.addEventListener("seeked", onSeeked, { once: true });
    video.addEventListener("loadeddata", trySeek, { once: true });
    video.addEventListener("loadedmetadata", trySeek, { once: true });

    video.preload = "auto";
    video.load();

    return () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", trySeek);
      video.removeEventListener("loadedmetadata", trySeek);
    };
  }, [videoReady, useStaticThumb]);

  useEffect(() => {
    if (useStaticThumb) return; // pas besoin de capture si on a une image statique

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          initThumb();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [initThumb, useStaticThumb]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-[#111] ${className}`}>

      {/* ── CAS 1 : image statique pré-générée (priorité) ── */}
      {useStaticThumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbnail}
          alt={alt}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full transition-opacity duration-400"
          style={{ objectFit, opacity: 1 }}
          loading="lazy"
        />
      )}

      {/* ── CAS 2 : capture dynamique via <video> ── */}
      {!useStaticThumb && (
        <>
          {/* Fond sombre pendant le chargement */}
          <div
            className="absolute inset-0 bg-[#111] transition-opacity duration-500"
            style={{ opacity: videoReady ? 0 : 1, pointerEvents: "none" }}
          />
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            src={src}
            preload="none"
            muted
            playsInline
            aria-label={alt}
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit,
              display: "block",
              opacity: videoReady ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
        </>
      )}

      {/* Icône Play superposée */}
      {showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40
                        flex items-center justify-center"
          >
            <Play size={20} className="text-white ml-1" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
}
