'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/lib/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product_id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product_id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.quantity + quantity,
                        product.stock_quantity
                      ),
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                product_id: product.id,
                product,
                quantity: Math.min(quantity, product.stock_quantity),
              },
            ],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product_id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === productId
              ? {
                  ...item,
                  quantity: Math.max(
                    1,
                    Math.min(quantity, item.product.stock_quantity)
                  ),
                }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.product.discounted_price || item.product.price;
          return total + price * item.quantity;
        }, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'byte-tech-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
