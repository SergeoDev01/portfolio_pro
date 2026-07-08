"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/data/projects";

interface SimpleCarouselProps {
  images: ProjectImage[];
  isLandscape?: boolean;
  bgColor?: string;
  onIndexChange?: (index: number) => void;
}

export function SimpleCarousel({ images, isLandscape = false, bgColor = "#111111", onIndexChange }: SimpleCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    onIndexChange?.(activeIndex);
  }, [activeIndex, onIndexChange]);

  const goToPrev = () => {
    setActiveIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  };

  const goToNext = () => {
    setActiveIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className={`relative w-full ${isLandscape ? "aspect-[1251/848]" : "aspect-square"}`}>
      {/* Images container */}
      <div className="relative w-full h-full overflow-hidden">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-300 ${
              i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            style={{
              backgroundColor: bgColor,
              transition: "background-color 0.5s ease, opacity 0.3s ease",
            }}
          >
            <img
              src={img.src}
              alt={`Image ${i + 1}`}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="absolute inset-0 w-full h-full object-contain object-center"
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-4 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          aria-label="Image précédente"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          aria-label="Image suivante"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === activeIndex ? "bg-[var(--color-accent)]" : "bg-white/40"
              }`}
              aria-label={`Aller à l'image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
