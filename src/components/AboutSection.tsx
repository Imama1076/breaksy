import React from 'react';
import { FadeIn, AnimatedText } from './MotionHelpers';
import { ContactButton } from './Buttons';

interface AboutSectionProps {
  onOpenDownload?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = React.memo(({ onOpenDownload }) => {
  return (
    <section
      id="about"
      className="relative min-h-0 sm:min-h-[65vh] bg-gradient-to-b from-[#0C0F2B] via-[#090B22] to-[#0E102E] flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-10 py-12 sm:py-20 md:py-24 overflow-hidden select-none border-t border-purple-500/10"
    >
      {/* Background purple-navy ambient illumination (Hardware accelerated radial glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.18)_0%,transparent_70%)] pointer-events-none" />



      {/* Main Content Flow */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto gap-4 sm:gap-8">
        <FadeIn delay={0} y={30}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-3xl sm:text-5xl md:text-7xl">
            WHY BREAKSY
          </h2>
        </FadeIn>

        {/* Character-by-character scroll animated text */}
        <div className="max-w-[680px] px-2 sm:px-4">
          <AnimatedText
            text="Traditional blockers simply lock apps after reaching a daily limit, leading users to instantly dismiss them out of frustration. Breaksy steps in before the doomscrolling even starts, it interrupts that automatic urge the moment you open an app, gently shifting your focus back toward intentional choices."
            className="text-[#D7E2EA] font-normal leading-relaxed text-sm sm:text-base md:text-lg text-center tracking-normal"
          />
        </div>

        {/* Call to action button */}
        <FadeIn delay={0.35} y={20}>
          <div className="pt-2">
            <ContactButton
              label="Experience Breaksy"
              onClick={onOpenDownload}
            />
          </div>
        </FadeIn>
      </div>

      {/* Atmospheric Cloud Horizon Accent at section base */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10 opacity-35 overflow-hidden">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M 0 60
               C 120 40 240 70 380 45
               C 520 20 660 65 800 40
               C 940 15 1080 55 1220 35
               C 1340 20 1400 45 1440 50
               L 1440 120 L 0 120 Z"
            fill="url(#aboutCloudGrad)"
          />

          <defs>
            <linearGradient id="aboutCloudGrad" x1="720" y1="20" x2="720" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0B102E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
});
