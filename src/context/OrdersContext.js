// src/context/OrdersContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrdersContext = createContext();

const initialState = {
  orders: [],
  isLoading: false,
  error: null
};

const ordersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    case 'LOAD_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
        error: null
      };
    
    case 'LOAD_ORDERS_ERROR':
      return {
        ...state,
        orders: [],
        isLoading: false,
        error: action.payload
      };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        )
      };
    
    case 'CLEAR_ORDERS':
      return {
        ...state,
        orders: []
      };
    
    default:
      return state;
  }
};

export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load orders when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      loadOrders();
    } else {
      dispatch({ type: 'CLEAR_ORDERS' });
    }
  }, [isAuthenticated, user]);

  const loadOrders = async () => {
    if (!user) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load from localStorage for demo
      const ordersKey = `watchshop-orders-${user.id}`;
      const savedOrders = localStorage.getItem(ordersKey);
      
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        dispatch({ type: 'LOAD_ORDERS_SUCCESS', payload: parsedOrders });
      } else {
        // Create some mock orders for demo
        const mockOrders = generateMockOrders();
        localStorage.setItem(ordersKey, JSON.stringify(mockOrders));
        dispatch({ type: 'LOAD_ORDERS_SUCCESS', payload: mockOrders });
      }
    } catch (error) {
      dispatch({ type: 'LOAD_ORDERS_ERROR', payload: error.message });
    }
  };

  const generateMockOrders = () => {
    return [
      {
        id: 'WS1704067200001',
        orderNumber: 'WS1704067200001',
        date: '2024-01-01T10:00:00Z',
        status: 'delivered',
        items: [
          {
            id: 1,
            name: 'Classic Gold Elegance Watch',
            brand: 'LuxuryTime',
            price: 299,
            quantity: 1,
            image: null
          }
        ],
        subtotal: 299,
        shipping: 0,
        tax: 23.92,
        total: 322.92,
        shippingAddress: {
          name: `${user?.firstName} ${user?.lastName}`,
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001'
        },
        trackingNumber: 'TRK123456789'
      },
      {
        id: 'WS1703980800002',
        orderNumber: 'WS1703980800002',
        date: '2023-12-30T15:30:00Z',
        status: 'shipped',
        items: [
          {
            id: 2,
            name: 'Diamond Rose Gold Ladies Watch',
            brand: 'Elegante',
            price: 599,
            quantity: 1,
            image: null
          },
          {
            id: 3,
            name: 'Sport Chronograph Steel',
            brand: 'SportTime',
            price: 199,
            quantity: 1,
            image: null
          }
        ],
        subtotal: 798,
        shipping: 0,
        tax: 63.84,
        total: 861.84,
        shippingAddress: {
          name: `${user?.firstName} ${user?.lastName}`,
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001'
        },
        trackingNumber: 'TRK987654321'
      },
      {
        id: 'WS1703894400003',
        orderNumber: 'WS1703894400003',
        date: '2023-12-29T09:15:00Z',
        status: 'processing',
        items: [
          {
            id: 4,
            name: 'Vintage Leather Strap Watch',
            brand: 'Heritage',
            price: 149,
            quantity: 2,
            image: null
          }
        ],
        subtotal: 298,
        shipping: 15,
        tax: 25.04,
        total: 338.04,
        shippingAddress: {
          name: `${user?.firstName} ${user?.lastName}`,
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001'
        },
        trackingNumber: null
      }
    ];
  };

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `WS${Date.now()}`,
      date: new Date().toISOString(),
      status: 'processing'
    };
    
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    
    // Save to localStorage
    if (user) {
      const ordersKey = `watchshop-orders-${user.id}`;
      const updatedOrders = [newOrder, ...state.orders];
      localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));
    }
    
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
    
    // Update localStorage
    if (user) {
      const ordersKey = `watchshop-orders-${user.id}`;
      const updatedOrders = state.orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      );
      localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));
    }
  };

  return (
    <OrdersContext.Provider value={{
      ...state,
      loadOrders,
      addOrder,
      updateOrderStatus
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
