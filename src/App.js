// src/App.js
import React from 'react';
import ThemeProvider from './theme/ThemeProvider';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main style={{ 
          padding: '2rem', 
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ 
            fontFamily: 'Playfair Display, serif',
            fontSize: '3rem',
            marginBottom: '1rem',
            color: '#2C2C2C'
          }}>
            Welcome to WatchShop
          </h1>
          <p style={{ 
            fontSize: '1.2rem',
            color: '#666666',
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            Discover our exquisite collection of luxury timepieces. 
            From classic elegance to modern sophistication, find the perfect watch that defines your style.
          </p>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
