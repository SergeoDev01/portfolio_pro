"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Barre de progression fine en haut de page lors des navigations.
 * S'affiche immédiatement au clic et disparaît quand la page est prête.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPathname = useRef(pathname);

  // Exposer une fonction globale pour démarrer la barre depuis n'importe où
  useEffect(() => {
    (window as any).__startNavProgress = () => {
      setProgress(0);
      setVisible(true);
      let p = 0;
      timerRef.current = setInterval(() => {
        // Progression rapide jusqu'à 80%, puis très lente (attente de la page)
        p += p < 40 ? 12 : p < 70 ? 5 : p < 85 ? 1 : 0.3;
        if (p >= 90) {
          clearInterval(timerRef.current!);
        }
        setProgress(Math.min(p, 90));
      }, 80);
    };

    return () => {
      delete (window as any).__startNavProgress;
    };
  }, []);

  // Terminer la barre quand le pathname change (page chargée)
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(100);
      const t = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[9999] h-[3px] pointer-events-none"
      style={{
        width: `${progress}%`,
        background: "var(--color-primary)",
        transition: progress === 100
          ? "width 0.2s ease, opacity 0.3s ease 0.1s"
          : "width 0.08s linear",
        opacity: progress === 100 ? 0 : 1,
        boxShadow: "0 0 8px var(--color-primary)",
      }}
    />
  );
}
