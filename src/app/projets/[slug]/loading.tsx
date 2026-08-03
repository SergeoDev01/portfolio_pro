"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-[100dvh] flex flex-col bg-[var(--color-bg-tint)] font-sans">
      {/* Top bar (statique pour éviter le saut visuel une fois la page chargée) */}
      <header className="flex items-center justify-between px-6 lg:px-12 h-16 lg:h-20 border-b border-[#1D0101]/10 shrink-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#1D0101]/40">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          Retour aux projets
        </div>
        <span className="font-company font-bold text-[#1D0101]">Sergeo Limta</span>
      </header>

      {/* Zone centrale de chargement */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner moderne et fluide */}
          <div className="relative flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-[var(--color-accent)] animate-spin" />
            <div className="absolute w-12 h-12 border-2 border-[var(--color-accent)]/20 rounded-full animate-ping" />
          </div>
          
          <p className="text-sm font-medium text-[var(--color-dark)]/60 animate-pulse tracking-wide mt-2">
            Chargement du projet...
          </p>
        </div>
      </main>
    </div>
  );
}
