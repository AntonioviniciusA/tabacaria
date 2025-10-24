"use client"

import { useParams } from "next/navigation"
import { useCategories } from "@/lib/categories-context"
import { useProducts } from "@/lib/products-context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ProductModal } from "@/components/product-modal"
import type { Product } from "@/lib/cart-context"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const { categories } = useCategories()
  const { products } = useProducts()
  const { addToCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const category = categories.find((c) => c.slug === slug)
  const categoryProducts = products.filter((p) => {
    const productCategory = p.category
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
    const categoryName = category?.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
    return productCategory === categoryName
  })

  if (!category) {
    return (
      <div className="min-h-screen bg-background py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-3xl font-serif mb-4">Categoria não encontrada</h1>
          <Link href="/">
            <Button>Voltar para Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-serif mb-4">{category.name}</h1>
          <p className="text-muted-foreground text-lg">{category.description}</p>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer overflow-hidden border-border hover:border-accent transition-all duration-300"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-serif mb-2 text-balance">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-accent">{product.price}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart(product)
                      }}
                      className="hover:bg-accent/10"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
