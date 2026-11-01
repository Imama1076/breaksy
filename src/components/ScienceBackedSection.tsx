import React from 'react';
import { FadeIn } from './MotionHelpers';
import { HeroMetrics } from './HeroMetrics';
import { soundEngine } from '../utils/audio';

interface ScienceBackedSectionProps {
  onOpenDownload?: () => void;
}

export const ScienceBackedSection: React.FC<ScienceBackedSectionProps> = React.memo(({
  onOpenDownload,
}) => {
  return (
    <section
      id="science"
      className="relative min-h-[85vh] flex flex-col justify-center bg-gradient-to-b from-[#090C22] via-[#0D102D] to-[#0A0D26] text-white px-4 sm:px-8 md:px-10 lg:px-16 xl:px-24 py-24 sm:py-32 md:py-36 overflow-hidden select-none border-t border-purple-500/10 w-full max-w-full"
    >
      {/* Background ambient cosmic glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center relative z-10 text-center w-full min-w-0 max-w-full">
        {/* Headline (H2) */}
        <FadeIn delay={0.08} y={20}>
          <h2 className="hero-heading font-black text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] max-w-4xl mx-auto px-2">
            You aren’t addicted. Your thumbs are just being hijacked.
          </h2>
        </FadeIn>

        {/* Subheadline Paragraph */}
        <FadeIn delay={0.15} y={15}>
          <p className="mt-4 sm:mt-5 text-[#D7E2EA] text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto px-4">
            Every time you open an app without thinking, algorithms steal another minute of your life. Breaksy intercepts the reflex with a 5 second mindful pause, stopping the doomscroll before it swallows your evening.
          </p>
        </FadeIn>

        {/* Call to Action Button */}
        <FadeIn delay={0.22} y={15}>
          <div className="flex flex-col items-center justify-center pt-6 sm:pt-7">
            <button
              onClick={() => {
                soundEngine.playClick();
                if (onOpenDownload) onOpenDownload();
              }}
              className="relative group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-purple-900/80 via-[#2E1850] to-[#5B1E4E] hover:from-purple-800 hover:to-pink-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-purple-950/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-purple-400/50 hover:border-pink-300"
            >
              <span className="relative z-10 text-white drop-shadow">
                DOWNLOAD BREAKSY FOR FREE
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            </button>
          </div>
        </FadeIn>

        {/* Sub-Component: 4-Column Minimalist Stat Bar & PNAS Citation */}
        <HeroMetrics />
      </div>
    </section>
  );
});
