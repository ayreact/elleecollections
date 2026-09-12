'use client';

import { useStore } from '@/store/store';

interface CategoryPillsProps {
  onCategoryChange: (categorySlug: string) => void;
  itemCount: number;
  activeCategory?: string;
}

export default function CategoryPills({ onCategoryChange, itemCount, activeCategory = 'all-products' }: CategoryPillsProps) {
  const categories = useStore((s) => s.categories);
  const allCategories = [{ name: 'All Products', slug: 'all-products' }, ...categories];

  const handleClick = (slug: string) => {
    onCategoryChange(slug);
  };

  return (
    <section className="px-4 pb-2">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans">
          Your One Stop Shop For
        </h2>
        <span className="text-[11px] text-emerald-800 font-medium">
          {itemCount} items
        </span>
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar select-none text-xs">
        {allCategories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleClick(cat.slug)}
            className={`px-3.5 py-1.5 rounded-full font-medium shrink-0 transition-colors ${
              activeCategory === cat.slug
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300/80'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
}
