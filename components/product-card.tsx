"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "sonner"

interface Product {
  id: number
  name: string
  category: string
  price: string
  image: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(product)
    toast.success(`${product.name} adicionado ao carrinho!`)
  }

  return (
    <Card className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{product.category}</p>
        <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
        <p className="mt-2 text-2xl font-bold text-primary">{product.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <ShoppingCart className="h-4 w-4" />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  )
}
