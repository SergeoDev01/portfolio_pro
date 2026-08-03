"use client";
import { useState, useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { Play, Loader2 } from "lucide-react";

type VideoOrientation = "landscape" | "portrait" | "square" | null;

export function LazyVideo({
  src,
  poster,
  className = "",
  autoDetectOrientation = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  /**
   * Si true, LazyVideo détecte l'orientation réelle de la vidéo
   * et applique le bon aspect-ratio automatiquement, en ignorant
   * tout aspect-ratio fixé dans className.
   */
  autoDetectOrientation?: boolean;
}) {
  const { ref, inView } = useInView();
  const [playing, setPlaying] = useState(false);
  const [orientation, setOrientation] = useState<VideoOrientation>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const metaVideoRef = useRef<HTMLVideoElement>(null);

  // Détecter l'orientation dès que la vidéo est dans le viewport
  useEffect(() => {
    if (!autoDetectOrientation || !inView || orientation) return;

    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = `${src}#t=0.1`;
    video.muted = true;

    const handleMeta = () => {
      const w = video.videoWidth;
      const h = video.videoHeight;
      if (w > 0 && h > 0) {
        const ratio = w / h;
        if (ratio > 1.1) setOrientation("landscape");
        else if (ratio < 0.9) setOrientation("portrait");
        else setOrientation("square");
      }
      video.src = "";
    };

    video.addEventListener("loadedmetadata", handleMeta);
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleMeta);
    };
  }, [src, inView, autoDetectOrientation, orientation]);

  // Calcul de l'aspect ratio à appliquer
  const aspectRatioClass =
    autoDetectOrientation && orientation
      ? orientation === "portrait"
        ? "aspect-[9/16]"
        : orientation === "square"
        ? "aspect-square"
        : "aspect-video"
      : "";

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-[#1D0101] ${
        autoDetectOrientation && orientation ? aspectRatioClass : ""
      } ${
        // Filtrer aspect-video du className si on auto-détecte
        autoDetectOrientation && orientation
          ? className.replace(/aspect-\S+/, "")
          : className
      }`}
    >
      {/* Skeleton tant que pas encore visible */}
      {!inView && (
        <div className="absolute inset-0 bg-[#1D0101]/80 animate-pulse" />
      )}

      {/* Vidéo — chargée uniquement quand visible */}
      {inView && (
        <>
          <video
            src={playing ? src : `${src}#t=0.1`}
            poster={poster}
            preload={poster ? "none" : "metadata"}
            autoPlay={playing}
            controls={playing}
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Loader spécifique à la vidéo */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-tint)] z-30">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-[var(--color-accent)] animate-spin" />
                <p className="text-xs text-[var(--color-dark)]/50 tracking-wide">Chargement de la vidéo...</p>
              </div>
            </div>
          )}

          {/* Bouton play custom — visible tant que pas en lecture et vidéo chargée */}
          {!playing && isVideoLoaded && (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center
                         bg-black/30 hover:bg-black/40 transition-colors group z-10"
            >
              <div
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40
                              flex items-center justify-center
                              group-hover:scale-110 transition-transform"
              >
                <Play size={24} className="text-white ml-1" fill="currentColor" />
              </div>
            </button>
          )}
        </>
      )}
    </div>
  );
}
