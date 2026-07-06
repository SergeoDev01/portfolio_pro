"use client";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Play } from "lucide-react";

export function LazyVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const { ref, inView } = useInView();
  const [playing, setPlaying] = useState(false);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-[#1D0101] ${className}`}>

      {/* Skeleton tant que pas encore visible */}
      {!inView && (
        <div className="absolute inset-0 bg-[#1D0101]/80 animate-pulse" />
      )}

      {/* Vidéo — chargée uniquement quand visible ET après clic play */}
      {inView && (
        <>
          <video
            src={playing ? src : undefined}
            poster={poster}
            preload="none" // ← ne télécharge RIEN tant que l'user n'a pas cliqué
            autoPlay={playing}
            controls={playing}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Bouton play custom — visible tant que pas en lecture */}
          {!playing && (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center
                         bg-black/30 hover:bg-black/40 transition-colors group z-10"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40
                              flex items-center justify-center
                              group-hover:scale-110 transition-transform">
                <Play size={24} className="text-white ml-1" fill="currentColor" />
              </div>
            </button>
          )}
        </>
      )}

    </div>
  );
}
