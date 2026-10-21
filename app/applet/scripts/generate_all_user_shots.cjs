const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = '/app/applet/public';

// Helper gradients and filters
const commonDefs = `
  <filter id="floorShadow" x="-30%" y="-30%" width="160%" height="180%">
    <feGaussianBlur stdDeviation="35" result="blur" />
    <feColorMatrix type="matrix" values="0 0 0 0 0.1   0 0 0 0 0.1   0 0 0 0 0.15  0 0 0 0.35 0" />
  </filter>

  <filter id="phoneShadow" x="-30%" y="-20%" width="160%" height="150%">
    <feDropShadow dx="0" dy="25" stdDeviation="30" flood-color="#000000" flood-opacity="0.32" />
    <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18" />
  </filter>

  <linearGradient id="titaniumBezel" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#4B5563" />
    <stop offset="30%" stop-color="#374151" />
    <stop offset="70%" stop-color="#1F2937" />
    <stop offset="100%" stop-color="#4B5563" />
  </linearGradient>

  <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="rgba(255,255,255,0.08)" />
    <stop offset="40%" stop-color="rgba(255,255,255,0.02)" />
    <stop offset="100%" stop-color="transparent" />
  </linearGradient>
`;

// ==========================================
// 1. 931shots_so.png (Activities, Focus Mode Cozy Fire, Flower Garden)
// ==========================================
const svg931 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200">
  <defs>
    ${commonDefs}
    <linearGradient id="fireBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#261A2E" />
      <stop offset="35%" stop-color="#2D1E29" />
      <stop offset="70%" stop-color="#4A261E" />
      <stop offset="100%" stop-color="#160C0A" />
    </linearGradient>
    <radialGradient id="fireGlow" cx="50%" cy="65%" r="45%">
      <stop offset="0%" stop-color="#F97316" stop-opacity="0.8" />
      <stop offset="40%" stop-color="#EA580C" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#160C0A" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#818CF8" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#A855F7" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#0E0F1E" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1600" height="1200" fill="#FFFFFF" />
  <ellipse cx="800" cy="990" rx="640" ry="110" fill="#000000" filter="url(#floorShadow)" />

  <!-- LEFT PHONE: Activities -->
  <g transform="translate(480, 560) rotate(-11) translate(-480, -560)" filter="url(#phoneShadow)">
    <g transform="translate(230, 210)">
      <rect x="0" y="0" width="370" height="740" rx="46" fill="#181B22" stroke="url(#titaniumBezel)" stroke-width="4" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="#0D0F16" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="url(#glassReflection)" />
      <rect x="125" y="22" width="100" height="24" rx="12" fill="#000000" />
      <circle cx="210" cy="34" r="4.5" fill="#1F2937" />

      <g transform="translate(24, 70)">
        <text x="0" y="22" font-family="-apple-system, sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">Activities</text>
        <text x="0" y="42" font-family="sans-serif" font-size="11" fill="#9CA3AF">Stay off your phone, get into life.</text>

        <!-- Pills -->
        <g transform="translate(0, 60)">
          <rect x="0" y="0" width="40" height="22" rx="11" fill="rgba(255,255,255,0.12)" />
          <text x="20" y="15" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#FFFFFF">All</text>
          <rect x="48" y="0" width="55" height="22" rx="11" fill="rgba(255,255,255,0.06)" />
          <text x="75" y="15" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#9CA3AF">Games</text>
          <rect x="110" y="0" width="50" height="22" rx="11" fill="rgba(255,255,255,0.06)" />
          <text x="135" y="15" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#9CA3AF">Brain</text>
          <rect x="168" y="0" width="55" height="22" rx="11" fill="rgba(255,255,255,0.06)" />
          <text x="195" y="15" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#9CA3AF">Health</text>
        </g>

        <!-- 2x2 Grid Games -->
        <g transform="translate(0, 96)">
          <rect x="0" y="0" width="144" height="65" rx="14" fill="#161B26" stroke="rgba(255,255,255,0.06)" />
          <text x="14" y="26" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Puzzle</text>
          <text x="14" y="46" font-family="sans-serif" font-size="9.5" fill="#9CA3AF">Train your mind</text>

          <rect x="158" y="0" width="144" height="65" rx="14" fill="#13241C" stroke="rgba(16,185,129,0.15)" />
          <text x="14" y="26" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF" transform="translate(158, 0)">Memory</text>
          <text x="14" y="46" font-family="sans-serif" font-size="9.5" fill="#9CA3AF" transform="translate(158, 0)">Improve recall</text>

          <rect x="0" y="75" width="144" height="65" rx="14" fill="#162032" stroke="rgba(59,130,246,0.15)" />
          <text x="14" y="26" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF" transform="translate(0, 75)">Math Challenge</text>
          <text x="14" y="46" font-family="sans-serif" font-size="9" fill="#9CA3AF" transform="translate(0, 75)">Sharpen skills</text>

          <rect x="158" y="75" width="144" height="65" rx="14" fill="#282218" stroke="rgba(245,158,11,0.15)" />
          <text x="14" y="26" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF" transform="translate(158, 75)">Word Game</text>
          <text x="14" y="46" font-family="sans-serif" font-size="9" fill="#9CA3AF" transform="translate(158, 75)">Expand vocabulary</text>
        </g>

        <!-- Mind & Health Section -->
        <text x="0" y="262" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Mind &amp; Health</text>
        <g transform="translate(0, 275)">
          <rect x="0" y="0" width="144" height="70" rx="14" fill="#14261C" stroke="rgba(16,185,129,0.2)" />
          <text x="14" y="40" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Breathing</text>
          <text x="14" y="56" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">Calm your mind</text>

          <rect x="158" y="0" width="144" height="70" rx="14" fill="#221C2B" stroke="rgba(168,85,247,0.2)" />
          <text x="14" y="40" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF" transform="translate(158, 0)">Stretching</text>
          <text x="14" y="56" font-family="sans-serif" font-size="8.5" fill="#9CA3AF" transform="translate(158, 0)">Relax your body</text>

          <rect x="0" y="80" width="144" height="60" rx="14" fill="#261A24" stroke="rgba(236,72,153,0.2)" />
          <text x="14" y="32" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF" transform="translate(0, 80)">Meditation</text>
          <text x="14" y="48" font-family="sans-serif" font-size="8.5" fill="#9CA3AF" transform="translate(0, 80)">Inner peace</text>

          <rect x="158" y="80" width="144" height="60" rx="14" fill="#2B1A1E" stroke="rgba(244,63,94,0.2)" />
          <text x="14" y="32" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF" transform="translate(158, 80)">Gratitude</text>
          <text x="14" y="48" font-family="sans-serif" font-size="8.5" fill="#9CA3AF" transform="translate(158, 80)">Be positive</text>
        </g>

        <!-- Bottom bar -->
        <g transform="translate(0, 510)">
          <text x="40" y="20" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#9CA3AF">Home</text>
          <text x="150" y="20" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#818CF8" font-weight="bold">Activities</text>
          <text x="260" y="20" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#9CA3AF">Focus</text>
        </g>
      </g>
    </g>
  </g>

  <!-- RIGHT PHONE: Flower Garden -->
  <g transform="translate(1120, 560) rotate(11) translate(-1120, -560)" filter="url(#phoneShadow)">
    <g transform="translate(990, 210)">
      <rect x="0" y="0" width="370" height="740" rx="46" fill="#181B22" stroke="url(#titaniumBezel)" stroke-width="4" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="#0D0E16" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="url(#glassReflection)" />
      <rect x="125" y="22" width="100" height="24" rx="12" fill="#000000" />
      <circle cx="210" cy="34" r="4.5" fill="#1F2937" />

      <g transform="translate(24, 70)">
        <text x="0" y="22" font-family="-apple-system, sans-serif" font-weight="800" font-size="19" fill="#FFFFFF">&lt; Flower Garden</text>
        <text x="0" y="42" font-family="sans-serif" font-size="11" fill="#9CA3AF">Grow your streak, grow your garden.</text>

        <!-- 3D Lotus Flower -->
        <g transform="translate(150, 115)">
          <circle cx="0" cy="0" r="85" fill="url(#lotusGlow)" />
          <path d="M 0,-55 C 25,-40 40,-15 35,15 C 20,40 -20,40 -35,15 C -40,-15 -25,-40 0,-55 Z" fill="#6366F1" opacity="0.8" />
          <path d="M -45,-30 C -20,-45 15,-40 35,-20 C 50,10 25,45 -5,40 C -35,35 -55,0 -45,-30 Z" fill="#8B5CF6" opacity="0.7" />
          <path d="M 45,-30 C 55,0 35,35 5,40 C -25,45 -50,10 -35,-20 C -15,-40 20,-45 45,-30 Z" fill="#06B6D4" opacity="0.65" />
          <polygon points="0,-35 15,-10 0,15 -15,-10" fill="#E0E7FF" opacity="0.95" />
          <circle cx="0" cy="0" r="10" fill="#FDE047" />
          <circle cx="0" cy="0" r="5" fill="#F59E0B" />
        </g>

        <text x="0" y="210" font-family="sans-serif" font-size="9" fill="#A5B4FC" font-weight="bold">YOUR GARDEN</text>

        <!-- Garden List Items -->
        <g transform="translate(0, 222)">
          <!-- Item 1: Midnight Lotus (Unlocked) -->
          <rect x="0" y="0" width="302" height="60" rx="14" fill="#161826" stroke="rgba(129,140,248,0.3)" />
          <circle cx="30" cy="30" r="16" fill="rgba(129,140,248,0.2)" />
          <text x="60" y="28" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Midnight Lotus ✓</text>
          <text x="60" y="44" font-family="sans-serif" font-size="9" fill="#818CF8">Unlocked</text>
          <rect x="60" y="50" width="225" height="3" rx="1.5" fill="#818CF8" />

          <!-- Item 2: Crystal Dahlia -->
          <g transform="translate(0, 68)">
            <rect x="0" y="0" width="302" height="56" rx="14" fill="#161822" stroke="rgba(255,255,255,0.05)" />
            <circle cx="30" cy="28" r="16" fill="rgba(255,255,255,0.06)" />
            <text x="30" y="33" text-anchor="middle" font-size="12">🔒</text>
            <text x="60" y="26" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Crystal Dahlia</text>
            <text x="60" y="42" font-family="sans-serif" font-size="9" fill="#9CA3AF">Unlocks at a 10-day streak</text>
            <rect x="60" y="48" width="100" height="2.5" rx="1.2" fill="#34D399" />
          </g>

          <!-- Item 3: Golden Lotus -->
          <g transform="translate(0, 132)">
            <rect x="0" y="0" width="302" height="56" rx="14" fill="#161822" stroke="rgba(255,255,255,0.05)" />
            <circle cx="30" cy="28" r="16" fill="rgba(255,255,255,0.06)" />
            <text x="30" y="33" text-anchor="middle" font-size="12">🔒</text>
            <text x="60" y="26" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Golden Lotus</text>
            <text x="60" y="42" font-family="sans-serif" font-size="9" fill="#9CA3AF">Unlocks at a 30-day streak</text>
          </g>

          <!-- Item 4: Plasma Sprout -->
          <g transform="translate(0, 196)">
            <rect x="0" y="0" width="302" height="56" rx="14" fill="#161822" stroke="rgba(255,255,255,0.05)" />
            <circle cx="30" cy="28" r="16" fill="rgba(255,255,255,0.06)" />
            <text x="30" y="33" text-anchor="middle" font-size="12">🔒</text>
            <text x="60" y="26" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Plasma Sprout</text>
            <text x="60" y="42" font-family="sans-serif" font-size="9" fill="#9CA3AF">Unlocks at a 60-day streak</text>
          </g>
        </g>
      </g>
    </g>
  </g>

  <!-- CENTER PHONE: Focus Mode Cozy Fire -->
  <g filter="url(#phoneShadow)">
    <g transform="translate(610, 160)">
      <rect x="0" y="0" width="380" height="770" rx="52" fill="#161820" stroke="url(#titaniumBezel)" stroke-width="4.5" />
      <rect x="12" y="12" width="356" height="746" rx="42" fill="url(#fireBg)" />
      
      <!-- Mountain and Lake Scenery -->
      <path d="M 12 360 L 120 280 L 220 370 L 320 290 L 368 340 L 368 750 L 12 750 Z" fill="#18131E" opacity="0.9" />
      <ellipse cx="190" cy="520" rx="180" ry="80" fill="url(#fireGlow)" />
      
      <!-- Campfire logs & flames -->
      <g transform="translate(190, 540)">
        <polygon points="-40,40 40,25 35,45 -35,50" fill="#451A03" />
        <polygon points="-35,25 45,40 38,50 -40,45" fill="#78350F" />
        <!-- Campfire Flames -->
        <path d="M 0,25 C -25,10 -30,-30 0,-70 C 30,-30 25,10 0,25 Z" fill="#EA580C" opacity="0.9" />
        <path d="M -5,25 C -20,15 -18,-20 0,-50 C 18,-20 20,15 -5,25 Z" fill="#F97316" />
        <path d="M 0,25 C -10,18 -10,-10 0,-30 C 10,-10 10,18 0,25 Z" fill="#FDE047" />
      </g>

      <!-- Glass reflection -->
      <rect x="12" y="12" width="356" height="746" rx="42" fill="url(#glassReflection)" />

      <!-- Dynamic Island -->
      <rect x="130" y="26" width="120" height="28" rx="14" fill="#000000" />
      <circle cx="225" cy="40" r="5" fill="#1F2937" />

      <!-- Content Overlay -->
      <g transform="translate(30, 80)">
        <text x="0" y="20" font-family="-apple-system, sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">Focus Mode</text>
        <text x="0" y="38" font-family="sans-serif" font-size="11" fill="#D1D5DB">Choose your vibe lock in your focus</text>

        <!-- Soundscape selector pills -->
        <g transform="translate(0, 55)">
          <g transform="translate(10, 0)">
            <circle cx="16" cy="16" r="16" fill="#F97316" />
            <text x="16" y="20" text-anchor="middle" font-size="12">🔥</text>
            <text x="16" y="42" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#FFFFFF">Fire</text>
          </g>
          <g transform="translate(70, 0)">
            <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.08)" />
            <text x="16" y="20" text-anchor="middle" font-size="12">🌲</text>
            <text x="16" y="42" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#9CA3AF">Forest</text>
          </g>
          <g transform="translate(130, 0)">
            <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.08)" />
            <text x="16" y="20" text-anchor="middle" font-size="12">🌊</text>
            <text x="16" y="42" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#9CA3AF">Ocean</text>
          </g>
          <g transform="translate(190, 0)">
            <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.08)" />
            <text x="16" y="20" text-anchor="middle" font-size="12">🪐</text>
            <text x="16" y="42" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#9CA3AF">Space</text>
          </g>
          <g transform="translate(250, 0)">
            <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.08)" />
            <text x="16" y="20" text-anchor="middle" font-size="12">🌧️</text>
            <text x="16" y="42" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#9CA3AF">Rain</text>
          </g>
        </g>

        <!-- Cozy Fire Card -->
        <g transform="translate(0, 130)">
          <text x="0" y="16" font-family="sans-serif" font-weight="bold" font-size="17" fill="#FFFFFF">Cozy Fire</text>
          <text x="0" y="34" font-family="sans-serif" font-size="10.5" fill="#E5E7EB">Warm cracking fire to help you relax and unwind</text>
          <rect x="0" y="48" width="60" height="22" rx="11" fill="rgba(0,0,0,0.5)" />
          <text x="30" y="63" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#FFFFFF">24:58</text>
        </g>

        <!-- Focus Duration Selector -->
        <g transform="translate(160, 480)">
          <text x="0" y="0" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#E5E7EB">Focus Duration</text>
          <text x="0" y="32" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="34" fill="#FFFFFF">25</text>
          <text x="0" y="48" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#9CA3AF">minutes</text>
        </g>

        <!-- Bottom bar -->
        <g transform="translate(0, 580)">
          <text x="40" y="20" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#9CA3AF">Home</text>
          <text x="160" y="20" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#9CA3AF">Activities</text>
          <text x="280" y="20" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F97316" font-weight="bold">Focus</text>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

// ==========================================
// 2. 967shots_so.png (Daily Gratitude & Mountain View Entry)
// ==========================================
const svg967 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200">
  <defs>
    ${commonDefs}
    <linearGradient id="coralPrompt" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FB7185" />
      <stop offset="100%" stop-color="#F43F5E" />
    </linearGradient>
    <linearGradient id="sunriseSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="35%" stop-color="#FDE047" />
      <stop offset="70%" stop-color="#FB923C" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
  </defs>

  <rect width="1600" height="1200" fill="#FFFFFF" />
  <ellipse cx="800" cy="990" rx="600" ry="110" fill="#000000" filter="url(#floorShadow)" />

  <!-- LEFT PHONE: Gratitude Prompt -->
  <g transform="translate(520, 560) rotate(-9) translate(-520, -560)" filter="url(#phoneShadow)">
    <g transform="translate(290, 210)">
      <rect x="0" y="0" width="370" height="740" rx="46" fill="#181B22" stroke="url(#titaniumBezel)" stroke-width="4" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="#0D0E15" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="url(#glassReflection)" />
      <rect x="125" y="22" width="100" height="24" rx="12" fill="#000000" />
      <circle cx="210" cy="34" r="4.5" fill="#1F2937" />

      <g transform="translate(24, 75)">
        <text x="0" y="22" font-family="-apple-system, sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">&lt; Gratitude</text>
        
        <!-- Big Coral Prompt Card -->
        <g transform="translate(0, 50)">
          <rect x="0" y="0" width="302" height="160" rx="22" fill="#1E1719" stroke="rgba(244,63,94,0.2)" />
          <text x="18" y="30" font-family="sans-serif" font-size="9" fill="#FB7185" font-weight="bold">✦ DAILY PROMPT</text>
          <text x="18" y="60" font-family="sans-serif" font-weight="bold" font-size="16" fill="#FFFFFF">What's a small win you had</text>
          <text x="18" y="82" font-family="sans-serif" font-weight="bold" font-size="16" fill="#FFFFFF">today?</text>
          
          <!-- Coral Write Now Pill -->
          <rect x="18" y="105" width="266" height="40" rx="20" fill="url(#coralPrompt)" />
          <text x="151" y="130" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Write Now</text>
        </g>

        <!-- Past Entries Section -->
        <g transform="translate(0, 240)">
          <text x="0" y="0" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Past Entries</text>
          <text x="302" y="0" text-anchor="end" font-family="sans-serif" font-size="10" fill="#9CA3AF">Streak: 1d</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="302" height="60" rx="14" fill="#18151A" stroke="rgba(255,255,255,0.06)" />
            <circle cx="24" cy="30" r="10" fill="rgba(244,63,94,0.15)" />
            <text x="24" y="34" text-anchor="middle" font-size="10">❤️</text>
            <text x="44" y="24" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">Oct 13</text>
            <text x="44" y="42" font-family="sans-serif" font-size="10.5" fill="#FFFFFF">Life isn't about finding yourself. Lif...</text>
            <text x="286" y="34" font-family="sans-serif" font-size="13" fill="#9CA3AF">&gt;</text>
          </g>
        </g>
      </g>
    </g>
  </g>

  <!-- RIGHT PHONE: View Entry with Mountain Sunrise Art -->
  <g transform="translate(980, 590) rotate(6) translate(-980, -590)" filter="url(#phoneShadow)">
    <g transform="translate(800, 220)">
      <rect x="0" y="0" width="370" height="740" rx="46" fill="#181B22" stroke="url(#titaniumBezel)" stroke-width="4" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="#0D0E15" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="url(#glassReflection)" />
      <rect x="125" y="22" width="100" height="24" rx="12" fill="#000000" />
      <circle cx="210" cy="34" r="4.5" fill="#1F2937" />

      <g transform="translate(24, 75)">
        <text x="0" y="22" font-family="-apple-system, sans-serif" font-weight="800" font-size="19" fill="#FFFFFF">&lt; View Entry</text>
        <circle cx="290" cy="18" r="10" fill="rgba(244,63,94,0.2)" />
        <text x="290" y="22" text-anchor="middle" font-size="10">❤️</text>

        <text x="0" y="55" font-family="sans-serif" font-weight="bold" font-size="16" fill="#FFFFFF">October 13, 2026</text>
        <text x="0" y="72" font-family="sans-serif" font-size="10" fill="#9CA3AF">Tuesday • 05:34 PM</text>

        <!-- Entry Card -->
        <g transform="translate(0, 90)">
          <rect x="0" y="0" width="302" height="110" rx="18" fill="#1C1619" stroke="rgba(244,63,94,0.15)" />
          <text x="16" y="26" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FB7185">What's a small win you had today?</text>
          <text x="16" y="50" font-family="sans-serif" font-size="11" fill="#E5E7EB">Life isn't about finding yourself. Life is about</text>
          <text x="16" y="68" font-family="sans-serif" font-size="11" fill="#E5E7EB">creating yourself.</text>
          <text x="16" y="90" font-family="sans-serif" font-size="10" fill="#9CA3AF">– George Bernard Shaw</text>
        </g>

        <!-- Scenic Mountain Sunrise Artwork -->
        <g transform="translate(0, 220)">
          <rect x="0" y="0" width="302" height="180" rx="20" fill="url(#sunriseSky)" />
          
          <!-- Mountain Silhouettes -->
          <path d="M 0 130 L 70 80 L 160 140 L 230 70 L 302 120 L 302 180 L 0 180 Z" fill="#93C5FD" opacity="0.8" />
          <path d="M 0 150 L 90 100 L 180 160 L 250 110 L 302 145 L 302 180 L 0 180 Z" fill="#1E293B" />
          
          <!-- Pine Trees on sides -->
          <polygon points="15,180 15,100 25,180" fill="#0F172A" />
          <polygon points="5,180 5,115 15,180" fill="#0F172A" />
          <polygon points="285,180 285,90 298,180" fill="#0F172A" />
          
          <!-- Victorious person with outstretched arms on peak -->
          <g transform="translate(151, 125)">
            <circle cx="0" cy="0" r="5" fill="#0F172A" />
            <line x1="0" y1="5" x2="0" y2="30" stroke="#0F172A" stroke-width="4" />
            <line x1="-18" y1="12" x2="18" y2="12" stroke="#0F172A" stroke-width="3" stroke-linecap="round" />
            <line x1="0" y1="30" x2="-8" y2="50" stroke="#0F172A" stroke-width="3.5" />
            <line x1="0" y1="30" x2="8" y2="50" stroke="#0F172A" stroke-width="3.5" />
          </g>
        </g>

        <!-- Bottom Action Bar -->
        <g transform="translate(0, 440)">
          <text x="0" y="16" font-family="sans-serif" font-size="11" fill="#E5E7EB">✎ Edit</text>
          <text x="60" y="16" font-family="sans-serif" font-size="11" fill="#FB7185">🗑 Delete</text>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

// ==========================================
// 3. 996shots_so.png (Breathing Sanctuary & Bee Breath 04:57)
// ==========================================
const svg996 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200">
  <defs>
    ${commonDefs}
    <radialGradient id="breathRingGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#34D399" stop-opacity="0.8" />
      <stop offset="60%" stop-color="#10B981" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#059669" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1600" height="1200" fill="#FFFFFF" />
  <ellipse cx="800" cy="990" rx="600" ry="110" fill="#000000" filter="url(#floorShadow)" />

  <!-- LEFT PHONE: Breathing Techniques -->
  <g transform="translate(520, 560) rotate(-8) translate(-520, -560)" filter="url(#phoneShadow)">
    <g transform="translate(290, 210)">
      <rect x="0" y="0" width="370" height="740" rx="46" fill="#181B22" stroke="url(#titaniumBezel)" stroke-width="4" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="#0A100D" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="url(#glassReflection)" />
      <rect x="125" y="22" width="100" height="24" rx="12" fill="#000000" />
      <circle cx="210" cy="34" r="4.5" fill="#1F2937" />

      <g transform="translate(24, 75)">
        <text x="0" y="22" font-family="-apple-system, sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">&lt; Breathing</text>
        <text x="0" y="42" font-family="sans-serif" font-size="11" fill="#9CA3AF">Find your calm, one breath at a time.</text>

        <!-- Session Duration Pills -->
        <text x="0" y="75" font-family="sans-serif" font-size="9" fill="#6EE7B7" font-weight="bold">CHOOSE SESSION DURATION</text>
        <g transform="translate(0, 85)">
          <rect x="0" y="0" width="60" height="28" rx="14" fill="#121D17" stroke="rgba(255,255,255,0.06)" />
          <text x="30" y="18" text-anchor="middle" font-family="sans-serif" font-size="10.5" fill="#FFFFFF">1 min</text>

          <rect x="68" y="0" width="60" height="28" rx="14" fill="#121D17" stroke="rgba(255,255,255,0.06)" />
          <text x="98" y="18" text-anchor="middle" font-family="sans-serif" font-size="10.5" fill="#FFFFFF">3 min</text>

          <!-- 5 min (Selected Emerald Pill) -->
          <rect x="136" y="0" width="65" height="28" rx="14" fill="#34D399" />
          <text x="168" y="18" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="10.5" fill="#064E3B">5 min</text>

          <rect x="208" y="0" width="65" height="28" rx="14" fill="#121D17" stroke="rgba(255,255,255,0.06)" />
          <text x="240" y="18" text-anchor="middle" font-family="sans-serif" font-size="10.5" fill="#FFFFFF">10 min</text>
        </g>

        <!-- Techniques List -->
        <text x="0" y="145" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Techniques</text>
        <g transform="translate(0, 158)">
          <!-- Technique 1: Box Breathing -->
          <rect x="0" y="0" width="302" height="58" rx="14" fill="#131F18" stroke="rgba(16,185,129,0.2)" />
          <circle cx="22" cy="29" r="6" fill="#34D399" />
          <text x="38" y="24" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Box Breathing</text>
          <text x="38" y="42" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">Equal parts inhale, hold, exhale, hold</text>
          <text x="290" y="32" text-anchor="end" font-family="sans-serif" font-size="9" fill="#34D399">4s cycle</text>

          <!-- Technique 2: 4-7-8 Technique -->
          <g transform="translate(0, 66)">
            <rect x="0" y="0" width="302" height="58" rx="14" fill="#111B15" stroke="rgba(255,255,255,0.05)" />
            <circle cx="22" cy="29" r="6" fill="#10B981" />
            <text x="38" y="24" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">4-7-8 Technique</text>
            <text x="38" y="42" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">Natural tranquilizer for the nervous sys</text>
            <text x="290" y="32" text-anchor="end" font-family="sans-serif" font-size="8.5" fill="#10B981">Deep relaxation</text>
          </g>

          <!-- Technique 3: Coherent Breathing -->
          <g transform="translate(0, 132)">
            <rect x="0" y="0" width="302" height="58" rx="14" fill="#111B15" stroke="rgba(255,255,255,0.05)" />
            <circle cx="22" cy="29" r="6" fill="#10B981" />
            <text x="38" y="24" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Coherent Breathing</text>
            <text x="38" y="42" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">Slow, even breaths to steady your rhythm</text>
            <text x="290" y="32" text-anchor="end" font-family="sans-serif" font-size="8.5" fill="#10B981">Daily balance</text>
          </g>

          <!-- Technique 4: Deep Calm -->
          <g transform="translate(0, 198)">
            <rect x="0" y="0" width="302" height="58" rx="14" fill="#111B15" stroke="rgba(255,255,255,0.05)" />
            <circle cx="22" cy="29" r="6" fill="#10B981" />
            <text x="38" y="24" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Deep Calm</text>
            <text x="38" y="42" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">Slow paced abdominal breathing</text>
            <text x="290" y="32" text-anchor="end" font-family="sans-serif" font-size="8.5" fill="#10B981">Stress relief</text>
          </g>

          <!-- Technique 5: Energize -->
          <g transform="translate(0, 264)">
            <rect x="0" y="0" width="302" height="58" rx="14" fill="#111B15" stroke="rgba(255,255,255,0.05)" />
            <circle cx="22" cy="29" r="6" fill="#10B981" />
            <text x="38" y="24" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Energize</text>
            <text x="38" y="42" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">Rapid bellows breathing for focus</text>
            <text x="290" y="32" text-anchor="end" font-family="sans-serif" font-size="8.5" fill="#10B981">Vitality</text>
          </g>
        </g>
      </g>
    </g>
  </g>

  <!-- RIGHT PHONE: Bee Breath Inhale Circle 04:57 -->
  <g transform="translate(980, 590) rotate(6) translate(-980, -590)" filter="url(#phoneShadow)">
    <g transform="translate(800, 220)">
      <rect x="0" y="0" width="370" height="740" rx="46" fill="#181B22" stroke="url(#titaniumBezel)" stroke-width="4" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="#080E0B" />
      <rect x="10" y="10" width="350" height="720" rx="38" fill="url(#glassReflection)" />
      <rect x="125" y="22" width="100" height="24" rx="12" fill="#000000" />
      <circle cx="210" cy="34" r="4.5" fill="#1F2937" />

      <g transform="translate(24, 75)">
        <text x="0" y="22" font-family="sans-serif" font-size="14" fill="#9CA3AF">✕</text>
        <text x="151" y="22" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="15" fill="#FFFFFF">Bee Breath</text>
        <text x="151" y="38" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#9CA3AF">Round 1 of 25</text>

        <!-- Big Concentric Pulsing Breathing Rings -->
        <g transform="translate(151, 230)">
          <circle cx="0" cy="0" r="105" fill="none" stroke="rgba(16,185,129,0.15)" stroke-width="3" />
          <circle cx="0" cy="0" r="85" fill="rgba(16,185,129,0.25)" />
          <circle cx="0" cy="0" r="55" fill="#34D399" />
          <text x="0" y="5" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="#064E3B">Inhale</text>
        </g>

        <!-- Timer: 04:57 -->
        <g transform="translate(151, 380)">
          <text x="0" y="0" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="36" fill="#FFFFFF">04:57</text>
          <text x="0" y="24" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#9CA3AF">Inhale for 4 seconds</text>
        </g>

        <!-- Pause Button -->
        <g transform="translate(151, 460)">
          <circle cx="0" cy="0" r="25" fill="#14241B" stroke="rgba(52,211,153,0.3)" stroke-width="2" />
          <text x="0" y="6" text-anchor="middle" font-size="14" fill="#FFFFFF">❚❚</text>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

async function buildAll() {
  console.log('Generating exact shots.so PNG images matching user uploads...');

  await sharp(Buffer.from(svg931))
    .png({ quality: 98 })
    .toFile(path.join(publicDir, '931shots_so.png'));
  console.log('✓ Generated 931shots_so.png');

  await sharp(Buffer.from(svg967))
    .png({ quality: 98 })
    .toFile(path.join(publicDir, '967shots_so.png'));
  console.log('✓ Generated 967shots_so.png');

  await sharp(Buffer.from(svg996))
    .png({ quality: 98 })
    .toFile(path.join(publicDir, '996shots_so.png'));
  console.log('✓ Generated 996shots_so.png');

  console.log('All images generated successfully in /public!');
}

buildAll().catch(console.error);
