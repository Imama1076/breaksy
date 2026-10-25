import React, { useState, useEffect } from 'react';
import { FadeIn } from './MotionHelpers';
import { ContactButton } from './Buttons';
import { HeroBreaksyCenterpiece } from './HeroBreaksyCenterpiece';
import { HeroMetrics } from './HeroMetrics';
import { BreaksyLogo } from './BreaksyLogo';
const HeroNightSkyBackground = React.lazy(() => import('./HeroNightSkyBackground').then((m) => ({ default: m.HeroNightSkyBackground })));
import { Menu, X, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeroSectionProps {
  onOpenDownload?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = React.memo(({
  onOpenDownload,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getIsMuted());

  useEffect(() => {
    const unsubscribe = soundEngine.onMuteChange((muted) => setIsMuted(muted));
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    const next = soundEngine.toggleMute();
    setIsMuted(next);
  };

  const handleNavScroll = (hash: string) => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, options?: { offset?: number; duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(hash, { offset: -24 });
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleMobileNavClick = (hash?: string) => {
    setMobileMenuOpen(false);
    soundEngine.playClick();
    if (hash) {
      handleNavScroll(hash);
    }
  };

  const handleDesktopNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    soundEngine.playClick();
    handleNavScroll(hash);
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] w-full flex flex-col justify-start overflow-hidden bg-gradient-to-b from-[#060816] via-[#0B102E] to-[#0D102E] select-none pt-2 sm:pt-3 pb-16 sm:pb-24">
      {/* 1. Exact Night Sky Artwork Background with glowing clouds, warm golden rims, and galaxy stars */}
      <React.Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-[#060816] via-[#0B102E] to-[#0D102E] pointer-events-none" />}>
        <HeroNightSkyBackground />
      </React.Suspense>

      {/* Smooth bottom transition blend into next section - behind the clouds */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#0D102E]/80 pointer-events-none z-[8]" />

      {/* 2. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30 relative">
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-10 flex items-center justify-between pt-2 md:pt-3">
          {/* Logo with Mascot Icon */}
          <a
            href="#"
            onClick={() => handleMobileNavClick()}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
          >
            <BreaksyLogo size="sm" showText={false} />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase heading-font group-hover:text-purple-300 transition-colors">
                Breaksy
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm"
          >
            <a
              href="#why-breaksy"
              onClick={(e) => handleDesktopNavClick(e, '#why-breaksy')}
              className="hover:text-white hover:opacity-100 opacity-80 transition-all duration-200 cursor-pointer"
            >
              Why Breaksy
            </a>
            <a
              href="#interactive"
              onClick={(e) => handleDesktopNavClick(e, '#interactive')}
              className="hover:text-white hover:opacity-100 opacity-80 transition-all duration-200 cursor-pointer"
            >
              Simulator
            </a>
            <a
              href="#comparison"
              onClick={(e) => handleDesktopNavClick(e, '#comparison')}
              className="hover:text-white hover:opacity-100 opacity-80 transition-all duration-200 cursor-pointer text-purple-200"
            >
              Comparison
            </a>
            <a
              href="#features"
              onClick={(e) => handleDesktopNavClick(e, '#features')}
              className="hover:text-white hover:opacity-100 opacity-80 transition-all duration-200 cursor-pointer"
            >
              Features
            </a>
            <a
              href="#previews"
              onClick={(e) => handleDesktopNavClick(e, '#previews')}
              className="hover:text-white hover:opacity-100 opacity-80 transition-all duration-200 cursor-pointer"
            >
              Screenshots
            </a>

            {/* Speaker Sound Toggle (Mutes/Unmutes entire site) */}
            <button
              onClick={handleToggleSound}
              aria-label={isMuted ? "Unmute site audio" : "Mute site audio"}
              title={isMuted ? "Unmute site audio" : "Mute site audio"}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                !isMuted
                  ? 'bg-purple-500/20 text-purple-200 border-purple-400/40 hover:bg-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
              }`}
            >
              {!isMuted ? (
                <Volume2 className="w-4 h-4 text-purple-300" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            <button
              onClick={onOpenDownload}
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid rgba(255, 255, 255, 0.95)',
                outlineOffset: '-3px',
              }}
              className="whitespace-nowrap shrink-0 px-5 py-2 rounded-full text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-lg inline-flex items-center justify-center select-none"
            >
              Get App
            </button>
          </nav>

          {/* Mobile Right Controls: Speaker Toggle + Quick Download + Hamburger Menu Button */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleToggleSound}
              aria-label={isMuted ? "Unmute site audio" : "Mute site audio"}
              title={isMuted ? "Unmute site audio" : "Mute site audio"}
              className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                !isMuted
                  ? 'bg-purple-500/20 text-purple-200 border-purple-400/40'
                  : 'bg-white/5 text-slate-400 border-white/10'
              }`}
            >
              {!isMuted ? (
                <Volume2 className="w-3.5 h-3.5 text-purple-300" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            <button
              onClick={onOpenDownload}
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid rgba(255, 255, 255, 0.95)',
                outlineOffset: '-3px',
              }}
              className="whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-full text-white text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-md inline-flex items-center justify-center select-none"
            >
              Get App
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 p-5 rounded-3xl bg-[#0D102E]/95 border border-purple-500/30 backdrop-blur-2xl shadow-2xl z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
            <a
              href="#interactive"
              onClick={() => handleMobileNavClick('#interactive')}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors"
            >
              <span>Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            </a>
            <a
              href="#features"
              onClick={() => handleMobileNavClick('#features')}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors"
            >
              <span>Features</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            </a>
            <a
              href="#previews"
              onClick={() => handleMobileNavClick('#previews')}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors"
            >
              <span>10 Screen Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                soundEngine.playClick();
                if (onOpenDownload) onOpenDownload();
              }}
              className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider text-center shadow-lg shadow-purple-900/50 cursor-pointer mt-1 transition-colors"
            >
              Download Breaksy (iOS & Android)
            </button>
          </div>
        )}
      </FadeIn>

      {/* 3. Center Section: Bunny sitting on top of clouds with BREAKSY title */}
      <div className="relative w-full z-20 flex flex-col items-center justify-center px-2 sm:px-4 pt-4 sm:pt-6">
        <HeroBreaksyCenterpiece onOpenDownload={onOpenDownload} />
      </div>

      {/* 4. Section 1 Developer Specification: Eyebrow, Headline, Subheadline, Primary CTA, Trust Copy, and HeroMetrics */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 z-25 relative mt-4 sm:mt-6 text-center">
        {/* Eyebrow / Badge */}
        <FadeIn delay={0.1} y={15}>
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 backdrop-blur-md text-[10px] sm:text-xs font-bold tracking-widest uppercase text-amber-300 shadow-lg shadow-purple-950/40 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>THE ALGORITHMIC TRAP IS DESIGNED TO DRAIN YOU</span>
          </div>
        </FadeIn>

        {/* Headline (H1) */}
        <FadeIn delay={0.18} y={20}>
          <h1 className="hero-heading font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] max-w-4xl mx-auto px-2">
            You aren’t addicted. Your thumbs are just being{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-200">
              hijacked
            </span>
            .
          </h1>
        </FadeIn>

        {/* Subheadline (Lead Paragraph) */}
        <FadeIn delay={0.24} y={15}>
          <p className="mt-3.5 sm:mt-4 text-[#D7E2EA] text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto px-4">
            Every time you open an app without thinking, algorithms steal another minute of your life. Breaksy intercepts the reflex before the doomscroll swallows your evening.
          </p>
        </FadeIn>

        {/* Primary Call to Action */}
        <FadeIn delay={0.3} y={15}>
          <div className="flex flex-col items-center justify-center pt-5 sm:pt-6">
            <ContactButton
              label="Download Breaksy for Free"
              onClick={onOpenDownload}
            />
            {/* Platform & Trust Micro-Copy directly below button */}
            <p className="text-slate-400 text-[11px] sm:text-xs font-normal mt-3 tracking-wide text-center px-4">
              Free on iOS & Android • No account required • 100% on-device privacy
            </p>
          </div>
        </FadeIn>

        {/* Sub-Component: 4-Column Minimalist Hero Stat Bar */}
        <HeroMetrics />
      </div>
    </section>
  );
});
