"use client"

import Link from "next/link"
import { Flame, Sparkles, Gem, Package } from "lucide-react"

const categories = [
  { name: "Sedas", icon: Flame, href: "#sedas" },
  { name: "Isqueiros", icon: Sparkles, href: "#isqueiros" },
  { name: "Acessórios", icon: Gem, href: "#acessorios" },
  { name: "Todos", icon: Package, href: "#todos" },
]

export function CategoryNav() {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-center gap-8 py-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              >
                <Icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                <span>{category.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
