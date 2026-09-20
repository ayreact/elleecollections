export interface ProductImage {
  url: string;
  alt: string;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Product {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  base_price: string;
  category_id?: string;
  category?: Category;
  image_url: string;
  is_in_stock: boolean;
  created_at?: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  qty: number;
  image: string;
  category?: string;
  variant?: string;
  isAvailable?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AnalyticsEvent {
  id?: string;
  event_name: string;
  payload: any;
  created_at?: string;
}

export interface Message {
  id?: string;
  name: string;
  contact_info: string;
  message: string;
  is_read?: boolean;
  is_pinned?: boolean;
  created_at?: string;
}
