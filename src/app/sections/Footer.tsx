"use client";

import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CopyEmail } from "@/components/CopyEmail";

export default function Footer() {
  return (
    <footer className="mx-4 mb-4 rounded-3xl bg-[#1D0101] overflow-hidden">
      {/* Zone principale — padding généreux et équilibré */}
      <div className="px-10 lg:px-14 pt-12 pb-10">
        {/* Ligne haute : titre gauche / CTA droite */}
        <div
          className="flex flex-col lg:flex-row lg:items-start
                     justify-between gap-8 mb-10"
        >
          {/* Gauche */}
          <div className="flex flex-col gap-3">
            <p className="font-company text-3xl lg:text-4xl text-white leading-snug">
              Le Geek Créatif.
            </p>
            {/* Dot disponibilité — juste en dessous du titre */}
            <div className="flex items-center gap-2 mt-1">
              <span
                className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse
                           flex-shrink-0"
              />
              <span className="text-white/40 text-xs">
                Disponible pour nouveaux projets
              </span>
            </div>
          </div>

          {/* Droite — CTA + email empilés verticalement, alignés à droite */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <WhatsAppButton
              label="Démarrer la conversation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                         bg-[#FFD700] text-[#1D0101] font-bold text-sm
                         hover:bg-[#E6C200] transition-colors flex-shrink-0"
            />
            <CopyEmail />
          </div>
        </div>

        {/* Description — pleine largeur, sous le bloc titre/CTA */}
        <p className="text-white/35 text-sm leading-relaxed max-w-md mb-10">
          Designer graphique & développeur créatif basé à Lomé, Togo.
          Spécialisé en branding, UI/UX et production assistée par IA.
        </p>

        {/* Séparateur */}
        <div className="border-t border-white/10 mb-6" />

        {/* Bas — copyright gauche / nav droite */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center
                     justify-between gap-4"
        >
          <p className="text-white/25 text-xs">
            © 2026 Sergeo Limta — Le Geek Créatif.
          </p>
          <nav className="flex items-center gap-5 flex-wrap">
            {[
              { label: "Accueil", href: "#accueil" },
              { label: "À propos", href: "#a-propos" },
              { label: "Services", href: "#services" },
              { label: "Projets", href: "#projets" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white/30 hover:text-white/70
                           transition-colors text-xs"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
