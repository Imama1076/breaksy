import React from 'react';
import { FadeIn, AnimatedText } from './MotionHelpers';
import { soundEngine } from '../utils/audio';

interface AboutSectionProps {
  onOpenDownload?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = React.memo(() => {
  const handleScrollToSimulator = (e: React.MouseEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, options?: { offset?: number; duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo('#interactive', { offset: -24 });
    } else {
      const el = document.querySelector('#interactive') || document.querySelector('#simulator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="why-breaksy"
      className="relative min-h-0 sm:min-h-[65vh] bg-gradient-to-b from-[#0C0F2B] via-[#090B22] to-[#0E102E] flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-10 py-16 sm:py-24 overflow-hidden select-none border-t border-purple-500/10 scroll-mt-6"
    >
      {/* Anchor for backward compatibility with #about links */}
      <span id="about" className="absolute -top-10 opacity-0 pointer-events-none" />

      {/* Background purple-navy ambient illumination (Hardware accelerated radial glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Content Flow */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto gap-5 sm:gap-8">
        <FadeIn delay={0} y={30}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-3xl sm:text-5xl md:text-7xl">
            WHY BREAKSY
          </h2>
        </FadeIn>

        {/* Character-by-character scroll animated text with content writer's exact copy */}
        <div className="max-w-[760px] px-2 sm:px-4">
          <AnimatedText
            text="Traditional screen time limits punish you with hard lockouts—driving you to rage-delete them the second you want a dopamine hit. By then, you’ve already lost. Breaksy steps in at the exact millisecond of impulse. It introduces a mindful 5-second cognitive pause that breaks the hypnotic trance, giving you back the power to choose your life over a glowing feed."
            className="text-[#D7E2EA] font-normal leading-relaxed text-sm sm:text-base md:text-lg text-center tracking-normal"
          />
        </div>

        {/* Secondary CTA Button targeting #simulator */}
        <FadeIn delay={0.35} y={20}>
          <div className="pt-2">
            <a
              href="#simulator"
              onClick={handleScrollToSimulator}
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid rgba(255, 255, 255, 0.95)',
                outlineOffset: '-3px',
              }}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-lg select-none"
            >
              Experience the 5-Second Intercept
            </a>
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
