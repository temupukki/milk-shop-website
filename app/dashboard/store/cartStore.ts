import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  
  image: string;
  description: string;

};

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (product) => {
        const existing = get().cartItems.find((item) => item.id === product.id);
        if (existing) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({ cartItems: [...get().cartItems, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (id) => {
        set({ cartItems: get().cartItems.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, amount) => {
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + amount) }
              : item
          ),
        });
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage', // key in localStorage
    }
  )
);
