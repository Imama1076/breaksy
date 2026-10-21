#!/bin/bash
set -e
mkdir -p public

echo "Generating shots.so preview images for Breaksy..."

# Slide 1: 270shots_so.png - Reflex Interceptor
convert -size 1200x800 gradient:"#0D1238-#07091B" \
  -fill "#14193F" -stroke "#6366F1" -strokewidth 2 -draw "roundrectangle 420,80 780,720 40,40" \
  -stroke none \
  -fill "#090B1E" -draw "roundrectangle 435,100 765,700 32,32" \
  -fill "#1E2248" -draw "roundrectangle 530,110 670,130 10,10" \
  -fill "#6366F1" -pointsize 14 -gravity northwest -annotate +470+150 "01 REFLEX INTERCEPT" \
  -fill "#FFFFFF" -pointsize 24 -annotate +470+190 "Take a Breath" \
  -fill "#94A3B8" -pointsize 14 -annotate +470+225 "Pause before opening Instagram" \
  -fill "rgba(99,102,241,0.2)" -stroke "#818CF8" -strokewidth 3 -draw "circle 600,380 600,470" \
  -stroke none -fill "#FFFFFF" -pointsize 48 -gravity center -annotate +0-20 "0:05" \
  -fill "#C7D2FE" -pointsize 14 -annotate +0+35 "Inhale serenity..." \
  -fill "#4F46E5" -draw "roundrectangle 460,540 740,590 16,16" \
  -fill "#FFFFFF" -pointsize 15 -annotate +0+165 "Return to Focus" \
  -fill "#64748B" -pointsize 12 -annotate +0+220 "Hold 5s to bypass" \
  public/270shots_so.png

# Slide 2: 998shots_so.png - Micro-Hurdle Engine
convert -size 1200x800 gradient:"#130E2E-#080616" \
  -fill "#1D1645" -stroke "#A855F7" -strokewidth 2 -draw "roundrectangle 420,80 780,720 40,40" \
  -stroke none \
  -fill "#0A071E" -draw "roundrectangle 435,100 765,700 32,32" \
  -fill "#261D59" -draw "roundrectangle 530,110 670,130 10,10" \
  -fill "#C084FC" -pointsize 14 -gravity northwest -annotate +470+150 "02 MICRO-HURDLE" \
  -fill "#FFFFFF" -pointsize 24 -annotate +470+190 "Cognitive Friction" \
  -fill "#94A3B8" -pointsize 14 -annotate +470+225 "Unscramble word to open app" \
  -fill "#1A153E" -stroke "#A855F7" -strokewidth 1 -draw "roundrectangle 460,280 740,360 16,16" \
  -stroke none -fill "#FDE047" -pointsize 32 -gravity center -annotate +0-60 "F O C U S" \
  -fill "#9333EA" -draw "roundrectangle 460,420 540,470 12,12" \
  -fill "#9333EA" -draw "roundrectangle 560,420 640,470 12,12" \
  -fill "#9333EA" -draw "roundrectangle 660,420 740,470 12,12" \
  -fill "#FFFFFF" -pointsize 16 -annotate -100+45 "C" \
  -fill "#FFFFFF" -pointsize 16 -annotate +0+45 "U" \
  -fill "#FFFFFF" -pointsize 16 -annotate +100+45 "S" \
  -fill "#A855F7" -draw "roundrectangle 460,540 740,590 16,16" \
  -fill "#FFFFFF" -pointsize 15 -annotate +0+165 "Verify & Unlock" \
  public/998shots_so.png

# Slide 3: 526shots_so.png - Atmospheric Vibe Locks
convert -size 1200x800 gradient:"#1C1309-#0C0804" \
  -fill "#2A1D0E" -stroke "#F59E0B" -strokewidth 2 -draw "roundrectangle 420,80 780,720 40,40" \
  -stroke none \
  -fill "#110B05" -draw "roundrectangle 435,100 765,700 32,32" \
  -fill "#382613" -draw "roundrectangle 530,110 670,130 10,10" \
  -fill "#FBBF24" -pointsize 14 -gravity northwest -annotate +470+150 "03 VIBE LOCK" \
  -fill "#FFFFFF" -pointsize 24 -annotate +470+190 "Deep Starlight" \
  -fill "#D97706" -pointsize 14 -annotate +470+225 "Lo-Fi Rain & Binaural Focus" \
  -fill "#FFFFFF" -pointsize 64 -gravity center -annotate +0-50 "45:00" \
  -fill "#FDE68A" -pointsize 14 -annotate +0+10 "Vibe Lock Active - Do Not Disturb" \
  -fill "#24170A" -stroke "#F59E0B" -strokewidth 1 -draw "roundrectangle 460,420 740,500 16,16" \
  -stroke none -fill "#FFFFFF" -pointsize 13 -gravity center -annotate +0+60 "Sound: Rain on Tent (70%)" \
  -fill "#D97706" -draw "roundrectangle 460,540 740,590 16,16" \
  -fill "#FFFFFF" -pointsize 15 -annotate +0+165 "End Session Gently" \
  public/526shots_so.png

# Slide 4: 996shots_so.png - Crystal Habit Garden
convert -size 1200x800 gradient:"#08171A-#030A0B" \
  -fill "#0E2429" -stroke "#10B981" -strokewidth 2 -draw "roundrectangle 420,80 780,720 40,40" \
  -stroke none \
  -fill "#041113" -draw "roundrectangle 435,100 765,700 32,32" \
  -fill "#143339" -draw "roundrectangle 530,110 670,130 10,10" \
  -fill "#34D399" -pointsize 14 -gravity northwest -annotate +470+150 "04 CRYSTAL GARDEN" \
  -fill "#FFFFFF" -pointsize 24 -annotate +470+190 "Biome Level 7" \
  -fill "#6EE7B7" -pointsize 14 -annotate +470+225 "14-Day Focus Streak" \
  -fill "#064E3B" -stroke "#10B981" -strokewidth 2 -draw "polygon 600,280 660,380 540,380" \
  -fill "#047857" -draw "polygon 600,340 680,440 520,440" \
  -stroke none -fill "#A7F3D0" -pointsize 28 -gravity center -annotate +0+60 "3h 24m Saved Today" \
  -fill "#6EE7B7" -pointsize 13 -annotate +0+95 "Unlocked: Celestite Prism" \
  -fill "#059669" -draw "roundrectangle 460,540 740,590 16,16" \
  -fill "#FFFFFF" -pointsize 15 -annotate +0+165 "Inspect Garden" \
  public/996shots_so.png

# Slide 5: 29shots_so.png - Circadian Sleep Sanctuary
convert -size 1200x800 gradient:"#09112A-#040814" \
  -fill "#13204A" -stroke "#3B82F6" -strokewidth 2 -draw "roundrectangle 420,80 780,720 40,40" \
  -stroke none \
  -fill "#060C1D" -draw "roundrectangle 435,100 765,700 32,32" \
  -fill "#1E2F68" -draw "roundrectangle 530,110 670,130 10,10" \
  -fill "#60A5FA" -pointsize 14 -gravity northwest -annotate +470+150 "05 SLEEP SANCTUARY" \
  -fill "#FFFFFF" -pointsize 24 -annotate +470+190 "Bedtime Shield" \
  -fill "#93C5FD" -pointsize 14 -annotate +470+225 "Phone locked until 07:30 AM" \
  -fill "#FDE68A" -stroke none -draw "circle 600,340 600,390" \
  -fill "#060C1D" -draw "circle 615,335 615,385" \
  -fill "#FFFFFF" -pointsize 28 -gravity center -annotate +0+50 "Deep Rest Mode" \
  -fill "#93C5FD" -pointsize 13 -annotate +0+85 "Melatonin Protection Active" \
  -fill "#2563EB" -draw "roundrectangle 460,540 740,590 16,16" \
  -fill "#FFFFFF" -pointsize 15 -annotate +0+165 "Emergency Access" \
  public/29shots_so.png

# Slide 6: 657shots_so.png - Behavioral Analytics
convert -size 1200x800 gradient:"#1B0A26-#0C0312" \
  -fill "#2D133D" -stroke "#EC4899" -strokewidth 2 -draw "roundrectangle 420,80 780,720 40,40" \
  -stroke none \
  -fill "#12061A" -draw "roundrectangle 435,100 765,700 32,32" \
  -fill "#421C59" -draw "roundrectangle 530,110 670,130 10,10" \
  -fill "#F472B6" -pointsize 14 -gravity northwest -annotate +470+150 "06 SCREEN ANALYTICS" \
  -fill "#FFFFFF" -pointsize 24 -annotate +470+190 "Weekly Attention" \
  -fill "#FBCFE8" -pointsize 14 -annotate +470+225 "-62% Doomscroll Hours" \
  -stroke "#EC4899" -strokewidth 3 -fill none \
  -draw "polyline 470,420 520,380 570,400 620,320 670,350 730,280" \
  -stroke none -fill "#FFFFFF" -pointsize 32 -gravity center -annotate +0+30 "2.1h Daily Avg" \
  -fill "#F472B6" -pointsize 13 -annotate +0+70 "Down from 5.4 hours (Week 1)" \
  -fill "#DB2777" -draw "roundrectangle 460,540 740,590 16,16" \
  -fill "#FFFFFF" -pointsize 15 -annotate +0+165 "Full Report" \
  public/657shots_so.png

# Slide 7: 967shots_so.png - Emergency Override
convert -size 1200x800 gradient:"#240B13-#0E0306" \
  -fill "#3B1421" -stroke "#F43F5E" -strokewidth 2 -draw "roundrectangle 420,80 780,720 40,40" \
  -stroke none \
  -fill "#17060B" -draw "roundrectangle 435,100 765,700 32,32" \
  -fill "#541D30" -draw "roundrectangle 530,110 670,130 10,10" \
  -fill "#FB7185" -pointsize 14 -gravity northwest -annotate +470+150 "07 MINDFUL OVERRIDE" \
  -fill "#FFFFFF" -pointsize 24 -annotate +470+190 "Emergency Gateway" \
  -fill "#FDA4AF" -pointsize 14 -annotate +470+225 "Intentional 30s reflection pause" \
  -fill "rgba(244,63,94,0.15)" -stroke "#F43F5E" -strokewidth 2 -draw "roundrectangle 470,280 730,420 20,20" \
  -stroke none -fill "#FFFFFF" -pointsize 44 -gravity center -annotate +0-45 "0:30" \
  -fill "#FDA4AF" -pointsize 14 -annotate +0+5 "Breathe deeply before unlock" \
  -fill "#E11D48" -draw "roundrectangle 460,540 740,590 16,16" \
  -fill "#FFFFFF" -pointsize 15 -annotate +0+165 "Confirm Urgent Access" \
  public/967shots_so.png

# Slide 8: 931shots_so.png - Precision App Rules
convert -size 1200x800 gradient:"#081726-#030A12" \
  -fill "#0E2840" -stroke "#06B6D4" -strokewidth 2 -draw "roundrectangle 420,80 780,720 40,40" \
  -stroke none \
  -fill "#05131F" -draw "roundrectangle 435,100 765,700 32,32" \
  -fill "#163D61" -draw "roundrectangle 530,110 670,130 10,10" \
  -fill "#22D3EE" -pointsize 14 -gravity northwest -annotate +470+150 "08 PRECISION RULES" \
  -fill "#FFFFFF" -pointsize 24 -annotate +470+190 "App Friction Sliders" \
  -fill "#67E8F9" -pointsize 14 -annotate +470+225 "Custom schedules per app" \
  -fill "#0B1D2D" -stroke "#06B6D4" -strokewidth 1 -draw "roundrectangle 460,280 740,335 12,12" \
  -stroke none -fill "#FFFFFF" -pointsize 14 -gravity northwest -annotate +480+298 "Instagram: Strict Zen (10s delay)" \
  -fill "#0B1D2D" -stroke "#06B6D4" -strokewidth 1 -draw "roundrectangle 460,350 740,405 12,12" \
  -stroke none -fill "#FFFFFF" -pointsize 14 -annotate +480+368 "TikTok: Puzzle Challenge" \
  -fill "#0B1D2D" -stroke "#06B6D4" -strokewidth 1 -draw "roundrectangle 460,420 740,475 12,12" \
  -stroke none -fill "#FFFFFF" -pointsize 14 -annotate +480+438 "X / Twitter: Vibe Lock after 8PM" \
  -fill "#0891B2" -draw "roundrectangle 460,540 740,590 16,16" \
  -fill "#FFFFFF" -pointsize 15 -gravity center -annotate +0+165 "Save Rules" \
  public/931shots_so.png

# Slide 9: 156shots_so.png - Nox Companion Widget
convert -size 1200x800 gradient:"#141026-#070512" \
  -fill "#241D42" -stroke "#FBBF24" -strokewidth 2 -draw "roundrectangle 420,80 780,720 40,40" \
  -stroke none \
  -fill "#0D0A1C" -draw "roundrectangle 435,100 765,700 32,32" \
  -fill "#332A5B" -draw "roundrectangle 530,110 670,130 10,10" \
  -fill "#FDE68A" -pointsize 14 -gravity northwest -annotate +470+150 "09 HOME WIDGET" \
  -fill "#FFFFFF" -pointsize 24 -annotate +470+190 "Nox Companion" \
  -fill "#FBBF24" -pointsize 14 -annotate +470+225 "Live Lockscreen & Desktop Widget" \
  -fill "#1E1838" -stroke "#A78BFA" -strokewidth 2 -draw "roundrectangle 460,280 740,460 20,20" \
  -stroke none -fill "#FFFFFF" -pointsize 20 -gravity center -annotate +0-60 "Nox is Asleep on Cloud" \
  -fill "#A78BFA" -pointsize 14 -annotate +0-25 "Focus Streak: 14 Days" \
  -fill "#D97706" -draw "roundrectangle 480,400 720,445 12,12" \
  -fill "#FFFFFF" -pointsize 14 -annotate +0+22 "Start 25m Focus Lock" \
  -fill "#F59E0B" -draw "roundrectangle 460,540 740,590 16,16" \
  -fill "#0F172A" -pointsize 15 -annotate +0+165 "Add Widget to Home" \
  public/156shots_so.png

echo "All 9 preview images created successfully in public/!"
ls -la public/*shots_so.png
