"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useStore } from "@/lib/store-context";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string | null;
  extraImages?: string[];
  description?: string | null;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { trackProductClick } = useStore();
  const addItem = useCartStore((state) => state.addItem);
  const priceLabel = `R$ ${Number(product.price).toFixed(2).replace(".", ",")}`;
  const images = [
    ...(product.image ? [product.image] : []),
    ...(product.extraImages || []),
  ];

  const handleAddToCart = () => {
    trackProductClick(product.id);
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: priceLabel,
      image: product.image || "/placeholder.svg",
    });
    console.log("Product added to cart:", product.id);

    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <Card className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="relative aspect-square overflow-hidden bg-muted">
              {images.length > 0 ? (
                <Carousel className="w-full h-full">
                  <CarouselContent className="h-full">
                    {images.map((src, idx) => (
                      <CarouselItem
                        key={`${product.id}-${idx}`}
                        className="h-full"
                      >
                        <div className="relative w-full h-full">
                          {src?.startsWith("data:") ? (
                            <img
                              src={src}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <Image
                              src={src || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              ) : (
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
            </div>
          </HoverCardTrigger>
          {product.description && (
            <HoverCardContent>
              <div className="text-sm">{product.description}</div>
            </HoverCardContent>
          )}
        </HoverCard>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {product.category}
        </p>
        <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
        <p className="mt-2 text-2xl font-bold text-green-400">{priceLabel}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <ShoppingCart className="h-4 w-4" />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
}
