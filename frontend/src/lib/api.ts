import { Category, Product } from './types';
import { mockProducts } from './mock-data';

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${getApiUrl()}/api/v1/categories/`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching categories, falling back to mock extraction:', error);
    
    const categoryMap = new Map<string, Category>();
    mockProducts.forEach((product) => {
      if (product.category && product.category.slug) {
        categoryMap.set(product.category.slug, product.category);
      }
    });
    
    return Array.from(categoryMap.values());
  }
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    let url = `${getApiUrl()}/api/v1/products/`;
    if (categorySlug) {
      url += `?category=${categorySlug}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.warn('Backend unavailable, falling back to mock data.', (error as Error).message);
    
    if (categorySlug) {
      return mockProducts.filter((p) => p.category.slug === categorySlug);
    }
    return mockProducts;
  }
}
