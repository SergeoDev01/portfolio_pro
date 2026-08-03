"use client";

import { BackButton } from "@/components/BackButton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-[var(--color-bg-tint)] font-sans">
      {/* Top bar (statique et instantané) */}
      <header className="flex items-center justify-between px-6 lg:px-12 h-16 lg:h-20 border-b border-[#1D0101]/10 shrink-0">
        <BackButton />
        <span className="font-company font-bold text-[#1D0101]">Sergeo Limta</span>
      </header>

      {/* Squelette de la page projet */}
      <main className="flex-1 flex flex-col min-h-0 w-full max-w-4xl mx-auto px-6 lg:px-0 py-6 lg:py-8 overflow-hidden">
        {/* Header Skeleton */}
        <div className="mb-6 lg:mb-8 shrink-0 flex flex-col gap-2">
          {/* Catégorie */}
          <div className="w-24 h-3 bg-[#1D0101]/10 rounded-full animate-pulse" />
          {/* Titre */}
          <div className="w-56 h-7 bg-[#1D0101]/15 rounded-full animate-pulse" />
        </div>

        {/* Media Container Skeleton (Canva carré/vidéo temporaire) */}
        <div className="flex-1 flex items-center justify-center min-h-0 w-full relative">
          <div className="w-full h-full rounded-[var(--radius-card)] bg-[#1D0101]/5 animate-pulse flex flex-col items-center justify-center gap-4 relative overflow-hidden">
            {/* Un effet de balayage brillant moderne */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
            
            <Loader2 className="w-6 h-6 text-[#1D0101]/25 animate-spin" />
          </div>
        </div>
      </main>
    </div>
  );
}
