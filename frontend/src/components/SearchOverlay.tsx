'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { useStore } from '@/store/store';
import { getProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import Image from 'next/image';
import Fuse from 'fuse.js';
import { useDebounce } from '@/lib/useDebounce';
import { OWNER_PHONE } from '@/lib/utils';
import EmptyState from './EmptyState';

function SearchProductCard({ product, onClick, isInCart }: { product: Product, onClick: () => void, isInCart: boolean }) {
  const [imgSrc, setImgSrc] = useState(product.image_url || '/placeholder.jpg');

  return (
    <article
      onClick={onClick}
      className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-sm hover:shadow-md transition-all flex gap-3 relative overflow-hidden group cursor-pointer"
    >
      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-50 flex-shrink-0 border border-stone-100 flex items-center justify-center">
        <Image
          src={imgSrc}
          alt={product.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          sizes="96px"
          onError={() => {
            setImgSrc('/placeholder.jpg');
          }}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
        <div>
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] font-semibold tracking-wider uppercase text-stone-500 truncate">
              {product.category?.name || 'Collection'}
            </span>
            {product.is_in_stock && (
              <span className="inline-flex items-center text-[9px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                <span className="w-1 h-1 rounded-full bg-emerald-600 mr-1"></span>In Stock
              </span>
            )}
          </div>
          <h3 className="font-serif font-medium text-stone-900 text-xs leading-snug truncate mt-0.5" title={product.title}>
            {product.title}
          </h3>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-stone-100 mt-2">
          <span className="font-serif font-bold text-stone-900 text-xs tracking-tight">
            ₦{Number(product.base_price).toLocaleString()}
          </span>
          {isInCart && product.is_in_stock ? (
            <div className="bg-stone-100 border border-stone-200 text-emerald-800 text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span>In Bag</span>
            </div>
          ) : (
            <button className="bg-emerald-800 text-white text-[10px] font-medium px-2.5 py-1.5 rounded-lg flex items-center gap-1 active:scale-95 transition-all shadow-sm hover:bg-emerald-900">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>View</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-3 pb-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <article key={i} className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-sm flex gap-3 relative overflow-hidden">
          <div className="relative w-24 h-24 rounded-xl bg-stone-200/80 flex-shrink-0"></div>
          <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
            <div>
              <div className="flex items-center justify-between gap-1">
                <div className="h-3 w-16 bg-stone-200/80 rounded-full"></div>
                <div className="h-4 w-12 bg-stone-200/80 rounded-full"></div>
              </div>
              <div className="h-4 w-3/4 bg-stone-200/80 rounded mt-2"></div>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-stone-100 mt-2">
              <div className="h-4 w-16 bg-stone-200/80 rounded"></div>
              <div className="h-7 w-16 bg-stone-200/80 rounded-lg"></div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function SearchOverlay() {
  const isSearchOpen = useStore((s) => s.isSearchOpen);
  const closeSearch = useStore((s) => s.closeSearch);
  const categories = useStore((s) => s.categories);
  const openProductModal = useStore((s) => s.openProductModal);
  const items = useStore((s) => s.items);
  
  const cachedCatalog = useStore((s) => s.cachedCatalog);
  const setCachedCatalog = useStore((s) => s.setCachedCatalog);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && cachedCatalog === null && !isLoading) {
      setIsLoading(true);
      setIsError(false);
      getProducts()
        .then((data) => {
          setCachedCatalog(data);
        })
        .catch((err) => {
          console.error(err);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isSearchOpen, cachedCatalog, isLoading, setCachedCatalog]);

  useEffect(() => {
    if (!isSearchOpen) return;
    
    document.body.style.overflow = 'hidden';
    if (inputRef.current) inputRef.current.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      setQuery('');
      setIsError(false);
    };
  }, [isSearchOpen, closeSearch]);

  const fuse = useMemo(() => {
    if (!cachedCatalog) return null;
    return new Fuse(cachedCatalog, {
      keys: ['title', 'category.name', 'description'],
      threshold: 0.3,
      ignoreLocation: true,
    });
  }, [cachedCatalog]);

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery.trim() || !cachedCatalog || !fuse) return [];
    return fuse.search(debouncedQuery).map(result => result.item);
  }, [debouncedQuery, cachedCatalog, fuse]);

  const trendingProducts = useMemo(() => {
    if (!cachedCatalog) return [];
    return cachedCatalog.slice(0, 3);
  }, [cachedCatalog]);

  const retryFetch = () => {
    setCachedCatalog([]); 
    setTimeout(() => setCachedCatalog(null), 0);
  };

  if (!isSearchOpen) return null;

  return (
    <div 
      className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 flex flex-col bg-[#faf8f5] shadow-2xl border-x border-stone-200/80 animate-backdrop-in"
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
      tabIndex={-1}
    >
      <header className="sticky top-0 bg-[#faf8f5]/95 backdrop-blur-md px-4 pt-4 pb-3 border-b border-stone-200/60 z-20 shadow-sm">
        <div className="flex items-center gap-2.5 max-w-[440px] mx-auto w-full">
          <button
            aria-label="Go Back"
            onClick={closeSearch}
            className="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-100 active:scale-95 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
              <svg className="w-4 h-4 text-emerald-800 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-1.85z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collections..."
              className="w-full bg-white border border-emerald-800/40 ring-2 ring-emerald-800/10 focus:outline-none focus:ring-emerald-800/20 pl-9 pr-9 py-2 rounded-full text-xs font-medium text-stone-900 flex items-center h-10 shadow-sm transition-all"
            />
            
            {query && (
              <button
                aria-label="Clear Search Input"
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center"
              >
                <span className="w-4 h-4 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center hover:bg-stone-300 active:scale-90 transition">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
              </button>
            )}
          </div>
          
          <button
            onClick={closeSearch}
            className="text-xs font-semibold text-emerald-800 px-1.5 py-1 hover:opacity-80 transition tracking-wide"
          >
            Cancel
          </button>
        </div>

        <nav className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar -mx-4 px-4 max-w-[440px] mx-auto w-full">
          <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider whitespace-nowrap mr-0.5">
            Quick:
          </span>
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setQuery(cat.name)}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] bg-white border border-stone-200 text-stone-600 font-medium hover:border-emerald-800 hover:text-emerald-800 transition whitespace-nowrap"
            >
              {cat.name}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-4 max-w-[440px] mx-auto w-full">
        {isLoading && <SkeletonLoader />}

        {isError && !isLoading && (
          <div className="py-10 flex flex-col items-center justify-center text-center px-4 bg-white rounded-2xl border border-red-100 shadow-sm">
            <svg className="w-10 h-10 text-red-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
            </svg>
            <p className="font-serif text-stone-800 font-medium text-sm">Our catalog is currently updating.</p>
            <p className="text-xs text-stone-500 mt-1 mb-4">Please try again or contact our Concierge.</p>
            <button onClick={retryFetch} className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors">
              Retry Connection
            </button>
          </div>
        )}

        {!isLoading && !isError && cachedCatalog && debouncedQuery && (
          <>
            {filteredProducts.length > 0 ? (
              <>
                <section className="flex items-baseline justify-between pt-1">
                  <div>
                    <h2 className="font-serif text-lg font-semibold text-stone-900 tracking-tight">Live Results</h2>
                    <p className="text-[11px] text-stone-500">Showing {filteredProducts.length} matches</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 tracking-wide bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/50 truncate max-w-[120px]">
                    "{debouncedQuery}"
                  </span>
                </section>
                <section className="space-y-3 pb-6">
                  {filteredProducts.map((product) => (
                    <SearchProductCard
                      key={product.id}
                      product={product}
                      isInCart={items.some((i) => i.id === product.id)}
                      onClick={() => {
                        openProductModal(product);
                        closeSearch();
                      }}
                    />
                  ))}
                </section>
              </>
            ) : (
              <div className="py-8 flex flex-col animate-backdrop-in">
                <div className="flex flex-col items-center justify-center text-center opacity-80 mb-8">
                  <svg className="w-10 h-10 text-stone-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-1.85z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                  </svg>
                  <p className="font-serif text-stone-600 font-medium text-sm">No curated matches found for "{debouncedQuery}".</p>
                </div>
                
                <h3 className="font-serif text-lg font-semibold text-stone-900 tracking-tight mb-3 border-b border-stone-200 pb-2">Trending Now</h3>
                {trendingProducts.length > 0 ? (
                  <section className="space-y-3 pb-6">
                    {trendingProducts.map((product) => (
                      <SearchProductCard
                        key={product.id}
                        product={product}
                        isInCart={items.some((i) => i.id === product.id)}
                        onClick={() => {
                          openProductModal(product);
                          closeSearch();
                        }}
                      />
                    ))}
                  </section>
                ) : (
                  <p className="text-sm text-stone-500 text-center py-4">No trending items available.</p>
                )}
              </div>
            )}
          </>
        )}

        {!isLoading && !isError && cachedCatalog && !debouncedQuery && (
          <div className="py-6 animate-backdrop-in">
             <h3 className="font-serif text-lg font-semibold text-stone-900 tracking-tight mb-3 border-b border-stone-200 pb-2">Discover New Arrivals</h3>
             {trendingProducts.length > 0 ? (
               <section className="space-y-3 pb-6">
                  {trendingProducts.map((product) => (
                    <SearchProductCard
                      key={product.id}
                      product={product}
                      isInCart={items.some((i) => i.id === product.id)}
                      onClick={() => {
                        openProductModal(product);
                        closeSearch();
                      }}
                    />
                  ))}
                </section>
             ) : (
                <EmptyState 
                  title="Collections arriving soon" 
                  message="Our artisans are preparing new exclusive pieces. Check back shortly to discover our latest curated selections." 
                />
             )}
          </div>
        )}

        <aside className="mt-2 rounded-2xl bg-gradient-to-br from-[#f8f5ee] to-[#ede5d8] border border-[#dfc07f]/30 p-3.5 relative overflow-hidden shadow-sm">
          <div className="absolute -right-3 -top-3 w-16 h-16 bg-[#dfc07f]/20 rounded-full blur-sm pointer-events-none"></div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"></path>
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-serif font-semibold text-stone-900 text-xs">Looking for bespoke curation?</h4>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-normal">
                Need custom engraving, personalized ribbon text, or a specific ring size? Chat with our Atelier Concierge.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <a
                  className="inline-flex items-center text-[11px] font-semibold text-emerald-800 bg-white/80 hover:bg-white px-2.5 py-1 rounded-md border border-[#dfc07f]/40 shadow-sm transition"
                  href={`https://wa.me/${OWNER_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Direct Chat</span>
                  <svg className="w-3 h-3 ml-1 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
