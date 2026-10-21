import React from 'react';

export const HeroNightSkyBackground: React.FC = React.memo(() => {

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Deep Celestial Midnight Indigo/Purple Gradient (Seamlessly transitions into next section) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060816] via-[#0B102E] to-[#0D102E]" />

      {/* 2. Responsive MOVING & DRIFTING Cosmic Stars Layer (Reduced count, smooth continuous celestial motion) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[5] overflow-hidden">
        {[
          // Upper sky & zenith - moving and drifting
          { x: 12, y: 12, size: 3.2, color: '#FEF08A', moveClass: 'star-drift-a', twinkle: 'star-a', opacity: 0.9 },
          { x: 32, y: 16, size: 3.6, color: '#FFF9D2', moveClass: 'star-drift-b', twinkle: 'star-c', opacity: 0.95 },
          { x: 55, y: 10, size: 4.0, color: '#FEF08A', moveClass: 'star-drift-c', twinkle: 'star-b', opacity: 1.0 },
          { x: 74, y: 14, size: 3.0, color: '#FFFFFF', moveClass: 'star-drift-a', twinkle: 'star-a', opacity: 0.85 },
          { x: 88, y: 18, size: 3.8, color: '#FDE047', moveClass: 'star-drift-b', twinkle: 'star-c', opacity: 0.95 },

          // Mid sky flanks
          { x: 8, y: 35, size: 3.5, color: '#FFF9D2', moveClass: 'star-drift-b', twinkle: 'star-a', opacity: 0.9 },
          { x: 22, y: 40, size: 4.2, color: '#FEF08A', moveClass: 'star-drift-a', twinkle: 'star-b', opacity: 1.0 },
          { x: 78, y: 38, size: 4.0, color: '#FEF08A', moveClass: 'star-drift-c', twinkle: 'star-a', opacity: 0.95 },
          { x: 92, y: 42, size: 3.4, color: '#C4B5FD', moveClass: 'star-drift-b', twinkle: 'star-c', opacity: 0.9 },

          // Lower sky / transition
          { x: 15, y: 68, size: 3.6, color: '#FEF08A', moveClass: 'star-drift-a', twinkle: 'star-a', opacity: 0.95 },
          { x: 38, y: 72, size: 4.0, color: '#FFF9D2', moveClass: 'star-drift-c', twinkle: 'star-b', opacity: 0.9 },
          { x: 65, y: 70, size: 3.5, color: '#FEF08A', moveClass: 'star-drift-b', twinkle: 'star-c', opacity: 0.95 },
          { x: 84, y: 66, size: 3.8, color: '#FFFFFF', moveClass: 'star-drift-a', twinkle: 'star-a', opacity: 0.9 },
        ].map((s, idx) => (
          <div
            key={idx}
            className={`absolute pointer-events-none will-change-transform ${s.moveClass}`}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
            }}
          >
            <span
              className={`block rounded-full pointer-events-none will-change-[transform,opacity] ${s.twinkle}`}
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

      {/* 2. SVG Vector Artwork: Sparse, Naturally Dispersed Stars and Corner Clouds */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Golden Warm Star Glow */}
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9D2" stopOpacity="1" />
            <stop offset="25%" stopColor="#FED7AA" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>

          {/* Corner Left Cloud Gradients */}
          <linearGradient id="cloudLeftDeep" x1="0" y1="780" x2="350" y2="1080" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#433568" />
            <stop offset="50%" stopColor="#2B1F4A" />
            <stop offset="100%" stopColor="#140F27" />
          </linearGradient>

          <linearGradient id="cloudLeftFront" x1="0" y1="880" x2="300" y2="1080" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#55447E" />
            <stop offset="50%" stopColor="#36295A" />
            <stop offset="100%" stopColor="#16102D" />
          </linearGradient>

          {/* Corner Right Cloud Gradients */}
          <linearGradient id="cloudRightDeep" x1="1920" y1="780" x2="1560" y2="1080" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#45376B" />
            <stop offset="50%" stopColor="#2D214C" />
            <stop offset="100%" stopColor="#151028" />
          </linearGradient>

          <linearGradient id="cloudRightFront" x1="1920" y1="880" x2="1620" y2="1080" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#574682" />
            <stop offset="50%" stopColor="#382A5D" />
            <stop offset="100%" stopColor="#17112F" />
          </linearGradient>

          {/* Warm Golden Cloud Rim Highlights */}
          <linearGradient id="rimLightGoldLeft" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#FFECC0" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FBBF24" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="rimLightGoldRight" x1="1" y1="0" x2="0" y2="0.6">
            <stop offset="0%" stopColor="#FFECC0" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FBBF24" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* 3. FEWER, RANDOMLY & NATURALLY DISPERSED 4-POINT SPARKLE STARS */}
        {/* Distributed widely on the left, right, and mid-heights, not crammed at the top */}
        
        {/* Star 1 - Upper Left Wing */}
        <g transform="translate(180, 160)" className="star-a">
          <circle cx="0" cy="0" r="22" fill="url(#starGlow)" />
          <path d="M 0,-16 L 2.2,-2.8 L 16,0 L 2.2,2.8 L 0,16 L -2.2,2.8 L -16,0 L -2.2,-2.8 Z" fill="#FFFBEB" />
          <circle cx="0" cy="0" r="2.8" fill="#FFFFFF" />
        </g>

        {/* Star 2 - Mid Left Sky */}
        <g transform="translate(360, 380)" className="star-b">
          <circle cx="0" cy="0" r="18" fill="url(#starGlow)" />
          <path d="M 0,-13 L 2,-2.4 L 13,0 L 2,2.4 L 0,13 L -2,2.4 L -13,0 L -2,-2.4 Z" fill="#FFFBEB" />
          <circle cx="0" cy="0" r="2.4" fill="#FFFFFF" />
        </g>

        {/* Star 3 - Lower-Mid Left Expanse */}
        <g transform="translate(200, 620)" className="star-c">
          <circle cx="0" cy="0" r="15" fill="url(#starGlow)" />
          <path d="M 0,-10 L 1.6,-2 L 10,0 L 1.6,2 L 0,10 L -1.6,2 L -10,0 L -1.6,-2 Z" fill="#FFFBEB" />
          <circle cx="0" cy="0" r="2.0" fill="#FFFFFF" />
        </g>

        {/* Star 4 - High Zenith (Subtle single sparkle, not bunched) */}
        <g transform="translate(680, 110)" className="star-b">
          <circle cx="0" cy="0" r="14" fill="url(#starGlow)" />
          <path d="M 0,-9 L 1.5,-1.8 L 9,0 L 1.5,1.8 L 0,9 L -1.5,1.8 L -9,0 L -1.5,-1.8 Z" fill="#FFFBEB" />
          <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
        </g>

        {/* Star 5 - High Right Zenith */}
        <g transform="translate(1260, 95)" className="star-a">
          <circle cx="0" cy="0" r="15" fill="url(#starGlow)" />
          <path d="M 0,-10 L 1.6,-2 L 10,0 L 1.6,2 L 0,10 L -1.6,2 L -10,0 L -1.6,-2 Z" fill="#FFFBEB" />
          <circle cx="0" cy="0" r="2.0" fill="#FFFFFF" />
        </g>

        {/* Star 6 - Upper Right Major */}
        <g transform="translate(1740, 180)" className="star-a">
          <circle cx="0" cy="0" r="24" fill="url(#starGlow)" />
          <path d="M 0,-16 L 2.4,-3 L 16,0 L 2.4,3 L 0,16 L -2.4,3 L -16,0 L -2.4,-3 Z" fill="#FFFBEB" />
          <circle cx="0" cy="0" r="3.0" fill="#FFFFFF" />
        </g>

        {/* Star 7 - Mid Right Sky */}
        <g transform="translate(1560, 420)" className="star-c">
          <circle cx="0" cy="0" r="17" fill="url(#starGlow)" />
          <path d="M 0,-12 L 1.8,-2.2 L 12,0 L 1.8,2.2 L 0,12 L -1.8,2.2 L -12,0 L -1.8,-2.2 Z" fill="#FFFBEB" />
          <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
        </g>

        {/* Star 8 - Lower-Mid Right Expanse */}
        <g transform="translate(1720, 660)" className="star-b">
          <circle cx="0" cy="0" r="14" fill="url(#starGlow)" />
          <path d="M 0,-9 L 1.5,-1.8 L 9,0 L 1.5,1.8 L 0,9 L -1.5,1.8 L -9,0 L -1.5,-1.8 Z" fill="#FFFBEB" />
          <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
        </g>

        {/* 4. SPARSE, RANDOMLY SCATTERED TWINKLE PINPOINTS (Across full canvas, not bunched) */}
        {[
          // Left side distributed heights
          [110, 280, 2.0, 0.75],
          [280, 220, 1.8, 0.65],
          [480, 260, 2.2, 0.70],
          [130, 480, 1.7, 0.60],
          [270, 520, 2.0, 0.75],
          [420, 600, 1.6, 0.60],
          [160, 750, 1.8, 0.65],

          // Upper subtle accents
          [860, 140, 1.8, 0.65],
          [1080, 160, 1.9, 0.70],

          // Right side distributed heights
          [1440, 250, 2.0, 0.70],
          [1660, 310, 1.8, 0.65],
          [1820, 390, 2.2, 0.75],
          [1490, 540, 1.7, 0.60],
          [1640, 580, 2.0, 0.70],
          [1810, 730, 1.8, 0.65],
          [1470, 760, 1.6, 0.55],
        ].map(([cx, cy, r, op], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="#FEF08A"
            opacity={op}
            className={i % 3 === 0 ? 'star-a' : i % 3 === 1 ? 'star-b' : 'star-c'}
          />
        ))}

        {/* 5. CORNER CLOUDS ONLY - Bottom-Left Corner */}
        <g>
          {/* Deep Plum Back Cloud (Left Corner Only) */}
          <path
            d="M -50,820
               C 20,800 70,830 100,880
               C 150,870 200,900 230,950
               C 280,950 330,990 350,1050
               C 360,1080 370,1100 370,1120
               L -50,1120 Z"
            fill="url(#cloudLeftDeep)"
          />

          {/* Foreground Violet-Indigo Cloud (Left Corner Only - Soft, Natural, Zero Border) */}
          <path
            d="M -50,910
               C 10,890 60,910 90,950
               C 140,940 185,975 210,1025
               C 240,1035 270,1065 290,1120
               L -50,1120 Z"
            fill="url(#cloudLeftFront)"
          />
        </g>

        {/* 6. CORNER CLOUDS ONLY - Bottom-Right Corner (Soft, Natural, Zero Border) */}
        <g>
          {/* Deep Plum Back Cloud (Right Corner Only) */}
          <path
            d="M 1970,810
               C 1900,795 1845,825 1815,875
               C 1765,865 1710,895 1680,945
               C 1630,945 1580,985 1560,1045
               C 1550,1075 1540,1095 1540,1120
               L 1970,1120 Z"
            fill="url(#cloudRightDeep)"
          />

          {/* Foreground Violet-Indigo Cloud (Right Corner Only - Soft, Natural, Zero Border) */}
          <path
            d="M 1970,900
               C 1910,885 1855,905 1825,945
               C 1775,935 1725,970 1700,1020
               C 1670,1030 1640,1060 1620,1120
               L 1970,1120 Z"
            fill="url(#cloudRightFront)"
          />
        </g>
      </svg>

      {/* 3. DEDICATED RESPONSIVE BOTTOM CLOUD BANK (100% VISIBLE ON MOBILE & DESKTOP) */}
      {/* Ensures mobile users clearly see the bottom clouds, matching desktop experience */}
      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-[12] overflow-hidden flex items-end">
        <svg
          viewBox="0 0 1000 240"
          preserveAspectRatio="none"
          fill="none"
          className="w-full h-24 sm:h-32 md:h-44 object-cover animate-bottom-cloud opacity-95"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mobileCloudBack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B2A63" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#221840" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0D102E" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="mobileCloudFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#533F7D" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#342556" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0D102E" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="mobileCloudRim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FDE047" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Back deeper cloud pillows */}
          <path
            d="M 0,160
               Q 90,100 190,135
               Q 290,90 410,130
               Q 510,85 640,125
               Q 760,80 870,120
               Q 950,95 1000,130
               L 1000,240
               L 0,240 Z"
            fill="url(#mobileCloudBack)"
          />

          {/* Front illuminated cloud pillows with warm rim highlight */}
          <path
            d="M 0,180
               Q 80,130 180,160
               Q 270,115 380,150
               Q 480,110 590,145
               Q 700,115 810,150
               Q 910,125 1000,160
               L 1000,240
               L 0,240 Z"
            fill="url(#mobileCloudFront)"
          />

          {/* Gentle golden/celestial rim light curve */}
          <path
            d="M 0,180
               Q 80,130 180,160
               Q 270,115 380,150
               Q 480,110 590,145
               Q 700,115 810,150
               Q 910,125 1000,160"
            stroke="url(#mobileCloudRim)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
});
