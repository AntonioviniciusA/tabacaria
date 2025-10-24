"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useSettings } from "@/lib/settings-context"
import { ShoppingCart, Trash2, Plus, Minus, MessageCircle } from "lucide-react"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart()
  const { getDefaultNumber } = useSettings()

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return

    const defaultNumber = getDefaultNumber()
    const whatsappNumber = defaultNumber?.number || "5511999999999"

    let message = "Olá! Gostaria de fazer um pedido:\n\n"
    items.forEach((item) => {
      message += `*${item.name}*\n`
      message += `Quantidade: ${item.quantity}\n`
      message += `Preço unitário: ${item.price}\n`
      message += `Subtotal: R$ ${(item.priceValue * item.quantity).toFixed(2)}\n\n`
    })
    message += `*Total: R$ ${totalPrice.toFixed(2)}*`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-serif">Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full pt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">Seu carrinho está vazio</div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-lg font-bold text-accent">{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total:</span>
                  <div className="bg-accent text-accent-foreground px-4 py-2 rounded-lg">
                    <span className="text-2xl font-bold">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Button onClick={handleWhatsAppCheckout} className="w-full gap-2" size="lg">
                  <MessageCircle className="w-5 h-5" />
                  Finalizar no WhatsApp
                </Button>
                <Button onClick={clearCart} variant="outline" className="w-full bg-transparent" size="sm">
                  Limpar Carrinho
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
