"use client";
import { useState } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export function LazyImage({
  src,
  blur,
  alt,
  className = "",
  priority = false,
  fetchPriority = "auto",
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  src: string;
  blur?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
}) {
  const { ref, inView } = useInView();
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* LQIP blur — visible immédiatement, disparaît quand l'image est chargée */}
      {blur && !loaded && (
        <img
          src={blur}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{
            filter: "blur(20px)",
            transition: "opacity 0.4s ease",
          }}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      )}
      {/* Fallback skeleton in case blur is not provided and image isn't loaded yet */}
      {!blur && !loaded && (
        <div className="absolute inset-0 bg-[#E6C200]/20 animate-pulse" />
      )}

      {(inView || priority) && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={80}
          priority={priority}
          fetchPriority={fetchPriority}
          loading={priority ? "eager" : "lazy"}
          className={`object-cover object-center transition-opacity duration-500
                      ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      )}
    </div>
  );
}
