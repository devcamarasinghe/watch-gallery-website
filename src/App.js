// src/App.js
import React from 'react';
import ThemeProvider from './theme/ThemeProvider';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProductGrid from './components/product/ProductGrid';
import { sampleProducts } from './data/products';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main style={{ 
          padding: '2rem 1rem',
          maxWidth: '1200px',
          margin: '0 auto',
          minHeight: '60vh'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ 
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: '#2C2C2C'
            }}>
              Featured Watches
            </h1>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#666666',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover our handpicked selection of premium timepieces
            </p>
          </div>
          
          <ProductGrid products={sampleProducts} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
