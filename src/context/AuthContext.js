// src/context/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing user session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem('watchshop-user');
      const token = localStorage.getItem('watchshop-token');
      
      if (savedUser && token) {
        try {
          const user = JSON.parse(savedUser);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('watchshop-user');
          localStorage.removeItem('watchshop-token');
        }
      }
      
      dispatch({ type: 'SET_LOADING', payload: false });
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with real API response
      const mockUser = {
        id: 1,
        email: email,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        preferences: {
          newsletter: true,
          notifications: true
        },
        orderHistory: [],
        wishlist: []
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Save to localStorage
      localStorage.setItem('watchshop-user', JSON.stringify(mockUser));
      localStorage.setItem('watchshop-token', mockToken);
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
      return { success: true };
      
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone || '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'USA'
        },
        preferences: {
          newsletter: userData.newsletter || false,
          notifications: true
        },
        orderHistory: [],
        wishlist: []
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('watchshop-user', JSON.stringify(newUser));
      localStorage.setItem('watchshop-token', mockToken);
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
      return { success: true };
      
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('watchshop-user');
    localStorage.removeItem('watchshop-token');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...state.user, ...updatedData };
    localStorage.setItem('watchshop-user', JSON.stringify(updatedUser));
    dispatch({ type: 'UPDATE_PROFILE', payload: updatedData });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      updateProfile,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
