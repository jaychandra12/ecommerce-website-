import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@shared/schema";

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: number;
}

export interface Cart {
  items: CartItem[];
}

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product & { selectedSize?: number }) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const { toast } = useToast();
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("sneakerland-cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sneakerland-cart", JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product: Product & { selectedSize?: number }) => {
    setCart((prevCart) => {
      // Check if this product is already in the cart with the same size
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      );
      
      if (existingItemIndex !== -1) {
        // Update quantity if already in cart
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex].quantity += 1;
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased.`,
        });
        
        return { ...prevCart, items: updatedItems };
      } else {
        // Add new item to cart
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
        
        return {
          ...prevCart,
          items: [
            ...prevCart.items,
            {
              ...product,
              quantity: 1
            }
          ]
        };
      }
    });
  };
  
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.id !== productId)
    }));
  };
  
  const updateCartItemQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) => 
        item.id === productId ? { ...item, quantity } : item
      )
    }));
  };
  
  const clearCart = () => {
    setCart({ items: [] });
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
}