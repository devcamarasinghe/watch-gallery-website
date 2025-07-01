// src/context/PreOrderContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PreOrderContext = createContext();

const initialState = {
  preOrders: [],
  isLoading: false
};

const preOrderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    case 'ADD_PRE_ORDER':
      return {
        ...state,
        preOrders: [...state.preOrders, action.payload]
      };
    
    case 'LOAD_PRE_ORDERS':
      return {
        ...state,
        preOrders: action.payload
      };
    
    case 'CLEAR_PRE_ORDERS':
      return {
        ...state,
        preOrders: []
      };
    
    default:
      return state;
  }
};

export const PreOrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(preOrderReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load pre-orders when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      loadPreOrders();
    } else {
      dispatch({ type: 'CLEAR_PRE_ORDERS' });
    }
  }, [isAuthenticated, user]);

  const loadPreOrders = () => {
    if (!user) return;
    
    try {
      const preOrderKey = `watchshop-preorders-${user.id}`;
      const savedPreOrders = localStorage.getItem(preOrderKey);
      
      if (savedPreOrders) {
        const parsedPreOrders = JSON.parse(savedPreOrders);
        dispatch({ type: 'LOAD_PRE_ORDERS', payload: parsedPreOrders });
      }
    } catch (error) {
      console.error('Error loading pre-orders:', error);
    }
  };

  const addPreOrder = (preOrderData) => {
    const newPreOrder = {
      ...preOrderData,
      id: `PRE${Date.now()}`,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    dispatch({ type: 'ADD_PRE_ORDER', payload: newPreOrder });
    
    // Save to localStorage
    if (user) {
      const preOrderKey = `watchshop-preorders-${user.id}`;
      const updatedPreOrders = [...state.preOrders, newPreOrder];
      localStorage.setItem(preOrderKey, JSON.stringify(updatedPreOrders));
    }
    
    return newPreOrder;
  };

  return (
    <PreOrderContext.Provider value={{
      ...state,
      addPreOrder
    }}>
      {children}
    </PreOrderContext.Provider>
  );
};

export const usePreOrder = () => {
  const context = useContext(PreOrderContext);
  if (!context) {
    throw new Error('usePreOrder must be used within a PreOrderProvider');
  }
  return context;
};
