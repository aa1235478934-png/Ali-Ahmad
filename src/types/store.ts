export type CategorySlug =
  | 'smart-home'
  | 'gaming-gadgets'
  | 'mini-projectors'
  | 'bluetooth-speakers'
  | 'wearable-gadgets'
  | 'laptop-gadgets'
  | 'desk-gadgets'
  | 'lifestyle-gadgets'
  | 'trending-electronics';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  iconName: string;
  itemCount: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  categorySlug: CategorySlug;
  pricePKR: number;
  originalPricePKR?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  trending: boolean;
  image: string;
  gallery?: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  videoId?: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface VideoShowcase {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoType: 'mp4' | 'youtube';
  videoUrl: string;
  thumbnail: string;
  productId: string;
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'ordering' | 'delivery' | 'payment' | 'warranty';
}
