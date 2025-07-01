// src/App.js
import React from 'react';
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
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FilterProvider>
            <div className="App">
              <Header />
              <Router products={sampleProducts} />
              <Footer />
              <CartDropdown />
              <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
              />
            </div>
          </FilterProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
