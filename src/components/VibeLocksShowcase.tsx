import React, { useState, useEffect } from 'react';
import { Flame, Trees, Waves, Moon, CloudRain, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface VibeTheme {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  bgGradient: string;
  largeIcon: React.ReactNode;
  audioKey: string;
}

const THEMES: VibeTheme[] = [
  {
    id: 'fire',
    name: 'Cozy Fire',
    description: 'Warm crackling fire by an alpine lake to help you relax and unwind.',
    icon: <Flame className="w-4 h-4 text-amber-400" />,
    bgGradient: 'from-amber-950/40 via-slate-900 to-indigo-950/50',
    largeIcon: <Flame className="w-8 h-8 text-amber-400" />,
    audioKey: 'hearth',
  },
  {
    id: 'forest',
    name: 'Alpine Forest',
    description: 'Crisp evergreen pines, gentle wind murmurs, and mountain serenity.',
    icon: <Trees className="w-4 h-4 text-emerald-400" />,
    bgGradient: 'from-emerald-950/40 via-slate-900 to-teal-950/50',
    largeIcon: <Trees className="w-8 h-8 text-emerald-400" />,
    audioKey: 'forest',
  },
  {
    id: 'ocean',
    name: 'Serene Ocean',
    description: 'Rhythmic deep tidal swells washing away restless impulse checking.',
    icon: <Waves className="w-4 h-4 text-cyan-400" />,
    bgGradient: 'from-cyan-950/40 via-slate-900 to-blue-950/50',
    largeIcon: <Waves className="w-8 h-8 text-cyan-400" />,
    audioKey: 'ocean',
  },
  {
    id: 'space',
    name: 'Cosmic Orbit',
    description: 'Zero-gravity binaural drones tuned to 1.5Hz delta brainwave flow.',
    icon: <Moon className="w-4 h-4 text-purple-400" />,
    bgGradient: 'from-purple-950/40 via-slate-900 to-indigo-950/50',
    largeIcon: <Moon className="w-8 h-8 text-purple-400" />,
    audioKey: 'space',
  },
  {
    id: 'rain',
    name: 'Midnight Rain',
    description: 'Soft patter on tent canvas masking background distractions.',
    icon: <CloudRain className="w-4 h-4 text-indigo-400" />,
    bgGradient: 'from-indigo-950/40 via-slate-900 to-blue-950/50',
    largeIcon: <CloudRain className="w-8 h-8 text-indigo-400" />,
    audioKey: 'rain',
  },
];

export const VibeLocksShowcase: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<VibeTheme>(THEMES[0]);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Clean up soundscapes when unmounting / switching tabs & sync with global mute
  useEffect(() => {
    const unsub = soundEngine.onMuteChange((muted) => {
      if (muted) {
        setIsPlaying(false);
      }
    });
    return () => {
      unsub();
      soundEngine.stopAllSoundscapes();
    };
  }, []);

  const handleSelectTheme = (t: VibeTheme) => {
    setSelectedTheme(t);
    if (isPlaying) {
      soundEngine.stopAllSoundscapes();
      soundEngine.setSoundscape(t.audioKey, true, 0.5);
    }
  };

  const handleTogglePlay = () => {
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);
    if (nextPlay) {
      soundEngine.setSoundEnabled(true);
      soundEngine.setSoundscape(selectedTheme.audioKey, true, 0.5);
      soundEngine.playChime(true);
    } else {
      soundEngine.stopAllSoundscapes();
    }
  };

  const handlePrevTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === selectedTheme.id);
    const prevIndex = (currentIndex - 1 + THEMES.length) % THEMES.length;
    handleSelectTheme(THEMES[prevIndex]);
  };

  const handleNextTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === selectedTheme.id);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    handleSelectTheme(THEMES[nextIndex]);
  };

  const handleToggleMute = () => {
    const nextMute = !isAudioMuted;
    setIsAudioMuted(nextMute);
    if (nextMute) {
      soundEngine.stopAllSoundscapes();
    } else if (isPlaying) {
      soundEngine.setSoundscape(selectedTheme.audioKey, true, 0.5);
    }
  };

  return (
    <div id="vibe-locks" className="glass-panel p-6 sm:p-10 rounded-[32px] border border-white/10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white heading-font">
            Lock Into Intentional Deep-Work Sessions
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Combine intentional app shielding with immersive ambient atmospheres designed to protect your attention span.
          </p>
        </div>

        {/* Audio Mute & Duration Quick Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleMute}
            className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
              isAudioMuted ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-amber-400/20 border-amber-400/40 text-amber-200'
            }`}
            title="Toggle Ambient Audio"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Theme Selector Strip */}
      <div className="flex flex-wrap items-center gap-3">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelectTheme(t)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
              selectedTheme.id === t.id
                ? 'bg-amber-500/20 border-amber-400/60 text-amber-200 shadow-md shadow-amber-500/10'
                : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/5 text-slate-400'
            }`}
          >
            {t.icon}
            <span>{t.name}</span>
          </button>
        ))}
      </div>

      {/* Hero Showcase Card for Selected Theme */}
      <div
        className={`relative w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-b ${selectedTheme.bgGradient} border border-white/10 shadow-2xl flex flex-col items-center text-center gap-6 overflow-hidden`}
      >
        {/* Previous & Next Theme Navigation Chevrons */}
        <button
          onClick={handlePrevTheme}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center border border-white/15 transition-all cursor-pointer backdrop-blur-md shadow-lg z-10 active:scale-95"
          aria-label="Previous Theme"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNextTheme}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center border border-white/15 transition-all cursor-pointer backdrop-blur-md shadow-lg z-10 active:scale-95"
          aria-label="Next Theme"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-3 shadow-lg">
            {selectedTheme.largeIcon}
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold text-white heading-font">
            {selectedTheme.name}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            {selectedTheme.description}
          </p>
        </div>

        {/* Focus Duration & Action CTA Setting */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setFocusMinutes((m) => Math.max(5, m - 5))}
              className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-2xl flex items-center justify-center transition-all cursor-pointer border border-white/15 active:scale-95 shadow-md"
              aria-label="Decrease focus duration"
            >
              −
            </button>

            <button
              onClick={handleTogglePlay}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-xl cursor-pointer active:scale-95 border ${
                isPlaying
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 border-amber-300 shadow-amber-400/30'
                  : 'bg-white text-slate-950 hover:bg-slate-100 border-white/20 shadow-white/20'
              }`}
              aria-label={isPlaying ? 'Pause Focus Session' : 'Start Focus Session'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 ml-0.5 fill-current" />
              )}
            </button>

            <button
              onClick={() => setFocusMinutes((m) => Math.min(120, m + 5))}
              className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-2xl flex items-center justify-center transition-all cursor-pointer border border-white/15 active:scale-95 shadow-md"
              aria-label="Increase focus duration"
            >
              +
            </button>
          </div>

          <span className="text-xs text-slate-300 font-mono">
            Focus Duration: <strong className="text-white">{focusMinutes} minutes</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
