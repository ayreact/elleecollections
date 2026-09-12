'use client';

import { useStore, useTotalItems, useSubtotal } from '@/store/store';
import { formatCurrency } from '@/lib/utils';

export default function BottomBar() {
  const openCart = useStore((s) => s.openCart);
  const totalItems = useTotalItems();
  const subtotal = useSubtotal();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 max-w-[440px] mx-auto bg-[#faf8f5]/90 backdrop-blur-md border-t border-stone-200/80 px-5 py-3 z-30 flex items-center justify-between shadow-lg">
      <div className="flex flex-col">
        <span className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">
          Bag Subtotal
        </span>
        <span className="font-sans font-bold text-stone-900 text-sm">
          {formatCurrency(subtotal)}
        </span>
      </div>
      <button
        className="bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 text-amber-50 px-4 py-2.5 rounded-xl font-medium text-xs flex items-center space-x-2 shadow-sm tap-highlight-transparent transition-all active:scale-[0.98]"
        onClick={openCart}
      >
        <span>View Bag &amp; Order</span>
        <span className="bg-emerald-800 text-amber-200 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
          {totalItems}
        </span>
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}
