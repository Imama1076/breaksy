import React, { useMemo } from 'react';

interface StarPoint {
  id: number;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  size: number;
  opacity: number;
  color: string;
  twinkleClass: string;
}

export const CosmicStarfield: React.FC = React.memo(() => {
  // Pure, clean celestial micro-stardust dots matching the Home hero night sky
  const minorStars = useMemo(() => {
    const starColors = ['#FEF08A', '#FFF9D2', '#C4B5FD', '#FFFFFF', '#E9D5FF'];
    const twinkleClasses = ['star-a', 'star-b', 'star-c'];
    const driftClasses = ['star-drift-a', 'star-drift-b', 'star-drift-c'];

    const minors: (StarPoint & { driftClass: string })[] = [];
    for (let i = 0; i < 40; i++) {
      const seed = (i * 9301 + 49297) % 233280;
      const seed2 = (i * 49297 + 9301) % 233280;
      const seed3 = (i * 35213 + 12847) % 233280;

      const x = (seed / 233280) * 100;
      const y = (seed2 / 233280) * 100;
      const size = 1.2 + (seed3 / 233280) * 1.8;
      const opacity = 0.35 + ((seed % 100) / 100) * 0.45;
      const color = starColors[i % starColors.length];
      const twinkleClass = twinkleClasses[i % twinkleClasses.length];
      const driftClass = driftClasses[i % driftClasses.length];

      minors.push({ id: i, x, y, size, opacity, color, twinkleClass, driftClass });
    }

    return minors;
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden [contain:strict]"
      aria-hidden="true"
    >
      {/* Global Ambient Subtle Drifting Stardust (delicate, realistic celestial dots) */}
      {minorStars.map((s) => (
        <div
          key={s.id}
          className={`absolute pointer-events-none will-change-transform ${s.driftClass}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
          }}
        >
          <span
            className={`block rounded-full pointer-events-none will-change-[transform,opacity] ${s.twinkleClass}`}
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.color,
              opacity: s.opacity,
            }}
          />
        </div>
      ))}
    </div>
  );
});
