'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Product, Category } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';
import CustomSelect from '@/components/CustomSelect';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const { data: catData } = await supabase.from('categories').select('*').order('name');
      if (catData) setCategories(catData as Category[]);

      const { data: prodData } = await supabase.from('products').select('*, category:categories(*)').order('created_at', { ascending: false });
      if (prodData) setProducts(prodData as Product[]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function showToast(text: string) {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 1800);
  }

  async function toggleStock(product: Product) {
    const { error } = await supabase
      .from('products')
      .update({ is_in_stock: !product.is_in_stock })
      .eq('id', product.id);

    if (!error) {
      setProducts(products.map(p => p.id === product.id ? { ...p, is_in_stock: !p.is_in_stock } : p));
      showToast(product.is_in_stock ? `Marked '${product.title}' as Out of Stock` : `Restocked '${product.title}'`);
    }
  }

  async function deleteProduct(product: Product) {
    if (!confirm(`Are you sure you want to delete '${product.title}'?`)) return;
    
    setIsLoading(true);
    try {
      if (product.image_url) {
        const urlParts = product.image_url.split('/product-images/');
        if (urlParts.length > 1) {
          const imagePath = urlParts[1];
          await supabase.storage.from('product-images').remove([imagePath]);
        }
      }
      
      const { error } = await supabase.from('products').delete().eq('id', product.id);
      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== product.id));
      showToast(`'${product.title}' deleted successfully`);
    } catch (error: any) {
      console.error('Error deleting product:', error);
      showToast(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? p.category_id === activeCategory : true;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
    if (sortBy === 'oldest') return new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime();
    if (sortBy === 'high') return parseFloat(b.base_price) - parseFloat(a.base_price);
    if (sortBy === 'low') return parseFloat(a.base_price) - parseFloat(b.base_price);
    return 0;
  });

  return (
    <>
      <AdminHeader title="Inventory" subtitle="Inventory" isDashboard={true} />
      <main className="flex flex-col relative w-full bg-surface min-h-screen">
        <div className="flex flex-col w-full px-gutter-mobile space-y-space-md">
          {/* Console Menu */}
          <div className="flex flex-col gap-space-xs bg-surface-container-lowest p-space-sm rounded-xl shadow-sm mt-space-xs">
            <div className="flex items-center justify-between pb-space-2xs text-on-surface-variant border-b border-surface-container">
              <span className="font-label-sm text-label-sm tracking-wider uppercase">Console</span>
              <span className="font-body-sm text-body-sm text-outline">v1.1</span>
            </div>
            <div className="grid grid-cols-4 gap-space-2xs text-center pt-space-xs">
              <Link href="/admin/dashboard" className="flex flex-col items-center justify-center py-space-xs px-space-2xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface">
                <span className="material-symbols-outlined text-[20px] text-primary">inventory</span>
                <span className="font-label-sm text-label-sm mt-1">Products</span>
              </Link>
              <Link href="/admin/categories" className="flex flex-col items-center justify-center py-space-xs px-space-2xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface">
                <span className="material-symbols-outlined text-[20px] text-secondary">category</span>
                <span className="font-label-sm text-label-sm mt-1">Categories</span>
              </Link>
              <Link href="/admin/analytics" className="flex flex-col items-center justify-center py-space-xs px-space-2xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface">
                <span className="material-symbols-outlined text-[20px] text-tertiary">monitoring</span>
                <span className="font-label-sm text-label-sm mt-1">Analytics</span>
              </Link>
              <Link href="/admin/messages" className="flex flex-col items-center justify-center py-space-xs px-space-2xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface">
                <span className="material-symbols-outlined text-[20px] text-primary">inbox</span>
                <span className="font-label-sm text-label-sm mt-1">Inbox</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="flex flex-col p-space-sm bg-surface-container-lowest rounded-xl shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Total Catalog</span>
                <span className="material-symbols-outlined text-[18px] text-primary">storefront</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-md-mobile text-headline-md-mobile text-primary tracking-tight">{products.length}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Items</span>
              </div>
              <div className="flex items-center gap-1 mt-space-2xs text-primary-container font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>Active</span>
              </div>
            </div>
            <div className="flex flex-col p-space-sm bg-surface-container-lowest rounded-xl shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Collections</span>
                <span className="material-symbols-outlined text-[18px] text-secondary">auto_awesome</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-md-mobile text-headline-md-mobile text-on-surface tracking-tight">{categories.length}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Active</span>
              </div>
              <div className="flex items-center gap-1 mt-space-2xs text-secondary-container font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span className="text-on-surface">All available</span>
              </div>
            </div>
          </div>

          {/* Quick Filter & Search Section */}
          <div className="flex flex-col space-y-space-xs">
            <div className="relative flex items-center w-full">
              <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">search</span>
              <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg shadow-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all" placeholder="Search products or SKUs..." type="text" />
            </div>
            <div className="flex items-center gap-space-2xs overflow-x-auto py-1 no-scrollbar">
              <button onClick={() => setActiveCategory(null)} className={`category-chip px-space-sm py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap active:scale-95 transition-all shadow-sm ${activeCategory === null ? 'bg-primary-container text-on-primary' : 'bg-surface-container-lowest text-on-surface'}`}>
                All ({products.length})
              </button>
              {categories.map(cat => (
                <button onClick={() => setActiveCategory(cat.id as string)} key={cat.id} className={`category-chip px-space-sm py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap active:scale-95 transition-all shadow-sm ${activeCategory === cat.id ? 'bg-primary-container text-on-primary' : 'bg-surface-container-lowest text-on-surface'}`}>
                  {cat.name} ({products.filter(p => p.category_id === cat.id).length})
                </button>
              ))}
            </div>
          </div>

          {/* Inventory Header & Sort Summary */}
          <div className="flex items-center justify-between pt-space-xs">
            <div className="flex items-center gap-space-2xs">
              <span className="font-headline-sm text-headline-sm text-on-surface">Curated Stock</span>
            </div>
            <div className="flex items-center">
              <span className="text-on-surface-variant font-label-sm text-label-sm mr-2">Sort:</span>
              <CustomSelect
                options={[
                  { value: 'newest', label: 'Newest First' },
                  { value: 'oldest', label: 'Oldest First' },
                  { value: 'high', label: 'High Value' },
                  { value: 'low', label: 'Low Value' },
                ]}
                value={sortBy}
                onChange={setSortBy}
                triggerClassName="bg-surface-container-low px-3 py-1.5 rounded-lg border border-surface-container shadow-sm font-label-sm text-label-sm font-semibold text-primary hover:bg-surface-container transition-colors"
                dropdownClassName="w-40 right-0 mt-2"
                optionClassName="px-4 py-2.5 font-label-sm text-label-sm"
                iconClassName="text-primary text-[16px]"
              />
            </div>
          </div>

          {/* Main Product Inventory List */}
          <div className="flex flex-col space-y-space-xs pb-space-lg">
            {isLoading ? (
              <div className="flex justify-center p-8"><span className="material-symbols-outlined animate-spin text-primary">progress_activity</span></div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant text-body-md">No products match your filters.</div>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} className={`product-item flex items-center p-space-xs bg-surface-container-lowest rounded-xl shadow-sm transition-all ${!product.is_in_stock ? 'opacity-90' : ''}`}>
                  <div className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high ${!product.is_in_stock ? 'grayscale' : ''}`}>
                    {product.image_url ? (
                      <Image alt={product.title} className="object-cover" src={product.image_url} fill sizes="64px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-outline"><span className="material-symbols-outlined">image</span></div>
                    )}
                    {!product.is_in_stock && (
                      <div className="absolute inset-0 bg-on-surface/20 flex items-center justify-center">
                        <span className="bg-surface-container-lowest/90 px-1 py-0.5 rounded font-label-sm text-[9px] uppercase tracking-wider text-on-surface font-semibold">Sold</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col ml-3 flex-grow min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-label-sm text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold ${product.is_in_stock ? 'text-secondary-container bg-secondary-container/20 text-secondary' : 'text-outline-variant bg-surface-container text-on-surface-variant'}`}>
                        {product.category?.name || 'Uncategorized'}
                      </span>
                      <span className="font-body-sm text-[11px] text-outline truncate">SKU: EL-PRD-{(product.id as string).substring(0, 4).toUpperCase()}</span>
                    </div>
                    <h3 className={`font-title-md text-title-md truncate mt-0.5 ${product.is_in_stock ? 'text-on-surface' : 'text-on-surface-variant'}`}>{product.title}</h3>
                    <span className={`font-title-lg text-title-lg font-semibold mt-0.5 ${product.is_in_stock ? 'text-primary-container' : 'text-on-surface-variant'}`}>₦{parseFloat(product.base_price).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleStock(product)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${product.is_in_stock ? 'bg-primary-container' : 'bg-surface-container-highest'}`}
                      role="switch"
                      type="button"
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full transition-transform shadow-sm ${product.is_in_stock ? 'translate-x-6 bg-on-primary' : 'translate-x-1 bg-on-surface-variant'}`}></span>
                    </button>
                    <Link href={`/admin/products/${product.id}/edit`} className="w-8 h-8 flex items-center justify-center rounded bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </Link>
                    <button onClick={() => deleteProduct(product)} className="w-8 h-8 flex items-center justify-center rounded bg-error-container text-on-error-container hover:bg-error/20 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-center gap-2 py-space-xs px-space-sm bg-surface-container-low rounded-lg text-on-surface-variant shadow-sm mb-space-md">
            <span className="material-symbols-outlined text-[16px] text-primary">cloud_done</span>
            <span className="font-label-sm text-label-sm text-center">Inventory is live</span>
          </div>

          <div className="fixed bottom-20 z-40 w-full max-w-[440px] left-1/2 -translate-x-1/2 pointer-events-none flex justify-end px-5">
            <Link href="/admin/products/new" aria-label="Add Product" className="pointer-events-auto w-14 h-14 rounded-full bg-primary-container text-on-primary shadow-xl flex items-center justify-center active:scale-90 transition-transform focus:outline-none group">
              <span className="material-symbols-outlined text-[28px] group-hover:rotate-90 transition-transform">add</span>
            </Link>
          </div>

          <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-space-md py-space-xs bg-inverse-surface text-inverse-on-surface rounded-full shadow-xl text-body-sm font-body-sm transition-opacity duration-300 z-50 flex items-center gap-2 ${toastMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <span className="material-symbols-outlined text-[16px] text-primary-fixed">sync</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      </main>


    </>
  );
}
