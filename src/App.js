// src/App.js
import React, { useState } from 'react';
import ThemeProvider from './theme/ThemeProvider';
import { CartProvider } from './context/CartContext';
import { FilterProvider } from './context/FilterContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDropdown from './components/cart/CartDropdown';
import AuthModal from './components/auth/AuthModal';
import Router from './components/Router';
import { sampleProducts } from './data/products';
import './App.css';

function App() {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  const handleAuthModalOpen = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleAuthModalClose = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FilterProvider>
            <div className="App">
              <Header onAuthModalOpen={handleAuthModalOpen} />
              <Router products={sampleProducts} />
              <Footer />
              <CartDropdown />
              <AuthModal 
                isOpen={authModal.isOpen}
                onClose={handleAuthModalClose}
                initialMode={authModal.mode}
              />
            </div>
          </FilterProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
