'use client';

import { useStore } from '@/store/store';

export default function WhatsAppLoadingOverlay() {
  const isLoading = useStore((s) => s.isWhatsAppLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-[#faf8f5]/85 backdrop-blur-md flex items-center justify-center animate-backdrop-in px-6">
      
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-stone-200/60 p-8 flex flex-col items-center text-center relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-stone-50/80 pointer-events-none" />

        <div className="relative w-24 h-24 mb-6 z-10">
          <div className="absolute inset-0 flex items-center justify-center bg-stone-50 rounded-full border border-stone-100 shadow-inner">
            <svg className="w-10 h-10 text-[#25D366] drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 17.89c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.12 8.12 0 01-1.25-4.32c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4 1.55 1.55 2.4 3.6 2.4 5.79 0 4.51-3.67 8.17-8.18 8.17z" />
            </svg>
          </div>

          <svg className="absolute inset-0 w-full h-full text-emerald-800 spin-luxury drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" strokeOpacity="0.1" />
            <path d="M50 2 A48 48 0 0 1 98 50" stroke="url(#emeraldGradient)" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 98 A48 48 0 0 1 2 50" stroke="url(#emeraldGradient)" strokeWidth="4" strokeLinecap="round" />
            
            <defs>
              <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="100%" stopColor="#c5a059" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 className="font-serif text-xl font-bold text-stone-900 mb-2 z-10 tracking-tight leading-tight">
          Preparing your order <br />for WhatsApp...
        </h2>
        <p className="text-xs text-stone-500 font-medium max-w-[220px] mb-8 z-10 leading-relaxed">
          Compiling your bespoke selections into a structured message.
        </p>

        <div className="bg-stone-100 border border-stone-200/80 rounded-full px-4 py-2 flex items-center space-x-2.5 shadow-sm z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-stone-600">
            Connecting to Concierge Handoff
          </span>
        </div>

        <div className="mt-8 pt-4 border-t border-stone-100 w-full flex items-center justify-center space-x-1.5 z-10 text-stone-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            Encrypted &amp; Frictionless Guest Experience
          </span>
        </div>
      </div>
    </div>
  );
}
