// Types matching Django API contract: GET /api/v1/products/

export interface ProductImage {
  url: string;
  alt: string;
}

// Removed Variant interfaces as they are not in the TAD

export interface Category {
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  base_price: string; // e.g. "15000.00"
  category: Category;
  image_url: string;
  is_in_stock: boolean;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  qty: number;
  image: string;
  category?: string;
  variant?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
