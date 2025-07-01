// src/App.js
import React from 'react';
import ThemeProvider from './theme/ThemeProvider';
import { FilterProvider } from './context/FilterContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CatalogPage from './pages/CatalogPage';
import { sampleProducts } from './data/products';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <div className="App">
          <Header />
          <CatalogPage products={sampleProducts} />
          <Footer />
        </div>
      </FilterProvider>
    </ThemeProvider>
  );
}

export default App;
