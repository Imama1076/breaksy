const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outPath = '/app/applet/public/156shots_so.png';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200">
  <defs>
    <!-- Soft realistic floor shadow -->
    <filter id="floorShadow" x="-30%" y="-30%" width="160%" height="180%">
      <feGaussianBlur stdDeviation="35" result="blur" />
      <feColorMatrix type="matrix" values="0 0 0 0 0.1   0 0 0 0 0.1   0 0 0 0 0.15  0 0 0 0.35 0" />
    </filter>

    <filter id="contactShadow" x="-20%" y="-20%" width="140%" height="160%">
      <feGaussianBlur stdDeviation="15" result="blur" />
      <feColorMatrix type="matrix" values="0 0 0 0 0.05   0 0 0 0 0.05   0 0 0 0 0.08  0 0 0 0.6 0" />
    </filter>

    <!-- Phone 3D Shadow -->
    <filter id="phoneShadow" x="-30%" y="-20%" width="160%" height="150%">
      <feDropShadow dx="0" dy="25" stdDeviation="30" flood-color="#000000" flood-opacity="0.35" />
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.2" />
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

    <linearGradient id="centerScreenGrad" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="#1A1A2E" />
      <stop offset="45%" stop-color="#121224" />
      <stop offset="100%" stop-color="#090914" />
    </linearGradient>

    <radialGradient id="flowerGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#818CF8" stop-opacity="0.5" />
      <stop offset="50%" stop-color="#A855F7" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#0E0F1E" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="appIconGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3B3566" />
      <stop offset="50%" stop-color="#2D2852" />
      <stop offset="100%" stop-color="#181530" />
    </linearGradient>
  </defs>

  <!-- Clean Canvas Background matching shots.so export -->
  <rect width="1600" height="1200" fill="#FFFFFF" />

  <!-- Ambient Floor Shadows under all 3 phones -->
  <ellipse cx="800" cy="990" rx="640" ry="110" fill="#000000" filter="url(#floorShadow)" />
  <ellipse cx="800" cy="940" rx="540" ry="70" fill="#000000" filter="url(#contactShadow)" />

  <!-- ========================================== -->
  <!-- 1. LEFT PHONE: "What Habits you want to change?" -->
  <!-- ========================================== -->
  <g transform="translate(480, 560) rotate(-11) translate(-480, -560)" filter="url(#phoneShadow)">
    <g transform="translate(230, 210)">
      <!-- Outer Frame -->
      <rect x="0" y="0" width="370" height="740" rx="46" fill="#181B22" stroke="url(#titaniumBezel)" stroke-width="4" />
      <!-- Glass Screen Area -->
      <rect x="10" y="10" width="350" height="720" rx="38" fill="#0E0F16" />
      <!-- Specular Gloss -->
      <rect x="10" y="10" width="350" height="720" rx="38" fill="url(#glassReflection)" />
      
      <!-- Dynamic Island with camera lens -->
      <rect x="125" y="22" width="100" height="24" rx="12" fill="#000000" />
      <circle cx="210" cy="34" r="4.5" fill="#1F2937" />

      <!-- Screen Content -->
      <g transform="translate(24, 75)">
        <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">What Habits you want to</text>
        <text x="0" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">change ?</text>

        <!-- Grid of 6 Cards -->
        <!-- Card 1: Scrolling Addiction (White Card) -->
        <g transform="translate(0, 70)">
          <rect x="0" y="0" width="144" height="110" rx="18" fill="#FFFFFF" />
          <rect x="14" y="14" width="16" height="24" rx="3" fill="#000000" />
          <rect x="16" y="17" width="12" height="15" fill="#FFFFFF" />
          <circle cx="22" cy="34" r="1.5" fill="#000000" />
          <circle cx="34" cy="14" r="4" fill="#EF4444" />
          <text x="14" y="62" font-family="sans-serif" font-weight="bold" font-size="12" fill="#000000">Scrolling</text>
          <text x="14" y="77" font-family="sans-serif" font-weight="bold" font-size="12" fill="#000000">Addiction</text>
          <text x="14" y="93" font-family="sans-serif" font-size="8.5" fill="#6B7280">Remove the scrolling</text>
          <text x="14" y="103" font-family="sans-serif" font-size="8.5" fill="#6B7280">addiction</text>
        </g>

        <!-- Card 2: Mind Focus -->
        <g transform="translate(158, 70)">
          <rect x="0" y="0" width="144" height="110" rx="18" fill="#1A1C24" stroke="rgba(255,255,255,0.06)" />
          <circle cx="24" cy="26" r="10" fill="none" stroke="#FFFFFF" stroke-width="2" />
          <circle cx="24" cy="26" r="5" fill="none" stroke="#FFFFFF" stroke-width="2" />
          <circle cx="24" cy="26" r="2" fill="#FFFFFF" />
          <text x="14" y="68" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Mind Focus</text>
          <text x="14" y="90" font-family="sans-serif" font-size="9" fill="#9CA3AF">Increase the focus</text>
        </g>

        <!-- Card 3: Using phone in bed -->
        <g transform="translate(0, 195)">
          <rect x="0" y="0" width="144" height="110" rx="18" fill="#1A1C24" stroke="rgba(255,255,255,0.06)" />
          <circle cx="24" cy="22" r="4" fill="#FFFFFF" />
          <path d="M 16 35 C 16 28 32 28 32 35" stroke="#FFFFFF" stroke-width="2" fill="none" />
          <text x="14" y="60" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Using phone in</text>
          <text x="14" y="75" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">bed</text>
          <text x="14" y="93" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">Reduce phone habit</text>
          <text x="14" y="103" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">first time in morning</text>
        </g>

        <!-- Card 4: X Addiction -->
        <g transform="translate(158, 195)">
          <rect x="0" y="0" width="144" height="110" rx="18" fill="#1A1C24" stroke="rgba(255,255,255,0.06)" />
          <circle cx="24" cy="26" r="10" fill="none" stroke="#FFFFFF" stroke-width="2" />
          <text x="24" y="30" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="10" fill="#FFFFFF">18+</text>
          <text x="14" y="68" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">X Addiction</text>
          <text x="14" y="88" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">Remove the adult</text>
          <text x="14" y="99" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">videos addiction</text>
        </g>

        <!-- Card 5: Screen Time -->
        <g transform="translate(0, 320)">
          <rect x="0" y="0" width="144" height="100" rx="18" fill="#1A1C24" stroke="rgba(255,255,255,0.06)" />
          <circle cx="24" cy="24" r="8" fill="none" stroke="#FFFFFF" stroke-width="2" />
          <polyline points="24,19 24,24 28,24" stroke="#FFFFFF" stroke-width="1.8" fill="none" />
          <text x="14" y="58" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Screen Time</text>
          <text x="14" y="78" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">Reduce the screen time</text>
        </g>

        <!-- Card 6: Improve Sleep -->
        <g transform="translate(158, 320)">
          <rect x="0" y="0" width="144" height="100" rx="18" fill="#1A1C24" stroke="rgba(255,255,255,0.06)" />
          <path d="M 28 18 A 8 8 0 1 0 32 30 A 7 7 0 1 1 28 18 Z" fill="#FFFFFF" />
          <text x="14" y="58" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Improve Sleep</text>
          <text x="14" y="78" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">Reduce the phone habit</text>
          <text x="14" y="89" font-family="sans-serif" font-size="8.5" fill="#9CA3AF">at night</text>
        </g>

        <!-- Next Button -->
        <g transform="translate(0, 480)">
          <rect x="0" y="0" width="302" height="48" rx="24" fill="#FFFFFF" />
          <text x="151" y="30" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="#000000">Next</text>
        </g>
      </g>
    </g>
  </g>

  <!-- ========================================== -->
  <!-- 2. RIGHT PHONE: "Hello, sara 👋" with Cosmic Flower -->
  <!-- ========================================== -->
  <g transform="translate(1120, 560) rotate(11) translate(-1120, -560)" filter="url(#phoneShadow)">
    <g transform="translate(990, 210)">
      <!-- Outer Frame -->
      <rect x="0" y="0" width="370" height="740" rx="46" fill="#181B22" stroke="url(#titaniumBezel)" stroke-width="4" />
      <!-- Glass Screen Area -->
      <rect x="10" y="10" width="350" height="720" rx="38" fill="#0D0E16" />
      <!-- Specular Gloss -->
      <rect x="10" y="10" width="350" height="720" rx="38" fill="url(#glassReflection)" />

      <!-- Dynamic Island -->
      <rect x="125" y="22" width="100" height="24" rx="12" fill="#000000" />
      <circle cx="210" cy="34" r="4.5" fill="#1F2937" />

      <!-- Screen Content -->
      <g transform="translate(24, 70)">
        <text x="0" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="19" fill="#FFFFFF">Hello, sara 👋</text>
        <text x="0" y="42" font-family="sans-serif" font-size="11" fill="#9CA3AF">Stay focused, live better.</text>

        <!-- Cosmic Flower Crystal Graphic -->
        <g transform="translate(150, 115)">
          <circle cx="0" cy="0" r="85" fill="url(#flowerGlow)" />
          
          <!-- Outer Petals (Lotus Crystal) -->
          <path d="M 0,-55 C 25,-40 40,-15 35,15 C 20,40 -20,40 -35,15 C -40,-15 -25,-40 0,-55 Z" fill="#6366F1" opacity="0.8" />
          <path d="M -45,-30 C -20,-45 15,-40 35,-20 C 50,10 25,45 -5,40 C -35,35 -55,0 -45,-30 Z" fill="#8B5CF6" opacity="0.7" />
          <path d="M 45,-30 C 55,0 35,35 5,40 C -25,45 -50,10 -35,-20 C -15,-40 20,-45 45,-30 Z" fill="#06B6D4" opacity="0.65" />
          
          <!-- Inner Crystal Shards -->
          <polygon points="0,-35 15,-10 0,15 -15,-10" fill="#E0E7FF" opacity="0.95" />
          <polygon points="-25,-5 0,-15 -10,12" fill="#A5F3FC" opacity="0.9" />
          <polygon points="25,-5 10,12 0,-15" fill="#C4B5FD" opacity="0.9" />
          <circle cx="0" cy="0" r="10" fill="#FDE047" />
          <circle cx="0" cy="0" r="5" fill="#F59E0B" />
        </g>

        <text x="150" y="220" text-anchor="middle" font-family="sans-serif" font-size="10.5" fill="#A5B4FC">Tap To Check Your Next Flower</text>

        <!-- Today's Progress Box -->
        <g transform="translate(0, 240)">
          <rect x="0" y="0" width="302" height="65" rx="16" fill="#161822" stroke="rgba(255,255,255,0.06)" />
          <text x="16" y="26" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Today's Progress</text>
          <text x="16" y="46" font-family="sans-serif" font-size="10" fill="#9CA3AF">Keep going! You're doing great.</text>
          
          <!-- Circular Progress 25% -->
          <g transform="translate(260, 32)">
            <circle cx="0" cy="0" r="18" fill="none" stroke="#2D3142" stroke-width="3.5" />
            <circle cx="0" cy="0" r="18" fill="none" stroke="#818CF8" stroke-width="3.5" stroke-dasharray="113" stroke-dashoffset="85" stroke-linecap="round" transform="rotate(-90)" />
            <text x="0" y="4" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="9" fill="#FFFFFF">25%</text>
          </g>
        </g>

        <!-- Stats 2x2 Grid -->
        <g transform="translate(0, 318)">
          <rect x="0" y="0" width="144" height="65" rx="14" fill="#161822" stroke="rgba(255,255,255,0.05)" />
          <text x="12" y="22" font-family="sans-serif" font-size="9.5" fill="#9CA3AF">Screen Time</text>
          <text x="12" y="46" font-family="sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF">2h 15m</text>

          <rect x="158" y="0" width="144" height="65" rx="14" fill="#161822" stroke="rgba(255,255,255,0.05)" />
          <text x="12" y="22" font-family="sans-serif" font-size="9.5" fill="#9CA3AF">App Blocked</text>
          <text x="12" y="46" font-family="sans-serif" font-size="11" fill="#818CF8">🔒 Enable</text>

          <rect x="0" y="75" width="144" height="65" rx="14" fill="#161822" stroke="rgba(255,255,255,0.05)" />
          <text x="12" y="22" font-family="sans-serif" font-size="9.5" fill="#9CA3AF">Sessions</text>
          <text x="12" y="46" font-family="sans-serif" font-size="10" fill="#9CA3AF">from yesterday</text>

          <rect x="158" y="75" width="144" height="65" rx="14" fill="#161822" stroke="rgba(255,255,255,0.05)" />
          <text x="12" y="22" font-family="sans-serif" font-size="9.5" fill="#9CA3AF">Time Saved</text>
          <text x="12" y="46" font-family="sans-serif" font-size="11" fill="#818CF8">🔒 Enable</text>
        </g>

        <!-- Blocked Apps bar -->
        <g transform="translate(0, 475)">
          <text x="0" y="16" font-family="sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Blocked Apps</text>
          <rect x="210" y="0" width="92" height="24" rx="12" fill="#4338CA" />
          <text x="256" y="16" text-anchor="middle" font-family="sans-serif" font-weight="600" font-size="9.5" fill="#FFFFFF">Block Apps</text>
        </g>

        <!-- Bottom Navigation Bar -->
        <g transform="translate(0, 515)">
          <rect x="-10" y="0" width="322" height="35" fill="none" />
          <text x="40" y="22" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#9CA3AF">Activities</text>
          <text x="150" y="22" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#818CF8" font-weight="bold">Focus</text>
          <text x="260" y="22" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#9CA3AF">Settings</text>
        </g>
      </g>
    </g>
  </g>

  <!-- ========================================== -->
  <!-- 3. CENTER PHONE: BREAKSY HERO (Front & Center) -->
  <!-- ========================================== -->
  <g filter="url(#phoneShadow)">
    <g transform="translate(610, 160)">
      <!-- Outer Phone Bezel -->
      <rect x="0" y="0" width="380" height="770" rx="52" fill="#161820" stroke="url(#titaniumBezel)" stroke-width="4.5" />
      <!-- Glass Screen Area -->
      <rect x="12" y="12" width="356" height="746" rx="42" fill="url(#centerScreenGrad)" />
      <!-- Specular Gloss -->
      <rect x="12" y="12" width="356" height="746" rx="42" fill="url(#glassReflection)" />
      
      <!-- Dynamic Island with camera lens -->
      <rect x="130" y="26" width="120" height="28" rx="14" fill="#000000" />
      <circle cx="225" cy="40" r="5" fill="#1F2937" />

      <!-- Center Mascot App Icon -->
      <g transform="translate(133, 310)">
        <rect x="0" y="0" width="114" height="114" rx="28" fill="url(#appIconGrad)" stroke="rgba(167,139,250,0.35)" stroke-width="1.5" />
        
        <!-- Cloud underneath -->
        <ellipse cx="57" cy="74" rx="36" ry="14" fill="#585187" opacity="0.85" />
        <ellipse cx="44" cy="70" rx="16" ry="10" fill="#6D659E" />
        <ellipse cx="70" cy="70" rx="18" ry="11" fill="#6D659E" />
        
        <!-- Mascot Head -->
        <ellipse cx="57" cy="56" rx="20" ry="17" fill="#7C72B8" />
        <!-- Sleeping Eyes -->
        <path d="M 47 55 Q 51 60 55 55" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" />
        <path d="M 59 55 Q 63 60 67 55" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" />
        <ellipse cx="57" cy="62" rx="2" ry="1.4" fill="#F472B6" />

        <!-- Crescent Moon & Leaf in Mascot Icon -->
        <path d="M 80 32 A 6 6 0 1 0 85 43 A 5 5 0 1 1 80 32 Z" fill="#FDE047" />
        <path d="M 36 38 C 30 32 32 24 38 24 C 42 24 44 32 36 38 Z" fill="#34D399" />
        <circle cx="75" cy="24" r="1.5" fill="#FFFFFF" />
      </g>

      <!-- App Title: Breaksy -->
      <text x="190" y="475" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="34" fill="#FFFFFF" letter-spacing="1">Breaksy</text>
    </g>
  </g>
</svg>
`;

async function build() {
  await sharp(Buffer.from(svg))
    .png({ quality: 98 })
    .toFile(outPath);
  console.log('✓ Successfully generated 156shots_so.png on exact clean white background');
}

build().catch(console.error);
