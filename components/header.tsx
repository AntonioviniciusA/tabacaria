"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useEffect, useState } from "react";
import { CategoryNav } from "./category-nav";

export function Header() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openMobileMenu = () => setMobileOpen(true);
  const closeMobileMenu = () => setMobileOpen(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/baqp4872.png"
              alt="PNM Headshop Logo"
              width={120}
              height={60}
              className="h-auto w-28"
              priority
            />
          </Link>

          {/* Desktop menu */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/#produtos" className="text-sm font-medium hover:text-primary">
              PRODUTOS
            </Link>
            <Link href="/#sobre" className="text-sm font-medium hover:text-primary">
              SOBRE
            </Link>
            <Link href="/#contato" className="text-sm font-medium hover:text-primary">
              CONTATO
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/carrinho">
              <Button variant="ghost" size="icon" className="relative md:flex">
                <ShoppingCart className="h-5 w-5" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={openMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMobileMenu}
        />

        {/* Drawer */}
        <aside
          className={`absolute left-0 top-0 h-full w-72 bg-background p-6 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="text-lg font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex flex-col gap-4">
            <Link href="#produtos" onClick={closeMobileMenu}>PRODUTOS</Link>
            <Link href="#sobre" onClick={closeMobileMenu}>SOBRE</Link>
            <Link href="#contato" onClick={closeMobileMenu}>CONTATO</Link>
            <CategoryNav />
          </nav>
        </aside>
      </div>
    </>
  );
}
