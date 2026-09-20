'use server';

import { Category, Product } from './types';
import { mockProducts } from './mock-data';
import { createClient } from '@/utils/supabase/server';

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('categories').select('*');
  
  if (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
  
  return data as Category[];
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .order('is_in_stock', { ascending: false })
    .order('created_at', { ascending: false });
  
  if (categorySlug) {
    query = query.eq('categories.slug', categorySlug);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
  
  const products = data.filter((p: any) => p.category !== null) as Product[];
  return products;
}
