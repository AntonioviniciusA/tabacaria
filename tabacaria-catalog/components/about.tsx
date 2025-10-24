import { MessageCircle, Store, CreditCard, MapPin } from "lucide-react"

export function About() {
  return (
    <section id="sobre" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h3 className="text-3xl lg:text-5xl font-serif font-light mb-6 text-balance">
            Atendimento Presencial e Online
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Visite nossa loja física ou faça seu pedido pelo WhatsApp. Oferecemos a melhor experiência em produtos de
            tabacaria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
              <Store className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-medium mb-3">Loja Física</h4>
            <p className="text-muted-foreground leading-relaxed">
              Visite nossa loja e conheça pessoalmente nossos produtos com atendimento especializado.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-medium mb-3">Pedido Online</h4>
            <p className="text-muted-foreground leading-relaxed">
              Navegue pelo catálogo e finalize seu pedido pelo WhatsApp com atendimento rápido.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
              <MapPin className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-medium mb-3">Entrega Rápida</h4>
            <p className="text-muted-foreground leading-relaxed">
              Receba em casa com segurança e agilidade. Acompanhe o status pelo WhatsApp.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
              <CreditCard className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-medium mb-3">Pagamento Flexível</h4>
            <p className="text-muted-foreground leading-relaxed">
              Pague na loja ou na entrega: dinheiro, PIX ou cartão. Total comodidade.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl lg:text-4xl font-serif font-light mb-6 text-balance">Cerrado Smoke Shop</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Somos uma smoke shop localizada no coração do Cerrado, oferecendo produtos premium de tabacaria com
                atendimento personalizado tanto presencial quanto online.
              </p>
              <p>
                Nossa loja física conta com um ambiente moderno e acolhedor, onde você pode conhecer nossos produtos e
                receber orientação especializada de nossa equipe.
              </p>
              <p>
                Para sua comodidade, também atendemos pelo WhatsApp com entrega rápida. Valorizamos a qualidade, a
                agilidade e a satisfação de cada cliente.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted shadow-xl">
              <img
                src="/cerrado-smoke-shop-interior.png"
                alt="Interior da Cerrado Smoke Shop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
