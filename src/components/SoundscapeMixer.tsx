import React, { useState, useEffect, useRef } from 'react';
import { Moon, CloudRain, Flame, Radio, Wind, Waves, Trees, Square } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface SoundscapeMixerProps {
  onTimerComplete?: () => void;
  isSleeping?: boolean;
}

interface TrackState {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  active: boolean;
  volume: number;
}

export const SoundscapeMixer: React.FC<SoundscapeMixerProps> = ({ onTimerComplete }) => {
  const [tracks, setTracks] = useState<TrackState[]>([
    {
      id: 'rain',
      name: 'Midnight Forest Rain',
      subtitle: 'Filtered pink noise & gentle raindrops',
      icon: <CloudRain className="w-5 h-5 text-indigo-300" />,
      active: false,
      volume: 0.65,
    },
    {
      id: 'hearth',
      name: 'Cozy Hearth Ember',
      subtitle: 'Warm thermal crackle & glowing wood snaps',
      icon: <Flame className="w-5 h-5 text-amber-300" />,
      active: false,
      volume: 0.6,
    },
    {
      id: 'delta',
      name: 'Deep Lunar Delta (1.5Hz)',
      subtitle: '1.5Hz isochronic pulse for restorative slow-wave sleep',
      icon: <Radio className="w-5 h-5 text-purple-300" />,
      active: false,
      volume: 0.55,
    },
    {
      id: 'chimes',
      name: 'Starlight Wind Chimes',
      subtitle: 'Pentatonic crystal chimes on the night breeze',
      icon: <Wind className="w-5 h-5 text-emerald-300" />,
      active: false,
      volume: 0.5,
    },
    {
      id: 'ocean',
      name: 'Serene Ocean Swell',
      subtitle: 'Rhythmic deep tidal swells washing ashore',
      icon: <Waves className="w-5 h-5 text-cyan-300" />,
      active: false,
      volume: 0.6,
    },
    {
      id: 'forest',
      name: 'Alpine Night Forest',
      subtitle: 'Whispering pines & distant nocturnal tones',
      icon: <Trees className="w-5 h-5 text-teal-300" />,
      active: false,
      volume: 0.55,
    },
  ]);

  const [masterEnabled, setMasterEnabled] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);

  const onTimerCompleteRef = useRef(onTimerComplete);
  useEffect(() => {
    onTimerCompleteRef.current = onTimerComplete;
  }, [onTimerComplete]);

  // Clean up soundscapes when component unmounts and sync with global mute
  useEffect(() => {
    const unsub = soundEngine.onMuteChange((muted) => {
      if (muted) {
        setMasterEnabled(false);
        setTracks((prev) => prev.map((t) => ({ ...t, active: false })));
      }
    });
    return () => {
      unsub();
      soundEngine.stopAllSoundscapes();
    };
  }, []);

  // Sync state with audio engine
  const handleToggleTrack = (id: string) => {
    soundEngine.setSoundEnabled(true);
    setMasterEnabled(true);

    setTracks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextActive = !t.active;
          soundEngine.setSoundscape(t.id, nextActive, t.volume);
          return { ...t, active: nextActive };
        }
        return t;
      })
    );
  };

  const handleVolumeChange = (id: string, val: number) => {
    setTracks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (t.active) {
            soundEngine.setSoundscape(t.id, true, val);
          }
          return { ...t, volume: val };
        }
        return t;
      })
    );
  };

  const handleToggleMaster = () => {
    const nextState = !masterEnabled;
    setMasterEnabled(nextState);
    soundEngine.setSoundEnabled(nextState);
    if (!nextState) {
      tracks.forEach((t) => soundEngine.setSoundscape(t.id, false));
      setTracks((prev) => prev.map((t) => ({ ...t, active: false })));
      setTimerMinutes(null);
      setSecondsRemaining(null);
    }
  };

  // Quick Presets
  const applyPreset = (presetTracks: { id: string; volume?: number }[]) => {
    soundEngine.setSoundEnabled(true);
    setMasterEnabled(true);
    const activeIds = new Set(presetTracks.map((p) => p.id));
    setTracks((prev) =>
      prev.map((t) => {
        const shouldBeActive = activeIds.has(t.id);
        const preset = presetTracks.find((p) => p.id === t.id);
        const vol = preset?.volume ?? t.volume;
        soundEngine.setSoundscape(t.id, shouldBeActive, vol);
        return { ...t, active: shouldBeActive, volume: vol };
      })
    );
  };

  const handleStopAll = () => {
    soundEngine.stopAllSoundscapes();
    setTracks((prev) => prev.map((t) => ({ ...t, active: false })));
    setTimerMinutes(null);
    setSecondsRemaining(null);
  };

  const startSleepTimer = (mins: number) => {
    setTimerMinutes(mins);
    setSecondsRemaining(mins * 60);

    const anyActive = tracks.some((t) => t.active);
    if (!anyActive) {
      applyPreset([
        { id: 'rain', volume: 0.65 },
        { id: 'delta', volume: 0.55 },
      ]);
    }
  };

  // Timer countdown hook running safely without recreation every second
  const hasTimer = secondsRemaining !== null && secondsRemaining > 0;
  useEffect(() => {
    if (!hasTimer) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            soundEngine.stopAllSoundscapes();
            setTracks((ts) => ts.map((t) => ({ ...t, active: false })));
            setTimerMinutes(null);
            if (onTimerCompleteRef.current) {
              onTimerCompleteRef.current();
            }
          }, 0);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasTimer]);

  // Format seconds mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const anyActive = tracks.some((t) => t.active);

  return (
    <div id="soundscapes" className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col gap-6 shadow-2xl shadow-indigo-950/40">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-2xl font-bold text-white heading-font">Curated Dream Soundscapes</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Procedurally synthesized ambient soundscapes tuned to psychoacoustic sleep frequencies. Play individually or blend together in harmony.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {anyActive && (
            <button
              onClick={handleStopAll}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:bg-rose-500/30 transition-all cursor-pointer"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Stop All</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Mix Presets Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap">
        <button
          onClick={() =>
            applyPreset([
              { id: 'rain', volume: 0.65 },
              { id: 'delta', volume: 0.55 },
            ])
          }
          className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 hover:bg-indigo-500/25 transition-all cursor-pointer"
        >
          Deep REM
        </button>
        <button
          onClick={() =>
            applyPreset([
              { id: 'hearth', volume: 0.6 },
              { id: 'chimes', volume: 0.45 },
              { id: 'forest', volume: 0.5 },
            ])
          }
          className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-amber-500/15 border border-amber-500/30 text-amber-200 hover:bg-amber-500/25 transition-all cursor-pointer"
        >
          Cozy Cabin
        </button>
        <button
          onClick={() =>
            applyPreset([
              { id: 'ocean', volume: 0.65 },
              { id: 'chimes', volume: 0.4 },
            ])
          }
          className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 hover:bg-cyan-500/25 transition-all cursor-pointer"
        >
          Ocean Breeze
        </button>
      </div>

      {/* Track Grid: 6 Real Working Dream Soundscapes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
              track.active
                ? 'bg-purple-950/40 border-purple-500/50 shadow-lg shadow-purple-950/50'
                : 'bg-white/[0.03] border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  track.active ? 'bg-purple-500/25 shadow-inner' : 'bg-white/5'
                }`}>
                  {track.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">{track.name}</h4>
                    {track.active && (
                      <span className="flex items-end gap-0.5 h-3" title="Playing">
                        <span className="w-0.5 h-full bg-emerald-400 rounded-full animate-pulse" />
                        <span className="w-0.5 h-2/3 bg-emerald-400 rounded-full animate-pulse [animation-delay:150ms]" />
                        <span className="w-0.5 h-4/5 bg-emerald-400 rounded-full animate-pulse [animation-delay:300ms]" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleToggleTrack(track.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  track.active
                    ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30 hover:bg-purple-400'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {track.active ? 'Playing' : 'Play'}
              </button>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-3 pt-2 mt-auto border-t border-white/5">
              <span className="text-[11px] text-slate-400 font-mono w-8">
                {Math.round(track.volume * 100)}%
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={track.volume}
                onChange={(e) => handleVolumeChange(track.id, parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Sleep Timer: Time buttons placed directly beside label as requested */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-300">Sleep Timer:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {[5, 15, 30, 45, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => startSleepTimer(mins)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                timerMinutes === mins
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {mins}m
            </button>
          ))}
          {timerMinutes !== null && (
            <button
              onClick={() => {
                setTimerMinutes(null);
                setSecondsRemaining(null);
              }}
              className="text-xs text-rose-300 hover:underline px-1 cursor-pointer"
            >
              Cancel
            </button>
          )}
          {secondsRemaining !== null && (
            <span className="text-xs font-mono font-bold text-amber-300 tabular-nums ml-1">
              ({formatTime(secondsRemaining)} remaining)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
