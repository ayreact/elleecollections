'use client';

import { useStore } from '@/store/store';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

export default function ProductModal() {
  const isOpen = useStore((s) => s.isProductModalOpen);
  const closeProductModal = useStore((s) => s.closeProductModal);
  const product = useStore((s) => s.selectedProduct);
  const addItem = useStore((s) => s.addItem);
  const items = useStore((s) => s.items);
  const updateQty = useStore((s) => s.updateQty);
  const showToast = useStore((s) => s.showToast);

  if (!isOpen || !product) return null;

  const cartItem = items.find((i) => i.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: parseFloat(product.base_price),
      qty: 1,
      image: product.image_url || '',
      category: product.category?.name,
    });
    showToast(`Added "${product.title}" to bag`);
    closeProductModal();
  };

  const price = parseFloat(product.base_price);

  return (
    <>
      <div
        className="fixed inset-0 bg-stone-950/45 backdrop-blur-[3px] z-40 animate-backdrop-in"
        onClick={closeProductModal}
      />

      <div className="fixed inset-x-0 bottom-0 max-h-[92%] max-w-[440px] mx-auto bg-stone-50 z-50 rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.22)] flex flex-col animate-sheet-in border-t border-stone-200/90 overflow-hidden">
        
        <div className="pt-3 pb-2 flex justify-center shrink-0">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        <div className="px-6 py-1 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-900 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
              {product.category?.name}
            </span>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-95 flex items-center justify-center text-stone-600 transition"
            onClick={closeProductModal}
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-3 space-y-5 custom-scrollbar">
          
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-150 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] group">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105"
            />
            
            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              {product.category.name === 'Gift Box' && (
                <span className="px-2.5 py-1 bg-emerald-900/90 backdrop-blur-md text-[#dfc07f] rounded-full text-[10px] font-semibold tracking-wide shadow-sm">
                  Velvet &amp; Brass
                </span>
              )}
            </div>

            <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 shadow-sm active:scale-90 transition">
              <svg className="w-4 h-4 text-stone-600 hover:text-rose-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {false && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 px-3 py-1 bg-black/35 backdrop-blur-md rounded-full">
                <span className="w-4 h-1.5 rounded-full bg-white shadow-xs" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              </div>
            )}
          </div>

          <div className="space-y-2 pt-1 border-b border-stone-200/80 pb-4">
            <div className="flex items-center justify-between">
              {product.is_in_stock && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>In Stock • Ready to Dispatch</span>
                </span>
              )}
              <span className="text-xs text-stone-600 font-medium">Verified Authentic</span>
            </div>

            <h1 className="font-serif text-2xl font-bold text-stone-900 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-serif text-xl font-bold text-stone-900 tracking-tight">
                {formatCurrency(price)}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600">The Artisan Story</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {product.description}
            </p>
          </div>

          <div className="p-4 bg-[#f8f5ee] rounded-2xl border border-[#dfc07f]/30 mt-4 flex items-start gap-3 shadow-sm">
            <svg className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <h4 className="font-serif font-semibold text-stone-900 text-sm">Bespoke Customization</h4>
              <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                Ring sizes, ribbon colors, and custom engravings will be personally coordinated with Ellee over WhatsApp after adding to bag.
              </p>
            </div>
          </div>

        </div>

        <div className="p-5 border-t border-stone-200 bg-white/95 backdrop-blur-md shrink-0 space-y-2">
          {isInCart && cartItem ? (
            <div className="flex items-center justify-between bg-stone-100 p-2 rounded-xl border border-stone-200 shadow-inner">
              <button
                className="w-14 h-10 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-emerald-800 hover:border-emerald-800 transition shadow-sm active:scale-95"
                onClick={() => updateQty(product.id, -1)}
                aria-label="Decrease quantity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
              </button>
              <div className="flex flex-col items-center justify-center">
                <span className="font-serif text-lg font-bold text-stone-900 leading-none">{cartItem.qty}</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 mt-0.5">In Bag</span>
              </div>
              <button
                className="w-14 h-10 rounded-lg bg-emerald-800 border border-emerald-800 flex items-center justify-center text-white hover:bg-emerald-900 transition shadow-sm active:scale-95"
                onClick={() => updateQty(product.id, 1)}
                aria-label="Increase quantity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              </button>
            </div>
          ) : (
            <button
              className="w-full py-3.5 px-4 bg-emerald-900 hover:bg-emerald-800 active:scale-[0.99] text-white rounded-xl font-semibold shadow-[0_6px_20px_rgba(6,78,59,0.28)] flex items-center justify-between transition text-sm"
              onClick={handleAddToCart}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-[#dfc07f]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="tracking-wide">Add to Bag</span>
              </div>
              <span className="font-serif text-base font-bold text-[#dfc07f]">
                {formatCurrency(price)}
              </span>
            </button>
          )}

          <p className="text-[10px] text-center text-stone-500 font-medium pt-1">
            {isInCart ? 'Adjust quantity or drop to zero to remove' : 'Instant addition to your offcanvas bag • Zero login required'}
          </p>
        </div>

      </div>
    </>
  );
}
