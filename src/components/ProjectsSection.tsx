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
const ComparisonTable = lazy(() => import('./ComparisonTable').then(m => ({ default: m.ComparisonTable })));

import {
  ShieldAlert,
  Brain,
  Flame,
  Sprout,
  Moon,
  Sliders,
  BarChart3,
} from 'lucide-react';

type ExperienceTab =
  | 'interception'
  | 'challenges'
  | 'vibelocks'
  | 'garden'
  | 'sleep'
  | 'habits'
  | 'comparison';

interface TabItem {
  id: ExperienceTab;
  label: string;
  badge: string;
  icon: React.ReactNode;
}

const TABS: TabItem[] = [
  {
    id: 'interception',
    label: 'Launch Intercept',
    badge: 'Live',
    icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
  },
  {
    id: 'challenges',
    label: '6 Micro-Hurdles',
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
  {
    id: 'comparison',
    label: 'vs Built-in Screen Time',
    badge: 'Breakdown',
    icon: <BarChart3 className="w-4 h-4 text-yellow-400" />,
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
      id="interactive"
      className="relative bg-gradient-to-b from-[#0D102D] via-[#090C24] to-[#0B0E2A] text-white px-4 sm:px-8 md:px-10 pt-10 sm:pt-14 md:pt-16 pb-16 sm:pb-20 overflow-hidden select-none border-t border-purple-500/10"
    >
      {/* Background ambient cosmic glow (Hardware-accelerated radial gradients) */}
      <div className="absolute top-1/4 left-1/3 w-[850px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.14)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
            <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight text-[2.2rem] xs:text-[2.75rem] sm:text-5xl md:text-6xl">
              EXPERIENCE BREAKSY
            </h2>
            <p className="mt-3.5 text-[#D7E2EA] font-light max-w-xl text-xs sm:text-base leading-relaxed px-2">
              Try the mindful pauses, focus spaces, and daily habits that power Breaksy on iOS & Android.
            </p>
          </div>
        </FadeIn>

        {/* Tab Switcher */}
        <FadeIn delay={0.1} y={20}>
          <div
            ref={tabsContainerRef}
            className="w-full overflow-x-auto breaksy-scrollbar-x pb-4 mb-8 sm:mb-12 max-w-full"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-max mx-auto px-2 justify-start xl:justify-center">
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
                    className={`px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-sm font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Tab Panels with Suspense */}
        <div className="relative">
          <Suspense fallback={<div className="min-h-[340px] flex items-center justify-center text-purple-300 font-bold tracking-widest text-xl">...</div>}>
            {activeTab === 'interception' && (
              <FadeIn key="interception" delay={0.05} y={20}>
                <div className="max-w-4xl mx-auto">
                  <InterceptionSimulator
                    onOpenDownload={onOpenDownload}
                    onNavigateToChallenges={() => setActiveTab('challenges')}
                  />
                </div>
              </FadeIn>
            )}

            {activeTab === 'challenges' && (
              <FadeIn key="challenges" delay={0.05} y={20}>
                <div className="max-w-5xl mx-auto">
                  <MicroChallengesShowcase onOpenDownload={onOpenDownload} />
                </div>
              </FadeIn>
            )}

            {activeTab === 'vibelocks' && (
              <FadeIn key="vibelocks" delay={0.05} y={20}>
                <div className="max-w-5xl mx-auto">
                  <VibeLocksShowcase />
                </div>
              </FadeIn>
            )}

            {activeTab === 'garden' && (
              <FadeIn key="garden" delay={0.05} y={20}>
                <div className="max-w-4xl mx-auto">
                  <CrystalGardenShowcase />
                </div>
              </FadeIn>
            )}

            {activeTab === 'sleep' && (
              <FadeIn key="sleep" delay={0.05} y={20}>
                <div className="max-w-4xl mx-auto">
                  <SoundscapeMixer isSleeping={true} />
                </div>
              </FadeIn>
            )}

            {activeTab === 'habits' && (
              <FadeIn key="habits" delay={0.05} y={20}>
                <div className="max-w-4xl mx-auto">
                  <HabitsCustomizer />
                </div>
              </FadeIn>
            )}

            {activeTab === 'comparison' && (
              <FadeIn key="comparison" delay={0.05} y={20}>
                <div className="max-w-5xl mx-auto">
                  <ComparisonTable />
                </div>
              </FadeIn>
            )}
          </Suspense>
        </div>

        {/* Section Footer Callout */}
        <FadeIn delay={0.2} y={30} className="mt-14 sm:mt-20 text-center">
          <div className="glass-panel max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl border border-indigo-400/20 flex flex-col items-center gap-5 sm:gap-6">
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <h3 className="text-xl sm:text-3xl font-black uppercase tracking-normal leading-snug sm:leading-tight text-white max-w-xl">
                Reclaim Your Attention Span Today
              </h3>
              <p className="text-xs sm:text-base text-slate-300 font-light leading-relaxed tracking-normal max-w-lg mx-auto">
                Join thousands building intentional digital habits with Breaksy. Available for iOS and Android.
              </p>
            </div>
            <div className="pt-1 sm:pt-2">
              <ContactButton label="Download Breaksy App" onClick={onOpenDownload} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
});
