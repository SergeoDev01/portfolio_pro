"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  return (
    <Link
      href="/#projets"
      className="flex items-center gap-2 text-sm font-semibold text-[#1D0101]/70 hover:text-[var(--color-accent)] transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Retour aux projets
    </Link>
  );
}
