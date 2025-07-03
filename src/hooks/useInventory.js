// src/hooks/useInventory.js
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export const useInventory = (product) => {
  const { items: cartItems } = useCart();
  const [availableQuantity, setAvailableQuantity] = useState(product.availableQuantity || 0);

  // Calculate how many of this product are already in cart
  const quantityInCart = cartItems.find(item => item.id === product.id)?.quantity || 0;
  
  // Calculate remaining available quantity (total - already in cart)
  const remainingQuantity = Math.max(0, availableQuantity - quantityInCart);
  
  // Check stock status
  const isOutOfStock = availableQuantity === 0;
  const isLowStock = availableQuantity > 0 && availableQuantity <= 5;
  const isInStock = availableQuantity > 5;

  // Update available quantity when product changes
  useEffect(() => {
    setAvailableQuantity(product.availableQuantity || 0);
  }, [product.availableQuantity]);

  const getStockStatus = () => {
    if (isOutOfStock) return { status: 'out-of-stock', label: 'Out of Stock', color: 'error' };
    if (isLowStock) return { status: 'low-stock', label: `Only ${availableQuantity} left`, color: 'warning' };
    return { status: 'in-stock', label: 'In Stock', color: 'success' };
  };

  const canAddToCart = (requestedQuantity = 1) => {
    return remainingQuantity >= requestedQuantity;
  };

  const getMaxQuantityForCart = () => {
    return remainingQuantity;
  };

  return {
    availableQuantity,
    remainingQuantity,
    quantityInCart,
    isOutOfStock,
    isLowStock,
    isInStock,
    getStockStatus,
    canAddToCart,
    getMaxQuantityForCart
  };
};