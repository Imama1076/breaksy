import React from 'react';
import { FadeIn } from './MotionHelpers';

interface FeatureItem {
  number: string;
  name: string;
  description: string;
}

const BREAKSY_FEATURES: FeatureItem[] = [
  {
    number: '01',
    name: 'Instant App Shielding & Reflex Interception',
    description:
      'Breaksy pauses distracting apps the moment your thumb taps them on habit. It runs smoothly on your phone while keeping your personal usage completely private.',
  },
  {
    number: '02',
    name: 'Mindful Micro-Challenges',
    description:
      'Instead of a boring lock screen, solve quick puzzles, word games, or take a deep breath. It stops mindless scrolling and gives you a moment to decide.',
  },
  {
    number: '03',
    name: 'Cozy Focus Spaces ("Vibe Locks")',
    description:
      'Turn blocked screen time into relaxing focus sessions. Enjoy soothing background sounds like gentle rain or a crackling fire to stay calm and productive.',
  },
  {
    number: '04',
    name: 'Crystal Garden & Habit Streaks',
    description:
      'Hit your daily screen-time goals to watch your crystal garden grow. Keep your streak alive to unlock rare, beautiful blooms over time.',
  },
  {
    number: '05',
    name: 'Gentle Night Guard & Sleep Mode',
    description:
      'Wind down naturally with gentle bedtime reminders, relaxing audio timers, and a warm screen display that keeps you from doomscrolling in bed.',
  },
];

export const ServicesSection: React.FC = React.memo(() => {
  return (
    <section
      id="features"
      className="relative bg-gradient-to-b from-[#0E102E] via-[#0A0C26] to-[#0D102D] text-white px-4 sm:px-8 md:px-10 py-20 sm:py-28 z-10 select-none border-t border-purple-500/15"
    >
      {/* Background ambient illumination (Hardware-accelerated radial glow) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.14)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={30}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-black uppercase text-center text-white leading-none tracking-tight text-[clamp(2.5rem,8vw,120px)]">
              FEATURES
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-base text-slate-300 font-light">
              Built on behavioral psychology to rewire phone addiction without blunt frustration.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
          {BREAKSY_FEATURES.map((item, i) => (
            <FadeIn key={item.number} delay={i * 0.06} y={20}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 py-6 sm:py-8 group hover:bg-white/[0.02] transition-colors rounded-2xl px-2 sm:px-6">
                {/* Number on left */}
                <div className="flex items-center gap-4 lg:w-40 shrink-0">
                  <span className="font-black text-purple-400/80 group-hover:text-purple-300 transition-colors leading-none text-[clamp(2.4rem,6vw,80px)] tracking-tighter">
                    {item.number}
                  </span>
                </div>

                {/* Name & description in middle */}
                <div className="flex flex-col gap-1.5 md:gap-2 flex-1 max-w-2xl">
                  <h3 className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-purple-200 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
});
