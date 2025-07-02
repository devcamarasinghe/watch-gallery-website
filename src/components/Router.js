// src/components/Router.js
import React, { useState, useEffect } from 'react';
import CatalogPage from '../pages/CatalogPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import ProfilePage from '../pages/ProfilePage';
import CheckoutPage from '../pages/CheckoutPage';
import WishlistPage from '../pages/WishlistPage';
import OrdersPage from '../pages/OrdersPage';

const Router = ({ products, onAuthModalOpen }) => {
  const [currentPage, setCurrentPage] = useState('catalog');

  const navigateTo = (page) => {
    console.log('Navigating to:', page); // Debug log
    setCurrentPage(page);
  };

  // Make navigation function available globally
  useEffect(() => {
    window.navigateTo = navigateTo;
  }, []);

  const renderPage = () => {
    console.log('Current page:', currentPage); // Debug log

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
        return <CatalogPage products={products} />;
    }
  };

  return (
    <div className="fade-in">
      {renderPage()}
    </div>
  );
};

export default Router;
