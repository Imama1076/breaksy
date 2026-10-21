import React, { useState } from 'react';
import { Lock, CheckCircle2, Sparkles, Flower2 } from 'lucide-react';

interface FlowerTier {
  id: string;
  name: string;
  streakReq: number;
  desc: string;
  glowColor: string;
}

const FLOWERS: FlowerTier[] = [
  {
    id: 'lotus',
    name: 'Midnight Lotus',
    streakReq: 0,
    desc: 'Default celestial flower',
    glowColor: '#818CF8',
  },
  {
    id: 'dahlia',
    name: 'Crystal Dahlia',
    streakReq: 10,
    desc: 'Unlocks at a 10-day streak',
    glowColor: '#2DD4BF',
  },
  {
    id: 'golden',
    name: 'Golden Lotus',
    streakReq: 30,
    desc: 'Unlocks at a 30-day streak',
    glowColor: '#FBBF24',
  },
  {
    id: 'plasma',
    name: 'Plasma Sprout',
    streakReq: 60,
    desc: 'Unlocks at a 60-day streak',
    glowColor: '#EC4899',
  },
  {
    id: 'aurora',
    name: 'Aurora Lily',
    streakReq: 100,
    desc: 'Unlocks at a 100-day streak',
    glowColor: '#A855F7',
  },
  {
    id: 'orchid',
    name: 'Moonlit Orchid',
    streakReq: 150,
    desc: 'Unlocks at a 150-day streak',
    glowColor: '#6366F1',
  },
  {
    id: 'tulip',
    name: 'Aether glass Tulip',
    streakReq: 364,
    desc: 'Unlocks at a 364-day streak',
    glowColor: '#38BDF8',
  },
];

export const CrystalGardenShowcase: React.FC = () => {
  const [currentStreak, setCurrentStreak] = useState(12);
  const [selectedFlowerId, setSelectedFlowerId] = useState<string | null>(null);

  // Automatically find highest unlocked tier or user selected tier
  const highestUnlocked = [...FLOWERS].reverse().find((f) => currentStreak >= f.streakReq) || FLOWERS[0];
  const activeFlower = selectedFlowerId
    ? FLOWERS.find((f) => f.id === selectedFlowerId) || highestUnlocked
    : highestUnlocked;

  const isCurrentActiveUnlocked = currentStreak >= activeFlower.streakReq;

  return (
    <div id="garden" className="glass-panel p-5 sm:p-8 rounded-[32px] border border-white/10 flex flex-col gap-6">
      {/* Header */}
      <div className="pb-3 border-b border-white/10">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white heading-font">
          Flower Garden: Grow Your Streak, Grow Your Garden
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-light">
          Instead of punitive blockers, Breaksy rewards your attention discipline with evolving crystal flowers that bloom as your focus streak compounds.
        </p>
      </div>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Authentic Crystal Flower Artwork matching Image 5 */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-purple-950/20 to-black/50 border border-white/10 text-center relative overflow-hidden">
          {/* Ambient Bloom Aura */}
          <div
            className="absolute w-60 h-60 rounded-full opacity-45 transition-all duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${activeFlower.glowColor} 0%, transparent 70%)`,
            }}
          />

          {/* Genuine Crystal Lotus Flower Art from Image 5 */}
          <div className="relative w-56 h-56 flex items-center justify-center">
            <img
              src="/crystal-flower-bloom.webp"
              alt={activeFlower.name}
              className="w-full h-full object-contain filter drop-shadow-[0_0_28px_rgba(147,51,234,0.5)] hover:scale-105 transition-transform duration-300 select-none"
              onError={(e) => {
                if (e.currentTarget.src.endsWith('.webp')) {
                  e.currentTarget.src = '/crystal-flower-bloom.png';
                }
              }}
            />
          </div>

          <div className="mt-3">
            <span className="text-xl font-bold text-white heading-font block">
              {activeFlower.name}
            </span>
            <span className="text-xs font-semibold flex items-center justify-center gap-1.5 mt-0.5">
              {isCurrentActiveUnlocked ? (
                <span className="text-emerald-300">
                  Unlocked & Blooming
                </span>
              ) : (
                <span className="text-slate-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{activeFlower.desc}</span>
                </span>
              )}
            </span>
          </div>

          {/* Interactive Streak Simulator Slider */}
          <div className="w-full pt-4 mt-3 border-t border-white/10 flex flex-col gap-1.5">
            <div className="flex justify-end text-[11px] text-slate-400 font-mono">
              <span className="text-amber-300 font-bold">{currentStreak} Days</span>
            </div>
            <input
              type="range"
              min="0"
              max="365"
              value={currentStreak}
              onChange={(e) => {
                setCurrentStreak(parseInt(e.target.value, 10));
                setSelectedFlowerId(null);
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
          </div>
        </div>

        {/* Right: Garden Evolution Catalog matching Image 5 */}
        <div className="lg:col-span-7 flex flex-col gap-2.5 max-h-[460px] overflow-y-auto pr-1 breaksy-scrollbar-x">
          {FLOWERS.map((flower) => {
            const isUnlocked = currentStreak >= flower.streakReq;
            const isSelected = activeFlower.id === flower.id;
            const progressRatio = flower.streakReq === 0 ? 1 : Math.min(1, currentStreak / flower.streakReq);

            return (
              <button
                key={flower.id}
                onClick={() => setSelectedFlowerId(flower.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-400/60 shadow-lg shadow-purple-950/50'
                    : isUnlocked
                    ? 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10'
                    : 'bg-black/30 hover:bg-black/40 border-white/5 opacity-75'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Thumbnail matching Image 5: Dark rounded box with lock/silhouette and progress line */}
                  <div className="w-12 h-12 rounded-2xl bg-black/60 border border-white/10 flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-inner">
                    <div className="relative z-10 flex items-center justify-center">
                      {isUnlocked ? (
                        <CheckCircle2 className="w-5 h-5 text-purple-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                    {/* Mini progress line indicator from Image 5 */}
                    <div className="w-7 h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${progressRatio * 100}%`,
                          backgroundColor: isUnlocked ? '#A855F7' : '#F59E0B',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white block">
                        {flower.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-snug mt-0.5">
                      {flower.desc}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-lg ${
                      isUnlocked
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-white/5 text-slate-400 border border-white/5'
                    }`}
                  >
                    {isUnlocked ? 'Unlocked' : `${flower.streakReq}d Streak`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
