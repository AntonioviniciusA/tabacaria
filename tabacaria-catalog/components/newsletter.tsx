import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl lg:text-4xl font-serif font-light mb-4 text-balance">Receba Novidades Exclusivas</h3>
          <p className="mb-8 opacity-90 text-pretty leading-relaxed">
            Cadastre-se para receber informações sobre lançamentos, promoções especiais e eventos exclusivos.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu e-mail"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
            <Button type="submit" variant="secondary" className="uppercase tracking-wider whitespace-nowrap">
              Inscrever-se
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
