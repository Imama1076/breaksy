import React, { useState } from 'react';

interface HabitItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const ScrollingAddictionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="6" y="2" width="11" height="18" rx="2.5" />
    <path d="M11 6h1" />
    <path d="M11.5 16.5h.01" />
    <path d="M14 11.5l2.5 2.5-2 2-2.5-2.5" />
  </svg>
);

const MindFocusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path d="M18.5 5.5l-4.5 4.5" />
    <path d="M20 4l-1 3-2-2 3-1z" fill="currentColor" />
  </svg>
);

const PhoneInBedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M3 19h18" />
    <path d="M5 19v-5a2 2 0 0 1 2-2h4l4 4v3" />
    <circle cx="8" cy="8" r="2.2" />
    <rect x="14" y="8" width="4.5" height="7" rx="1.2" transform="rotate(-15 14 8)" />
  </svg>
);

const AdultXIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2" />
    <text x="12" y="15.5" textAnchor="middle" fill="currentColor" fontSize="8.5" fontWeight="900" fontFamily="sans-serif">18+</text>
  </svg>
);

const ScreenTimeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="5" y="2" width="10" height="17" rx="2.5" />
    <circle cx="15.5" cy="15.5" r="4.5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.8" />
    <polyline points="15.5 13.5 15.5 15.5 17 16.5" strokeWidth="1.8" />
  </svg>
);

const ImproveSleepIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M20.5 13A8.5 8.5 0 1 1 11 3.5a6.5 6.5 0 0 0 9.5 9.5z" />
    <path d="M16 4h2l-2 3h2" strokeWidth="1.6" />
    <path d="M19 7h1.6l-1.6 2.2h1.6" strokeWidth="1.3" />
  </svg>
);

const HABITS: HabitItem[] = [
  {
    id: 'scroll',
    title: 'Scrolling Addiction',
    subtitle: 'Remove the scrolling addiction',
    icon: <ScrollingAddictionIcon />,
  },
  {
    id: 'focus',
    title: 'Mind Focus',
    subtitle: 'Increase the focus',
    icon: <MindFocusIcon />,
  },
  {
    id: 'bed',
    title: 'Using phone in bed',
    subtitle: 'Reduce phone habit first time in morning',
    icon: <PhoneInBedIcon />,
  },
  {
    id: 'adult',
    title: 'X Addiction',
    subtitle: 'Remove the adult videos addiction',
    icon: <AdultXIcon />,
  },
  {
    id: 'screentime',
    title: 'Screen Time',
    subtitle: 'Reduce the screen time',
    icon: <ScreenTimeIcon />,
  },
  {
    id: 'sleep',
    title: 'Improve Sleep',
    subtitle: 'Reduce the phone time at night',
    icon: <ImproveSleepIcon />,
  },
];

export const HabitsCustomizer: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['scroll']);

  const toggleHabit = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div id="habits" className="glass-panel p-4 sm:p-8 rounded-[32px] border border-white/10 flex flex-col gap-6 shadow-2xl shadow-indigo-950/40 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-1">
        <h3 className="text-xl sm:text-3xl font-extrabold text-white heading-font tracking-tight">
          What Habits you want to change ?
        </h3>
      </div>

      {/* Habits Grid: 2 per row on small screens, 3 per row on larger screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {HABITS.map((habit) => {
          const isSelected = selectedIds.includes(habit.id);
          return (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl text-left border transition-all cursor-pointer flex flex-col justify-start gap-2.5 sm:gap-3.5 ${
                isSelected
                  ? 'bg-[#E5E7EB] text-slate-900 border-white/40 shadow-xl scale-[1.01]'
                  : 'bg-[#121422] text-white border-white/10 hover:border-white/20 hover:bg-[#181a2e]'
              }`}
            >
              <div className={`shrink-0 ${isSelected ? 'text-slate-900' : 'text-white'}`}>
                {habit.icon}
              </div>

              <div>
                <span className={`text-sm sm:text-lg font-bold block leading-snug ${isSelected ? 'text-slate-900' : 'text-white'}`}>
                  {habit.title}
                </span>
                <span className={`text-[10px] sm:text-xs block mt-1 leading-snug ${isSelected ? 'text-slate-600 font-medium' : 'text-slate-400 font-light'}`}>
                  {habit.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
