'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import CategoryPills from './CategoryPills';
import EmptyState from './EmptyState';
import { Product } from '@/lib/types';
import { getProducts } from '@/lib/api';

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
}

export default function ProductGrid({ products: initialProducts, activeCategory }: ProductGridProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialProducts.length >= 12);

  useEffect(() => {
    setProducts(initialProducts);
    setHasMore(initialProducts.length >= 12);
  }, [initialProducts]);

  const handleCategoryChange = async (slug: string) => {
    if (slug === 'all-products') {
      router.push('/', { scroll: false });
    } else {
      router.push(`/?category=${slug}`, { scroll: false });
    }

    setProducts([]);
    setLoadingMore(true);
    
    try {
      const freshProducts = await getProducts(slug === 'all-products' ? undefined : slug, 0, 11);
      setProducts(freshProducts);
      setHasMore(freshProducts.length >= 12);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    
    try {
      const from = products.length;
      const to = from + 11;
      const newProducts = await getProducts(activeCategory === 'all-products' ? undefined : activeCategory, from, to);
      
      setProducts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNew = newProducts.filter(p => !existingIds.has(p.id));
        return [...prev, ...uniqueNew];
      });
      setHasMore(newProducts.length >= 12);
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
      <CategoryPills
        onCategoryChange={handleCategoryChange}
        itemCount={products.length}
        activeCategory={activeCategory}
      />
      <section className="px-4 pt-2 pb-10">
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3.5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button 
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 text-sm font-semibold tracking-wide rounded-xl border border-stone-200 transition-all disabled:opacity-50 disabled:active:scale-100"
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState 
            title={activeCategory === 'all-products' ? "Our collection is arriving" : "No items in this collection"}
            message={activeCategory === 'all-products' 
              ? "We are currently preparing our exclusive catalog. Check back shortly for new additions."
              : "We don't have any pieces in this collection right now. Please explore our other categories."
            }
            actionText={activeCategory !== 'all-products' ? "View All Products" : undefined}
            onAction={activeCategory !== 'all-products' ? () => handleCategoryChange('all-products') : undefined}
          />
        )}
      </section>
    </>
  );
}
