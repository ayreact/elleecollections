'use client';

import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import CategoryPills from './CategoryPills';
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
        <div className="grid grid-cols-2 gap-3.5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
