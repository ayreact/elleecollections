'use server';

import { Category, Product } from './types';
import { mockProducts } from './mock-data';
import { createClient } from '@/utils/supabase/server';

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('categories').select('*');
    
    if (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
    
    return data as Category[];
  } catch (error) {
    console.error('Transient error in getCategories:', error);
    throw error;
  }
}

export async function getProducts(categorySlug?: string, from: number = 0, to: number = 11): Promise<Product[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('products')
      .select(categorySlug ? '*, category:categories!inner(*)' : '*, category:categories(*)')
      .order('is_in_stock', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (categorySlug) {
      query = query.eq('categories.slug', categorySlug);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching products:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    const products = (data || []).filter((p: any) => p.category !== null) as Product[];
    return products;
  } catch (error) {
    console.error('Transient error in getProducts:', error);
    throw error;
  }
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (!ids || ids.length === 0) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .in('id', ids);
      
    if (error) {
      console.error('Error fetching products by ids:', error);
      return [];
    }
    
    return data as Product[];
  } catch (error) {
    console.error('Transient error in getProductsByIds:', error);
    return [];
  }
}

export async function getDiverseRecentProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (error) {
      console.error('Error fetching diverse products:', error);
      return [];
    }
    
    const products = (data || []).filter((p: any) => p.category !== null) as Product[];
    
    const result: Product[] = [];
    const categoryCounts = new Map<string, number>();
    
    let maxPerCategory = 1;
    while (result.length < 3 && maxPerCategory <= 3) {
      let addedInThisPass = false;
      
      for (const product of products) {
        if (result.length >= 3) break;
        if (result.some(p => p.id === product.id)) continue;
        
        // Ensure we group by the category_id as requested
        const catId = product.category_id || product.category?.id || 'unknown';
        const currentCount = categoryCounts.get(catId) || 0;
        
        if (currentCount < maxPerCategory) {
          result.push(product);
          categoryCounts.set(catId, currentCount + 1);
          addedInThisPass = true;
        }
      }
      
      if (!addedInThisPass) break;
      maxPerCategory++;
    }
    
    return result;
  } catch (error) {
    console.error('Transient error in getDiverseRecentProducts:', error);
    return [];
  }
}
