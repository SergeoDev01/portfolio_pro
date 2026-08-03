"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { ProjectImage } from "@/data/projects";

interface SimpleCarouselProps {
  images: ProjectImage[];
  isLandscape?: boolean;
  /**
   * Couleur de fond initiale.
   * - Si le parent la met à jour dynamiquement (ProjectCarousel), la valeur
   *   externe prend le dessus et l'extraction interne est désactivée.
   * - Si on laisse la valeur par défaut, SimpleCarousel extrait lui-même
   *   la couleur dominante de chaque image.
   */
  bgColor?: string;
  onIndexChange?: (index: number) => void;
  className?: string;
}

const DEFAULT_BG = "#111111";

/** Extrait la couleur dominante d'une image via un canvas HTML natif */
function getDominantColorFromEl(imgEl: HTMLImageElement): string {
  try {
    const canvas = document.createElement("canvas");
    const size = 80;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return DEFAULT_BG;

    ctx.drawImage(imgEl, 0, 0, size, size);
    const data = ctx.getImageData(0, 0, size, size).data;

    let r = 0, g = 0, b = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) {
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      if (brightness > 20 && brightness < 235) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
    }
    if (count === 0) return DEFAULT_BG;

    const darken = 0.35;
    return `rgb(${Math.floor((r / count) * darken)}, ${Math.floor((g / count) * darken)}, ${Math.floor((b / count) * darken)})`;
  } catch {
    return DEFAULT_BG;
  }
}

export function SimpleCarousel({
  images,
  isLandscape = false,
  bgColor,
  onIndexChange,
  className = "",
}: SimpleCarouselProps) {
  // Si le parent gère la couleur, on utilise la sienne ; sinon on auto-détecte.
  const isExternallyControlled = bgColor !== undefined && bgColor !== DEFAULT_BG;

  const [activeIndex, setActiveIndex] = useState(0);
  const [resolvedBg, setResolvedBg] = useState(bgColor ?? DEFAULT_BG);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Si l'image est déjà en cache, on la marque comme chargée au montage
  useEffect(() => {
    const firstImg = imgRefs.current[0];
    if (firstImg && (firstImg.complete || firstImg.naturalWidth > 0)) {
      setIsFirstImageLoaded(true);
    }
  }, [images]);

  // Quand la couleur vient de l'extérieur et change, on la reflète
  useEffect(() => {
    if (isExternallyControlled && bgColor) {
      setResolvedBg(bgColor);
    }
  }, [bgColor, isExternallyControlled]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    align: "center",
  });

  const extractColor = useCallback(
    (idx: number) => {
      if (isExternallyControlled) return; // le parent s'en charge
      const imgEl = imgRefs.current[idx];
      if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
        setResolvedBg(getDominantColorFromEl(imgEl));
      }
    },
    [isExternallyControlled]
  );

  // Sync embla → activeIndex + couleur
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setActiveIndex(idx);
    onIndexChange?.(idx);
    extractColor(idx);
  }, [emblaApi, onIndexChange, extractColor]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  // Reset au changement d'images
  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0, true);
    setActiveIndex(0);
    setResolvedBg(bgColor ?? DEFAULT_BG);
  }, [images, bgColor, emblaApi]);

  const goToPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const goToNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const goToIndex = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goToPrev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goToNext(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  if (images.length === 0) return null;

  const containerClass =
    className || `w-full ${isLandscape ? "aspect-[1251/848]" : "aspect-square"}`;

  return (
    <div
      className={`relative ${containerClass}`}
      style={{
        backgroundColor: resolvedBg,
        transition: "background-color 0.6s ease",
      }}
    >
      {/* Embla viewport */}
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        {/* Embla container */}
        <div className="flex h-full w-full">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative flex-[0_0_100%] h-full"
            >
              <img
                ref={(el) => { imgRefs.current[i] = el; }}
                src={img.src}
                alt={`Image ${i + 1}`}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onLoad={() => {
                  if (i === 0) setIsFirstImageLoaded(true);
                  if (i === activeIndex) extractColor(i);
                }}
                className={`absolute inset-0 w-full h-full object-contain object-center select-none transition-opacity duration-300 ${
                  isFirstImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Loader spécifique au carrousel pour masquer les flashs blancs/noirs */}
      {!isFirstImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-tint)] z-30">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[var(--color-accent)] animate-spin" />
            <p className="text-xs text-[var(--color-dark)]/50 tracking-wide">Chargement des visuels...</p>
          </div>
        </div>
      )}

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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Aller à l'image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
