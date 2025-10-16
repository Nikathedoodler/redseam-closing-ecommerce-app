"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

export type CartItem = {
  id: number;
  cover_image: string;
  name: string;
  price: number;
  selectedQuantity: number;
  maxStock: number;
  total_price?: number;
  size?: string;
  color?: string | undefined;
};

type CartContextType = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  setIsCartOpen: (isCartOpen: boolean) => void;
  incrementQuantity: (itemId: number, maxStock: number) => void;
  decrementQuantity: (itemId: number) => void;
};

const ProductCartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    // Only save to localStorage if in browser
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.selectedQuantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.selectedQuantity,
    0
  );

  const addToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id === newItem.id) {
            const newTotal = item.selectedQuantity + newItem.selectedQuantity;
            return {
              ...item,
              selectedQuantity: Math.min(newTotal, item.maxStock),
            };
          }
          return item;
        });
      } else {
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prev) =>
      prev.length ? prev.filter((item) => cartItem.id !== item.id) : prev
    );
  };

  const incrementQuantity = (itemId: number, maxStock: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          if (maxStock && item.selectedQuantity >= maxStock) {
            return item;
          }
          return { ...item, selectedQuantity: item.selectedQuantity + 1 };
        }
        return item;
      })
    );
  };

  const decrementQuantity = (itemId: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            if (item.selectedQuantity <= 1) {
              return undefined; // Remove item if quantity becomes 0
            }
            return { ...item, selectedQuantity: item.selectedQuantity - 1 };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== undefined)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue: CartContextType = {
    cartItems,
    isCartOpen,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    setIsCartOpen,
    incrementQuantity,
    decrementQuantity,
  };

  return (
    <ProductCartContext.Provider value={contextValue}>
      {children}
    </ProductCartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(ProductCartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
