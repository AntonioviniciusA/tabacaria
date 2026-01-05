import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h1 className="text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Bem-vindo ao{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                PNM Headshop
              </span>
            </h1>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl">
              Sua loja especializada em produtos para tabacaria. Qualidade, variedade e os melhores preços em um só
              lugar.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Ver Catálogo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                Contato
              </Button>
            </div>
          </div>

          <div className="relative flex-1">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <Image
                src="/logo.png"
                alt="PNM Headshop"
                width={500}
                height={500}
                className="animate-float drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
    </section>
  )
}
