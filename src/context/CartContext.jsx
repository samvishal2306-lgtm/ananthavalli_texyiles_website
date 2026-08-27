import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ message: "", show: false });

  // Load cart from LocalStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem("at_cart");
    if (cached) {
      setCart(JSON.parse(cached));
    }
  }, []);

  const triggerToast = (msg) => {
    setToast({ message: msg, show: true });
  };

  // Auto hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("at_cart", JSON.stringify(newCart));
  };

  const addToCart = (product, quantity = 1) => {
    const existingIdx = cart.findIndex((item) => item.product.id === product.id);
    let newCart = [...cart];
    
    if (existingIdx > -1) {
      newCart[existingIdx].quantity += quantity;
    } else {
      newCart.push({ product, quantity });
    }
    
    saveCart(newCart);
    triggerToast(`Added "${product.title}" to cart!`);
  };

  const removeFromCart = (productId) => {
    const item = cart.find(i => i.product.id === productId);
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
    if (item) {
      triggerToast(`Removed "${item.product.title}" from cart.`);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.currentPrice * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartSubtotal,
        triggerToast
      }}
    >
      {children}
      
      {/* Dynamic Toast Element */}
      {toast.show && (
        <div className="toast-notification show">
          {toast.message}
        </div>
      )}
    </CartContext.Provider>
  );
};
