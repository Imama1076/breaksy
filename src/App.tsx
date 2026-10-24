import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { HeroSection } from './components/HeroSection';
// Lazy-load non-critical background effects and below-the-fold sections
const CosmicStarfield = lazy(() => import('./components/CosmicStarfield').then((m) => ({ default: m.CosmicStarfield })));
const BunnyCursorCompanion = lazy(() => import('./components/BunnyCursorCompanion').then((m) => ({ default: m.BunnyCursorCompanion })));
const AboutSection = lazy(() => import('./components/AboutSection').then((m) => ({ default: m.AboutSection })));
const ProjectsSection = lazy(() => import('./components/ProjectsSection').then((m) => ({ default: m.ProjectsSection })));
const ServicesSection = lazy(() => import('./components/ServicesSection').then((m) => ({ default: m.ServicesSection })));
const AppScreenshotsSection = lazy(() => import('./components/AppScreenshotsSection').then((m) => ({ default: m.AppScreenshotsSection })));
const FaqSection = lazy(() => import('./components/FaqSection').then((m) => ({ default: m.FaqSection })));
import { BreaksyLogo } from './components/BreaksyLogo';
import { ShieldCheck } from 'lucide-react';
import { BackToTopButton } from './components/BackToTopButton';
import { soundEngine } from './utils/audio';

// Code-split heavy legal pages & modals to keep initial bundle ultra-lean & fast
const ContactModal = lazy(() => import('./components/ContactModal').then((m) => ({ default: m.ContactModal })));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./components/TermsPage').then((m) => ({ default: m.TermsPage })));

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const { scrollYProgress } = useScroll();

  // Ultra-smooth, fluid 60-120 FPS momentum scrolling via Lenis (Instant response, zero lag/stutter)
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1, // Pure responsive mathematical damping (zero input lag, buttery deceleration)
      wheelMultiplier: 0.95, // Natural, effortless wheel response
      smoothWheel: true,
      syncTouch: false, // Never hijack native touchscreens or precision trackpads!
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Gentle sweet ambient background music starts automatically (Unmuted by default)
  useEffect(() => {
    // Attempt immediate start
    soundEngine.startBackgroundMusic();

    // Browser audio context gesture unlock
    const unlockAudio = () => {
      if (!soundEngine.getIsMuted()) {
        soundEngine.startBackgroundMusic();
      }
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
    window.addEventListener('scroll', unlockAudio, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
    };
  }, []);

  // Stable callback prevents child section re-renders
  const handleOpenDownload = React.useCallback(() => {
    setIsDownloadModalOpen(true);
  }, []);

  // Listen for hash navigation (#privacy, #terms, #home)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } }).__lenis;
      if (hash === '#privacy' || hash === '#/privacy') {
        setCurrentPage('privacy');
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#terms' || hash === '#/terms') {
        setCurrentPage('terms');
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '' || hash === '#' || hash === '#home') {
        setCurrentPage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: 'home' | 'privacy' | 'terms') => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  // Dedicated Full Pages for Privacy Policy and Terms of Service (Universal Home background, clean & unblocked)
  if (currentPage === 'privacy') {
    return (
      <div
        className="min-h-screen bg-[#060816] bg-gradient-to-b from-[#060816] via-[#0B102E] to-[#0D102E] text-[#D7E2EA] font-sans selection:bg-purple-500/30 selection:text-white relative overflow-x-hidden max-w-full"
      >
        <BunnyCursorCompanion />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-purple-300 font-bold tracking-widest text-xl">...</div>}>
          <PrivacyPolicyPage
            onBackToHome={() => navigateTo('home')}
            onOpenDownload={() => setIsDownloadModalOpen(true)}
          />
          <ContactModal
            isOpen={isDownloadModalOpen}
            onClose={() => setIsDownloadModalOpen(false)}
          />
        </Suspense>
      </div>
    );
  }

  if (currentPage === 'terms') {
    return (
      <div
        className="min-h-screen bg-[#060816] bg-gradient-to-b from-[#060816] via-[#0B102E] to-[#0D102E] text-[#D7E2EA] font-sans selection:bg-purple-500/30 selection:text-white relative overflow-x-hidden max-w-full"
      >
        <BunnyCursorCompanion />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-purple-300 font-bold tracking-widest text-xl">...</div>}>
          <TermsPage
            onBackToHome={() => navigateTo('home')}
            onOpenDownload={() => setIsDownloadModalOpen(true)}
          />
          <ContactModal
            isOpen={isDownloadModalOpen}
            onClose={() => setIsDownloadModalOpen(false)}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#060816] text-[#D7E2EA] font-sans selection:bg-purple-500/30 selection:text-white relative overflow-x-hidden max-w-full"
    >
      {/* Top Scrolling Progress Bar (Solid Purple, zero gradient) */}
      <motion.div
        style={{ scaleX: scrollYProgress, willChange: 'transform' }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-purple-600 origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(147,51,234,0.7)]"
      />

      {/* 1. Global Cosmic Starfield & Cursor Companion (Lazy loaded asynchronously) */}
      <Suspense fallback={null}>
        <CosmicStarfield />
        <BunnyCursorCompanion />
      </Suspense>

      {/* 3. Main Page Content */}
      <main className="relative z-10">
        {/* Section 1: Hero Section (Features big centered Nox Bunny with eyes tracking cursor, sleeps when idle, strictly "BREAKSY" title with initial focus reveal) */}
        <HeroSection
          onOpenDownload={handleOpenDownload}
        />

        {/* Below-the-fold heavy sections wrapped in Suspense for asynchronous streaming */}
        <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-purple-300 font-bold tracking-widest text-xl">...</div>}>
          {/* Section 2: Why Breaksy Section (Breaksy's behavioral intervention philosophy: Friction Over Hard Blocking) */}
          <AboutSection onOpenDownload={handleOpenDownload} />

          {/* Section 3: Interactive Breaksy Experience & Simulator Section (Live launch interceptor, 6 challenges, vibe lock soundscapes, garden, sleep calculator, comparison table) */}
          <ProjectsSection onOpenDownload={handleOpenDownload} />

          {/* Section 4: Features Section (01 Reflex Interception, 02 Micro-Hurdles, 03 Vibe Locks, 04 Crystal Garden, 05 Circadian Sleep) */}
          <ServicesSection />

          {/* Section 5: Mobile App Feature Showcase Slideshow (How Breaksy Feels In Hand · All 10 Signature Experiences) */}
          <AppScreenshotsSection onOpenDownload={handleOpenDownload} />

          {/* Section 6: Frequently Asked Questions (Privacy guarantees, battery footprint, emergency overrides) */}
          <FaqSection />
        </Suspense>
      </main>

      {/* 3. Site Footer */}
      <footer className="relative bg-[#060710] border-t border-purple-500/10 py-12 sm:py-16 px-4 sm:px-8 md:px-10 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-3">
            <BreaksyLogo size="md" showText={true} />
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-sm">
              Behavioral screen-time intervention designed to curb mindless phone habits, stop doomscrolling, and rebuild daily focus.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                soundEngine.playClick();
                const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: { offset?: number }) => void } }).__lenis;
                if (lenis) lenis.scrollTo('#about', { offset: -24 });
                else document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Philosophy
            </a>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                soundEngine.playClick();
                const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: { offset?: number }) => void } }).__lenis;
                if (lenis) lenis.scrollTo('#features', { offset: -24 });
                else document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Features
            </a>
            <a
              href="#previews"
              onClick={(e) => {
                e.preventDefault();
                soundEngine.playClick();
                const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: { offset?: number }) => void } }).__lenis;
                if (lenis) lenis.scrollTo('#previews', { offset: -24 });
                else document.querySelector('#previews')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors text-purple-300 font-medium cursor-pointer"
            >
              Screenshots
            </a>
            <a
              href="#interactive"
              onClick={(e) => {
                e.preventDefault();
                soundEngine.playClick();
                const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: { offset?: number }) => void } }).__lenis;
                if (lenis) lenis.scrollTo('#interactive', { offset: -24 });
                else document.querySelector('#interactive')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Simulators
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                soundEngine.playClick();
                const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: { offset?: number }) => void } }).__lenis;
                if (lenis) lenis.scrollTo('#faq', { offset: -24 });
                else document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              FAQ
            </a>
            <button
              onClick={() => navigateTo('privacy')}
              className="hover:text-white transition-colors bg-transparent border-0 p-0 text-inherit cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo('terms')}
              className="hover:text-white transition-colors bg-transparent border-0 p-0 text-inherit cursor-pointer"
            >
              Terms
            </button>
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="hover:text-white transition-colors bg-transparent border-0 p-0 text-inherit cursor-pointer text-purple-400 font-semibold"
            >
              Get App
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span>© {new Date().getFullYear()} Breaksy Inc. All rights reserved.</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% On-Device Privacy Guaranteed
            </span>
          </div>
          <div className="flex items-center gap-5 sm:gap-6">
            <button
              onClick={() => navigateTo('privacy')}
              className="hover:text-white transition-colors bg-transparent border-0 p-0 text-inherit cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => navigateTo('terms')}
              className="hover:text-white transition-colors bg-transparent border-0 p-0 text-inherit cursor-pointer"
            >
              Terms
            </button>
            <span className="text-purple-400">v1.0.0 Production Build</span>
          </div>
        </div>
      </footer>

      {/* 4. Global Modals (Lazy-loaded on demand for fast initial page load) */}
      <Suspense fallback={null}>
        {isDownloadModalOpen && (
          <ContactModal
            isOpen={isDownloadModalOpen}
            onClose={() => setIsDownloadModalOpen(false)}
          />
        )}
      </Suspense>

      {/* Floating Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}
