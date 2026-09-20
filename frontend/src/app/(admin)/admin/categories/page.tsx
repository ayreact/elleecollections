'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Category } from '@/lib/types';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';
import { useRouter } from 'next/navigation';

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setIsLoading(true);
    try {
      const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
      if (data) setCategories(data as Category[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function showToast(text: string) {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  }

  function openModal(category?: Category) {
    if (category) {
      setEditingCategory(category);
      setCatName(category.name);
      setCatSlug(category.slug);
    } else {
      setEditingCategory(null);
      setCatName('');
      setCatSlug('');
    }
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingCategory(null);
  }

  function handleNameChange(name: string) {
    setCatName(name);
    if (!editingCategory) {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setCatSlug(slug);
    }
  }

  async function handleSave() {
    if (!catName || !catSlug) return;
    setIsSubmitting(true);

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update({ name: catName, slug: catSlug })
          .eq('id', editingCategory.id);
        if (error) throw error;
        showToast('Category updated successfully');
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([{ name: catName, slug: catSlug }]);
        if (error) throw error;
        showToast('Category created successfully');
      }
      closeModal();
      fetchCategories();
    } catch (error: any) {
      showToast(`Error: ${error.message || 'Failed to save'}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(category: Category) {
    if (!confirm(`Are you sure you want to delete '${category.name}'?`)) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', category.id);
        
      if (error) {
        if (error.code === '23503') {
          showToast(`Cannot delete: Products are still linked to this category.`);
        } else {
          throw error;
        }
      } else {
        showToast(`'${category.name}' deleted successfully.`);
        fetchCategories();
      }
    } catch (error: any) {
      showToast(`Error deleting: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <AdminHeader title="Category Management" showBack={true} />

      <main className="flex flex-col relative w-full bg-surface min-h-screen">
        <div className="flex flex-col w-full px-space-md space-y-space-md pb-space-md relative">
          
          <aside className={`fixed top-20 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[400px] z-50 transition-all duration-300 transform ${toastMessage ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
            <div className="bg-primary text-on-primary rounded-xl px-space-md py-space-sm shadow-md flex items-center justify-between gap-space-xs">
              <div className="flex items-center gap-space-xs min-w-0">
                <span className="material-symbols-outlined text-primary-fixed text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <div className="flex flex-col min-w-0">
                  <p className="font-title-md text-title-md text-on-primary truncate">{toastMessage}</p>
                </div>
              </div>
              <button onClick={() => setToastMessage(null)} aria-label="Dismiss Notification" className="w-8 h-8 flex items-center justify-center rounded-full text-on-primary/80 hover:text-on-primary hover:bg-on-primary/10 transition-colors shrink-0">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </aside>

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

          <header className="flex flex-col space-y-space-2xs">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-md-mobile text-headline-md-mobile text-on-surface">Categories</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">{categories.length} Active Collections in Storefront</p>
          </header>

          <section aria-label="Store Categories" className="flex flex-col space-y-space-sm">
            {isLoading ? (
              <div className="flex justify-center p-8"><span className="material-symbols-outlined animate-spin text-primary">progress_activity</span></div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant text-body-md">No categories found.</div>
            ) : (
              categories.map(category => (
                <article key={category.id} className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between gap-space-sm transition-transform active:scale-[0.995]">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <button aria-label="Reorder" className="cursor-grab active:cursor-grabbing text-outline p-1 rounded hover:bg-surface-container transition-colors" type="button">
                      <span className="material-symbols-outlined text-[20px]">drag_indicator</span>
                    </button>
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-surface-container flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined">category</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-space-2xs">
                        <h3 className="font-title-md text-title-md text-on-surface truncate">{category.name}</h3>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">/{category.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs shrink-0">
                    <button onClick={() => openModal(category)} aria-label="Edit" className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button onClick={() => handleDelete(category)} aria-label="Delete" className="w-10 h-10 rounded-lg bg-error-container flex items-center justify-center text-on-error-container hover:bg-error/20 transition-colors" type="button">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>

          <button onClick={() => openModal()} className="w-full py-space-sm px-space-md rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-title-md text-title-md flex items-center justify-center gap-space-xs transition-colors shadow-sm" type="button">
            <span className="material-symbols-outlined text-[22px]">add_circle</span>
            <span>Add New Category</span>
          </button>
        </div>

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 max-w-[440px] mx-auto z-50 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-300 flex flex-col justify-end">
            <div className="flex-1 w-full" onClick={closeModal}></div>
            <div className="w-full bg-surface-container-lowest rounded-t-[28px] shadow-[0_-12px_40px_rgba(0,0,0,0.15)] flex flex-col max-h-[85vh] overflow-y-auto animate-sheet-in">
              <div className="w-full flex justify-center pt-space-xs pb-space-2xs cursor-pointer" onClick={closeModal}>
                <div className="w-10 h-1.5 rounded-full bg-surface-variant"></div>
              </div>
              <div className="px-space-lg pt-space-2xs pb-space-md flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-display mt-0.5">
                    {editingCategory ? 'Edit Category' : 'Quick Add Category'}
                  </h2>
                </div>
                <button onClick={closeModal} className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="px-space-lg flex flex-col gap-space-md pb-space-lg">
                <div className="flex flex-col gap-space-2xs">
                  <label className="font-label-md text-label-md text-on-surface font-semibold tracking-wide" htmlFor="catName">Category Name</label>
                  <input value={catName} onChange={e => handleNameChange(e.target.value)} className="w-full h-12 px-space-md bg-surface-container-low rounded-lg font-body-lg text-body-lg text-on-surface placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-lowest transition-all" id="catName" placeholder="e.g. Wedding Atelier, Fine Silk" type="text" />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Displayed on primary navigation and storefront filters</span>
                </div>
                
                <div className="flex flex-col gap-space-2xs">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface font-semibold tracking-wide" htmlFor="catSlug">System Slug (Auto-generated)</label>
                    {!editingCategory && (
                      <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[12px]">bolt</span> Formatter
                      </span>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 font-body-md text-body-md text-on-surface-variant font-mono">ellee.co/cat/</span>
                    <input value={catSlug} onChange={e => setCatSlug(e.target.value)} disabled={!!editingCategory} className="w-full h-12 pl-[110px] pr-space-md bg-surface-container rounded-lg font-body-md text-body-md text-on-surface font-mono focus:outline-none transition-all disabled:opacity-50" id="catSlug" type="text" />
                  </div>
                </div>

                <div className="flex items-center gap-space-sm pt-space-xs">
                  <button onClick={closeModal} className="flex-1 h-12 rounded-lg bg-surface-container text-on-surface font-title-md text-title-md hover:bg-surface-container-high active:scale-95 transition-all" type="button">
                    Cancel
                  </button>
                  <button disabled={isSubmitting || !catName || !catSlug} onClick={handleSave} className="flex-[2] h-12 rounded-lg bg-primary text-on-primary font-title-md text-title-md shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-50" type="button">
                    {isSubmitting ? <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> : <span className="material-symbols-outlined text-[20px]">{editingCategory ? 'save' : 'add_task'}</span>}
                    <span>{editingCategory ? 'Save Changes' : 'Create Category'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
