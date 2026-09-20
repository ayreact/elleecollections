import React from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, message, icon, actionText, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-3xl border border-stone-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] mb-8">
      <div className="relative mb-5">
        <div className="w-20 h-20 rounded-full bg-emerald-900/5 text-emerald-800 flex items-center justify-center border border-emerald-900/10">
          {icon || (
            <svg className="w-10 h-10 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          )}
        </div>
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-[#c5a059]">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
          </svg>
        </span>
      </div>
      
      <h3 className="font-serif text-xl font-semibold text-stone-900 tracking-tight mb-2.5">
        {title}
      </h3>
      <p className="text-xs text-stone-500 max-w-[260px] leading-relaxed mb-7">
        {message}
      </p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="w-full max-w-[200px] py-3 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-950/15 transition-all group"
        >
          <span>{actionText}</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      )}
    </div>
  );
}
