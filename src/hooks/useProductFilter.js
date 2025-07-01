// src/hooks/useProductFilter.js
import { useMemo } from 'react';
import { useFilter } from '../context/FilterContext';

export const useProductFilter = (products) => {
  const {
    searchQuery,
    selectedGender,
    selectedBrand,
    priceRange,
    minRating,
    sortBy,
    showOnlyInStock
  } = useFilter();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }

    // Gender filter
    if (selectedGender !== 'all') {
      filtered = filtered.filter(product => product.gender === selectedGender);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    // Stock filter
    if (showOnlyInStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id); // Assuming higher ID = newer
        break;
      case 'featured':
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedGender, selectedBrand, priceRange, minRating, sortBy, showOnlyInStock]);

  return filteredAndSortedProducts;
};
