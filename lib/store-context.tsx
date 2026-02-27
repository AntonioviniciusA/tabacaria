"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string;
  categoryId: string;
  extraImages?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Analytics {
  productId: string;
  productName: string;
  clicks: number;
  lastClicked: string;
}

interface StoreContextType {
  categories: Category[];
  fiveCategories: Category[];
  products: Product[];
  cart: CartItem[];
  analytics: Analytics[];
  cookiesAccepted: boolean;
  isLoaded: boolean;
  addCategory: (category: Omit<Category, "id">) => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductsByCategory: (categoryId: string) => Product[];
  addCart: (product: Product, quantity: number) => Promise<void>;
  removeCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  trackProductClick: (productId: string) => Promise<void>;
  getAnalytics: () => Analytics[];
  GetFiveCategories: () => Category[];
  setCookiesAccepted: (accepted: boolean) => Promise<void>;
  refreshData: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [cookiesAccepted, setCookiesAcceptedState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);


  // Função para carregar todos os dados do banco
  const loadData = useCallback(async () => {
    try {
      // Carrega categories
      const catsRes = await fetch("/api/categories");
      if (catsRes.ok) {
        const cats = await catsRes.json();
        setCategories(cats);
      }

      // Carrega products
      const prodsRes = await fetch("/api/products");
      if (prodsRes.ok) {
        const prods = await prodsRes.json();
        setProducts(prods);
      }

      // Carrega cart
      const cartRes = await fetch("/api/cart");
      if (cartRes.ok) {
        const cartData = await cartRes.json();
        setCart(cartData);
      }

      // Carrega analytics
      const analyticsRes = await fetch("/api/analytics");
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }

      // Carrega preferences (cookies)
      const prefsRes = await fetch("/api/preferences");
      if (prefsRes.ok) {
        const prefs = await prefsRes.json();
        setCookiesAcceptedState(prefs.cookiesAccepted || false);
      }

      setIsLoaded(true);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setIsLoaded(true);
    }
  }, []);

  // Carrega dados na inicialização
  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshData = useCallback(async () => {
    await loadData();
  }, [loadData]);

  // Categories
  const addCategory = useCallback(async (category: Omit<Category, "id">) => {
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (res.ok) {
        const newCat = await res.json();
        setCategories((prev) => [...prev, newCat]);
      }
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
    }
  }, []);

  const updateCategory = useCallback(
    async (id: string, category: Partial<Category>) => {
     console.info("Updating category with ID (from context):", id);
      try {
        const res = await fetch(`/api/categories/id/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(category),
        });
        if (res.ok) {
          const updated = await res.json();
          setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
        }
      } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
      }
    },
    []
  );

  const deleteCategory = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/categories/id/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Erro ao deletar categoria");
      }
      setCategories((prev) => prev.filter((c) => c.id !== id));
      // Remove produtos relacionados também
      setProducts((prev) => prev.filter((p) => p.categoryId !== id));
      return { success: true };
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      throw error;
    }
  }, []);

  // Products
  const addProduct = useCallback(async (product: Omit<Product, "id">) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        const newProduct = await res.json();
        setProducts((prev) => [...prev, newProduct]);
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  }, []);

  const updateProduct = useCallback(
    async (id: string, product: Partial<Product>) => {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        if (res.ok) {
          const updated = await res.json();
          setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        }
      } catch (error) {
        console.error("Erro ao atualizar produto:", error);
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  }, []);

  // Cart
  const addCart = useCallback(async (product: Product, quantity: number) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity }),
      });
      if (res.ok) {
        // Recarrega o carrinho
        const cartRes = await fetch("/api/cart");
        if (cartRes.ok) {
          const cartData = await cartRes.json();
          setCart(cartData);
        }
      }
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  }, []);

  const removeCart = useCallback(async (productId: string) => {
    try {
      const res = await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
      }
    } catch (error) {
      console.error("Erro ao remover do carrinho:", error);
    }
  }, []);

  const updateCartQuantity = useCallback(
    async (productId: string, quantity: number) => {
      try {
        if (quantity <= 0) {
          await removeCart(productId);
          return;
        }
        const res = await fetch(`/api/cart/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });
        if (res.ok) {
          // Recarrega o carrinho
          const cartRes = await fetch("/api/cart");
          if (cartRes.ok) {
            const cartData = await cartRes.json();
            setCart(cartData);
          }
        }
      } catch (error) {
        console.error("Erro ao atualizar quantidade do carrinho:", error);
      }
    },
    [removeCart]
  );

  const clearCart = useCallback(async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
      });
      if (res.ok) {
        setCart([]);
      }
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
    }
  }, []);

  // Analytics
  const trackProductClick = useCallback(async (productId: string) => {
    try {
      await fetch("/api/analytics", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: productId,
        }),
      });
    } catch (error) {
      console.error("Erro ao rastrear clique:", error);
    }
  }, []);

  const getAnalytics = useCallback(() => {
    return analytics;
  }, [analytics]);

  // Preferences
  const setCookiesAccepted = useCallback(async (accepted: boolean) => {
    try {
      const res = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cookiesAccepted: accepted }),
      });
      if (res.ok) {
        setCookiesAcceptedState(accepted);
      }
    } catch (error) {
      console.error("Erro ao salvar preferência de cookies:", error);
    }
  }, []);

  const getProductsByCategory = useCallback(
    (categoryId: string) => {
      return products.filter((p) => p.categoryId === categoryId);
    },
    [products]
  );
const GetFiveCategories = useCallback(() => {
  return categories.slice(0, 5);
}, [categories]);

const fiveCategories = GetFiveCategories();

  

  return (
    <StoreContext.Provider
      value={{
        categories,
        fiveCategories,
        products,
        cart,
        analytics,
        cookiesAccepted,
        isLoaded,
        addCategory,
        addProduct,
        addCart,
        removeCart,
        updateCartQuantity,
        clearCart,
        trackProductClick,
        getAnalytics,
        setCookiesAccepted,
        updateCategory,
        updateProduct,
        deleteCategory,
        deleteProduct,
        getProductsByCategory,
        refreshData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
