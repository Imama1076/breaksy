import React from 'react';

interface CrystalFlowerVisualProps {
  tierId: string;
  glowColor: string;
  className?: string;
  size?: number;
}

export const CrystalFlowerVisual: React.FC<CrystalFlowerVisualProps> = React.memo(({
  tierId,
  glowColor,
  className = '',
  size = 200,
}) => {
  switch (tierId) {
    case 'dahlia':
      // Crystal Dahlia: 12-point kaleidoscopic geometric teal/emerald crystalline petals
      return (
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className={`select-none ${className}`}
          style={{ filter: `drop-shadow(0 0 16px ${glowColor}66)` }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dahliaGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0F766E" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="dahliaGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="dahliaCore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CCFBF1" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>

          {/* Outer Layer Petals (Rotated 8-way) */}
          <g transform="translate(100, 100)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={`outer-${i}`} transform={`rotate(${angle})`}>
                <polygon
                  points="0,-78 22,-44 0,-18 -22,-44"
                  fill="url(#dahliaGrad1)"
                  stroke="#5EEAD4"
                  strokeWidth="1.2"
                  strokeOpacity="0.8"
                />
                <line x1="0" y1="-78" x2="0" y2="-18" stroke="#CCFBF1" strokeWidth="0.8" strokeOpacity="0.6" />
              </g>
            ))}

            {/* Middle Offset Petals (Rotated by 22.5 deg) */}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
              <g key={`mid-${i}`} transform={`rotate(${angle})`}>
                <polygon
                  points="0,-64 18,-34 0,-12 -18,-34"
                  fill="url(#dahliaGrad2)"
                  stroke="#2DD4BF"
                  strokeWidth="1.2"
                  strokeOpacity="0.9"
                />
                <polygon
                  points="0,-64 0,-12 18,-34"
                  fill="#99F6E4"
                  fillOpacity="0.25"
                />
              </g>
            ))}

            {/* Inner Ring Petals */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <g key={`inner-${i}`} transform={`rotate(${angle})`}>
                <polygon
                  points="0,-40 12,-20 0,-6 -12,-20"
                  fill="url(#dahliaCore)"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeOpacity="0.9"
                />
              </g>
            ))}

            {/* Sparkling Crystal Core */}
            <circle cx="0" cy="0" r="10" fill="#CCFBF1" />
            <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="4" fill="#14B8A6" />
          </g>
        </svg>
      );

    case 'golden':
      // Golden Lotus: Radiant sun-topaz crystalline lotus petals with warm amber highlights
      return (
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className={`select-none ${className}`}
          style={{ filter: `drop-shadow(0 0 18px ${glowColor}77)` }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.7" />
            </linearGradient>
            <radialGradient id="goldCenter" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>
          </defs>

          <g transform="translate(100, 105)">
            {/* Base Petals Spread */}
            <path
              d="M0,35 C-70,30 -90,-10 -80,-35 C-60,-20 -20,10 0,35 Z"
              fill="url(#goldGrad1)"
              stroke="#FDE68A"
              strokeWidth="1.2"
              strokeOpacity="0.85"
            />
            <path
              d="M0,35 C70,30 90,-10 80,-35 C60,-20 20,10 0,35 Z"
              fill="url(#goldGrad1)"
              stroke="#FDE68A"
              strokeWidth="1.2"
              strokeOpacity="0.85"
            />

            {/* Mid Petals */}
            <path
              d="M0,32 C-60,10 -70,-40 -50,-65 C-35,-35 -10,0 0,32 Z"
              fill="url(#goldGrad2)"
              stroke="#FEF3C7"
              strokeWidth="1.3"
              strokeOpacity="0.9"
            />
            <path
              d="M0,32 C60,10 70,-40 50,-65 C35,-35 10,0 0,32 Z"
              fill="url(#goldGrad2)"
              stroke="#FEF3C7"
              strokeWidth="1.3"
              strokeOpacity="0.9"
            />

            {/* Facet Reflection */}
            <polygon points="-50,-65 0,32 -25,-25" fill="#FEF08A" fillOpacity="0.3" />
            <polygon points="50,-65 0,32 25,-25" fill="#FFFBEB" fillOpacity="0.25" />

            {/* Center Main Upright Petal */}
            <polygon
              points="0,-82 25,-25 0,30 -25,-25"
              fill="url(#goldGrad1)"
              stroke="#FFFBEB"
              strokeWidth="1.5"
            />
            <line x1="0" y1="-82" x2="0" y2="30" stroke="#FFFBEB" strokeWidth="1" strokeOpacity="0.8" />
            <polygon points="0,-82 25,-25 0,30" fill="#FFFBEB" fillOpacity="0.35" />

            {/* Core Golden Sun gem */}
            <circle cx="0" cy="5" r="14" fill="url(#goldCenter)" stroke="#FFFBEB" strokeWidth="1.2" />
            <polygon points="0,-12 4,2 14,5 4,8 0,22 -4,8 -14,5 -4,2" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'plasma':
      // Plasma Sprout: Energetic neon magenta/pink crystalline blossom
      return (
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className={`select-none ${className}`}
          style={{ filter: `drop-shadow(0 0 18px ${glowColor}88)` }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="plasmaGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#DB2777" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#831843" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="plasmaGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#FDF2F8" />
            </linearGradient>
          </defs>

          <g transform="translate(100, 105)">
            {/* Plasma Energy Flares (Back) */}
            <path
              d="M0,25 Q-85,-15 -75,-60 Q-45,-30 0,25 Z"
              fill="url(#plasmaGrad1)"
              stroke="#F472B6"
              strokeWidth="1.2"
            />
            <path
              d="M0,25 Q85,-15 75,-60 Q45,-30 0,25 Z"
              fill="url(#plasmaGrad1)"
              stroke="#F472B6"
              strokeWidth="1.2"
            />

            {/* Inner Angular Plasma Spikes */}
            <polygon
              points="0,20 -40,-45 -20,-75 0,-30"
              fill="url(#plasmaGrad2)"
              stroke="#FCE7F3"
              strokeWidth="1.3"
              strokeOpacity="0.9"
            />
            <polygon
              points="0,20 40,-45 20,-75 0,-30"
              fill="url(#plasmaGrad2)"
              stroke="#FCE7F3"
              strokeWidth="1.3"
              strokeOpacity="0.9"
            />

            {/* Center Spire Flame */}
            <polygon
              points="0,-88 18,-30 0,20 -18,-30"
              fill="url(#plasmaGrad1)"
              stroke="#FFFFFF"
              strokeWidth="1.4"
            />
            <polygon points="0,-88 18,-30 0,20" fill="#FFFFFF" fillOpacity="0.3" />

            {/* Central Electric Core */}
            <circle cx="0" cy="-5" r="12" fill="#F43F5E" />
            <circle cx="0" cy="-5" r="7" fill="#FDF2F8" />
            <polygon points="0,-20 3,-7 16,-5 3,-3 0,10 -3,-3 -16,-5 -3,-7" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'aurora':
      // Aurora Lily: Iridescent multi-spectrum violet, purple & turquoise shifting crystal
      return (
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className={`select-none ${className}`}
          style={{ filter: `drop-shadow(0 0 18px ${glowColor}77)` }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="auroraGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="auroraGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E879F9" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <g transform="translate(100, 105)">
            {/* Broad Flared Lily Petals */}
            <path
              d="M0,30 C-65,30 -90,0 -80,-40 C-55,-25 -20,-5 0,30 Z"
              fill="url(#auroraGrad1)"
              stroke="#E9D5FF"
              strokeWidth="1.2"
            />
            <path
              d="M0,30 C65,30 90,0 80,-40 C55,-25 20,-5 0,30 Z"
              fill="url(#auroraGrad1)"
              stroke="#E9D5FF"
              strokeWidth="1.2"
            />

            {/* Secondary Iris Petals */}
            <path
              d="M0,28 C-45,10 -60,-40 -40,-70 C-25,-35 -5,5 0,28 Z"
              fill="url(#auroraGrad2)"
              stroke="#C084FC"
              strokeWidth="1.3"
            />
            <path
              d="M0,28 C45,10 60,-40 40,-70 C25,-35 5,5 0,28 Z"
              fill="url(#auroraGrad2)"
              stroke="#C084FC"
              strokeWidth="1.3"
            />

            {/* Central Lily Spear */}
            <polygon
              points="0,-85 20,-20 0,25 -20,-20"
              fill="url(#auroraGrad1)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <polygon points="0,-85 20,-20 0,25" fill="#22D3EE" fillOpacity="0.25" />

            {/* Glowing Diamond Center */}
            <polygon points="0,-18 9,0 0,18 -9,0" fill="#F5D0FE" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="0" cy="0" r="4" fill="#06B6D4" />
          </g>
        </svg>
      );

    case 'orchid':
      // Moonlit Orchid: Delicate celestial periwinkle and soft lavender crystalline orchid
      return (
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className={`select-none ${className}`}
          style={{ filter: `drop-shadow(0 0 16px ${glowColor}77)` }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="orchidGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="orchidGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <g transform="translate(100, 100)">
            {/* Side Wings */}
            <path
              d="M0,15 C-50,20 -85,5 -75,-30 C-45,-25 -15,0 0,15 Z"
              fill="url(#orchidGrad1)"
              stroke="#C7D2FE"
              strokeWidth="1.2"
            />
            <path
              d="M0,15 C50,20 85,5 75,-30 C45,-25 15,0 0,15 Z"
              fill="url(#orchidGrad1)"
              stroke="#C7D2FE"
              strokeWidth="1.2"
            />

            {/* Top Hood Petal */}
            <path
              d="M0,10 C-30,-20 -35,-65 0,-80 C35,-65 30,-20 0,10 Z"
              fill="url(#orchidGrad2)"
              stroke="#EEF2FF"
              strokeWidth="1.4"
            />
            <polygon points="0,-80 18,-40 0,10" fill="#FFFFFF" fillOpacity="0.3" />

            {/* Bottom Lip Petal */}
            <path
              d="M0,15 C-25,35 -20,60 0,70 C20,60 25,35 0,15 Z"
              fill="url(#orchidGrad1)"
              stroke="#818CF8"
              strokeWidth="1.2"
            />

            {/* Starlight Stigma Core */}
            <circle cx="0" cy="5" r="8" fill="#EEF2FF" />
            <polygon points="0,-8 3,3 12,5 3,7 0,18 -3,7 -12,5 -3,3" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'tulip':
      // Aether glass Tulip: Crisp prismatic sky-blue/cyan crystal tulip chalice
      return (
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className={`select-none ${className}`}
          style={{ filter: `drop-shadow(0 0 18px ${glowColor}77)` }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="tulipGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="tulipGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          <g transform="translate(100, 105)">
            {/* Crystalline Glass Leaves at Base */}
            <path
              d="M0,50 C-40,45 -65,25 -55,0 C-40,15 -10,35 0,50 Z"
              fill="url(#tulipGrad2)"
              fillOpacity="0.6"
              stroke="#7DD3FC"
              strokeWidth="1"
            />
            <path
              d="M0,50 C40,45 65,25 55,0 C40,15 10,35 0,50 Z"
              fill="url(#tulipGrad2)"
              fillOpacity="0.6"
              stroke="#7DD3FC"
              strokeWidth="1"
            />

            {/* Left Cup Facet */}
            <polygon
              points="0,45 -45,10 -35,-55 0,-15"
              fill="url(#tulipGrad1)"
              stroke="#BAE6FD"
              strokeWidth="1.3"
            />

            {/* Right Cup Facet */}
            <polygon
              points="0,45 45,10 35,-55 0,-15"
              fill="url(#tulipGrad1)"
              stroke="#BAE6FD"
              strokeWidth="1.3"
            />

            {/* Center Crystal Tip */}
            <polygon
              points="0,-78 22,-20 0,45 -22,-20"
              fill="url(#tulipGrad2)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <polygon points="0,-78 22,-20 0,45" fill="#FFFFFF" fillOpacity="0.35" />

            {/* Prismatic Ray Core */}
            <circle cx="0" cy="-5" r="9" fill="#F0F9FF" />
            <polygon points="0,-16 3,-3 14,-5 3,-1 0,10 -3,-1 -14,-5 -3,-3" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'lotus':
    default:
      // Midnight Lotus: Deep celestial indigo/blue/cyan glowing lotus petals with crystal facets
      return (
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className={`select-none ${className}`}
          style={{ filter: `drop-shadow(0 0 18px ${glowColor}77)` }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lotusGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#312E81" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="lotusGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#4338CA" stopOpacity="0.8" />
            </linearGradient>
            <radialGradient id="lotusCoreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#3730A3" />
            </radialGradient>
          </defs>

          <g transform="translate(100, 105)">
            {/* Outermost Wings */}
            <path
              d="M0,35 C-65,30 -90,0 -80,-30 C-55,-15 -20,10 0,35 Z"
              fill="url(#lotusGrad1)"
              stroke="#A5B4FC"
              strokeWidth="1.2"
            />
            <path
              d="M0,35 C65,30 90,0 80,-30 C55,-15 20,10 0,35 Z"
              fill="url(#lotusGrad1)"
              stroke="#A5B4FC"
              strokeWidth="1.2"
            />

            {/* Mid Petals */}
            <path
              d="M0,30 C-50,15 -60,-35 -40,-60 C-25,-30 -5,5 0,30 Z"
              fill="url(#lotusGrad2)"
              stroke="#C7D2FE"
              strokeWidth="1.3"
            />
            <path
              d="M0,30 C50,15 60,-35 40,-60 C25,-30 5,5 0,30 Z"
              fill="url(#lotusGrad2)"
              stroke="#C7D2FE"
              strokeWidth="1.3"
            />

            {/* Center Standing Petal */}
            <polygon
              points="0,-82 22,-20 0,30 -22,-20"
              fill="url(#lotusGrad1)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <polygon points="0,-82 22,-20 0,30" fill="#FFFFFF" fillOpacity="0.3" />

            {/* Glowing Gem Core */}
            <circle cx="0" cy="5" r="12" fill="url(#lotusCoreGrad)" stroke="#FFFFFF" strokeWidth="1" />
            <polygon points="0,-12 4,1 14,5 4,9 0,22 -4,9 -14,5 -4,1" fill="#FFFFFF" />
          </g>
        </svg>
      );
  }
});
