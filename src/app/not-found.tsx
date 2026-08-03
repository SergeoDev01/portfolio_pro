"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[var(--color-bg-tint)] font-sans px-6 text-center">
      {/* Container principal avec animation d'apparition */}
      <div className="max-w-md w-full flex flex-col items-center gap-6">
        
        {/* Nombre 404 stylisé et animé */}
        <div className="relative">
          <h1 className="text-8xl font-black font-company text-[var(--color-dark)] tracking-tighter select-none animate-bounce">
            404
          </h1>
          <div className="absolute -inset-2 bg-[var(--color-primary)]/10 blur-xl rounded-full -z-10" />
        </div>

        {/* Message d'erreur */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-[var(--color-dark)]">
            Oups ! Page introuvable
          </h2>
          <p className="text-sm text-[var(--color-dark)]/60 leading-relaxed max-w-sm">
            Il semble que le projet ou la page que vous cherchez n&apos;existe pas, ou ait été déplacé.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:brightness-105 text-[#1D0101] font-bold py-3.5 px-6 rounded-full shadow-md active:scale-95 transition-all text-sm"
          >
            <Home className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/#projets"
            className="inline-flex items-center justify-center gap-2 bg-white/60 hover:bg-white text-[var(--color-dark)] font-bold py-3.5 px-6 rounded-full border border-black/5 active:scale-95 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voir les projets
          </Link>
        </div>

      </div>
    </div>
  );
}
