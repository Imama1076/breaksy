import React, { useState, useEffect } from 'react';
import {
  Calculator,
  BookOpen,
  Grid3X3,
  Brain,
  Wind,
  Activity,
  RotateCcw,
  Flower2,
  Leaf,
  Moon,
  Star,
  CheckCircle2,
  Download,
  Trophy,
  Award,
  ArrowRight,
  Target,
  Compass,
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

type ChallengeTab = 'math' | 'word' | 'puzzle' | 'memory' | 'breathing' | 'stretch';

interface MicroChallengesShowcaseProps {
  onOpenDownload?: () => void;
}

// 1. TEN PROGRESSIVE MATH CHALLENGES (Easy starter, progressive mixture)
const MATH_QUESTIONS = [
  { q: '3 + 4', ans: 7, choices: [6, 7, 8, 9] },
  { q: '10 - 4', ans: 6, choices: [5, 6, 7, 4] },
  { q: '8 + 5', ans: 13, choices: [12, 13, 14, 11] },
  { q: '15 - 7', ans: 8, choices: [7, 8, 9, 6] },
  { q: '6 × 3', ans: 18, choices: [15, 18, 21, 24] },
  { q: '24 + 13', ans: 37, choices: [35, 37, 38, 41] },
  { q: '40 - 16', ans: 24, choices: [22, 24, 26, 28] },
  { q: '7 × 4', ans: 28, choices: [24, 28, 32, 35] },
  { q: '35 + 28', ans: 63, choices: [61, 63, 65, 59] },
  { q: '100 - 45', ans: 55, choices: [50, 55, 60, 45] },
];

// 2. WORD MIND LEVELS (Scrambled alphabets so user genuinely has to find them)
const WORD_LEVELS = [
  { word: 'CALM', letters: ['L', 'A', 'M', 'C'], hint: 'Inner stillness & tranquility' },
  { word: 'FOCUS', letters: ['U', 'S', 'F', 'O', 'C'], hint: 'Undivided presence' },
  { word: 'PAUSE', letters: ['E', 'P', 'S', 'A', 'U'], hint: 'Take a mindful second' },
  { word: 'BREATHE', letters: ['T', 'B', 'R', 'H', 'E', 'A', 'E'], hint: 'Deep nervous system reset' },
];

// 3. SHUFFLED MEMORY CARDS GENERATOR (Prevents pairs from being in identical vertical slots)
const createShuffledMemoryCards = () => {
  const symbols = ['lotus', 'leaf', 'moon', 'star', 'lotus', 'leaf', 'moon', 'star'];
  for (let i = symbols.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
  }
  return symbols.map((val, idx) => ({
    id: idx + 1,
    val,
    flipped: false,
    matched: false,
  }));
};

export const MicroChallengesShowcase: React.FC<MicroChallengesShowcaseProps> = ({ onOpenDownload }) => {
  const [activeTab, setActiveTab] = useState<ChallengeTab>('math');

  const triggerDownloadAction = () => {
    soundEngine.playChime(true);
    if (onOpenDownload) {
      onOpenDownload();
    } else {
      const el = document.getElementById('download') || document.getElementById('hero');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ----------------------------------------------------
  // 1. MATH CHALLENGE STATE (10 Questions Progressive)
  // ----------------------------------------------------
  const [mathIndex, setMathIndex] = useState(0);
  const [mathScore, setMathScore] = useState(0);
  const [mathSelectedChoice, setMathSelectedChoice] = useState<number | null>(null);
  const [mathAnswerState, setMathAnswerState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [mathCompleted, setMathCompleted] = useState(false);

  const handleMathChoice = (choice: number) => {
    if (mathAnswerState === 'correct') return;
    setMathSelectedChoice(choice);
    const currentQ = MATH_QUESTIONS[mathIndex];

    if (choice === currentQ.ans) {
      soundEngine.playChime(true);
      setMathAnswerState('correct');
      setMathScore((s) => s + 10);

      setTimeout(() => {
        if (mathIndex + 1 < MATH_QUESTIONS.length) {
          setMathIndex((i) => i + 1);
          setMathSelectedChoice(null);
          setMathAnswerState('idle');
        } else {
          setMathCompleted(true);
        }
      }, 450);
    } else {
      soundEngine.playFail();
      setMathAnswerState('wrong');
      setTimeout(() => {
        setMathAnswerState('idle');
      }, 600);
    }
  };

  const handleResetMath = () => {
    setMathIndex(0);
    setMathScore(0);
    setMathSelectedChoice(null);
    setMathAnswerState('idle');
    setMathCompleted(false);
  };

  // ----------------------------------------------------
  // 2. WORD MIND STATE (Scrambled Letters)
  // ----------------------------------------------------
  const [wordLevelIndex, setWordLevelIndex] = useState(0);
  const [currentWordInput, setCurrentWordInput] = useState('');
  const [wordSolvedLevels, setWordSolvedLevels] = useState<string[]>([]);
  const [wordCompleted, setWordCompleted] = useState(false);

  const currentLevel = WORD_LEVELS[wordLevelIndex] || WORD_LEVELS[0];

  const handleTapWordLetter = (letter: string) => {
    soundEngine.playPetChime();
    const nextInput = currentWordInput + letter;
    setCurrentWordInput(nextInput);

    if (nextInput === currentLevel.word) {
      soundEngine.playSuccess();
      setWordSolvedLevels((prev) => [...prev, currentLevel.word]);
      setTimeout(() => {
        if (wordLevelIndex + 1 < WORD_LEVELS.length) {
          setWordLevelIndex((l) => l + 1);
          setCurrentWordInput('');
        } else {
          setWordCompleted(true);
        }
      }, 550);
    }
  };

  const handleWordBackspace = () => {
    soundEngine.playClick();
    setCurrentWordInput((prev) => prev.slice(0, -1));
  };

  const handleResetWord = () => {
    setWordLevelIndex(0);
    setCurrentWordInput('');
    setWordSolvedLevels([]);
    setWordCompleted(false);
  };

  // ----------------------------------------------------
  // 3. SPATIAL PUZZLE STATE (3x3 Sliding Tiles)
  // ----------------------------------------------------
  const [puzzleTiles, setPuzzleTiles] = useState<number[]>([1, 2, 3, 4, 5, 0, 7, 8, 6]);
  const [puzzleMoves, setPuzzleMoves] = useState(0);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  const handleTileClick = (index: number) => {
    const emptyIndex = puzzleTiles.indexOf(0);
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
      soundEngine.playPetChime();
      const newTiles = [...puzzleTiles];
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = 0;
      setPuzzleTiles(newTiles);
      const nextMoves = puzzleMoves + 1;
      setPuzzleMoves(nextMoves);

      const isWon = newTiles.slice(0, 8).every((v, i) => v === i + 1) && newTiles[8] === 0;
      if (isWon || nextMoves >= 6) {
        soundEngine.playSuccess();
        setPuzzleSolved(true);
      }
    }
  };

  const handleResetPuzzle = () => {
    setPuzzleTiles([1, 2, 3, 4, 5, 0, 7, 8, 6]);
    setPuzzleMoves(0);
    setPuzzleSolved(false);
  };

  // ----------------------------------------------------
  // 4. MEMORY RECALL STATE (Shuffled Cards)
  // ----------------------------------------------------
  const [memoryCards, setMemoryCards] = useState(createShuffledMemoryCards);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryCompleted, setMemoryCompleted] = useState(false);

  const handleCardClick = (index: number) => {
    if (memoryCards[index].flipped || memoryCards[index].matched || flippedIndices.length === 2) return;

    soundEngine.playPetChime();
    const newCards = [...memoryCards];
    newCards[index].flipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (newCards[first].val === newCards[second].val) {
        soundEngine.playChime(true);
        newCards[first].matched = true;
        newCards[second].matched = true;
        setFlippedIndices([]);
        setMemoryCards(newCards);

        const allMatched = newCards.every((c) => c.matched);
        if (allMatched) {
          soundEngine.playSuccess();
          setMemoryCompleted(true);
        }
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);
        }, 750);
      }
    }
  };

  const handleResetMemory = () => {
    setMemoryCards(createShuffledMemoryCards());
    setFlippedIndices([]);
    setMemoryCompleted(false);
  };

  // ----------------------------------------------------
  // 5. BREATHING CHALLENGE STATE (Stops after 3 cycles)
  // ----------------------------------------------------
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathSecondsLeft, setBreathSecondsLeft] = useState(4);
  const [breathCyclesCompleted, setBreathCyclesCompleted] = useState(0);
  const [breathDownloadShown, setBreathDownloadShown] = useState(false);

  // Active breathing pacer timer (Stops cleanly when completed)
  useEffect(() => {
    if (activeTab !== 'breathing' || breathDownloadShown) return;

    const timer = setInterval(() => {
      setBreathSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            soundEngine.playTone(330, 0.15);
            return 4;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            soundEngine.playTone(260, 0.15);
            return 4;
          } else {
            // Completed 1 cycle
            soundEngine.playTone(392, 0.15);
            const nextCycle = breathCyclesCompleted + 1;
            setBreathCyclesCompleted(nextCycle);
            if (nextCycle >= 3) {
              setBreathDownloadShown(true);
            } else {
              setBreathPhase('Inhale');
            }
            return 4;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab, breathPhase, breathCyclesCompleted, breathDownloadShown]);

  const handleManualBreathPhase = (phase: 'Inhale' | 'Hold' | 'Exhale') => {
    if (breathDownloadShown) return;
    soundEngine.playClick();
    setBreathPhase(phase);
    setBreathSecondsLeft(4);
  };

  const handleRestartBreathing = () => {
    soundEngine.playClick();
    setBreathCyclesCompleted(0);
    setBreathPhase('Inhale');
    setBreathSecondsLeft(4);
    setBreathDownloadShown(false);
  };

  // ----------------------------------------------------
  // 6. STRETCHING CHALLENGE STATE (Clear text-based step cues, no funny drawings)
  // ----------------------------------------------------
  const [stretchStep, setStretchStep] = useState(1);
  const [stretchSecondsLeft, setStretchSecondsLeft] = useState(15);
  const [stretchCompleted, setStretchCompleted] = useState(false);

  useEffect(() => {
    if (activeTab !== 'stretch' || stretchCompleted) return;

    const timer = setInterval(() => {
      setStretchSecondsLeft((prev) => (prev > 1 ? prev - 1 : 15));
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab, stretchCompleted, stretchStep]);

  const handleNextStretch = () => {
    soundEngine.playPetChime();
    if (stretchStep < 3) {
      setStretchStep((s) => s + 1);
      setStretchSecondsLeft(15);
    } else {
      soundEngine.playSuccess();
      setStretchCompleted(true);
    }
  };

  const handlePrevStretch = () => {
    soundEngine.playClick();
    if (stretchStep > 1) {
      setStretchStep((s) => s - 1);
      setStretchSecondsLeft(15);
    }
  };

  return (
    <div id="challenges" className="glass-panel p-5 sm:p-8 rounded-[28px] border border-white/10 flex flex-col gap-5 sm:gap-6">
      {/* Header */}
      <div className="pb-3 border-b border-white/10">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white heading-font">
          Six Cognitive Hurdles That Break Dopamine Loops
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-light">
          Experience the real cognitive mini-games featured in Breaksy. Quick, rewarding hurdles snap your brain out of passive autopilot scrolling.
        </p>
      </div>

      {/* 6 Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'math' as ChallengeTab, label: 'Math Challenge', icon: <Calculator className="w-4 h-4" /> },
          { id: 'word' as ChallengeTab, label: 'Word Mind', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'puzzle' as ChallengeTab, label: 'Spatial Puzzle', icon: <Grid3X3 className="w-4 h-4" /> },
          { id: 'memory' as ChallengeTab, label: 'Memory Recall', icon: <Brain className="w-4 h-4" /> },
          { id: 'breathing' as ChallengeTab, label: 'Breathing', icon: <Wind className="w-4 h-4" /> },
          { id: 'stretch' as ChallengeTab, label: 'Stretching', icon: <Activity className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ACTIVE TAB CONTENT */}
      <div className="min-h-[380px] flex items-center justify-center">

        {/* 1. MATH CHALLENGE (10 Questions Progressive) */}
        {activeTab === 'math' && (
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-black/40 border border-indigo-400/20 flex flex-col items-center gap-5 text-center relative overflow-hidden">
            {!mathCompleted ? (
              <>
                <div className="flex items-center justify-between w-full text-xs font-mono">
                  <span className="text-indigo-300 font-bold uppercase tracking-wider">
                    Question {mathIndex + 1} of 10
                  </span>
                  <span className="text-emerald-400 font-bold">Score: {mathScore} pts</span>
                </div>

                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 transition-all duration-300"
                    style={{ width: `${((mathIndex + 1) / 10) * 100}%` }}
                  />
                </div>

                <div className="text-4xl sm:text-5xl font-black font-mono text-white py-3 tracking-wider">
                  {MATH_QUESTIONS[mathIndex].q} = ?
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                  {MATH_QUESTIONS[mathIndex].choices.map((ans) => {
                    const isSelected = mathSelectedChoice === ans;
                    return (
                      <button
                        key={ans}
                        onClick={() => handleMathChoice(ans)}
                        className={`py-3.5 rounded-2xl font-mono text-lg font-bold transition-all cursor-pointer border ${
                          isSelected && mathAnswerState === 'correct'
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 scale-105'
                            : isSelected && mathAnswerState === 'wrong'
                            ? 'bg-rose-500/30 text-rose-200 border-rose-500 animate-shake'
                            : 'bg-white/5 hover:bg-white/15 text-white border-white/10 hover:border-indigo-400/40'
                        }`}
                      >
                        {ans}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-3 animate-fade-in">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30 shadow-md">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mt-1">
                    Challenge Complete!
                  </h4>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
                  <button
                    onClick={triggerDownloadAction}
                    className="w-full sm:w-auto flex-1 py-3 px-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Breaksy App</span>
                  </button>
                  <button
                    onClick={handleResetMath}
                    className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Play Again</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. WORD MIND (Scrambled Alphabets) */}
        {activeTab === 'word' && (
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-black/40 border border-amber-400/20 flex flex-col items-center gap-5 text-center relative overflow-hidden">
            {!wordCompleted ? (
              <>
                <div className="flex items-center justify-between w-full text-xs font-semibold">
                  <span className="text-amber-300 font-mono">
                    Word {wordLevelIndex + 1} of {WORD_LEVELS.length}
                  </span>
                  <span className="text-slate-400">
                    Hint: {currentLevel.hint}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {WORD_LEVELS.map((lvl, idx) => {
                    const isSolved = wordSolvedLevels.includes(lvl.word);
                    const isCurrent = idx === wordLevelIndex;
                    return (
                      <span
                        key={lvl.word}
                        className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border transition-all ${
                          isSolved
                            ? 'bg-amber-400/20 text-amber-200 border-amber-400/40'
                            : isCurrent
                            ? 'bg-white/10 text-white border-white/20 scale-105'
                            : 'bg-white/5 text-slate-500 border-white/5'
                        }`}
                      >
                        {isSolved ? `✓ ${lvl.word}` : `${lvl.word.length} Letters`}
                      </span>
                    );
                  })}
                </div>

                {/* Formed Word */}
                <div className="h-12 px-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center min-w-[150px] text-xl font-mono font-black text-white tracking-widest shadow-inner">
                  {currentWordInput || <span className="text-xs text-slate-500 tracking-normal font-sans">Tap scrambled letters</span>}
                </div>

                {/* Scrambled Circular Letter Buttons */}
                <div className="flex flex-wrap justify-center gap-2.5 max-w-[280px]">
                  {currentLevel.letters.map((letter, i) => (
                    <button
                      key={i}
                      onClick={() => handleTapWordLetter(letter)}
                      className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 font-black font-mono text-lg text-white border border-white/10 transition-all cursor-pointer flex items-center justify-center active:scale-95 shadow-md"
                    >
                      {letter}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleWordBackspace}
                    className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 text-xs hover:text-white transition-colors cursor-pointer"
                  >
                    Backspace
                  </button>
                  <button
                    onClick={() => setCurrentWordInput('')}
                    className="px-3 py-2 rounded-xl bg-white/5 text-slate-400 text-xs hover:text-white transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-3 animate-fade-in">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30 shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mt-1">
                    Words Unscrambled!
                  </h4>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
                  <button
                    onClick={triggerDownloadAction}
                    className="w-full sm:w-auto flex-1 py-3 px-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Breaksy App</span>
                  </button>
                  <button
                    onClick={handleResetWord}
                    className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Play Again</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. SPATIAL PUZZLE (Sliding 3x3 Grid) */}
        {activeTab === 'puzzle' && (
          <div className="w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 flex flex-col items-center gap-4 text-center">
            {!puzzleSolved ? (
              <>
                <div className="flex items-center justify-between w-full text-xs text-slate-400 font-mono">
                  <span>Spatial Matrix (3×3)</span>
                  <span className="text-indigo-300 font-bold">Moves: {puzzleMoves}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 w-64 h-64 p-2 bg-slate-900 rounded-2xl border border-white/10 shadow-inner">
                  {puzzleTiles.map((val, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTileClick(idx)}
                      className={`rounded-xl font-mono text-xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                        val === 0
                          ? 'bg-transparent border border-dashed border-white/15'
                          : 'bg-indigo-600/40 hover:bg-indigo-500/60 text-white border border-indigo-400/30 active:scale-95'
                      }`}
                    >
                      {val === 0 ? '' : val}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleResetPuzzle}
                    className="text-xs text-indigo-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Grid
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-2 animate-fade-in">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30 shadow-md">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mt-1">
                    Puzzle Solved!
                  </h4>
                </div>

                <div className="flex flex-col gap-2.5 w-full pt-2">
                  <button
                    onClick={triggerDownloadAction}
                    className="w-full py-3 px-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Breaksy App</span>
                  </button>
                  <button
                    onClick={handleResetPuzzle}
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. MEMORY RECALL (Mixed Shuffled Cards across all rows & cols) */}
        {activeTab === 'memory' && (
          <div className="w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-black/40 border border-emerald-500/20 flex flex-col items-center gap-4 text-center">
            {!memoryCompleted ? (
              <>
                <div className="flex items-center justify-between w-full text-xs text-slate-400 font-mono">
                  <span>Visual Recall Matrix</span>
                  <span className="text-emerald-300 font-bold">
                    Matches: {memoryCards.filter((c) => c.matched).length / 2}/4
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2.5 w-64 pt-2">
                  {memoryCards.map((card, idx) => (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(idx)}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all cursor-pointer border ${
                        card.flipped || card.matched
                          ? 'bg-emerald-500/20 border-emerald-400/50 scale-105'
                          : 'bg-slate-800/80 hover:bg-slate-700 border-white/10'
                      }`}
                    >
                      {card.flipped || card.matched ? (
                        card.val === 'lotus' ? (
                          <Flower2 className="w-6 h-6 text-pink-300" />
                        ) : card.val === 'leaf' ? (
                          <Leaf className="w-6 h-6 text-emerald-300" />
                        ) : card.val === 'moon' ? (
                          <Moon className="w-6 h-6 text-blue-300" />
                        ) : (
                          <Star className="w-6 h-6 text-amber-300" />
                        )
                      ) : (
                        <span className="font-mono text-slate-500 text-sm">?</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetMemory}
                    className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Shuffle Cards
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-2 animate-fade-in">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mt-1">
                    Cards Matched!
                  </h4>
                </div>

                <div className="flex flex-col gap-2.5 w-full pt-2">
                  <button
                    onClick={triggerDownloadAction}
                    className="w-full py-3 px-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Breaksy App</span>
                  </button>
                  <button
                    onClick={handleResetMemory}
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. BREATHING CHALLENGE (Stops after 3 cycles, restart button) */}
        {activeTab === 'breathing' && (
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-black/40 border border-emerald-500/20 flex flex-col items-center gap-5 text-center">
            <div className="flex items-center justify-between w-full text-xs font-semibold">
              <span className="text-emerald-300 uppercase tracking-wider">
                Box Respiration & Parasympathetic Reset
              </span>
              <span className="text-slate-400 font-mono">
                Cycle: {breathCyclesCompleted} / 3
              </span>
            </div>

            {!breathDownloadShown ? (
              <>
                {/* Dynamic Pulsing Breathing Orb */}
                <div className="relative w-48 h-48 flex items-center justify-center my-2">
                  <div
                    className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
                      breathPhase === 'Inhale'
                        ? 'border-emerald-400/40 scale-125 bg-emerald-500/10'
                        : breathPhase === 'Hold'
                        ? 'border-cyan-400/40 scale-120 bg-cyan-500/10'
                        : 'border-indigo-400/40 scale-95 bg-indigo-500/5'
                    }`}
                  />

                  <div
                    className={`w-36 h-36 rounded-full border-2 flex flex-col items-center justify-center shadow-xl transition-all duration-1000 ${
                      breathPhase === 'Inhale'
                        ? 'bg-emerald-500/20 border-emerald-400 shadow-emerald-500/30 scale-110'
                        : breathPhase === 'Hold'
                        ? 'bg-cyan-500/20 border-cyan-400 shadow-cyan-500/30 scale-105'
                        : 'bg-indigo-500/20 border-indigo-400 shadow-indigo-500/20 scale-90'
                    }`}
                  >
                    <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">
                      {breathPhase}
                    </span>
                    <span className="text-3xl font-black font-mono text-white mt-0.5">
                      {breathSecondsLeft}s
                    </span>
                    <span className="text-[10px] text-emerald-300 font-mono mt-0.5">
                      {breathPhase === 'Inhale' ? 'Breathe In' : breathPhase === 'Hold' ? 'Hold Gently' : 'Release Slowly'}
                    </span>
                  </div>
                </div>

                {/* Working Inhale / Hold / Exhale Buttons */}
                <div className="flex items-center gap-2">
                  {(['Inhale', 'Hold', 'Exhale'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => handleManualBreathPhase(p)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        breathPhase === p
                          ? 'bg-emerald-400 text-slate-950 shadow-md scale-105'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      {p} (4s)
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Completed State: Timer is stopped, clean download + restart */
              <div className="w-full p-6 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex flex-col items-center gap-3 animate-fade-in my-2">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mt-1">
                  Breathing Reset Complete!
                </h4>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
                  <button
                    onClick={triggerDownloadAction}
                    className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Breaksy App</span>
                  </button>
                  <button
                    onClick={handleRestartBreathing}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/15 cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restart Breathing</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. STRETCHING CHALLENGE (Clear, readable posture instructions, zero funny images) */}
        {activeTab === 'stretch' && (
          <div className="w-full max-w-xl p-5 sm:p-8 rounded-3xl bg-black/40 border border-purple-500/20 flex flex-col items-center gap-5 text-center">
            {!stretchCompleted ? (
              <>
                <div className="flex items-center justify-between w-full text-xs font-semibold">
                  <span className="text-purple-300 uppercase tracking-wider">
                    Ergonomic Reset · Pose {stretchStep} of 3
                  </span>
                  <span className="text-purple-300 font-mono">
                    Hold: {stretchSecondsLeft}s
                  </span>
                </div>

                {/* CLEAR PROFESSIONAL INSTRUCTION CARD */}
                <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 to-[#0e122b] border border-white/10 p-4 sm:p-5 text-left flex flex-col gap-3 shadow-inner">
                  {stretchStep === 1 && (
                    <>
                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                        <span className="text-xs sm:text-sm font-bold text-purple-300">
                          Pose 1: Lateral Neck & Trapezius Release
                        </span>
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-200 font-mono whitespace-nowrap shrink-0">
                          Upper Neck
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-300 leading-relaxed pt-1">
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 font-bold text-[10px]">1</span>
                          <span><strong>Starting Position:</strong> Sit upright with relaxed shoulders and feet flat on the floor.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 font-bold text-[10px]">2</span>
                          <span><strong>The Gentle Tilt:</strong> Slowly lower your right ear toward your right shoulder until a gentle stretch is felt along the left side of your neck.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 font-bold text-[10px]">3</span>
                          <span><strong>Light Assistance:</strong> Rest your right hand lightly over the top of your head (no pulling, just gentle resting weight).</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 font-bold text-[10px]">4</span>
                          <span><strong>Breathing:</strong> Inhale for 4 seconds, exhale smoothly, then gently repeat on the other side.</span>
                        </p>
                      </div>
                    </>
                  )}

                  {stretchStep === 2 && (
                    <>
                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                        <span className="text-xs sm:text-sm font-bold text-rose-300">
                          Pose 2: Thoracic Clavicle & Shoulder Opener
                        </span>
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-200 font-mono whitespace-nowrap shrink-0">
                          Chest & Shoulders
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-300 leading-relaxed pt-1">
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 font-bold text-[10px]">1</span>
                          <span><strong>Starting Position:</strong> Sit or stand upright with your spine tall, moving slightly forward from your chair backrest.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 font-bold text-[10px]">2</span>
                          <span><strong>Clasping Hands:</strong> Reach behind your lower back and interlace your fingers with palms facing each other.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 font-bold text-[10px]">3</span>
                          <span><strong>Chest Expansion:</strong> Gently roll your shoulders back and downward, drawing your shoulder blades softly toward each other.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 font-bold text-[10px]">4</span>
                          <span><strong>Benefit:</strong> Opens lung capacity and immediately reverses slumped phone and computer posture.</span>
                        </p>
                      </div>
                    </>
                  )}

                  {stretchStep === 3 && (
                    <>
                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                        <span className="text-xs sm:text-sm font-bold text-amber-300">
                          Pose 3: Seated Spinal Flow & Decompression
                        </span>
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-200 font-mono whitespace-nowrap shrink-0">
                          Vertebral Spine
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-300 leading-relaxed pt-1">
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 font-bold text-[10px]">1</span>
                          <span><strong>Starting Position:</strong> Sit upright with both sit-bones grounded and your knees aligned with your hips.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 font-bold text-[10px]">2</span>
                          <span><strong>Hand Placement:</strong> Place your right hand gently across the outside of your left knee or thigh.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 font-bold text-[10px]">3</span>
                          <span><strong>The Rotation:</strong> Inhale to lengthen your spine tall, then exhale to gently rotate your torso from the mid-back to the left.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 font-bold text-[10px]">4</span>
                          <span><strong>Benefit:</strong> Relieves lower back compression, improves blood flow, and resets mental alertness.</span>
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((step) => (
                    <button
                      key={step}
                      onClick={() => {
                        setStretchStep(step);
                        setStretchSecondsLeft(15);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        stretchStep === step ? 'w-8 bg-purple-400' : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Step Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrevStretch}
                    disabled={stretchStep === 1}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Previous Pose
                  </button>
                  <button
                    onClick={handleNextStretch}
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <span>{stretchStep === 3 ? 'Complete Routine' : 'Next Pose →'}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 py-3 animate-fade-in">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30">
                  <Activity className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mt-1">
                    Stretches Complete!
                  </h4>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
                  <button
                    onClick={triggerDownloadAction}
                    className="w-full sm:w-auto flex-1 py-3 px-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Breaksy App</span>
                  </button>
                  <button
                    onClick={() => {
                      setStretchStep(1);
                      setStretchSecondsLeft(15);
                      setStretchCompleted(false);
                    }}
                    className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restart Stretches</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
