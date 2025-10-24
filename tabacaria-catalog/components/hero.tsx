"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, MapPin } from "lucide-react"

export function Hero() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5511999999999?text=Olá! Gostaria de fazer um pedido.", "_blank")
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20">
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-7xl font-serif font-light mb-6 text-balance">Sua Smoke Shop no Cerrado</h2>
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Visite nossa loja física ou faça seu pedido pelo WhatsApp. Produtos premium de tabacaria com atendimento
            personalizado e entrega rápida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="uppercase tracking-wider" onClick={handleWhatsAppClick}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Pedir no WhatsApp
            </Button>
            <Button size="lg" variant="outline" className="uppercase tracking-wider bg-transparent" asChild>
              <a href="#sobre">
                <MapPin className="mr-2 h-5 w-5" />
                Visite Nossa Loja
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 max-w-5xl mx-auto">
          <div className="aspect-[16/9] lg:aspect-[21/9] rounded-lg overflow-hidden bg-muted shadow-2xl">
            <img
              src="/cerrado-smoke-shop-interior.png"
              alt="Interior da Cerrado Smoke Shop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
