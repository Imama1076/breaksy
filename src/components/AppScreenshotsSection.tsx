import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ShieldCheck,
  Brain,
  Sprout,
  Moon,
  BarChart3,
  SlidersHorizontal,
  Smartphone,
  Star,
  CheckCircle2,
  X,
  Volume2,
  Wind,
} from 'lucide-react';
import { FadeIn } from './MotionHelpers';
import { soundEngine } from '../utils/audio';
import { optimizeImageFile } from '../utils/imageStorage';

export interface ScreenshotSlide {
  id: string;
  order: number;
  badge: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  statLabel: string;
  statValue: string;
  icon: React.ReactNode;
  accentColor: string; // Tailwind color token
  glowColor: string; // CSS color string for glow
  mechanismTitle: string;
  mechanismTag: string;
  defaultImage: string;
}

export const SCREENSHOT_SLIDES: ScreenshotSlide[] = [
  {
    id: 'reflex-interceptor',
    order: 1,
    badge: '01 · Reflex Interception',
    category: 'Reflex Interception',
    title: 'PAUSE & BREATHE BEFORE MINDLESS SCROLLING',
    subtitle: 'Breaks the automatic tap habit before endless feeds pull you in.',
    description:
      'When your thumb taps out of habit, Breaksy gives you a peaceful 5-second breathing pause to check if you really need the app right now.',
    highlights: [
      '5-Second Micro-Delay Countdown with respiration rhythm ring',
      'Breaks automatic muscle memory before endless scrolling takes over',
      'One-tap mindful exit back to home screen',
      '88% of reflexive launches cancelled within 3 seconds',
    ],
    statLabel: 'Reflex Interception',
    statValue: '88% Loops Broken',
    icon: <Wind className="w-5 h-5 text-indigo-300" />,
    accentColor: 'indigo',
    glowColor: 'rgba(124, 58, 237, 0.25)',
    mechanismTitle: 'Reflex Interceptor & 5s Pause',
    mechanismTag: 'Reflex Delay',
    defaultImage: '/slide1.webp',
  },
  {
    id: 'micro-hurdle-engine',
    order: 2,
    badge: '02 · Micro-Hurdle Engine',
    category: 'Micro-Hurdles',
    title: 'FUN QUICK PUZZLES TO RESET YOUR FOCUS',
    subtitle: 'Quick brain teasers that pause the scrolling habit instantly.',
    description:
      'No harsh blocking walls. Solve a fun mini-puzzle or word game to wake up your mind and get back in control of your time.',
    highlights: [
      'Adaptive challenge difficulty tailored to time of day',
      'No frustrating wall: earn mindful screen time through focus',
      'Instant dopamine loop interruption',
      '4.2x reduction in impulsive midday social media check-ins',
    ],
    statLabel: 'Cognitive Engagement',
    statValue: '4.2x Fewer Check-ins',
    icon: <Brain className="w-5 h-5 text-amber-300" />,
    accentColor: 'amber',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    mechanismTitle: 'Cognitive Micro-Hurdle Engine',
    mechanismTag: 'Active Friction',
    defaultImage: '/slide2.webp',
  },
  {
    id: 'atmospheric-vibe-locks',
    order: 3,
    badge: '03 · Atmospheric Vibe Locks',
    category: 'Vibe Locks',
    title: 'CURATED SOUNDSCAPES & DEEP FOCUS SANCTUARIES',
    subtitle: 'Turn your workspace into an ambient, distraction-free sanctuary.',
    description:
      'Set a focus timer from 25 to 90 minutes with relaxing sounds like rain on a tent or soft ambient white noise, turning your phone into a peaceful desk clock.',
    highlights: [
      'Dual multi-track ambient soundscape mixer',
      'Nightstand and desk glowing clock focus mode',
      'Strict or relaxed ambient barrier per work session',
      '+52 minutes of sustained deep work per session',
    ],
    statLabel: 'Deep Work',
    statValue: '+52 Min / Session',
    icon: <Volume2 className="w-5 h-5 text-purple-300" />,
    accentColor: 'purple',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    mechanismTitle: 'Binaural Soundscape & Vibe Locks',
    mechanismTag: 'Deep Focus',
    defaultImage: '/slide3.webp',
  },
  {
    id: 'crystal-habit-garden',
    order: 4,
    badge: '04 · Crystal Habit Garden',
    category: 'Crystal Garden',
    title: 'WATCH YOUR SCREEN-FREE HOURS BLOOM INTO CRYSTALS',
    subtitle: 'Turn reclaimed minutes into a living, glowing cosmic biome.',
    description:
      'Every minute spent away from digital feeds nourishes your cosmic garden. Unlock rare amethyst geodes, stardust sprouts, and night flowers as your streak builds day by day.',
    highlights: [
      'Streak safeguard and resting periods for healthy pacing',
      'Collectible rare mineral species and glowing night flowers',
      'Real-time screen time conversion into stardust blooms',
      'Over 1.4 million hours reclaimed by the Breaksy community',
    ],
    statLabel: 'Community Reclaimed',
    statValue: '1.4M+ Hours',
    icon: <Sprout className="w-5 h-5 text-emerald-400" />,
    accentColor: 'emerald',
    glowColor: 'rgba(168, 185, 129, 0.25)',
    mechanismTitle: 'Crystal Habit Garden & Streaks',
    mechanismTag: 'Cosmic Biome',
    defaultImage: '/slide4.webp',
  },
  {
    id: 'circadian-sleep-sanctuary',
    order: 5,
    badge: '05 · Circadian Sleep Sanctuary',
    category: 'Sleep Sanctuary',
    title: 'GENTLE NIGHTFALL BARRIERS FOR DEEP RESTFUL SLEEP',
    subtitle: 'Protect your bedtime from blue light and 2 AM rabbit holes.',
    description:
      'As dusk falls, Breaksy shifts your device into a warm, low-stimulation sanctuary. Nox tucks in under the moonlight, dimming notifications and keeping distracting apps locked until dawn.',
    highlights: [
      'Circadian auto-activation at your personal bedtime',
      'Warm night colors that protect your eyes and natural sleep.',
      'Peace of mind with emergency call and message whitelist',
      '+48 minutes of average deep sleep gained per night',
    ],
    statLabel: 'Restful Sleep',
    statValue: '+48 Min Nightly',
    icon: <Moon className="w-5 h-5 text-indigo-300" />,
    accentColor: 'indigo',
    glowColor: 'rgba(99, 102, 241, 0.25)',
    mechanismTitle: 'Circadian Bedtime Barrier',
    mechanismTag: 'Sleep Sanctuary',
    defaultImage: '/slide5.webp',
  },
  {
    id: 'behavioral-analytics-pulse',
    order: 6,
    badge: '06 · Behavioral Analytics Pulse',
    category: 'Analytics Pulse',
    title: 'UNDERSTAND YOUR TRIGGERS WITHOUT THE GUILT TRIP',
    subtitle: 'Clean, actionable insights into when and why you reach for your phone.',
    description:
      'No shameful red bar charts. Breaksy visualizes your digital wellness with calming violet wave graphs, highlighting peak friction hours and measuring the steady growth of your conscious attention span.',
    highlights: [
      'See the exact times and patterns you check your phone most often.',
      'Interception success ratios and weekly momentum scores',
      '100% private, on-device analytics storage',
      'Average daily screen time dropped from 5.4h to 2.1h in 3 weeks',
    ],
    statLabel: 'Screen Time Reduction',
    statValue: '5.4h → 2.1h Daily',
    icon: <BarChart3 className="w-5 h-5 text-cyan-400" />,
    accentColor: 'cyan',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    mechanismTitle: 'Calm Wave Analytics & Trigger Insights',
    mechanismTag: 'Behavioral Pulse',
    defaultImage: '/slide6.webp',
  },
  {
    id: 'mindful-friction-gateway',
    order: 7,
    badge: '07 · Mindful Friction Gateway',
    category: 'Friction Gateway',
    title: 'EMERGENCY OVERRIDES THAT RESPECT YOUR AUTONOMY',
    subtitle: 'You are always in control, gently guided by mindful friction.',
    description:
      'Need critical work files or answering an urgent family message? Breaksy never imprisons your device. A short 30-second breathing cool-down or emergency passcode ensures you only enter when you truly need to.',
    highlights: [
      '30-Second reflection delay prevents impulsive overrides',
      'Whitelisted emergency contacts and essential communication',
      'Zero shame: transparent self-accountability bypass log',
      '91% of attempted overrides aborted after reflection pause',
    ],
    statLabel: 'Impulse Filter',
    statValue: '91% Aborted Overrides',
    icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
    accentColor: 'rose',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    mechanismTitle: 'Mindful Override & 30s Reflection',
    mechanismTag: 'Respectful Friction',
    defaultImage: '/slide7.webp',
  },
  {
    id: 'precision-app-rules',
    order: 8,
    badge: '08 · Precision Rules',
    category: 'Precision Rules',
    title: 'CUSTOMIZED FRICTION TAILORED TO YOUR ROUTINE',
    subtitle: 'Differentiate between essential productivity tools and doomscroll traps.',
    description:
      'Set precise friction levels per app. Apply strict Zen hurdles on TikTok and Reels, gentle 3-second breathing delays on Slack after 7 PM, and leave your camera, notes, and music untouched.',
    highlights: [
      'Per-app friction sliders: Zen, Strict, or Soft delay',
      'Schedule-based routine triggers for Work, Study, and Night',
      'Supports 10,000+ iOS and Android apps with zero configuration',
    ],
    statLabel: 'App Compatibility',
    statValue: '10,000+ Apps',
    icon: <SlidersHorizontal className="w-5 h-5 text-indigo-300" />,
    accentColor: 'indigo',
    glowColor: 'rgba(129, 140, 248, 0.25)',
    mechanismTitle: 'Per-App Friction Sliders & Profiles',
    mechanismTag: 'Custom Schedules',
    defaultImage: '/slide8.webp',
  },
  {
    id: 'nox-companion-widget',
    order: 9,
    badge: '09 · Companion & Widget',
    category: 'Companion & Widget',
    title: 'A CALMING PRESENCE RIGHT ON YOUR HOME SCREEN',
    subtitle: 'Glanceable focus reminders that soothe instead of stress.',
    description:
      'Keep Nox the sleeping bunny close. The interactive home and lock screen widget reflects your current session state, showing your streak, active vibe locks, and quick-start zen timers in one tap.',
    highlights: [
      'Interactive iOS and Android widgets for lock and home screen',
      'Dynamic mascot reactions to streaks and focus milestones',
      'One-tap vibe lock and timer activation without opening the app',
      'Rated 4.9/5 stars by over 28,000 mindful creators',
    ],
    statLabel: 'User Rating',
    statValue: '4.9 ★ (28k+ Users)',
    icon: <Star className="w-5 h-5 text-amber-300" />,
    accentColor: 'amber',
    glowColor: 'rgba(251, 191, 36, 0.25)',
    mechanismTitle: 'Interactive Mascot & Lock Screen Widget',
    mechanismTag: 'Home Companion',
    defaultImage: '/slide9.webp',
  },
  {
    id: 'smart-onboarding',
    order: 10,
    badge: '10 · Smart Onboarding',
    category: 'Smart Onboarding',
    title: 'SMART ONBOARDING & HABIT TARGETING',
    subtitle: 'Start with a plan built around your habits, not a generic one.',
    description:
      'Breaksy begins by learning what you want to change. Tell it whether you struggle with endless scrolling, late night phone use or screen fatigue, and the onboarding builds a friction profile that fits you from day one.',
    highlights: [
      'Target habits like scrolling addiction, bedtime checking and screen fatigue',
      'Set a personal baseline so your progress is measured against your own starting point',
      'A clean, calm interface that makes beginning feel easy',
    ],
    statLabel: 'Setup Plan',
    statValue: 'Personalized Profile',
    icon: <Smartphone className="w-5 h-5 text-indigo-300" />,
    accentColor: 'indigo',
    glowColor: 'rgba(124, 58, 237, 0.25)',
    mechanismTitle: 'Smart Onboarding & Habit Profiling',
    mechanismTag: 'Personalized Setup',
    defaultImage: '/slide10.webp',
  },
];

interface AppScreenshotsSectionProps {
  onOpenDownload?: () => void;
}

export const AppScreenshotsSection: React.FC<AppScreenshotsSectionProps> = React.memo(({
  onOpenDownload,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);
  const [sessionUploadedImages, setSessionUploadedImages] = useState<Record<number, string>>({});
  const [isInView, setIsInView] = useState<boolean>(false);
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const currentSlide = SCREENSHOT_SLIDES[currentIndex];

  // Progressive smart preloading: load initial slide first, then preload next slide in sequence
  useEffect(() => {
    const firstImg = new Image();
    firstImg.src = SCREENSHOT_SLIDES[0].defaultImage;
    firstImg.onload = firstImg.onerror = () => {
      setImagesPreloaded(true);
    };
  }, []);

  // Preload next slide ahead of time to make transitions instant without choking the network
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % SCREENSHOT_SLIDES.length;
    const nextImg = new Image();
    nextImg.src = SCREENSHOT_SLIDES[nextIdx].defaultImage;
  }, [currentIndex]);

  // IntersectionObserver: Only activate slideshow autoplay when this section is visible in the viewport
  // Stops any background transition, timer, or jerk when the user is scrolled to other sections!
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Directly resolves to public /slide1.webp .. /slide10.webp uploaded by user
  const getCustomImageForSlide = (slide: ScreenshotSlide): string => {
    if (sessionUploadedImages[slide.order]) {
      return sessionUploadedImages[slide.order];
    }
    return slide.defaultImage || `/slide${slide.order}.webp`;
  };

  const activeCustomImage = getCustomImageForSlide(currentSlide);

  const handleNext = useCallback(() => {
    soundEngine.playClick();
    setCurrentIndex((prev) => (prev + 1) % SCREENSHOT_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    soundEngine.playClick();
    setCurrentIndex(
      (prev) => (prev - 1 + SCREENSHOT_SLIDES.length) % SCREENSHOT_SLIDES.length
    );
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const handleImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    try {
      const dataUrl = await optimizeImageFile(file);
      setSessionUploadedImages((prev) => ({
        ...prev,
        [currentSlide.order]: dataUrl,
      }));
      soundEngine.playSuccess();
    } catch (err) {
      console.error('Failed to save image', err);
    }
  };

  // Autoplay only when images are preloaded, playing is active, modal is closed, AND section is actually in view!
  useEffect(() => {
    if (isPlaying && isInView && !isZoomModalOpen && imagesPreloaded) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % SCREENSHOT_SLIDES.length);
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isInView, isZoomModalOpen, imagesPreloaded]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape' && isZoomModalOpen) setIsZoomModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isZoomModalOpen]);

  return (
    <section
      id="previews"
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#090C24] via-[#0D102E] to-[#0A0D28] text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10 select-none overflow-hidden border-t border-purple-500/15"
    >
      {/* Background ambient lighting (Hardware-accelerated radial glow) */}
      <div className="absolute top-1/3 left-1/4 w-[750px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(49,46,129,0.2)_0%,transparent_70%)] pointer-events-none" />



      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <FadeIn delay={0} y={20}>
          <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
              How Breaksy <span className="hero-heading">Feels In Hand</span>
            </h2>
            <p className="text-slate-300 font-light text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Step through all 10 signature screens in exact order. From the initial 5-second reflex pause to ambient vibe locks and habit gardens.
            </p>
          </div>
        </FadeIn>

        {/* Main Slideshow Stage: Shows Exactly ONE Slide at a Time (Supports Swipe Gestures on Mobile) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative bg-gradient-to-br from-[#12163A]/90 via-[#0E1130]/90 to-[#0A0D28]/95 border border-purple-500/25 rounded-3xl p-4 sm:p-6 lg:p-7 shadow-2xl shadow-purple-950/40 backdrop-blur-md overflow-hidden"
        >
          {/* Subtle Accent Glow Ring on Active Slide (Hardware accelerated radial gradient) */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-40 transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${currentSlide.glowColor || 'rgba(124, 58, 237, 0.35)'} 0%, transparent 70%)`,
            }}
          />

          {/* TOP CONTROLS BAR: Prev, Pause/Play, Next */}
          <div className="relative z-20 flex items-center justify-end gap-3 pb-3 sm:pb-4 border-b border-white/10 mb-4 sm:mb-6">
            {/* Right: Circular control buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <button
                onClick={handlePrev}
                className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-purple-600/30 border border-white/15 hover:border-purple-400/50 text-white transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                title="Previous Slide"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-purple-600/30 border border-white/15 hover:border-purple-400/50 text-white transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                title={isPlaying ? 'Pause Slideshow' : 'Resume Autoplay'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-purple-600/30 border border-white/15 hover:border-purple-400/50 text-white transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                title="Next Slide"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Stable Height Slide Content Container - Prevents any layout shift or page jerk */}
          <div className="relative w-full min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] flex items-center overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.32, ease: 'easeInOut' }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
              >
                {/* Left Column: Enlarged Slide Screenshot strictly bounded by viewport height */}
                <div className="lg:col-span-7 xl:col-span-7 flex items-center justify-center relative w-full h-full p-0">
                  {/* Clickable Image Container - Zero borders, Zero background color behind slide image */}
                  <div
                    onClick={() => setIsZoomModalOpen(true)}
                    title="Click to view full resolution"
                    className="relative flex items-center justify-center w-full cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.015]"
                  >
                    <img
                      src={activeCustomImage}
                      alt={currentSlide.title}
                      width="1076"
                      height="1353"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (e.currentTarget.src !== currentSlide.defaultImage) {
                          e.currentTarget.src = currentSlide.defaultImage;
                        }
                      }}
                      style={{ maxHeight: 'min(500px, 54vh)' }}
                      className="w-auto h-auto max-w-full object-contain select-none transition-all duration-300 ease-out drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                    />
                  </div>

                  {/* Hidden file input for uploading custom screenshot images */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageFile(e.target.files[0]);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>

                {/* Right Column: Slide Information, Headings, Subtitle & Copy */}
                <div className="lg:col-span-5 xl:col-span-5 space-y-3.5 sm:space-y-4 text-left">
                  {/* Heading */}
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                      {currentSlide.title}
                    </h3>
                    <p className="mt-1 text-purple-300 font-medium text-xs sm:text-sm md:text-base">
                      {currentSlide.subtitle}
                    </p>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                    {currentSlide.description}
                  </p>

                  {/* Highlight Checkmarks */}
                  <div className="space-y-2 pt-0.5">
                    {currentSlide.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span className="text-slate-200 text-xs sm:text-sm font-normal leading-snug">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal (Only when custom image is present) */}
      {isZoomModalOpen && activeCustomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 select-none"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{currentSlide.title}</span>
              </div>
              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="w-full py-6 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src={activeCustomImage}
                alt={currentSlide.title}
                width="1076"
                height="1353"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  if (e.currentTarget.src !== currentSlide.defaultImage) {
                    e.currentTarget.src = currentSlide.defaultImage;
                  }
                }}
                className="max-h-[72vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain"
              />
            </div>

            {/* Modal Controls - Simple circular buttons without slide numbers */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});
