"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/components/WhatsAppButton";
import { VerifiedBadge } from "@/components/VerifiedBadge";

// Variable globale au module : 
// - Persiste lors d'une navigation interne (Next.js SPA)
// - Se réinitialise complètement lors d'un rafraîchissement (F5) ou atterrissage
let hasShownThisSession = false;

export function CallToActionPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasShownThisSession) return;

      const projetsSection = document.getElementById("projets");
      if (!projetsSection) return;

      const rect = projetsSection.getBoundingClientRect();
      // On déclenche quand le bas de la section projets (rect.bottom) 
      // atteint le bas de l'écran (window.innerHeight) ou remonte plus haut
      if (rect.bottom <= window.innerHeight + 100) {
        setIsVisible(true);
        hasShownThisSession = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Vérification initiale au cas où on recharge la page déjà en bas
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Blurred Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={handleClose}
          />
          
          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[var(--color-bg-tint)] rounded-3xl p-6 lg:p-8 max-w-sm w-full shadow-2xl border border-white/10 flex flex-col items-center text-center z-10"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[var(--color-accent)] transition-colors rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[var(--color-dark)] relative mb-4 shadow-lg shrink-0">
              <Image
                src="/avatar.png"
                alt="Sergeo Limta"
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Title & Name */}
            <h2 className="text-xl font-bold flex items-center justify-center gap-1.5 text-[var(--color-dark)] mb-2">
              Sergeo Limta
              <VerifiedBadge className="w-5 h-5" fill="var(--color-verified)" />
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Vous aimez ce que vous voyez ? Ayez vous aussi un portfolio web créatif, 
              professionnel et performant. Discutons de votre projet dès maintenant !
            </p>

            {/* CTA Button */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose} // Close after clicking
              className="w-full bg-[var(--color-primary)] text-[#1D0101] py-3.5 px-6 rounded-full font-bold flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              Me contacter sur WhatsApp
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
