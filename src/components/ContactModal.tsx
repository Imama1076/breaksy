import React from 'react';
import { X, Apple, Play } from 'lucide-react';
import { BreaksyLogo } from './BreaksyLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-[#101222] border border-white/10 rounded-3xl p-5 sm:p-8 md:p-10 text-white shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close download modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <BreaksyLogo size="lg" showText={false} className="mb-4" />
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Get Breaksy Today
          </h2>
        </div>

        <div className="space-y-4">
          {/* Download Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* iOS */}
            <div
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left select-none cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                <Apple className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">
                  Download on
                </span>
                <span className="text-lg font-bold text-white block">
                  Apple App Store
                </span>
              </div>
            </div>

            {/* Android */}
            <div
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left select-none cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">
                  Get it on
                </span>
                <span className="text-lg font-bold text-white block">
                  Google Play Store
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
