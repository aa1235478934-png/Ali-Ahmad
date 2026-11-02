import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types/store';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  lastAddedProduct: { product: Product; timestamp: number } | null;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'gadgethub_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<{ product: Product; timestamp: number } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore write errors
    }
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setLastAddedProduct({ product, timestamp: Date.now() });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const dismissToast = () => setLastAddedProduct(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.pricePKR * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalItems,
        subtotal,
        lastAddedProduct,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
