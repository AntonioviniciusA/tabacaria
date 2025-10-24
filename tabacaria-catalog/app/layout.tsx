import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { Suspense } from "react"
import { ProductsProvider } from "@/lib/products-context"
import { CategoriesProvider } from "@/lib/categories-context"
import { SettingsProvider } from "@/lib/settings-context"
import { ThemeProvider } from "@/lib/theme-provider"
import { AdminAuthProvider } from "@/lib/admin-auth-context"

export const metadata: Metadata = {
  title: "PNM Headshop - Tabacaria Premium",
  description: "Produtos premium de tabacaria",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AdminAuthProvider>
              <SettingsProvider>
                <CategoriesProvider>
                  <ProductsProvider>
                    <CartProvider>{children}</CartProvider>
                  </ProductsProvider>
                </CategoriesProvider>
              </SettingsProvider>
            </AdminAuthProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
