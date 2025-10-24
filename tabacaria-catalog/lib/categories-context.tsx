"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
}

interface CategoriesContextType {
  categories: Category[]
  addCategory: (category: Omit<Category, "id" | "slug">) => void
  updateCategory: (id: string, category: Partial<Category>) => void
  deleteCategory: (id: string) => void
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined)

const defaultCategories: Category[] = [
  {
    id: "1",
    name: "Kit",
    slug: "kit",
    description: "Kits completos para sua experiência",
    image: "/mate-gourd-kit.jpg",
  },
  {
    id: "2",
    name: "Para Bolar",
    slug: "para-bolar",
    description: "Tudo que você precisa para bolar",
    image: "/rolling-papers.jpg",
  },
  {
    id: "3",
    name: "Exclusivos",
    slug: "exclusivos",
    description: "Produtos exclusivos e premium",
    image: "/glass-tip.jpg",
  },
]

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(defaultCategories)

  // Load categories from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("pnm-categories")
    if (stored) {
      setCategories(JSON.parse(stored))
    }
  }, [])

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("pnm-categories", JSON.stringify(categories))
  }, [categories])

  const addCategory = (category: Omit<Category, "id" | "slug">) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
      slug: createSlug(category.name),
    }
    setCategories((prev) => [...prev, newCategory])
  }

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...updatedCategory,
              slug: updatedCategory.name ? createSlug(updatedCategory.name) : c.slug,
            }
          : c,
      ),
    )
  }

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoriesContext)
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider")
  }
  return context
}
