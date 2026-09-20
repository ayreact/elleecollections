'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/store';
import { OWNER_PHONE } from '@/lib/utils';

export default function MobileNavMenu() {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const isOpen = useStore((s) => s.isMenuOpen);
  const closeMenu = useStore((s) => s.closeMenu);
  const categories = useStore((s) => s.categories);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 animate-backdrop-in"
        onClick={closeMenu}
      />

      <aside 
        className="fixed top-0 bottom-0 left-0 w-[84%] max-w-[325px] bg-[#faf8f5] shadow-2xl z-50 flex flex-col justify-between border-r border-stone-200/90 animate-menu-in"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="px-6 pt-12 pb-6 border-b border-stone-200/70 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-emerald-800 font-semibold block">
              Your Style, Our Passion!
            </span>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900">
              ELLEE
            </h1>
            <span className="text-[9px] tracking-[0.35em] text-stone-400 block -mt-1 uppercase">
              Collections
            </span>
          </div>
          <button
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200/80 flex items-center justify-center text-stone-600 transition-colors"
            onClick={closeMenu}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-6 py-6 overflow-y-auto space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3 px-2">
            Navigation
          </p>

          <Link
            href="/"
            onClick={handleLinkClick}
            className="group flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <span className="font-serif text-2xl text-stone-900 group-hover:text-emerald-800 transition-colors font-medium">
              Home
            </span>
            <span className="text-xs text-stone-400 group-hover:text-emerald-800 font-sans tracking-wide">
              Howdy!
            </span>
          </Link>

          <div className="group rounded-xl overflow-hidden transition-all bg-stone-50/50">
            <button
              onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-stone-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl text-stone-900 group-hover:text-emerald-800 transition-colors font-medium">
                  Collections
                </span>
              </div>
              <svg 
                className={`w-5 h-5 text-stone-400 group-hover:text-emerald-800 transition-transform ${isCollectionsOpen ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCollectionsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="py-2 px-2 pl-6 space-y-1">
                {categories.map((cat, idx) => (
                  <Link
                    key={cat.slug}
                    href={`/?category=${cat.slug}`}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors group/link"
                  >
                    <span className="font-serif text-lg text-stone-700 group-hover/link:text-emerald-800 transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-stone-400 group-hover/link:text-emerald-800 font-sans tracking-wide">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 pb-2 border-t border-stone-200/80 my-2" />

          <Link
            href="/about"
            onClick={handleLinkClick}
            className="group flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <span className="font-serif text-2xl text-stone-900 group-hover:text-emerald-800 transition-colors font-medium">
              About
            </span>
            <span className="text-xs text-stone-400 group-hover:text-emerald-800 font-sans tracking-wide">
              Story
            </span>
          </Link>

          <Link
            href="/contact"
            onClick={handleLinkClick}
            className="group flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <span className="font-serif text-2xl text-stone-900 group-hover:text-emerald-800 transition-colors font-medium">
              Contact
            </span>
            <span className="text-xs text-stone-400 group-hover:text-emerald-800 font-sans tracking-wide">
              Concierge
            </span>
          </Link>
        </nav>

        <div className="p-6 border-t border-stone-200/80 bg-stone-100/70 space-y-3 shrink-0">
          <a
            href={`https://wa.me/${OWNER_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Chat with Ellee Concierge
          </a>
          <div className="flex gap-3 w-full">
            <a
              href="https://www.tiktok.com/@shopelleecollections01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-2 rounded-xl bg-black hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 448 512">
                <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/>
              </svg>
              TikTok
            </a>
            <a
              href="mailto:uchendukelechi20@gmail.com"
              className="flex-1 py-3 px-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
          <div className="text-center text-[10px] text-stone-500">
            Daily Concierge: 9:00 AM – 7:00 PM (WAT)
          </div>
        </div>
      </aside>
    </>
  );
}
