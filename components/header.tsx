"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useEffect, useState } from "react";

export function Header() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
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

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#produtos"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            PRODUTOS
          </Link>
          <Link
            href="#sobre"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            SOBRE
          </Link>
          <Link
            href="#contato"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            CONTATO
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/carrinho">
            <Button
              variant="ghost"
              size="icon"
              className="relative hidden md:flex"
            >
              <ShoppingCart className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
