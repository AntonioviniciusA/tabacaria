export function About() {
  return (
    <section id="sobre" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl lg:text-5xl font-serif font-light mb-6 text-balance">
              Tradição e Excelência desde 1985
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Nossa tabacaria é referência em produtos premium, oferecendo uma seleção cuidadosamente curada de
                charutos, cachimbos e acessórios das melhores marcas do mundo.
              </p>
              <p>
                Com mais de 35 anos de experiência, nossa equipe especializada está pronta para orientar você na escolha
                perfeita, seja você um conhecedor experiente ou esteja apenas começando sua jornada.
              </p>
              <p>Valorizamos a qualidade, autenticidade e o prazer de uma experiência verdadeiramente premium.</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
              <img
                src="/luxury-tobacco-shop-interior.jpg"
                alt="Interior da tabacaria"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
