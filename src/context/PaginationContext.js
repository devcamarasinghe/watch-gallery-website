import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

const PaginationContext = createContext();

const initialState = {
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
  totalPages: 0
};

const paginationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
    
    case 'SET_ITEMS_PER_PAGE':
      const totalPages = Math.ceil(state.totalItems / action.payload);
      return {
        ...state,
        itemsPerPage: action.payload,
        totalPages,
        currentPage: 1 // Reset to first page when items per page changes
      };
    
    case 'SET_TOTAL_ITEMS':
      const newTotalPages = Math.ceil(action.payload / state.itemsPerPage);
      return {
        ...state,
        totalItems: action.payload,
        totalPages: newTotalPages,
        currentPage: state.currentPage > newTotalPages ? 1 : state.currentPage
      };
    
    case 'RESET_PAGINATION':
      return {
        ...initialState,
        itemsPerPage: state.itemsPerPage
      };
    
    default:
      return state;
  }
};

export const PaginationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paginationReducer, initialState);

  // Memoized action creators to prevent unnecessary re-renders
  const setCurrentPage = useCallback((page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  }, []);

  const setItemsPerPage = useCallback((items) => {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: items });
  }, []);

  const setTotalItems = useCallback((total) => {
    dispatch({ type: 'SET_TOTAL_ITEMS', payload: total });
  }, []);

  const resetPagination = useCallback(() => {
    dispatch({ type: 'RESET_PAGINATION' });
  }, []);

  // Memoized navigation functions
  const goToNextPage = useCallback(() => {
    if (state.currentPage < state.totalPages) {
      setCurrentPage(state.currentPage + 1);
    }
  }, [state.currentPage, state.totalPages, setCurrentPage]);

  const goToPrevPage = useCallback(() => {
    if (state.currentPage > 1) {
      setCurrentPage(state.currentPage - 1);
    }
  }, [state.currentPage, setCurrentPage]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  const goToLastPage = useCallback(() => {
    setCurrentPage(state.totalPages);
  }, [state.totalPages, setCurrentPage]);

  // Calculate derived values
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const hasNextPage = state.currentPage < state.totalPages;
  const hasPrevPage = state.currentPage > 1;

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    ...state,
    setCurrentPage,
    setItemsPerPage,
    setTotalItems,
    resetPagination,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage
  }), [
    state,
    setCurrentPage,
    setItemsPerPage,
    setTotalItems,
    resetPagination,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage
  ]);

  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};