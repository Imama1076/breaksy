import React from 'react';
import { X, Play, ShieldCheck } from 'lucide-react';
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
        className="relative w-full max-w-lg bg-[#101222] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
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
            Get Breaksy for Android
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-sm">
            100% free during public release with all mindful friction features unlocked.
          </p>
        </div>

        <div className="space-y-4">
          {/* Android Google Play Card */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-purple-950/30 to-indigo-950/40 border border-emerald-500/30 text-left select-none shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Play className="w-7 h-7 fill-current" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-bold block">
                Available Now
              </span>
              <span className="text-xl font-black text-white block">
                Google Play Store
              </span>
              <span className="text-xs text-slate-300 block mt-0.5">
                Compatible with all modern Android smartphones & tablets
              </span>
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>No account required • 100% on device privacy guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
