import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import { FadeIn } from './MotionHelpers';

interface ComparisonRow {
  feature: string;
  builtin: {
    status: 'negative' | 'positive';
    title: string;
    description: string;
  };
  paid: {
    status: 'negative' | 'positive';
    title: string;
    description: string;
  };
  breaksy: {
    status: 'positive';
    title: string;
    description: string;
  };
}

const ROWS: ComparisonRow[] = [
  {
    feature: 'Mindful Alternative',
    builtin: {
      status: 'negative',
      title: 'None',
      description: 'You either close the app or ignore the limit; leaves you with empty, restless boredom',
    },
    paid: {
      status: 'negative',
      title: 'Single static delay or blank screen',
      description: 'Only offers a repetitive breathing circle or a locked screen with no healthy alternatives',
    },
    breaksy: {
      status: 'positive',
      title: 'Active wellness micro-breaks',
      description: 'Guided breathing, memory games, vocabulary expansion, posture stretches & ambient focus timers',
    },
  },
  {
    feature: 'Personalization & Goal Setting',
    builtin: {
      status: 'negative',
      title: 'One-size-fits-all timer',
      description: 'No behavioral assessment or trigger-based customization',
    },
    paid: {
      status: 'negative',
      title: 'Generic blocklists',
      description: 'Only allows manual app categories or rigid calendar schedules',
    },
    breaksy: {
      status: 'positive',
      title: 'Built-in Habit Tuner',
      description: 'Calibrates friction to your specific goal: doomscrolling, morning phone-in-bed, sleep, or focus',
    },
  },
  {
    feature: 'Account & Privacy',
    builtin: {
      status: 'negative',
      title: 'Tied to Apple ID / Google ecosystem',
      description: 'Synced across cloud accounts',
    },
    paid: {
      status: 'negative',
      title: 'Mandatory registration',
      description: 'Requires email sign-up, passwords, and profile creation',
    },
    breaksy: {
      status: 'positive',
      title: 'No Account Required',
      description: '100% anonymous, instant 1-tap start with zero data collection',
    },
  },
  {
    feature: 'Pricing & Access',
    builtin: {
      status: 'positive',
      title: 'Free',
      description: 'Built into device OS',
    },
    paid: {
      status: 'negative',
      title: '$20 to $99 / year',
      description: 'Locks basic features behind trial paywalls and yearly subscriptions',
    },
    breaksy: {
      status: 'positive',
      title: '100% Free Core Access',
      description: 'Full-featured mindful pause with no subscription traps',
    },
  },
  {
    feature: 'Bypass & Habituation',
    builtin: {
      status: 'negative',
      title: 'Trivial 1-tap bypass',
      description: '“Ignore limit for 15 min” bypassed in under 1 second on reflex',
    },
    paid: {
      status: 'negative',
      title: 'Predictable or extreme',
      description: 'Users habituate to static 5s timers, or rage-delete rigid VPN locks',
    },
    breaksy: {
      status: 'positive',
      title: 'Randomized micro-hurdles',
      description: 'Rotates math, puzzles & breathing so your brain cannot bypass on reflex',
    },
  },
  {
    feature: 'Trigger Point',
    builtin: {
      status: 'negative',
      title: 'After the damage is done',
      description: 'Fires only after you have already scrolled for 60+ minutes',
    },
    paid: {
      status: 'negative',
      title: 'Rigid pre-set schedules',
      description: 'Blocks apps during calendar blocks or broad time windows',
    },
    breaksy: {
      status: 'positive',
      title: 'Millisecond zero on app tap',
      description: 'Intercepts the unconscious thumb reflex before the feed can load',
    },
  },
  {
    feature: 'Habit Extinction',
    builtin: {
      status: 'negative',
      title: 'Treats the symptom',
      description: 'Blunt time rationing that leaves the subconscious motor loop intact',
    },
    paid: {
      status: 'negative',
      title: 'Relies on force',
      description: 'Creates friction without positive reinforcement, leading to app churn',
    },
    breaksy: {
      status: 'positive',
      title: 'Permanent rewiring',
      description: 'Backed by clinical data: leads to 37% fewer subconscious launch attempts',
    },
  },
];

export const ComparisonMatrix: React.FC = () => {
  return (
    <section
      id="comparison"
      className="relative bg-gradient-to-b from-[#0B0E2A] via-[#080B20] to-[#0D102D] text-white px-4 sm:px-8 md:px-10 py-16 sm:py-24 overflow-hidden select-none border-t border-purple-500/10"
    >
      {/* Background ambient cosmic glow */}
      <div className="absolute top-1/3 left-1/4 w-[750px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-300 block mb-2">
              HOW BREAKSY DIFFERS
            </span>
            <h2 className="hero-heading font-black uppercase text-center leading-tight tracking-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl">
              Built-in Screen Time vs. Paid Blockers vs. Breaksy
            </h2>
            <p className="mt-3.5 text-[#D7E2EA] font-light max-w-2xl text-xs sm:text-base leading-relaxed px-4">
              Traditional blockers simply delay the inevitable doomscroll. Breaksy dismantles the underlying subconscious habit loop.
            </p>
          </div>
        </FadeIn>

        {/* Desktop 3-Column Comparative Matrix (>= lg) */}
        <FadeIn delay={0.15} y={20}>
          <div className="hidden lg:block glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-indigo-950/40">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400 font-semibold bg-white/[0.02]">
                  <th className="py-5 px-6 w-1/4">Feature</th>
                  <th className="py-5 px-6 w-1/4 text-slate-400">
                    Built-in Screen Time
                    <span className="block text-[10px] text-slate-400 font-normal mt-0.5">(Apple / Google)</span>
                  </th>
                  <th className="py-5 px-6 w-1/4 text-slate-400">
                    Paid Blockers
                    <span className="block text-[10px] text-slate-400 font-normal mt-0.5">(Opal, One Sec)</span>
                  </th>
                  <th className="py-5 px-6 w-1/4 text-purple-200 font-bold bg-gradient-to-b from-purple-600/25 to-indigo-600/15 border-l border-r border-purple-500/20">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Breaksy Companion</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    {/* Feature Name */}
                    <td className="py-5 px-6 font-semibold text-white align-top">
                      {row.feature}
                    </td>

                    {/* Column 1: Built-in */}
                    <td className="py-5 px-6 text-slate-400 align-top">
                      <div className="flex items-start gap-2">
                        {row.builtin.status === 'positive' ? (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="text-slate-300 font-medium block">{row.builtin.title}</span>
                          <span className="text-xs text-slate-400 mt-0.5 block font-light leading-snug">
                            {row.builtin.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Paid Blockers */}
                    <td className="py-5 px-6 text-slate-400 align-top">
                      <div className="flex items-start gap-2">
                        {row.paid.status === 'positive' ? (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="text-slate-300 font-medium block">{row.paid.title}</span>
                          <span className="text-xs text-slate-400 mt-0.5 block font-light leading-snug">
                            {row.paid.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Breaksy Companion (Highlighted) */}
                    <td className="py-5 px-6 bg-gradient-to-b from-purple-900/20 to-indigo-950/30 border-l border-r border-purple-500/20 align-top">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-white font-bold block">{row.breaksy.title}</span>
                          <span className="text-xs text-indigo-200 mt-0.5 block font-normal leading-snug">
                            {row.breaksy.description}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* Mobile / Tablet Stacked Cards View (< lg) */}
        <div className="block lg:hidden space-y-4 sm:space-y-5">
          {ROWS.map((row, idx) => (
            <FadeIn key={idx} delay={idx * 0.04} y={15}>
              <div className="p-4 sm:p-5 rounded-2xl glass-panel bg-white/[0.03] border border-white/10 space-y-3">
                <div className="text-sm sm:text-base font-bold text-white tracking-wide border-b border-white/10 pb-2.5 flex items-center justify-between">
                  <span>{row.feature}</span>
                  <span className="text-[10px] font-mono text-purple-300">0{idx + 1}</span>
                </div>

                {/* Built-in Screen Time */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {row.builtin.status === 'positive' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    )}
                    <span>Built-in Screen Time (Apple / Google)</span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium">{row.builtin.title}</p>
                  <p className="text-[11px] text-slate-400 font-light">{row.builtin.description}</p>
                </div>

                {/* Paid Blockers */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {row.paid.status === 'positive' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    )}
                    <span>Paid Blockers (Opal, One Sec)</span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium">{row.paid.title}</p>
                  <p className="text-[11px] text-slate-400 font-light">{row.paid.description}</p>
                </div>

                {/* Breaksy Companion */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-purple-950/30 border border-purple-500/30 shadow-md space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-200 uppercase tracking-wider">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Breaksy Companion</span>
                  </div>
                  <p className="text-xs font-bold text-white">{row.breaksy.title}</p>
                  <p className="text-[11px] text-indigo-200 font-light">{row.breaksy.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
