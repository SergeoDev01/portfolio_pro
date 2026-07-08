"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
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

  const firstImage = project.images[0];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 lg:left-[280px] bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <div className="fixed inset-0 lg:left-[280px] z-50 flex items-center justify-center p-8">
        <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl w-full max-w-[600px] aspect-square">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Single image - NO carousel, NO animations */}
          <img
            src={firstImage.src}
            alt={project.title}
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
      </div>
    </>
  );
}
