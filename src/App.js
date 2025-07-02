// src/App.js
import React, { useState } from 'react';
import ThemeProvider from './theme/ThemeProvider';
import { CartProvider } from './context/CartContext';
import { FilterProvider } from './context/FilterContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrdersProvider } from './context/OrdersContext';
import { PreOrderProvider } from './context/PreOrderContext';
import { PaginationProvider } from './context/PaginationContext';
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
        <PreOrderProvider>
          <OrdersProvider>
            <WishlistProvider>
              <CartProvider>
                <FilterProvider>
                  <PaginationProvider>
                    <div className="App">
                      <Header onAuthModalOpen={handleAuthModalOpen} />
                      <Router
                        products={sampleProducts}
                        onAuthModalOpen={handleAuthModalOpen}
                      />
                      <Footer />
                      <CartDropdown />
                      <AuthModal
                        isOpen={authModal.isOpen}
                        onClose={handleAuthModalClose}
                        initialMode={authModal.mode}
                      />
                    </div>
                  </PaginationProvider>
                </FilterProvider>
              </CartProvider>
            </WishlistProvider>
          </OrdersProvider>
        </PreOrderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
