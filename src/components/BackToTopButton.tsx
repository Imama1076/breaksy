import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface BackToTopButtonProps {
  className?: string;
  threshold?: number;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  className = '',
  threshold = 280,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          const shouldShow = window.scrollY > threshold;
          setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to Top"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#0E1130]/90 hover:bg-purple-600/30 border border-purple-400/30 hover:border-purple-300 text-purple-200 hover:text-white backdrop-blur-md shadow-xl shadow-purple-950/60 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer animate-in fade-in slide-in-from-bottom-3 ${className}`}
    >
      <ArrowUp className="w-4 h-4 text-purple-300 transition-transform group-hover:-translate-y-0.5" />
      <span>Back to Top</span>
    </button>
  );
};
