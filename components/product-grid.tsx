import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: 1,
    name: "Seda Premium OCB",
    category: "Sedas",
    price: "R$ 5,00",
    image: "/rolling-papers-pack.jpg",
  },
  {
    id: 2,
    name: "Isqueiro Clipper",
    category: "Isqueiros",
    price: "R$ 12,00",
    image: "/clipper-lighter.jpg",
  },
  {
    id: 3,
    name: "Dichavador Metal",
    category: "Acessórios",
    price: "R$ 35,00",
    image: "/metal-herb-grinder.jpg",
  },
  {
    id: 4,
    name: "Piteira de Vidro",
    category: "Piteiras",
    price: "R$ 8,00",
    image: "/glass-filter-tip.jpg",
  },
  {
    id: 5,
    name: "Bolador Automático",
    category: "Acessórios",
    price: "R$ 25,00",
    image: "/automatic-rolling-machine.jpg",
  },
  {
    id: 6,
    name: "Seda King Size RAW",
    category: "Sedas",
    price: "R$ 7,00",
    image: "/raw-king-size-papers.jpg",
  },
  {
    id: 7,
    name: "Cinzeiro de Silicone",
    category: "Acessórios",
    price: "R$ 15,00",
    image: "/silicone-ashtray.jpg",
  },
  {
    id: 8,
    name: "Isqueiro Bic Maxi",
    category: "Isqueiros",
    price: "R$ 6,00",
    image: "/bic-maxi-lighter.jpg",
  },
]

export function ProductGrid() {
  return (
    <section id="produtos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">Nossos Produtos</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Confira nossa seleção de produtos para sua tabacaria
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
