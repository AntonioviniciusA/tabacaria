"use client"

import type React from "react"

import { useState } from "react"
import { useProducts } from "@/lib/products-context"
import { useCategories } from "@/lib/categories-context"
import { useSettings } from "@/lib/settings-context"
import { useAdminAuth } from "@/lib/admin-auth-context"
import { AdminLogin } from "@/components/admin-login"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus, ArrowLeft, LogOut, FolderOpen, Package, Settings, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/lib/cart-context"
import type { Category } from "@/lib/categories-context"
import type { WhatsAppNumber } from "@/lib/settings-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function AdminPage() {
  const { isAuthenticated, logout, changePassword } = useAdminAuth()
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories()
  const { whatsappNumbers, addWhatsAppNumber, updateWhatsAppNumber, deleteWhatsAppNumber } = useSettings()
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "settings">("products")
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  })
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    image: "",
  })
  const [whatsappForm, setWhatsappForm] = useState({
    number: "",
    location: "",
    isDefault: false,
  })

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const priceValue = Number.parseFloat(productForm.price.replace(/[^\d,]/g, "").replace(",", "."))

    if (editingId) {
      updateProduct(editingId, {
        name: productForm.name,
        category: productForm.category,
        price: `R$ ${priceValue.toFixed(2).replace(".", ",")}`,
        priceValue,
        image: productForm.image || "/placeholder.svg",
      })
      setEditingId(null)
    } else {
      addProduct({
        name: productForm.name,
        category: productForm.category,
        price: `R$ ${priceValue.toFixed(2).replace(".", ",")}`,
        priceValue,
        image: productForm.image || "/placeholder.svg",
      })
    }

    setProductForm({ name: "", category: "", price: "", image: "" })
    setIsAdding(false)
  }

  const handleProductEdit = (product: Product) => {
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.priceValue.toString(),
      image: product.image || "",
    })
    setEditingId(product.id)
    setIsAdding(true)
  }

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      updateCategory(editingId, {
        name: categoryForm.name,
        description: categoryForm.description,
        image: categoryForm.image || "/placeholder.svg",
      })
      setEditingId(null)
    } else {
      addCategory({
        name: categoryForm.name,
        description: categoryForm.description,
        image: categoryForm.image || "/placeholder.svg",
      })
    }

    setCategoryForm({ name: "", description: "", image: "" })
    setIsAdding(false)
  }

  const handleCategoryEdit = (category: Category) => {
    setCategoryForm({
      name: category.name,
      description: category.description,
      image: category.image || "",
    })
    setEditingId(category.id)
    setIsAdding(true)
  }

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      updateWhatsAppNumber(editingId, whatsappForm)
      setEditingId(null)
    } else {
      addWhatsAppNumber(whatsappForm)
    }

    setWhatsappForm({ number: "", location: "", isDefault: false })
    setIsAdding(false)
  }

  const handleWhatsAppEdit = (whatsapp: WhatsAppNumber) => {
    setWhatsappForm({
      number: whatsapp.number,
      location: whatsapp.location,
      isDefault: whatsapp.isDefault,
    })
    setEditingId(whatsapp.id)
    setIsAdding(true)
  }

  const handleCancel = () => {
    setProductForm({ name: "", category: "", price: "", image: "" })
    setCategoryForm({ name: "", description: "", image: "" })
    setWhatsappForm({ number: "", location: "", isDefault: false })
    setEditingId(null)
    setIsAdding(false)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess(false)

    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError("As senhas não coincidem")
      return
    }

    if (passwordForm.new.length < 6) {
      setPasswordError("A nova senha deve ter pelo menos 6 caracteres")
      return
    }

    const success = await changePassword(passwordForm.current, passwordForm.new)

    if (success) {
      setPasswordSuccess(true)
      setPasswordForm({ current: "", new: "", confirm: "" })
      setTimeout(() => {
        setPasswordSuccess(false)
      }, 2000)
    } else {
      setPasswordError("Senha atual incorreta")
    }
  }

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
            <h1 className="text-3xl font-serif">Painel Administrativo</h1>
          </div>
          <Button variant="outline" onClick={logout} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "products" ? "default" : "outline"}
            onClick={() => {
              setActiveTab("products")
              setIsAdding(false)
              setEditingId(null)
            }}
            className="gap-2"
          >
            <Package className="h-4 w-4" />
            Produtos
          </Button>
          <Button
            variant={activeTab === "categories" ? "default" : "outline"}
            onClick={() => {
              setActiveTab("categories")
              setIsAdding(false)
              setEditingId(null)
            }}
            className="gap-2"
          >
            <FolderOpen className="h-4 w-4" />
            Categorias
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "outline"}
            onClick={() => {
              setActiveTab("settings")
              setIsAdding(false)
              setEditingId(null)
            }}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
        </div>

        {!isAdding && activeTab !== "settings" && (
          <Button onClick={() => setIsAdding(true)} className="gap-2 mb-6">
            <Plus className="h-4 w-4" />
            {activeTab === "products" ? "Adicionar Produto" : "Adicionar Categoria"}
          </Button>
        )}

        {isAdding && activeTab === "products" && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-serif mb-6">{editingId ? "Editar Produto" : "Novo Produto"}</h2>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={productForm.category}
                    onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="/placeholder.svg"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">{editingId ? "Salvar Alterações" : "Adicionar Produto"}</Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {isAdding && activeTab === "categories" && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-serif mb-6">{editingId ? "Editar Categoria" : "Nova Categoria"}</h2>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cat-name">Nome da Categoria</Label>
                  <Input
                    id="cat-name"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cat-image">URL da Imagem</Label>
                  <Input
                    id="cat-image"
                    value={categoryForm.image}
                    onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                    placeholder="/placeholder.svg"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="cat-description">Descrição</Label>
                  <Textarea
                    id="cat-description"
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">{editingId ? "Salvar Alterações" : "Adicionar Categoria"}</Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {activeTab === "settings" && (
          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-serif mb-6">Alterar Senha</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="current">Senha Atual</Label>
                    <Input
                      id="current"
                      type="password"
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="new">Nova Senha</Label>
                    <Input
                      id="new"
                      type="password"
                      value={passwordForm.new}
                      onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm">Confirmar Nova Senha</Label>
                    <Input
                      id="confirm"
                      type="password"
                      value={passwordForm.confirm}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {passwordError && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{passwordError}</div>
                )}
                {passwordSuccess && (
                  <div className="bg-green-500/10 text-green-600 dark:text-green-400 text-sm p-3 rounded-md">
                    Senha alterada com sucesso!
                  </div>
                )}
                <Button type="submit">Alterar Senha</Button>
              </form>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif">Números de WhatsApp</h2>
                {!isAdding && (
                  <Button onClick={() => setIsAdding(true)} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar Número
                  </Button>
                )}
              </div>

              {isAdding && (
                <form onSubmit={handleWhatsAppSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                  <h3 className="font-medium">{editingId ? "Editar Número" : "Novo Número"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="whatsapp-number">Número (com DDI e DDD)</Label>
                      <Input
                        id="whatsapp-number"
                        placeholder="5511999999999"
                        value={whatsappForm.number}
                        onChange={(e) => setWhatsappForm({ ...whatsappForm, number: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp-location">Local/Região</Label>
                      <Input
                        id="whatsapp-location"
                        placeholder="Ex: São Paulo - Centro"
                        value={whatsappForm.location}
                        onChange={(e) => setWhatsappForm({ ...whatsappForm, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is-default"
                      checked={whatsappForm.isDefault}
                      onCheckedChange={(checked) => setWhatsappForm({ ...whatsappForm, isDefault: checked as boolean })}
                    />
                    <Label htmlFor="is-default" className="cursor-pointer">
                      Definir como número padrão
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">{editingId ? "Salvar Alterações" : "Adicionar Número"}</Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {whatsappNumbers.map((whatsapp) => (
                  <div key={whatsapp.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{whatsapp.number}</span>
                          {whatsapp.isDefault && (
                            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">Padrão</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{whatsapp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleWhatsAppEdit(whatsapp)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteWhatsAppNumber(whatsapp.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "products" && (
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
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-serif mb-2">{product.name}</h3>
                  <p className="text-lg font-light mb-4">{product.price}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleProductEdit(product)} className="flex-1">
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "categories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleCategoryEdit(category)} className="flex-1">
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteCategory(category.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
