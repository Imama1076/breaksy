import React from 'react';

interface BreaksyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const BreaksyLogo: React.FC<BreaksyLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8 rounded-xl', font: 'text-lg', px: 32 },
    md: { icon: 'w-10 h-10 rounded-2xl', font: 'text-xl', px: 40 },
    lg: { icon: 'w-16 h-16 rounded-[22px]', font: 'text-3xl', px: 64 },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official Breaksy App Icon provided by User */}
      <img
        src="/breaksy-logo.webp"
        alt="Breaksy Icon"
        width={currentSize.px}
        height={currentSize.px}
        decoding="async"
        onError={(e) => {
          if (e.currentTarget.src.endsWith('.webp')) {
            e.currentTarget.src = '/breaksy-logo.png';
          }
        }}
        className={`${currentSize.icon} object-contain shadow-lg shadow-purple-950/60 hover:scale-105 transition-transform duration-200 shrink-0`}
      />

      {showText && (
        <span className={`font-black tracking-tight text-white uppercase heading-font ${currentSize.font}`}>
          Breaksy
        </span>
      )}
    </div>
  );
};
