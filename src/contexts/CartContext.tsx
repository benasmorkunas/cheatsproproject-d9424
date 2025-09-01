'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface SimpleProduct {
  id: string;
  name: string;
  price: number; // in cents
  description: string;
  image: string;
  stripe_price_id: string;
  currency: string;
}

export interface CartItem {
  product: SimpleProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: SimpleProduct }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

interface CartContextType extends CartState {
  addToCart: (product: SimpleProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.1; // 10% tax
const SHIPPING_COST = 5.99;
const FREE_SHIPPING_THRESHOLD = 50;

function calculateTotals(items: CartItem[]): Omit<CartState, 'items'> {
  const subtotal = items.reduce((sum, item) => sum + ((item.product.price / 100) * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + tax + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    itemCount
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }

      return {
        items: newItems,
        ...calculateTotals(newItems)
      };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      return {
        items: newItems,
        ...calculateTotals(newItems)
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: action.payload.productId });
      }

      const newItems = state.items.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      return {
        items: newItems,
        ...calculateTotals(newItems)
      };
    }

    case 'CLEAR_CART': {
      return {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0,
        shipping: 0,
        itemCount: 0
      };
    }

    case 'LOAD_CART': {
      return action.payload;
    }

    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  itemCount: 0
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product: SimpleProduct) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}