"use client";
import { useState } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export function LazyImage({
  src, alt, className = "", priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  src: string; alt: string; className?: string;
  priority?: boolean; sizes?: string;
}) {
  const { ref, inView } = useInView();
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Skeleton animé tant que l'image n'est pas chargée */}
      {!loaded && (
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
