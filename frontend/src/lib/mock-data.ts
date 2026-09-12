import { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    title: 'Rose Gold Solitaire Ring',
    slug: 'rose-gold-solitaire-ring',
    description:
      'A timeless solitaire setting rendered in lustrous 18k rose gold vermeil. The brilliant-cut centerpiece catches light from every angle, making it a perfect daily luxury or a meaningful token for milestone moments.',
    base_price: '15000.00',
    category: { name: 'Jewelry', slug: 'jewelry' },
    image_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    is_in_stock: true,
  },
  {
    id: 'prod_2',
    title: 'Luxe Emerald Velvet Keepsake Box with Ribbon',
    slug: 'luxe-emerald-velvet-keepsake-box',
    description:
      'Handcrafted with deep emerald-toned royal velvet and trimmed with antique brass hardware. Interior is tailored with plush ivory satin cushioning, designed to lovingly preserve heirloom jewelry, timepieces, and bespoke tokens for generations.',
    base_price: '28500.00',
    category: { name: 'Gift Box', slug: 'gift-boxes' },
    image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
    is_in_stock: true,
  },
  {
    id: 'prod_3',
    title: 'Freshwater Baroque Pearl Choker Necklace',
    slug: 'freshwater-baroque-pearl-choker',
    description:
      'Individually selected freshwater baroque pearls with organic contours — no two pearls in this collection are ever identical. Strung on reinforced silk thread with an 18k vermeil clasp.',
    base_price: '22000.00',
    category: { name: 'Jewelry', slug: 'jewelry' },
    image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    is_in_stock: true,
  },
  {
    id: 'prod_4',
    title: 'Pure Mulberry Silk Head Scarf - Botanica Edition',
    slug: 'mulberry-silk-head-scarf-botanica',
    description:
      '22-momme certified natural mulberry silk with hand-rolled hems. The Botanica edition features an original botanical illustration printed with eco-friendly reactive dyes for pure tactile indulgence.',
    base_price: '9500.00',
    category: { name: 'Accessories', slug: 'silk-accessories' },
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
    is_in_stock: true,
  },
  {
    id: 'prod_5',
    title: '18k Vermeil Hammered Huggie Earrings',
    slug: '18k-vermeil-hammered-huggie-earrings',
    description:
      'Artisan-hammered huggie hoops in heavy 18k gold vermeil over solid sterling silver. The textured surface catches light beautifully, resistant to tarnish and designed for everyday elegance.',
    base_price: '18000.00',
    category: { name: 'Jewelry', slug: 'jewelry' },
    image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    is_in_stock: true,
  },
  {
    id: 'prod_6',
    title: 'Ellee Signature Celebration Hamper with Scented Candles',
    slug: 'ellee-signature-celebration-hamper',
    description:
      'Our flagship celebration hamper combines hand-poured soy candles, artisan chocolates, a monogrammed silk pouch, and a handwritten calligraphy card — all nestled in a keepsake wooden crate lined with crushed velvet.',
    base_price: '45000.00',
    category: { name: 'Gift Box', slug: 'gift-boxes' },
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    is_in_stock: true,
  },
];
