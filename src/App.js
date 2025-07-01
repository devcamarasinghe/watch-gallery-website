// src/App.js
import React from 'react';
import ThemeProvider from './theme/ThemeProvider';
import { FilterProvider } from './context/FilterContext';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDropdown from './components/cart/CartDropdown';
import CatalogPage from './pages/CatalogPage';
import { sampleProducts } from './data/products';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <FilterProvider>
          <div className="App">
            <Header />
            <CatalogPage products={sampleProducts} />
            <Footer />
            <CartDropdown />
          </div>
        </FilterProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
