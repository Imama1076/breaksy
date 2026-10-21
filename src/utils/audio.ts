/**
 * Web Audio API synthesizer for NoxBunny.
 * Provides wake/sleep chimes and procedural relaxing dream soundscapes
 * with zero external audio assets required.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private muteListeners: Set<(muted: boolean) => void> = new Set();

  // Ambient Cosmic Background Music Generator
  private bgGain: GainNode | null = null;
  private bgLfo: OscillatorNode | null = null;
  private bgLfoGain: GainNode | null = null;
  private bgFilter: BiquadFilterNode | null = null;
  private bgPadNodes: Array<{ osc: OscillatorNode; gain: GainNode }> = [];
  private bgNoiseSource: AudioBufferSourceNode | null = null;
  private bgChimeTimer: number | null = null;
  private isBgPlaying: boolean = false;
  private bgChimeIndex: number = 0;
  private wasBgPausedBySoundscape: boolean = false;

  // Gentle celestial pentatonic scale (Dmaj9 starlight chime tones: D5, F#5, A5, C#6, E5)
  private readonly cosmicChimes = [
    587.33, // D5 (Warm crystal)
    739.99, // F#5 (Celestial third)
    880.00, // A5 (Serene fifth)
    1108.73, // C#6 (Starlight sparkle)
    659.25, // E5 (Soft dusk)
    739.99, // F#5
    880.00, // A5
    587.33, // D5
  ];

  // Soundscape active generators
  private soundscapeNodes: Map<string, { gain: GainNode; stop: () => void }> = new Map();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public onMuteChange(listener: (muted: boolean) => void) {
    this.muteListeners.add(listener);
    return () => this.muteListeners.delete(listener);
  }

  public toggleMute(): boolean {
    return this.setMuted(!this.isMuted);
  }

  public setMuted(muted: boolean): boolean {
    this.isMuted = muted;
    if (muted) {
      if (this.masterGain && this.ctx) {
        try {
          this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
          this.masterGain.gain.value = 0;
        } catch {}
      }
      this.wasBgPausedBySoundscape = false;
      this.pauseBackgroundMusic();
      this.stopAllSoundscapes();
      try {
        if (this.ctx && this.ctx.state === 'running') {
          this.ctx.suspend();
        }
      } catch {}
    } else {
      this.soundEnabled = true;
      try {
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      } catch {}
      this.initContext();
      if (this.masterGain && this.ctx) {
        try {
          this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
          this.masterGain.gain.value = 0.8;
        } catch {}
      }
      this.startBackgroundMusic();
    }
    this.muteListeners.forEach((fn) => {
      try {
        fn(this.isMuted);
      } catch {}
    });
    return this.isMuted;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (enabled && !this.isMuted) {
      this.initContext();
    } else if (!enabled) {
      this.stopAllSoundscapes();
      this.pauseBackgroundMusic();
    }
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled && !this.isMuted;
  }

  /**
   * Serene Cosmic Bedtime Ambient Soundscape
   * Pure procedural synthesis: warm breathing celestial pad + soft stardust air + sparse crystal chimes
   */
  public startBackgroundMusic() {
    if (this.isMuted || this.isBgPlaying) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      this.isBgPlaying = true;
      const now = this.ctx.currentTime;

      // Master background volume (extremely light, soft, and soothing: ~0.085)
      if (!this.bgGain) {
        this.bgGain = this.ctx.createGain();
        this.bgGain.gain.setValueAtTime(0.085, now);
        this.bgGain.connect(this.masterGain);
      } else {
        this.bgGain.gain.setTargetAtTime(0.085, now, 0.5);
      }

      // 1. Warm Resonant Cosmic Filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(360, now);
      filter.Q.setValueAtTime(1.6, now);
      filter.connect(this.bgGain);
      this.bgFilter = filter;

      // 2. Slow Breathing LFO (0.07Hz = ~14 second gentle breath cycle)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.07, now);
      lfoGain.gain.setValueAtTime(110, now); // Sweeps cutoff between 250Hz and 470Hz
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);
      this.bgLfo = lfo;
      this.bgLfoGain = lfoGain;

      // 3. Lush Detuned Celestial Chord (D3, A3, F#4 warm harmonic bed)
      const chordTones = [
        { freq: 146.83, detune: 0, vol: 0.035 },     // D3 (Grounding root)
        { freq: 146.83, detune: 2.4, vol: 0.024 },   // D3 chorus
        { freq: 220.00, detune: -1.6, vol: 0.028 },  // A3 (Fifth)
        { freq: 220.00, detune: 1.8, vol: 0.022 },   // A3 chorus
        { freq: 369.99, detune: 0, vol: 0.015 },     // F#4 (Major 3rd)
      ];

      this.bgPadNodes = [];
      chordTones.forEach(({ freq, detune, vol }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const toneGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(detune, now);

        toneGain.gain.setValueAtTime(0.0001, now);
        toneGain.gain.linearRampToValueAtTime(vol, now + 2.0); // Gentle 2s fade-in

        osc.connect(toneGain);
        toneGain.connect(filter);

        osc.start(now);
        this.bgPadNodes.push({ osc, gain: toneGain });
      });

      // 4. Subtle Cosmic Stardust Air (Silky faint pink breath)
      this.startCosmicStardust(now);

      // 5. Sparse, soothing crystal starlight chimes (spaced 4.5s to 7.5s)
      this.scheduleNextCosmicChime(2500);
    } catch {}
  }

  private startCosmicStardust(startTime: number) {
    if (!this.ctx || !this.bgGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.015;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(2200, startTime);
      bandpass.Q.setValueAtTime(2.2, startTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0001, startTime);
      noiseGain.gain.linearRampToValueAtTime(0.009, startTime + 2.5);

      noise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(this.bgGain);

      noise.start(startTime);
      this.bgNoiseSource = noise;
    } catch {}
  }

  private scheduleNextCosmicChime(delayMs: number) {
    if (this.bgChimeTimer) clearTimeout(this.bgChimeTimer);
    this.bgChimeTimer = window.setTimeout(() => {
      if (!this.isBgPlaying || this.isMuted) return;
      this.playCosmicChime();
      // Next chime with randomized tranquil spacing between 4.5s and 7.5s
      const nextDelay = 4500 + Math.random() * 3000;
      this.scheduleNextCosmicChime(nextDelay);
    }, delayMs);
  }

  private playCosmicChime() {
    if (!this.isBgPlaying || this.isMuted || !this.ctx || !this.bgGain) return;
    try {
      const now = this.ctx.currentTime;
      const freq = this.cosmicChimes[this.bgChimeIndex % this.cosmicChimes.length];
      this.bgChimeIndex++;

      // Primary warm crystal bell tone
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft overtone sparkle (2.76x glass resonance ratio)
      const overtone = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2.76, now);

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.032, now + 0.08); // Silky gentle attack
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4); // Long calming decay

      overtoneGain.gain.setValueAtTime(0.0001, now);
      overtoneGain.gain.linearRampToValueAtTime(0.008, now + 0.04);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(noteGain);
      overtone.connect(overtoneGain);

      noteGain.connect(this.bgGain);
      overtoneGain.connect(this.bgGain);

      const cleanup = () => {
        try {
          osc.disconnect();
          noteGain.disconnect();
          overtone.disconnect();
          overtoneGain.disconnect();
        } catch {}
      };

      osc.onended = cleanup;
      osc.start(now);
      overtone.start(now);
      osc.stop(now + 3.5);
      overtone.stop(now + 1.4);
    } catch {}
  }

  public pauseBackgroundMusic() {
    if (this.bgGain && this.ctx) {
      this.bgGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    }
    if (this.bgChimeTimer) {
      clearTimeout(this.bgChimeTimer);
      this.bgChimeTimer = null;
    }
    try {
      this.bgLfo?.stop();
      this.bgLfo?.disconnect();
      this.bgLfoGain?.disconnect();
      this.bgPadNodes.forEach((node) => {
        try {
          node.osc.stop();
          node.osc.disconnect();
          node.gain.disconnect();
        } catch {}
      });
      this.bgNoiseSource?.stop();
      this.bgNoiseSource?.disconnect();
      this.bgFilter?.disconnect();
    } catch {}
    this.bgLfo = null;
    this.bgLfoGain = null;
    this.bgPadNodes = [];
    this.bgNoiseSource = null;
    this.bgFilter = null;
    this.isBgPlaying = false;
  }

  /**
   * Short wake-up or falling-asleep melodic chime
   */
  public playChime(isWaking: boolean = true) {
    if (this.isMuted) return;
    if (!this.soundEnabled) this.setSoundEnabled(true);
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      if (isWaking) {
        // Bright cheerful upward chime (Wake up)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(340, now);
        osc.frequency.exponentialRampToValueAtTime(560, now + 0.16);
        osc.frequency.exponentialRampToValueAtTime(720, now + 0.32);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc.start(now);
        osc.stop(now + 0.48);
      } else {
        // Calming descending soft lullaby tone (Sleep)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.22);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.48);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

        osc.start(now);
        osc.stop(now + 0.58);
      }
    } catch {
      // Audio error suppressed gracefully
    }
  }

  /**
   * Gentle bunny purr / pet interaction chime
   */
  public playPetChime() {
    if (this.isMuted || !this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.001, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.07, now + i * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.35);
      });
    } catch {
      // Audio error suppressed gracefully
    }
  }

  /**
   * Procedural Soundscapes:
   * 1. rain: Filtered pink noise + raindrop spikes
   * 2. hearth: Cozy crackle + warm hum
   * 3. delta: 1.5Hz binaural beat for deep restorative sleep
   * 4. chimes: Pentatonic ambient resonance
   */
  public setSoundscape(id: string, active: boolean, volume: number = 0.5) {
    if (this.isMuted) return;
    if (!this.soundEnabled && active) {
      this.setSoundEnabled(true);
    }
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // If currently running, update or stop
    if (this.soundscapeNodes.has(id)) {
      const current = this.soundscapeNodes.get(id)!;
      if (!active) {
        current.stop();
        this.soundscapeNodes.delete(id);
        this.checkResumeBackgroundMusic();
        return;
      } else {
        current.gain.gain.setTargetAtTime(Math.max(0.001, volume * 0.45), this.ctx.currentTime, 0.15);
        return;
      }
    }

    if (!active) return;

    // Automatically pause ambient background music when user activates a soundscape / vibe lock
    if (this.isBgPlaying) {
      this.wasBgPausedBySoundscape = true;
      this.pauseBackgroundMusic();
    }

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gainNode.gain.setTargetAtTime(Math.max(0.001, volume * 0.45), this.ctx.currentTime, 0.2);
    gainNode.connect(this.masterGain);

    let stopFn = () => {};

    if (id === 'rain') {
      // Midnight Forest Rain: Soothing pink noise + randomized gentle water drop patter
      const bufferSize = this.ctx.sampleRate * 3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.16;
        b6 = white * 0.115926;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(1150, this.ctx.currentTime);

      noiseSource.connect(lowpass);
      lowpass.connect(gainNode);
      noiseSource.start();

      // Gentle organic raindrop patter layer
      let dropTimer: number | null = null;
      const triggerRaindrop = () => {
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime;
        const dropOsc = this.ctx.createOscillator();
        const dropGain = this.ctx.createGain();
        const dropFreq = 1200 + Math.random() * 1600;
        dropOsc.type = 'sine';
        dropOsc.frequency.setValueAtTime(dropFreq, now);
        dropOsc.frequency.exponentialRampToValueAtTime(dropFreq * 0.6, now + 0.04);

        dropGain.gain.setValueAtTime(0.001, now);
        dropGain.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.06, now + 0.005);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

        dropOsc.connect(dropGain);
        dropGain.connect(gainNode);

        dropOsc.onended = () => {
          try {
            dropOsc.disconnect();
            dropGain.disconnect();
          } catch {}
        };

        dropOsc.start(now);
        dropOsc.stop(now + 0.06);

        dropTimer = window.setTimeout(triggerRaindrop, 120 + Math.random() * 240);
      };
      triggerRaindrop();

      stopFn = () => {
        if (dropTimer) clearTimeout(dropTimer);
        try {
          noiseSource.stop();
          noiseSource.disconnect();
          lowpass.disconnect();
          gainNode.disconnect();
        } catch {}
      };
    } else if (id === 'hearth' || id === 'fire') {
      // Natural Organic Fireplace: Warm thermal rumble + cozy sizzle + authentic wood snaps & crackles
      const bufferSize = this.ctx.sampleRate * 3;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      let lastVal = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastVal = (lastVal + 0.06 * white) / 1.06;
        data[i] = lastVal * 2.8;
      }
      const flameNoiseSrc = this.ctx.createBufferSource();
      flameNoiseSrc.buffer = noiseBuffer;
      flameNoiseSrc.loop = true;

      // Low combustion filter (580Hz cutoff ensures warmth is audible on all laptop/phone speakers)
      const lowFilter = this.ctx.createBiquadFilter();
      lowFilter.type = 'lowpass';
      lowFilter.frequency.setValueAtTime(580, this.ctx.currentTime);
      lowFilter.Q.setValueAtTime(1.1, this.ctx.currentTime);
      const flameGain = this.ctx.createGain();
      flameGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      flameNoiseSrc.connect(lowFilter);
      lowFilter.connect(flameGain);
      flameGain.connect(gainNode);
      flameNoiseSrc.start();

      // Soft ember air hiss / sizzle layer
      const sizzleBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const sizzleData = sizzleBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        sizzleData[i] = (Math.random() * 2 - 1) * 0.22;
      }
      const sizzleSrc = this.ctx.createBufferSource();
      sizzleSrc.buffer = sizzleBuffer;
      sizzleSrc.loop = true;

      const sizzleFilter = this.ctx.createBiquadFilter();
      sizzleFilter.type = 'bandpass';
      sizzleFilter.frequency.setValueAtTime(1600, this.ctx.currentTime);
      sizzleFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);
      const sizzleGain = this.ctx.createGain();
      sizzleGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

      sizzleSrc.connect(sizzleFilter);
      sizzleFilter.connect(sizzleGain);
      sizzleGain.connect(gainNode);
      sizzleSrc.start();

      // Warm wood crackle & snap bursts
      let crackleTimeout: number | null = null;
      const triggerWoodCrackle = () => {
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime;

        // Generate snappy burst (30ms - 55ms)
        const popDuration = 0.03 + Math.random() * 0.025;
        const popBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * popDuration), this.ctx.sampleRate);
        const pData = popBuffer.getChannelData(0);
        for (let i = 0; i < pData.length; i++) {
          pData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.012));
        }

        const popSrc = this.ctx.createBufferSource();
        popSrc.buffer = popBuffer;

        const popFilter = this.ctx.createBiquadFilter();
        popFilter.type = 'bandpass';
        popFilter.frequency.setValueAtTime(1500 + Math.random() * 1100, now);
        popFilter.Q.setValueAtTime(1.8, now);

        const popGain = this.ctx.createGain();
        const amp = 0.4 + Math.random() * 0.35;
        popGain.gain.setValueAtTime(amp, now);
        popGain.gain.exponentialRampToValueAtTime(0.0001, now + popDuration);

        popSrc.connect(popFilter);
        popFilter.connect(popGain);
        popGain.connect(gainNode);

        popSrc.onended = () => {
          try {
            popSrc.disconnect();
            popFilter.disconnect();
            popGain.disconnect();
          } catch {}
        };

        popSrc.start(now);

        // Schedule next crackle with lively campfire pacing
        const nextDelay = 180 + Math.random() * 380;
        crackleTimeout = window.setTimeout(triggerWoodCrackle, nextDelay);
      };

      triggerWoodCrackle();

      stopFn = () => {
        if (crackleTimeout) clearTimeout(crackleTimeout);
        try {
          flameNoiseSrc.stop();
          flameNoiseSrc.disconnect();
          lowFilter.disconnect();
          flameGain.disconnect();
          sizzleSrc.stop();
          sizzleSrc.disconnect();
          sizzleFilter.disconnect();
          sizzleGain.disconnect();
          gainNode.disconnect();
        } catch {}
      };
    } else if (id === 'delta') {
      // Deep Lunar Delta: 1.5Hz Isochronic Sleep Modulation + Rich Harmonic Chord (108Hz, 216Hz, 324Hz, 432Hz)
      // 100% audible on laptops/phones while delivering genuine 1.5Hz slow-wave delta pulse
      const oscL = this.ctx.createOscillator();
      const oscR = this.ctx.createOscillator();
      const oscWarmA = this.ctx.createOscillator();
      const oscWarmB = this.ctx.createOscillator();
      const oscShimmer = this.ctx.createOscillator();

      oscL.type = 'sine';
      oscR.type = 'sine';
      oscWarmA.type = 'triangle';
      oscWarmB.type = 'sine';
      oscShimmer.type = 'sine';

      // 108Hz Left, 109.5Hz Right = 1.5Hz binaural differential for headphones
      oscL.frequency.setValueAtTime(108, this.ctx.currentTime);
      oscR.frequency.setValueAtTime(109.5, this.ctx.currentTime);
      // Audible carrier harmonics: 216Hz (warmth), 324Hz (fifth), 432Hz (healing A-shimmer)
      oscWarmA.frequency.setValueAtTime(216, this.ctx.currentTime);
      oscWarmB.frequency.setValueAtTime(324, this.ctx.currentTime);
      oscShimmer.frequency.setValueAtTime(432, this.ctx.currentTime);

      const toneGain = this.ctx.createGain();
      toneGain.gain.setValueAtTime(0.55, this.ctx.currentTime);

      // 1.5Hz Isochronic LFO: gently pulses volume at exactly 1.5 cycles/sec (Delta rhythm)
      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(1.5, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(toneGain.gain);
      lfo.start();

      oscWarmA.connect(toneGain);
      oscWarmB.connect(toneGain);
      oscShimmer.connect(toneGain);
      toneGain.connect(gainNode);

      if (this.ctx.createStereoPanner) {
        const panL = this.ctx.createStereoPanner();
        const panR = this.ctx.createStereoPanner();
        panL.pan.setValueAtTime(-0.8, this.ctx.currentTime);
        panR.pan.setValueAtTime(0.8, this.ctx.currentTime);

        oscL.connect(panL);
        panL.connect(gainNode);
        oscR.connect(panR);
        panR.connect(gainNode);
      } else {
        oscL.connect(gainNode);
        oscR.connect(gainNode);
      }

      oscL.start();
      oscR.start();
      oscWarmA.start();
      oscWarmB.start();
      oscShimmer.start();

      stopFn = () => {
        try {
          lfo.stop();
          oscL.stop();
          oscR.stop();
          oscWarmA.stop();
          oscWarmB.stop();
          oscShimmer.stop();
          lfo.disconnect();
          lfoGain.disconnect();
          oscL.disconnect();
          oscR.disconnect();
          oscWarmA.disconnect();
          oscWarmB.disconnect();
          oscShimmer.disconnect();
          toneGain.disconnect();
          gainNode.disconnect();
        } catch {}
      };
    } else if (id === 'chimes') {
      // Starlight Wind Chimes: Ethereal continuous resonance pad + instant and recurring pentatonic bells
      const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]; // C pentatonic
      let timer: number | null = null;

      // Soft ambient crystal resonance drone underneath (never dead silent)
      const padOsc = this.ctx.createOscillator();
      const padGain = this.ctx.createGain();
      padOsc.type = 'sine';
      padOsc.frequency.setValueAtTime(528, this.ctx.currentTime);
      padGain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      padOsc.connect(padGain);
      padGain.connect(gainNode);
      padOsc.start();

      const triggerChime = (immediate: boolean = false) => {
        if (!this.ctx || !this.masterGain) return;
        const nowTime = this.ctx.currentTime;
        const note = scale[Math.floor(Math.random() * scale.length)];

        // Main bell oscillator
        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(note, nowTime);

        // Metallic overtone partial (2.76x frequency for realistic bell resonance)
        const overtoneOsc = this.ctx.createOscillator();
        const overtoneGain = this.ctx.createGain();
        overtoneOsc.type = 'sine';
        overtoneOsc.frequency.setValueAtTime(note * 2.76, nowTime);

        const peakAmp = immediate ? 0.35 : 0.28 + Math.random() * 0.1;
        chimeGain.gain.setValueAtTime(0.001, nowTime);
        chimeGain.gain.linearRampToValueAtTime(peakAmp, nowTime + 0.02);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, nowTime + 2.6);

        overtoneGain.gain.setValueAtTime(0.001, nowTime);
        overtoneGain.gain.linearRampToValueAtTime(peakAmp * 0.45, nowTime + 0.015);
        overtoneGain.gain.exponentialRampToValueAtTime(0.0001, nowTime + 1.2);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(gainNode);
        overtoneOsc.connect(overtoneGain);
        overtoneGain.connect(gainNode);

        chimeOsc.onended = () => {
          try {
            chimeOsc.disconnect();
            chimeGain.disconnect();
            overtoneOsc.disconnect();
            overtoneGain.disconnect();
          } catch {}
        };

        chimeOsc.start(nowTime);
        overtoneOsc.start(nowTime);
        chimeOsc.stop(nowTime + 2.8);
        overtoneOsc.stop(nowTime + 2.8);

        // Gentle breeze intervals between 1.5s and 3.2s
        const nextDelay = 1500 + Math.random() * 1700;
        timer = window.setTimeout(() => triggerChime(false), nextDelay);
      };

      // Play immediate welcoming chime so user hears audio instantly upon clicking
      triggerChime(true);

      stopFn = () => {
        if (timer) clearTimeout(timer);
        try {
          padOsc.stop();
          padOsc.disconnect();
          padGain.disconnect();
          gainNode.disconnect();
        } catch {}
      };
    } else if (id === 'ocean') {
      // Serene Ocean: Rhythmic deep tidal swells washing ashore and gently receding
      const bufferSize = this.ctx.sampleRate * 3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.65;
      }
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const sweepFilter = this.ctx.createBiquadFilter();
      sweepFilter.type = 'lowpass';
      sweepFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
      sweepFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      // Low frequency wave modulation (swell every 5.8 seconds)
      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.17, this.ctx.currentTime); // ~5.8s cycle
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(380, this.ctx.currentTime); // sweeps 200Hz to 830Hz

      lfo.connect(lfoGain);
      lfoGain.connect(sweepFilter.frequency);

      const oceanAmp = this.ctx.createGain();
      oceanAmp.gain.setValueAtTime(0.55, this.ctx.currentTime);

      noiseSource.connect(sweepFilter);
      sweepFilter.connect(oceanAmp);
      oceanAmp.connect(gainNode);

      noiseSource.start();
      lfo.start();

      stopFn = () => {
        try {
          noiseSource.stop();
          lfo.stop();
          noiseSource.disconnect();
          sweepFilter.disconnect();
          lfo.disconnect();
          lfoGain.disconnect();
          oceanAmp.disconnect();
          gainNode.disconnect();
        } catch {}
      };
    } else if (id === 'forest') {
      // Alpine Night Forest: Soft wind rustle through pine needles + distant gentle nocturnal chimes
      const bufferSize = this.ctx.sampleRate * 3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(700, this.ctx.currentTime);
      windFilter.Q.setValueAtTime(1.4, this.ctx.currentTime);

      const forestGain = this.ctx.createGain();
      forestGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

      noiseSource.connect(windFilter);
      windFilter.connect(forestGain);
      forestGain.connect(gainNode);
      noiseSource.start();

      let forestTimer: number | null = null;
      const playForestTone = () => {
        if (!this.ctx || !this.masterGain) return;
        const toneOsc = this.ctx.createOscillator();
        const toneGain = this.ctx.createGain();
        const now = this.ctx.currentTime;
        const freqs = [880.0, 1046.5, 1174.66, 1318.5];
        const f = freqs[Math.floor(Math.random() * freqs.length)];
        toneOsc.type = 'sine';
        toneOsc.frequency.setValueAtTime(f, now);
        toneGain.gain.setValueAtTime(0.001, now);
        toneGain.gain.linearRampToValueAtTime(0.12, now + 0.06);
        toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
        toneOsc.connect(toneGain);
        toneGain.connect(gainNode);

        toneOsc.onended = () => {
          try {
            toneOsc.disconnect();
            toneGain.disconnect();
          } catch {}
        };

        toneOsc.start(now);
        toneOsc.stop(now + 2.4);
        forestTimer = window.setTimeout(playForestTone, 2200 + Math.random() * 2800);
      };
      playForestTone();

      stopFn = () => {
        if (forestTimer) clearTimeout(forestTimer);
        try {
          noiseSource.stop();
          noiseSource.disconnect();
          windFilter.disconnect();
          forestGain.disconnect();
          gainNode.disconnect();
        } catch {}
      };
    } else if (id === 'space' || id === 'cosmic') {
      // Cosmic Orbit: Ethereal celestial chord drone (144Hz + 216Hz + 288Hz + 432Hz shimmer)
      const frequencies = [144, 216, 288, 432];
      const gains = [0.25, 0.2, 0.14, 0.1];
      const oscs: OscillatorNode[] = [];
      const gNodes: GainNode[] = [];

      frequencies.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const detuneLfo = this.ctx.createOscillator();
        const detuneGain = this.ctx.createGain();
        detuneLfo.frequency.setValueAtTime(0.1 + idx * 0.05, this.ctx.currentTime);
        detuneGain.gain.setValueAtTime(2.5, this.ctx.currentTime);
        detuneLfo.connect(detuneGain);
        detuneGain.connect(osc.frequency);
        detuneLfo.start();

        g.gain.setValueAtTime(gains[idx], this.ctx.currentTime);
        osc.connect(g);
        g.connect(gainNode);
        osc.start();

        oscs.push(osc, detuneLfo);
        gNodes.push(g, detuneGain);
      });

      stopFn = () => {
        oscs.forEach((o) => {
          try {
            o.stop();
            o.disconnect();
          } catch {}
        });
        gNodes.forEach((g) => {
          try {
            g.disconnect();
          } catch {}
        });
        try {
          gainNode.disconnect();
        } catch {}
      };
    }

    this.soundscapeNodes.set(id, { gain: gainNode, stop: stopFn });
  }

  public playSuccess() {
    if (this.isMuted) return;
    if (!this.soundEnabled) this.setSoundEnabled(true);
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.28);
        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch {}
  }

  public playFail() {
    if (this.isMuted) return;
    if (!this.soundEnabled) this.setSoundEnabled(true);
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      [240, 200].forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.001, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.2);
        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.22);
      });
    } catch {}
  }

  public playClick() {
    if (this.isMuted) return;
    if (!this.soundEnabled) this.setSoundEnabled(true);
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.03);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  public playTone(freq: number, duration: number = 0.25) {
    if (this.isMuted) return;
    if (!this.soundEnabled) this.setSoundEnabled(true);
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {}
  }

  public playAmbiance(type: 'fire' | 'rain' | 'lofi') {
    if (this.isMuted) return;
    this.stopAllSoundscapes();
    const map: Record<string, string> = { fire: 'hearth', rain: 'rain', lofi: 'delta' };
    const id = map[type] || 'hearth';
    this.setSoundscape(id, true, 0.6);
  }

  public stopAmbiance() {
    this.stopAllSoundscapes();
  }

  public stopAllSoundscapes() {
    this.soundscapeNodes.forEach((node) => {
      try {
        node.stop();
      } catch {}
    });
    this.soundscapeNodes.clear();
    this.checkResumeBackgroundMusic();
  }

  private checkResumeBackgroundMusic() {
    if (this.soundscapeNodes.size === 0 && this.wasBgPausedBySoundscape && !this.isMuted) {
      this.wasBgPausedBySoundscape = false;
      this.startBackgroundMusic();
    }
  }
}

export const soundEngine = new SoundEngine();
