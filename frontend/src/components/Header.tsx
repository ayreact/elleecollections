'use client';

import Link from 'next/link';
import { useStore, useTotalItems } from '@/store/store';

export default function Header() {
  const openMenu = useStore((s) => s.openMenu);
  const openCart = useStore((s) => s.openCart);
  const openSearch = useStore((s) => s.openSearch);
  const totalItems = useTotalItems();

  return (
    <header className="sticky top-0 z-30 bg-[#faf8f5]/90 backdrop-blur-md border-b border-stone-200/80 px-5 py-3.5 flex items-center justify-between transition-all">
      <div className="flex items-center space-x-3">
        <button
          aria-label="Open boutique menu"
          className="p-1.5 -ml-1.5 text-stone-700 hover:text-emerald-900 tap-highlight-transparent rounded-full active:bg-stone-200/60"
          onClick={openMenu}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
          </svg>
        </button>
        <Link href="/" className="flex flex-col">
          <span className="font-serif text-xl tracking-wider font-semibold text-emerald-950 uppercase leading-none">
            Ellee
          </span>
          <span className="text-[9px] uppercase tracking-[0.26em] text-stone-400 font-medium mt-0.5">
            Collections
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-1.5">
        <button
          aria-label="Search catalog"
          className="p-2 text-stone-600 hover:text-emerald-900 rounded-full active:bg-stone-200/60 tap-highlight-transparent"
          onClick={openSearch}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </svg>
        </button>

        <button
          aria-label="Open Shopping Bag"
          className="relative p-2 text-stone-800 hover:text-emerald-900 rounded-full active:bg-stone-200/60 tap-highlight-transparent transition-transform active:scale-95"
          onClick={openCart}
        >
          <svg className="w-6 h-6 stroke-[1.6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.19-.578-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 bg-emerald-800 text-amber-50 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm ring-2 ring-[#faf8f5] transform transition-transform scale-100">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
