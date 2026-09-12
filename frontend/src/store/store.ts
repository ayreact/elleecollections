import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, Category } from '@/lib/types';

interface StoreState {
  // Cart
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;

  // UI Toggles
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  isProductModalOpen: boolean;
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  isWhatsAppLoading: boolean;
  showWhatsAppLoading: () => void;
  hideWhatsAppLoading: () => void;

  // Categories (Dynamically fetched)
  categories: Category[];
  setCategories: (cats: Category[]) => void;

  // Search Catalog Cache (Lazy Loaded)
  cachedCatalog: Product[] | null;
  setCachedCatalog: (products: Product[] | null) => void;

  // Toast
  toast: { message: string; visible: boolean };
  showToast: (message: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Cart state
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, qty: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQty: (id, delta) =>
        set((state) => {
          const updated = state.items
            .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
            .filter((i) => i.qty > 0);
          return { items: updated };
        }),

      clearCart: () => set({ items: [] }),

      // UI state
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      isMenuOpen: false,
      openMenu: () => set({ isMenuOpen: true }),
      closeMenu: () => set({ isMenuOpen: false }),

      isSearchOpen: false,
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),

      isProductModalOpen: false,
      selectedProduct: null,
      openProductModal: (product) =>
        set({ isProductModalOpen: true, selectedProduct: product }),
      closeProductModal: () =>
        set({ isProductModalOpen: false, selectedProduct: null }),

      isWhatsAppLoading: false,
      showWhatsAppLoading: () => set({ isWhatsAppLoading: true }),
      hideWhatsAppLoading: () => set({ isWhatsAppLoading: false }),

      // Categories
      categories: [],
      setCategories: (cats) => set({ categories: cats }),

      // Cached Catalog
      cachedCatalog: null,
      setCachedCatalog: (products) => set({ cachedCatalog: products }),

      // Toast
      toast: { message: '', visible: false },
      showToast: (message) => {
        set({ toast: { message, visible: true } });
        setTimeout(() => {
          set({ toast: { message: '', visible: false } });
        }, 2200);
      },
    }),
    {
      name: 'ellee-collections-cart',
      partialize: (state) => ({ items: state.items }), // Only persist the cart items array
    }
  )
);

// Selectors
export const useTotalItems = () =>
  useStore((state) => state.items.reduce((acc, i) => acc + i.qty, 0));

export const useSubtotal = () =>
  useStore((state) =>
    state.items.reduce((acc, i) => acc + i.price * i.qty, 0)
  );
