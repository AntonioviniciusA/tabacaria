"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/lib/cart-store"
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react"

export default function CarrinhoPage() {
  const [mounted, setMounted] = useState(false)
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const total = getTotal()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para loja
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Carrinho de Compras</h1>

        {items.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-xl text-muted-foreground mb-6">Seu carrinho está vazio</p>
            <Link href="/">
              <Button size="lg">Continuar Comprando</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex gap-4 p-6">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{item.category}</p>
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-xl font-bold text-primary mt-1">{item.price}</p>
                      </div>

                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" onClick={clearCart} className="w-full bg-transparent">
                Limpar Carrinho
              </Button>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Resumo do Pedido</h2>

                  <div className="space-y-2 py-4 border-y border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">R$ {total.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span className="font-semibold">A calcular</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">R$ {total.toFixed(2).replace(".", ",")}</span>
                  </div>

                  <Button size="lg" className="w-full">
                    Finalizar Compra
                  </Button>

                  <Link href="/">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      Continuar Comprando
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
