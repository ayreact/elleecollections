'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OWNER_PHONE } from '@/lib/utils';

export default function ContactPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Orders within Lagos are dispatched same-day via verified courier if placed before 2 PM WAT. Nationwide deliveries take 48-72 hours via DHL."
    },
    {
      q: "Do you offer international shipping?",
      a: "Yes, we ship globally via DHL Express. International shipping rates and times are calculated directly with your concierge during checkout."
    },
    {
      q: "Can I include a handwritten note?",
      a: "Absolutely. All Ellee Collection orders include complimentary signature packaging. You can provide your custom message to the concierge via WhatsApp."
    }
  ];

  return (
    <div className="pb-12 bg-stone-50 min-h-screen">
      <div className="px-5 py-4 border-b border-stone-200/80 bg-[#faf8f5]/90 backdrop-blur-md sticky top-0 z-20 flex items-center shrink-0">
        <button
          className="w-8 h-8 -ml-2 mr-3 rounded-full hover:bg-stone-200/60 flex items-center justify-center text-stone-600 transition"
          onClick={() => router.back()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-semibold block">
            Client Care
          </span>
          <h1 className="font-serif text-lg font-bold text-stone-900 leading-tight">
            Contact &amp; Concierge
          </h1>
        </div>
      </div>

      <div className="p-5 space-y-8">
        <section>
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">We&apos;re Here to Assist</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Whether you need styling advice, custom curation for a corporate event, or an update on your delivery, our atelier concierge is at your service.
          </p>
        </section>

        <section className="space-y-3">
          <a
            href={`https://wa.me/${OWNER_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/15 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 17.89c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.12 8.12 0 01-1.25-4.32c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4 1.55 1.55 2.4 3.6 2.4 5.79 0 4.51-3.67 8.17-8.18 8.17z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">WhatsApp VIP Concierge</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">{OWNER_PHONE} • Instant responses.</p>
            </div>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">Email Inquiry</h3>
              <a href="mailto:uchendukelechi20@gmail.com" className="text-[11px] text-emerald-800 font-bold mt-1.5 inline-block hover:bg-emerald-100 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">
                Send us an email
              </a>
            </div>
          </div>
        </section>

        <section className="bg-stone-900 rounded-2xl p-6 text-stone-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>
          </div>
          
          <h3 className="font-serif text-lg font-bold text-white mb-4 relative z-10">Ellee Hours</h3>
          
          <div className="space-y-2 text-xs relative z-10">
            <div className="flex justify-between border-b border-stone-700 pb-2">
              <span className="text-stone-400">Monday - Friday</span>
              <span className="font-medium text-amber-100">9:00 AM – 7:00 PM (WAT)</span>
            </div>
            <div className="flex justify-between border-b border-stone-700 py-2">
              <span className="text-stone-400">Saturday</span>
              <span className="font-medium text-amber-100">10:00 AM – 5:00 PM (WAT)</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-stone-400">Sunday</span>
              <span className="font-medium text-stone-500">Closed (Available for urgent VIP orders)</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">Frequently Asked</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-stone-200/80 rounded-xl overflow-hidden transition-all shadow-sm">
                <button
                  className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-bold text-stone-900 text-xs tracking-wide">{faq.q}</span>
                  <svg
                    className={`w-4 h-4 text-emerald-800 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`px-4 text-xs text-stone-600 leading-relaxed overflow-hidden transition-all ${
                    openFaq === idx ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
