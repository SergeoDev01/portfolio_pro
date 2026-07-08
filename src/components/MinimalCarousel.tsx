"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { SimpleCarousel } from "@/components/SimpleCarousel";
import type { Project } from "@/data/projects";

interface MinimalCarouselProps {
  project: Project | null;
  onClose: () => void;
}

export function MinimalCarousel({ project, onClose }: MinimalCarouselProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project || !project.images || project.images.length === 0) return null;

  const isLandscape = project.slug === "parle-g-shooting";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 lg:left-[280px] bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Modal - NO AnimatePresence, just simple render */}
      <div className="fixed inset-0 lg:left-[280px] z-50 flex items-center justify-center p-0 lg:p-8 pointer-events-none">
        <div className={`relative bg-gray-900 lg:rounded-lg overflow-hidden shadow-2xl pointer-events-auto ${
          isLandscape
            ? "h-[100dvh] lg:h-auto lg:aspect-video lg:max-w-[900px] w-full"
            : "h-[100dvh] lg:h-auto lg:aspect-square lg:max-w-[600px] w-full"
        }`}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* SimpleCarousel with navigation */}
          <SimpleCarousel
            images={project.images}
            isLandscape={isLandscape}
            bgColor="#111111"
          />
        </div>
      </div>
    </>
  );
}
