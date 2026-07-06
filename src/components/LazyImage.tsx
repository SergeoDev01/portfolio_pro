"use client";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export function LazyImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {(inView || priority) && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={80}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover object-center"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      )}
    </div>
  );
}
