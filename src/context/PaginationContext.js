import React, { createContext, useContext, useReducer, useEffect } from 'react';

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
      return {
        ...state,
        itemsPerPage: action.payload,
        currentPage: 1 // Reset to first page when changing items per page
      };
    
    case 'SET_TOTAL_ITEMS':
      const totalPages = Math.ceil(action.payload / state.itemsPerPage);
      return {
        ...state,
        totalItems: action.payload,
        totalPages: totalPages,
        currentPage: state.currentPage > totalPages ? 1 : state.currentPage
      };
    
    case 'RESET_PAGINATION':
      return {
        ...initialState,
        itemsPerPage: state.itemsPerPage // Keep the selected items per page
      };
    
    default:
      return state;
  }
};

export const PaginationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paginationReducer, initialState);

  const setCurrentPage = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const setItemsPerPage = (items) => {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: items });
  };

  const setTotalItems = (total) => {
    dispatch({ type: 'SET_TOTAL_ITEMS', payload: total });
  };

  const resetPagination = () => {
    dispatch({ type: 'RESET_PAGINATION' });
  };

  const goToNextPage = () => {
    if (state.currentPage < state.totalPages) {
      setCurrentPage(state.currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (state.currentPage > 1) {
      setCurrentPage(state.currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(state.totalPages);
  };

  // Calculate pagination data
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const hasNextPage = state.currentPage < state.totalPages;
  const hasPrevPage = state.currentPage > 1;

  return (
    <PaginationContext.Provider value={{
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
    }}>
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
