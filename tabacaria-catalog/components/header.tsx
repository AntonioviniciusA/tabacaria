"use client"

import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CartDrawer } from "./cart-drawer"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl lg:text-3xl font-serif italic font-light">Cerrado Smoke Shop</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Início
            </a>
            <a href="#catalogo" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Catálogo
            </a>
            <a href="#sobre" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Sobre
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                Admin
              </Button>
            </Link>
            <CartDrawer />

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="#inicio"
                className="text-sm uppercase tracking-wider hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </a>
              <a
                href="#catalogo"
                className="text-sm uppercase tracking-wider hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Catálogo
              </a>
              <a
                href="#sobre"
                className="text-sm uppercase tracking-wider hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
              <Link
                href="/admin"
                className="text-sm uppercase tracking-wider hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
