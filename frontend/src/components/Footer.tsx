'use client';

import { useTotalItems } from '@/store/store';
import { OWNER_PHONE } from '@/lib/utils';

export default function Footer() {
  const totalItems = useTotalItems();
  
  return (
    <footer className={`px-6 pt-6 text-center text-stone-500 bg-stone-50 border-t border-stone-200 ${totalItems > 0 ? 'pb-20' : 'pb-6'}`}>
      <div className="mb-4">
        <p className="font-serif text-lg text-emerald-950 font-bold mb-1">Look Good. Feel Amazing.</p>
        <p className="font-serif italic text-sm text-stone-700">
          &quot;Be unique. Be confident. Be you.&quot;
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center space-y-2 mt-4 text-xs text-stone-600 font-medium">
        <a href={`https://wa.me/${OWNER_PHONE}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-800 transition">
          <svg className="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 17.89c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.12 8.12 0 01-1.25-4.32c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4 1.55 1.55 2.4 3.6 2.4 5.79 0 4.51-3.67 8.17-8.18 8.17z" /></svg>
          {OWNER_PHONE}
        </a>
        <a href="https://www.tiktok.com/@shopelleecollections01" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-stone-900 transition">
          <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 448 512"><path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/></svg>
          @shopelleecollections
        </a>
      </div>
      
      <div className="flex items-center justify-center space-x-2 mt-6 text-[10px] text-stone-400">
        <span>© {new Date().getFullYear()} Ellee Collections</span>
      </div>
    </footer>
  );
}
