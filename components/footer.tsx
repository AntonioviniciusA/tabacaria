"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Phone, PanelLeftDashed , Scroll, Flame, TestTube, Package} from "lucide-react";
import { useStore } from "@/lib/store-context";


export function Footer() {
  function getIconByName(name: string) {
  if (name === "Sedas") return Scroll;
  if (name === "Isqueiros") return Flame;
  if (name === "Piteiras de Vidro") return TestTube;
  if (name === "Piteiras") return PanelLeftDashed;

  return Package;
}
  const { fiveCategories } = useStore();
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="PNM Headshop Logo"
              width={120}
              height={60}
              className="h-auto w-28"
            />
            <p className="text-sm text-muted-foreground">
              Sua loja de confiança para produtos de tabacaria com qualidade e
              variedade.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/pnmheadshop/"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          {/* <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Links Rápidos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#produtos"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="#categorias"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link
                  href="#sobre"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="#contato"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Categorias
            </h3>
            {fiveCategories.map((category) => {
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
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>(61) 98184-9308</span>
              </li>
              {/* <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>contato@pnmheadshop.com</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>São Paulo, SP - Brasil</span>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 PNM Headshop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
