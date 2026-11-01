import React, { useState, useRef, Suspense, lazy } from 'react';
import { FadeIn } from './MotionHelpers';
import { ContactButton } from './Buttons';
// Code-split interactive tabs to keep initial page bundle lean & instant
const InterceptionSimulator = lazy(() => import('./InterceptionSimulator').then(m => ({ default: m.InterceptionSimulator })));
const MicroChallengesShowcase = lazy(() => import('./MicroChallengesShowcase').then(m => ({ default: m.MicroChallengesShowcase })));
const VibeLocksShowcase = lazy(() => import('./VibeLocksShowcase').then(m => ({ default: m.VibeLocksShowcase })));
const CrystalGardenShowcase = lazy(() => import('./CrystalGardenShowcase').then(m => ({ default: m.CrystalGardenShowcase })));
const SoundscapeMixer = lazy(() => import('./SoundscapeMixer').then(m => ({ default: m.SoundscapeMixer })));
const HabitsCustomizer = lazy(() => import('./HabitsCustomizer').then(m => ({ default: m.HabitsCustomizer })));

import {
  ShieldAlert,
  Brain,
  Flame,
  Sprout,
  Moon,
  Sliders,
} from 'lucide-react';

type ExperienceTab =
  | 'interception'
  | 'challenges'
  | 'vibelocks'
  | 'garden'
  | 'sleep'
  | 'habits';

interface TabItem {
  id: ExperienceTab;
  label: string;
  badge: string;
  icon: React.ReactNode;
}

const TABS: TabItem[] = [
  {
    id: 'interception',
    label: 'Reflex Pause',
    badge: 'Live',
    icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
  },
  {
    id: 'challenges',
    label: 'Focus Challenges',
    badge: 'Interactive',
    icon: <Brain className="w-4 h-4 text-purple-400" />,
  },
  {
    id: 'vibelocks',
    label: 'Vibe Locks',
    badge: 'Ambient',
    icon: <Flame className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'garden',
    label: 'Crystal Garden',
    badge: 'Milestones',
    icon: <Sprout className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: 'sleep',
    label: 'Sleep Sync',
    badge: 'Circadian',
    icon: <Moon className="w-4 h-4 text-indigo-400" />,
  },
  {
    id: 'habits',
    label: 'Habit Tuner',
    badge: 'Setup',
    icon: <Sliders className="w-4 h-4 text-cyan-400" />,
  },
];

interface ProjectsSectionProps {
  onOpenDownload?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = React.memo(({ onOpenDownload }) => {
  const [activeTab, setActiveTab] = useState<ExperienceTab>('interception');
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="simulator"
      className="relative min-h-[90vh] flex flex-col justify-center items-center bg-gradient-to-b from-[#0D102D] via-[#090C24] to-[#0B0E2A] text-white px-4 sm:px-8 md:px-10 lg:px-16 xl:px-24 pt-20 sm:pt-24 md:pt-28 pb-24 sm:pb-28 md:pb-32 overflow-hidden select-none border-t border-purple-500/10 scroll-mt-6 w-full max-w-full"
    >
      {/* Anchor for backward compatibility with #interactive links */}
      <span id="interactive" className="absolute -top-10 opacity-0 pointer-events-none" />
      {/* Background ambient cosmic glow (Hardware-accelerated radial gradients) */}
      <div className="absolute top-1/4 left-1/3 w-[850px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.14)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto w-full min-w-0 max-w-full">
        {/* Section Header */}
        <FadeIn delay={0} y={30} className="w-full min-w-0 max-w-full">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12 w-full">
            <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight text-3xl xs:text-4xl sm:text-5xl md:text-6xl">
              EXPERIENCE BREAKSY
            </h2>
            <p className="mt-3.5 text-[#D7E2EA] font-light max-w-xl text-xs sm:text-base leading-relaxed px-2">
              Try the mindful pauses, focus spaces, and daily habits that power Breaksy on Android.
            </p>
          </div>
        </FadeIn>

        {/* Tab Switcher */}
        <FadeIn delay={0.1} y={20} className="w-full min-w-0 max-w-full">
          <div
            ref={tabsContainerRef}
            className="w-full overflow-x-auto breaksy-scrollbar-x pb-4 mb-8 sm:mb-12 max-w-full"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-max px-3 sm:px-4 sm:mx-auto sm:justify-center">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={(e) => {
                      setActiveTab(tab.id);
                      const container = tabsContainerRef.current;
                      if (container) {
                        const btn = e.currentTarget;
                        const targetLeft =
                          btn.offsetLeft - container.clientWidth / 2 + btn.clientWidth / 2;
                        container.scrollTo({
                          left: Math.max(0, targetLeft),
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="shrink-0">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Tab Panels with Suspense */}
        <div className="relative w-full min-w-0 max-w-full">
          <Suspense fallback={<div className="min-h-[340px] flex items-center justify-center text-purple-300 font-bold tracking-widest text-xl">...</div>}>
            {activeTab === 'interception' && (
              <FadeIn key="interception" delay={0.05} y={20} className="w-full min-w-0 max-w-full">
                <div className="max-w-5xl mx-auto w-full min-w-0 max-w-full">
                  <InterceptionSimulator
                    onOpenDownload={onOpenDownload}
                    onNavigateToChallenges={() => setActiveTab('challenges')}
                  />
                </div>
              </FadeIn>
            )}

            {activeTab === 'challenges' && (
              <FadeIn key="challenges" delay={0.05} y={20} className="w-full min-w-0 max-w-full">
                <div className="max-w-5xl mx-auto w-full min-w-0 max-w-full">
                  <MicroChallengesShowcase onOpenDownload={onOpenDownload} />
                </div>
              </FadeIn>
            )}

            {activeTab === 'vibelocks' && (
              <FadeIn key="vibelocks" delay={0.05} y={20} className="w-full min-w-0 max-w-full">
                <div className="max-w-5xl mx-auto w-full min-w-0 max-w-full">
                  <VibeLocksShowcase />
                </div>
              </FadeIn>
            )}

            {activeTab === 'garden' && (
              <FadeIn key="garden" delay={0.05} y={20} className="w-full min-w-0 max-w-full">
                <div className="max-w-4xl mx-auto w-full min-w-0 max-w-full">
                  <CrystalGardenShowcase />
                </div>
              </FadeIn>
            )}

            {activeTab === 'sleep' && (
              <FadeIn key="sleep" delay={0.05} y={20} className="w-full min-w-0 max-w-full">
                <div className="max-w-4xl mx-auto w-full min-w-0 max-w-full">
                  <SoundscapeMixer isSleeping={true} />
                </div>
              </FadeIn>
            )}

            {activeTab === 'habits' && (
              <FadeIn key="habits" delay={0.05} y={20} className="w-full min-w-0 max-w-full">
                <div className="max-w-4xl mx-auto w-full min-w-0 max-w-full">
                  <HabitsCustomizer />
                </div>
              </FadeIn>
            )}

          </Suspense>
        </div>

        <FadeIn delay={0.2} y={30} className="mt-14 sm:mt-20 text-center w-full min-w-0 max-w-full">
          <div className="max-w-3xl mx-auto w-full min-w-0 py-6 sm:py-8 px-4 flex flex-col items-center gap-5 sm:gap-6">
            <div className="flex flex-col items-center gap-3 sm:gap-4 w-full">
              <h3 className="heading-font text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight text-white max-w-3xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
                <span className="block" style={{ fontFamily: "'Nunito', sans-serif" }}>Reclaim Your Attention Span</span>
                <span className="block" style={{ fontFamily: "'Nunito', sans-serif" }}>Today</span>
              </h3>
              <p className="text-xs sm:text-base text-slate-300 font-light leading-relaxed tracking-normal max-w-lg mx-auto">
                Join thousands building intentional digital habits with Breaksy. Available for Android.
              </p>
            </div>
            <div className="pt-1 sm:pt-2">
              <ContactButton label="Download Breaksy App" onClick={onOpenDownload} size="lg" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
});
