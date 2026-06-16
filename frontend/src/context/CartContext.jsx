import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };

  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [] });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/cart', {
        headers: getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart whenever user logs in or out
  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      throw new Error('Please log in to add items to cart');
    }

    // Determine target quantity
    const existingItem = cart.items.find(
      (item) => item.productId?._id === productId || item.productId === productId
    );
    
    // If it already exists, increment the quantity
    const targetQuantity = existingItem 
      ? existingItem.quantity + quantity 
      : quantity;

    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ productId, quantity: targetQuantity }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to add item to cart');
    }

    setCart(data);
    return data;
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to update quantity');
    }

    setCart(data);
    return data;
  };

  const removeFromCart = async (productId) => {
    const res = await fetch(`/api/cart/${productId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to remove item');
    }

    setCart(data);
    return data;
  };

  const clearCart = async () => {
    const res = await fetch('/api/cart', {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (res.ok) {
      setCart({ items: [] });
    } else {
      const data = await res.json();
      throw new Error(data.message || 'Failed to clear cart');
    }
  };

  // Calculate stats
  const cartItemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.items.reduce((total, item) => {
    const price = item.productId?.price || 0;
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartItemsCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
