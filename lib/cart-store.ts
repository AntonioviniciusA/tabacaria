"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: number
  name: string
  category: string
  price: string
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)

        if (existingItem) {
          set({
            items: items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
          })
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price = Number.parseFloat(item.price.replace("R$", "").replace(",", "."))
          return total + price * item.quantity
        }, 0)
      },
    }),
    {
      name: "pnm-cart-storage",
    },
  ),
)
