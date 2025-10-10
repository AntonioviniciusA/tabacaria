"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "./cart-context"

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Seda OCB Premium",
    category: "Seda",
    price: "R$ 8,00",
    priceValue: 8,
    image: "/rolling-papers.jpg",
  },
  {
    id: "2",
    name: "Piteira de Papel",
    category: "Piteira",
    price: "R$ 5,00",
    priceValue: 5,
    image: "/paper-tips.jpg",
  },
  {
    id: "3",
    name: "Tabaco Virginia",
    category: "Tabaco",
    price: "R$ 35,00",
    priceValue: 35,
    image: "/premium-tobacco.jpg",
  },
  {
    id: "4",
    name: "Tesoura para Tabaco",
    category: "Tesoura",
    price: "R$ 25,00",
    priceValue: 25,
    image: "/tobacco-scissors.jpg",
  },
  {
    id: "5",
    name: "Kit Cuia Completo",
    category: "Kit Cuia",
    price: "R$ 120,00",
    priceValue: 120,
    image: "/mate-gourd-kit.jpg",
  },
  {
    id: "6",
    name: "Slick Antiaderente",
    category: "Slick",
    price: "R$ 15,00",
    priceValue: 15,
    image: "/slick-pad.jpg",
  },
  {
    id: "7",
    name: "Piteira de Vidro",
    category: "Piteira de Vidro",
    price: "R$ 45,00",
    priceValue: 45,
    image: "/glass-tip.jpg",
  },
  {
    id: "8",
    name: "Filtro de Carvão Ativado",
    category: "Filtro",
    price: "R$ 12,00",
    priceValue: 12,
    image: "/activated-carbon-filters.jpg",
  },
]

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts)

  // Load products from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("pnm-products")
    if (stored) {
      setProducts(JSON.parse(stored))
    }
  }, [])

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("pnm-products", JSON.stringify(products))
  }, [products])

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}
