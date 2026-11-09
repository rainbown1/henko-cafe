// app/components/BackToTop.tsx
'use client';

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop({ threshold = 400 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll(); // estado inicial por si recarga a mitad de página
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    // Respeta preferencia de movimiento reducido
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-taupe-600 text-cream shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-coffee-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-coffee-400 ${
        visible
          ? "bg-white translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp size={22} />
    </button>
  );
}