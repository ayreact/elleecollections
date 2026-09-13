'use client';

import { useState } from 'react';
import { useStore, useTotalItems, useSubtotal } from '@/store/store';
import { formatCurrency, formatWhatsAppPayload, getWhatsAppUrl } from '@/lib/utils';

export default function CartDrawer() {
  const isOpen = useStore((s) => s.isCartOpen);
  const closeCart = useStore((s) => s.closeCart);
  const items = useStore((s) => s.items);
  const updateQty = useStore((s) => s.updateQty);
  const removeItem = useStore((s) => s.removeItem);
  const showWhatsAppLoading = useStore((s) => s.showWhatsAppLoading);
  const hideWhatsAppLoading = useStore((s) => s.hideWhatsAppLoading);
  const totalItems = useTotalItems();
  const subtotal = useSubtotal();

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [giftNote, setGiftNote] = useState('');

  const handleCheckout = () => {
    if (items.length === 0) return;
    showWhatsAppLoading();

    const payload = formatWhatsAppPayload(items, name, city, giftNote);
    const url = getWhatsAppUrl(payload);

    setTimeout(() => {
      hideWhatsAppLoading();
      window.open(url, '_blank');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-stone-950/60 z-50 backdrop-blur-xs animate-backdrop-in"
        onClick={closeCart}
      />

      <aside 
        className="fixed top-0 bottom-0 right-0 w-full max-w-[380px] bg-[#faf8f5] z-50 shadow-2xl flex flex-col animate-drawer-in border-l border-stone-200"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        <div className="px-5 py-4 border-b border-stone-200/80 bg-white/70 backdrop-blur-sm flex items-center justify-between shrink-0">
          <div className="flex items-baseline space-x-2">
            <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
              Your Bag
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-900/10 text-emerald-900">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            aria-label="Close cart drawer"
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-95 flex items-center justify-center text-stone-700 transition"
            onClick={closeCart}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


        <div className="bg-stone-100/80 px-5 py-2 border-b border-stone-200/60 flex items-center justify-between text-xs text-stone-600 shrink-0">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            <span>No login required</span>
          </span>
          <span className="text-emerald-800 font-medium text-[11px]">Free Concierge</span>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-emerald-900/5 flex items-center justify-center text-emerald-800 border border-emerald-900/10">
                  <svg className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8V6a6 6 0 0 1 12 0v2" />
                    <rect x="3.5" y="8" width="17" height="13.5" rx="3" />
                    <path d="M10 12.5a2 2 0 0 0 4 0" />
                  </svg>
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-[#c5a059]">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </div>

              <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-2.5">
                Your bag is empty
              </h3>
              <p className="text-xs text-stone-500 max-w-[240px] leading-relaxed mb-6">
                Indulge in our bespoke velvet keepsake boxes, handcrafted jewelry, and pure mulberry silk adornments.
              </p>

              <div className="w-full pt-4 pb-2 border-t border-dashed border-stone-200 mb-6">
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-3">
                  Curated Highlights
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-xs px-3 py-1 bg-white border border-stone-200/80 rounded-full text-stone-700 shadow-sm">Gift Boxes</span>
                  <span className="text-xs px-3 py-1 bg-white border border-stone-200/80 rounded-full text-stone-700 shadow-sm">Fine Jewelry</span>
                  <span className="text-xs px-3 py-1 bg-white border border-stone-200/80 rounded-full text-stone-700 shadow-sm">Silk Adornments</span>
                </div>
              </div>

              <button
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-950/15 transition-all group"
                onClick={closeCart}
              >
                <span>Continue Shopping</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            <div className="p-5 border-t border-stone-200/70 bg-[#f5f1ea]/70 shrink-0">
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Zero login required
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Direct WhatsApp VIP
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 custom-scrollbar">

              <div className="space-y-3.5">
                <p className="text-[11px] uppercase tracking-wider font-bold text-stone-600">
                  Selected Creations
                </p>

                {items.map((item) => (
                  <div key={item.id} className="p-3 bg-white rounded-2xl border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex space-x-3.5 transition">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200/60">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <div>
                          <h3 className="font-serif text-sm font-semibold text-stone-900 leading-tight line-clamp-1">
                            {item.title}
                          </h3>
                          {item.category && (
                            <span className="text-[11px] text-stone-500 font-medium">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <button
                          className="text-stone-400 hover:text-stone-700 p-0.5"
                          title="Remove item"
                          onClick={() => removeItem(item.id)}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                        <span className="text-xs font-bold text-stone-900 font-serif">
                          {formatCurrency(item.price)}
                        </span>

                        <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
                          <button
                            className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-white text-xs font-bold active:scale-95 transition"
                            onClick={() => updateQty(item.id, -1)}
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-800">
                            {item.qty}
                          </span>
                          <button
                            className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-white text-xs font-bold active:scale-95 transition"
                            onClick={() => updateQty(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


              <div className="p-4 bg-stone-100/90 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-950 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Quick Delivery Context
                  </span>
                  <span className="text-[10px] text-stone-600 font-medium">Included in WhatsApp message</span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label htmlFor="shopper_name" className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      id="shopper_name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Amara Okafor"
                      className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 text-stone-900 font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="delivery_city" className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Delivery City / Town *
                    </label>
                    <input
                      id="delivery_city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., Victoria Island, Lagos"
                      className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 text-stone-900 font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="gift_note" className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Optional Gift Note / Message
                    </label>
                    <input
                      id="gift_note"
                      type="text"
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="e.g., Happy 30th Anniversary My Love!"
                      className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 text-stone-900 font-medium placeholder:text-stone-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-500 py-1">
                <div className="flex items-center space-x-1.5 p-2 bg-white/60 rounded-lg border border-stone-200/50">
                  <svg className="w-3.5 h-3.5 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span>Handcrafted Packaging</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-white/60 rounded-lg border border-stone-200/50">
                  <svg className="w-3.5 h-3.5 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Swift Dispatch</span>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-stone-200 bg-white/95 backdrop-blur-md shrink-0 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Bag Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span className="font-medium text-stone-800">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Packaging &amp; Gift Seal</span>
                  <span className="text-emerald-800 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Delivery Fee</span>
                  <span className="text-stone-500 italic">Confirmed on WhatsApp</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-stone-100">
                  <span className="font-serif text-sm font-bold text-stone-900">Estimated Total</span>
                  <span className="font-serif text-lg font-extrabold text-stone-900">{formatCurrency(subtotal)}</span>
                </div>
              </div>


              <button
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.99] text-white rounded-xl font-semibold shadow-[0_4px_16px_rgba(37,211,102,0.3)] flex items-center justify-center space-x-2.5 transition text-sm"
                onClick={handleCheckout}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 17.89c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.12 8.12 0 01-1.25-4.32c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4 1.55 1.55 2.4 3.6 2.4 5.79 0 4.51-3.67 8.17-8.18 8.17z" />
                </svg>
                <span>Send Order via WhatsApp</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <p className="text-[10px] text-center text-stone-500">
                Payment details shared securely via chat
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
