'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if available
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 min-h-[70vh]">
      <div className="w-20 h-20 rounded-full bg-stone-100/80 text-stone-600 flex items-center justify-center border border-stone-200 shadow-sm">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <div className="space-y-2 max-w-sm mx-auto">
        <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
          Pardon the Interruption
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          We are currently updating our boutique catalog or experiencing a temporary connection issue. Please check back shortly.
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 active:scale-95 text-white text-xs font-semibold tracking-wide rounded-xl transition-all shadow-md"
      >
        Try Again
      </button>
    </div>
  );
}
