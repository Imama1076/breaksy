import React, { useState } from 'react';
import { FadeIn } from './MotionHelpers';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Privacy & Security',
    question: 'Does Breaksy see what I type or read my private messages?',
    answer:
      'Never. Everything stays 100% on your device. Breaksy only detects which app is opening, and it never reads your messages, tracks keystrokes, looks at photos, or accesses your camera or microphone.',
  },
  {
    category: 'Battery & Performance',
    question: 'Will running Breaksy drain my phone battery or slow down my device?',
    answer:
      'Not at all. Breaksy is built to run quietly in the background without draining your battery. It uses less than 1% of daily battery, saving far more power than the hours of doomscrolling it prevents.',
  },
  {
    category: 'Philosophy & Science',
    question: 'How is cognitive friction different from traditional hard app blockers?',
    answer:
      'Hard blockers lock you out completely, which usually leads to frustration and deleting the app. Breaksy gently slows you down with quick breathing exercises or short puzzles, giving you a moment to pause and decide instead of scrolling on autopilot.',
  },
  {
    category: 'Emergencies',
    question: 'What if I need immediate access to my phone during an urgent situation?',
    answer:
      'You are never trapped. Essential apps like Phone, Maps, and Banking can be whitelisted anytime. For blocked apps, a quick emergency override lets you bypass the screen whenever you truly need to.',
  },
  {
    category: 'Platforms & Sync',
    question: 'Is Breaksy available on both iOS (iPhone) and Android?',
    answer:
      'Yes! Breaksy is fully supported on both iOS and Android. Your focus streaks and crystal garden progress sync smoothly and securely across all your devices.',
  },
];

export const FaqSection: React.FC = React.memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative bg-gradient-to-b from-[#0B0E2A] via-[#080A20] to-[#060716] text-white py-20 sm:py-28 px-4 sm:px-6 md:px-10 overflow-hidden border-t border-purple-500/10">
      {/* Background Glow (Hardware-accelerated radial glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn delay={0} y={20}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Frequently Asked <span className="hero-heading">Questions</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light">
              Everything you need to know about Breaksy&apos;s privacy guarantees, battery efficiency, and mindful mechanics.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeIn key={idx} delay={idx * 0.05} y={15}>
                <div
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? 'bg-purple-950/25 border-purple-500/40 shadow-lg shadow-purple-950/30'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-purple-400 font-bold tracking-wider tabular-nums">
                        0{idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                        {item.question}
                      </span>
                    </div>
                    <div
                      className={`p-1.5 rounded-full bg-white/5 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 bg-purple-600/30 text-purple-300' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-purple-500/15 animate-in fade-in duration-200">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Atmospheric Cloud Horizon Accent at FAQ section base (Matching Why Breaksy section exactly) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10 opacity-35 overflow-hidden">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M 0 60
               C 120 40 240 70 380 45
               C 520 20 660 65 800 40
               C 940 15 1080 55 1220 35
               C 1340 20 1400 45 1440 50
               L 1440 120 L 0 120 Z"
            fill="url(#faqCloudGrad)"
          />

          <defs>
            <linearGradient id="faqCloudGrad" x1="720" y1="20" x2="720" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0B102E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
});
