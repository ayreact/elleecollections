'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/store/store';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [imgError, setImgError] = useState(false);
  const addItem = useStore((s) => s.addItem);
  const items = useStore((s) => s.items);
  const updateQty = useStore((s) => s.updateQty);
  const showToast = useStore((s) => s.showToast);
  const openProductModal = useStore((s) => s.openProductModal);

  const cartItem = items.find((i) => i.id === product.id);
  const isInCart = !!cartItem;

  const price = parseFloat(product.base_price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdding) return;
    
    setIsAdding(true);
    addItem({
      id: product.id,
      title: product.title,
      price,
      qty: 1,
      image: product.image_url || '',
      category: product.category.name,
    });
    showToast(`Added "${product.title}" to bag`);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 400);
  };

  return (
    <article
      className="bg-white rounded-xl border border-stone-200/90 shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-md group cursor-pointer"
      onClick={() => openProductModal(product)}
    >
      <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
        {imgError || !product.image_url ? (
          <div className="w-full h-full flex items-center justify-center bg-stone-200/50 text-stone-400 font-serif text-xl tracking-[0.2em] uppercase group-hover:scale-105 transition-transform duration-500">
            Ellee
          </div>
        ) : (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        )}
        <span className="absolute top-2 left-2 bg-[#faf8f5]/90 backdrop-blur-sm text-emerald-950 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
          {product.category.name}
        </span>
      </div>

      <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3
            className="font-serif text-[13px] font-semibold text-stone-900 leading-tight line-clamp-2 mb-0.5"
            title={product.title}
          >
            {product.title}
          </h3>
          <div className="flex items-center justify-between gap-1">
            <span className="text-[12px] font-bold text-stone-900 font-sans truncate">
              {formatCurrency(price)}
            </span>
            {product.is_in_stock && (
              <span className="shrink-0 text-[9px] font-bold text-emerald-700 bg-emerald-50/80 px-1.5 py-0.5 rounded uppercase tracking-widest border border-emerald-100">
                In Stock
              </span>
            )}
          </div>
        </div>

        <div className="mt-3.5 h-8">
          {isInCart && cartItem ? (
            <div 
              className="w-full h-full flex items-center justify-between bg-stone-100 rounded-lg border border-stone-200/90 shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="w-10 h-full flex items-center justify-center text-stone-600 hover:bg-white hover:text-emerald-800 transition rounded-l-lg active:scale-95"
                onClick={() => updateQty(product.id, -1)}
                aria-label="Decrease quantity"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
              </button>
              <div className="flex-1 flex flex-col items-center justify-center border-x border-stone-200/60 bg-white shadow-inner">
                <span className="font-serif text-[13px] font-bold text-stone-900 leading-none">{cartItem.qty}</span>
              </div>
              <button
                className="w-10 h-full flex items-center justify-center text-stone-600 hover:bg-emerald-800 hover:text-white transition rounded-r-lg active:scale-95"
                onClick={() => updateQty(product.id, 1)}
                aria-label="Increase quantity"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              </button>
            </div>
          ) : (
            <button
              className={`w-full h-full ${!product.is_in_stock ? 'bg-stone-200 text-stone-500 cursor-not-allowed' : 'bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 text-white disabled:opacity-80 disabled:cursor-wait'} rounded-lg text-xs font-medium tracking-wide flex items-center justify-center space-x-1.5 transition-colors tap-highlight-transparent shadow-xs`}
              onClick={handleAddToCart}
              disabled={isAdding || !product.is_in_stock}
            >
              {isAdding ? (
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : product.is_in_stock ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              ) : null}
              <span>{!product.is_in_stock ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add to Bag'}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
