export interface ProductImage {
  url: string;
  alt: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  base_price: string;
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
