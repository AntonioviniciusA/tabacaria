import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20">
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-7xl font-serif font-light mb-6 text-balance">
            Experiência Premium em Tabacaria
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Descubra nossa seleção exclusiva de charutos, cachimbos e acessórios premium. Tradição e qualidade em cada
            produto.
          </p>
          <Button size="lg" className="uppercase tracking-wider">
            Explorar Catálogo
          </Button>
        </div>

        {/* Hero Image */}
        <div className="mt-16 lg:mt-24 max-w-5xl mx-auto">
          <div className="aspect-[16/9] lg:aspect-[21/9] rounded-lg overflow-hidden bg-muted">
            <img
              src="/luxury-cigar-and-tobacco-products-display.jpg"
              alt="Produtos premium de tabacaria"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
