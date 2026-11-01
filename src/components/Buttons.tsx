import React from 'react';

interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = 'Contact',
  onClick,
  className = '',
  href,
  size = 'md',
}) => {
  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {label}
    </span>
  );

  const style: React.CSSProperties = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
    outline: '2px solid rgba(255, 255, 255, 0.95)',
    outlineOffset: '-3px',
  };

  const sizeClasses =
    size === 'lg'
      ? 'px-6 py-3 sm:px-8 sm:py-3.5 md:px-9 md:py-4 text-xs sm:text-sm md:text-base font-bold'
      : size === 'sm'
      ? 'px-4 py-1.5 sm:px-5 sm:py-2 text-xs'
      : 'px-5 py-2.5 sm:px-6 sm:py-2.5 md:px-7 md:py-2.5 text-xs sm:text-sm';

  const commonClasses = `whitespace-nowrap shrink-0 rounded-full text-white font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] ${sizeClasses} inline-flex items-center justify-center cursor-pointer select-none ${className}`;

  if (href) {
    return (
      <a href={href} style={style} className={commonClasses} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" style={style} className={commonClasses} onClick={onClick}>
      {content}
    </button>
  );
};

export const LiveProjectButton: React.FC<{
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}> = ({ label = 'Live Project', onClick, href, className = '' }) => {
  const commonClasses = `rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors inline-flex items-center justify-center cursor-pointer select-none ${className}`;

  if (href) {
    return (
      <a href={href} className={commonClasses} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" className={commonClasses} onClick={onClick}>
      {label}
    </button>
  );
};
