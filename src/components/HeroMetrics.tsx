import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FadeIn } from './MotionHelpers';

interface MetricItem {
  value: string;
  label: string;
  description: string;
}

const METRICS: MetricItem[] = [
  {
    value: '36%',
    label: 'Impulse Drop',
    description: 'Closed immediately during the 5-second pause',
  },
  {
    value: '37%',
    label: 'Habit Extinction',
    description: 'Fewer subconscious open attempts by Week 6',
  },
  {
    value: '57%',
    label: 'Total Reduction',
    description: 'Drop in overall daily app opens',
  },
  {
    value: '77 Min',
    label: 'Reclaimed Daily',
    description: 'Recovered focus time per user',
  },
];

export const HeroMetrics: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 select-none">
      {/* 4-Column Minimalist Hero Stat Bar (Desktop: 4 cols, Mobile: 2x2 grid) */}
      <FadeIn delay={0.3} y={20}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-purple-500/30 transition-all duration-300 text-center flex flex-col items-center justify-between group shadow-lg shadow-indigo-950/20"
            >
              <div className="w-full">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black heading-font text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-indigo-200 to-amber-200 tracking-tight block">
                  {metric.value}
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mt-1 block">
                  {metric.label}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-light mt-1.5 leading-snug max-w-[210px]">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Citation Footnote */}
      <FadeIn delay={0.4} y={15}>
        <p className="text-center text-[11px] sm:text-xs text-slate-400 mt-3.5 sm:mt-4 flex items-center justify-center gap-1.5 flex-wrap">
          <span>Source: Peer-reviewed field study of 280 users across 6 weeks, published in</span>
          <a
            href="https://www.pnas.org/doi/10.1073/pnas.2213114120"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-white underline underline-offset-2 inline-flex items-center gap-1 transition-colors font-medium"
          >
            <span>PNAS</span>
            <ExternalLink className="w-3 h-3 inline-block" />
          </a>
        </p>
      </FadeIn>
    </div>
  );
};
