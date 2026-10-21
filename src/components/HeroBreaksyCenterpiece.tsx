import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../utils/audio';
import { Heart } from 'lucide-react';

interface HeroBreaksyCenterpieceProps {
  onOpenDownload?: () => void;
}

export const HeroBreaksyCenterpiece: React.FC<HeroBreaksyCenterpieceProps> = ({
  onOpenDownload: _onOpenDownload,
}) => {
  const leftPupilRef = useRef<SVGGElement>(null);
  const rightPupilRef = useRef<SVGGElement>(null);
  const heroCenterpieceRef = useRef<HTMLDivElement>(null);

  const [internalSleepRatio, setInternalSleepRatio] = useState(1); // 1 = asleep by default, wakes on interaction
  const [heartParticles, setHeartParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isWakingBounce, setIsWakingBounce] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const happyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const sleepRatioRef = useRef(1);

  const isAsleep = internalSleepRatio >= 0.7;

  // Zero-Reflow Pupil Eye Tracking & Inactivity Auto-Sleep via Direct Mouse Listener & RAF (120 FPS, 0 React Re-renders!)
  useEffect(() => {
    let rafId: number | null = null;
    let currentX = 0;
    let currentY = 0;

    const updatePupils = () => {
      rafId = null;
      if (sleepRatioRef.current >= 0.7) {
        if (leftPupilRef.current) leftPupilRef.current.style.transform = 'translate(0px, 0px)';
        if (rightPupilRef.current) rightPupilRef.current.style.transform = 'translate(0px, 0px)';
        return;
      }

      let centerX = window.innerWidth / 2;
      let centerY = window.innerHeight * 0.35;

      if (heroCenterpieceRef.current) {
        const rect = heroCenterpieceRef.current.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height * 0.45;
      }

      const dx = currentX - centerX;
      const dy = currentY - centerY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.hypot(dx, dy);

      const damp = Math.max(0.3, 1.0 - sleepRatioRef.current * 0.7);
      const distFactor = Math.min(dist / 160, 1.0);
      const offsetX = (Math.cos(angle) * 7.5 * damp * distFactor).toFixed(1);
      const offsetY = (Math.sin(angle) * 5.2 * damp * distFactor).toFixed(1);

      if (leftPupilRef.current) {
        leftPupilRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;

      const hasMoved =
        Math.abs(currentX - lastPointerRef.current.x) > 3 ||
        Math.abs(currentY - lastPointerRef.current.y) > 3;

      if (!hasMoved) return;
      lastPointerRef.current = { x: currentX, y: currentY };

      // Wake up if sleeping
      if (sleepRatioRef.current > 0.1) {
        sleepRatioRef.current = 0;
        setInternalSleepRatio(0);
        setIsWakingBounce(true);
        setTimeout(() => setIsWakingBounce(false), 500);
      }

      // Auto-sleep timer reset
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        sleepRatioRef.current = 1;
        setInternalSleepRatio(1);
        if (leftPupilRef.current) leftPupilRef.current.style.transform = 'translate(0px, 0px)';
        if (rightPupilRef.current) rightPupilRef.current.style.transform = 'translate(0px, 0px)';
      }, 3500);

      if (rafId === null) {
        rafId = requestAnimationFrame(updatePupils);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (happyTimerRef.current) clearTimeout(happyTimerRef.current);
    };
  }, []);

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

  // Letters of BREAKSY
  const letters = ['B', 'R', 'E', 'A', 'K', 'S', 'Y'];

  // Exact Chubby Round Sleeping Mascot provided by User

  const renderMascotSvg = () => {
    const clipPrefix = 'hero';
    const leftRef = leftPupilRef;
    const rightRef = rightPupilRef;

    return (
    <svg
      viewBox="0 0 380 350"
      fill="none"
      className="w-full h-full overflow-visible"
    >
      <defs>
        {/* Mascot Head Body Gradient */}
        <radialGradient id={`${clipPrefix}MascotBodyGrad`} cx="50%" cy="32%" r="66%">
          <stop offset="0%" stopColor="#B8B3FF" />
          <stop offset="30%" stopColor="#928BFB" />
          <stop offset="68%" stopColor="#7169EE" />
          <stop offset="100%" stopColor="#5045C8" />
        </radialGradient>

        {/* Head Specular Gloss Sheen */}
        <linearGradient id={`${clipPrefix}HeadGlossGrad`} x1="190" y1="114" x2="190" y2="144" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Rosy Cheek Blush */}
        <radialGradient id={`${clipPrefix}CheekBlushGrad`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF7675" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#FD79A8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6C5CE7" stopOpacity="0" />
        </radialGradient>

        {/* Sprout Ear Gradients */}
        <linearGradient id={`${clipPrefix}LeafTopGrad`} x1="115" y1="42" x2="155" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="35%" stopColor="#6EE7B7" />
          <stop offset="75%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id={`${clipPrefix}LeafSideGrad2`} x1="70" y1="115" x2="125" y2="165" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="40%" stopColor="#6EE7B7" />
          <stop offset="75%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id={`${clipPrefix}LeafVein`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D1FAE5" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
        </linearGradient>

        {/* Paws Gradient */}
        <radialGradient id={`${clipPrefix}PawGrad`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ABA5FC" />
          <stop offset="65%" stopColor="#7E76F5" />
          <stop offset="100%" stopColor="#5F57E3" />
        </radialGradient>
        <radialGradient id={`${clipPrefix}PawBeanGrad2`}>
          <stop offset="0%" stopColor="#F9A8D4" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#F9A8D4" stopOpacity="0" />
        </radialGradient>

        {/* Eye Iris Depth */}
        <radialGradient id={`${clipPrefix}EyeIrisG`} cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#3B357A" />
          <stop offset="60%" stopColor="#21194D" />
          <stop offset="100%" stopColor="#0B091B" />
        </radialGradient>

        {/* LUMINOUS WHITE TO DARK BLUISH-GREYISH CLOUD GRADIENT */}
        <linearGradient id={`${clipPrefix}CloudPuffBodyGrad`} x1="190" y1="210" x2="190" y2="355" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="28%" stopColor="#F1F5F9" />
          <stop offset="55%" stopColor="#CBD5E1" />
          <stop offset="80%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        {/* Circular clip paths: guarantees eyeball never escapes outside eye circle */}
        <clipPath id={`${clipPrefix}LeftEyeClip`}>
          <circle cx="152" cy="180" r="14.5" />
        </clipPath>
        <clipPath id={`${clipPrefix}RightEyeClip`}>
          <circle cx="228" cy="180" r="14.5" />
        </clipPath>
      </defs>

      {/* 1. SPROUT LEAF EARS (Matching Breaksy Logo/Mascot: Angled upwards, tucked neatly) */}
      <g className="ear-flutter">
        {/* Lower Leaf (Angled diagonally up-left, tucked right below top leaf) */}
        <path
          d="M 124 140 C 100 125, 82 118, 74 122 C 78 140, 96 156, 110 158 Z"
          fill={`url(#${clipPrefix}LeafSideGrad2)`}
        />
        <path
          d="M 110 150 C 96 140, 86 130, 78 124"
          stroke={`url(#${clipPrefix}LeafVein)`}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Top Leaf (Angled ~70° up-left) */}
        <path
          d="M 138 140 C 104 98, 106 38, 126 44 C 146 72, 154 116, 138 140 Z"
          fill={`url(#${clipPrefix}LeafTopGrad)`}
        />
        <path
          d="M 136 136 C 132 108, 126 76, 126 52"
          stroke={`url(#${clipPrefix}LeafVein)`}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M 132 110 C 124 104, 116 102, 110 102" stroke={`url(#${clipPrefix}LeafVein)`} strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M 131 90 C 125 84, 120 82, 116 80" stroke={`url(#${clipPrefix}LeafVein)`} strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <circle cx="126" cy="58" r="2.2" fill="#FFFFFF" opacity="0.9" />
      </g>

      {/* 2. CUTE CHUBBY DOME MASCOT HEAD (Balanced width, smooth round mochi curve) */}
      <g>
        {/* Main Chubby Body */}
        <path
          d="M 92 256 C 90 176, 128 114, 190 114 C 252 114, 290 176, 288 256 C 288 272, 252 274, 190 274 C 128 274, 92 272, 92 256 Z"
          fill={`url(#${clipPrefix}MascotBodyGrad)`}
        />
        {/* Soft edge highlight rim */}
        <path
          d="M 94 252 C 92 178, 130 116, 190 116 C 250 116, 288 178, 286 252"
          stroke="#E0E7FF"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
        {/* Signature Gloss Curved Streak on upper-left (from Breaksy app icon/logo) */}
        <path
          d="M 130 152 C 136 132, 156 120, 185 119"
          stroke="#FFFFFF"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
        {/* Subtle Ambient Dome Sheen */}
        <path
          d="M 136 134 C 160 120, 220 120, 244 134 C 224 124, 156 124, 136 134 Z"
          fill={`url(#${clipPrefix}HeadGlossGrad)`}
        />
      </g>

      {/* 3. ROSY BLUSH CHEEKS (Plump and Glowing) */}
      <ellipse
        cx="124"
        cy="202"
        rx={isHappy ? 16 : 14}
        ry={isHappy ? 11 : 9.5}
        fill={`url(#${clipPrefix}CheekBlushGrad)`}
        style={{ transition: 'all 0.25s ease' }}
      />
      <ellipse
        cx="256"
        cy="202"
        rx={isHappy ? 16 : 14}
        ry={isHappy ? 11 : 9.5}
        fill={`url(#${clipPrefix}CheekBlushGrad)`}
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
        <g clipPath={`url(#${clipPrefix}LeftEyeClip)`}>
          <g ref={leftRef} style={{ transition: 'transform 0.04s ease-out' }}>
            <circle cx="152" cy="180" r="7.8" fill={`url(#${clipPrefix}EyeIrisG)`} />
            <circle cx="152" cy="180" r="5.4" fill="#0A0818" />
            <circle cx="149.8" cy="177.5" r="2.5" fill="#FFFFFF" />
            <circle cx="154.2" cy="182.5" r="1.1" fill="#FFFFFF" opacity="0.85" />
          </g>
        </g>

        {/* Right Eye */}
        <circle cx="228" cy="180" r="14.5" fill="#FFFFFF" />
        <g clipPath={`url(#${clipPrefix}RightEyeClip)`}>
          <g ref={rightRef} style={{ transition: 'transform 0.04s ease-out' }}>
            <circle cx="228" cy="180" r="7.8" fill={`url(#${clipPrefix}EyeIrisG)`} />
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
      <g className="bunny-single-cloud pointer-events-none">
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
          fill={`url(#${clipPrefix}CloudPuffBodyGrad)`}
        />
      </g>

      {/* 8. PLUSH FRONT PAWS RESTING OVER THE CLOUD */}
      <g className="bunny-front-paws">
        <g transform="rotate(-6 150 248)">
          <ellipse cx="150" cy="248" rx="23" ry="14.5" fill={`url(#${clipPrefix}PawGrad)`} />
          <ellipse cx="150" cy="244" rx="20" ry="10" fill="#DDD6FE" opacity="0.45" />
          <ellipse cx="150" cy="249" rx="8.5" ry="5.2" fill={`url(#${clipPrefix}PawBeanGrad2)`} />
        </g>
        <g transform="rotate(6 230 248)">
          <ellipse cx="230" cy="248" rx="23" ry="14.5" fill={`url(#${clipPrefix}PawGrad)`} />
          <ellipse cx="230" cy="244" rx="20" ry="10" fill="#DDD6FE" opacity="0.45" />
          <ellipse cx="230" cy="249" rx="8.5" ry="5.2" fill={`url(#${clipPrefix}PawBeanGrad2)`} />
        </g>
      </g>
    </svg>
    );
  };

  return (
    <div className="relative w-full max-w-full flex flex-col items-center justify-center select-none pt-0 sm:pt-4 overflow-visible bg-transparent">
      {/* 1. Pet Heart Particles */}
      {heartParticles.map((h) => (
        <span
          key={h.id}
          className="absolute z-50 pointer-events-none animate-bounce"
          style={{
            left: `${h.x}px`,
            top: `${h.y - 30}px`,
            transition: 'all 1s ease-out',
            transform: 'translateY(-35px) scale(1.3)',
            opacity: 0.95,
          }}
        >
          <Heart className="w-6 h-6 text-pink-400 fill-pink-400 drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]" />
        </span>
      ))}

      {/* 2. HERO CENTERPIECE SPOT (PERFECTLY PERCHED ABOVE BREAKSY) */}
      <div
        ref={heroCenterpieceRef}
        className="relative z-30 w-[84vw] xs:w-[80vw] sm:w-full max-w-[360px] xs:max-w-[420px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[620px] max-h-[30vh] xs:max-h-[32vh] sm:max-h-[34vh] md:max-h-[36vh] lg:max-h-[40vh] aspect-[1/0.92] flex items-center justify-center cursor-pointer -mb-8 xs:-mb-10 sm:-mb-14 md:-mb-16 lg:-mb-20"
        onClick={handleMascotClick}
        title="Tap to pet Breaksy Mascot!"
      >
        <motion.div
          initial={{ y: -45, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full h-full flex items-center justify-center"
        >

          {/* Mascot in Hero */}
          <div
            className={`relative w-full h-full flex items-center justify-center mascot-floating-body ${
              isAsleep && !isHappy ? 'asleep-breathe' : ''
            } ${isWakingBounce || isHappy ? 'wake-bounce' : ''}`}
          >
            {/* Floating ZZZ Sleep Particles when asleep */}
            <div
              className={`absolute top-[10%] left-[58%] pointer-events-none transition-opacity duration-500 z-40 ${
                isAsleep && !isHappy ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="absolute top-0 left-0 text-purple-300 font-bold text-sm sm:text-base md:text-lg select-none zzz-1 drop-shadow-[0_2px_8px_rgba(168,85,247,0.6)]">
                z
              </span>
              <span className="absolute top-0 left-0 text-indigo-200 font-bold text-base sm:text-lg md:text-xl select-none zzz-2 drop-shadow-[0_2px_8px_rgba(129,140,248,0.6)]">
                Z
              </span>
              <span className="absolute top-0 left-0 text-amber-200 font-extrabold text-xl sm:text-2xl md:text-3xl select-none zzz-3 drop-shadow-[0_2px_8px_rgba(251,191,36,0.7)]">
                Z
              </span>
            </div>

            {renderMascotSvg()}
          </div>
        </motion.div>
      </div>
      {/* 4. "BREAKSY" TITLE (Always centered, responsive font scaling) */}
      <div className="relative w-full max-w-7xl flex flex-col items-center justify-center overflow-visible z-10 px-2 sm:px-4 pt-0">
        <div className="relative w-full flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            style={{ fontSize: 'clamp(4.6rem, min(20.5vw, 16vh), 12.8rem)' }}
            className="w-full text-center font-black uppercase tracking-[-0.035em] xs:tracking-[-0.03em] sm:tracking-[-0.025em] md:tracking-[-0.02em] leading-none select-none flex items-center justify-center whitespace-nowrap drop-shadow-[0_14px_32px_rgba(20,10,50,0.7)]"
          >
            {letters.map((char, index) => (
              <span
                key={index}
                className="inline-block relative hero-heading transition-all duration-300 z-20 px-[0.5px] xs:px-[1px] sm:px-[1px]"
              >
                {char}
              </span>
            ))}
          </motion.h1>
        </div>
      </div>
    </div>
  );
};
