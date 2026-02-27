"use client";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store-context";
import { LoadingSpinner } from "@/components/loading-spinner";

export function ProductGrid({ categoryId }: { categoryId?: string }) {
  const {
    products,
    totalProducts,
    productsLoading,
    fetchProductsPaginated,
    categories,
  } = useStore();

  const getCategoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name ?? "Categoria";
  const [page, setPage] = useState(1);
  const limit = 8;

  const totalPages = Math.ceil(totalProducts / limit);

  useEffect(() => {
    fetchProductsPaginated(page, limit, categoryId);
  }, [page, categoryId]);

  useEffect(() => {
    setPage(1);
  }, [categoryId]);


  if (productsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
       
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.image ?? null,
                extraImages: p.extraImages,
                description: p.description,
                category: getCategoryName(p.categoryId),
              }}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              disabled={page === 1 || productsLoading}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 border rounded"
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                disabled={productsLoading}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 border rounded ${
                  page === i + 1 ? "bg-black text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages || productsLoading}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded"
            >
              Próximo
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
