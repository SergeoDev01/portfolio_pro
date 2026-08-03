"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Si on a un historique de navigation dans l'onglet, on fait un retour arrière
    // C'est 100% instantané (0ms) car le navigateur restaure simplement l'état précédent du cache (bfcache)
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/#projets");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-sm font-semibold text-[#1D0101]/70 hover:text-[var(--color-accent)] transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      Retour aux projets
    </button>
  );
}
