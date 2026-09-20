'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Product, Category } from '@/lib/types';
import AdminHeader from '@/components/AdminHeader';
import CustomSelect from '@/components/CustomSelect';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

export default function EditProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [isReadyToDispatch, setIsReadyToDispatch] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const { data: catData } = await supabase.from('categories').select('*').order('name');
      if (catData) setCategories(catData as Category[]);

      const { data: prodData, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) throw error;
      if (prodData) {
        setTitle(prodData.title || '');
        setBasePrice(prodData.base_price?.toString() || '');
        setCategoryId(prodData.category_id || '');
        setDescription(prodData.description || '');
        setIsReadyToDispatch(prodData.is_in_stock ?? true);
        if (prodData.image_url) {
          setImagePreviewUrl(prodData.image_url);
          setOriginalImageUrl(prodData.image_url);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast('Error loading product');
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    }
  }

  function showToast(text: string) {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  }

  async function handleSave() {
    if (!title || !basePrice || !categoryId) {
      alert('Please fill out required fields.');
      return;
    }

    setIsSubmitting(true);
    setIsSyncModalOpen(true);

    try {
      let image_url = originalImageUrl;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        image_url = publicUrl;

        if (originalImageUrl) {
          const urlParts = originalImageUrl.split('/product-images/');
          if (urlParts.length > 1) {
            await supabase.storage.from('product-images').remove([urlParts[1]]);
          }
        }
      }

      const { error } = await supabase.from('products').update({
        title,
        description,
        base_price: parseFloat(basePrice),
        category_id: categoryId,
        image_url,
        is_in_stock: isReadyToDispatch
      }).eq('id', id);

      if (error) throw error;

      showToast('Product updated successfully!');
      
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1000);

    } catch (error: any) {
      console.error('Error updating product:', error);
      showToast(`Error: ${error.message}`);
      setIsSyncModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFormValid = title.length > 0 && basePrice.toString().length > 0 && categoryId !== '';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-[32px] text-primary">progress_activity</span>
      </div>
    );
  }

  return (
    <>
      <AdminHeader title="Edit Product" showBack={true} />

      <main className="flex flex-col relative w-full bg-surface min-h-screen">
        <div className="flex flex-col w-full relative">

          <div className="px-space-md py-space-md flex flex-col gap-space-lg pb-32">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Product Visual Assets</label>
                <span className="font-body-sm text-body-sm text-on-surface-variant">1 of 4 slots</span>
              </div>
              <label htmlFor="imageUpload" className="relative group w-full bg-surface-container-lowest rounded-xl p-space-lg flex flex-col items-center justify-center text-center transition-all duration-300 shadow-sm cursor-pointer hover:bg-surface-container-low overflow-hidden">
                <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                
                {imagePreviewUrl ? (
                  <Image src={imagePreviewUrl} alt="Preview" fill className="object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                ) : null}

                <div className="relative z-10 w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-space-sm text-primary transition-transform group-hover:scale-105">
                  <span className="material-symbols-outlined text-[28px]">add_a_photo</span>
                </div>
                <p className="relative z-10 font-title-md text-title-md text-on-surface mb-space-2xs">Tap to upload primary shot</p>
                <p className="relative z-10 font-body-sm text-body-sm text-on-surface-variant max-w-[260px] leading-relaxed">Supports high-res PNG, JPG or WebP.</p>
              </label>
            </div>

            {/* Essential Details */}
            <div className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-2xs">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-label-md text-on-surface font-semibold tracking-wide" htmlFor="prodTitle">Product Title</label>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Required</span>
                </div>
                <div className="relative flex items-center">
                  <input value={title} onChange={e => setTitle(e.target.value)} className="w-full h-12 px-space-md bg-surface-container-lowest rounded-lg font-body-lg text-body-lg text-on-surface placeholder:text-outline-variant shadow-sm focus:outline-none focus:bg-surface-container-lowest transition-all" id="prodTitle" placeholder="e.g. Royal Florentine Silk Robe" type="text" />
                  {title.length > 0 && (
                    <span className="absolute right-3 text-primary flex items-center">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-space-2xs">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">Category Taxon</label>
                  <Link href="/admin/categories" className="flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold hover:underline">
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    <span>New Category</span>
                  </Link>
                </div>
                <div className="relative w-full">
                  <CustomSelect
                    options={categories.map(cat => ({ value: cat.id as string, label: cat.name }))}
                    value={categoryId}
                    onChange={setCategoryId}
                    placeholder="Select a category..."
                    triggerClassName="w-full h-13 px-space-md bg-surface-container-lowest border-2 border-surface-container hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl font-title-md text-title-md text-on-surface shadow-sm"
                    dropdownClassName="w-full mt-2"
                    optionClassName="px-space-md py-3 font-title-md text-title-md"
                    iconClassName="text-primary text-[24px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-space-2xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold tracking-wide" htmlFor="basePrice">Base Price</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 font-title-md text-title-md text-primary font-bold">₦</span>
                  <input value={basePrice} onChange={e => setBasePrice(e.target.value)} className="w-full h-12 pl-8 pr-space-sm bg-surface-container-lowest rounded-lg font-title-md text-title-md text-on-surface shadow-sm focus:outline-none transition-all" id="basePrice" type="number" step="0.01" placeholder="0.00" />
                </div>
              </div>

              <div className="flex flex-col gap-space-2xs">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md text-on-surface font-semibold tracking-wide" htmlFor="prodDesc">Editorial Description</label>
                </div>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-space-md bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline-variant shadow-sm focus:outline-none transition-all leading-relaxed" id="prodDesc" placeholder="Detail the materials..." rows={4} />
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col pr-space-sm">
                    <span className="font-title-md text-title-md text-on-surface">Mark as Ready to Dispatch</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Publishes active inventory on the store</span>
                  </div>
                  <button onClick={() => setIsReadyToDispatch(!isReadyToDispatch)} className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${isReadyToDispatch ? 'bg-primary' : 'bg-surface-container-high'}`} type="button">
                    <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-surface-container-lowest shadow-md transition duration-200 ease-in-out ${isReadyToDispatch ? 'translate-x-5' : 'translate-x-0'}`}></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 w-full max-w-[440px] left-1/2 -translate-x-1/2 bg-surface-container-lowest/90 backdrop-blur-md px-space-md py-space-sm shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex items-center justify-between z-30">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Form Validity</span>
              {isFormValid ? (
                <span className="font-title-md text-title-md text-primary flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span> Ready to save
                </span>
              ) : (
                <span className="font-title-md text-title-md text-error flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[18px]">info</span> Incomplete
                </span>
              )}
            </div>
            <div className="flex items-center gap-space-xs">
              <button onClick={() => router.back()} className="px-space-md h-11 rounded-lg bg-surface-container text-on-surface font-title-md text-title-md hover:bg-surface-container-high transition-colors" type="button">
                Discard
              </button>
              <button disabled={!isFormValid || isSubmitting} onClick={handleSave} className="px-space-lg h-11 rounded-lg bg-primary text-on-primary font-title-md text-title-md shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5 font-medium disabled:opacity-50" type="button">
                <span className="material-symbols-outlined text-[20px]">save</span>
                <span>Update</span>
              </button>
            </div>
          </div>

          {/* Toast */}
          <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-space-md py-space-xs bg-inverse-surface text-inverse-on-surface rounded-full shadow-xl text-body-sm font-body-sm transition-opacity duration-300 z-50 flex items-center gap-2 ${toastMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <span className="material-symbols-outlined text-[16px] text-primary-fixed">sync</span>
            <span>{toastMessage}</span>
          </div>

          {/* Loading Sync Modal */}
          {isSyncModalOpen && (
             <div className="fixed inset-0 z-50 flex items-center justify-center px-space-md bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-300">
             <div className="bg-surface-container-lowest w-full max-w-sm rounded-xl p-space-lg shadow-xl flex flex-col items-center text-center space-y-space-md">
               <div className="relative w-14 h-14 flex items-center justify-center">
                 <svg className="animate-spin w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                   <path className="opacity-100" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" fill="currentColor"></path>
                 </svg>
                 <span className="material-symbols-outlined text-primary text-[18px] absolute inset-auto">sync</span>
               </div>
               <div className="flex flex-col space-y-space-2xs">
                 <h4 className="font-headline-sm text-headline-sm text-on-surface">Saving changes...</h4>
                 <p className="font-body-md text-body-md text-on-surface-variant">Synchronizing with Supabase backend</p>
               </div>
               <div className="flex items-center gap-space-2xs bg-surface-container px-space-sm py-space-2xs rounded-full">
                 <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                 <span className="font-label-sm text-label-sm text-on-surface">PostgreSQL Database Locked</span>
               </div>
             </div>
           </div>
          )}
        </div>
      </main>
    </>
  );
}
