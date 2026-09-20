'use client';

import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import CategoryPills from './CategoryPills';
import EmptyState from './EmptyState';
import { Product } from '@/lib/types';

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
}

export default function ProductGrid({ products, activeCategory }: ProductGridProps) {
  const router = useRouter();

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all-products') {
      router.push('/', { scroll: false });
    } else {
      router.push(`/?category=${slug}`, { scroll: false });
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
          <div className="grid grid-cols-2 gap-3.5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
