"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Product } from "@/data/productos";
import { Ingredient } from "@/data/ingredientes";

// Extendemos el tipo para guardar el precio calculado con extras
type CartItem = Product & {
  quantity: number;
  cartItemId: string;
  selectedIngredients: Ingredient[];
  unitPrice: number; // <--- Nuevo campo: Precio base + extras
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, selectedIngredients?: Ingredient[]) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, selectedIngredients: Ingredient[] = []) => {
    // 1. Calcular el precio unitario real (Base + Extras)
    const extrasPrice = selectedIngredients.reduce(
      (acc, ing) => acc + (ing.price || 0), 
      0
    );
    const unitPrice = product.price + extrasPrice;

    // 2. Generar el ID único basado en producto + ingredientes
    const ingredientIds = selectedIngredients
      .map((ingredient) => ingredient.id)
      .sort((a, b) => a - b)
      .join("-");
    const cartItemId = `${product.id}-${ingredientIds || "sin-ingredientes"}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        // Si existe, solo aumentamos cantidad (el precio unitario ya está guardado)
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Si es nuevo, lo agregamos con el precio calculado
      return [
        ...prev,
        { 
          ...product, 
          quantity: 1, 
          cartItemId, 
          selectedIngredients,
          unitPrice // Guardamos el precio con extras
        }
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  // 3. Calcular el total usando el unitPrice, no el price base
  const total = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}