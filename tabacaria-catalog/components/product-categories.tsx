import { Card } from "@/components/ui/card"

const categories = [
  {
    name: "Charutos",
    description: "Seleção premium de charutos importados",
    image: "/premium-cigars-in-humidor.jpg",
  },
  {
    name: "Cachimbos",
    description: "Cachimbos artesanais e clássicos",
    image: "/elegant-tobacco-pipes-collection.jpg",
  },
  {
    name: "Acessórios",
    description: "Cortadores, isqueiros e humidores",
    image: "/luxury-cigar-accessories-and-tools.jpg",
  },
]

export function ProductCategories() {
  return (
    <section id="catalogo" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl lg:text-5xl font-serif font-light mb-4 text-balance">Nossas Categorias</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Explore nossa coleção cuidadosamente selecionada de produtos premium
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer overflow-hidden border-border hover:border-accent transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-serif mb-2">{category.name}</h4>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
