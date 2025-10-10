import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductCategories } from "@/components/product-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { About } from "@/components/about"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { AgeVerification } from "@/components/age-verification"

export default function Home() {
  return (
    <main className="min-h-screen">
      <AgeVerification />
      <Header />
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <About />
      <Newsletter />
      <Footer />
    </main>
  )
}
