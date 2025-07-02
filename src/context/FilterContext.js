// src/context/FilterContext.js
import React, { createContext, useContext, useReducer } from 'react';

const FilterContext = createContext();

const initialState = {
  searchQuery: '',
  selectedGender: 'all',
  selectedBrand: 'all',
  priceRange: { min: 0, max: 1000 },
  minRating: 0,
  sortBy: 'featured', // featured, price-low, price-high, rating, newest
  showOnlyInStock: false
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_GENDER':
      return { ...state, selectedGender: action.payload };
    case 'SET_BRAND':
      return { ...state, selectedBrand: action.payload };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'SET_MIN_RATING':
      return { ...state, minRating: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_SHOW_ONLY_IN_STOCK':
      return { ...state, showOnlyInStock: action.payload };
    case 'RESET_FILTERS':
      return initialState;
    default:
      return state;
  }
};

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setGender = (gender) => {
    dispatch({ type: 'SET_GENDER', payload: gender });
  };

  const setBrand = (brand) => {
    dispatch({ type: 'SET_BRAND', payload: brand });
  };

  const setPriceRange = (range) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: range });
  };

  const setMinRating = (rating) => {
    dispatch({ type: 'SET_MIN_RATING', payload: rating });
  };

  const setSortBy = (sortBy) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortBy });
  };

  const setShowOnlyInStock = (showOnly) => {
    dispatch({ type: 'SET_SHOW_ONLY_IN_STOCK', payload: showOnly });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  return (
    <FilterContext.Provider value={{
      ...state,
      setSearchQuery,
      setGender,
      setBrand,
      setPriceRange,
      setMinRating,
      setSortBy,
      setShowOnlyInStock,
      resetFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
