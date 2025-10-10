"use client";

import type React from "react";

import { useState } from "react";
import { useProducts } from "@/lib/products-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/cart-context";

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceValue = Number.parseFloat(
      formData.price.replace(/[^\d,]/g, "").replace(",", ".")
    );

    if (editingId) {
      updateProduct(editingId, {
        name: formData.name,
        category: formData.category,
        price: `R$ ${priceValue.toFixed(2).replace(".", ",")}`,
        priceValue,
        image: formData.image || "/placeholder.svg",
      });
      setEditingId(null);
    } else {
      addProduct({
        name: formData.name,
        category: formData.category,
        price: `R$ ${priceValue.toFixed(2).replace(".", ",")}`,
        priceValue,
        image: formData.image || "/placeholder.svg",
      });
    }

    setFormData({ name: "", category: "", price: "", image: "" });
    setIsAdding(false);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.priceValue.toString(),
      image: product.image || "",
    });
    setEditingId(product.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData({ name: "", category: "", price: "", image: "" });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-serif">Gerenciar Produtos</h1>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Produto
            </Button>
          )}
        </div>

        {isAdding && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-serif mb-6">
              {editingId ? "Editar Produto" : "Novo Produto"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="/placeholder.svg"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? "Salvar Alterações" : "Adicionar Produto"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif mb-2">{product.name}</h3>
                <p className="text-lg font-light mb-4 text-price">
                  {product.price}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="flex-1"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
