"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function Newsletter() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5511999999999?text=Olá! Gostaria de receber novidades e promoções.", "_blank")
  }

  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl lg:text-4xl font-serif font-light mb-4 text-balance">Receba Promoções Exclusivas</h3>
          <p className="mb-8 opacity-90 text-pretty leading-relaxed">
            Entre em contato pelo WhatsApp e receba informações sobre lançamentos, promoções especiais e ofertas
            exclusivas.
          </p>

          <Button size="lg" variant="secondary" className="uppercase tracking-wider" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
