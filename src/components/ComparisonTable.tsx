import React from 'react';
import { Check, X } from 'lucide-react';

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
    feature: 'Mindful Alternative & Anti Bypass',
    builtin: {
      status: 'negative',
      title: 'None & trivial 1 tap bypass',
      description: 'You either close the app or bypass limit in under 1 second on reflex with empty boredom',
    },
    paid: {
      status: 'negative',
      title: 'Static delay & rigid VPN locks',
      description: 'Single repetitive breathing circle or frustrating lock screens that users rage delete',
    },
    breaksy: {
      status: 'positive',
      title: 'Active wellness micro hurdles',
      description: 'Rotates quick math, word puzzles, guided breathing & ambient focus that cannot be bypassed on reflex',
    },
  },
  {
    feature: 'Personalized Habit Tuning',
    builtin: {
      status: 'negative',
      title: 'One size fits all timer',
      description: 'No behavioral assessment or trigger based customization',
    },
    paid: {
      status: 'negative',
      title: 'Generic blocklists',
      description: 'Only allows manual app categories or rigid calendar schedules',
    },
    breaksy: {
      status: 'positive',
      title: 'Built in Habit Tuner',
      description: 'Calibrates friction to your specific goal: doomscrolling, morning phone in bed, sleep, or focus',
    },
  },
  {
    feature: 'Privacy & No Account',
    builtin: {
      status: 'negative',
      title: 'Tied to Google / OS account',
      description: 'Synced across cloud accounts and system telemetry',
    },
    paid: {
      status: 'negative',
      title: 'Mandatory registration',
      description: 'Requires email sign up, passwords, and profile creation',
    },
    breaksy: {
      status: 'positive',
      title: 'No Account Required',
      description: '100% anonymous, instant 1 tap start with zero data collection',
    },
  },
  {
    feature: 'Free Core Access',
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
      description: 'Full featured mindful pause with no subscription traps',
    },
  },
  {
    feature: 'Instant Intervention & Habit Change',
    builtin: {
      status: 'negative',
      title: 'Too late & treats symptoms',
      description: 'Fires only after 60+ minutes of scrolling, leaving the subconscious motor loop intact',
    },
    paid: {
      status: 'negative',
      title: 'Relies on brute force',
      description: 'Creates friction without positive reinforcement, leading to high app churn',
    },
    breaksy: {
      status: 'positive',
      title: 'Tap zero reflex rewiring',
      description: 'Intercepts unconscious thumb reflexes at millisecond zero; clinical data shows 37% fewer open attempts',
    },
  },
];

export const ComparisonTable: React.FC = () => {
  return (
    <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col gap-6 sm:gap-8">
      <div>
        <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-300 block mb-1">
          HOW BREAKSY DIFFERS
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white heading-font">
          Built-in Screen Time vs. Paid Blockers vs. Breaksy
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-xl font-light">
          Traditional blockers simply delay the inevitable doomscroll. Breaksy dismantles the underlying subconscious habit loop.
        </p>
      </div>

      {/* Desktop Table View (>= lg) */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400 font-semibold bg-white/[0.02]">
              <th className="py-4 px-4 w-1/4">Feature</th>
              <th className="py-4 px-4 w-1/4 text-slate-400">
                Built-in Screen Time
                <span className="block text-[10px] text-slate-400 font-normal mt-0.5">(Google Digital Wellbeing)</span>
              </th>
              <th className="py-4 px-4 w-1/4 text-slate-400">
                Paid Blockers
                <span className="block text-[10px] text-slate-400 font-normal mt-0.5">(Opal, One Sec)</span>
              </th>
              <th className="py-4 px-4 w-1/4 text-purple-200 font-bold bg-gradient-to-b from-purple-600/25 to-indigo-600/15 border-l border-r border-purple-500/20">
                <span>Breaksy Companion</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {ROWS.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-4 font-semibold text-white align-top">
                  {row.feature}
                </td>

                <td className="py-5 px-4 text-slate-400 align-top">
                  <div className="flex items-start gap-2">
                    {row.builtin.status === 'positive' ? (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="text-slate-300 font-medium block">{row.builtin.title}</span>
                      <span className="text-xs text-slate-400 mt-0.5 block font-light leading-snug">{row.builtin.description}</span>
                    </div>
                  </div>
                </td>

                <td className="py-5 px-4 text-slate-400 align-top">
                  <div className="flex items-start gap-2">
                    {row.paid.status === 'positive' ? (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="text-slate-300 font-medium block">{row.paid.title}</span>
                      <span className="text-xs text-slate-400 mt-0.5 block font-light leading-snug">{row.paid.description}</span>
                    </div>
                  </div>
                </td>

                <td className="py-5 px-4 bg-gradient-to-b from-purple-900/20 to-indigo-950/30 border-l border-r border-purple-500/20 align-top">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-bold block">{row.breaksy.title}</span>
                      <span className="text-xs text-indigo-200 mt-0.5 block font-normal leading-snug">{row.breaksy.description}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View (< lg) */}
      <div className="block lg:hidden space-y-4">
        {ROWS.map((row, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
          >
            <div className="text-sm font-bold text-white tracking-wide border-b border-white/10 pb-2 flex items-center justify-between">
              <span>{row.feature}</span>
              <span className="text-[10px] font-mono text-purple-300">0{idx + 1}</span>
            </div>

            {/* Built-in comparison */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {row.builtin.status === 'positive' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                )}
                <span>Built in Screen Time</span>
              </div>
              <p className="text-xs text-slate-200 font-medium">{row.builtin.title}</p>
              <p className="text-[11px] text-slate-400 font-light">{row.builtin.description}</p>
            </div>

            {/* Paid Blockers comparison */}
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
        ))}
      </div>
    </div>
  );
};
