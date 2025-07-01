// src/App.js
import React from 'react';
import ThemeProvider from './theme/ThemeProvider';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <h1>Watch Shop</h1>
        <p>Luxury Dark Theme Active</p>
      </div>
    </ThemeProvider>
  );
}

export default App;
