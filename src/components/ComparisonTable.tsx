import React from 'react';
import { Check, X } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const rows = [
    {
      feature: 'Trigger Point',
      builtin: 'Only after an arbitrary daily cap is depleted (e.g., 1 hr/day)',
      breaksy: 'The moment you open an app on autopilot',
      builtinSub: 'Allows mindless scrolling until time runs out',
      breaksySub: 'Catches the impulse before the scrolling session starts',
    },
    {
      feature: 'Bypass Difficulty',
      builtin: '“Ignore limit for 15 minutes” (trivial 1-tap dismiss)',
      breaksy: 'Mindful micro-challenges (Quick math, breathing, puzzles)',
      builtinSub: 'Zero friction, 94% of users bypass within seconds',
      breaksySub: 'Wakes up your conscious mind to stop the reflex',
    },
    {
      feature: 'Psychological Goal',
      builtin: 'Blunt time rationing (treating the symptom)',
      breaksy: 'Breaks the automatic scrolling habit at the root',
      builtinSub: 'Leaves phone addiction neural pathways intact',
      breaksySub: 'Creates permanent cognitive friction against compulsive checking',
    },
    {
      feature: 'Atmosphere & Tone',
      builtin: 'Guilt-inducing grey system dialog box',
      breaksy: 'Themed ambient focus spaces (“Vibe Locks”) & Crystal Garden rewards',
      builtinSub: 'Punitive and restrictive',
      breaksySub: 'Serene, grounding, and rewarding focus sanctuary',
    },
    {
      feature: 'Mindful Alternative',
      builtin: 'None. You either close app or ignore limit',
      breaksy: 'Guided breathing, memory games, vocabulary expansion, and posture stretches',
      builtinSub: 'Leaves you with empty restless boredom',
      breaksySub: 'Redirects nervous energy into restorative wellness micro-breaks',
    },
  ];

  return (
    <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col gap-6 sm:gap-8">
      <div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white heading-font">
          How Breaksy Differs from Standard Built-in Screen Time
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-xl font-light">
          Traditional blockers simply delay the inevitable doomscroll. Breaksy dismantles the underlying subconscious habit loop.
        </p>
      </div>

      {/* Desktop Table View (>= md) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400 font-semibold">
              <th className="py-4 px-4 w-1/4">Feature</th>
              <th className="py-4 px-4 w-3/8 text-slate-400">Built-in Screen Time (iOS / Android)</th>
              <th className="py-4 px-4 w-3/8 text-indigo-300 font-bold bg-indigo-500/10 rounded-t-2xl">
                Breaksy Companion
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-4 font-semibold text-white align-top">
                  {row.feature}
                </td>
                <td className="py-5 px-4 text-slate-400 align-top">
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-300 font-medium block">{row.builtin}</span>
                      <span className="text-xs text-slate-500 mt-0.5 block">{row.builtinSub}</span>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-4 bg-indigo-500/[0.04] align-top">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-bold block">{row.breaksy}</span>
                      <span className="text-xs text-indigo-200 mt-0.5 block">{row.breaksySub}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View (< md) */}
      <div className="block md:hidden space-y-4">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
          >
            <div className="text-sm font-bold text-white tracking-wide border-b border-white/10 pb-2 flex items-center justify-between">
              <span>{row.feature}</span>
              <span className="text-[10px] font-mono text-purple-300">0{idx + 1}</span>
            </div>

            {/* Built-in comparison */}
            <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/15">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1">
                <X className="w-3.5 h-3.5 text-rose-400" />
                <span>Built-in Screen Time</span>
              </div>
              <p className="text-xs text-slate-300">{row.builtin}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{row.builtinSub}</p>
            </div>

            {/* Breaksy Companion */}
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/25 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Breaksy Companion</span>
              </div>
              <p className="text-xs font-bold text-white">{row.breaksy}</p>
              <p className="text-[11px] text-indigo-200 mt-0.5">{row.breaksySub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
