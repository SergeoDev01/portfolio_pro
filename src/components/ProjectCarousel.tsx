"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { Project } from "@/data/projects";

interface ProjectCarouselProps {
  project: Project | null;
  onClose: () => void;
}

/** Extract the dominant color from an image URL using an offscreen canvas. */
async function getDominantColor(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 50;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) { resolve("#000000"); return; }
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;

        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const pr = data[i], pg = data[i + 1], pb = data[i + 2];
          const brightness = (pr + pg + pb) / 3;
          if (brightness < 240) {
            r += pr; g += pg; b += pb; count++;
          }
        }
        if (count === 0) { resolve("#111111"); return; }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        const factor = 0.55;
        resolve(`rgb(${Math.round(r * factor)}, ${Math.round(g * factor)}, ${Math.round(b * factor)})`);
      } catch {
        resolve("#111111");
      }
    };
    img.onerror = () => resolve("#111111");
    img.src = src;
  });
}

export function ProjectCarousel({ project, onClose }: ProjectCarouselProps) {
  const [api, setApi] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgColor, setBgColor] = useState<string>("#111111");
  const colorCache = useRef<Record<string, string>>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = !!project?.video;
  const isLandscape = project?.slug === "parle-g-shooting" || isVideo;

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  // Reset state when project changes
  useEffect(() => {
    setActiveIndex(0);
    setBgColor("#111111");
    // Auto-play video when modal opens
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [project?.slug, isVideo]);

  // Extract dominant color whenever active image changes
  const updateColor = useCallback(async (src: string) => {
    if (!src) return;
    if (colorCache.current[src]) {
      setBgColor(colorCache.current[src]);
      return;
    }
    const color = await getDominantColor(src);
    colorCache.current[src] = color;
    setBgColor(color);
  }, []);

  const images = project?.images || [];
  const isOpen = !!project && (images.length > 0 || isVideo);

  useEffect(() => {
    if (!isVideo && images[activeIndex]) updateColor(images[activeIndex].src);
  }, [activeIndex, images, updateColor, isVideo]);

  useEffect(() => {
    if (isVideo || images.length === 0) return;

    images.forEach(({ src }) => {
      const preloadImage = new window.Image();
      preloadImage.src = src;
    });
  }, [images, isVideo]);

  // Listen to carousel API for slide changes
  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      const idx = api.selectedScrollSnap?.() ?? 0;
      setActiveIndex(idx);
    };
    api.on?.("select", onSelect);
    return () => { api.off?.("select", onSelect); };
  }, [api]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key={`carousel-backdrop-${project!.slug}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed top-0 bottom-0 right-0 left-0 lg:left-[280px] bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Wrapper */}
          <motion.div
            key={`carousel-modal-wrapper-${project!.slug}`}
            className="fixed top-0 bottom-0 right-0 left-0 lg:left-[280px] z-50 flex items-center justify-center p-0 lg:p-8 pointer-events-none"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Container */}
            <motion.div
              key={`carousel-modal-${project!.slug}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative w-full bg-[var(--color-dark)] lg:rounded-[var(--radius-card)] overflow-hidden shadow-2xl flex flex-col justify-center pointer-events-auto ${
                isLandscape
                  ? "h-[100dvh] lg:h-auto lg:aspect-video lg:max-w-[900px]"
                  : "h-[100dvh] lg:h-auto lg:aspect-square lg:max-w-[600px]"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* VIDEO MODE */}
              {isVideo ? (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    ref={videoRef}
                    src={project!.video}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </div>
              ) : (
                /* IMAGE CAROUSEL MODE */
                <Carousel.Root
                  key={project!.slug}
                  opts={{ loop: true }}
                  setApi={setApi}
                  className={`relative w-full ${isLandscape ? "aspect-[1251/848]" : "aspect-square"}`}
                >
                  <Carousel.PrevTrigger className="absolute top-1/2 left-4 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 p-2 text-white disabled:opacity-30 disabled:cursor-not-allowed">
                    <ChevronLeft className="h-5 w-5" />
                  </Carousel.PrevTrigger>

                  <Carousel.NextTrigger className="absolute top-1/2 right-4 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 p-2 text-white disabled:opacity-30 disabled:cursor-not-allowed">
                    <ChevronRight className="h-5 w-5" />
                  </Carousel.NextTrigger>

                  <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
                    <Carousel.IndicatorGroup className="flex gap-2">
                      {({ index }) => (
                        <Carousel.Indicator
                          key={index}
                          index={index}
                          className={({ isSelected }) =>
                            `w-2 h-2 rounded-full transition-colors ${
                              isSelected ? "bg-[var(--color-accent)]" : "bg-white/40"
                            }`
                          }
                        />
                      )}
                    </Carousel.IndicatorGroup>
                  </div>

                  <Carousel.Content className="gap-0">
                    {images.map((img, i) => (
                      <Carousel.Item
                        key={`${project!.slug}-img-${i}`}
                        className={`relative w-full overflow-hidden shrink-0 ${isLandscape ? "aspect-[1251/848]" : "aspect-square"}`}
                        style={{
                          backgroundColor: bgColor,
                          transition: "background-color 0.5s ease",
                        }}
                      >
                        <img
                          src={img.src}
                          alt={`${project!.title} — image ${i + 1}`}
                          draggable={false}
                          onDragStart={(e) => e.preventDefault()}
                          className="absolute inset-0 w-full h-full object-contain object-center"
                          loading="eager"
                          decoding="async"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel.Content>
                </Carousel.Root>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
