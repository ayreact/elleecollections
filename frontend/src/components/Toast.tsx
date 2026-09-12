'use client';

import { useStore } from '@/store/store';

export default function Toast() {
  const toast = useStore((s) => s.toast);

  return (
    <div
      className={`fixed top-14 left-1/2 -translate-x-1/2 z-[60] bg-stone-900 text-stone-100 text-xs px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 ${
        toast.visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
      <span>{toast.message}</span>
    </div>
  );
}
