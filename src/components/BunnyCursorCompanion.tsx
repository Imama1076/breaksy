import React, { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export const BunnyCursorCompanion: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on desktop/pointer devices to keep mobile scrolling buttery smooth
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const sparkles: Sparkle[] = [];
    const colors = ['#FFEAA5', '#C084FC', '#93C5FD', '#FDE047', '#86EFAC'];
    let lastX = 0;
    let lastY = 0;
    let animId: number | null = null;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const p = sparkles[i];
        p.opacity -= 0.032;
        p.y += p.vy;
        p.x += p.vx;

        if (p.opacity <= 0.04) {
          sparkles.splice(i, 1);
          continue;
        }

        const radius = Math.max(0.6, p.size * p.opacity);

        // Fast GPU-composited outer halo (replaces CPU-bound shadowBlur)
        ctx.globalAlpha = p.opacity * 0.35;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Bright inner core
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (sparkles.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    };

    const spawnSparkle = (x: number, y: number) => {
      if (sparkles.length > 20) return;
      sparkles.push({
        x: x + (Math.random() * 8 - 4),
        y: y + 8 + (Math.random() * 6 - 3),
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.25,
        size: Math.random() * 2.8 + 2.2,
        opacity: 0.9,
        color: colors[Math.floor(Math.random() * colors.length)],
      });

      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = Math.abs(e.clientX - lastX);
      const dy = Math.abs(e.clientY - lastY);
      if (dx + dy > 24) {
        lastX = e.clientX;
        lastY = e.clientY;
        spawnSparkle(e.clientX, e.clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 4; i++) {
        sparkles.push({
          x: e.clientX + (Math.random() * 18 - 9),
          y: e.clientY + (Math.random() * 18 - 9),
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 3 + 2,
          opacity: 1,
          color: colors[i % colors.length],
        });
      }
      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handleClick, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handleClick);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ willChange: 'contents' }}
    />
  );
});
