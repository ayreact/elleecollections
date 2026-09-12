import { Suspense } from 'react';
import WhatsAppBanner from '@/components/WhatsAppBanner';
import HeroBanner from '@/components/HeroBanner';
import ProductGrid from '@/components/ProductGrid';
import TrustBadges from '@/components/TrustBadges';
import Footer from '@/components/Footer';
import BottomBar from '@/components/BottomBar';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { getProducts } from '@/lib/api';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const category = (searchParams.category as string) || 'all-products';
  
  const products = await getProducts(category === 'all-products' ? undefined : category);

  return (
    <>
      <WhatsAppBanner />
      <HeroBanner />
      <Suspense fallback={
        <>
          <div className="animate-pulse px-4 pt-4 pb-2 flex gap-2 overflow-hidden">
            <div className="h-8 w-24 bg-stone-200/80 rounded-full shrink-0"></div>
            <div className="h-8 w-24 bg-stone-200/80 rounded-full shrink-0"></div>
            <div className="h-8 w-24 bg-stone-200/80 rounded-full shrink-0"></div>
          </div>
          <section className="px-4 pt-2 pb-10">
            <div className="grid grid-cols-2 gap-3.5">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          </section>
        </>
      }>
        <ProductGrid products={products} activeCategory={category} />
      </Suspense>
      <TrustBadges />
      <Footer />
      <BottomBar />
    </>
  );
}
