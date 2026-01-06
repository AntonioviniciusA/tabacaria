import { Header } from "@/components/header";
import { CategoryNav } from "@/components/category-nav";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CategoryNav />
      <Hero />
      <div className="mb-12 mt-12 text-center">
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Nossos Produtos
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Confira nossa seleção de produtos para sua tabacaria
        </p>
      </div>
      <ProductGrid />
      <Footer />
    </main>
  );
}
