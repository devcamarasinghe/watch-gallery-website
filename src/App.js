// src/App.js
import React, { useState, useMemo, useCallback } from 'react';
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
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  // Deep memoization of products
  const stableProducts = useMemo(() => JSON.parse(JSON.stringify(sampleProducts)), []);

  const handleAuthModalOpen = useCallback((mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  }, []);

  const handleAuthModalClose = useCallback(() => {
    setAuthModal({ isOpen: false, mode: 'login' });
  }, []);

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
                        products={stableProducts}
                        onAuthModalOpen={handleAuthModalOpen}
                      />
                      <Footer />
                      <CartDropdown />

                      <AuthModal
                        isOpen={authModal.isOpen}
                        onClose={handleAuthModalClose}
                        initialMode={authModal.mode}
                      />

                      <Toaster
                        position="top-center"
                        toastOptions={{
                          className: 'custom-toast',
                          duration: 4000,
                          style: {
                            padding: '16px 24px',
                            borderRadius: '12px',
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            border: '1px solid rgba(255,255,255,0.1)',
                          },
                          success: {
                            style: {
                              background: '#10B981',
                              color: '#fff',
                            },
                            iconTheme: {
                              primary: '#fff',
                              secondary: '#10B981',
                            },
                          },
                          error: {
                            style: {
                              background: '#EF4444',
                              color: '#fff',
                            },
                          },
                        }}
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

export default React.memo(App);
