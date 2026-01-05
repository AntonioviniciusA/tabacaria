import { Header } from "@/components/header"
import { CategoryNav } from "@/components/category-nav"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CategoryNav />
      <Hero />
      <ProductGrid />
      <Footer />
    </main>
  )
}
