import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 min-h-[70vh] bg-stone-50">
      <div className="w-20 h-20 rounded-full bg-stone-100 text-emerald-800 flex items-center justify-center border border-stone-200 shadow-sm">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div className="space-y-2 max-w-sm mx-auto">
        <h2 className="font-serif text-3xl font-bold text-emerald-900 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          This page seems to have slipped away. Let's get you back to our collection.
        </p>
      </div>
      <Link 
        href="/"
        className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white text-sm font-semibold tracking-wide rounded-xl transition-all shadow-md inline-block"
      >
        Return to Storefront
      </Link>
    </div>
  );
}
