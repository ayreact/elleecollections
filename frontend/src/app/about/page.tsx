'use client';

import { useRouter } from 'next/navigation';
import { OWNER_PHONE } from '@/lib/utils';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="pb-24">
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
            Brand Ethos
          </span>
          <h1 className="font-serif text-lg font-bold text-stone-900 leading-tight">
            About Ellee Collections
          </h1>
        </div>
      </div>

      <div className="relative h-64 w-full">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop"
          alt="Artisan crafting jewelry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/40" />
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <p className="font-serif italic text-2xl text-white font-medium leading-snug drop-shadow-md">
            &quot;Curating a diverse world of premium products for every lifestyle.&quot;
          </p>
        </div>
      </div>

      <div className="px-5 py-8 space-y-10">
        
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-stone-900">Who We Are</h2>
          <div className="w-10 h-[2px] bg-[#c5a059]" />
          <p className="text-sm text-stone-600 leading-relaxed pt-2">
            Ellee Collections is your premier destination for a diverse array of premium products. We believe in providing our customers with an extensive selection of items that cater to every taste, style, and occasion.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            From everyday essentials to unique finds, our collections are carefully curated to ensure you always find exactly what you're looking for, no matter the category.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-stone-400 text-center">
            Our Core Principles
          </h3>
          
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <h4 className="font-serif font-bold text-stone-900">Quality Assurance</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">Every piece passes through a rigorous inspection. We source only the finest raw materials to ensure lasting durability and hypoallergenic comfort.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 className="font-serif font-bold text-stone-900">Affordable Elegance</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">Luxury shouldn't be out of reach. By operating directly from our atelier without middlemen, we offer premium pieces at accessible price points.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
              </div>
              <div>
                <h4 className="font-serif font-bold text-stone-900">Endless Variety</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">We take pride in our diverse catalog. Whether you're shopping for yourself or searching for the perfect gift, our wide range of products ensures there's something for everyone.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-emerald-950 p-6 rounded-2xl text-stone-100 shadow-md">
          <h3 className="font-serif text-xl font-bold text-white mb-3">Why WhatsApp?</h3>
          <p className="text-sm text-stone-300 leading-relaxed mb-4">
            Luxury is personal. We reject impersonal checkout funnels in favor of direct, human concierge service.
          </p>
          <ul className="space-y-2 text-xs text-stone-300">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
              Negotiations done on your terms over chat.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
              Confirm exact delivery times directly with our team.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
              Secure payment processed after checkout.
            </li>
          </ul>
        </section>
      </div>

      <div className="fixed bottom-0 inset-x-0 max-w-[440px] mx-auto bg-white/95 backdrop-blur-md border-t border-stone-200/80 p-4 z-20">
        <a
          href={`https://wa.me/${OWNER_PHONE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
        >
          <span>Chat with Ellee Concierge</span>
          <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 17.89c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.12 8.12 0 01-1.25-4.32c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4 1.55 1.55 2.4 3.6 2.4 5.79 0 4.51-3.67 8.17-8.18 8.17z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
