"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Pin } from "lucide-react";
import { useInView } from "@/hooks/useInView";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface LandingPreviewProps {
  src: string;
  alt: string;
  href: string;
  category: string;
  title: string;
  ratio: number;
  sizes?: string;
  priority?: boolean;
  isVedette?: boolean;
  className?: string;
}

export function LandingPreview({
  src,
  alt,
  href,
  category,
  title,
  ratio,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  isVedette = false,
  className = "",
}: LandingPreviewProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setScrollDistance(Math.max(0, rect.width * ratio - rect.height));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ratio]);

  const distance = reducedMotion ? 0 : scrollDistance;
  const duration = distance > 0 ? Math.min(15, Math.max(3, distance / 250)) : 0;

  return (
    <a
      ref={containerRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Voir le projet ${title}`}
      className={`group relative block overflow-hidden rounded-[var(--radius-card)] bg-white shadow-sm hover:shadow-xl transition-shadow aspect-square cursor-pointer ${className}`}
    >
      <motion.div
        className="absolute top-0 left-0 w-full will-change-transform"
        animate={{ y: hovered ? -distance : 0 }}
        transition={
          hovered
            ? { duration, ease: "easeInOut" }
            : { duration: 1.4, ease: "easeInOut" }
        }
      >
        <div ref={ref} className="w-full">
          {(inView || priority) && (
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={Math.round(1600 * ratio)}
              sizes={sizes}
              quality={70}
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-auto select-none"
            />
          )}
        </div>
      </motion.div>

      {/* Pin Icon */}
      <div className={isVedette ? "absolute top-3 right-3 bg-[var(--color-dark)]/80 text-[var(--color-accent)] p-3 rounded-lg flex items-center justify-center z-20 backdrop-blur-sm" : "absolute top-3 right-3 bg-[var(--color-dark)]/60 text-[var(--color-accent)] p-2 rounded-lg flex items-center justify-center z-20 backdrop-blur-sm"}>
        <Pin className={isVedette ? "w-5 h-5 transform rotate-45" : "w-3.5 h-3.5 transform rotate-45"} />
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/30 to-transparent flex flex-col justify-end p-4 lg:p-6 z-10">
        <span className="text-[var(--color-accent)] font-bold text-xs mb-1">
          {category}
        </span>
        <h3 className="text-white text-base lg:text-lg font-bold leading-tight flex items-center gap-2">
          {title}
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </h3>
      </div>
    </a>
  );
}
