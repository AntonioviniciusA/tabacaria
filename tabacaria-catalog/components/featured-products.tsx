"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/cart-context"
import { ProductModal } from "./product-modal"
import { useState } from "react"
import { useProducts } from "@/lib/products-context"

export function FeaturedProducts() {
  const { products } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl lg:text-5xl font-serif font-light mb-4 text-balance">Produtos em Destaque</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Conheça alguns dos nossos produtos mais exclusivos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer overflow-hidden border-border hover:border-accent transition-all duration-300"
              onClick={() => handleProductClick(product)}
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{product.category}</p>
                <h4 className="text-lg font-serif mb-3">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">{product.price}</span>
                  <Button variant="ghost" size="sm" className="uppercase text-xs tracking-wider">
                    Ver Mais
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <ProductModal product={selectedProduct} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  )
}
