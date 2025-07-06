// src/components/Router.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CatalogPage from '../pages/CatalogPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import ProfilePage from '../pages/ProfilePage';
import CheckoutPage from '../pages/CheckoutPage';
import WishlistPage from '../pages/WishlistPage';
import OrdersPage from '../pages/OrdersPage';

const Router = React.memo(({ products, onAuthModalOpen }) => {
  const [currentPage, setCurrentPage] = useState('catalog');

  const navigateTo = useCallback((page) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Navigating to:', page);
    }
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    window.navigateTo = navigateTo;
    return () => {
      window.navigateTo = null;
    };
  }, [navigateTo]);

  const renderedPage = useMemo(() => {

    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'profile':
        return <ProfilePage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'wishlist':
        return <WishlistPage onAuthModalOpen={onAuthModalOpen} />;
      case 'orders':
        return <OrdersPage onAuthModalOpen={onAuthModalOpen} />;
      case 'catalog':
      default:
        return <MemoizedCatalogPage products={products} />;
    }
  }, [currentPage, products, onAuthModalOpen]);

  return <div className="fade-in">{renderedPage}</div>;
});

// Create a fully memoized version of CatalogPage
const MemoizedCatalogPage = React.memo(
  ({ products }) => <CatalogPage products={products} />,
  (prevProps, nextProps) => {
    // Deep comparison of products
    return JSON.stringify(prevProps.products) === JSON.stringify(nextProps.products);
  }
);

Router.displayName = 'Router';
export default Router;