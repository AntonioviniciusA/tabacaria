"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { CategoryNav } from "@/components/category-nav";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";

type ApiProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  categoryId: string;
  extraImages?: string[];
};

export default function CategoriaSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const routeParams = useParams();
  const slugParam =
    typeof (routeParams as any)?.slug === "string"
      ? (routeParams as any).slug
      : typeof params?.slug === "string"
      ? params!.slug!
      : "";
  const [categoryName, setCategoryName] = useState<string>("Categoria");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const catRes = await fetch(`/api/categories/${slugParam}`, {
          cache: "no-store",
        });
        if (catRes.ok) {
          const cat = await catRes.json();
          if (active) {
            setCategoryName(cat?.slug);
            setCategoryId(cat?.id ?? null);
          }
        } else {
          setCategoryName("Categoria");
          setCategoryId(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [slugParam]);

  return (
    <main className="min-h-screen">
      <Header />
      <CategoryNav />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">
            {loading ? "Carregando..." : categoryName}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {loading
              ? "Buscando produtos..."
              : `Produtos da categoria ${slugParam}`}
          </p>
        </div>

        {!loading && (
          <ProductGrid
            categoryId={categoryId ?? undefined}
            title={categoryName}
            subtitle={`Produtos da categoria ${categoryName}`}
          />
        )}
      </section>

      <Footer />
    </main>
  );
}
