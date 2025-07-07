// src/context/WishlistContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { showToast } from '../utils/toast';

const WishlistContext = createContext();

const initialState = {
  items: [],
  isLoading: false
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload,
        isLoading: false
      };

    case 'ADD_TO_WISHLIST':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Item already in wishlist
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, addedAt: new Date().toISOString() }]
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load wishlist when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      loadWishlist();
    } else {
      // Clear wishlist when user logs out
      dispatch({ type: 'CLEAR_WISHLIST' });
    }
  }, [isAuthenticated, user]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const wishlistKey = `watchshop-wishlist-${user.id}`;
      localStorage.setItem(wishlistKey, JSON.stringify(state.items));
    }
  }, [state.items, isAuthenticated, user]);

  const loadWishlist = () => {
    if (!user) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const wishlistKey = `watchshop-wishlist-${user.id}`;
      const savedWishlist = localStorage.getItem(wishlistKey);

      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
      } else {
        dispatch({ type: 'LOAD_WISHLIST', payload: [] });
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      dispatch({ type: 'LOAD_WISHLIST', payload: [] });
    }
  };

  const addToWishlist = (product) => {
    if (!isAuthenticated) {
      showToast.success(
        <div className="flex flex-col gap-1">
          <span>Please sign in to add items to your wishlist</span>
        </div>,
        // { duration: 100 }
      );
      return false;
    }

    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    showToast.success(`${product.name} added to wishlist!`);
    return true;
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  return (
    <WishlistContext.Provider value={{
      ...state,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      itemCount: state.items.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
