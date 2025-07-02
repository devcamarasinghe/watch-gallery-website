// src/hooks/usePaginatedProducts.js
import { useMemo, useEffect } from 'react';
import { usePagination } from '../context/PaginationContext';

export const usePaginatedProducts = (products) => {
  const {
    currentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    setTotalItems,
    resetPagination
  } = usePagination();

  // Update total items when products change
  useEffect(() => {
    setTotalItems(products.length);
  }, [products.length, setTotalItems]);

  // Reset pagination when products array changes significantly
  useEffect(() => {
    resetPagination();
  }, [products.length, resetPagination]);

  // Get paginated products
  const paginatedProducts = useMemo(() => {
    return products.slice(startIndex, endIndex);
  }, [products, startIndex, endIndex]);

  return {
    paginatedProducts,
    currentPage,
    totalItems: products.length,
    hasProducts: products.length > 0
  };
};
