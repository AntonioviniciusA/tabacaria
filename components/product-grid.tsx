"use client";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store-context";

export function ProductGrid() {
  const { products, categories } = useStore();
  const getCategoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name ?? "Categoria";

  return (
    <section id="produtos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Nossos Produtos
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Confira nossa seleção de produtos para sua tabacaria
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                id: p.id,
                name: p.name,
                category: getCategoryName(p.categoryId),
                price: p.price,
                image: p.image || null,
                extraImages: p.extraImages || [],
                description: p.description || null,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
