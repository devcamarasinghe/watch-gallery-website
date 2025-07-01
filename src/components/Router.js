// src/components/Router.js
import React, { useState } from 'react';
import CatalogPage from '../pages/CatalogPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';

const Router = ({ products }) => {
  const [currentPage, setCurrentPage] = useState('catalog');

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'catalog':
      default:
        return <CatalogPage products={products} />;
    }
  };

  // Make navigation function available globally
  window.navigateTo = setCurrentPage;

  return (
    <div className="fade-in">
      {renderPage()}
    </div>
  );
};

export default Router;
