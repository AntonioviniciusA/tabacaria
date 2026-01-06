"use client";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store-context";

interface ProductGridProps {
  categoryId?: string;
  title?: string;
  subtitle?: string;
}

export function ProductGrid({ categoryId, title, subtitle }: ProductGridProps) {
  const { products, categories } = useStore();
  const getCategoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name ?? "Categoria";
  const filtered = categoryId
    ? products.filter((p) => p.categoryId === categoryId)
    : products;

  return (
    <section id="produtos" className="py-20">
      <div className="container mx-auto px-4">
        

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
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
