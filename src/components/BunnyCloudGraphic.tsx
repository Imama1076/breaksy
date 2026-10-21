import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../utils/audio';
import { Heart } from 'lucide-react';

interface BunnyCloudGraphicProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BunnyCloudGraphic: React.FC<BunnyCloudGraphicProps> = ({
  className = '',
  size = 'md',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<SVGGElement>(null);
  const rightPupilRef = useRef<SVGGElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const [internalSleepRatio, setInternalSleepRatio] = useState(1); // 1 = asleep by default, wakes on interaction
  const [heartParticles, setHeartParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isWakingBounce, setIsWakingBounce] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const happyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isAsleep = internalSleepRatio >= 0.7;

  // Proportional sizing
  const dim =
    size === 'lg'
      ? 'w-44 h-40 sm:w-56 sm:h-52 md:w-64 md:h-60'
      : size === 'sm'
      ? 'w-24 h-22 sm:w-28 sm:h-26'
      : 'w-36 h-32 sm:w-44 sm:h-40 md:w-52 md:h-48';

  // Global mousemove listener for eye tracking and auto-sleep
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hasMoved =
        Math.abs(e.clientX - lastPointerRef.current.x) > 3 ||
        Math.abs(e.clientY - lastPointerRef.current.y) > 3;

      if (!hasMoved) return;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };

      // Wake up on mouse move
      if (internalSleepRatio > 0.1) {
        setInternalSleepRatio(0);
        setIsWakingBounce(true);
        setTimeout(() => setIsWakingBounce(false), 500);
      }

      // Reset idle timer (falls asleep after 3.5s of no mouse movement)
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        setInternalSleepRatio(1);
      }, 3500);

      // Track eyes relative to this mascot on screen (Zero-Reflow Analytical Math)
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height * 0.45;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const angle = Math.atan2(dy, dx);
        const dist = Math.hypot(dx, dy);

        const distFactor = Math.min(dist / 160, 1.0);
        const offsetX = (Math.cos(angle) * 7.5 * distFactor).toFixed(1);
        const offsetY = (Math.sin(angle) * 5.2 * distFactor).toFixed(1);

        if (leftPupilRef.current) {
          leftPupilRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
        if (rightPupilRef.current) {
          rightPupilRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (happyTimerRef.current) clearTimeout(happyTimerRef.current);
    };
  }, [internalSleepRatio]);

  // Petting interaction
  const handleMascotClick = (e: React.MouseEvent) => {
    if (internalSleepRatio > 0) {
      setInternalSleepRatio(0);
      setIsWakingBounce(true);
      setTimeout(() => setIsWakingBounce(false), 500);
    }

    setIsHappy(true);
    if (happyTimerRef.current) clearTimeout(happyTimerRef.current);
    happyTimerRef.current = setTimeout(() => {
      setIsHappy(false);
    }, 1400);

    soundEngine.playPetChime();

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newHeart = { id: Date.now() + Math.random(), x: clickX, y: clickY };
    setHeartParticles((prev) => [...prev.slice(-4), newHeart]);

    setTimeout(() => {
      setHeartParticles((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  const SCLERA_Y = 166;
  const SCLERA_HEIGHT = 28;
  const currentClipY = SCLERA_Y + internalSleepRatio * SCLERA_HEIGHT;
  const remainingClipHeight = Math.max(0.5, SCLERA_HEIGHT * (1.0 - internalSleepRatio));

  return (
    <div
      ref={containerRef}
      onClick={handleMascotClick}
      title="Click to pet Nox"
      className={`relative flex items-center justify-center select-none cursor-pointer ${className}`}
    >
      {/* Soft ambient cosmic glow */}
      <div className="absolute inset-0 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Pet Hearts */}
      <AnimatePresence>
        {heartParticles.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0.6, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, y: -45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute pointer-events-none z-30"
            style={{ left: h.x, top: h.y }}
          >
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Gentle breathing float animation */}
      <motion.div
        animate={isWakingBounce || isHappy ? { scale: [1, 1.08, 1], y: [-6, 0] } : { y: [-3, 3, -3] }}
        transition={
          isWakingBounce || isHappy
            ? { duration: 0.45, ease: 'easeOut' }
            : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative z-10 flex items-center justify-center"
      >
        {/* Floating ZZZ Sleep Particles when asleep */}
        <div
          className={`absolute top-[8%] left-[58%] pointer-events-none transition-opacity duration-500 z-40 ${
            isAsleep && !isHappy ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="absolute top-0 left-0 text-purple-300 font-bold text-xs sm:text-sm select-none zzz-1 drop-shadow-[0_2px_8px_rgba(168,85,247,0.6)]">
            z
          </span>
          <span className="absolute top-0 left-0 text-indigo-200 font-bold text-sm sm:text-base select-none zzz-2 drop-shadow-[0_2px_8px_rgba(129,140,248,0.6)]">
            Z
          </span>
          <span className="absolute top-0 left-0 text-amber-200 font-extrabold text-base sm:text-lg select-none zzz-3 drop-shadow-[0_2px_8px_rgba(251,191,36,0.7)]">
            Z
          </span>
        </div>

        <svg
          viewBox="0 0 380 350"
          fill="none"
          className={`${dim} overflow-visible drop-shadow-[0_12px_28px_rgba(20,10,50,0.5)]`}
        >
          <defs>
            {/* Mascot Head Body Radial Gradient */}
            <radialGradient id="bcMascotBodyGrad" cx="50%" cy="32%" r="66%">
              <stop offset="0%" stopColor="#B8B3FF" />
              <stop offset="30%" stopColor="#928BFB" />
              <stop offset="68%" stopColor="#7169EE" />
              <stop offset="100%" stopColor="#5045C8" />
            </radialGradient>

            {/* Head Specular Gloss Sheen */}
            <linearGradient id="bcHeadGlossGrad" x1="190" y1="114" x2="190" y2="144" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Rosy Cheek Blush */}
            <radialGradient id="bcCheekBlushGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF7675" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#FD79A8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6C5CE7" stopOpacity="0" />
            </radialGradient>

            {/* Sprout Ear Gradients */}
            <linearGradient id="bcLeafTopGrad" x1="115" y1="42" x2="155" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="35%" stopColor="#6EE7B7" />
              <stop offset="75%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="bcLeafSideGrad" x1="70" y1="115" x2="125" y2="165" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="40%" stopColor="#6EE7B7" />
              <stop offset="75%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="bcLeafVein" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D1FAE5" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
            </linearGradient>

            {/* Cosmic Iris Gradient */}
            <radialGradient id="bcEyeIrisG" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B357A" />
              <stop offset="60%" stopColor="#21194D" />
              <stop offset="100%" stopColor="#0B091B" />
            </radialGradient>

            {/* Paws Gradient */}
            <radialGradient id="bcPawGrad" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ABA5FC" />
              <stop offset="65%" stopColor="#7E76F5" />
              <stop offset="100%" stopColor="#5F57E3" />
            </radialGradient>
            <radialGradient id="bcPawBeanGrad">
              <stop offset="0%" stopColor="#F9A8D4" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#F9A8D4" stopOpacity="0" />
            </radialGradient>

            {/* Luminous White to Blue-Grey Cloud Gradient */}
            <linearGradient id="bcCloudPuffBodyGrad" x1="190" y1="210" x2="190" y2="355" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="28%" stopColor="#F1F5F9" />
              <stop offset="55%" stopColor="#CBD5E1" />
              <stop offset="80%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Circular clip paths: guarantees eyeball never escapes outside eye circle */}
            <clipPath id="bcLeftEyeClip">
              <circle cx="152" cy="180" r="14.5" />
            </clipPath>
            <clipPath id="bcRightEyeClip">
              <circle cx="228" cy="180" r="14.5" />
            </clipPath>

            {/* Soft Shadow Filter */}
            <filter id="bcSoftInnerShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#271E68" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* 1. SPROUT LEAF EARS (Matching Breaksy Logo: Angled upwards, tucked neatly) */}
          <g filter="url(#bcSoftInnerShadow)">
            {/* Lower Leaf (Angled diagonally up-left, tucked right below top leaf) */}
            <path
              d="M 124 140 C 100 125, 82 118, 74 122 C 78 140, 96 156, 110 158 Z"
              fill="url(#bcLeafSideGrad)"
            />
            <path
              d="M 110 150 C 96 140, 86 130, 78 124"
              stroke="url(#bcLeafVein)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Top Leaf (Angled ~70° up-left) */}
            <path
              d="M 138 140 C 104 98, 106 38, 126 44 C 146 72, 154 116, 138 140 Z"
              fill="url(#bcLeafTopGrad)"
            />
            <path
              d="M 136 136 C 132 108, 126 76, 126 52"
              stroke="url(#bcLeafVein)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M 132 110 C 124 104, 116 102, 110 102" stroke="url(#bcLeafVein)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M 131 90 C 125 84, 120 82, 116 80" stroke="url(#bcLeafVein)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <circle cx="126" cy="58" r="2.2" fill="#FFFFFF" opacity="0.9" />
          </g>

          {/* 2. CUTE CHUBBY DOME MASCOT HEAD (Balanced width, smooth round mochi curve) */}
          <g>
            <path
              d="M 92 256 C 90 176, 128 114, 190 114 C 252 114, 290 176, 288 256 C 288 272, 252 274, 190 274 C 128 274, 92 272, 92 256 Z"
              fill="url(#bcMascotBodyGrad)"
            />
            <path
              d="M 94 252 C 92 178, 130 116, 190 116 C 250 116, 288 178, 286 252"
              stroke="#E0E7FF"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M 130 152 C 136 132, 156 120, 185 119"
              stroke="#FFFFFF"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.55"
            />
            <path
              d="M 136 134 C 160 120, 220 120, 244 134 C 224 124, 156 124, 136 134 Z"
              fill="url(#bcHeadGlossGrad)"
            />
          </g>

          {/* 3. ROSY BLUSH CHEEKS (Plump and Glowing) */}
          <ellipse
            cx="124"
            cy="202"
            rx={isHappy ? 16 : 14}
            ry={isHappy ? 11 : 9.5}
            fill="url(#bcCheekBlushGrad)"
            style={{ transition: 'all 0.25s ease' }}
          />
          <ellipse
            cx="256"
            cy="202"
            rx={isHappy ? 16 : 14}
            ry={isHappy ? 11 : 9.5}
            fill="url(#bcCheekBlushGrad)"
            style={{ transition: 'all 0.25s ease' }}
          />
          <circle cx="119" cy="202" r={isHappy ? 2 : 1.4} fill="#FFFFFF" opacity="0.9" />
          <circle cx="123" cy="206" r={isHappy ? 2 : 1.4} fill="#FFFFFF" opacity="0.9" />
          <circle cx="257" cy="206" r={isHappy ? 2 : 1.4} fill="#FFFFFF" opacity="0.9" />
          <circle cx="261" cy="202" r={isHappy ? 2 : 1.4} fill="#FFFFFF" opacity="0.9" />

          {/* 4. ACTIVE OPEN EYES (Round circular cute eyes with analytic pupil tracking) */}
          <g style={{ opacity: (!isAsleep && !isHappy) ? 1 : 0, transition: 'opacity 0.25s ease' }}>
            {/* Left Eye */}
            <circle cx="152" cy="180" r="14.5" fill="#FFFFFF" />
            <g clipPath="url(#bcLeftEyeClip)">
              <g ref={leftPupilRef} style={{ transition: 'transform 0.04s ease-out' }}>
                <circle cx="152" cy="180" r="7.8" fill="url(#bcEyeIrisG)" />
                <circle cx="152" cy="180" r="5.4" fill="#0A0818" />
                <circle cx="149.8" cy="177.5" r="2.5" fill="#FFFFFF" />
                <circle cx="154.2" cy="182.5" r="1.1" fill="#FFFFFF" opacity="0.85" />
              </g>
            </g>

            {/* Right Eye */}
            <circle cx="228" cy="180" r="14.5" fill="#FFFFFF" />
            <g clipPath="url(#bcRightEyeClip)">
              <g ref={rightPupilRef} style={{ transition: 'transform 0.04s ease-out' }}>
                <circle cx="228" cy="180" r="7.8" fill="url(#bcEyeIrisG)" />
                <circle cx="228" cy="180" r="5.4" fill="#0A0818" />
                <circle cx="225.8" cy="177.5" r="2.5" fill="#FFFFFF" />
                <circle cx="230.2" cy="182.5" r="1.1" fill="#FFFFFF" opacity="0.85" />
              </g>
            </g>
          </g>

          {/* 5. SLEEPING SWEET EYES (Matching Breaksy Logo gentle arcs) */}
          <g style={{ opacity: (isAsleep && !isHappy) ? 1 : 0, transition: 'opacity 0.3s ease' }}>
            <path
              d="M 139 181 C 143 192, 161 192, 165 181"
              stroke="#1A1438"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 215 181 C 219 192, 237 192, 241 181"
              stroke="#1A1438"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* 5.5. JOYFUL HAPPY SQUINT EYES (^ ^ arcs when petted / throwing hearts) */}
          <g style={{ opacity: isHappy ? 1 : 0, transition: 'opacity 0.25s ease' }}>
            <path
              d="M 139 185 C 143 171, 161 171, 165 185"
              stroke="#1A1438"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 215 185 C 219 171, 237 171, 241 185"
              stroke="#1A1438"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* 6. NOSE & GENTLE / HAPPY SMILE */}
          <ellipse cx="190" cy="190" rx="3.5" ry="2.4" fill="#FB7185" opacity="0.85" />
          {isHappy ? (
            <g>
              {/* Happy open smiling mouth with pink tongue */}
              <path
                d="M 181 195 Q 190 209, 199 195 Z"
                fill="#1A1438"
              />
              <path
                d="M 184 203 Q 190 208, 196 203"
                fill="#FB7185"
              />
            </g>
          ) : (
            <path d="M 183 196 Q 190 204, 197 196" stroke="#1A1438" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}

          {/* 7. SINGLE COHESIVE LUMINOUS CLOUD CRADLE */}
          <g className="pointer-events-none">
            <path
              d="M 42 280
                 C 24 252, 58 226, 92 234
                 C 114 216, 148 218, 170 236
                 C 180 230, 200 230, 210 236
                 C 232 218, 266 216, 288 234
                 C 322 226, 356 252, 338 280
                 C 354 308, 324 330, 286 326
                 C 258 344, 226 354, 190 354
                 C 154 354, 122 344, 94 326
                 C 56 330, 26 308, 42 280 Z"
              fill="url(#bcCloudPuffBodyGrad)"
            />
          </g>

          {/* 8. PLUSH FRONT PAWS RESTING OVER THE CLOUD */}
          <g filter="url(#bcSoftInnerShadow)">
            <g transform="rotate(-6 150 248)">
              <ellipse cx="150" cy="248" rx="23" ry="14.5" fill="url(#bcPawGrad)" />
              <ellipse cx="150" cy="244" rx="20" ry="10" fill="#DDD6FE" opacity="0.45" />
              <ellipse cx="150" cy="249" rx="8.5" ry="5.2" fill="url(#bcPawBeanGrad)" />
            </g>

            <g transform="rotate(6 230 248)">
              <ellipse cx="230" cy="248" rx="23" ry="14.5" fill="url(#bcPawGrad)" />
              <ellipse cx="230" cy="244" rx="20" ry="10" fill="#DDD6FE" opacity="0.45" />
              <ellipse cx="230" cy="249" rx="8.5" ry="5.2" fill="url(#bcPawBeanGrad)" />
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
