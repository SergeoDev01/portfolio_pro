"use client";
import { useState, useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { Play } from "lucide-react";

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
            className="w-full h-full object-contain"
          />

          {/* Bouton play custom — visible tant que pas en lecture */}
          {!playing && (
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
