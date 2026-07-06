import { useEffect } from "react";

export function usePreloadImages(urls: string[], delay = 1500) {
  useEffect(() => {
    // Attendre que le reste de la page soit chargé avant de précharger
    const timer = setTimeout(() => {
      urls.forEach((src) => {
        const img = new window.Image();
        img.src = src;
        // Le navigateur met automatiquement en cache mémoire
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [urls, delay]);
}