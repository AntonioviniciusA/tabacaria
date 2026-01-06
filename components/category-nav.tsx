"use client";

import Link from "next/link";
import { Flame, Scroll, TestTube, Package } from "lucide-react";
import { useStore } from "@/lib/store-context";

function getIconByName(name: string) {
  if (name === "Sedas") return Scroll;
  if (name === "Isqueiros") return Flame;
  if (name === "Piteiras") return TestTube;
  return Package;
}

export function CategoryNav() {
  const { categories } = useStore();
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-center gap-8 py-4">
          {categories.map((category) => {
            const Icon = getIconByName(category.name);
            return (
              <Link
                key={category.id}
                href={`/categorias/${category.slug}`}
                className="group flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              >
                <Icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                <span>{category.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
