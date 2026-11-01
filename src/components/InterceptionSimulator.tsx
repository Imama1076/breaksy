import React, { useState } from 'react';
import {
  Download,
  ShieldCheck,
  Gamepad2,
  Flame,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface InterceptionSimulatorProps {
  onOpenDownload?: () => void;
  onNavigateToChallenges?: () => void;
}

export const InterceptionSimulator: React.FC<InterceptionSimulatorProps> = ({
  onOpenDownload,
  onNavigateToChallenges,
}) => {
  const [showMotivationalQuote, setShowMotivationalQuote] = useState(false);

  const triggerDownloadAction = () => {
    soundEngine.playChime(true);
    if (onOpenDownload) {
      onOpenDownload();
    } else {
      const el = document.getElementById('download') || document.getElementById('hero');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToChallenges = () => {
    soundEngine.playClick();
    if (onNavigateToChallenges) {
      onNavigateToChallenges();
    }
    setTimeout(() => {
      const el = document.getElementById('challenges') || document.getElementById('interactive');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleToggleQuote = () => {
    soundEngine.playClick();
    setShowMotivationalQuote((prev) => !prev);
  };

  return (
    <div className="glass-panel p-3.5 xs:p-5 sm:p-8 md:p-12 rounded-[24px] sm:rounded-[36px] border border-white/10 flex flex-col gap-5 sm:gap-8 md:gap-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-white/10">
        <div>
          <h3 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white heading-font">
            How Breaksy Protects Your Attention
          </h3>
          <p className="text-xs xs:text-sm text-slate-300 mt-1.5 sm:mt-2 max-w-xl leading-relaxed">
            Choose an option below to explore how Breaksy shields your phone from mindless checking, activates conscious focus, and saves hours daily.
          </p>
        </div>
      </div>

      {/* 4 CORE OPTIONS (Wider aspect ratio, balanced height) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-4 md:gap-5 items-stretch">
        {/* OPTION 1: Download The App */}
        <button
          onClick={triggerDownloadAction}
          className="h-full min-h-[105px] xs:min-h-[120px] sm:min-h-[140px] md:min-h-[155px] p-2.5 xs:p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl bg-purple-950/30 hover:bg-purple-900/40 border border-purple-500/30 hover:border-purple-400 transition-all flex flex-col items-center justify-between text-center gap-1.5 xs:gap-2 group cursor-pointer transform hover:-translate-y-1 shadow-lg"
        >
          <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <Download className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center py-0.5 sm:py-1 w-full">
            <span className="text-[11px] xs:text-xs sm:text-sm md:text-base font-bold text-white block leading-snug">Download The App</span>
          </div>
          <div className="pt-0.5 shrink-0">
            <span className="text-[9px] xs:text-[10px] sm:text-xs text-purple-300 font-semibold flex items-center justify-center gap-0.5 xs:gap-1 group-hover:translate-x-0.5 transition-transform text-center">
              Install App <ArrowRight className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            </span>
          </div>
        </button>

        {/* OPTION 2: Block Apps You Want (Opens Download Popup) */}
        <button
          onClick={triggerDownloadAction}
          className="h-full min-h-[105px] xs:min-h-[120px] sm:min-h-[140px] md:min-h-[155px] p-2.5 xs:p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-purple-400/40 transition-all flex flex-col items-center justify-between text-center gap-1.5 xs:gap-2 group cursor-pointer transform hover:-translate-y-1 shadow-lg"
        >
          <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center py-0.5 sm:py-1 w-full">
            <span className="text-[11px] xs:text-xs sm:text-sm md:text-base font-bold text-white block leading-snug">Block Social Apps</span>
          </div>
          <div className="pt-0.5 shrink-0">
            <span className="text-[9px] xs:text-[10px] sm:text-xs text-purple-300 font-semibold flex items-center justify-center gap-0.5 xs:gap-1 group-hover:translate-x-0.5 transition-transform text-center">
              Install to Block <ArrowRight className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            </span>
          </div>
        </button>

        {/* OPTION 3: Play Quick Games (Directs User to Focus Challenges) */}
        <button
          onClick={handleGoToChallenges}
          className="h-full min-h-[105px] xs:min-h-[120px] sm:min-h-[140px] md:min-h-[155px] p-2.5 xs:p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-purple-400/40 transition-all flex flex-col items-center justify-between text-center gap-1.5 xs:gap-2 group cursor-pointer transform hover:-translate-y-1 shadow-lg"
        >
          <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center py-0.5 sm:py-1 w-full">
            <span className="text-[11px] xs:text-xs sm:text-sm md:text-base font-bold text-white block leading-snug">Play Quick Games</span>
          </div>
          <div className="pt-0.5 shrink-0">
            <span className="text-[9px] xs:text-[10px] sm:text-xs text-purple-300 font-semibold flex items-center justify-center gap-0.5 xs:gap-1 group-hover:translate-x-0.5 transition-transform text-center">
              Go to Hurdles <ArrowRight className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            </span>
          </div>
        </button>

        {/* OPTION 4: Free From Scrolling (Motivational Quote & Focus Impact) */}
        <button
          onClick={handleToggleQuote}
          className={`h-full min-h-[105px] xs:min-h-[120px] sm:min-h-[140px] md:min-h-[155px] p-2.5 xs:p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl border transition-all flex flex-col items-center justify-between text-center gap-1.5 xs:gap-2 group cursor-pointer transform hover:-translate-y-1 shadow-lg ${
            showMotivationalQuote
              ? 'bg-purple-950/40 border-purple-400/50 shadow-purple-950/40'
              : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 hover:border-purple-400/40'
          }`}
        >
          <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <Flame className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center py-0.5 sm:py-1 w-full">
            <span className="text-[11px] xs:text-xs sm:text-sm md:text-base font-bold text-white block leading-snug">Free From Scrolling</span>
          </div>
          <div className="pt-0.5 shrink-0">
            <span className="text-[9px] xs:text-[10px] sm:text-xs text-purple-300 font-semibold flex items-center justify-center gap-0.5 xs:gap-1 group-hover:translate-x-0.5 transition-transform text-center">
              {showMotivationalQuote ? 'Hide Impact' : 'Focus Impact'} <ArrowRight className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            </span>
          </div>
        </button>
      </div>

      {/* MOTIVATIONAL QUOTE & FOCUS IMPACT CARD */}
      {showMotivationalQuote && (
        <div className="p-4 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0e122b] border-2 border-purple-500/30 shadow-2xl flex flex-col items-center text-center gap-4 sm:gap-6 animate-fade-in relative">
          <div className="max-w-2xl flex flex-col items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30 shadow-md">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <blockquote className="text-sm xs:text-base sm:text-xl font-medium text-white italic leading-relaxed px-2 sm:px-4">
              &ldquo;Your attention is the most sacred currency of your life. What you pay attention to becomes your existence. You don&rsquo;t lack willpower: you simply need a gentle pause between impulse and action.&rdquo;
            </blockquote>

            <span className="text-[10px] sm:text-xs text-purple-300 font-mono uppercase tracking-wider font-bold">
              The Breaksy Behavioral Philosophy
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1 sm:pt-2 w-full sm:w-auto justify-center">
            <button
              onClick={triggerDownloadAction}
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-400 hover:via-purple-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 cursor-pointer transition-all hover:scale-[1.02]"
            >
              Start Your Free Focus Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
