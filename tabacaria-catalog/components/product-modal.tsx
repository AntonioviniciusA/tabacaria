"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { type Product, useCart } from "@/lib/cart-context"
import { ShoppingCart, MessageCircle } from "lucide-react"
import { useState } from "react"

interface ProductModalProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { addItem } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)

  if (!product) return null

  const handleAddToCart = () => {
    addItem(product)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onOpenChange(false)
    }, 1500)
  }

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de comprar:\n\n*${product.name}*\n${product.category}\n${product.price}`
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">{product.category}</p>
              <p className="text-3xl font-light mb-6">{product.price}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Produto premium de alta qualidade, cuidadosamente selecionado para proporcionar a melhor experiência.
              </p>
            </div>

            {showSuccess ? (
              <div className="bg-primary/10 text-primary p-4 rounded-lg text-center font-medium">
                Adicionado ao carrinho!
              </div>
            ) : (
              <div className="space-y-3">
                <Button onClick={handleWhatsApp} className="w-full gap-2" size="lg">
                  <MessageCircle className="w-5 h-5" />
                  Comprar no WhatsApp
                </Button>
                <Button onClick={handleAddToCart} variant="outline" className="w-full gap-2 bg-transparent" size="lg">
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
