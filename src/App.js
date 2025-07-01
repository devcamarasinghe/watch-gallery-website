// src/App.js
import React from 'react';
import ThemeProvider from './theme/ThemeProvider';
import Header from './components/layout/Header';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main style={{ padding: '2rem', minHeight: '80vh' }}>
          <h1>Welcome to WatchShop</h1>
          <p>Luxury watches for every occasion</p>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
