import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px)');
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      const maxDist = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < maxDist) {
        const moveX = distX / strength;
        const moveY = distY / strength;
        setTransition(activeTransition);
        setTransform(`translate3d(${moveX}px, ${moveY}px, 0px)`);
      } else {
        setTransition(inactiveTransition);
        setTransform('translate3d(0px, 0px, 0px)');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={containerRef}
      style={{
        transform,
        transition,
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const ReadingWord: React.FC<{
  children: string;
  progress: any;
  range: [number, number];
}> = React.memo(({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const color = useTransform(progress, range, ['rgba(148, 163, 184, 0.45)', '#FFFFFF']);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block will-change-[opacity,color]"
    >
      {children}
    </motion.span>
  );
});

export const AnimatedText: React.FC<AnimatedTextProps> = React.memo(({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const words = text.split(' ');

  return (
    <p
      ref={containerRef}
      className={`leading-relaxed text-center flex flex-wrap justify-center gap-x-1.5 gap-y-1 select-none ${className}`}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + (1.2 / words.length));
        return (
          <ReadingWord
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
          >
            {word}
          </ReadingWord>
        );
      })}
    </p>
  );
});

/* 
  Hero Animated Title with Letter-by-Letter Reveal & Initial Focus Zoom 
  Gives that "text read/focus" effect where it zooms slightly in focus then settles into place
*/
interface HeroRevealingTitleProps {
  text: string;
  className?: string;
}

export const HeroRevealingTitle: React.FC<HeroRevealingTitleProps> = ({ text, className = '' }) => {
  const letters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0, scale: 1.15, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.1,
        ease: 'easeOut' as const,
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      filter: 'blur(6px)',
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex items-center justify-center tracking-tight leading-none uppercase font-black whitespace-nowrap select-none ${className}`}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block hero-heading"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};
